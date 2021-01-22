<template>
  <div>
    <h2 v-if="title">{{ title }}</h2>
    <v-list subheader two-line>
      <div v-for="category in categories" :key="category">
        <v-subheader> {{ category }} </v-subheader>
        <v-list-item
          v-for="item in filterByCategory(category)"
          :key="item.path"
          :to="{
            path: item.path,
          }"
          nuxt
          class="elevation-1"
        >
          <v-list-item-content>
            <v-list-item-title v-text="item.title"></v-list-item-title>

            <v-list-item-subtitle
              v-text="item.description"
            ></v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>
      </div>
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
      categories: [],
    }
  },
  async created() {
    const content = await this.$content(this.contentType, { deep: true })
      .only(['title', 'description', 'category', 'slug'])
      .sortBy('updatedAt')
      .limit(10)
      .fetch()
    let categories = content.map((c) => c.category)
    categories = new Set(categories)
    this.content = content
    this.categories = categories
  },
  methods: {
    filterByCategory(category) {
      return this.content.filter((c) => c.category === category)
    },
  },
}
</script>

<style></style>
