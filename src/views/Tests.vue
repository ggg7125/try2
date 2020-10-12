<template>
  <div class="something">
    <button class="my-button" @click.prevent="handleClick">
      Clicks: {{ store.clickCount }}
    </button>
    <label>Setting 1: </label>
    <input type="text" v-model="inputText" id="text1" /><br />
    Setting 2: <input type="checkbox" /><br />
    Setting 3: <input type="number" /><br />
    Setting 4: <input type="radio" /><br />
    Setting 5: <input type="range" id="idk" /><br />
  </div>
</template>

<script>
const colors = require("colors");

export default {
  data() {
    return {
      inputText: "hello",
      store: this.$root.$root.$data.store
    };
  },
  methods: {
    handleClick() {
      this.store.clickCount++;
    }
  }
};
</script>

<style scoped>
* {
  text-align: left;
  padding: 0px;
  border: 0px;
  margin: 0px;
}
.something {
  margin-left: 30vw;
}
.my-button {
  display: block;
  font-size: 1rem;
  color: rgb(255, 255, 255);
  background-color: #3eaf7c;
  padding: 0.8rem 1.6rem;
  border-radius: 10px;
  transition: background-color 0.3s;
}
.my-button:hover {
  background-color: rgb(0, 125, 0);
}
input[type="text"],
input[type="number"] {
  display: inline;
  font-size: 1rem;
  color: rgb(255, 255, 255);
  background-color: #3eaf7c;
  padding: 0.5rem 1rem;
  border-radius: 15px;
  border: 2px solid #000000;
}
</style>
