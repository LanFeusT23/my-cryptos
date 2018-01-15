import Index from '@/components/Index.vue'
const Coins = () => import(/* webpackChunkName: "Coins" */ "@/components/assets/Coins.vue");
const ManageAssets = () => import(/* webpackChunkName: "ManageAssets" */ "@/components/manage/ManageAssets.vue");

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
            { path: "/coins", component: Coins, meta: { requiresAuth: true } },
            { path: "/manage", component: ManageAssets, meta: { requiresAuth: true } }
        ];
    }

}