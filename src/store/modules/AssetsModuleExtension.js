import format from 'string-format'
const CHARTS_URL = 'https://www.cryptocompare.com/coins/{0}/overview/{1}'

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
                hasData(state) {
                    return state.localAssets.length > 0;
                },
                assets(state, getters, rootState, rootGetters) {
                    let prices = rootState.prices.pricesInUSD
                    if (rootGetters.loading) {
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
                            roi: +(profit / asset.investment * 100).toFixed(2),
                            chartsUrl: format(CHARTS_URL, asset.id.toLowerCase(), 'usd')
                        }
                    })
                }
            },
            mutations: {
                setAssetsData: (state, assetsData) => state.localAssets = assetsData,
                updateLastLoaded: (state) => state.lastLoaded = new Date()
            },
            actions: {
                async loadDataAsync({ commit, rootState }) {

                    let userData = await self.firebaseRepository.getUserDataAsync(rootState.user)
                    if (userData === null) {
                        await self.firebaseRepository.createUser(rootState.user);
                        userData = {};
                    }

                    if (userData.readFrom) {
                        userData = await self.firebaseRepository.getUserDataAsync({
                            ...rootState.user,
                            uid: userData.readFrom
                        })
                    }

                    if (!userData.assets) {
                        userData = {
                            assets: {}
                        }
                    }
                    var assetsArray = Object.keys(userData.assets).map(assetKey => {
                        return {
                            ...userData.assets[assetKey]
                        }
                    })

                    commit("setAssetsData", assetsArray);
                    commit("updateLastLoaded");

                    return assetsArray;
                }
            }
        }
    }
}