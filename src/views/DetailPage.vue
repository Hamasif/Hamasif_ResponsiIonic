<template>
    <ion-page>
      <ion-header>
        <ion-toolbar>
          <ion-buttons slot="start">
            <ion-back-button></ion-back-button>
          </ion-buttons>
          <ion-title>{{ mainan?.name }}</ion-title>
        </ion-toolbar>
      </ion-header>
  
      <ion-content>
        <ion-card v-if="mainan">
          <ion-card-header>
            <ion-card-title>{{ mainan.name }}</ion-card-title>
          </ion-card-header>
          <ion-card-content>
            <!-- Use v-html to render formatted steps (with line breaks preserved) -->
            <p v-html="formattedSteps"></p>
          </ion-card-content>
        </ion-card>
      </ion-content>
    </ion-page>
  </template>
  
  <script setup lang="ts">
  import { onMounted, ref, computed } from 'vue';
  import { useRoute } from 'vue-router';
  import { firestoreService, type Mainan } from '@/utils/firestore';
  
  const route = useRoute();
  const mainan = ref<Mainan | null>(null);
  
  // Fetch the recipe data based on the route parameter
  onMounted(async () => {
    const id = route.params.id as string;
    mainan.value = await firestoreService.getMainanById(id);
  });
  
  // Computed property to format the steps, ensuring line breaks are preserved
  const formattedSteps = computed(() => {
    if (!mainan.value?.steps) {
      return '';
    }
    // Replace newline characters with <br /> tags to preserve line breaks
    return mainan.value.steps.replace(/\n/g, '<br />');
  });
  </script>
  