<template>
    <div class='assets'>
        <template v-if="hasData">
            <TotalAssets class='assets-section'></TotalAssets>
            <AssetsTable class='assets-section'></AssetsTable>
        </template>
        <template v-if="!hasData">
            <h1>No data set yet! Forms to be coming!</h1>
        </template>

        <v-alert color='error' icon='fa-exclamation-triangle' class="error-message" v-model='showErrorMsg'>
            Something went wrong!
        </v-alert>
    </div>    
</template>

<script>
    import TotalAssets from '@/components/assets/TotalAssets.vue'
    import AssetsTable from '@/components/assets/AssetsTable.vue'
    import { mapGetters, mapState } from 'vuex'

    export default {
        name: 'Coins',
        dependencies: ['authHelpers'],
        components: {
            TotalAssets,
            AssetsTable
        },
        computed: {
            ...mapState(["loading", "error"]),
            ...mapGetters("assets", ["hasData"]),
            showErrorMsg() {
                return !this.loading && this.error;
            }  
        }
    }
</script>

<style lang='scss' scoped>
    .assets {
        padding: $size14px;
        display: flex;
        flex-flow: column;
        justify-content: flex-start;
        max-width: 800px;
        min-width: 420px;
        width: 100%;
    }
</style>
