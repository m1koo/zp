import vue from "@vitejs/plugin-vue";
import Components from "unplugin-vue-components/vite";
import { VantResolver } from "@vant/auto-import-resolver";

import { createApp } from 'vue';
import { Tabbar, TabbarItem } from 'vant';

const app = createApp();
app.use(Tabbar);
app.use(TabbarItem);


export default {
  plugins: [
    vue(),
    Components({
      resolvers: [VantResolver()],
    }),
  ],
};
