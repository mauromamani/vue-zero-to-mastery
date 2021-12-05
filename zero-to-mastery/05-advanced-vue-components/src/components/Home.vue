<template>
  <h1>Home Page</h1>
</template>

<script>
export default {
  unmounted() {
    console.log("Home component unmounted");
  },
  // estos life cycle methods funcionan cuando usamos el componente <keep-alive></keep-alive>.
  // podemos ejecutar codigo cuando un componente esta activado o no
  activated() {
    console.log("Home component activated");
  },
  deactivated() {
    console.log("Home component deactivated");
  },
};
</script>

