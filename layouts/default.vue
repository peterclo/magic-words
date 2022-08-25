<script setup>
defineProps(["drawer", "items"]);
</script>

<template>
  <div>
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

      <slot />
    </v-layout>
  </div>
</template>
