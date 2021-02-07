<template>
  <div>
    <h2 v-if="title" class="mb-8">{{ title }}</h2>
    <v-list subheader two-line>
      <v-list-item
        v-for="item in content"
        :key="item.path"
        :to="{
          path: item.path,
        }"
        nuxt
        class="elevation-1 mb-6"
      >
        <v-list-item-content>
          <v-list-item-title v-text="item.title"></v-list-item-title>

          <v-list-item-subtitle
            v-text="item.description"
          ></v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>
    </v-list>
  </div>
</template>

<script>
export default {
  props: {
    contentType: {
      type: String,
      default: 'notes',
    },
    title: {
      type: String,
      require: false,
      default: '',
    },
  },
  data() {
    return {
      content: [],
    }
  },
  async created() {
    const content = await this.$content(this.contentType, { deep: true })
      .only(['title', 'description', 'category', 'slug', 'path'])
      .sortBy('updatedAt')
      .limit(10)
      .fetch()
    this.content = content
  },
}
</script>

<style></style>
