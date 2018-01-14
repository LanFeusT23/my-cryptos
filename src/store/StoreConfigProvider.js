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
                user: undefined,
                loading: false,
                error: false
            },
            getters: {
                isLoggedIn(state) {
                    return state.user !== null && state.user !== undefined;
                }
            },
            mutations: {
                setUser: (state, user) => state.user = user,
                setLoading: (state, loading) => state.loading = loading,
                setError: (state, error) => state.user = error,
                clearUser: (state) => state.user = undefined
            },
            actions: {
                setUser({ commit }, user) {
                    commit('setUser', {
                        uid: user.uid,
                        refreshToken: user.token,
                        email: user.email
                    })
                },
                clearUser({ commit }) {
                    commit('clearUser')
                },
                loadAllData({ commit, dispatch }) {
                    commit("setLoading", true)
                    return dispatch("assets/loadDataAsync").then(assets => {
                        return dispatch("prices/loadPricesAsync", assets)                            
                            .catch(() => {
                                commit("setError", false)
                            })
                            .then(() => {
                                commit("setLoading", false)
                            })
                    })
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