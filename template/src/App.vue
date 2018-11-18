<template>
  <section id="app">
    <h1>{{ head }}</h1>

    <router-view />
  </section>
</template>

<script>
export default {
  name: 'app',

  data() {
    return {
      head: 'My Vue App'
    }
  },

  created() {
    fetch('/api/test', {
      method: 'GET'
    }).then(response => {
      console.log(response)
    })
  }
}
</script>

<style lang="less" scoped>
#app {
  color: blue;
}
</style>
