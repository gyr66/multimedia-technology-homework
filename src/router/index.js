// 配置路由信息
import VueRouter from "vue-router"
import Vue from "vue"
import EnlargeView from "@/views/EnlargeView";
import EnhanceView from "@/views/EnhanceView";

Vue.use(VueRouter);

const SeparateView = () => import("@/views/ClassifyView");

const routes = [
  {
    path: "/",
    redirect: "/Separate"
  },
  {
    path: "/Separate",
    component: SeparateView,
    meta: {
      title: "图片分离为RGB"
    }
  },
  {
    path: "/Enlarge",
    component: EnlargeView,
    meta: {
      title: "图像放大"
    }
  },
  {
    path: '/Enhance',
    component: EnhanceView,
    meta: {
      title: "图像增强"
    }
  }
];

const router = new VueRouter({
  routes,
});

router.beforeEach((to, from, next) => {
  document.title = to.matched[0].meta.title;
  next();
});

export default router;
