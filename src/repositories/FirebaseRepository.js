import fetchival from "fetchival";

export default class FirebaseRepository {
    constructor() {
        
    }

    async getAssetsAsync(name) {
        return fetchival('https://our-cryptos.firebaseio.com/assets.json').get()
    }
}