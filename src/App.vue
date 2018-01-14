<template>
    <v-app dark class="pageWrap">
        <header>
            <h1>Our Cryptos</h1>
        </header>
        <main>
            <router-view></router-view>
        </main>
        <footer v-show='isLoggedIn'>
            <v-btn flat dark @click="logout">Logout</v-btn>
        </footer>
    </v-app>
</template>

<script>
    import { mapGetters } from 'vuex';

    export default {
        name: 'app',
        dependencies: ['authHelpers'],
        computed: {
            ...mapGetters(['isLoggedIn'])
        },
        methods: {
            logout() {
                this.authHelpers.logout()
            }
        }
    }
</script>

<style lang='scss'>
    header {
        display: flex;
        justify-content: center;
        align-items: center;
        height: 5.25rem;
        background: #242426;
        border-bottom: 2px solid #4dadf9;

        h1 {
            font-style: italic;
            font-weight: 400;
        }
    }

    main {
        display: flex;
        align-items: center;
        justify-content: center;
    }

    footer {
        padding: 0 $size14px;
        display: flex;
        justify-content: center;
        margin-bottom: 1rem;
    }
</style>
