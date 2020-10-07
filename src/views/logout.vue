<template>
  <v-container>
        <v-row>
            <v-col>
           
            
             
            </v-col>
        </v-row>
    </v-container>
</template>


<script>
import { getStore,setStore } from '@/config/utils';
export default {
   data() {
        return {
          user : {}
        };
   },
  created ()  {
    this.user = getStore("user");
    setStore("user",null);
     this.$router.push({ name: 'main' });
  }

  }
 

</script>