import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter);

const routes = [
    {
        path: '/chatroom',
        name: 'chatroom',
        component: () => import ('../components/Chatroom.vue'),
    },
    {
        path: '/login',
        name: 'login',
        component: () => import ('../components/Login.vue')
    },
    {path: '*', redirect: {name: 'login'}},
];

const router = new VueRouter({
    routes
});

export default router
