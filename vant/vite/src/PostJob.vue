<template>
  <van-nav-bar
      title="发布岗位"
      left-text="返回"
      left-arrow
      @click-left="$router.back()"
  />

  <div class="job-posting-container">
    <van-form @submit="onSubmit">
      <van-field name="title" label="岗位名称" v-model="job.title" required />
      <van-field name="company" label="工作单位" v-model="job.company" required />
      <van-field @click="openCity" label="所在城市" v-model="job.city" readonly required/>
      <van-field name="address" label="详细地址" v-model="job.address" required />
      <van-field name="salary" label="薪资" v-model="job.salary" type="number" required/>
      <van-field name="radio" label="性别"  required>
        <template #input>
          <van-radio-group v-model="job.gender" direction="horizontal">
            <van-radio name="1">不限</van-radio>
            <van-radio name="2">男</van-radio>
            <van-radio name="2">女</van-radio>
          </van-radio-group>
        </template>
      </van-field>
      <van-field name="headcount" label="招聘人数" v-model="job.headcount" type="number" required />
      <van-field name="age" label="年龄要求" v-model="job.age" required />

      <van-field
          name="details"
          label="岗位详情"
          v-model="job.details"
          type="textarea"
          rows="4"
          autosize
          required
      />

       <div class="button-container">
        <van-button round block type="primary" native-type="submit">
          发布岗位
        </van-button>
      </div>
    </van-form>

    <van-action-sheet v-model:show="showCity" title="选择区域">
      <van-area :area-list="areaList" @confirm="chooseCity" @cancel="showCity=false"/>
    </van-action-sheet>

  </div>
</template>

<script>
import { ref } from 'vue';
import { areaList } from '@vant/area-data';

export default {
  name: 'PostJob',
  setup() {
    const showCity = ref(false);
    const job = ref({
      title: '',
      company: '',
      city: '',
      address: '',
      salary: '',
      gender: '1',
      headcount: '',
      age: '',
      details: ''
    });

    const openCity = (values) => {
      showCity.value = true
    };
    const chooseCity = (ConfirmResult) => {
      console.log(ConfirmResult)
      showCity.value = false
    };


    const onSubmit = (values) => {
      console.log('Form submitted with:', values);
      // You should handle the job posting logic here,
      // like sending the data to a backend server.
    };

    return {
      job,
      chooseCity,
      showCity,
      openCity,
      areaList,
      onSubmit
    };
  }
};
</script>

<style scoped>
.job-posting-container {
  padding: 16px;
}

.button-container {
  margin-top: 20px;
}
</style>
