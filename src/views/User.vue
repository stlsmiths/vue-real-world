<template>
  <div class="user">
    <MediaBox>
      <p slot="heading">Events for {{ username }}</p>
    </MediaBox>
  </div>
</template>

<script>
import MediaBox from '@/components/MediaBox.vue'

export default {
  props: ['username'],
  components: {
    MediaBox
  }
}
</script>
