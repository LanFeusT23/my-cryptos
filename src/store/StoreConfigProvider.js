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
            state: {},
            getters: {
                dataLoaded(state) {
                    let prices = state.prices.pricesInUSD
                    if ((Object.keys(prices).length === 0 && prices.constructor === Object) || state.assets.localAssets.length === 0) {
                        return false
                    }

                    return true
                }
            },
            mutations: {},
            modules: {
                assets: this.assetsModule,
                prices: this.pricesModule
            }
        };

        return storeConfig;
    }
}