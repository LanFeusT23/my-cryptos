export default class StoreConfigProvider {
    constructor(strictMode, assetsModuleExtension, cryptoPricesModuleExtension) {
        this.strictMode = strictMode;
        this.assetsModule = assetsModuleExtension.get();
        this.pricesModule = cryptoPricesModuleExtension.get();
    }

    get() {
        var self = this;

        var storeConfig = {
            strict: this.strictMode,
            state: {
                user: undefined
            },
            getters: {
                dataLoaded(state) {
                    let prices = state.prices.pricesInUSD
                    if ((Object.keys(prices).length === 0 && prices.constructor === Object) || state.assets.localAssets.length === 0) {
                        return false
                    }

                    return true
                },
                user(state) {
                    return state.user
                }
            },
            mutations: {
                setUser: (state, user) => state.user = user,
                clearUser: (state) => state.user = undefined
            },
            actions: {
                setUser({ commit }, user) {
                    commit('setUser', {
                        uid: user.uid,
                        refreshToken: user.refreshToken
                    })
                },
                clearUser({ commit }) {
                    commit('clearUser')
                }
            },
            modules: {
                assets: this.assetsModule,
                prices: this.pricesModule
            }
        };

        return storeConfig;
    }
}