<template>
  <div>
    <h1>Events Listing: ({{ user.user.name }})</h1>
    <EventCard v-for="event in event.events" :key="event.id" :event="event" />

    <!--  Pagination -->
    <template v-if="page > 1">
      <router-link :to="{name:'event-list', query:{page: page - 1, perpage: perPage}}" rel="prev">
        Previous</router-link>
    </template>

    <template v-if="page !== lastPage">
      <router-link :to="{name:'event-list', query:{page: page + 1, perpage: perPage}}" rel="next">
        Next</router-link>
    </template>

    <select name="ppg" v-model="perPage" @change="changePerPage">
      <option v-for="pg in pageChoices" :key="pg" :value="pg">{{ pg }}</option>
    </select>

    <p>{{ lastPage + ' Page' + ( lastPage > 1 ? 's' : '')}}</p>

  </div>
</template>

<script>
import EventCard from '@/components/EventCard.vue'
import {mapState} from 'vuex'
import store from '@/STORE/store'

const getPageEvents = (routeTo, next, page = 1, perpage = 3) => {
    const currentPage = parseInt( routeTo.query.page) || page
    const perPage = parseInt( routeTo.query.perpage) || perpage
    store.dispatch('event/fetchEvents',{
      page: currentPage,
      perpage: perPage
    }).then( () => {
      next()
    })
}

export default {
  props: {
    page: {
      type: Number,
      default: 1,
     // required: true
    },
    perPage: {
      type: Number,
      default: 3,
     // required: true
    }
  },

  components: {
    EventCard
  },
  beforeRouteEnter( routeTo, routeFrom, next) {
    getPageEvents(routeTo,next)
  },
  beforeRouteUpdate(routeTo, routeFrom, next) {
    getPageEvents(routeTo,next)
  },
  data() {
    return {
      //page: parseInt( this.$route.query.page) || 1,
      //perPage: parseInt( this.$route.query.perpage) || 3,
      pageChoices: [ 3, 4, 5, 20 ]
    }
  },
  computed: {
    totalEvents() {
      return this.$store.getters['event/getTotalEvents']
    },
    lastPage() {
      return Math.ceil(this.totalEvents / this.event.perPage)
    },
    ...mapState(['event', 'user'])
  },
  methods: {
    changePerPage() {
      //this.$store.dispatch()
      store.dispatch('event/setPerPage', this.perPage)
      this.$router.push({name:'event-list',query:{
          page: 1,
          perpage: this.perPage
        }
      });
    }
  },
  created() {
    // this.perPage = this.event.event.perPage
  }
}
</script>

<style scoped></style>
