<template>
  <div class="flex flex-col items-center">
  <router-link  to="/" ><img class=" my-1 bg-gray-400 hover:bg-gray-300 rounded m-auto " src="./assets/home.png" width="32" height="32" ></router-link>
  <router-link class="bg-gray-400 my-2  hover:bg-gray-300 rounded " to="/login">Login -></router-link>
  </div>
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
