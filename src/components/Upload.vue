<template>
  <div>
    <el-upload
        :before-upload="beforeAvatarUpload"
      :on-success="handleAvatarSuccess"
      :on-error="handleError"
      action="/upload"
      :show-file-list="false"
      class="avatar-uploader">
      <img v-show="imageUrl" v-lazy="imageUrl" alt="" class="avatar">
      <i v-show="!imageUrl" class="el-icon-plus avatar-uploader-icon"></i>
    </el-upload>
  </div>
</template>

<script>
export default {
  name: "Merge",
  data() {
    return {
      imageUrl: '',
      loading: null
    };
  },

  methods: {
    resize(width, height) {
      let uploader = document.querySelector(".avatar-uploader");
      let icon = document.querySelector(".avatar-uploader-icon");
      let avatar = document.querySelector(".avatar");
      let el_uploader = document.querySelector(".el-upload");

      uploader.style.width = width + 'px';
      uploader.style.height = height + 'px';
      el_uploader.style.width = width + 'px';
      el_uploader.style.height = height + 'px';

      // 图片
      avatar.style.height = height + 'px';
      avatar.style.width = width + 'px';

      // 图标
      icon.style.width = width + 'px';
      icon.style.height = height + 'px';
      icon.style.lineHeight = height + 'px';
    },

    beforeAvatarUpload(file) {
      const isLt2M = file.size / 1024 / 1024 <= 50;
      if (!isLt2M) {
        this.$message.error('上传图片大小不能超过50MB!');
        return false;
      } else {
        this.loading = this.$loading({
          lock: true,
          text: 'Loading',
          spinner: 'el-icon-loading',
          background: 'rgba(0, 0, 0, 0.7)'
        });
        return true;
      }
    },

    handleAvatarSuccess(res, file) {
      let url = URL.createObjectURL(file.raw);
      this.imageUrl = url;
      let image = new Image();
      image.src = url;
      image.onload = () => {
        this.resize(image.width, image.height);
      }
      this.loading.close();
      if (res.status !== 200) {
        this.$message.error(res.info);
        return;
      }
      this.$message.success(res.info);
      this.$emit("uploadSuccess", res.content);
    },

    handleError(e) {
      console.log(e)
    },
  }
}
</script>

<style scoped>
.avatar-uploader {
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  background-color: lightgrey;
}

.avatar-uploader:hover {
  border-color: #409EFF;
}

.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 300px;
  height: 300px;
  line-height: 300px;
  text-align: center;
}

.avatar {
  width: 300px;
  height: 300px;
}
</style>