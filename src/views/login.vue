<template>
  <div class="main-container">
    <form>
      <div class="box-container">
        <h2 class="heading">Sign In with Google</h2>

   
        <div class="login-choice"><span>or Sign In with</span></div>
        <SocialLogin />
      </div>
    </form>
    
  </div>
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