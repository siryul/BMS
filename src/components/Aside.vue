<script lang="ts" setup>
import { useChatStore } from '@/stores/chat'
import { storeToRefs } from 'pinia'
import { useRouter } from 'vue-router'

const chatStore = useChatStore()

const { history, currentChat } = storeToRefs(chatStore)

const router = useRouter()

const switchChat = (e: MouseEvent) => {
  const id = (e.target as HTMLElement).dataset.id
  router.push({ name: 'chat', params: { id } })
  chatStore.switchChat(id!)
}
</script>

<template>
  <div class="aside-container">
    <h1>Ollama</h1>

    <ul class="history-container" @click="switchChat">
      <li
        class="item"
        v-for="h in history"
        :key="h.id"
        :data-id="h.id"
        :class="{ active: currentChat.id === h.id }"
      >
        {{ h.id }}
      </li>
    </ul>
  </div>
</template>

<style scoped lang="scss">
@use '@/assets/styles/common.scss' as *;

.aside-container {
  width: 100%;
  height: 100%;
  padding: 1rem;
  overflow: auto;
  background-color: rgb(242, 243, 245);
  border-right: 1px solid var(--color-border-base);
  overflow-y: auto;

  &::-webkit-scrollbar {
    display: none;
  }
}

.history-container {
  margin-top: 2rem;
}

.item {
  user-select: none;
  list-style: none;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  margin: 0.5rem 0;
  padding: 0.5rem;
  border-radius: 0.5rem;
  cursor: pointer;

  &:hover,
  &.active {
    background-color: #e6e8eb;
  }
}
</style>
