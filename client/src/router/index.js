import { createRouter, createWebHistory } from 'vue-router'
import { useStore } from 'vuex';
import HomeView from '../views/HomeView.vue';
import store from "@/store/index";


const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView,
    children: [
      {
        path: '/',
        name: 'findmusic',
    
        
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () => import(/* webpackChunkName: "about" */ '../views/FindeMusic.vue')
      },
      {
        path: '/user',
        name: 'user',
        
        beforeEnter: (to,from,next) => {
          if (store.token || sessionStorage.getItem("token")) {
            next();
          } else {
            next("/login");
          }
        },
        
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () => import(/* webpackChunkName: "about" */ '../views/User.vue')
      }
    ]
  },
  {
    path: '/login',
    name: 'login',

    
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/Login.vue')
  },
  {
    path: '/musiclist',
    name: 'musiclist',

    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/MusiclistDetail.vue')
  },
  {
    path: '/search',
    name: 'search',

    
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/Search.vue')
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
});

router.beforeEach((to, from, next)=>{
  if (to.path == "/login") {
    // store.commit("updateIsLoginShow", true);
    // console.log(store.state);
    store.state.isFooter = false;
  } else {
    // store.commit("updateIsLoginShow", false);
    store.state.isFooter = true;

  }
  
  next();
})
export default router
