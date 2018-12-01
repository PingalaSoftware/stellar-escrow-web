<template>
  <v-layout>
    <v-card width="600">
      <v-card-title> 
        <v-layout justify-center>
          <h2>Contract</h2>
        </v-layout>
      </v-card-title> 
      <v-divider></v-divider>
      <v-card-text class="envelope">
        <div v-if="envelops.envelope1">
          <div>
            <h3>can pay 50% after 5 mins</h3>
            <v-textarea
              auto-grow
              outline
              readonly
              hide-details
              :value="envelops.envelope1"
            ></v-textarea>
            <v-layout class="mt-2">
              <!-- <v-btn class="warning">Sign with my secret</v-btn> -->
              <sign :envelope="envelops.envelope1" number="1"></sign>
              <v-btn class="success" @click="submitToNetwork(envelops.envelope1)">Submit to the Network</v-btn>
            </v-layout>
          </div>
          <div class="mt-5">
            <h3>can pay 50% after 10 mins</h3>
            <v-textarea
              auto-grow
              hide-details
              outline
              readonly
              :value="envelops.envelope2"
            ></v-textarea>
            <v-layout class="mt-2">
              <sign :envelope="envelops.envelope2" number="2"></sign>
              <v-btn class="success" @click="submitToNetwork(envelops.envelope2)">Submit to the Network</v-btn>
            </v-layout>
          </div>
          <div class="mt-5">
            <h3>can revert payment after 11 mins</h3>
            <v-textarea
              auto-grow
              hide-details
              outline
              readonly
              :value="envelops.envelope3"
            ></v-textarea>
            <v-layout class="mt-2">
              <sign :envelope="envelops.envelope3" number="3"></sign>
              <v-btn class="success" @click="submitToNetwork(envelops.envelope3)">Submit to the Network</v-btn>
              <p class="red--text" v-if="error">{{error}}</p>
            </v-layout>
          </div>
        </div>
        <create-contract v-if="!envelops.envelope1" :accountPublic="accountPublic"></create-contract>
      </v-card-text>
    </v-card>
  </v-layout>
</template>

<script>
import createContract from '../components/createContract'
import sign from '../components/sign'
import { submitTransaction } from '../stellar.js'

export default {
  props: ["envelops", "accountPublic"],
  data: () => ({
    error: ""
  }),
  components: {
    createContract,
    sign
  },

  methods: {
    submitToNetwork(envelope){
      submitTransaction(envelope).catch((error)=>{
        console.log(error);
        this.error = "some error, check console";
      });
    }
  }
};
</script>

<style scoped>
  .envelope {
    word-break: break-all;
  }
</style>

