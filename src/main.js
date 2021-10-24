import Vue from 'vue'
import App from './App.vue'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import VueLazyload from 'vue-lazyload'
import {use} from "echarts/core";
import {CanvasRenderer} from "echarts/renderers";
import {BarChart, LineChart} from "echarts/charts";
import {DataZoomComponent, GridComponent, LegendComponent, TitleComponent, TooltipComponent} from "echarts/components"

use([
  CanvasRenderer, LineChart, BarChart, TooltipComponent, GridComponent, DataZoomComponent, TitleComponent, LegendComponent
]);

Vue.config.productionTip = false

Vue.use(ElementUI);

Vue.use(VueLazyload)

Vue.use(VueLazyload, {
  preLoad: 1.3,
  error: '../public/fail.png',
  loading: '../public/loading.gif',
  attempt: 1
})

new Vue({
  render: h => h(App),
}).$mount('#app')
