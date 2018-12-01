<template>
  <v-container>
    <v-layout column align-center>
      <v-flex v-if="accountPublic">
        <contract-box :envelops="envelops" :accountPublic="accountPublic"></contract-box>
      </v-flex>
      <v-flex>
        <login v-if="!accountPublic"></login>
      </v-flex>
    </v-layout>
    <v-layout>
      <v-flex>
        <v-btn class="error" @click="resetAccount">Reset Account</v-btn>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import contractBox from "../components/contractBox.vue";
import login from "../components/Login"
import axios from "../axios.js";

export default {
  data: () => ({
    envelops: {
      envelope1: "",
      envelope2: "",
      envelope3: ""
    },
    accountPublic: ""
  }),
  mounted() {
    this.loadContract();
  },
  components: {
    contractBox,
    login
  },

  methods: {
    resetAccount() {
      axios.get("/api/contract/reset");
      this.$eventHub.$emit('loadContract');
    },
    loadContract() {
      axios.get("/api/contract").then(response => {
        const contract = response.data;
        this.envelops.envelope1 = contract.envelope1;
        this.envelops.envelope2 = contract.envelope2;
        this.envelops.envelope3 = contract.envelope3;
      });
    }
  },

  created(){
    this.$eventHub.$on('loadContract', this.loadContract);
    this.$eventHub.$on('login', (accountPublic)=> {
      this.accountPublic = accountPublic;
    });
  },
  beforeDestroy() {
    this.$eventHub.$off('loadContract');
},
};
</script>
