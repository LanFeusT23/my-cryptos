import Index from '@/components/Index.vue'
const Coins = () => import(/* webpackChunkName: "Index" */ "@/components/Coins.vue");

export default class RoutesProvider {
    constructor() { }

    get() {
        return [
            { 
                path: "/", 
                component: Index,
                props: (route) => {
                    return {
                        redirect: route.query.redirect
                    }
                }
            },
            { path: "/coins", component: Coins, meta: { requiresAuth: true } }
        ];
    }

}