<template>
  <div class="something">
    <h1>This is a something page</h1>
    <button class="my-button" @click.prevent="handleClick">
      <slot></slot>
      Clicks: {{ count }}</button
    ><br />
    Enter text:<input type="text" v-model="inputText" id="text1" /><br />
    Something: <input type="checkbox" /><br />
    Number: <input type="number" /><br />
    Something: <input type="radio" /><br />
    Something <input type="range" id="idk" /><br />
    <SomeComponent msg="some message" />
  </div>
</template>

<script>
import SomeComponent from "@/components/SomeComponent.vue";

export default {
  components: {
    SomeComponent
  },
  data() {
    return {
      count: 0,
      inputText: "hello"
    };
  },
  methods: {
    handleClick() {
      this.count++;
      console.log(`clicked ${this.count}`);
    }
  }
};
</script>

<style scoped>
.my-button {
  display: inline-block;
  font-size: 1rem;
  color: #fff;
  background-color: #3eaf7c;
  padding: 0.8rem 1.6rem;
  margin: 5px;
  border-radius: 4px;
  transition: background-color 0.1s ease;
  box-sizing: border-box;
}
input[type="text"] {
  display: inline-block;
  font-size: 1rem;
  color: #fff;
  background-color: #3eaf7c;
  padding: 0.65rem 1rem;
  margin: 5px;
  border-radius: 15px;
  transition: background-color 0.1s ease;
  box-sizing: border-box;
  border: 5px solid #000000;
}
</style>
