<template>
  <h2>Welcome: LOGIN page</h2>
  <p>Identifiant:</p>
  <input v-model="inputUsername" id="user"/>
  <p>Mot de Passe:</p>
  <input v-model="inputPassword" id="pass" type="password"/>
  <button v-on:click="doLogin">Login</button>
</template>

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
