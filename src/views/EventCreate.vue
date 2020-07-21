<template>
  <div>
    <h1>Create an event, {{ user.id}}</h1>
    <p>Event created by {{ user.name }} with {{ catLength }} categories</p>
    <ul>
      <li v-for="cat in categories" :key="cat">{{ cat }}</li>
    </ul>
  </div>
</template>

<script>
  import {mapState} from 'vuex';

  export default {
    computed: {
      catLength() {
       return this.$store.getters.catLength;
      },
      ...mapState( ['user','categories'])
    }
  }
</script>

<style scoped>

</style>
