<script lang="ts" setup>
import Container from './components/@core/content'
import Sidebar from './components/@core/sidebar'
import { Provider } from './utils/search-context'
import { RouterView } from 'vue-router'
</script>

<template>
  <Provider>
    <Sidebar />
    <Container>
      <RouterView></RouterView>
    </Container>
  </Provider>
</template>

<style lang="scss" scoped></style>
