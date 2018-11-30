<template>
  <v-container>
    <v-layout column align-center>
      <v-flex>
        <contract-box :envelops="envelops"></contract-box>
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
import axios from "../axios.js";

export default {
  data: () => ({
    envelops: {
      envelope1: "",
      envelope2: "",
      envelope3: ""
    }
  }),
  mounted() {
    this.loadContract();
  },
  components: {
    contractBox
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
  },
  beforeDestroy() {
    this.$eventHub.$off('loadContract');
},
};
</script>
