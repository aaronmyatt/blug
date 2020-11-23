<template>
  <v-app dark>
    <v-app-bar app dense>
      <v-app-bar-nav-icon :to="{ path: '/' }">
        <div :style="{ border: '2px solid', padding: '4px' }">ATM</div>
      </v-app-bar-nav-icon>
      <v-spacer />

      <v-btn nuxt :to="{ path: '/notes' }"> N & R </v-btn>

      <v-btn nuxt :to="{ path: '/drafts' }" class="text-truncate">
        Drafts
      </v-btn>

      <v-btn nuxt :to="{ path: '/articles' }" class="text-truncate">
        Articles
      </v-btn>

      <v-divider class="mx-4" vertical />
      <v-btn nuxt :to="{ path: '/about' }"> About </v-btn>
      <v-spacer />
    </v-app-bar>
    <v-main>
      <v-container>
        <nuxt />
      </v-container>
    </v-main>
    <v-footer app>
      <span>&copy; {{ new Date().getFullYear() }}</span>
    </v-footer>
  </v-app>
</template>

<script>
export default {
  data() {
    return {
      drawer: false,
      title: 'Blug',
    }
  },
}
</script>
