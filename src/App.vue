<template>
    <v-app dark class="pageWrap">
        <header>
            <h1>Our Cryptos</h1>
        </header>
        <main :class='{ loading: loading }'>
            <v-progress-circular class='loader' v-show='loading && !error' indeterminate v-bind:size="70" v-bind:width="5"></v-progress-circular>
            <router-view v-if="!loading && !error"></router-view>
        </main>
        <footer v-show='isLoggedIn'>
            <v-btn flat dark @click="logout">Logout</v-btn>
        </footer>
    </v-app>
</template>

<script>
    import { mapGetters, mapState } from 'vuex';

    export default {
        name: 'app',
        dependencies: ['authHelpers'],
        computed: {
            ...mapState(["loading", "error"]),
            ...mapGetters(['isLoggedIn'])
        },
        methods: {
            logout() {
                this.authHelpers.logout()
            }
        },
        created() {
            if (this.isLoggedIn){
                this.$store.dispatch("loadAllData")
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
        justify-content: center;

        &.loading {
            align-items: center;
        }
    }

    .loader {
        svg circle {
            stroke: $borderSecondary
        }
    }

    footer {
        padding: 0 $size14px;
        display: flex;
        justify-content: center;
        margin-bottom: 1rem;
    }
</style>
