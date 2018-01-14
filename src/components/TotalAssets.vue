<template>
    <div id="total-assets-wrapper">
        <div>
            <div class='total-assets-title'>Total Assets:</div>
            <div class='total-assets-value'>${{ totalValue }}</div>
        </div>
        <div>
            <div class='total-assets-title'>Investment:</div>
            <div class='total-assets-value'>${{ totalInvestment }}</div>
        </div>
        <div>
            <div class='total-assets-title'>Profit:</div>
            <div class='total-assets-value' :class='{ isProfit: isProfit }'>${{ profit }}</div>
        </div>
    </div>
</template>

<script>
    import sumBy from 'lodash/sumBy'
    import { mapGetters } from "vuex";

    export default {
        name: 'TotalAssets',
        computed: {
            ...mapGetters("assets", ["assets"]),
            totalValue() {
                return sumBy(this.assets, 'totalValue').toFixed(0)
            },
            totalInvestment() {
                return sumBy(this.assets, 'investment').toFixed(0)
            },
            profit() {
                return (this.totalValue - this.totalInvestment).toFixed(0)
            },
            isProfit() {
                return this.profit >= 0
            }
        }
    }
</script>

<style lang='scss'>
    #total-assets-wrapper {
        margin-bottom: 1rem;
        font-weight: 400;
        font-style: italic;

        > div {
            display: flex;
            justify-content: space-between;
            align-items: baseline;
            line-height: 2.5rem;
        }

        .total-assets-title {
            font-size: $size30px;
        }

        .total-assets-value {
            text-align: right;
            font-size: $size40px;

            &.isProfit {
                color: $colorSuccess;
            }
        }
    }
</style>
