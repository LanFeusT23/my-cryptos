<template>
    <div class='assets' :class='{ loading: loading }'>
        <v-progress-circular class='loader' v-if='loading' indeterminate v-bind:size="70" v-bind:width="5"></v-progress-circular>
        <TotalAssets class='assets-section'></TotalAssets>
        <AssetsTable class='assets-section'></AssetsTable>
    </div>
</template>

<script>
    import TotalAssets from '@/components/TotalAssets.vue'
    import AssetsTable from '@/components/AssetsTable.vue'
    import { mapActions } from 'vuex'

    export default {
        name: 'Coins',
        dependencies: ['authHelpers'],
        components: {
            TotalAssets,
            AssetsTable
        },
        data() {
            return {
                loading: false
            }
        },
        methods: {
            ...mapActions("assets", ["loadDataAsync"]),
            ...mapActions("prices", ["loadPricesAsync"]),
        },
        created() {
            this.loading = true
            Promise.all([this.loadDataAsync(), this.loadPricesAsync()]).then(() => {
                this.loading = false
            })
        }
    }
</script>

<style lang='scss'>
    .assets {
        padding: $size14px;
        display: flex;
        flex-flow: column;
        justify-content: center;
        max-width: 800px;
        max-width: 420px;
        width: 100%;

        .loader {
            svg circle {
                stroke: $borderSecondary
            }
        }

        &.loading {
            align-items: center;
            
            .assets-section {
                display: none;
            }
        }
    }
</style>
