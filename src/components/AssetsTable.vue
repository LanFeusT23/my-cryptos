<template>
    <div id="assets-table-wrapper">
        <div class='asset-card' v-for='asset in sortedAssets' :key='asset.id'>
            <div class="icon" :class='getCssClass(asset)'></div>
            <div class="coin-name-wrapper">
                    <span class="coin-name">{{ asset.id }}</span>
                    <span class="coin-value">(${{ asset.coinValue }})</span>
                </div>
            <div class="count">{{ asset.coinCount }}</div>
            <div class="total-value">${{ asset.totalValue }}</div>
        </div>
    </div>
</template>

<script>
    import { mapGetters } from "vuex";
    import { mapState } from "vuex";

    export default {
        name: 'AssetsTable',
        computed: {
            ...mapGetters("assets", ["assets"]),
            sortedAssets() {
                return this.assets.sort((a, b) => {
                    return a.totalValue < b.totalValue
                })
            }
        },
        methods: {
            getCssClass(asset) {
                return `icon-asset-${asset.id.toLowerCase()}`
            }
        }
    }
</script>

<style lang='scss' scoped>
    .asset-card {
        background: $backgroundSecondary;
        padding: $size10px;
        border-radius: 5px;
        margin-bottom: $size14px;
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

        grid-column-gap: $size10px;
        grid-row-gap: calc(#{$size16px} / 2);
        grid-template-columns: 58px 1fr;
        grid-template-rows: 46px 1fr;
        grid-template-areas: 
            "icon   coin-name"
            "count  total-value";    
            
        .icon {
            background-size: 46px;
            background-position: center;
            background-repeat: no-repeat;
        }

        .coin-name-wrapper {
            font-weight: 200;
            display: flex;
            align-items: center;

            > span:first-child {
                margin-right: $size10px;
            }

            .coin-name {
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
            color: $colorSuccess;
            text-align: right;
        }
        
    }
</style>
