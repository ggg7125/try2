import Vue from "vue";
import App from "./App.vue";
import router from "./router";

const { ipcRenderer } = window.require("electron");
console.log(ipcRenderer.sendSync("synchronous-message", "sync ping"));

// TODO: WARNING: botRunning is not actually dynamically set anywhere right now, it has no connection to whether binance.started is true or false. we need to keep botRunning equal to binance.started, but currently there is no code to do that, so it must be added for this match binance.started, and then background.js must fire this event so that this listener will know it changed and update it accordingly
ipcRenderer.on("bot-running-change", (event, data) => {
  console.log("status of bot running has changed");
  store.botRunning = data;
});

ipcRenderer.on("asynchronous-reply", (event, arg) => {
  console.log(arg);
});

ipcRenderer.send("asynchronous-message", "async ping");

Vue.config.productionTip = false;

// this is a simple way to keep a store without needing Vuex because Vuex itself says its for more complicated purposes. all info here: https://vuejs.org/v2/guide/state-management.html#Simple-State-Management-from-Scratch
let store = {
  clickCount: 0,
  apiKey: "",
  apiSecret: "",
  botRunning: false
};

new Vue({
  data: {
    store: store // since this is the main Vue instance and root of all vue components, all vue components will have access to its data via this.$root.$data.store etc or for even deeper subcomponenents its this.$root.$root.data.store etc
  },
  watch: {
    "store.apiKey": function(newValue, oldValue) {
      ipcRenderer.send("api-key-update", { newValue, oldValue });
    },
    "store.apiSecret": function(newValue, oldValue) {
      ipcRenderer.send("api-secret-update", { newValue, oldValue });
    }
  },
  router,
  render: h => h(App)
}).$mount("#app");
