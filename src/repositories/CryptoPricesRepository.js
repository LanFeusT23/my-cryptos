import fetchival from "fetchival";

export default class CryptoPricesRepository {
    constructor() { }

    async getPrices() {
        return fetchival('https://min-api.cryptocompare.com/data/pricemulti?fsyms=XRP,BTC,ETH,STRAT,GNT,MAID,LSK,LTC,XLM&tsyms=USD').get()
    }
}