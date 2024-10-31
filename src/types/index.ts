export interface IChatRes {
  model: string
  messages: IMessage[]
}

export enum ROLE {
  SYSTEM = 'system',
  USER = 'user',
  ASSISTANT = 'assistant',
  TOOL = 'tool',
}

export interface IMessage {
  role: ROLE // 消息的角色
  content: string // 消息的内容
  images?: string[] // 消息中包含的图像列表（仅 LLAVA 等多模态模型）
  tool_calls?: string[] // 模型要使用的工具列表
}

// {
//   "model": "llama3.2",
//   "created_at": "2023-08-04T19:22:45.499127Z",
//   "response": "The sky is blue because it is the color of the sky.",
//   "done": true,
//   "context": [1, 2, 3],
//   "total_duration": 5043500667,
//   "load_duration": 5025959,
//   "prompt_eval_count": 26,
//   "prompt_eval_duration": 325953000,
//   "eval_count": 290,
//   "eval_duration": 4709213000
// }

export interface IResponse {
  model: string
  created_at: string
  response: string
  done: boolean
  context: number[]
  total_duration: number
  load_duration: number
  prompt_eval_count: number
  prompt_eval_duration: number
  eval_count: number
  eval_duration: number
}
