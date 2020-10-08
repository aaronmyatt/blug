<template>
  <v-row>
    <v-col cols="12" md="4">
      <h2>Notes and Resources</h2>
      <v-list subheader two-line>
        <div v-for="category in categories" :key="category">
          <v-subheader> {{ category }} </v-subheader>
          <v-list-item
            v-for="item in filterByCategory(category)"
            :key="item.path"
            :to="{
              name: 'notes-category-slug',
              params: {
                category: category,
                slug: item.slug,
              },
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
    </v-col>
    <v-col cols="12" md="4">
      <h2>Drafts</h2>
    </v-col>
    <v-col cols="12" md="4">
      <h2>Articles</h2>
    </v-col>
  </v-row>
</template>

<script>
export default {
  async asyncData({ $content }) {
    const content = await $content('notes', { deep: true })
      .only(['title', 'description', 'category', 'slug'])
      .sortBy('updatedAt')
      .limit(10)
      .fetch()
    let categories = content.map((c) => c.category)
    categories = new Set(categories)
    return { content, categories }
  },
  data() {
    return {
      content: [],
      categories: [],
    }
  },
  methods: {
    filterByCategory(category) {
      return this.content.filter((c) => c.category === category)
    },
  },
}
</script>
