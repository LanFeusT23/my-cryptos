<template>
    <div id="management-wrapper">
        <NewAsset></NewAsset>
        
        <table>
            <thead>
                <tr>
                    <th></th>
                    <th></th>
                    <th>Amount</th>
                    <th>Invested</th>
                    <th></th>
                </tr>
            </thead>
            <tbody>
                <tr v-for='asset in sortedAssets' :key='asset.id'>
                    <td class='icon-cell'>
                        <IconLink :assetName="asset.id"></IconLink>
                    </td>
                    <td class='asset-name'>
                        {{ asset.id }}
                    </td>
                    <td class="asset-count">
                        <!-- <AssetInput
                            :editing="editedCoins[asset.id].editing"
                            :valueBound="editedCoins[asset.id].coinCount"
                            :assetId="asset.id"
                            label="Amount"
                        ></AssetInput> -->

                        <template v-if="editedCoins[asset.id].editing">
                            <v-text-field
                                name="input-coin-count"
                                class="input-coin"
                                label="Amount"
                                v-model="editedCoins[asset.id].coinCount"
                                :rules="[rules.required, rules.number]"
                                single-line>
                            </v-text-field>
                        </template>
                        <template v-else>
                            {{ asset.coinCount }}
                        </template>
                    </td>
                    <td class="asset-investment">
                        <!-- <AssetInput
                            :editing="editedCoins[asset.id].editing"
                            :valueBound="editedCoins[asset.id].investment"
                            :assetId="asset.id"
                            label="Investment"
                        ></AssetInput> -->

                        <template v-if="editedCoins[asset.id].editing">
                            <v-text-field
                                name="input-coin-investment"
                                class="input-coin"
                                label="Investment"
                                v-model="editedCoins[asset.id].investment"
                                :rules="[rules.required, rules.number]"
                                single-line>
                            </v-text-field>
                        </template>

                        <template v-else>
                            {{ asset.investment }}
                        </template>

                    </td>
                    <td class="actions">

                        <template v-if="editedCoins[asset.id].editing">
                            <button @click='saveAsset(asset)'>
                                <i class="fa fa-floppy-o"></i>
                            </button>
                            <button @click='editAsset(asset)'>
                                <i class="fa fa-ban"></i>
                            </button>
                        </template>

                        <template v-else>
                            <button @click='editAsset(asset)'>
                                <i class="fa fa-pencil"></i>
                            </button>

                            <v-dialog v-model="editedCoins[asset.id].dialog" persistent>
                                <button slot="activator">
                                    <i class="fa fa-trash"></i>
                                </button>
                                <v-card>
                                    <v-card-title class="headline">Delete {{ asset.id }}</v-card-title>
                                    <v-card-text>This cannot be reversed, are you sure you wish to delete {{ asset.id }}?</v-card-text>
                                    <v-card-actions>
                                        <v-spacer></v-spacer>
                                        <v-btn color="red darken-1" flat @click.native="editedCoins[asset.id].dialog = false">No</v-btn>
                                        <v-btn color="green darken-1" flat @click.native="deleteAsset(asset)">Yes</v-btn>
                                    </v-card-actions>
                                </v-card>
                            </v-dialog>
                        </template>

                    </td>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<script>
    import AssetInput from "@/components/manage/AssetInput.vue"
    import NewAsset from "@/components/manage/NewAsset.vue"
    import IconLink from "@/components/common/IconLink.vue"
    import { mapGetters, mapState, mapMutations } from "vuex";
    import sortBy from "lodash/sortBy";

    export default {
        name: 'ManageAssets',
        components: {
            IconLink,
            AssetInput,
            NewAsset
        },
        data() {
            return {
                editedCoins: {},
                rules: {
                    required: (value) => !!value || 'Required.',
                    number: (value) => {
                        if (!value) return 'Not a number.';
                        if (isNaN(value)) return 'Not a number.';

                        return true;
                    }
                }
            }
        },
        computed: {
            ...mapState("assets", ["basicAssets"]),
            sortedAssets() {
                return sortBy(this.basicAssets, 'id');
            }
        },
        watch: {
            basicAssets(value) {
                this.updateEditedCoinsObj(value)
            }
        },
        methods: {
            editAsset(data) {
                this.editedCoins[data.id].editing = !this.editedCoins[data.id].editing;
            },
            async deleteAsset(data) {
                this.editedCoins[data.id].dialog = false;
                await this.$store.dispatch("assets/removeAssetAsync", data.id);
                delete this.editedCoins[data.id];
            },
            async saveAsset(data) {
                let thisCoin = this.editedCoins[data.id];
                // fix validation with 3rd party tool eventually
                if (isNaN(thisCoin.coinCount) && isNaN(thisCoin.investment)) return;

                await this.$store.dispatch("assets/saveAssetAsync", {
                    assetId: data.id,
                    coinCount: +thisCoin.coinCount,
                    investment: +thisCoin.investment
                })
                this.editedCoins[data.id].editing = false;
            },
            updateEditedCoinsObj(data) {
                data.map(a => {
                    this.$set(this.editedCoins, a.id, {
                        editing: false,
                        coinCount: a.coinCount,
                        investment: a.investment,
                        dialog: false
                    })
                })
            }
        },
        created() {
            this.updateEditedCoinsObj(this.basicAssets)
        }
    }
</script>

<style lang='scss'>
    #management-wrapper {
        @include maxWidth;
        position: relative;
        width: 100%;
        padding: $size14px;

        table {
            width: 100%;

            th, td {
                text-align: left;
            }

            td {
                height: 55px;

                &.icon-cell {
                    width: 58px;

                    a {
                        width: 50px;
                        height: 50px;
                    }
                }

                &.asset-name {
                    width: 50px;
                    text-transform: uppercase;
                }

                &.asset-investment {
                    width: 110px;
                } 

                &.actions {
                    width: 40px;

                    * {
                        outline: none;
                    }
                    
                    button:first-child {
                        margin-right: 3px;
                    }
                }

                input {
                    width: 100%;
                }
            }
        }
    }
</style>
