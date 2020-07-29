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
import { formBaseMixin } from "@/mixins/formBaseMixin";

export default {
  mixins: [ formBaseMixin ],
  computed: {
    listeners() {
      return {
        ...this.$listeners,
        input: this.updateValue
      }
    }
  }
}
</script>

<style scoped>

</style>
