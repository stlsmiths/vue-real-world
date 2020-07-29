<template>
  <div>
    <label v-if="label">{{ label }}</label>
    <select
        :value="value"
        @change="updateValue"
        v-on="$listeners"
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
  inheritAttrs: false,
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
