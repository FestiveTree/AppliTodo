<template>
  <div class="flex items-stretch justify-center w-screen space-x-4">
    <router-link  to="/" ><img class="p-1 my-2 bg-gray-400 hover:bg-gray-300 rounded " src="./assets/home.png" width="32" height="32" ></router-link>
    <router-link v-if="!loggedOn" class="p-1 bg-gray-400 my-2  hover:bg-gray-300 rounded " to="/login">Login -></router-link>
    <router-link v-if="!loggedOn" class="p-1 bg-gray-400 my-2  hover:bg-gray-300 rounded " to="/register">Register -></router-link>
    <a v-if="loggedOn" class="p-1 my-2 bg-gray-400 hover:bg-gray-300 rounded " v-on:click="disconnect">Disconnect</a>
  </div>
  <!-- component matched by the route will render here -->
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

<!--style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style-->
