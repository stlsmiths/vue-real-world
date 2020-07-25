<template>
  <div>
    <h1>Page Not Found !!</h1>
    <h3>The "{{ resource }}" you were looking for is not available</h3>
    <router-link :to="{name:'event-list'}">Back to Home Page</router-link>
  </div>
</template>

<script>
  export default {
    props: {
      resource: {
        type: String,
        required: true
      },
    },
  }
</script>
