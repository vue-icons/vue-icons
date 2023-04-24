<script lang="ts" setup>
import Icon from '@/components/@core/icon'
import { getIcons } from '@/utils/getIcons'
import { onBeforeMount, ref, watch } from 'vue'
import type { IconType } from 'vue3-icons/lib'

const props = defineProps({
  icon: Object
})

const icons = ref<{ [key in string]: IconType }>({})

function getIconHandle() {
  getIcons(props.icon?.id).then((res: any) => {
    icons.value = res
  })
}

watch(
  () => props.icon?.id,
  () => {
    getIconHandle()
  }
)

onBeforeMount(() => {
  getIconHandle()
})
</script>

<template>
  <h2>Icons</h2>
  <div class="icons">
    <Icon v-for="(icon, index) in icons" :key="index" :name="index" :icon="icon" />
  </div>
</template>

<style lang="scss" scoped></style>
