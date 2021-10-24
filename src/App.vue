<template>
  <div id="app">
    <Main/>
  </div>
</template>

<script>
import Main from './views/Main'
import router from "./router"

export default {
  name: 'App',
  components: {
    Main
  },
  router
}
</script>

<style>
body {
  margin: 0;
}

h1 {
  margin: 0;
}
</style>
