<script lang="ts" setup>
import { ROLE } from '@/types'
import markdownit from 'markdown-it'
import hljs from 'highlight.js'

defineProps({
  role: {
    type: String,
    default: () => ROLE.USER,
  },
  content: String,
})

hljs.highlightAll()

const md = markdownit({
  highlight: function (str, lang) {
    if (lang && hljs.getLanguage(lang)) {
      try {
        return hljs.highlight(str, { language: lang }).value
      } catch (__) {}
    }

    return '' // use external default escaping
  },
})

md.renderer.rules.paragraph_open = () => {
  return '<p style="margin-bottom: 1rem">'
}
</script>

<template>
  <div class="chat-item-container" :class="{ right: role === ROLE.USER }">
    <div class="avatar">
      <el-avatar fit="cover">
        {{ role }}
      </el-avatar>
    </div>
    <div class="content" v-html="md.render(content || '')" />
  </div>
</template>

<style lang="scss" scoped>
.chat-item-container {
  width: 100%;
  margin-bottom: 2rem;
  display: flex;
  position: relative;

  &.right {
    flex-direction: row-reverse;
  }
}

.avatar {
  margin-top: -0.5rem;
}

.content {
  padding: 0 1rem;
}
</style>
