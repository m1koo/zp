<template>
  <van-nav-bar title="职位" />

  <div class="filter-section">
    城市筛选：<van-field readonly clickable v-model="filters.city" placeholder="城市" @click="showCitySelector = true" />
    <van-popup v-model:show="showSalaryPicker" round position="bottom">
      <van-picker
          show-toolbar
          :columns="salaryOptions"
          @confirm="chooseSalary"
          @cancel="showSalaryPicker = false"
      />
    </van-popup>
    薪资筛选：<van-field
        readonly
        clickable
        v-model="filters.salary"
        placeholder="薪资范围"
        @click="showSalaryPicker = true"
    />
    <van-button type="info" size="small" @click="resetFilters">重置筛选</van-button>
  </div>

  <van-action-sheet v-model:show="showCitySelector" title="选择区域">
    <van-area :columns-num="2" :area-list="areaList" @confirm="chooseCity" @cancel="showCitySelector = false" />
  </van-action-sheet>

  <van-list
      v-model:loading="loading"
      :finished="finished"
      finished-text="没有更多了"
      @load="onLoad"
  >
    <job-list-item @click="goToJobDetail(job.jobId)" v-for="job in list" :key="job.id" :job="job" />
  </van-list>
</template>

<script>
import JobListItem from './JobListItem.vue';
import { areaList } from '@vant/area-data';
import { getJobs, login } from './api/api';

export default {
  name: 'JobList',
  components: {
    JobListItem
  },
  data() {
    return {
      areaList: areaList,
      list: [],
      loading: false,
      finished: false,
      showCitySelector: false,
      showSalaryPicker: false,
      salaryOptions: [
        { text: '不限', value: '不限' },
        { text: '1000以内', value: '1000以内' },
        { text: '1000-2000', value: '1000-2000' },
        { text: '2000-4000', value: '2000-4000' },
        { text: '4000-6000', value: '4000-6000' },
        { text: '6000-8000', value: '6000-8000' },
        { text: '8000+', value: '8000=' }
      ],
      filters: {
        city: '不限',
        salary: '不限'
      },
      page: 1,
      limit: 20
    };
  },

  async created() {
    const code = this.$route.query.code;
    if (code) {
      let res = await login(code);
      if(res.code === 200){
        localStorage.Authorization = res.data.token
      }
    }


    if (!this.finished) {
      await this.applyFilters();
    }
  },
  methods: {
    async applyFilters() {
      this.loading = true;
      let filterData = JSON.parse(JSON.stringify(this.filters));
      filterData.city = filterData.city === '不限' ? '' : filterData.city;
      filterData.salary = filterData.salary === '不限' ? '' : filterData.salary;

      try {
        const response = await getJobs(filterData, this.page, this.limit);
        if (response.records && response.records.length > 0) {
          this.list.push(...response.records);
          this.page++;
        } else {
          this.finished = true;
        }
      } catch (error) {
        this.finished = true;
      } finally {
        this.loading = false;
      }
    },
    resetFilters() {
      this.filters = { city: '不限', salary: '不限' };
      this.resetList();
      this.applyFilters();
    },
    chooseCity(item) {
      this.filters.city = item.selectedOptions[1].text;
      this.showCitySelector = false;
      this.resetList();
      this.applyFilters();
    },
    chooseSalary(value) {
      this.filters.salary = value.selectedValues[0];
      this.showSalaryPicker = false;
      this.resetList();
      this.applyFilters();
    },
    resetList() {
      this.page = 1;
      this.list = [];
    },
    goToJobDetail(jobId) {
      this.$router.push({ path: `/jobdetail`, query: { id: jobId } });
    }
  }
};
</script>

<style scoped>
.filter-section {
  padding: 10px;
  background: #f8f8f8;
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  align-items: center;
}
</style>
