<script setup>
defineProps(["frenchWord", "germanWord", "englishSentence", "germanSentence"]);
</script>

<template>
  <v-card class="mx-auto" max-width="500">
    <v-card-title>{{ frenchWord }}</v-card-title>
    <v-card-subtitle>{{ germanWord }}</v-card-subtitle>
    <v-card-text height="300px">{{ englishSentence }}</v-card-text>
    <v-card-text height="300px">{{ germanSentence }}</v-card-text>
  </v-card>
</template>
