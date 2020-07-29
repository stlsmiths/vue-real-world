<template>
  <form @submit.prevent="submit">
    <input type="email"
           placeholder="Enter your email"
           v-model="email"
           :class="{ error: $v.email.$error}"
           @blur="$v.email.$touch()"
    >
    <div v-if="$v.email.$error">
      <p v-if="!$v.email.email" class="errorMessage">Please enter a valid email</p>
      <p v-if="!$v.email.required" class="errorMessage">an email is required</p>
    </div>
    <button
        type="submit"
        :disabled="$v.$invalid"
    >Submit</button>
    <p v-if="$v.$anyError" class="errorMessage">Please complete all fields!</p>
  </form>
</template>

<script>
import { email, required } from 'vuelidate/lib/validators'
export default {
  data() {
    return {
      email: null
    }
  },
  validations: {
    email: {
      required, email
    }
  },
  methods: {
    submit() {
      this.$v.$touch()
      if ( !this.$v.$invalid ) {
        console.log('form email is', this.email )
      }
    }
  },
}
</script>

<style scoped>

</style>
