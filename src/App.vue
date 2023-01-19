<template>
  <ion-app>
    <ion-tabs>
      <ion-router-outlet></ion-router-outlet>
      <ion-tab-bar>
        <ion-tab-button tab="audio-tracks" href="/audio-tracks">
          <ion-icon
            :icon="musicalNote"
            aria-hidden="true"
            color="primary"
          ></ion-icon>
          <ion-label color="dark">Audio</ion-label>
        </ion-tab-button>
        <ion-tab-button tab="images" href="/images">
          <ion-icon :icon="image" aria-hidden="true" color="primary"></ion-icon>
          <ion-label color="dark">Images</ion-label>
        </ion-tab-button>

        <ion-tab-button tab="home" href="/home">
          <ion-icon :icon="menu" aria-hidden="true" color="primary"></ion-icon>
          <ion-label color="dark">Home</ion-label>
        </ion-tab-button>
      </ion-tab-bar>
    </ion-tabs>
  </ion-app>
</template>
<script>
import {
  IonIcon,
  IonLabel,
  IonRouterOutlet,
  IonTabBar,
  IonTabButton,
  IonTabs,
} from "@ionic/vue";
import { menu } from "ionicons/icons";
import { image } from "ionicons/icons";
import { musicalNote } from "ionicons/icons";

export default {
  name: "App",
  setup() {
    return {
      menu,
      image,
      musicalNote,
    };
  },
  components: {
    IonIcon,
    IonLabel,

    IonRouterOutlet,
    IonTabBar,
    IonTabButton,
    IonTabs,
  },
};
</script>
