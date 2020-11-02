<template>
    <v-app>
      <NavBar :key="$route.fullPath" />
      <v-main class="light">
        <v-container>
          <router-view />
        </v-container>
      </v-main>
    </v-app>
</template>

<script>

import NavBar from '@/components/NavBar';
import Utils from '@/utils/utils';

export default {
  name: 'App',
  components: {
    NavBar
  },
  data() {
    return {
        user : {}
    }
  },
  created() {

    this.user = Utils.getStore('user');
  }
}
</script>
