<template>
  <v-card class="ma-0">
    <v-navigation-drawer
      app
      right
      permanent
      mini-variant
      mini-variant-width=64
      color="grey darken-4"
    >
      <v-list>
        <v-list-item router to="/">
          <v-icon>mdi-wifi-cog</v-icon>
        </v-list-item>
        <v-list-item router to="/espTest">
          <v-icon>mdi-flask</v-icon>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
  </v-card>
</template>

<script>
  export default {
    name: "EspSectionSideBar"
  }
</script>