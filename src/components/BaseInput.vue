<template>
  <div>
    <label v-if="label">{{ label }}</label>
    <input
        :id="label"
        :value="value"
        v-bind="$attrs"
        v-on="listeners"
        @input="updateValue"
    />
  </div>
</template>

<script>
export default {
  inheritAttrs: false,
  props: {
    label: [String],
    value: [String,Number]
  },
  computed: {
    listeners() {
      return {
        ...this.$listeners,
        input: this.updateValue
      }
    }
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
