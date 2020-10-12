<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png" /><br />
    <div>
      Once you start the bot, do not make changes to your Binance account's
      Balances or Orders until you stop the bot. Unexpected changes there
      interfere with the bot's activities and can cause errors.
    </div>
    <button
      class="start-stop-button"
      @click.prevent="startStopButtonClick"
      :disabled="!canClickStartStopButton"
    >
      {{ startStopButtonText }}</button
    ><br />
    <ul
      class="main-output disable-scrollbars"
      v-chat-scroll="{ always: false, smooth: true }"
    >
      <li
        class="output-text"
        v-for="o in store.mainOutputArray"
        v-html="coloredOutputText(o)"
        :key="o.text"
      ></li>
    </ul>
    <HelloWorld
      msg="I keep this here as a reminder of how creating custom Vue HTML Components is done"
    />
  </div>
</template>

<script>
// @ is an alias to /src
const colors = require("colors");
import HelloWorld from "@/components/HelloWorld.vue";
const { ipcRenderer } = window.require("electron");
import { sleep } from "../utils.js";

export default {
  name: "Home",
  components: {
    HelloWorld
  },
  data() {
    return {
      startStopButtonText: "Start Bot",
      canClickStartStopButton: true,
      store: this.$root.$root.$data.store
    };
  },
  methods: {
    coloredOutputText(obj) {
      return `<span style="color:${obj.color}">` + obj.text + `</span>`;
    },
    async startStopButtonClick() {
      if (this.startStopButtonText == `Start Bot`) {
        this.startStopButtonText = `Starting...`;
        this.canClickStartStopButton = false;
        ipcRenderer.send(`start-bot`);
        await sleep(5000); // right now this is arbitrary but later i should have some kind of callback or something that tells when the bot is really started so it knows exactly when to undisable the button
        this.startStopButtonText = `Stop Bot`;
        this.canClickStartStopButton = true;
      } else if (this.startStopButtonText == `Stop Bot`) {
        this.startStopButtonText = `Stopping...`;
        this.canClickStartStopButton = false;
        ipcRenderer.send(`stop-bot`);
        this.store.mainOutputArray.push({
          text: "<br>RELOADING...<br>",
          color: "rgb(255,255,255)"
        });
        await sleep(5000);
        this.startStopButtonText = `Start Bot`;
        this.canClickStartStopButton = true;
      }
    }
  }
};
</script>

<style scoped>
.start-stop-button {
  display: inline-block;
  text-align: center;
  width: 15vw;
  height: 5vh;
  border: 3.5px solid rgb(30, 120, 60);
  margin: 10px 0px 0px 0px;
  background-color: rgb(45, 180, 90);
  color: white;
  border-radius: 10px;
  transition: background-color 0.3s;
}
.start-stop-button:hover {
  background-color: rgb(30, 120, 60);
}
.start-stop-button:disabled {
  background-color: rgb(0, 0, 0);
}
.main-output {
  border: 3.5px solid rgb(45, 180, 90);
  background-color: rgb(0, 0, 0);
  color: white;
  height: 50vh;
  margin: 10px 70px 10px 70px;
  text-align: center;
  overflow-y: auto;
  overflow-x: auto;
}
.disable-scrollbars::-webkit-scrollbar {
  width: 0px;
  background: transparent; /* Chrome/Safari/Webkit */
}
.disable-scrollbars {
  scrollbar-width: none; /* Firefox */
  -ms-overflow-style: none; /* IE 10+ */
}
</style>
