import { createApp } from 'vue'
import App from './App.vue'
import getVant from './plugins';
import router from './router'
import store from './store'

let app = createApp(App);
app.use(store).use(router).mount('#app');
getVant(app);
