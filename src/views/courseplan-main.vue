<template>
    <v-container>
        <v-row>
            <v-col>
                <H1>Course Plan</H1>               
                <h2 v-if=user>Hello, {{user.user}}</h2>    
                <h2 v-if=!user>Please Login</h2>        
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
import Utils from '@/utils/utils';
import StudentServices from '@/services/StudentServices.js';
import AdvisorServices from '@/services/AdvisorServices.js';

export default {

    data() {
        return {
            user: {},
        };
    },
    async created()  {
        this.user = Utils.getStore('user');
        document.title = "OC Course Plan"
        if(this.user != null && this.user.advisorId != null) {
          await AdvisorServices.getAdvisor(this.user.advisorId)
          .catch(() => {
            console.log("no admin login");
            Utils.setStore("user",null);
            this.$router.push({ name: 'main' });
                   
            });
        } else {
            if(this.user != null && this.user.studentId != null){
              await StudentServices.getStudent(this.user.studentId)
                .catch(() => {
                  console.log("no student login");
                  Utils.setStore("user",null);
                  this.$router.push({ name: 'main' });
              });
          }
        }
    }
}
</script>

<style></style>
