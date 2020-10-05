<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png" /><br />
    <div>
      Once you start the bot, do not make any changes to your Binance account's
      Balances or Orders until you shut down the bot. Unexpected changes confuse
      the bot because if it expects an order or balance to be there and it is
      not, it causes errors.
    </div>
    <button
      class="start-stop-button"
      @click.prevent="startStopButtonClick"
      :disabled="!canClickStartStopButton"
    >
      {{ startStopButtonText }}
    </button>
    <HelloWorld
      msg="I keep this here as a reminder of how creating custom Vue HTML Components is done"
    />
  </div>
</template>

<script>
// @ is an alias to /src
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
      canClickStartStopButton: true
    };
  },
  methods: {
    async startStopButtonClick() {
      console.log(`click handler`);
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
</style>
