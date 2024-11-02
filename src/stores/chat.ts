import type { IChat } from '@/types'
import { get, save } from '@/utils/persistent'
import { defineStore } from 'pinia'
import { v4 } from 'uuid'

export const useChatStore = defineStore('chat', () => {
  const _history = ref<IChat[]>(get())
  const _currIndex = ref(0)

  const init = () => {
    const chat: IChat = {
      id: v4(),
      chat: [],
    }
    setHistory([chat])
  }

  const setCurrIndex = (i: number) => {
    _currIndex.value = i
  }

  const currentChat = computed(() => {
    if (_currIndex.value >= _history.value.length) {
      // 没有会话记录
      init()
    }
    return _history.value[_currIndex.value]
  })

  const setHistory = (payload: IChat[]) => {
    _history.value = payload
    save(_history.value.filter(h => h.chat.length !== 0)) // 过滤掉开启了新会话，但没有任何聊天记录
  }

  const addToHistory = (chat: IChat) => {
    const isExists = _history.value.some(h => h.id === chat.id)
    if (isExists) {
      // 继续历史会话
      setHistory([..._history.value.filter(h => h.id !== chat.id), chat])
    } else {
      // 开启的新会话
      setHistory([..._history.value, chat])
    }
  }

  const switchChat = (id: string) => {
    const chat = _history.value.find(h => h.id === id)
    if (!chat) {
      return
    }
    setCurrIndex(_history.value.indexOf(chat))
  }

  return {
    history: readonly(_history),
    currentChat,
    setHistory,
    addToHistory,
    setCurrIndex,
    switchChat,
  }
})
