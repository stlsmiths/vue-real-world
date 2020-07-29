<template>
  <div>
    <form @submit.prevent="createEvent">

      <BaseSelect
          label="Select a category"
          :options="categories"
          v-model="event.category"
          class="field"
      />

      <h3>Name & describe your event</h3>
      <BaseInput v-model="event.title"
                label="Title"
                type="text"
                class="field"
                placeholder="Add an event title"/>

        <BaseInput
            v-model="event.description"
            type="text"
            label="Description"
            class="field"
            placeholder="Add a description"
        />

      <h3>Where is your event?</h3>
      <BaseInput
          v-model="event.location"
          class="field"
          label="Location"
          type="text" placeholder="Add a location"
      />

      <h3>When is your event?</h3>
      <div class="field">
        <label>Date</label>
        <datepicker v-model="event.date" placeholder="Select a date"/>
      </div>

      <BaseSelect
        v-model="event.time"
        label="Select a time"
        :options="times"
        class="field"
      />

<!--
      <input type="submit" class="button -fill-gradient" value="Submit"/>
-->
      <BaseButton
          type="submit"
          button-class="-fill-gradient"
      >Submit</BaseButton>

    </form>
  </div>
</template>

<script>
  import Datepicker from 'vuejs-datepicker'
  import NProgress from 'nprogress'
  import BaseIcon from "@/components/BaseIcon";
  import BaseInput from "@/components/BaseInput";
  import BaseSelect from "@/components/BaseSelect";
  import BaseButton from "@/components/BaseButton";
  
  export default {
    components: {
      BaseSelect,
      BaseInput,
      BaseButton,
      // BaseIcon,
      Datepicker
    },
    data() {
      const times = []
      for (let i = 1; i <= 24; i++) {
        times.push(i + ':00')
      }
      return {
        event: this.createFreshEvent(),
        times,
        categories: this.$store.state.categories,
      }
    },
/*
    computed: mapState({
      event: state => state.event.event
    }),
*/
    methods: {
      createEvent() {
        NProgress.start()
        this.$store.dispatch('event/createEvent', this.event)
          .then((resp) => {
            this.$router.push({
              name: 'event-show',
              params: { id: this.event.id }
            })
            this.event = this.createFreshEvent()
          })
          .catch(() => {
            NProgress.done()
          })
      },
      createFreshEvent() {
        const user = this.$store.state.user.user
        const id = Math.floor(Math.random() * 10000000)
        return {
          id: id,
          category: '',
          organizer: user,
          title: '',
          description: '',
          location: '',
          date: '',
          time: '',
          attendees: []
        }
      }
    }
  }
</script>

<style scoped>
  .field {
    margin-bottom: 24px;
  }
</style>
