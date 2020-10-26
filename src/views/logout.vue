<template>
  <v-container>
        <v-row>
            <v-col>
           
            
             
            </v-col>
        </v-row>
    </v-container>
</template>


<script>
import Utils from '@/utils/utils';
export default {
   data() {
        return {
          user : {}
        };
   },
  created ()  {
    this.user = Utils.getStore("user");
    Utils.setStore("user",null);
     this.$router.push({ name: 'main' });
  }

  }
 

</script>