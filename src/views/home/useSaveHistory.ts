import { useChatStore } from '@/stores/chat'
import type { IChat } from '@/types'

const chatStore = useChatStore()

export const useSaveHistory = (chat: IChat) => {
  chatStore.addToHistory(chat)
}
