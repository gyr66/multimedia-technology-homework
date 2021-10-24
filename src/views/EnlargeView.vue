<template>
  <div>
    <el-row>
      <el-col :offset="7" :span="10">
        <h1>图像放大</h1>
      </el-col>
    </el-row>
    <el-row>
      <upload class="upload" @uploadSuccess="handleUploadSuccess"/>
    </el-row>
    <el-row v-if="imageName" type="flex" justify="space-around">
      <el-col :span="8">
        <el-slider v-model="times" :min="2" :max="20"/>
      </el-col>
      <el-col :span="4">
        <el-button type="primary" @click="enlargeButtonClicked">放大</el-button>
      </el-col>
    </el-row>
    <el-row>
      <div class="upload">
        <img  v-lazy='enlargedImageUrl' alt="放大后的图像" v-if="enlargedImageUrl"/>
      </div>
    </el-row>

  </div>
</template>

<script>
import Upload from "@/components/Upload"
import axios from "axios";

export default {
  name: "MergeView",
  components: {Upload},
  data() {
    return {
      imageName: '',
      enlargedImageUrl: '',
      times: 2,
      hasUploaded: false,
    }
  },
  methods: {
    handleUploadSuccess(data) {
      ({fileName: this.imageName} = data);
    },

    enlargeButtonClicked() {
      const loading = this.$loading({
        lock: true,
        text: 'Loading',
        spinner: 'el-icon-loading',
        background: 'rgba(0, 0, 0, 0.7)'
      });
      axios.get('/enlarge', {
        params: {
          fileName: this.imageName,
          times: this.times
        }
      }).then(response => {
        loading.close();
        let msg = response.data;
        let content = msg.content;
        let type = msg.status === 200 ? 'success' : 'error';
        this.$message({
          message: msg.info,
          type: type
        });
        if (type === 'success') {
          this.enlargedImageUrl = content.url;
        }
      }).catch(() => {
        loading.close();
        this.$message({
          message: "图片过大!",
          type: "error"
        });
      })
    }
  }
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

</style>