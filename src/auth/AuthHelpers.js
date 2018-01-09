import { firebaseAuth, googleProvider } from './constants';

export default class AuthHelpers {
    constructor (store) {
        this.store = store
    }

    loginWithGoogle() {
        firebaseAuth().signInWithRedirect(googleProvider).catch(function(error){
            alert(error);
        });
    }

    getAuth() {
        return this.store.getters.user  
    }
    
    setAuth(authData) {
        authData 
            ? this.store.dispatch('setUser', authData)
            : this.store.dispatch('clearUser')
        return authData
    }
    
    logout() {
        this.setAuth(null)
        return firebaseAuth().signOut();
    }
    
    startAsync() {
        return new Promise((resolve, reject) => {

            firebaseAuth().onAuthStateChanged(user => {

                if (user) {
                    console.log("user authenticated", user)
                    resolve(this.setAuth(user))
                } else {
                    console.log("user not authenticated", user) 
                    resolve(this.setAuth(null)) 
                }

            });

        })

    }

    getRedirectResult() {    
    
        firebaseAuth().getRedirectResult().then(function(result) {
            console.log("creds?")
            if (result.credential) {
            // This gives you a Google Access Token. You can use it to access the Google API.
            var token = result.credential.accessToken;
            // ...
            }
            // The signed-in user info.
            var user = result.user;
            console.log(user)
            this.setAuth(null, user)
    
        }).catch(function(error) {
            console.log("creds error!")
            // Handle Errors here.
            var errorCode = error.code;
            var errorMessage = error.message;
            // The email of the user's account used.
            var email = error.email;
            // The firebase.auth.AuthCredential type that was used.
            var credential = error.credential;
            // ...
        });
    }
}