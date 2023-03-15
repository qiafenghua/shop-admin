import { createRouter, createWebHashHistory } from "vue-router";
import Index from '~/pages/index.vue'
import Login from '~/pages/login.vue'
import NotFound from '~/pages/404.vue'
import Admin from '~/layouts/admin.vue'
import GoodsList from '~/pages/goods/list.vue'

const routes = [
  {
    path: "/",
    component: Admin,
    children: [
      {
        path: '/',
        component: Index,
        meta: {
          title: '后台首页'
        }
      },
      {
        path: "/goods/list",
        component: GoodsList,
        meta: {
          title: "商品管理"
        }
      }
    ]
  },
  {
    path: "/login",
    component: Login,
    meta: {
      title: '登录页面'
    }
  },
  {
    // 404页面匹配
    path: "/:pathMatch(.*)*",
    name: "NotFound",
    component: NotFound

  }
];

const router = createRouter({
  //createWebHashHistory括号一定带上
  history: createWebHashHistory(),
  routes
});

export default router;
