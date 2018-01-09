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
import AuthRouterGuard from '@/router/AuthRouterGuard'

import AuthHelpers from '@/auth/AuthHelpers'

const appBinding = function (Vue) {
    Vue.use(injector);
    Vue.use(VueRouter);
    Vue.use(Vuex);
    Vue.use(Vuetify);
    
    injector.constant("inDev", process.env.NODE_ENV !== "production");
    injector.constant("window", window);

    injector.service("authHelpers", ["store"], AuthHelpers);
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

    let store = injector.get("store")
    let router = injector.get("router")
    sync(store, router);
    
    let authHelpers = injector.get("authHelpers")
    var routerGuard = new AuthRouterGuard(authHelpers)
    routerGuard.guard(router)

    return injector;
};

export default appBinding;