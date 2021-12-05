<template>
  <button type="button" @click="handleCLick">
    <slot>Submit</slot>
  </button>
</template>

<script>
export default {
  name: "Button",
  methods: {
    handleCLick() {
      console.log("Hello World");
    },
  },
};
</script>
