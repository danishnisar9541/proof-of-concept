import { ref, onMounted, watch } from 'vue';
import { Camera, CameraResultType, CameraSource, Photo } from '@capacitor/camera';
import { Filesystem, Directory } from '@capacitor/filesystem';
import { Preferences } from '@capacitor/preferences';
import { isPlatform } from '@ionic/vue';
import { Capacitor } from '@capacitor/core';
export interface UserPhoto {
    filepath: string;
    webviewPath?: string;
}
export const useGallery = () => {
    const PHOTO_STORAGE = 'photoss';
    const photoss = ref<UserPhoto[]>([]);
    const convertBlobToBase64 = (blob: Blob) =>
    new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onerror = reject;
        reader.onload = () => {
            resolve(reader.result);
        };
        reader.readAsDataURL(blob);
    });
    const savePicture = async (photo: Photo, fileName: string): Promise<UserPhoto> => {
        let base64Data: string;
        // "hybrid" will detect mobile - iOS or Android
        if (isPlatform('hybrid')) {
            const file = await Filesystem.readFile({
                path: photo.path!,
            });
            base64Data = file.data;
        } else {
            // Fetch the photo, read as a blob, then convert to base64 format
            const response = await fetch(photo.webPath!);
            const blob = await response.blob();
            base64Data = (await convertBlobToBase64(blob)) as string;
        }
        const savedFile = await Filesystem.writeFile({
            path: fileName,
            data: base64Data,
            directory: Directory.Data,
        });

        if (isPlatform('hybrid')) {
            return {
                filepath: savedFile.uri,
                webviewPath: Capacitor.convertFileSrc(savedFile.uri),
            };
        } else {
            return {
                filepath: fileName,
                webviewPath: photo.webPath,
            };
        }
    };
    const cachePhotos = () => {
        Preferences.set({
            key: PHOTO_STORAGE,
            value: JSON.stringify(photoss.value),
        });
        
    };
    watch(photoss, cachePhotos);
    const loadSaved = async () => {
        const photoList = await Preferences.get({ key: PHOTO_STORAGE });
        const photosInPreferences = photoList.value ? JSON.parse(photoList.value) : [];

        if (!isPlatform('hybrid')) {
            for (const photo of photosInPreferences) {
                const file = await Filesystem.readFile({
                    path: photo.filepath,
                    directory: Directory.Data,
                    
                });

                photo.webviewPath = `data:image/jpeg;base64,${file.data}`;
            }
        }

        photoss.value = photosInPreferences;
    };
    onMounted(loadSaved);
    const selectPhoto = async () => {
        const photo = await Camera.getPhoto({
            resultType: CameraResultType.Uri,
            source: CameraSource.Photos,
            quality: 100,
            
        });
        const fileName = new Date().getTime() + '.jpeg';
        const savedFileImage = await savePicture(photo, fileName);
        photoss.value = [savedFileImage, ...photoss.value];
    };
    
    
    return {
        photoss,
        selectPhoto
    };
}