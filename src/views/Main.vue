<template>
  <div class="root">
    <MainTabBar/>
    <keep-alive>
      <router-view/>
    </keep-alive>

  </div>
</template>

<script>
import MainTabBar from "@/components/MainTabBar";
export default {
  name: 'Main',
  components: {MainTabBar},
  props: {
    msg: String
  }
}
</script>

<style scoped>
  h1 {
    text-align: center;
    color: cornflowerblue;
  }

  .el-row {
    margin: 20px 0;
  }

</style>
