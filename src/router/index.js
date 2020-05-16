import Home from '@/views/Home.vue'
import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter);

const routes = [
    {
        path : '/',
        name : 'Home',
        component : Home
    },
    {
        path : '/about',
        name : 'About',
        component : () => import('@/views/About.vue')
    },
    {
        path : '/users',
        name : 'Users',
        component : () => import('@/views/Users.vue')
    },
    {
        path : '/manuals',
        name : 'Manuals',
        component : () => import('@/views/Manuals.vue')
    },
    {
        path : '/access',
        name : 'Access',
        component : () => import('@/views/Access.vue')
    }
];

const router = new VueRouter({
    mode : 'history',
    base : process.env.BASE_URL,
    routes
});

export default router
