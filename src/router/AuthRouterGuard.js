export default class AuthRouterGuard {
    constructor(authHelpers) {
        this.authHelpers = authHelpers
    }

    guard(router) {

        router.beforeEach((to, from, next) => {
            let userIsLoggedIn = this.authHelpers.getAuthenticatedUser();

            if (userIsLoggedIn && to.fullPath === '/') {
                next({
                    path: '/coins'
                })
            }

            if (to.matched.some(record => record.meta.requiresAuth)) {

                if (userIsLoggedIn) {

                    next()

                } else {

                    next({
                        path: '/',
                        query: {
                            redirect: to.fullPath
                        }
                    })

                }

            } else {

                next()

            }

        })
    }

}