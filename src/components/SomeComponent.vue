<script>
export default {
  name: "SomeComponent",
  props: {
    msg: String
  }
};
</script>

<template>
  <p>the message is: {{ msg }}</p>
</template>
