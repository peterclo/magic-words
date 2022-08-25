<script lang="ts" setup>
import { stringify } from "querystring";
import DisplayWord1 from "./components/DisplayWord.vue";
//import { ref } from "vue"; (pas nécessaire car auto-importé par NUXT 3)

const graphql = useStrapiGraphQL();

// Déclaration des interfaces TS communs aux différents queries

interface FrenchWord {
  id: string;
  attributes: {
    Translation: string;
  };
}

interface GermanSentence {
  id: string;
  attributes: {
    Sentence: string;
  };
}

interface EnglishSentence {
  id: string;
  attributes: {
    Sentence: string;
  };
}

interface GermanWord {
  id: string;
  attributes: {
    Word: string;
    french_word: { data: FrenchWord };
    germansentences: { data: GermanSentence[] };
    englishsentences: { data: EnglishSentence[] };
  };
}

// ----------------------------------------------------------------
// Déclaration du query GermanWords et de ses variables associées :
// ----------------------------------------------------------------

const queryGermanWords = `
query {
    germanWords(pagination: { limit: 100 }, sort: "id") {
      data {
        id
        attributes {
          Word
        }
      }
    }
  }
`;

//      Interfaces TS
interface StrapiResponseGWs {
  data: {
    germanWords: {
      data: GermanWord[];
    };
  };
}

//      Récupération de la réponse Strapi
let responseGWs: StrapiResponseGWs = await graphql(queryGermanWords);

//console.log(responseGWs.data.germanWords);

// ------------------------------------------------------------------
// Déclaration du Query OneGermanWord et de ses variables associées :
// ------------------------------------------------------------------

const queryOneGermanWord = `
query ($id:ID!) {
  germanWord(id: $id) {
    data {
      id
      attributes {
        Word
        french_word {data{id attributes{Translation}}}
        germansentences {data{id attributes{Sentence}}}
        englishsentences {data{id attributes{Sentence}}}
      }
    }
  }
}
`;

//      Interfaces TS
interface StrapiResponseOneGW {
  data: {
    germanWord: {
      data: GermanWord;
    };
  };
}

//      Récupération de la réponse Strapi
//let responseOneGW: StrapiResponseOneGW = await graphql(queryOneGermanWord, { id: 2 });
//try {
//  let responseOneGW: StrapiResponseOneGW = await graphql(queryOneGermanWord, { id: "24" });
//  console.log(responseOneGW.data.germanWord.data.attributes);
//} catch (error) {
//  console.log(error);
//}

let responseOneGW: StrapiResponseOneGW = await graphql(queryOneGermanWord, { id: "1" });
//      Déclaration des variables issues de la déstructuration de l'objet responseOneGW
const germanWord = responseOneGW.data.germanWord.data.attributes.Word;
const englishSentence =
  responseOneGW.data.germanWord.data.attributes.englishsentences.data[0].attributes.Sentence;
const germanSentence =
  responseOneGW.data.germanWord.data.attributes.germansentences.data[0].attributes.Sentence;
const frenchWord =
  responseOneGW.data.germanWord.data.attributes.french_word.data.attributes.Translation;
//console.log(frenchWord);

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
  <!--<NuxtLayout>-->
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
      <display-word
        :french-word="frenchWord"
        :german-word="germanWord"
        :english-sentence="englishSentence"
        :german-sentence="germanSentence"
      ></display-word>
    </v-main>
  </v-layout>
  <!--<NuxtPage />-->
  <!--</NuxtLayout>-->
</template>
