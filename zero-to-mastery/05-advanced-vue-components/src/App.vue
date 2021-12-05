<template>
  <select v-model="componentName">
    <option value="Home">Home</option>
    <option value="About">About</option>
  </select>

  <keep-alive>
    <component :is="componentName"></component>
  </keep-alive>
  <!-- Si rodeamos al component con un <keep-alive> el componente hijo se mantedra en memoria, es decir no se tendra
  que volver a renderizar, es una cuestion de optimizavion... -->

  <!--
  <app-form>
    <template v-slot:help>
      <p>Texto de ayuda</p>
    </template>

    <template v-slot:fields>
      <input type="text" placeholder="email" />
      <input type="text" placeholder="username" />
      <input type="password" placeholder="password" />
    </template>

    <template v-slot:buttons>
      <Button />
    </template>

    <p>Dummy text for the slot</p>
  </app-form>
  <app-form />

  <h1>{{ msg }}</h1>
  <input type="text" v-model="msg" />

  <hr />
  <button type="button" @click="age++">Age +1</button>
  <Hello :age="age" />
  <User :age="age" @age-change="updateAge" :ageChangeFn="updateAgeCB" />
--></template>

<script>
import Hello from "./components/Hello.vue";
import User from "./components/User.vue";
import AppForm from "./components/Form.vue";
import Button from "./components/Button.vue";
import Home from "./components/Home.vue";
import About from "./components/About.vue";

export default {
  name: "App",
  data() {
    return {
      msg: "Hello World!!!",
      age: 24,
      componentName: "Home",
    };
  },
  methods: {
    // metodo que usamos en el emit del componente hijo User
    updateAge(num) {
      this.age += num;
    },
    // creando un callback para actualizar el prop desde el componente hijo
    updateAgeCB(num) {
      this.age += num;
    },
  },
  components: {
    Hello,
    User,
    AppForm,
    Button,
    Home,
    About,
  },
};
</script>

<style lang="scss" scoped>
h1 {
  color: red;

  &:hover {
    color: black;
    cursor: pointer;
  }
}
</style>
