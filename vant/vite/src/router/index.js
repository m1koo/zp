import { createRouter, createWebHistory } from 'vue-router';
import Job from '../Job.vue'
import JobDetail from '../JobDetail.vue'
import PostJob from '../PostJob.vue'
import MyResume from '../MyResume.vue'
import MyJob from '../MyJob.vue'
import CreateJob from '../CreateJob.vue'




const routes = [
    {
        path: '/MyJob',
        name: 'myJob',
        component: MyJob
    },
    {
        path: '/createJob',
        name: 'createJob',
        component: CreateJob
    },
    {
        path: '/job',
        name: 'Job',
        component: Job
    },
    {
        path: '/postjob',
        name: 'PostJob',
        component: PostJob
    },
    {
        path: '/jobdetail',
        name: 'JobDetail',
        component: JobDetail
    },
    {
        path: '/myResume',
        name: 'MyResume',
        component: MyResume
    }
];

const router = createRouter({
    history: createWebHistory('/wxzp'),
    routes
});

export default router;
