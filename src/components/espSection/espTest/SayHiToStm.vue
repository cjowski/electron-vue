<template>
  <v-card color="grey darken-4">
    <esp-test-spinner v-model="isRequesting" />
    <v-card-text class="pt-3 pb-2 pl-2 pr-2">
      <v-text-field
        v-model="espResponse"
        label="ESP Response"
        outlined
        disabled
        hide-no-data
        hide-details
        spellcheck=false
      />
    </v-card-text>
    <v-card-actions>
      <v-btn
        color="cyan lighten-1"
        block
        outlined
        @click="sayHiToStm()"
      >
        Say Hi to STM
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
  import fetchMethods from "@/common/fetchMethods"
  import EspTestSpinner from "@/components/espSection/espTest/EspTestSpinner"
  
  export default {
    name: "SayHiToStm",

    data: () => ({
      espResponse: "",
      isRequesting: false
    }),

    components: {
      EspTestSpinner
    },

    computed: {
      espRequestPath() {
        return this.$store.getters['espConnect/espRequestPath'];
      }
    },

    methods: {
      sayHiToStm() {
        let self = this;
        self.isRequesting = true;
        fetchMethods.timeoutFetch(
          self.espRequestPath + "sayHiToStm",
          5000,
          function (espResponse) {
            if (espResponse != null && espResponse.StmMessage) {
              self.espResponse = espResponse.StmMessage;
            }
            self.isRequesting = false;
          },
          function (error) {
            console.log(error.toString());
            self.isRequesting = false;
          }
        );
      }
    }
  }
</script>