<template>
  <v-app>
    
    <v-toolbar dark color="primary" app>
      <v-toolbar-title class="white--text">
        Stellar Escrow
      </v-toolbar-title>
    </v-toolbar>

    <v-content>
      <router-view/>
    </v-content>
  </v-app>
</template>

<script>

export default {
  name: 'App',
  data () {
    return {
      //
    }
  }
}
</script>
