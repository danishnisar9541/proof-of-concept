<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-title>Video</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content>
      <ion-grid>
        <ion-row>
          <ion-col size="12">
            <ion-list lines="none">
              <ion-item>
                <h4>Press To Activate Microphone & Camera</h4>
              </ion-item>
              <ion-item>
                <ion-button size="medium" @click="startVideoCapture()"
                  >Get Permission</ion-button
                >
              </ion-item>
              <ion-item>
                <ion-button id="btnStart" size="medium">Start</ion-button>
                <ion-button id="btnStop" size="medium">Stop</ion-button>
              </ion-item>
              <ion-item>
                <video controls></video>
              </ion-item>
              <ion-item>
                <video id="vid2" controls></video>
              </ion-item>
            </ion-list>
          </ion-col>
        </ion-row>
      </ion-grid>
    </ion-content>
  </ion-page>
</template>
<script>
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
  name: "VideoTrackPage",
  data() {
    return {
      video: false,
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
    startVideoCapture() {
      const constraintObj = {
        audio: false,
        video: {
          facingMode: "user",
        },
      };

      //handle older browsers that might implement getUserMedia in some way
      if (navigator.mediaDevices === undefined) {
        navigator.mediaDevices = {};
        navigator.mediaDevices.getUserMedia = function (constraintObj) {
          const getUserMedia =
            navigator.webkitGetUserMedia || navigator.mozGetUserMedia;
          if (!getUserMedia) {
            return Promise.reject(
              new Error("getUserMedia is not implemented in this browser")
            );
          }
          return new Promise(function (resolve, reject) {
            getUserMedia.call(navigator, constraintObj, resolve, reject);
          });
        };
      } else {
        this.video = true;
        navigator.mediaDevices
          .enumerateDevices()
          .then((devices) => {
            devices.forEach((device) => {
              console.log(device.kind.toUpperCase(), device.label);
              //, device.deviceId
            });
          })
          .catch((err) => {
            console.log(err.name, err.message);
          });
      }

      navigator.mediaDevices
        .getUserMedia(constraintObj)
        .then(function (mediaStreamObj) {
          //connect the media stream to the first video element
          const video = document.querySelector("video");
          if ("srcObject" in video) {
            video.srcObject = mediaStreamObj;
          } else {
            //old version
            video.src = window.URL.createObjectURL(mediaStreamObj);
          }

          video.onloadedmetadata = () => {
            //show in the video element what is being captured by the webcam
            video.play();
          };

          //add listeners for saving video/audio
          const start = document.getElementById("btnStart");
          const stop = document.getElementById("btnStop");
          const vidSave = document.getElementById("vid2");
          start.style.display = "inline-block";
          stop.style.display = "inline-block";

          const mediaRecorder = new MediaRecorder(mediaStreamObj);
          let chunks = [];

          start.addEventListener("click", () => {
            mediaRecorder.start();
            start.style.border = "2px solid red";
          });
          stop.addEventListener("click", () => {
            mediaRecorder.stop();
            start.style.border = "";
          });
          mediaRecorder.ondataavailable = function (ev) {
            chunks.push(ev.data);
          };
          mediaRecorder.onstop = () => {
            const blob = new Blob(chunks, { type: "video/mp4;" });
            chunks = [];
            const videoURL = window.URL.createObjectURL(blob);
            vidSave.src = videoURL;
            vidSave.style.display = "block";
          };
        })
        .catch(function (err) {
          console.log(err.name, err.message);
        });
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
#btnStart,
#btnStop,
#vid2 {
  display: none;
}
</style>