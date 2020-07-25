<template>
  <div>
    <h1>Uh-Oh!</h1>
    <h3>It looks like you may be experiencing network issues, please click the BACK button to try again.</h3>
    <router-link :to="{name:'event-list'}">Return HOME</router-link>
  </div>
</template>

<script>
  export default {

  }
</script>

<style scoped>

</style>
