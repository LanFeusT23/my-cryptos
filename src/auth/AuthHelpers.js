import { firebaseAuth, googleProvider } from '@/auth/constants';

export default class AuthHelpers {
    constructor (store, router) {
        this.store = store;
        this.router = router;
    }

    loginWithGoogle() {
        firebaseAuth().signInWithRedirect(googleProvider).catch(function(error){
            alert(error);
        });
    }
    
    setAuth(authData) {
        authData 
            ? this.store.dispatch('setUser', authData)
            : this.store.dispatch('clearUser')
        return authData
    }
    
    logout() {
        this.setAuth(null)
        firebaseAuth().signOut();
        this.router.push({ path: '/' })
    }
    
    startAsync() {
        return new Promise((resolve, reject) => {            
            firebaseAuth().onAuthStateChanged(user => {
                if (user) {                
                    firebaseAuth().currentUser.getIdToken().then(token => {
                        user.token = token
                        console.log("user authenticated", user)
                        resolve(this.setAuth(user))
                    })                    
                } else {
                    //console.log("user not authenticated", user) 
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