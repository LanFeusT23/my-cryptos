<template>
    <v-dialog v-model="dialog" persistent content-class="new-asset-dialog">
        <v-btn
            color="pink"
            slot="activator"
            small
            dark
            absolute
            top
            right
            fab
            @click="dialog = !dialog">
            <v-icon>add</v-icon>
        </v-btn>
        <v-card>
            <v-card-title class="headline">New Coin!</v-card-title>
            <v-card-text>
                <v-text-field
                    label="Name"
                    v-model="name"
                    :rules="[rules.required, rules.stringNoSpaces]"
                    required
                    autofocus>
                </v-text-field>
                <v-text-field
                    label="Coin count"
                    v-model="coinCount"
                    :rules="[rules.required, rules.number]"
                    required
                    type="number">
                </v-text-field>
                <v-text-field
                    label="Invested amount in US dollars"
                    v-model="investment"
                    :rules="[rules.required, rules.number]"
                    required
                    type="number">
                </v-text-field>
            </v-card-text>
            <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="gray darken-1" flat @click.native="dialog = false">Cancel</v-btn>
                <v-btn color="green darken-1" flat @click.native="addNewCoin">Add</v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>
</template>

<script>
    export default {
        name: 'NewAsset',
        data () {
            return {
                dialog: null,
                name: null,
                coinCount: 0,
                investment: 0,
                rules: {
                    required: (value) => !!value || 'Required.',
                    stringNoSpaces: (value) => {
                        return !/[ !@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/g.test(value) || 'Cannot have spaces.';
                    },
                    number: (value) => {
                        if (isNaN(value)) return 'Not a number.';

                        return true;
                    }
                }
            }
        },
        methods: {
            async addNewCoin() {
                if (+this.coinCount < 0 || 
                    +this.investment < 0 || 
                    this.name === undefined || 
                    this.name === null ||
                    this.name.trim() === ""
                    ) {
                    return;
                }
                
                await this.$store.dispatch("assets/addAssetAsync", {
                    assetId: this.name,
                    coinCount: +this.coinCount,
                    investment: +this.investment
                });
                this.dialog = !this.dialog;
            }
        }
    }
</script>

<style lang="scss">
    input {
        width: 100%;
        text-transform: uppercase;
    }

    .new-asset-dialog {
        max-width: $maxWidth;
    }
</style>
