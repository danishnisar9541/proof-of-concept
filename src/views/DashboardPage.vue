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
              <!-- <ion-item>
                <button id="get-access">Get access to camera</button>
                <video autoplay></video>
                <div class="canvas"></div>
                
              </ion-item> -->
              <ion-item>
                <ion-button
                  expand="block"
                  size="large"
                  @click="startVideoCapture()"
                  >Active camera and microphone</ion-button
                >
              </ion-item>
              <ion-item>
                <ion-button
                  expand="block"
                  size="large"
                  @click="() => router.push('/audio-tracks')"
                  >Activate microphone</ion-button
                >
              </ion-item>

              <ion-item>
                <ion-button expand="block" size="large" @click="takePhoto()"
                  >Take a new photo</ion-button
                >
              </ion-item>
              <ion-item>
                <ion-button expand="block" size="large" @click="selectPhoto()"
                  >Upload photo from gallery</ion-button
                >
              </ion-item>
              <ion-item>
                <ion-button
                  expand="block"
                  size="large"
                  id="open-modal"
                  @click="geoLocation()"
                  >Get GPS location</ion-button
                >
              </ion-item>
              <ion-item id="notifications">
                <ion-button expand="block" size="large" @click="notification()"
                  >Trigger notification</ion-button
                >
              </ion-item>
              <ion-item>
                <ion-button expand="block" size="large" @click="permission()"
                  >Request all permissions</ion-button
                >
              </ion-item>
            </ion-list>
            <!-- <button id="grabFrame">frams</button> -->
          </ion-col>
        </ion-row>
      </ion-grid>
      <ion-modal ref="modal" trigger="open-modal" @willDismiss="onWillDismiss">
        <ion-grid>
          <ion-row>
            <ion-col size="12">
              <ion-button class="ion-text-end" @click="cancel()" color="danger"
                >close</ion-button
              >
            </ion-col>
          </ion-row>
        </ion-grid>
        <ion-content>
          <ion-card>
            <ion-card-header>
              <ion-card-title>Geolocation</ion-card-title>
            </ion-card-header>
            <ion-card-content>
              Your Location is :
              <ion-grid>
                <ion-row>
                  <ion-col>
                    <p>Longitude</p>
                    <p>Latitude</p>
                  </ion-col>
                  <ion-col>
                    <p>{{ longitude }}</p>
                    <p>{{ latitude }}</p>
                  </ion-col>
                </ion-row>
              </ion-grid>
            </ion-card-content>
          </ion-card>
        </ion-content>
      </ion-modal>
    </ion-content>
  </ion-page>
</template>
<script>
import { usePhotoGallery } from "@/composable/usePhotogallery";
import { useGallery } from "@/composable/useGallery";
import { useRouter } from "vue-router";
// import {
//   Camera,
//   CameraResultType,
//   CameraSource,
//   Photo,
//   CameraDirection
// } from "@capacitor/camera";
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
  IonModal,
} from "@ionic/vue";
export default {
  name: "DashboardPage",
  data() {
    return {
      longitude: null,
      latitude: null,
      videoUrl: null,
    };
  },
  setup() {
    const router = useRouter();
    const { takePhoto } = usePhotoGallery();
    const { selectPhoto } = useGallery();
    return {
      takePhoto,
      selectPhoto,
      router,
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
    IonModal,
  },

  methods: {
    data: {
      location: null,
      gettingLocation: false,
      errorStr: null,
    },
    notification() {
      const button = document.getElementById("notifications");
      button.addEventListener("click", () => {
        Notification.requestPermission().then((result) => {
          if (result === "granted") {
            this.randomNotification();
          }
        });
      });
    },
    randomNotification() {
      const randomItem = Math.floor(Math.random() * 1);
      const notifTitle = "test";
      const notifBody = `Created by loop`;
      const notifImg = ``;
      const options = {
        body: notifBody,
        icon: notifImg,
      };
      new Notification(notifTitle, options);
      // setTimeout(this.randomNotification, 30000);
    },
    cancel() {
      this.$refs.modal.$el.dismiss(null, "cancel");
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
          this.longitude = pos["coords"].longitude;
          this.latitude = pos["coords"].latitude;
        },
        (err) => {
          this.gettingLocation = false;
          this.errorStr = err.message;
        }
      );
    },
    permission() {
      this.geoLocation();
      navigator.mediaDevices
        .getUserMedia({ audio: true, video: true })
        .then((mediaStream) => {
          // const video = document.querySelector("video");
          // video.srcObject = mediaStream;
          // video.onloadedmetadata = () => {
          //   video.play();
          // };
        })
        .catch((err) => {
          // always check for errors at the end.
          console.error(`${err.name}: ${err.message}`);
        });
    },
    startVideoCapture() {
      // navigator.mediaDevices.getUserMedia({
      //   video: {
      //     mandatory: {
      //       minAspectRatio: 1.333,
      //       maxAspectRatio: 1.334,
      //       facingMode: "user",
      //     },
      //     optional: [
      //       { minFrameRate: 60 },
      //       { maxWidth: 640 },
      //       { maxHeigth: 480 },
      //     ],
      //   },
      // });
      // document
      //   .querySelector("#get-access")
      //   .addEventListener("click", async function init(e) {
      //     try {
      //       const stream = await navigator.mediaDevices.getUserMedia({
      //         audio: false,
      //         video: true,
      //       });
      //       const videoTracks = stream.getVideoTracks();
      //       const track = videoTracks[0];
      //       alert(`Getting video from: ${track.label}`);
      //       document.querySelector("video").srcObject = stream;
      //       document.querySelector("#get-access").setAttribute("hidden", true);
      //       setTimeout(() => {
      //         track.stop();
      //       }, 10 * 1000);

      //       const grabFrameButton = document.querySelector("#grabFrame");
      //       const canvas = document.querySelector("canvas");
      //       grabFrameButton.onclick = () => {
      //         imageCapture
      //           .grabFrame()
      //           .then(function (imageBitmap) {
      //             console.log("Grabbed frame:", imageBitmap);
      //             canvas.width = imageBitmap.width;
      //             canvas.height = imageBitmap.height;
      //             canvas.getContext("2d").drawImage(imageBitmap, 0, 0);
      //             canvas.classList.remove("hidden");
      //           })
      //           .catch(function (error) {
      //             console.log("grabFrame() error: ", error);
      //           });
      //       };
      //     } catch (error) {
      //       alert(`${error.name}`);
      //       console.error(error);
      //     }
      //   });
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