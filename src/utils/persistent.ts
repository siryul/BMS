import type { IChat } from '@/types'

const TOKEN = 'HISTORY'

// const request = window.indexedDB.open(DB_NAME, 1)

export const save = (data: IChat[], where: 'LOCALSTORAGE' = 'LOCALSTORAGE') => {
  if (where === 'LOCALSTORAGE') {
    localStorage.setItem(TOKEN, JSON.stringify(data))
  }
}

export const get = (where: 'LOCALSTORAGE' = 'LOCALSTORAGE') => {
  let result: IChat[] = []
  if (where === 'LOCALSTORAGE') {
    const history = localStorage.getItem(TOKEN)
    if (history) {
      result = JSON.parse(history)
    }
  }

  return result
}
