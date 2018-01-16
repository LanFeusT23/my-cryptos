<template>
    <div class="header">
        <v-toolbar dark>
            <v-toolbar-side-icon @click="drawer = !drawer"></v-toolbar-side-icon>
            <v-toolbar-title class="white--text">Our Cryptos</v-toolbar-title>
        </v-toolbar>

        <v-navigation-drawer
            temporary
            v-model="drawer"
            dark
            absolute
        >
        <v-list class="pa-1">
                <v-list-tile avatar tag="div">
                    <v-list-tile-avatar>
                        <img :src="user.photoURL" />
                    </v-list-tile-avatar>
                    <v-list-tile-content>
                        <v-list-tile-title>{{ user.displayName }}</v-list-tile-title>
                    </v-list-tile-content>
                </v-list-tile>
            </v-list>
            <v-list class="pt-0" dense>
                <v-divider light></v-divider>
                <v-list-tile v-for="item in items" :key="item.title" @click="goTo(item.route)">
                    <v-list-tile-action>
                        <v-icon>{{ item.icon }}</v-icon>
                    </v-list-tile-action>
                    <v-list-tile-content>
                        <v-list-tile-title>{{ item.title }}</v-list-tile-title>
                    </v-list-tile-content>
                </v-list-tile>
            </v-list>
        </v-navigation-drawer>
    </div>
</template>

<script>
    import { mapState } from 'vuex'

    export default {
        name: 'Header',
        data() {
            return {
                drawer: null,
                items: [
                    { title: 'Coins', icon: 'attach_money', route: '/coins' },
                    { title: 'Manage', icon: 'mode_edit', route: '/manage' }
                ]
            }
        },
        computed: {
            ...mapState(["user"])
        },
        methods: {
            goTo(route) {
                this.$router.push(route);
            }
        }
    }
</script>

<style lang="scss" scoped>
</style>
