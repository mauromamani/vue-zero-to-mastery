<template>
  <h2 v-if="age > 25">{{ msg }}</h2>
  <p v-else>You must be 25 years or older to view this message.</p>
</template>

<script>
export default {
  name: "Hello",
  props: ["age"],
  data() {
    return {
      msg: "Child component",
    };
  },
};
</script>
