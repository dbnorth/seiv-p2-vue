<template>
  <v-container>
        <v-row>
            <v-col>
              <h2> Sign In with Google</h2>
              <SocialLogin />
            </v-col>
        </v-row>
    </v-container>
</template>


<script>
import SocialLogin from '@/components/SocialLogin'
export default {
  name: 'login',
  components: {
    SocialLogin
  }
}
</script>