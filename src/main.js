import Vue from "vue";
import App from "./App.vue";
import router from "./router";

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

ipcRenderer.on(`console-log`, (event, data) => {
  console.log(data); // TODO: we dont really want to console log this, we want to show it in our own logging element on the frontend that looks nice for the user to see
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
  }
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
