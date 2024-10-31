import type {
  IModel,
  IModelInfo,
  IPResponse,
  IPullPushParams,
  IPullResponse,
  IResponse,
} from '@/types'
import request from '@/utils/request'
import type { AxiosError } from 'axios'

/**
 * 列出本地模型
 * @returns {Promise<{ models: IModel[] }>} 返回一个包含模型数组的Promise对象
 */
export const listModel = async (): Promise<{ models: IModel[] }> => {
  return request.get('/api/tags')
}

/**
 * 生成响应
 * @param {string} prompt - 用户输入的提示信息
 * @param {string} model - 使用的模型名称
 * @param {boolean} stream - 是否以流的方式返回数据，默认为 false
 * @returns {Promise<IResponse>} 返回一个包含生成结果的Promise对象
 */
export const generate = async (
  prompt: string,
  model: string,
  stream = false,
): Promise<IResponse> => {
  return request.post('/api/generate', { prompt, model, stream })
}

/**
 * 获取模型的详细信息
 * @param {modelInfo} params - 包含模型名称和可选的详细信息标志的参数对象
 * @param {string} params.name - 模型的名称
 * @param {boolean} [params.verbose] - 是否获取详细信息，默认为 false
 * @returns {Promise<any>} 返回一个包含模型信息的Promise对象
 */
export const modelInfo = async (params: IModelInfo): Promise<any> => {
  return request.post('/api/show', params)
}

/**
 * 删除指定名称的模型
 * @param {string} name - 要删除的模型名称
 * @returns {Promise<{err:string}>} 返回一个Promise对象，表示删除操作的完成与否，若错误消息为空，表示删除成功，反之失败
 */
export const deleteModel = async (name: string): Promise<{ err: string }> => {
  try {
    await request.delete(`/api/delete`, {
      data: {
        name,
      },
    })
    return { err: '' }
  } catch (error) {
    return { err: 'Failed to delete' }
  }
}

/**
 * 拉取模型
 * @param {IPullParams} params - 包含模型名称和可选参数的对象
 * @param {string} params.name - 要拉取的模型名称
 * @param {boolean} [params.insecure] - 是否允许不安全的连接，默认为 false
 * @param {boolean} [params.stream] - 是否以流的方式拉取数据，默认为 false
 * @returns {Promise<IPullResponse>} 返回一个包含拉取状态的Promise对象
 */
export const pullModel = async (
  params: IPullPushParams,
): Promise<IPullResponse> => {
  return request.post('/api/pull', params)
}

export const pushModel = async (
  params: IPullPushParams,
): Promise<IPResponse> => {
  return request.post('/api/push', params)
}
