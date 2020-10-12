<template>
  <div class="settings-container">
    <div v-if="store.botRunning == false">
      <div class="top-text">
        Remember to stop the bot if you wish to change settings.<br />
        Only well thought out settings will be profitable. Otherwise they could
        be very unprofitable.
      </div>
      <div class="settings">
        <div class="account-settings">
          <strong>Account Settings:</strong><br />
          <label>API Key: </label>
          <input
            type="text"
            v-model="store.settings.apiKey"
            placeholder="Put your API Key from Binance.com here"
          /><br />
          <label>API Secret: </label>
          <input
            type="text"
            v-model="store.settings.apiSecret"
            placeholder="Put your API Secret from Binance.com here"
          /><br />
        </div>
        <strong>Bot Settings:</strong><br />
        <label>Something: </label>
        <input type="text" placeholder="Something here" />
      </div>
    </div>
    <div v-else class="settings-disabled-message">
      <strong
        >Settings can not be changed when the bot is running. Stop the bot
        first.</strong
      >
    </div>
  </div>
</template>

<script>
const colors = require("colors");

export default {
  data() {
    return {
      store: this.$root.$root.$data.store
    };
  }
};
</script>

<style scoped>
input {
  width: 50vw;
  border-bottom: 0.2vh solid green;
}
.account-settings {
  margin-bottom: 5vh;
}
.settings-container {
  text-align: left;
}
.top-text,
.settings-disabled-message {
  margin-bottom: 5vh;
  margin-top: 5vh;
  text-align: center;
}
.settings {
  margin-left: 10vw;
}
</style>
