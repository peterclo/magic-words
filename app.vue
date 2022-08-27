<script lang="ts" setup>
import { stringify } from "querystring";
//import { ref } from "vue"; (pas nécessaire car auto-importé par NUXT 3)

//const route = useRoute();

// ---------------------------------
// Déclaration des variables du UI :
// ---------------------------------

let drawer = ref(false);
const items = ref([
  {
    title: "J'apprends",
    value: "learn",
  },
  {
    title: "Je consolide",
    value: "consolidate",
  },
  {
    title: "Je révise",
    value: "review",
  },
]);
</script>

<template>
  <v-layout>
    <v-app-bar color="primary" prominent>
      <v-app-bar-nav-icon variant="text" @click.stop="drawer = !drawer"></v-app-bar-nav-icon>

      <v-toolbar-title>Magic Words</v-toolbar-title>

      <v-spacer></v-spacer>

      <v-btn variant="text" icon="mdi-login"></v-btn>
      <v-btn variant="text" icon="mdi-dots-vertical"></v-btn>
    </v-app-bar>

    <v-navigation-drawer v-model="drawer" bottom temporary>
      <v-list :items="items"></v-list>
    </v-navigation-drawer>

    <v-main>
      <NuxtPage />
    </v-main>
  </v-layout>
</template>
