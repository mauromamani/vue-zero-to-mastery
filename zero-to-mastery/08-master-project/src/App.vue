<template>
  <!-- Header -->
  <app-header />

  <!-- Router -->
  <router-view />

  <!-- Player -->
  <player />

  <auth-modal />
</template>

<script>
import AppHeader from './components/Header.vue';
import Player from './components/Player.vue';
import AuthModal from './components/Auth.vue';

export default {
  name: 'App',
  components: {
    AppHeader,
    AuthModal,
    Player,
  },
  // life cicle hook
  created() {
    this.$store.dispatch('initLogin');
  },
};
</script>
