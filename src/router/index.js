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
    },
    {
        path : '/form/reservation_request',
        name : 'ReservationRequest',
        component : () => import('@/views/users/form/ReservationRequest.vue')
    },
    {
        path : '/form/project_plan',
        name : 'ProjectPlan',
        component : () => import('@/views/users/form/ProjectPlan.vue')
    },
    {
        path : '/form/overtime_use',
        name : 'OvertimeUse',
        component : () => import('@/views/users/form/OvertimeUse.vue')
    },
    {
        path : '/form/exit_check',
        name : 'ExitCheck',
        component : () => import('@/views/users/form/ExitCheck.vue')
    },
    {
        path : '/form/exit_check_light',
        name : 'ExitCheck_Light',
        component : () => import('@/views/users/form/ExitCheck_Light.vue')
    },
    {
        path : '/form/exit_check_sound',
        name : 'ExitCheck_Sound',
        component : () => import('@/views/users/form/ExitCheck_Sound.vue')
    },
    {
        path: '/form/consent',
        name: 'Consent',
        component : () => import('@/views/users/form/Consent.vue')
    },
    {
        path: '/equipments/equipment_light',
        name: 'Equipment_Light',
        component : () => import('@/views/users/equipments/Equipment_Light.vue')
    },
    {
        path: '/equipments/equipment_log_light',
        name: 'EquipmentLog_Light',
        component : () => import('@/views/users/equipments/EquipmentLog_Light.vue')
    },
    {
        path: '/equipments/lightbulb',
        name: 'Lightbulb',
        component : () => import('@/views/users/equipments/Lightbulb.vue')
    }
];

const router = new VueRouter({
    mode : 'history',
    base : process.env.BASE_URL,
    routes
});

export default router
