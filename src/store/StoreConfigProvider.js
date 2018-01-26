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
                        displayName: user.displayName,
                        photoURL: user.photoURL,
                        email: user.email,
                        readFrom: user.readFrom
                    })
                },
                clearUser({ commit }) {
                    commit('clearUser')
                },
                async loadAllData({ commit, dispatch }) {
                    commit("setLoading", true)

                    try {
                        let assets = await dispatch("assets/loadDataAsync")
                        dispatch("prices/loadPricesAsync", assets)
                    } catch (error) {
                        commit("setError", true)
                    }
                    finally {
                        commit("setLoading", false)
                    }
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