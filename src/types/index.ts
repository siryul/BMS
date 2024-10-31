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

export interface IResponse {
  model: string
  created_at: string
  response: null | string
  done: boolean
  context?: number[] // 此响应中使用的对话的编码，可以在下一个请求中发送以保持对话记忆
  total_duration?: number // 生成响应所花费的时间
  load_duration?: number // 加载模型所花费的时间（以纳秒为单位）
  prompt_eval_count?: number // 提示符中的令牌数
  prompt_eval_duration?: number // 评估提示所花费的时间（以纳秒为单位）
  eval_count?: number // 响应中的令牌数
  eval_duration?: number // 生成响应所花费的时间（以纳秒为单位）
}

export interface IModel {
  name: string
  modified_at: string
  size: number
  digest: string
  details: {
    format: string
    family: string
    families: null | string[]
    parameter_size: string
    quantization_level: string
  }
}

export interface IModelInfo {
  name: string
  verbose?: boolean
}

export interface IPullPushParams {
  name: string
  insecure?: boolean
  stream?: boolean
}

export interface IPResponse {
  status: string
  digest?: string
  total?: number
}

export interface IPullResponse extends IPResponse {
  completed?: number
}
