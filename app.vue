<script lang="ts" setup>
import { stringify } from "querystring";
import { ref } from "vue";

// Définition des types des champs d'objets

interface germanWords {
  attributes: {
    Word: string;
  };
}

//interface

interface StrapiResponse {
  data: {
    germanWords: {
      data: germanWords[];
    };
  };
}

const graphql = useStrapiGraphQL();

let response: StrapiResponse = await graphql(`
  query {
    germanWords(pagination: { limit: 100 }) {
      data {
        attributes {
          Word
        }
      }
    }
  }
`);

console.log(response);

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
      <v-card class="mx-auto" max-width="344">
        <v-card-title>Mot français</v-card-title>
        <v-card-subtitle>{{ response.data.germanWords.data[1].attributes.Word }}</v-card-subtitle>
        <v-card-text height="300px">Phrase de contexte en anglais</v-card-text>
      </v-card>
    </v-main>
  </v-layout>
</template>
