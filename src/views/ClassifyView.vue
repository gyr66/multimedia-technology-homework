<template>
  <div>
    <el-row>
      <el-col :offset="7" :span="10">
        <h1>RGB分离</h1>
      </el-col>
    </el-row>
    <el-row>
      <div class="upload">
        <upload @uploadSuccess="handleUploadSuccess"/>
      </div>
    </el-row>
    <el-row>
      <el-col :span="4" :offset="10">
        <el-button type="primary" @click="classifyButtonClicked">分离</el-button>
      </el-col>
    </el-row>
    <el-row type="flex" justify="space-around" v-if="hasResult">
      <el-col :span="6">
        <el-image v-lazy="image_R"/>
      </el-col>
      <el-col :span="6">
        <el-image v-lazy="image_G"/>
      </el-col>
      <el-col :span="6">
        <el-image v-lazy="image_B"/>
      </el-col>
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
      image_R: '',
      image_G: '',
      image_B: ''
    }
  },
  computed: {
    hasResult() {
      return this.image_R !== '' && this.image_G !== '' && this.image_B !== '';
    }
  },
  methods: {
    handleUploadSuccess(data) {
      ({fileName: this.imageName} = data);
    },

    classifyButtonClicked() {
      const loading = this.$loading({
        lock: true,
        text: 'Loading',
        spinner: 'el-icon-loading',
        background: 'rgba(0, 0, 0, 0.7)'
      });
      axios.get("/classify", {
        params: {
          fileName: this.imageName
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
          this.image_R = content.urls[0];
          this.image_G = content.urls[1];
          this.image_B = content.urls[2];
        }
      }).catch(() => {
        loading.close();
        this.$message({
          message: "图片过大!",
          type: "error"
        })
      });
    }
  }

}
</script>

<style scoped>
h1 {
  text-align: center;
  color: cornflowerblue;
}

.upload {
  display: inline-block;
  margin: 0 auto;
  overflow: auto;
  max-width: 302px;
  max-height: 302px;
}

.el-row {
  margin: 50px 0;
  text-align: center;
}
</style>