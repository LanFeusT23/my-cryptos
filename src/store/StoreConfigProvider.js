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
            getters: {},
            mutations: {},
            modules: {
                assets: this.assetsModule,
                prices: this.pricesModule
            }
        };

        return storeConfig;
    }
}