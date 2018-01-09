// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import '@/styles/styles.scss'

import Vue from 'vue'
import App from './App'

import appBinding from "./appBinding";

Vue.config.productionTip = false

/* eslint-disable no-new */
var injector = appBinding(Vue);

injector.get('authHelpers').startAsync().then(user => {
    new Vue({
        el: '#app',
        template: '<App/>',
        components: { App },
        router: injector.get("router"),
        store: injector.get("store")
    })
})