<template>
    <div class='assets' :class="{ loading: loading }">
        <v-progress-circular class='loader' v-if='loading && !error' indeterminate v-bind:size="70" v-bind:width="5"></v-progress-circular>

        <template v-if="!loading && !error && hasData">
            <TotalAssets class='assets-section'></TotalAssets>
            <AssetsTable class='assets-section'></AssetsTable>
        </template>
        <template v-if="!error && !hasData && !loading">
            <h1>No data set yet! Forms to be coming!</h1>
        </template>

        <v-alert color='error' icon='fa-exclamation-triangle' class="error-message" v-model='showErrorMsg'>
            Something went wrong!
        </v-alert>
    </div>    
</template>

<script>
    import TotalAssets from '@/components/TotalAssets.vue'
    import AssetsTable from '@/components/AssetsTable.vue'
    import { mapActions, mapGetters, mapState } from 'vuex'

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
        },
        methods: {
            ...mapActions("assets", ["loadDataAsync"]),
            ...mapActions("prices", ["loadPricesAsync"]),
        },
        created() {
            this.$store.dispatch("loadAllData")
        }
    }
</script>

<style lang='scss'>
    .assets {
        padding: $size14px;
        display: flex;
        flex-flow: column;
        justify-content: flex-start;
        max-width: 800px;
        min-width: 420px;
        width: 100%;

        .loader {
            svg circle {
                stroke: $borderSecondary
            }
        }

        &.loading {
            align-items: center;
        }
    }
</style>
