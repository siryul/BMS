import type { IChatRes, IResponse } from '@/types'
import request from '@/utils/request'

export const chat = async (data: IChatRes) =>
  request.post('/api/v1/chat/completions', data)

export const generate = async (
  prompt: string,
  model: string = 'llama3.2',
): Promise<IResponse> => {
  return request.post('/api/generate', { prompt, model, stream: false })
}
