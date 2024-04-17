<template>
  <div class="job-list-item">
    <div class="job-header">
      <div class="job-title">{{ job.title }}</div>
      <div class="job-salary" v-if="job.salary">{{ job.salary }}</div>
    </div>
    <div class="job-info">
      <span class="job-company">{{ job.company }}</span>
      <span>·</span>
      <span class="job-experience">{{ job.experience }}</span>
      <span>·</span>
      <span class="job-education">{{ job.education }}</span>
    </div>
    <div class="job-footer">
      <div class="job-description">{{ job.description }}</div>
      <div class="job-time">{{ job.time }}</div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'JobListItem',
  props: {
    job: {
      type: Object,
      required: true
    }
  }
}
</script>

<style>
.job-list-item {
  background: white;
  border: 1px solid #eee;
  padding: 16px 16px 0 16px;
  margin: 4px 8px;
}



.job-info {
  text-align: left;
  font-size: 14px;
  color: #666;
  margin-bottom: 16px;
}

.job-info > span {
  text-align: left;
}

.job-tags {
  display: inline-block;
}

.tag {
  display: inline-block;
  background-color: #f3f3f3;
  padding: 4px 8px;
  margin-right: 4px;
  border-radius: 4px;
  font-size: 12px;
  color: #666;
}

.job-time {
  font-size: 12px;
  color: #999;
}

.job-description {
  text-align: left;
  font-size: 12px;
  color: #999;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.job-header {
  display: flex;
  justify-content: space-between; /* This will push the job title and salary to opposite ends */
  align-items: center;
}

.job-title {
  /* Job title left alignment is default, so no need for 'text-align: left;' */
  font-size: 18px;
  color: #333;
  /* Removed margin-bottom to keep the header aligned nicely */
}

.job-salary {
  color: #FFA500; /* This is a shade of orange. Adjust the color as needed */
  font-size: 18px;
  /* Aligns text to the right */
}

.job-footer {
  display: flex;
  height: 36px;
  border-top: 1px solid #eee;
  justify-content: space-between; /* This will push the job title and salary to opposite ends */
  align-items: center;

}

</style>
