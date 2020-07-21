<template>
  <div>
    <h1>Events Listing:</h1>
    <EventCard v-for="event in events" :key="event.id" :event="event" />

    <!--  Pagination -->
    <template v-if="page > 1">
      <router-link :to="{name:'event-list', query:{page: page - 1, perpage: perPage}}" rel="prev">
        Previous</router-link>
    </template>

    <template v-if="page !== lastPage">
      <router-link :to="{name:'event-list', query:{page: page + 1, perpage: perPage}}" rel="next">
        Next</router-link>
    </template>

    <select name="ppg" v-model="perPage" @change="changePage">
      <option v-for="pg in pageChoices" :key="pg" :value="pg">{{ pg }}</option>
    </select>

    <p>{{ lastPage + ' Page' + ( lastPage > 1 ? 's' : '')}}</p>

  </div>
</template>

<script>
import EventCard from '@/components/EventCard.vue'
import {mapState} from 'vuex';

export default {
  components: {
    EventCard
  },
  data() {
    return {
      page: parseInt( this.$route.query.page) || 1,
      perPage: parseInt( this.$route.query.perpage) || 3,
      pageChoices: [ 3, 4, 5, 20 ]
    }
  },
  computed: {
    page1() {
      return parseInt( this.$route.query.page) || 1
    },
    totalEvents() {
      return this.$store.getters.getTotalEvents
    },
    lastPage() {
      return Math.ceil(this.totalEvents / this.perPage)
    },
    ...mapState(['events'])
  },
  methods: {
    changePage() {
      this.$router.push({name:'event-list',query:{
          page: 1,
          perpage: this.perPage
        }
      });
    }
  },
  created() {
    console.log('EventCreate - created');
    this.$store.dispatch('fetchEvents', {
      perPage:  this.perPage,
      page:     this.page
    });
  }
}
</script>

<style scoped></style>
