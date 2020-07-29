<template>
  <div>
    <label v-if="label">{{ label }}</label>
    <select
        :value="value"
        @change="updateValue"
        v-bind="$attrs">
      <option
          v-for="option in options"
          :key="option"
          :value="option"
          :selected="option === value"
      >
        {{option}}</option>
    </select>
  </div>
</template>

<script>
export default {
  props: {
    label: {
      type: String,
      default: ''
    },
    options: {
      type: Array,
      required: true
    },
    value: [String,Number]
  },
  methods: {
    updateValue(e) {
      this.$emit('input', e.target.value)
    }
  },
}
</script>

<style scoped>

</style>
