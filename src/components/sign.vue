<template>
    <v-dialog v-model="dialog" width="600">
      <v-btn slot="activator" color="warning" dark>Sign with my secret</v-btn>
      <v-card>
        <v-card-title class="headline grey lighten-2" primary-title>Escrow Contract</v-card-title>
        <div class="pa-3">
          <v-form ref="form" v-model="valid" lazy-validation>

            <h3 class="mt-5 light-blue--text">Secret of your account</h3>
            <v-text-field placeholder="secret" v-model="secret" :rules="secretRules" solo required></v-text-field>
            <v-btn @click="submit" :disabled="!valid" color="primary mt-4">Sign</v-btn>
            <p class="red--text" v-if="error">{{error}}</p>
          </v-form>
        </div>
      </v-card>
    </v-dialog>
</template>

<script>
import {signEnvelope} from '../stellar.js'
import axios from '../axios.js';
export default {
    props: ['number', 'envelope'],
    data: ()=> ({
        dialog: false,
        valid: false,
        secret: "",
        secretRules: [v => !!v || "Secret is required"],
        error: ""
    }),
    methods: {
        submit(){
            this.valid = false;
            const envelope = signEnvelope(this.envelope, this.secret);
            axios.put('/api/contract', {
                envelope: envelope,
                number: this.number
            }).then(()=>{
                console.log("success");
                this.valid = true;
                this.$eventHub.$emit('loadContract');
                this.dialog = false;
            }).catch((error)=>{
                console.log(error);
                this.valid = true;
                this.error = "Not successful, check console";
            })
        }
    }
}
</script>

<style>

</style>
