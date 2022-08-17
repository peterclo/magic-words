<script lang="ts" setup>
import { stringify } from "querystring";
import { ref } from "vue";

interface germanWords {
  attributes: {
    Word: string;
  };
}

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
</script>

<template>
  <v-card class="mx-auto" width="400" prepend-icon="mdi-home">
    <template v-slot:title> This is a title </template>

    <v-card-text>
      German Word :{{ response.data.germanWords.data[29].attributes.Word }}
    </v-card-text>
    <v-btn color="secondary">hello</v-btn>
  </v-card>
</template>
