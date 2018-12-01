<template>
  <div class="text-xs-center">
    <v-dialog v-model="dialog" width="600">
      <v-btn slot="activator" color="red lighten-2" dark>Create</v-btn>

      <v-card>
        <v-card-title class="headline grey lighten-2" primary-title>Escrow Contract</v-card-title>
        <div class="pa-3">
          <v-form ref="form" v-model="valid" lazy-validation>
            <v-text-field v-model="accountPublic"  disabled label="your public key" required></v-text-field>

            <v-text-field v-model="pub2" :rules="pubRules" label="other party public key" required></v-text-field>

            <v-text-field type="number" v-model="amount" label="Total Amount"></v-text-field>

            <h3 class="mt-5 light-blue--text">Secret of your account</h3>
            <v-text-field placeholder="secret" v-model="pub1Secret" :rules="pubRules" solo required></v-text-field>
            <v-btn @click="submit" :disabled="!valid" color="primary mt-4">Create</v-btn>
            <p class="red--text" v-if="error">{{error}}</p>
          </v-form>
        </div>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import { createContract } from "../stellar.js";
import axios from "../axios.js";

export default {
  props: ["accountPublic"],
  data: () => ({
    dialog: false,
    valid: false,
    pub1: "",
    pubRules: [v => !!v || "Pubkey is required"],
    pub2: "",
    amount: "",
    pub1Secret: "",
    error: ""
  }),
  methods: {
    submit() {
      this.valid = false;
      createContract(this.accountPublic, this.pub2, this.amount, this.pub1Secret).then(
        ({ envelope1, envelope2, envelope3 }) => {
          axios
            .post("api/contract", {
              pub1: this.accountPublic,
              pub2: this.pub2,
              envelope1,
              envelope2,
              envelope3
            })
            .then(() => {
              console.log("success");
              this.$eventHub.$emit("loadContract");
              this.valid = true;
              this.dialog = false;
            })
            .catch(error => {
              console.log(error);
              this.valid = true;
              this.error = "some error, check console";
            });
        }
      );
    }
  }
};
</script>

<style>
</style>
