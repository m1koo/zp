import vue from "@vitejs/plugin-vue";
import Components from "unplugin-vue-components/vite";
import { VantResolver } from "@vant/auto-import-resolver";

// 引入 defineConfig 来获取 Vite 的类型定义，这样可以帮助您更准确地配置
import { defineConfig } from 'vite';

export default defineConfig({
  // 设置基础路径
  base: '/wxzp/',
  plugins: [
    vue(),
    Components({
      resolvers: [VantResolver()],
    }),
  ],
  server: {
    // 适应基础路径
    base: '/wxzp/'
  }
});
