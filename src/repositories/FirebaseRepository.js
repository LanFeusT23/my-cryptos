import fetchival from "fetchival";
import { ref } from '@/auth/constants'


export default class FirebaseRepository {
    constructor() {
    }

    getUserDataAsync(user) {
        return fetchival(`https://our-cryptos.firebaseio.com/users/${user.uid}.json?auth=` + user.refreshToken).get()
    }

    updateCoinAsync(user, { assetId, coinCount, investment }) {
        return fetchival(`https://our-cryptos.firebaseio.com/users/${user.uid}/assets/${assetId}.json?auth=` + user.refreshToken).patch({
            coinCount,
            investment
        })
    }

    createUser(user) {
        return fetchival(`https://our-cryptos.firebaseio.com/users/${user.uid}.json?auth=` + user.refreshToken).put({
            email: user.email
        })
    }
}