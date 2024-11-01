<script lang="ts" setup>
import { ElementPlus } from '@element-plus/icons-vue'
import { ElMessage } from 'element-plus'
import { generateWithFetch } from '@/api/chat'
import { ROLE, type IMessage } from '@/types/index'
import { ref } from 'vue'
import ChatItem from '@/components/ChatItem.vue'
import { storeToRefs } from 'pinia'
import { useModelsStore } from '@/stores/models'
import { useFetchMessage } from './useParseMessage'

// 用户输入的消息
const message = ref('')

// 消息列表
const messageList = ref<IMessage[]>([])

const modelsStore = useModelsStore()
const { currentModels } = storeToRefs(modelsStore)

/**
 * 处理发送消息的逻辑
 * @param {KeyboardEvent} e - 键盘事件对象
 */
async function sendMessage(e: KeyboardEvent) {
  // 如果按下的不是回车键，则返回
  if (e.code !== 'Enter') {
    return
  }

  // 获取并修剪用户输入的消息
  const msg = message.value.trim()

  // 如果消息为空，则返回
  if (msg === '') {
    return
  }

  // 如果当前模型未加载，则显示错误消息
  if (!currentModels.value) {
    ElMessage({
      showClose: true,
      message: 'Model not loaded...',
      type: 'error',
    })
    return
  }

  // 清空输入框
  message.value = ''

  // 将用户消息添加到消息列表中
  messageList.value.push({
    role: ROLE.USER,
    content: msg,
    // time: Date.now().toString(),
  })

  try {
    const reader = await generateWithFetch(
      msg,
      currentModels.value.name.split(':')[0],
    )

    messageList.value.push({
      role: ROLE.ASSISTANT,
      content: '',
    })
    useFetchMessage(messageList.value.at(-1)!, reader)
  } catch (error) {
    ElMessage({ message: (error as any).message })
  }
}
</script>

<template>
  <div class="home-container">
    <ul class="msg-container">
      <li v-for="(m, i) in messageList" :key="i">
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
  padding: 1.5rem;
  height: 100%;
  width: 100%;
  max-width: 800px;
  display: flex;
  flex-direction: column;
  margin: 0 auto;
}

.msg-container {
  flex: 1;
  overflow-y: auto;

  &::-webkit-scrollbar {
    visibility: hidden;
  }
}

.input-container {
  bottom: 2rem;
  height: 40px;
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
