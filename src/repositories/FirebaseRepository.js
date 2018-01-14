import fetchival from "fetchival";
import { ref } from '@/auth/constants'


export default class FirebaseRepository {
    constructor() {
    }

    async getAssetsAsync(user) {
        return fetchival(`https://our-cryptos.firebaseio.com/users/${user.uid}/assets.json?auth=` + user.refreshToken).get()
    }
}