<script lang="ts" setup>
import { ElementPlus } from '@element-plus/icons-vue'
import { generate } from '@/api/chat'
import { ROLE, type IMessage } from '@/types/index'
import { ref } from 'vue'
import ChatItem from '@/components/ChatItem.vue'

interface IMssageList extends IMessage {
  time: string
}

const message = ref('')
const messageList = ref<IMssageList[]>([])

function sendMessage(e: KeyboardEvent) {
  if (e.code === 'Enter') {
    const msg = message.value.trim()
    if (msg) {
      messageList.value.push({
        role: ROLE.USER,
        content: msg,
        time: Date.now().toString(),
      })
      generate(msg)
        .then(data => {
          messageList.value.push({
            role: ROLE.ASSISTANT,
            content: data.response,
            time: data.created_at,
          })
        })
        .catch(err => {
          Promise.reject(err)
        })
    }
  }
}
</script>

<template>
  <div class="home-container">
    <ul class="msg-container">
      <li v-for="m of messageList" :key="m.time">
        <ChatItem :role="m.role" :content="m.content" />
      </li>
    </ul>
    <div class="input-container">
      <input
        v-model="message"
        type="text"
        class="input"
        @keydown="sendMessage"
      />
      <ElementPlus style="width: 1.25em; height: 1.25em; margin: 0 0.5rem" />
    </div>
  </div>
</template>

<style scoped lang="scss">
.home-container {
  height: 100%;
  width: 100%;
  position: relative;
  padding-bottom: 60px;
}

.input-container {
  position: absolute;
  width: 70%;
  bottom: 0;
  height: 40px;
  left: 50%;
  transform: translate(-50%);
  outline: 1px solid var(--color-border-base);
  border-radius: 0.5rem;
  display: flex;
  align-items: center;
  background-color: white;
  box-shadow: 0 0 5px var(--color-border-base);
}

.input {
  height: 100%;
  flex: 1;
  background: transparent;
  border: none;
  outline: none;
  padding-left: 0.5rem;
  font-size: 1.25rem;
}
</style>
