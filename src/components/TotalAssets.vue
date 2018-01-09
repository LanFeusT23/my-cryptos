<template>
    <div id="total-assets-wrapper">
        <div>
            <div class='total-assets-title'>Total Assets:</div>
            <div class='total-assets-value'>${{ totalValue }}</div>
        </div>
        <!-- <div>Total Costs: $XXXX</div>
        <div>Total Profit: $XXXX</div> -->
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
                return sumBy(this.assets, 'totalValue')
            }
        }
    }
</script>

<style lang='scss'>
    #total-assets-wrapper {
        margin-bottom: 1rem;
        font-weight: 400;
        font-size: $size40px;
        font-style: italic;

        .total-assets-value {
            text-align: right;
        }
    }
</style>
