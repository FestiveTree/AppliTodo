<template>
  <router-link  to="/" ><img class="bg-gray-400" src="./assets/home.png" width="32" height="32" ></router-link>
  <router-link to="/login">Go to Login</router-link>

  <!-- component matched by the route will render here -->
  <router-view></router-view>
</template>

<script>
export default {
  name: 'App'
}
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
