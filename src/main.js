import { createApp } from "vue";
import { createPinia } from "pinia";
import ElementPlus from "element-plus";
import * as ElementPlusIconsVue from "@element-plus/icons-vue";
import piniaPluginPersistedstate from "pinia-plugin-persistedstate";
import "./style.css";
import "element-plus/dist/index.css";
import App from "./App.vue";
import router from "@/router/index";

const pinia = createPinia().use(piniaPluginPersistedstate);
const app = createApp(App);
app.use(ElementPlus).use(pinia);
app.use(router);
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
    app.component(key, component);
}
app.mount("#app");