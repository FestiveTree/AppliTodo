<template>
  <div class="my-6 text-center">
    <h2 class="text-2xl my-2">Page de connexion</h2>
    <div class="flex flex-col items-center rounded-full  border-b-2 border-t-2"> 
      <div class="z-10">
        <p>Identifiant:</p>
        <input class="bg-gray-300 focus:bg-white" v-model="inputUsername" id="user"/>
        <p>Mot de Passe:</p>
        <input class="bg-gray-300 focus:bg-white" v-model="inputPassword" id="pass" type="password"/>
      </div>
      
      <button class=" my-2 bg-gray-500 hover:bg-gray-400 text-white font-bold py-2 px-4 border-b-4 border-gray-700 hover:border-gray-500 rounded" v-on:click="doLogin">Login</button>
    </div>
  </div>
</template>

<!-- flex flex-col h-screen my-auto items-center border-8 border-double border-gray-700"-->

<script>
import { defineComponent } from 'vue'
import { mapActions} from 'vuex'

export default defineComponent({
  name: 'Home',
  data() {
          return {
              inputUsername: '',
              inputPassword: ''
          }
  },

  created() {
    this.load()
  },

  methods: {
    ...mapActions('account', ['login']),
    ...mapActions('todolist', ['load']),
    doLogin() {
        console.log(this.inputUsername,this.inputPassword)
        this.login(
            {
                email: this.inputUsername,
                password: this.inputPassword,

                //Debut de callback
                callback: (result) => {
                    if (result.status == 200) {
                        console.log('Connection effectuee');

                        //Chargement des todos
                        this.load();

                        // Redirection au bout de 3 secondes.
                        setTimeout(
                            function() {
                                //Code de redirection ici
                            },
                            3000
                        );

                } else {
                  console.log('Erreur de connection')
                  // Faudrait genre afficher un message d'erreur
                }
              }
              // Fin de callback
            }
        );
    },
  }
})

</script>
