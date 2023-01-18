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
                <ion-button expand="block" size="large" @click="audio()"
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
                <ion-button expand="block" size="large" @click="geoLocation()"
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
              <div>
                <!-- <p>Longitude : {{ location.coords.longitude }}</p>
                <p>Latitude : {{ location.coords.latitude }}</p> -->
              </div>
              <div v-if="audio">
                <ion-item>
                  <h4>Press Record To start Recording</h4>
                </ion-item>
                <ion-item>
                  <ion-button class="record" size="medium">record</ion-button>
                  <ion-button class="stop" size="medium">stop</ion-button>
                </ion-item>
              </div>
              <ion-item>
                <div class="sound-clips">
                  <article class="clip"></article>
                </div>
              </ion-item>
            </ion-list>
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
  modalController,
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

    audio() {
      const record = document.querySelector(".record");
      const stop = document.querySelector(".stop");
      const soundClips = document.querySelector(".sound-clips");
      if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
        navigator.mediaDevices
          .getUserMedia(
            // constraints - only audio needed for this app
            {
              audio: true,
            }
          )

          // Success callback
          .then((stream) => {
            console.log("test", stream);
            const mediaRecorder = new MediaRecorder(stream);
            record.onclick = () => {
              mediaRecorder.start();
              record.style.border = "2px solid red";
              record.style.color = "black";
            };
            let chunks = [];

            mediaRecorder.ondataavailable = (e) => {
              chunks.push(e.data);
            };
            stop.onclick = () => {
              mediaRecorder.stop();
              record.style.border = "";
              record.style.color = "";
            };
            mediaRecorder.onstop = (e) => {
              // const clipName = prompt("Enter a name for your sound clip");

              const clipContainer = document.createElement("article");
              const clipLabel = document.createElement("p");
              const audio = document.createElement("audio");
              const deleteButton = document.createElement("button");

              clipContainer.classList.add("clip");
              audio.setAttribute("controls", "");
              // deleteButton.innerHTML = "Delete";
              // clipLabel.innerHTML = clipName;

              clipContainer.appendChild(audio);
              clipContainer.appendChild(clipLabel);
              clipContainer.appendChild(deleteButton);
              soundClips.appendChild(clipContainer);

              const blob = new Blob(chunks, { type: "audio/ogg; codecs=opus" });
              chunks = [];
              const audioURL = window.URL.createObjectURL(blob);
              audio.src = audioURL;

              deleteButton.onclick = (e) => {
                const evtTgt = e.target;
                evtTgt.parentNode.parentNode.removeChild(evtTgt.parentNode);
              };
            };
          })

          // Error callback
          .catch((err) => {
            console.error(`The following getUserMedia error occurred: ${err}`);
          });
      } else {
        console.log("getUserMedia not supported on your browser!");
      }
    },

    geoLocation() {
      if (!("geolocation" in navigator)) {
        this.errorStr = "Geolocation is not available.";
        return;
      }
      this.gettingLocation = true;
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          this.gettingLocation = false;
          this.location = pos;
          console.log(pos['coords'])
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