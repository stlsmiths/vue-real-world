<template>
  <div>
    <label v-if="label">{{ label }}</label>
    <select :value="value"
            @change="updateValue"
            v-on="listeners"
            v-bind="$attrs">
      <option
          v-for="option in options"
          :value="option"
          :key="option"
          :selected="option === value"
      >{{ option }}</option>
    </select>
  </div>
</template>

<script>
import { formBaseMixin } from "@/mixins/formBaseMixin";

export default {
  mixins: [ formBaseMixin ],
  props: {
    options: {
      type: Array,
      required: true
    }
  },
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
