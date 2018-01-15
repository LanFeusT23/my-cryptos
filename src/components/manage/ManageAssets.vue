<template>
    <div id="management-wrapper">
        <table>
            <thead>
                <tr>
                    <th></th>
                    <th>Name</th>
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
                        <template v-if="asset.editing">
                            <v-text-field
                                name="input-coin-count"
                                class="input-coin"
                                label="Amount"
                                :value="asset.coinCount"
                                :rules="[rules.required, rules.number]"
                                single-line>
                            </v-text-field>
                        </template>
                        <template v-else>
                            {{ asset.coinCount }}
                        </template>
                    </td>
                    <td class="asset-investment">
                        <template v-if="asset.editing">
                            <v-text-field
                                name="input-coin-count"
                                class="input-coin"
                                label="Investment"
                                :value="asset.investment"
                                :rules="[rules.required, rules.number]"
                                single-line>
                            </v-text-field>
                        </template>
                        <template v-else>
                            {{ asset.investment }}
                        </template>
                    </td>
                    <td class="actions">
                        <template v-if="asset.editing">
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
                            <button @click='deleteAsset(asset)'>
                                <i class="fa fa-trash"></i>
                            </button>
                        </template>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<script>
    import IconLink from "@/components/common/IconLink.vue"
    import { mapGetters, mapState, mapMutations } from "vuex";
    import sortBy from "lodash/sortBy";

    export default {
        name: 'ManageAssets',
        components: {
            IconLink
        },
        data() {
            return {
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
            ...mapState("manage", ["assets"]),
            sortedAssets() {
                return sortBy(this.assets, 'id');
            }
        },
        methods: {
            editAsset(data) {
                this.$store.commit("manage/toggleEditedAsset", {
                    assetId: data.id,
                    editing: true
                })
            },
            deleteAsset() {
                
            },
            saveAsset(data) {
                console.log(data)
                this.$store.commit("manage/updateAsset", {
                    assetId: data.id,
                    coinCount: data.coinCount,
                    investment: data.investment
                })
            }
        },
        created () {
            this.$store.dispatch("manage/setDataAsync")
        }
    }
</script>

<style lang='scss'>
    #management-wrapper {
        width: 100%;
        padding: $size14px;

        table {
            width: 100%;

            th, td {
                text-align: left;
            }

            td {
                &.icon-cell {
                    width: 65px;

                    a {
                        width: 50px;
                        height: 50px;
                    }
                }

                &.asset-name, &.asset-investment {
                    width: 70px;
                }

                &.actions {
                    width: 40px;
                }

                input {
                    width: 100%;
                }
            }
        }
    }
</style>
