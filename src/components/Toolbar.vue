<template>
  <v-app-bar
    app
    :src="require('/public/electronics.jpg')"
    :height="isLargeDevice ? '64' : '32'"   
  >
    <v-toolbar-items>
      <v-btn text :x-large="isLargeDevice" width=100 router to="/dashboard">
        BOARD
      </v-btn>
      <v-btn text :x-large="isLargeDevice" width=100 router to="/">
        ESP
      </v-btn>
      <v-btn text :x-large="isLargeDevice" width=100 router to="/fm">
        FM
      </v-btn>
      <v-btn text :x-large="isLargeDevice" width=100 router to="/gyro">
        GYRO
      </v-btn>
      <v-btn text :x-large="isLargeDevice" width=100 router to="/motor">
        MOTOR
      </v-btn>
    </v-toolbar-items>
  </v-app-bar>
</template>

<script>
export default {
  data () {
    return {
      
    }
  },
  
  computed: {
    isLargeDevice () {
      switch (this.$vuetify.breakpoint.name) {
        case 'xs': return false;
        case 'sm': return false;
        case 'md': return true;
        case 'lg': return true;
        case 'xl': return true;
        default : throw Error("Invalid $vuetify.breakpoint.name: " + this.$vuetify.breakpoint.name);
      }
    }
  }

}
</script>