export default class AssetsModuleExtension {
    constructor(firebaseRepository) {
        this.firebaseRepository = firebaseRepository;
    }

    get() {

        const self = this;

        return {
            namespaced: true,
            state: {
                localAssets: []
            },
            getters: {
                assets(state, getters, rootState, rootGetters) {
                    let prices = rootState.prices.pricesInUSD
                    if (!rootGetters.dataLoaded) {
                        return []
                    }

                    return state.localAssets.map(asset => {
                        var assetPrice = prices[asset.id];
                        var totalValue = assetPrice * asset.coinCount;
                        var profit = totalValue - asset.investment;                        

                        return {
                            ...asset,
                            investment: +asset.investment.toFixed(0),
                            coinValue: assetPrice,
                            totalValue: Math.trunc(totalValue),
                            profit: +profit.toFixed(0),
                            isProfit: profit >= 0,
                            roi: +(profit / asset.investment * 100).toFixed(2)                            
                        }
                    })
                }
            },
            mutations: {
                setAssetsData: (state, assetsData) => state.localAssets = assetsData,
                updateLastLoaded: (state) => state.lastLoaded = new Date()
            },
            actions: {
                loadDataAsync({ commit, rootState }, name) {

                    return self.firebaseRepository.getAssetsAsync(rootState.user.refreshToken).then(assetsData => {
                        var assetsArray = Object.keys(assetsData).map(assetKey => {
                            return {
                                ...assetsData[assetKey]
                            }
                        })

                        commit("setAssetsData", assetsArray);
                        commit("updateLastLoaded");

                        return assetsArray;
                    });

                }
            }
        }
    }
}