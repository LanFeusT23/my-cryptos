<template>
    <a class="icon" :class='cssClass' :href='chartsUrl' target='_blank'></a>
</template>

<script>
    import format from 'string-format'
    const CHARTS_URL = 'https://www.cryptocompare.com/coins/{0}/overview/{1}';

    export default {
        name: 'IconLink',
        props: {
            assetName: {
                type: String,
                default: 'crypto'                
            }
        },
        computed: {
            cssClass() {
                return `icon-asset-${this.assetName.toLowerCase()}`;
            },
            chartsUrl() {
                return format(CHARTS_URL, this.assetName.toLowerCase(), 'usd')
            }
        }
    }
</script>

<style lang='scss' scoped>
                
    .icon {
        background-size: 46px;
        background-position: center;
        background-repeat: no-repeat;
    }

</style>
