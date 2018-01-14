<template>
    <div class='assets' :class='{ loading: loading }'>
        <v-progress-circular class='loader' v-if='loading && !error' indeterminate v-bind:size="70" v-bind:width="5"></v-progress-circular>

        <TotalAssets class='assets-section' v-if='!loading && !error'></TotalAssets>
        <AssetsTable class='assets-section' v-if='!loading && !error'></AssetsTable>

        <v-alert color='error' icon='fa-exclamation-triangle' class="error-message" v-model='showErrorMsg'>
            Something went wrong!
        </v-alert>
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
                loading: false,
                error: false
            }
        },
        computed: {
            showErrorMsg() {
                return !this.loading && this.error;
            }  
        },
        methods: {
            ...mapActions("assets", ["loadDataAsync"]),
            ...mapActions("prices", ["loadPricesAsync"]),
        },
        created() {
            this.loading = true;
            this.loadDataAsync().then(assets => {
                this.loadPricesAsync(assets).then(() => {
                    this.loading = false;
                })
            }).catch(() => {
                this.error = true;
            }).then(() => {                
                this.loading = false;
            });
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
            
            .assets-section {
                display: none;
            }
        }
    }
</style>
