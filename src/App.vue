<script setup>
import { ref, provide } from 'vue';
import { RouterView } from 'vue-router';
import Navbar from '@/components/Navbar.vue';

const username = ref(localStorage.getItem('username') || null);
provide('username', username);
</script>

<template>
  <div id="app">
    <Navbar />
    <div class="content">
      <RouterView :username="username"/>
    </div>
  </div>
</template>

<style scoped>
#app {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

.content {
  margin-top: 80px; /* Adjust based on the height of your Navbar */
}

</style>
