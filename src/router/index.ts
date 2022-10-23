import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';
import Home from '../views/Home.vue';
import Login from '../views/Login.vue';
import SignUp from '../views/SignUp.vue';

const routes: RouteRecordRaw[] = [
    {
        path: '/',
        name: 'Login',
        component: Login
    },
    {
        path: '/sign-up',
        name: 'SignUp',
        component: SignUp
    },
    {
        path: '/home',
        name: 'Home',
        component: Home
    },
    
];

const router = createRouter({
    history: createWebHistory(),
    routes
});

export default router;