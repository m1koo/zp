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
import { ref } from 'vue';
import JobListItem from './JobListItem.vue';
import { areaList } from '@vant/area-data';
import { getJobs } from './api/api';

import { useRouter } from 'vue-router';

export default {
  name: 'JobList',
  components: {
    JobListItem
  },
  setup() {
    const list = ref([
      // 测试数据
      /* ... */
    ]);
    const loading = ref(false);
    const finished = ref(false);
    const showCitySelector = ref(false);
    const showSalaryPicker = ref(false);
    const salaryOptions = [
      { text: '不限', value: '不限' },
      { text: '1000以内', value: '1000以内' },
      { text: '1000-2000', value: '1000-2000' },
      { text: '2000-4000', value: '2000-4000' },
      { text: '4000-6000', value: '4000-6000' },
      { text: '6000-8000', value: '6000-8000' },
      { text: '8000+', value: '8000=' }
    ];
    const filters = ref({
      city: '不限',
      salary: '不限',
    });

// JobList 组件内
    const page = ref(1);
    const limit = ref(20); // 例如，每页显示10条

    const applyFilters = async () => {
      loading.value = true;

      let filterData = JSON.parse(JSON.stringify(filters.value))
      if(filterData.city === '不限'){
        filterData.city = ''
      }
      if(filterData.salary === '不限'){
        filterData.salary = ''
      }
      try {
        const response = await getJobs(filterData, page.value, limit.value);
        if (response.records && response.records.length > 0) {
          list.value.push(...response.records);
          page.value++; // 增加页码
        } else {
          finished.value = true; // 没有更多数据
        }
      } catch (error) {
        finished.value = true;

        // 处理错误情况
      } finally {
        loading.value = false;
      }
    };

    // 当用户滚动到列表底部时，加载更多数据
    const onLoad = async () => {
      if (!finished.value) {
        await applyFilters();
      }
    };

    const resetFilters = () => {
      filters.value = { city: '不限', salary: '不限' };
      resetList()
      applyFilters();
    };

    const chooseCity = (item) => {
      filters.value.city = item.selectedOptions[1].text;
      showCitySelector.value = false;
      resetList()
      applyFilters();
    };

    const chooseSalary = (value) => {
      filters.value.salary = value.selectedValues[0];
      showSalaryPicker.value = false;
      resetList();
      applyFilters();
    };

    const resetList = () => {
      page.value = 1
      list.value = []
    };

    const isSalaryInRange = (salary, range) => {
      const salaryValue = parseInt(salary);
      const rangeParts = range.split('-');
      if (range.includes('以内')) {
        return salaryValue <= 1000;
      } else if (range.includes('+')) {
        return salaryValue > 8000;
      } else {
        return salaryValue >= parseInt(rangeParts[0]) && salaryValue <= parseInt(rangeParts[1]);
      }
    };

    return {
      list,
      loading,
      finished,
      showCitySelector,
      showSalaryPicker,
      salaryOptions,
      filters,
      applyFilters,
      resetFilters,
      chooseCity,
      chooseSalary,
      areaList,
      resetList,
      onLoad,
    };
  },
  methods: {
    goToJobDetail(jobId) {
      this.$router.push({ path: `/jobdetail`,query: {id: jobId} });
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
