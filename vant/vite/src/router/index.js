import { createRouter, createWebHistory } from 'vue-router';
import Job from '../Job.vue'
import JobDetail from '../JobDetail.vue'
import PostJob from '../PostJob.vue'
import MyResume from '../MyResume.vue'




const routes = [

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
