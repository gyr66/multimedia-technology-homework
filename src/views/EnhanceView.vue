<template>
  <div class="root">
    <el-row>
      <el-col :offset="7" :span="10">
        <h1>灰度线性变换</h1>
      </el-col>
    </el-row>
    <el-row>
      <div class="upload">
        <upload @uploadSuccess="handleUploadSuccess"/>
      </div>
    </el-row>
    <el-row>
      <div class="wrapper">
        <div class="input">
          <div class="container">
            <div class="row" style="margin-bottom: 30px">
              <el-input v-model="x1" placeholder="x1"/>
              <el-input v-model="y1" placeholder="y1"/>
            </div>
            <div class="row" style="margin-bottom: 30px">
              <el-input v-model="x2" placeholder="x2"/>
              <el-input v-model="y2" placeholder="y2"/>
            </div>
            <div class="row">
              <el-button type="primary" @click="handleInputConfirmed">确定</el-button>
            </div>
          </div>
        </div>
        <line-chart id="chart" ref="chart" :data="chartData"/>
      </div>
    </el-row>
    <el-row>
      <el-button type="primary" @click="handleEnhanceConfirmed">增强</el-button>
    </el-row>
    <el-row>
      <div class="upload">
        <img v-lazy='enhancedImageUrl' alt="放大后的图像" v-if="enhancedImageUrl"/>
      </div>
    </el-row>
    <el-row>
      <div class="wrapper" v-if="enhancedBar.length">
        <bar-chart id="origin" class="barChart" :data="originBar" title="原图像灰度立方图"/>
        <bar-chart id="enhanced" class="barChart" :data="enhancedBar" title="变换后灰度立方图"/>
      </div>
    </el-row>
  </div>
</template>

<script>
import Upload from "@/components/Upload";
import LineChart from "@/components/LineChart";
import axios from "axios";
import BarChart from "@/components/BarChart";

export default {
  name: "EnhanceView",
  components: {LineChart, Upload, BarChart},
  data() {
    return {
      imageName: '',
      x1: '', y1: '', x2: '', y2: '',
      chartData: [[0, 0], [255, 255]],
      originBar: [],
      enhancedBar: [],
      enhancedImageUrl: ''
    }
  },
  methods: {
    handleUploadSuccess(data) {
      this.imageName = data.fileName;
    },

    handleInputConfirmed() {
      this.x1 = Number.parseInt(this.x1);
      this.y1 = Number.parseInt(this.y1);
      this.x2 = Number.parseInt(this.x2);
      this.y2 = Number.parseInt(this.y2);
      if (this.x1 >= this.x2) {
        this.$message.error('输入非法!');
        return;
      }
      this.chartData = this.getNewChartData(this.x1, this.y1, this.x2, this.y2);

    },

    getNewChartData(x1, y1, x2, y2) {
      let chartData = [];
      let temp = [];
      chartData.push([0, 0]);
      temp.push(x1, y1);
      chartData.push(temp);
      temp = [];
      temp.push(x2, y2);
      chartData.push(temp);
      chartData.push([255, 255]);
      return chartData;
    },

    handleEnhanceConfirmed() {
      const loading = this.$loading({
        lock: true,
        text: 'Loading',
        spinner: 'el-icon-loading',
        background: 'rgba(0, 0, 0, 0.7)'
      });
      axios.get('/enhance', {
        params: {
          fileName: this.imageName,
          x1: this.x1,
          y1: this.y1,
          x2: this.x2,
          y2: this.y2
        }
      }).then(response => {
        loading.close();
        console.log(response.data)
        let msg = response.data;
        let content = msg.content;
        let type = msg.status === 200 ? 'success' : 'error';
        this.$message({
          message: msg.info,
          type: type
        });
        if (type === 'success') {
          this.enhancedImageUrl = content.url;
          this.originBar = content.origin;
          this.enhancedBar = content.enhanced;
        }
      }).catch(() => {
        loading.close();
        this.$message({
          message: "图片过大!",
          type: "error"
        });
      })
    }
  },



}
</script>

<style scoped>
h1 {
  text-align: center;
  color: cornflowerblue;
}

.el-row {
  margin: 50px 0;
  text-align: center;
}

.upload {
  display: inline-block;
  margin: 0 auto;
  overflow: auto;
  max-width: 300px;
  max-height: 300px;
  position: relative;
}

.el-input {
  width: 100px;
  margin-right: 30px;
}

.wrapper {
  display: flex;
  justify-content: center;
  align-items: center;
}

.input {
  display: flex;
  align-items: center;
}

#chart {
  width: 500px;
  height: 500px;
}

.barChart {
  width: 500px;
  height: 500px;
}

</style>