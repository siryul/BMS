<script lang="ts" setup>
import { ROLE } from '@/types'
import { marked } from 'marked'

defineProps({
  role: {
    type: String,
    default: () => ROLE.USER,
  },
  content: String,
})
</script>

<template>
  <div
    class="chat-item-container"
    :style="{ flexDirection: role === ROLE.USER ? 'row-reverse' : 'row' }"
  >
    <div class="avatar">
      <el-avatar fit="cover">
        {{ role }}
      </el-avatar>
    </div>
    <div class="content" v-html="marked.parse(content || '')"></div>
  </div>
</template>

<style lang="scss" scoped>
.chat-item-container {
  display: flex;
  column-gap: 1rem;
  margin-bottom: 2rem;
}

.content {
  transform: translateY(0.65rem);
}
</style>
