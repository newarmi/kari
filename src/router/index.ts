import {createRouter, createWebHistory, RouteRecordRaw} from 'vue-router';
import HomePage from "../views/HomePage.vue";
import MapPage from "../views/MapPage.vue";


const routes: Array<RouteRecordRaw> = [
    {
        path: '/',
        name: 'home',
        component: HomePage,
    },
    {
        path: '/map',
        name: 'map',
        component: MapPage,
    },
];

const router = createRouter({
    history: createWebHistory('/'),
    routes,
});

export default router;
