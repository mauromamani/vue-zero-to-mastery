<script setup lang="ts">
  import { useCounterStore } from '@/stores/counter';

  const counter = useCounterStore();
</script>

<template>
  <h2>{{ counter.count }}</h2>
  <button @click.prevent="counter.increment">+1</button>
  <button @click.prevent="counter.decrement">-1</button>
  <button @click.prevent="counter.$reset">Reset</button>
</template>
