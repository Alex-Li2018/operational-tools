import { createApp } from 'vue';
import {
  ElButton,
  ElInfiniteScroll,
  ElLoading,
  ElMessage,
  ElMessageBox,
  ElNotification,
} from 'element-plus';
import App from './App.vue';
import router from './router';
// import store from './store';

const components = [
  ElButton,
];

const plugins = [
  ElInfiniteScroll,
  ElLoading,
  ElMessage,
  ElMessageBox,
  ElNotification,
];

const app = createApp(App);

components.forEach((component) => {
  app.component(component.name, component);
});

plugins.forEach((plugin) => {
  app.use(plugin);
});

app.use(router).mount('#app');
