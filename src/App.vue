<template>
  <v-app style="font-family: Calibri;">
    <toolbar/>
    <v-main>
      <v-container class="pt-2">
        <router-view />
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
  import Toolbar from '@/components/Toolbar'

  export default {
    name: 'App',

    data: () => ({
      fetchFmInterval: null,
      fetchGyroInterval: null
    }),

    components: {
      Toolbar
    },

    computed: {
      espConnected () {
        return this.$store.getters['espConnect/connected'];
      },
      espRequestPath () {
        return this.$store.getters['espConnect/espRequestPath'];
      }
    },

    watch: {
      espConnected(connected) {
        if (connected) {
          this.startFetchingEspData();
        }
        else {
          this.stopFetchingEspData();
        }
      }
    },

    methods: {
      handleFetchErrors (response) {
        if (!response.ok) {
          throw Error(response.statusText);
        }
        return response;
      },
      startFetchingEspData () {
        const self = this;

        this.fetchFmInterval = setInterval(function() {
          fetch(self.espRequestPath + "fm")
            .then(self.handleFetchErrors)
            .then(response => response.json())
            .then(data => {
              if (data != null) {
                self.$store.commit('fm/setEspFmChannelValuesJson', data);
                self.$store.commit('fm/addFmChannelValues', data);
              }
            })
            .catch(error => console.log(error));
        }, 50);
        
        this.fetchGyroInterval = setInterval(function() {
          fetch(self.espRequestPath + "gyro")
            .then(self.handleFetchErrors)
            .then(response => response.json())
            .then(data => {
              if (data != null) {
                self.$store.commit('gyro/setEspGyroValuesJson', data);
                self.$store.commit('gyro/addGyroValues', data);
              }
            })
            .catch(error => console.log(error));
        }, 50);
      },
      stopFetchingEspData () {
        clearInterval(this.fetchFmInterval);
        clearInterval(this.fetchGyroInterval);
      }
    }
  };
</script>