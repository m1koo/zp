<template>
  <div>
    <van-nav-bar title="职位管理" />

    <van-button block type="primary" @click="submitJob">创建职位</van-button>
    <van-list v-model:loading="loading" :finished="finished" finished-text="没有更多了">
      <job-list-item @click="goToJobDetail(job.jobId)" v-for="job in jobs" :key="job.jobId" :job="job" />
    </van-list>
  </div>
</template>

<script>
import JobListItem from './JobListItem.vue';

import { showToast } from 'vant';
import { MyJob } from './api/api';

export default {
  components: {
    JobListItem
  },
  data() {
    return {
      jobs: [],
      loading: false,
      finished: false
    };
  },
  created() {
    this.loadJobs();
  },
  methods: {
    submitJob(){
      this.$router.push({ path: `/createJob`});
    },
    async loadJobs() {
      this.loading = true;
      try {
        // 使用你的 API 函数来获取职位列表
        const response = await MyJob();
        this.jobs = response; // 假设 API 返回职位列表数组
        this.loading = true;
        this.finished = true
      } catch (error) {
        showToast('加载职位信息失败');
      } finally {
        this.loading = false;
      }
    },
    goToJobDetail(jobId) {
      this.$router.push({ path: `/jobdetail`, query: { id: jobId, edit: true } });
    }
    // editJob(index) {
    //   const jobId = this.jobs[index].id; // 假设每个职位有一个唯一的 ID
    //   // 导航到编辑职位页面，你可以使用路由参数将职位ID传递给编辑页面
    //   this.$router.push({ path: `/edit-job/${jobId}` });
    // },
    // async deleteJob(index) {
    //   const jobId = this.jobs[index].id; // 假设每个职位有一个唯一的 ID
    //   try {
    //     // 使用你的 API 函数来删除职位
    //     await deleteJob(jobId);
    //     // 在前端更新职位列表
    //     this.jobs.splice(index, 1);
    //     showToast('删除成功');
    //   } catch (error) {
    //     showToast('删除失败');
    //   }
    // }
  }
};
</script>

<style scoped>
/* 在这里添加样式，以美化职位列表的外观 */
</style>
