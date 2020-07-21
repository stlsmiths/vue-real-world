<template>
  <div>
    <h1>Create an event, {{ user.id}}</h1>
    <p>Event created by {{ user.name }} with {{ catLength }} categories</p>
    <ul>
      <li v-for="cat in categories" :key="cat">{{ cat }}</li>
    </ul>
    <br>
    <input type="number" v-model.number="incrementBy">
    <button @click="incrementCount">Increment {{ count }}</button>
  </div>
</template>

<script>
  import {mapState} from 'vuex';

  export default {
    data(){
      return {
        incrementBy: 1
      }
    },
    methods: {
      incrementCount() {
/*
        if ( this.incrementBy === 1) {
          this.$store.commit('INCREMENT_COUNT')
        } else {
          this.$store.commit('INCREMENT_COUNT_BY', this.incrementBy)
        }
*/
        this.$store.dispatch( 'updateCount', this.incrementBy)
      }
    },
    computed: {
      catLength() {
       return this.$store.getters.catLength;
      },
      ...mapState( ['user','categories','count'])
    }
  }
</script>

<style scoped>

</style>
