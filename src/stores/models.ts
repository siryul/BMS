import { ref, readonly } from 'vue'
import { defineStore } from 'pinia'
import type { IModel } from '@/types'
import { listModel } from '@/api/chat'

export const useModelsStore = defineStore('models', () => {
  const _models = ref<IModel[]>([])
  const _selectedModelIndex = ref(-1)
  const _isLoading = ref(false)

  const currentModels: ComputedRef<IModel | null> = computed(() => {
    if (_selectedModelIndex.value === -1) {
      // 初始化远程数据还没回来
      return null
    }
    if (_selectedModelIndex.value === _models.value.length) {
      throw new Error('Model does not exist, please add first')
    }
    return _models.value[_selectedModelIndex.value]
  })

  const setModels = async (m: IModel[]) => {
    _models.value = m
  }

  const setSelectedModelIndex = (i: number) => {
    _selectedModelIndex.value = i
  }

  const setIsLoading = (isLoading: boolean) => {
    _isLoading.value = isLoading
  }

  const addModel = () => {
    // TODO
  }

  const fetchModels = async () => {
    setIsLoading(true)
    const resp = await listModel()
    setModels(resp.models)
    if (resp.models.length > 0) {
      setSelectedModelIndex(0)
    }
    setIsLoading(false)
  }

  return {
    models: readonly(_models),
    isLoading: readonly(_isLoading),
    currentModels,
    fetchModels,
    setSelectedModelIndex,
  }
})
