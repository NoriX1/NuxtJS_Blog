<template>
  <el-menu router :style="{ height: '100%' }" :default-active="$route.path">
    <el-menu-item index="/admin">
      <i class="el-icon-menu"></i>
      <span class="hidden-xs">Аналитика</span>
    </el-menu-item>
    <el-menu-item index="/admin/create">
      <i class="el-icon-edit-outline"></i>
      <span class="hidden-xs">Создать</span>
    </el-menu-item>
    <el-menu-item index="/admin/list">
      <i class="el-icon-tickets"></i>
      <span class="hidden-xs">Все посты</span>
    </el-menu-item>
    <el-menu-item index="/admin/user">
      <i class="el-icon-user"></i>
      <span class="hidden-xs">Пользователи</span>
    </el-menu-item>
    <el-menu-item index="/admin/logout">
      <i class="el-icon-circle-close"></i>
      <span class="hidden-xs">Выйти</span>
    </el-menu-item>
  </el-menu>
</template>

<style lang="scss" scoped>
.el-menu-item {
  padding-right: 60px;
}
@media only screen and (max-width: 576px) {
  .el-menu-item {
    padding: 0 20px;
  }
}
</style>
