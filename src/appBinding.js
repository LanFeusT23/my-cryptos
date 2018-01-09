import injector from "vue-inject";
import VueRouter from "vue-router";
import Vuetify from "vuetify"

import { sync } from "vuex-router-sync";
import Vuex from "vuex";

import RoutesProvider from "@/router/RoutesProvider";
import AssetsModuleExtension from "@/store/modules/AssetsModuleExtension";
import CryptoPricesModuleExtension from "@/store/modules/CryptoPricesModuleExtension";
import StoreConfigProvider from "@/store/StoreConfigProvider";
import FirebaseRepository from "@/repositories/FirebaseRepository";
import CryptoPricesRepository from "@/repositories/CryptoPricesRepository";
import AuthRouterGuard from './router/AuthRouterGuard'

import AuthHelpers from '@/auth/AuthHelpers'

const appBinding = function (Vue) {
    Vue.use(injector);
    Vue.use(VueRouter);
    Vue.use(Vuex);
    Vue.use(Vuetify);
    
    injector.constant("inDev", process.env.NODE_ENV !== "production");
    injector.constant("window", window);

    injector.service("authHelpers", AuthHelpers);
    injector.service("routesProvider", RoutesProvider);

    injector.factory("router", ["routesProvider"], (routesProvider) => {
        var router = new VueRouter({
            routes: routesProvider.get()
        });

        return router;
    });

    injector.service("firebaseRepository", FirebaseRepository);
    injector.service("cryptoPricesRepository", CryptoPricesRepository);

    injector.service("assetsModuleExtension", ["firebaseRepository"], AssetsModuleExtension);
    injector.service("cryptoPricesModuleExtension", ["cryptoPricesRepository"], CryptoPricesModuleExtension);
    injector.service("storeConfigProvider", ["inDev", "assetsModuleExtension", "cryptoPricesModuleExtension"], StoreConfigProvider);

    injector.factory("store", ["storeConfigProvider"], (storeConfigProvider) => {
        var storeConfig = storeConfigProvider.get();
        return new Vuex.Store(storeConfig);
    });

    sync(injector.get("store"), injector.get("router"));
    
    var routerGuard = new AuthRouterGuard(injector.get('authHelpers'))
    routerGuard.guard(injector.get('router'), injector.get('store'))

    return injector;
};

export default appBinding;