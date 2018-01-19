<template>
    <div id="assets-table-wrapper">
        <div class='asset-card' v-for='asset in sortedAssets' :key='asset.id'>
            <div class="coin-info">
                <IconLink :assetName="asset.id"></IconLink>
                <div class="coin-name-wrapper">
                    <span class="coin-name">{{ asset.id }}</span>
                    <span class="coin-value">(${{ asset.coinValue | commaNumbers }})</span>
                </div>
                <div class="count">{{ asset.coinCount | commaNumbers }}</div>
                <div class="total-value">
                    <div class='total-value-title'>Total</div>
                    <div>${{ asset.totalValue | commaNumbers }}</div>
                </div>
            </div>
            <div class='meta-info'>
                <div class="roi">
                    {{ asset.roi | commaNumbers }}%
                </div>
                <div class="invested">
                    <i class="fa fa-credit-card"></i>
                    ${{ asset.investment | commaNumbers }}
                </div>
                <div class="profit" :class='{ isProfit: asset.isProfit }'>
                    ${{ asset.profit | commaNumbers }}
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import IconLink from "@/components/common/IconLink.vue"
    import orderBy from "lodash/orderBy";
    import { mapGetters } from "vuex";
    import { mapState } from "vuex";

    export default {
        name: 'AssetsTable',
        components: {
            IconLink
        },
        computed: {
            ...mapGetters("assets", ["assets"]),
            sortedAssets() {
                return orderBy(this.assets, ['totalValue'], ['desc']);
            }
        }
    }
</script>

<style lang='scss' scoped>
    .asset-card {
        background: $backgroundSecondary;
        border-radius: 5px;
        margin-bottom: $size16px;
        padding: 0;

        .coin-info {
            padding: $size10px;
            display: grid;

            .icon {
                grid-area: icon;
            }

            .coin-name-wrapper {
                grid-area: coin-name;
            }

            .count {
                grid-area: count;
            }

            .total-value {
                grid-area: total-value;
            }

            .meta-info {
                grid-area: meta-info;
            }

            grid-column-gap: $size10px;
            grid-row-gap: calc(#{$size16px} / 2);
            grid-template-columns: 58px 1fr;
            grid-template-rows: 46px 1fr;
            grid-template-areas: 
                "icon       coin-name"
                "count      total-value"   
                "meta-info  meta-info";

            .coin-name-wrapper {
                font-weight: 200;
                display: flex;
                align-items: center;

                > span:first-child {
                    margin-right: $size10px;
                }

                .coin-name {
                    text-transform: uppercase;
                    font-size: $size40px;
                }

                .coin-value {
                    font-size: $size24px;
                }
            }

            .count {
                overflow: hidden;
                text-align: center;
                font-weight: 200;
                font-size: $size12px;
            }

            .total-value {
                font-weight: 400;
                line-height: 3rem;
                font-size: $size60px;
                text-align: right;

                .total-value-title {
                    text-transform: uppercase;
                    font-size: $size14px;
                    line-height: 1rem;
                }
            }
        }
        
        .meta-info {
            display: flex;
            justify-content: center;
            align-items: center;
            border-top: 1px dashed $borderPrimary;

            > div {
                flex: 1;
                display: flex;
                justify-content: center;
                align-items: center;
                
                &.invested {
                    .fa {
                        margin-right: 5px;
                    }
                }

                &:first-child, &:nth-child(2) {
                    border-right: 1px dashed $borderPrimary;
                }

                &.profit {
                    border-radius: 0 0 5px 0;
                    background-color: $colorFail;

                    &.isProfit {
                        background-color: $colorSuccess;
                    }
                }
            }
        }
    }
</style>
