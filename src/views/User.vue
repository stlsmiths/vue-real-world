<template>
  <div class="user">
    <MediaBox>
      <p slot="heading">This is {{ username }}</p>
      <i>He is a wonderful dude!, seriously.</i>
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
