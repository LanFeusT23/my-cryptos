<template>
    <div class='assets'>
        <TotalAssets></TotalAssets>
        <AssetsTable></AssetsTable>
    </div>
</template>

<script>
    import TotalAssets from '@/components/TotalAssets.vue'
    import AssetsTable from '@/components/AssetsTable.vue'
    import { mapActions } from 'vuex'

    export default {
        name: 'Index',
        dependencies: ['store'],
        components: {
            TotalAssets,
            AssetsTable
        },
        methods: {
            ...mapActions("assets", ["loadDataAsync"]),
            ...mapActions("prices", ["loadPricesAsync"]),
        },
        created() {
            Promise.all([this.loadDataAsync(), this.loadPricesAsync()])
        }
    }
</script>

<style lang='scss'>
    .assets {
        padding: $size14px;
    }
</style>
