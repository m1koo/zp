import { createRouter, createWebHistory } from 'vue-router';
import HomePage from '../HomePage.vue';
import Job from '../Job.vue'
import JobDetail from '../JobDetail.vue'
import PostJob from '../PostJob.vue'
import EditResume from '../EditResume.vue'
import MyResume from '../MyResume.vue'




const routes = [

    {
        path: '/job',
        name: 'Job',
        component: Job
    },
    {
        path: '/home',
        name: 'HomePage',
        component: HomePage
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
        path: '/editResume',
        name: 'EditResume',
        component: EditResume
    },
    {
        path: '/myResume',
        name: 'MyResume',
        component: MyResume
    }
];

const router = createRouter({
    history: createWebHistory('/'),
    routes
});

export default router;
