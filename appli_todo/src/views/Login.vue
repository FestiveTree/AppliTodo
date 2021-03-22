<template>
  <div class="my-6 text-center">
    <h2 class="text-2xl my-2">Page de connexion</h2>
    <div class="flex flex-col items-center rounded-full  border-b-2 border-t-2">
      <div class="z-10">
        <p>Email:</p>
        <input class="bg-gray-300 focus:bg-white" v-model="inputUsername" id="user"/>
        <p>Mot de Passe:</p>
        <input class="bg-gray-300 focus:bg-white" v-model="inputPassword" id="pass" type="password"/>
      </div>
      <button class=" my-2 bg-gray-500 hover:bg-gray-400 text-white font-bold py-2 px-4 border-b-4 border-gray-700 hover:border-gray-500 rounded" v-on:click="doLogin">Se connecter</button>
      <p class="pb-2"> Vous n'avez pas de compte ? <router-link to="/register" class="hover:text-blue-500 hover:underline cursor-pointer"> Cliquez ici pour créer un compte.</router-link> </p>
    </div>
  </div>
  <h1 v-if="displayLoggedOn">Vous êtes connecté!</h1>
</template>

<script>
import { defineComponent } from 'vue'
import { mapActions} from 'vuex'
import router from '../router';

export default defineComponent({
  name: 'Login',
  data() {
          return {
              inputUsername: 'TestAPI33t6ws@monmail.fr.nf',
              inputPassword: 'Toto1234##',
              displayLoggedOn: false,
          }
  },

  methods: {
    ...mapActions('account', ['login']),
    ...mapActions('todolist', ['load']),
    doLogin() {
        this.login(
            {
                email: this.inputUsername,
                password: this.inputPassword,

                // Debut de callback
                callback: (result) => {
                    if (result.status == 200) {
                        console.log('Connection effectuee');

                        // Chargement des todos
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
