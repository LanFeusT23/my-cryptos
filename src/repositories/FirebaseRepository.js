import fetchival from "fetchival";
import { ref } from '@/auth/constants'

export default class FirebaseRepository {
    constructor() {
    }

    async getAssetsAsync(refreshToken) {
        return fetchival('https://our-cryptos.firebaseio.com/assets.json?auth=' + refreshToken).get()
    }
}