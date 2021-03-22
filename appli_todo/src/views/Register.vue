<template>
  <div class="my-6 text-center">
    <h2 class="text-2xl my-2">Page d'inscription</h2>
    <div class="flex flex-col items-center rounded-full  border-b-2 border-t-2">
      <div class="z-10">
        <p>Identifiant:</p>
        <input class="bg-gray-300 focus:bg-white" v-model="inputUsername" id="user"/>
        <p>Email:</p>
        <input class="bg-gray-300 focus:bg-white" v-model="inputEmail" id="mail"/>
        <p>Mot de Passe:</p>
        <input class="bg-gray-300 focus:bg-white" v-model="inputPassword" id="pass" type="password"/>
      </div>

      <button class=" my-2 bg-gray-500 hover:bg-gray-400 text-white font-bold py-2 px-4 border-b-4 border-gray-700 hover:border-gray-500 rounded" v-on:click="doRegister">Créer un compte</button>
    </div>
  </div>

  <h1 v-if="displayLoggedOn">Vous êtes inscrit!</h1>
</template>

<!-- flex flex-col h-screen my-auto items-center border-8 border-double border-gray-700"-->

<script>
import { defineComponent } from 'vue'
import { mapActions} from 'vuex'
import router from '../router';

export default defineComponent({
  name: 'Home',
  data() {
          return {
              inputUsername: '',
              inputPassword: '',
              inputEmail: '',
              displayLoggedOn: false,
          }
  },

  methods: {
    ...mapActions('account', ['register']),
    ...mapActions('todolist', ['load']),
    doRegister() {
        console.log(this.inputUsername,this.inputPassword)
        this.register(
            {
                email: this.inputEmail,
                password: this.inputPassword,
                username: this.inputUsername,

                //Debut de callback
                callback: (result) => {
                    if (result.status == 200) {
                        console.log('Inscription effectuee');

                        //Chargement des todos
                        this.load();

                        this.displayLoggedOn = true;

                        // Redirection.
                        setTimeout(
                            function() {
                                router.push("/");
                            },
                            1000
                        );

                } else {
                  console.log('Erreur de connection')
                }
              }
              // Fin de callback
            }
        );
    },
  }
})

</script>
