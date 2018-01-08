
export default class CryptoPricesModuleExtension {
    constructor(cryptoPricesRepository) {
        this.cryptoPricesRepository = cryptoPricesRepository;
    }

    get() {

        const self = this;

        return {
            namespaced: true,
            state: {
                pricesInUSD: {}
            },
            mutations: {
                setPrices: (state, usdPrices) => state.pricesInUSD = usdPrices
            },
            actions: {
                loadPricesAsync({ commit }, name) {
                    var usdPrices = {}

                    return self.cryptoPricesRepository.getPrices()
                        .then(prices => {
                            Object.keys(prices).map(key => {
                                usdPrices[key] = prices[key].USD
                            })

                            commit("setPrices", usdPrices);

                            return usdPrices
                    })
                }
            }
        }
    }
}