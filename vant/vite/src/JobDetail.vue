<template>
  <van-nav-bar
      title="岗位详情"
      left-text="返回"
      left-arrow
      @click-left="$router.go(-1)"
  />

  <div class="job-detail-container">

    <van-button v-if="isEdit" round block @click="editJob" type="info" class="apply-button">
      编辑职位
    </van-button>

    <van-button v-if="isEdit" round block  @click="deleteJob" type="info" class="apply-button">
      删除职位
    </van-button>

    <van-button round block type="info" @click="postResume" class="apply-button">
      在线申请
    </van-button>


    <van-button round block type="info" class="apply-button">
      电话联系
    </van-button>
    <van-cell-group>
      <van-cell title="岗位" :value="job?.title" />
      <van-cell title="工作单位" :value="job?.employerName" />
      <van-cell title="所在城市" :value="job?.location" />
      <van-cell title="详细地址" :value="job?.address" />
      <van-cell title="薪资" :value="job?.salary" class="salary" />
      <van-cell title="性别" :value="job?.grand" />
      <van-cell title="人数" :value="job?.number" />
      <van-cell title="年龄" :value="job?.age" />
      <van-cell title="岗位详情" :value="job?.description" class="salary" />
    </van-cell-group>

    <van-divider />
  </div>
</template>

<script>
import axios from 'axios'; // 确保安装并引入axios
import {getJobDetail, deleteJob} from './api/api';
import { showConfirmDialog } from 'vant';

export default {
  name: 'JobDetail',
  data() {
    return {
      job: null,
      isEdit: false,
    };
  },
  mounted() {
    this.isEdit = this.$route.query.edit
    this.fetchJobDetails();
  },
  methods: {
    deleteJob(){
      showConfirmDialog({
        title: '标题',
        message:
            '确认删除吗',
      })
          .then(() => {
            // on confirm
            deleteJob(this.job.jobId).then(()=>{
              this.$router.go(-1)
            })
          })
          .catch(() => {
            // on cancel
          });
    },
    editJob(){
      this.$router.push({path: '/createJob', query: {jobId: this.$route.query.id}})
    },
    postResume(){
      this.$router.push({path: '/myResume', query: {jobId: this.$route.query.id}})
    },
    async fetchJobDetails() {
      const jobId = this.$route.query.id;
      const response = await getJobDetail(jobId);
      this.job = response
    }
  }
}
</script>

<style scoped>
.job-detail-container {
  padding: 16px;
}

.salary {
  color: #FFA500; /* Set your desired shade of orange */
}

.apply-button,
.contact-button {
  margin-top: 16px;
}

.statistics {
  text-align: center;
}

.statistics .percentage {
  font-size: 24px;
  font-weight: bold;
}

.statistics .label {
  color: #888;
}

.statistics .date {
  border-left: 1px solid #ececec;
  border-right: 1px solid #ececec;
  padding: 0 10px;
}

.operations {
  display: flex;
  justify-content: center;
}

.operations van-icon {
  margin: 0 5px;
}

.section-title {
  font-weight: bold;
  margin-bottom: 8px;
}

.job-description {
  line-height: 1.6;
}
</style>
