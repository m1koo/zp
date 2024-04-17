import { createApp } from 'vue';
import App from './App.vue';
import router from './router/index';
import { Button, Cell, CellGroup } from 'vant';

const app = createApp(App);
app.use(router);
app.use(Button);
app.use(Cell);
app.use(CellGroup);
app.mount('#app');


