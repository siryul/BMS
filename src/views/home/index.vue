<script lang="ts" setup>
import { ElementPlus } from '@element-plus/icons-vue'
import { ElMessage } from 'element-plus'
import { generate } from '@/api/chat'
import { ROLE, type IMessage } from '@/types/index'
import { ref, onMounted } from 'vue'
import ChatItem from '@/components/ChatItem.vue'
import { storeToRefs } from 'pinia'
import { useModelsStore } from '@/stores/models'

interface IMssageList extends IMessage {
  time: string
}

// 用户输入的消息
const message = ref('')

// 消息列表
const messageList = ref<IMssageList[]>([])

// 定义对 DOM 元素的引用，用于获取 home 和 inputer 元素
const homeRef = ref<HTMLElement | null>(null)
const inputerRef = ref<HTMLElement | null>(null)

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
    time: Date.now().toString(),
  })

  // 调用生成函数获取响应，并将响应添加到消息列表中
  const data = await generate(msg, currentModels.value.name.split(':')[0])
  messageList.value.push({
    role: ROLE.ASSISTANT,
    content: data.response,
    time: data.created_at,
  })
}

/**
 * 设置输入框的位置和宽度
 */
const setPosition = () => {
  if (inputerRef.value && homeRef.value) {
    const width = homeRef.value.clientWidth
    inputerRef.value.style.width = width * 0.7 + 'px'
    inputerRef.value.style.right = width / 2 + 'px'
  }
}

// 组件挂载时，设置输入框位置并监听窗口大小变化
onMounted(() => {
  setPosition()

  window.addEventListener('resize', setPosition)
})
</script>

<template>
  <div class="home-container" ref="homeRef">
    <ul class="msg-container">
      <li v-for="m of messageList" :key="m.time">
        <ChatItem :role="m.role" :content="m.content" />
      </li>
    </ul>
    <div class="input-container" ref="inputerRef">
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
  position: fixed;
  bottom: 2rem;
  height: 40px;
  transform: translateX(50%);
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
