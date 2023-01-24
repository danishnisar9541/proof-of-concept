<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-title>Audio Tracks</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content>
      <ion-grid>
        <ion-row>
          <ion-col size="12">
            <ion-list lines="none">
                 
                <ion-item>
                  <h4>Press To Activate Microphone</h4>
                </ion-item>
                <ion-item>
                    <ion-button  size="medium" @click="audio()">Get Permission</ion-button>
                </ion-item>
                <ion-item >
                  <ion-button class="record"  size="medium" >record</ion-button>
                  <ion-button class="stop"  size="medium">stop</ion-button>
                </ion-item>
              <ion-item>
                <div class="sound-clips">
                  <article class="clip"></article>
                </div>
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
  name: "AudioTrackPage",
  data(){
    return{
        soundTracks:false
    }
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
    audio() {
      this.soundTracks = true;
      const record = document.querySelector(".record");
      const stop = document.querySelector(".stop");
      const soundClips = document.querySelector(".sound-clips");
      if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
        navigator.mediaDevices.getUserMedia(
            {
              audio: true,
            }
          )
          .then((stream) => {
            const mediaRecorder = new MediaRecorder(stream);
            record.style.display='inline-block';
            stop.style.display='inline-block';
            record.onclick = () => {
              mediaRecorder.start();
              console.log(mediaRecorder.state);
              record.style.border = "2px solid red";
              record.style.color = "black";
            };
            let chunks = [];

            mediaRecorder.ondataavailable = (e) => {
              chunks.push(e.data);
            };
            stop.onclick = () => {
              mediaRecorder.stop();
              console.log(mediaRecorder.state);
              record.style.border = "";
              record.style.color = "";
            };
            mediaRecorder.onstop = (e) => {
              const clipContainer = document.createElement("article");
              const clipLabel = document.createElement("p");
              const audio = document.createElement("audio");
              const deleteButton = document.createElement("button");

              clipContainer.classList.add("clip");
              audio.setAttribute("controls", "");
              clipContainer.appendChild(audio);
              clipContainer.appendChild(clipLabel);
              clipContainer.appendChild(deleteButton);
              soundClips.appendChild(clipContainer);

              const blob = new Blob(chunks, { type: "audio/ogg; codecs=opus" });
              chunks = [];
              const audioURL = window.URL.createObjectURL(blob);
              audio.src = audioURL;
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
.record , .stop{
    display: none;
}

</style>