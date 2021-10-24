<template>
  <div>
    <tab-bar>
      <tab-bar-item active-color="blue" link="/Separate">
        <div slot="item-text">分离</div>
      </tab-bar-item>
      <tab-bar-item active-color="blue" link="/Enlarge">
        <div slot="item-text">放大</div>
      </tab-bar-item>
      <tab-bar-item active-color="blue" link="/Enhance">
        <div slot="item-text">增强</div>
      </tab-bar-item>
    </tab-bar>
  </div>
</template>

<script>
import TabBar from "@/common/tabbar/TabBar";
import TabBarItem from "@/common/tabbar/TabBarItem";

export default {
  name: "MainTabBar",
  components: {TabBar, TabBarItem}
}
</script>

<style scoped>

</style>
