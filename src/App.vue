<template>
  <div id="app">
    <div id="nav">
      <router-link to="/">Home</router-link> |
      <router-link to="/settings">Settings</router-link> |
      <router-link to="/tests">Tests</router-link>
    </div>
    <router-view />
  </div>
</template>

<script>
const { ipcRenderer } = window.require("electron");
const colors = require("colors");

export default {};
</script>

<style>
* {
  padding: 0px;
  margin: 0px;
  border: 0px;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 0px;
  margin: 0px;
  border: 0px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>
