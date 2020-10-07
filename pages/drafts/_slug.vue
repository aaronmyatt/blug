<template>
  <nuxt-content :document="content" />
</template>

<script>
export default {
  data() {
    return {
      content: {},
    }
  },
  async mounted() {
    this.content = await this.$content(this.$route.path).fetch()
  },
}
</script>

<style></style>
