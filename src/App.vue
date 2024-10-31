<script setup lang="ts">
import { RouterView } from 'vue-router'
import Layout from '@/components/Layout.vue'
import Aside from '@/components/Aside.vue'
import Header from '@/components/Header.vue'
</script>

<template>
  <Layout>
    <template v-slot:header> <Header /> </template>
    <template v-slot:aside><Aside /></template>
    <template v-slot:main>
      <RouterView />
    </template>
  </Layout>
</template>

<style scoped></style>
