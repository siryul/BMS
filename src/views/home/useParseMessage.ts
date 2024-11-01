import type { IMessage } from '@/types'

export const useFetchMessage = async (
  messageRef: IMessage,
  reader: ReadableStreamDefaultReader<Uint8Array> | undefined,
) => {
  if (reader) {
    const decoder = new TextDecoder()

    while (true) {
      const { done, value } = await reader.read()
      if (done) {
        break
      }
      const chunk = JSON.parse(decoder.decode(value))
      messageRef.content += chunk.response
    }
  }
}
