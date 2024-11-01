<script lang="ts" setup>
import { useModelsStore } from '@/stores/models'
import { ArrowDown, CopyDocument } from '@element-plus/icons-vue'
import { storeToRefs } from 'pinia'

const modelsStore = useModelsStore()

const { models, currentModels } = storeToRefs(modelsStore)
</script>

<template>
  <div class="header-container">
    <el-dropdown v-if="currentModels">
      <el-button type="primary">
        {{ currentModels.name.split(':')[0]
        }}<el-icon class="el-icon--right"><arrow-down /></el-icon>
      </el-button>
      <template #dropdown>
        <el-dropdown-menu>
          <el-dropdown-item v-for="m of models" :key="m.digest">{{
            m.name.split(':')[0]
          }}</el-dropdown-item>
        </el-dropdown-menu>
      </template>
    </el-dropdown>
    <el-icon><CopyDocument /></el-icon>
  </div>
</template>

<style scoped lang="scss">
.header-container {
  width: 100%;
  height: 100%;
  background-color: rgb(242, 243, 245);
  border-bottom: 1px solid var(--color-border-base);
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 20px;
}
</style>
