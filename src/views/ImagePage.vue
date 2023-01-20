<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-title>Images</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content>
      
      <ion-grid>
        <ion-row>
          <ion-col size="12" >
            <h5>From Gallery</h5>
          </ion-col>
        </ion-row>
        <ion-row>
          <ion-col size="6" :key="pic" v-for="pic in photoss">
            <ion-img :src="pic.webviewPath"></ion-img>
          </ion-col>
        </ion-row>
        <ion-row>
          <ion-col size="12" >
            <h5>From Camera</h5>
          </ion-col>
        </ion-row>
        <ion-row>
          <ion-col size="6" :key="photo" v-for="photo in photos">
            <ion-img :src="photo.webviewPath"></ion-img>
          </ion-col>
        </ion-row>
      </ion-grid>
    </ion-content>
  </ion-page>
</template>
<script>
import { usePhotoGallery } from "@/composable/usePhotogallery";
import { useGallery } from "@/composable/useGallery";

import {
  IonPage,
  IonHeader,
  IonTitle,
  IonContent,
  IonToolbar,
  IonGrid,
  IonRow,
  IonCol
} from "@ionic/vue";
export default {
  name: 'ImagePage',
  
  setup() {
    const {  photos } = usePhotoGallery();
    const {  photoss } = useGallery();
    return {
      photos,
      photoss
    };
  },
  components: {
    IonPage,
    IonHeader,
    IonTitle,
    IonContent,
    IonToolbar,
    IonGrid,
    IonRow,
    IonCol  
  },
};
</script>
<style scoped>
ion-centent {
  width: 100%;
}

ion-button {
  width: 100%;
  --background: #edf5ff;
  color: #0043ce;
  --background-activated: #edf5ff;
}
</style>