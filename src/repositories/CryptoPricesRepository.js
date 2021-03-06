import fetchival from "fetchival";

export default class CryptoPricesRepository {
    constructor() { }

    getPrices(coins) {
        var coinsString = coins.join().toUpperCase()

        return fetchival(`https://min-api.cryptocompare.com/data/pricemulti?fsyms=${coinsString}&tsyms=USD`).get();
    }
}