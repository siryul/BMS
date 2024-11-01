import axios, { type AxiosError, type AxiosResponse } from 'axios'
import { ElMessage } from 'element-plus'

const ins = axios.create({
  timeout: 15000,
})

ins.interceptors.response.use(
  (res: AxiosResponse) => {
    return res.data
  },
  (err: AxiosError) => {
    ElMessage({
      message: err.message,
      type: 'error',
    })
    return Promise.reject(err.message)
  },
)

export default ins
