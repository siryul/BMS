<template>
  <div class="common-layout">
    <el-container>
      <el-aside>
        <slot name="aside"></slot>
      </el-aside>
      <el-container>
        <el-header>
          <slot name="header"></slot>
        </el-header>
        <el-main>
          <slot name="main"></slot>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<style scoped lang="scss">
.common-layout {
  height: 100vh;
  width: 100vw;
  display: flex;
  overflow: hidden;
}

.el-aside {
  width: 300px;
}

.el-header {
  padding: 0;
}

.el-main {
  padding: 0;
  position: relative;
}
</style>
