import Vue from "vue";
import VueChatScroll from "vue-chat-scroll";
Vue.use(VueChatScroll);
import App from "./App.vue";
import router from "./router";
const colors = require("colors");

const { ipcRenderer } = window.require("electron");
console.log(ipcRenderer.sendSync("synchronous-message", "sync ping"));

ipcRenderer.on("bot-running-change", (event, data) => {
  console.log("status of bot running has changed");
  store.botRunning = data;
});

ipcRenderer.on("load-settings", (event, data) => {
  store.settings = data;
});

ipcRenderer.on("bot-start-status", (event, data) => {
  console.log(`bot start status changed to ${data}`);
  store.botRunning = data;
});

let maxOutputLines = Infinity;

ipcRenderer.on(`console-log`, (event, data) => {
  store.mainOutputArray.push(data);
  store.mainOutputArray = store.mainOutputArray.slice(
    Math.max(store.mainOutputArray.length - maxOutputLines, 0)
  );
});

ipcRenderer.on("asynchronous-reply", (event, arg) => {
  console.log(arg);
});

ipcRenderer.send("asynchronous-message", "async ping");

Vue.config.productionTip = false;

// this is a simple way to keep a store without needing Vuex because Vuex itself says its for more complicated purposes. all info here: https://vuejs.org/v2/guide/state-management.html#Simple-State-Management-from-Scratch
let store = {
  clickCount: 0,
  botRunning: false,
  // settings are kept in a separate object so we can save the entire object to file
  settings: {
    apiKey: "",
    apiSecret: ""
  },
  mainOutputArray: [{ text: "App Started.<br>", color: "rgb(255,255,255)" }]
};

ipcRenderer.send("send-initial-settings", store.settings);

new Vue({
  data: {
    store: store // since this is the main Vue instance and root of all vue components, all vue components will have access to its data via this.$root.$data.store etc or for even deeper subcomponenents its this.$root.$root.data.store etc
  },
  watch: {
    "store.settings.apiKey": function(newValue, oldValue) {
      ipcRenderer.send("api-key-update", { newValue, oldValue });
      ipcRenderer.send("settings-changed", this.store.settings);
    },
    "store.settings.apiSecret": function(newValue, oldValue) {
      ipcRenderer.send("api-secret-update", { newValue, oldValue });
      ipcRenderer.send("settings-changed", this.store.settings);
    }
  },
  router,
  render: h => h(App)
}).$mount("#app");
