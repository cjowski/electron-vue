<template>
  <v-card color="grey darken-4">
    <esp-test-spinner v-model="isRequesting" />
    <v-card-text class="pt-3 pb-2 pl-2 pr-2">
      <v-textarea
        v-model="responseMessage"
        :label="responseLabel"
        outlined
        disabled
        hide-no-data
        hide-details
        spellcheck=false
        rows=2
        no-resize
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
  import { SayHiToStmResponseGetter } from "@/espDataGet/httpRequest/SayHiToStmResponseGetter"
  
  export default {
    name: "SayHiToStm",

    data: () => ({
      responseLabel: "",
      responseMessage: "",
      isRequesting: false,
      sayHiToStmResponseGetter: null
    }),

    components: {
      EspTestSpinner
    },

    mounted() {
      this.sayHiToStmResponseGetter = new SayHiToStmResponseGetter(
        this.$store,
        50,
        this.setStmGreeting,
        this.setError
      );
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
        self.responseLabel = "";
        self.responseMessage = "";
        fetchMethods.timeoutFetch(
          self.espRequestPath + "sayHiToStm",
          5000,
          function (response) {
            if (response != null && response.TaskID && response.TaskID > 0) {
              self.responseLabel = "Task " + response.TaskID;
              self.responseMessage = "waiting...";
              self.sayHiToStmResponseGetter.startFetching(
                self.espRequestPath + "sayHiToStmStatus?TaskID=" + response.TaskID
              );
            }
            else
            {
              self.responseLabel = "ERROR";
              self.isRequesting = false;
              self.responseMessage = "Invalid response"
            }
          },
          function (error) {
            self.responseLabel = "ERROR";
            self.responseMessage = error.toString();
            console.log(error.toString());
            self.isRequesting = false;
          }
        );
      },
      setStmGreeting(stmGreeting) {
        this.responseMessage = stmGreeting;
        this.isRequesting = false;
      },
      setError(error) {
        this.responseLabel = "ERROR";
        this.responseMessage = error;
        this.isRequesting = false;
      }
    }
  }
</script>