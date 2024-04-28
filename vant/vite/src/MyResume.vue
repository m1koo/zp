<template>
  <van-nav-bar
      title="我的简历"
      left-text="返回"
      left-arrow
      @click-left="$router.back()"
  />


  <van-action-sheet v-model:show="showCity" title="选择区域">
    <van-area :area-list="areaList" @confirm="chooseCity" @cancel="showCity=false"/>
  </van-action-sheet>

  <div class="resume-edit-container">
    <van-form @submit="onSubmit">
      <van-field name="fullName" label="姓名" v-model="resume.fullName" required :readonly="!isEditing" />
      <van-field name="contactInfo" label="联系电话" v-model="resume.contactInfo" required :readonly="!isEditing"  type="tel" />
      <van-field name="address" label="所在城市" v-model="resume.city" :readonly="!isEditing"  required/>
      <van-field name="age" label="年龄" v-model="resume.age" required :readonly="!isEditing"  />
      <van-field name="gender" label="性别" v-model="resume.gender" required :readonly="!isEditing"  />

      <!-- Work Experience Section -->
      <van-divider>工作经验</van-divider>

      <van-field
          :readonly="!isEditing"
          name="experience"
          label="工作经验"
          v-model="resume.experience"
          type="textarea"
          rows="4"
          autosize
      />

      <!-- Skills Section -->
      <van-divider>技能</van-divider>
      <van-field
          :readonly="!isEditing"
          name="skills"
          label="技能描述"
          v-model="resume.skills"
          type="textarea"
          rows="4"
          autosize
      />

        <van-button round block type="primary" @click="toggleEdit" native-type="submit">
          {{isEditing? '保存简历':'编辑简历'}}
        </van-button>
        <van-button style="margin-top: 10px" round block type="primary" @click="sendResume">
          投递简历
        </van-button>


    </van-form>
  </div>
</template>

<script>
import { ref, reactive, toRefs } from 'vue';
import { areaList } from '@vant/area-data';
import { myresume, saveresume,sendresume } from './api/api';
import { useRouter, useRoute } from 'vue-router'
import { showToast } from 'vant';


export default {
  name: 'ResumeEdit',
  async mounted() {
    let res = await myresume()
    if (res && res.age) {
      this.resume = res;
    }
  },
  setup() {
    const route = useRoute()
    const router = useRouter()
    const showCity = ref(false);
    const sendResume = async () => {
      let jobId = route.query.jobId
      if(jobId){
        await sendresume({jobId: jobId})
        showToast({ message: '投递成功' });
        router.go(-1)
      }else{
        router.push('/job')
      }
    };


    const chooseCity = (ConfirmResult) => {
      showCity.value = false;
    };

    const isEditing = ref(false);
    const toggleEdit = () => {
      isEditing.value = !isEditing.value;

      if (!isEditing.value) {

        if (!resume.value.fullName || !resume.value.contactInfo || !resume.value.city ||
            !resume.value.age || !resume.value.gender) {
          showNotify({ message: '必填信息不得为空' });
          return;
        }

        saveresume(resume.value);
      }
    };

    const resume = ref({
      gender: '',
      age: '',
      fullName: '',
      city: '',
      contactInfo: '',
      education: '',
      experience: '',
      skills: ''
    });

    const onSubmit = (values) => {
      // Check if required fields are empty

      console.log('Form submitted with:', values);
      // Here you would handle the resume update logic, such as sending the data to a backend.
    };

    return {
      toggleEdit,
      isEditing,
      showCity,
      sendResume,
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
