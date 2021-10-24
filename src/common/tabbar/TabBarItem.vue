<template>
  <div class="tab-bar-item" @click="itemClick" :style="chosenStyle">
    <div :style="activeStyle"><slot name="item-text"></slot></div>
  </div>
</template>

<script>
export default {
  name: "TabBarItem",
  props: {
    link: String,
    activeColor: {
      type: String,
      default: "red"
    }
  },
  computed: {
    active() {
      return this.$route.path.indexOf(this.link) !== -1;
    },
    activeStyle() {
      return this.active ? { color: this.activeColor } : {}
    },
    chosenStyle() {
      return this.active ? { "background-color": "lightseagreen" } : {};
    }
  },
  methods: {
    itemClick() {
      this.$router.replace(this.link)
    }
  }
}
</script>

<style scoped>
  .tab-bar-item {
    flex: 1;
    text-align: center;
    font-size: 25px;
    line-height: 49px;
  }

</style>
