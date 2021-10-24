<template>
  <v-chart :option="option" ref="chart"/>
</template>

<script>
import VChart from "vue-echarts";

export default {
  name: "LineChart",
  components: {VChart},
  props: {
    data: { type: Array }
  },
  data() {
    return {
      option: {
        legend: {
          data: ['灰度变换线', '参考线'],
        },
        xAxis: {
          min: 0,
          max: 255,
          interval: 20
        },
        yAxis: {
          min: 0,
          max: 255,
          interval: 20
        },
        series: [
          {
            name: '参考线',
            data: [[0, 0], [255, 255]],
            type: 'line',
            lineStyle: {
              type: 'dotted'
            },
            itemStyle: {
              color: 'red'
            }
          },
          {
            name: '灰度变换线',
            data: this.data,
            type: 'line'
          }
        ],
        tooltip: {
          formatter: '({c})'
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
              name: '参考线',
              data: [[0, 0], [255, 255]],
              type: 'line'
            },
            {
              name: '灰度变换线',
              data: val,
              type: 'line'
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