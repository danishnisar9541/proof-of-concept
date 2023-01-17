<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-title>Proof of Concept</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content>
      <ion-grid>
        <ion-row>
          <ion-col size="12">
            <ion-list lines="none">
              <ion-item>
                <ion-button
                  expand="block"
                  size="large"
                  @click="CameraMicroPhone"
                  >Active camera and microphone</ion-button
                >
              </ion-item>
              <ion-item>
                <ion-button
                  expand="block"
                  size="large"
                  @click="audio()"
                  >Activate microphone</ion-button
                >
              </ion-item>
              <ion-item>
                <ion-button expand="block" size="large" @click="takePhoto()"
                  >Take a new photo</ion-button
                >
              </ion-item>
              <ion-item>
                <ion-button expand="block" size="large" @click="fromGallery"
                  >Upload photo from gallery</ion-button
                >
              </ion-item>
              <ion-item>
                <ion-button expand="block" size="large" @click="location"
                  >Get GPS location</ion-button
                >
              </ion-item>
              <ion-item>
                <ion-button expand="block" size="large" @click="notification"
                  >Trigger notification</ion-button
                >
              </ion-item>
              <ion-item>
                <ion-button expand="block" size="large" @click="permissions"
                  >Request all permissions</ion-button
                >
              </ion-item>
            </ion-list>
          </ion-col>
        </ion-row>
        
        <!-- <ion-row>
      <ion-col size="6" :key="photo" v-for="photo in photos">
        <ion-img :src="photo.webviewPath"></ion-img>
      </ion-col>
    </ion-row> -->
      </ion-grid>
    </ion-content>
    
  </ion-page>
</template>
<script>
import { usePhotoGallery } from "@/composable/usePhotogallery";
import {
  IonPage,
  IonHeader,
  IonTitle,
  IonContent,
  IonToolbar,
  IonList,
  IonItem,
  IonButton,
  IonGrid,
  IonRow,
  IonCol,
} from "@ionic/vue";

export default {
  setup() {
    const { takePhoto, photos } = usePhotoGallery();
    return {
      takePhoto,
      photos,
    };
  },

  components: {
    IonPage,
    IonHeader,
    IonTitle,
    IonContent,
    IonToolbar,
    IonList,
    IonItem,
    IonButton,
    IonGrid,
    IonRow,
    IonCol,
  },

  methods: {
    data: {
      location: null,
      gettingLocation: false,
      errorStr: null,
    },

    location() {
      if (!("geolocation" in navigator)) {
        this.errorStr = "Geolocation is not available.";
        return;
      }
      this.gettingLocation = true;
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          this.gettingLocation = false;
          this.location = pos;
          console.log(this.location);
        },
        (err) => {
          this.gettingLocation = false;
          this.errorStr = err.message;
        }
      );
    },

    
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