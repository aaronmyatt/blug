<template>
  <v-row>
    <v-col cols="12" md="4">
      <LatestContentList content-type="notes" title="Notes and Resources" />
    </v-col>
    <v-col cols="12" md="4">
      <LatestContentList content-type="drafts" title="Drafts" />
    </v-col>
    <v-col cols="12" md="4">
      <LatestContentList content-type="articles" title="Articles" />
    </v-col>
  </v-row>
</template>
