<template>
  <!-- Header -->
  <app-header />

  <!-- Router -->
  <router-view v-slot="{ Component }">
    <transition name="fade" :mode="'out-in'">
      <component :is="Component"></component>
    </transition>
  </router-view>

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

<style>
.fade-enter-from {
  opacity: 0;
}

.fade-enter-active {
  transition: all 0.5s linear;
}

.fade-leave-to {
  transition: all 0.5s linear;
  opacity: 0;
}
</style>
