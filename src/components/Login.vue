<template>
    <v-layout>
        <v-card width="600">
            <v-card-title>
                <h3>Login</h3>
            </v-card-title>
            <v-form>
                <v-text-field
                    v-model="accountPublic"
                    label="Your Public Key"
                    placeholder="public key"
                    solo></v-text-field>

                <v-btn class="success" @click="login"> Login </v-btn>
            </v-form>
        </v-card>
    </v-layout>
</template>

<script>
export default {
    data: ()=> ({
        accountPublic: "",
    }),
    methods: {
        login(){
            this.$eventHub.$emit('login', this.accountPublic);
        }
    }
}
</script>

<style>

</style>
