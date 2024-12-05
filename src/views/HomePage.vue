<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-title>Mainan Andi</ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content>
      <!-- Pull-to-refresh functionality -->
      <ion-refresher slot="fixed" @ionRefresh="handleRefresh">
        <ion-refresher-content></ion-refresher-content>
      </ion-refresher>

      <!-- Floating action button to add a new recipe -->
      <ion-fab vertical="bottom" horizontal="end" slot="fixed">
        <ion-fab-button @click="openAddModal">
          <ion-icon :icon="add"></ion-icon>
        </ion-fab-button>
      </ion-fab>

      <!-- Input Modal for adding or editing a recipe -->
      <InputModal 
        v-model:isOpen="isOpen" 
        v-model:editingId="editingId" 
        :mainan="mainan" 
        @submit="handleSubmit" 
      />

      <!-- Modal for displaying recipe details -->
      <ion-modal :is-open="isModalOpen" @did-dismiss="closeModal">
        <ion-header>
          <ion-toolbar>
            <ion-buttons slot="start">
              <ion-button @click="closeModal">
                <ion-icon :icon="close"></ion-icon>
              </ion-button>
            </ion-buttons>
            <ion-title><h2>{{ selectedMainan?.name }}</h2></ion-title>
          </ion-toolbar>
        </ion-header>

        <ion-content>
          <ion-card v-if="selectedMainan">
            <ion-card-header>
              <ion-card-title><h2>{{ selectedMainan.name }}</h2></ion-card-title>
            </ion-card-header>
            <ion-card-content>
              <div v-html="formattedSteps"></div>
            </ion-card-content>
          </ion-card>
        </ion-content>
      </ion-modal>

      <!-- Recipe List -->
      <ion-list>
        <ion-item-sliding v-for="mainan in mainans" :key="mainan.id">
          <ion-item button @click="goToDetail(mainan)">
            <ion-label>
              <h2>{{ mainan.name }}</h2>
              <!-- Display formatted steps with line breaks -->
              <div v-html="formattedStepsForList(mainan)"></div>
            </ion-label>
          </ion-item>

          <!-- Options for each recipe -->
          <ion-item-options side="start">
            <ion-item-option color="danger" @click="handleDelete(mainan)">
              <ion-icon :icon="trash"></ion-icon>
            </ion-item-option>
          </ion-item-options>

          <ion-item-options side="end">
            <ion-item-option @click="handleEdit(mainan)">
              <ion-icon :icon="create"></ion-icon>
            </ion-item-option>
          </ion-item-options>
        </ion-item-sliding>
      </ion-list>
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonRefresher, IonRefresherContent, IonFab, IonFabButton, IonIcon, IonList, IonItem, IonItemSliding, IonItemOption, IonItemOptions, IonLabel, IonModal, IonButton } from '@ionic/vue';
import { add, create, trash, close } from 'ionicons/icons';
import InputModal from '@/components/InputModal.vue';
import { onMounted, ref, computed } from 'vue';
import { firestoreService, type Mainan } from '@/utils/firestore';
import { useRouter } from 'vue-router';
import TabsMenu from '@/components/TabsMenu.vue';

const isOpen = ref(false);
const editingId = ref<string | null>(null);
const mainan = ref<Omit<Mainan, 'id' | 'createdAt' | 'updatedAt'>>({ name: '', steps: '' });
const mainans = ref<Mainan[]>([]);
const router = useRouter();

// Modal for recipe details
const isModalOpen = ref(false);
const selectedMainan = ref<Mainan | null>(null);

// Load recipes on page mount
const loadMainans = async () => {
  mainans.value = await firestoreService.getMainanList();
};

onMounted(() => {
  loadMainans();
});

// Handle refresh event
const handleRefresh = async (event: any) => {
  await loadMainans();
  event.target.complete();
};

// Open modal to show recipe details
const goToDetail = (mainan: Mainan) => {
  selectedMainan.value = mainan;
  isModalOpen.value = true;
};

// Close the modal
const closeModal = () => {
  isModalOpen.value = false;
  selectedMainan.value = null;
};

// Handle adding or updating a recipe
const handleSubmit = async (mainanData: Omit<Mainan, 'id' | 'createdAt' | 'updatedAt'>) => {
  if (editingId.value) {
    await firestoreService.updateMainan(editingId.value, mainanData);
  } else {
    await firestoreService.addMainan(mainanData);
  }
  loadMainans();
  isOpen.value = false;
};

// Open modal for editing a recipe
const handleEdit = (mainan: Mainan) => {
  editingId.value = mainan.id!;
  Object.assign(mainan, { ...mainan });
  isOpen.value = true;
};

// Handle deleting a recipe
const handleDelete = async (mainan: Mainan) => {
  await firestoreService.deleteMainan(mainan.id!);
  loadMainans();
};

// Open modal to add a new recipe
const openAddModal = () => {
  editingId.value = null;
  mainan.value = { name: '', steps: '' };
  isOpen.value = true;
};

// Format steps with line breaks and numbering for details
const formattedSteps = computed(() => {
  if (!selectedMainan.value?.steps) return '';
  return selectedMainan.value.steps
    .split('\n') // Split by newline
    .map((step, index) => `${index + 1}. ${step}`) // Add numbering
    .join('<br />'); // Join steps with <br /> for line breaks
});

// Format steps for the list view, no numbering for brevity
const formattedStepsForList = (mainan: Mainan) => {
  if (!mainan.steps) return '';
  return mainan.steps
    .split('\n') // Split by newline
    .map((step) => `${step}`) // Plain steps
    .join('<br />'); // Join steps with <br /> for line breaks
};
</script>
