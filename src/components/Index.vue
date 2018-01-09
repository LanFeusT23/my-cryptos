<template>
    <div>
        <v-btn color="primary" @click.native="login" :loading="loading">
            <i class="fa fa-google"></i>
            Sign with Google...
        </v-btn>
    </div>
</template>

<script>
    import { mapActions } from 'vuex'

    export default {
        name: 'Index',
        dependencies: ['authHelpers'],
        props: {
            redirect: {
                type: String,
                default: '/coins'
            }
        },
        data() {
            return {
                loading: false
            }
        },
        created() {
            if(this.redirect) {
                this.$router.push(this.redirect)
            }
        },
        methods: {
            login() {
                this.loading = true
                this.authHelpers.loginWithGoogle()
            }
        }
    }
</script>