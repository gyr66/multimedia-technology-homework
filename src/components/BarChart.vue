<template>
  <v-chart :option="option" ref="chart"/>
</template>

<script>
import VChart from "vue-echarts";

let category = [];
for (let i = 0; i < 256; i++) category.push(i);

export default {
  name: "BarChart",
  components: {VChart},
  props: {
    data: {type: Array},
    title: {type: String}
  },
  data() {
    return {
      option: {
        title: {
          text: this.title,
        },
        xAxis: {
          data: category,
        },
        yAxis: {},
        series: [
          {
            data: this.data,
            type: 'bar',
          }
        ],
        dataZoom: {
          type: 'inside'
        },
        tooltip: {
          trigger: 'item',
          formatter: '灰度值：{b}, 像素点数：{c}'
        }
      }
    }
  },
  watch: {
    data: {
      handler(val) {
        this.option = {
          series: [
            {
              data: val,
              type: 'bar'
            }
          ]
        };
      },
      deep: true
    }
  }
}
</script>

<style scoped>
</style>