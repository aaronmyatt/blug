<template>
  <nuxt-content :document="content" />
</template>

<script>
export default {
  async asyncData({ $content, route }) {
    const pathWithoutPreceedingSlash = route.path.slice(1)
    const content = await $content(pathWithoutPreceedingSlash).fetch()
    return { content }
  },
  data() {
    return {
      content: {},
    }
  },
}
</script>

<style></style>
