import './assets/main.css'
import 'highlight.js/styles/github.css'
import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'
import { useModelsStore } from './stores/models'

const app = createApp(App)

app.use(createPinia())
app.use(router)

app.mount('#app')

useModelsStore().fetchModels()
