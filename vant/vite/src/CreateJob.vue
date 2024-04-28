<template>
  <div>
    <van-nav-bar label="新增职位" left-arrow @click-left="goBack" />

    <van-action-sheet v-model:show="showCitySelector" title="选择区域">
      <van-area :columns-num="2" :area-list="areaList" @confirm="chooseCity" @cancel="showCitySelector = false" />
    </van-action-sheet>

    <div class="job-form">

      <van-field
          v-model="job.title"
          label="职位标题"
          placeholder="请输入职位标题"
          required
      />
      <van-field
          v-model="job.employerName"
          label="公司名称"
          placeholder="请输入公司名称"
          required
      />
      <van-field
          v-model="job.salary"
          type="digit"
          label="薪资"
          placeholder="请输入薪资"
          required

      />

      <van-field
          readonly clickable placeholder="请输入城市" @click="showCitySelector = true"
          v-model="job.location"
          label="城市"
          required

      />
      <van-field label="性别" placeholder="请输入性别要求" v-model="job.grand"           required
      />
      <van-field label="人数" type="digit" placeholder="请输入岗位所需人数" v-model="job.number"           required
      />
      <van-field label="年龄" placeholder="请输入年龄要求" v-model="job.age"           required
      />

      <van-field label="联系电话" placeholder="请输入联系电话" v-model="job.employerPhone"           required
      />

      <van-field label="详细地址" placeholder="请输入详细地址" v-model="job.address"           required
      />


      <van-field
          v-model="job.requirements"
          label="职位要求"
          type="textarea"
          required
          placeholder="请输入职位要求"
          rows="3"
      />


      <van-field
          v-model="job.description"
          label="职位描述"
          type="textarea"
          required
          placeholder="请输入职位描述"
          rows="3"
      />

      <van-button type="primary" @click="submitJob">提交</van-button>
    </div>
  </div>
</template>

<script>
import { showToast } from 'vant';
import { areaList } from '@vant/area-data';
import {createJob, getJobDetail} from './api/api';

export default {
  data() {
    return {
      areaList: areaList,
      showCitySelector: false,
      job: {
        title: '',
        employerName: '',
        salary: '',
        location: '',
        grand: '',
        number: '',
        age: '',
        employerPhone: '',
        address: '',
        requirements: '',
        description: ''
      }
    };
  },
  async created() {
    const jobId = this.$route.query.jobId;
    if(jobId){
      const response = await getJobDetail(jobId);
      this.job = response
    }

  },
  methods: {
    chooseCity(item) {
      this.job.location = item.selectedOptions[1].text;
      this.showCitySelector = false;
    },
    goBack() {
      this.$router.go(-1);
    },
    async submitJob() {
      // 检查必填字段
      if (!this.job.title || !this.job.employerName || !this.job.salary || !this.job.location || !this.job.description || !this.job.employerPhone
          || !this.job.address|| !this.job.number) {
        showToast('请填写必填字段');
        return;
      }

      // 可以在这里进行其他字段的验证，比如对薪资格式的验证等

      try {
        const result = await createJob(this.job);
        showToast('职位发布成功');
        this.$router.push({path: '/myJob'})

      } catch (error) {
        showToast('提交出现错误');
      }
    }
  }
};
</script>

<style scoped>
.job-form {
  padding: 20px;
}
</style>
