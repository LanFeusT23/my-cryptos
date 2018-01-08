const Index = () => import(/* webpackChunkName: "Index" */ "@/components/Index.vue");

export default class RoutesProvider {
    constructor() {
    }

    get() {
        return [
            { path: "/", component: Index }
        ];
    }

}