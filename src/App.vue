<template>
    <v-app dark class="pageWrap">
        <header>
            <h1>Our Cryptos</h1>
        </header>
        <main>
            <router-view></router-view>
        </main>
        <footer>
            <button @click="logout">Logout</button>
        </footer>
    </v-app>
</template>

<script>
    export default {
        name: 'app',
        dependencies: ['authHelpers'],
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

    main > {
        div {
            width: 100%;
        }
    }

    footer {
        padding: 0 $size14px
    }
</style>
