<template>
  <div class="flex items-stretch justify-center w-screen space-x-4">
    <router-link  to="/" ><img class="p-1 my-2 bg-gray-400 hover:bg-gray-300 rounded " src="./assets/home.png" width="32" height="32" ></router-link>
    <router-link v-if="!loggedOn" class="p-1 bg-gray-400 my-2  hover:bg-gray-300 rounded " to="/login">Connexion</router-link>
    <router-link v-if="!loggedOn" class="p-1 bg-gray-400 my-2  hover:bg-gray-300 rounded " to="/register">Inscription</router-link>
    <a v-if="loggedOn" class="p-1 my-2 bg-gray-400 hover:bg-gray-300 rounded cursor-pointer" v-on:click="disconnect">Déconnexion</a>
  </div>
  <!-- Component matched by the route will render here -->
  <router-view></router-view>
</template>

<script>
import { defineComponent } from "@vue/runtime-core"
import { mapGetters, mapActions } from 'vuex'

export default defineComponent({
  name: 'App',

  methods: {
    ...mapActions('account', ['disconnect']),
  },

  computed: {
    ...mapGetters('account', ['getterToken']),

    loggedOn() {
      if (this.getterToken !== null) {
        return this.getterToken !== null;
      }
      return false;
    }
  }
});
</script>