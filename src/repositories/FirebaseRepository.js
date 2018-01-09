import fetchival from "fetchival";

export default class FirebaseRepository {
    constructor() {
    }

    async getAssetsAsync(refreshToken) {
        //return fetchival('https://our-cryptos.firebaseio.com/assets.json?auth=' + refreshToken).get()
        return fetchival('https://our-cryptos.firebaseio.com/assets.json').get()
    }
}