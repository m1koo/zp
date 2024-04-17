<template>
  <van-nav-bar
      title="编辑简历"
      left-text="返回"
      left-arrow
      @click-left="$router.back()"
  />


  <van-action-sheet v-model:show="showCity" title="选择区域">
    <van-area :area-list="areaList" @confirm="chooseCity" @cancel="showCity=false"/>
  </van-action-sheet>

  <div class="resume-edit-container">
    <van-form @submit="onSubmit">
      <van-field name="name" label="姓名" v-model="resume.name" required />
      <van-field name="phone" label="联系电话" v-model="resume.phone" required type="tel" />
      <van-field @click="showCity=true" label="所在城市" v-model="resume.city" readonly required/>
      <van-field name="age" label="年龄" v-model="resume.age" required />
      <van-field name="grand" label="性别" v-model="resume.grand" required />

      <!-- Work Experience Section -->
      <van-divider>工作经验</van-divider>

      <van-field
          name="workDetail"
          label="工作描述"
          v-model="resume.workDetail"
          type="textarea"
          rows="4"
          autosize
      />

      <!-- Skills Section -->
      <van-divider>技能</van-divider>
      <van-field
          name="workDetail"
          label="技能描述"
          v-model="resume.workDetail"
          type="textarea"
          rows="4"
          autosize
      />

      <div class="button-container">
        <van-button round block type="primary" native-type="submit">
          保存简历
        </van-button>
        <van-button round block type="danger">
          删除简历
        </van-button>
      </div>

    </van-form>
  </div>
</template>

<script>
import { ref } from 'vue';
import { areaList } from '@vant/area-data';

export default {
  name: 'ResumeEdit',
  setup() {
    const showCity = ref(false);

    const chooseCity = (ConfirmResult) => {
      console.log(ConfirmResult)
      showCity.value = false
    };


    const resume = ref({
      name: '',
      email: '',
      phone: '',
      address: '',
      education: '',
      school: '',
      major: '',
      company: '',
      position: '',
      workDetail: '',
      skills: ''
    });

    const onSubmit = (values) => {
      console.log('Form submitted with:', values);
      // Here you would handle the resume update logic, such as sending the data to a backend.
    };

    return {
      showCity,
      areaList,
      chooseCity,
      resume,
      onSubmit
    };
  }
};
</script>

<style scoped>
.resume-edit-container {
  padding: 16px;
}

.button-container {
  margin-top: 20px;
}
</style>
