export const formBaseMixin = {
  inheritAttrs: false,
  props: {
    label: {
      type: String,
      default: ''
    },
    value: [String,Number]
  },
  methods: {
    updateValue(e) {
      this.$emit('input', e.target.value)
    }
  }
}
