<template>
  <div>
    <van-nav-bar title="首页" />

    <van-divider dashed>招聘/求职</van-divider>
    <div class="button-container" @click="navigateToAbout">
      <van-button type="primary" class="custom-button">招聘</van-button>
      <van-button type="success" class="custom-button" style="margin-left: 10px;">求职</van-button>
    </div>


    <van-divider dashed>资料下载</van-divider>
    <div class="button-container">
      <van-button type="primary" class="custom-button">推拿</van-button>
      <van-button type="success" class="custom-button" style="margin-left: 10px;">其他</van-button>
    </div>


  </div>
</template>

<script>
import { Divider, Button } from 'vant';
import { useRouter } from 'vue-router';

export default {
  name: "HomePage",
  components: {
    'van-divider': Divider,
    'van-button': Button
  },
  methods: {
    navigateToAbout() {
      this.$router.push('/zhiwei')
    },
  },
};
</script>

<style>
.button-container {
  display: flex;
  justify-content: center;
  padding: 16px 0;
}

.custom-button {
  flex-grow: 1;
  margin: 0 15px;
  height: 150px; /* 设置按钮高度 */
}
</style>
