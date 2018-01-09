<template>
    <div id="total-assets-wrapper">
        <div>Total Assets: $XXXX</div>
        <div>Total Costs: $XXXX</div>
        <div>Total Profit: $XXXX</div>
        <button @click="logout">Logout</button>
    </div>
</template>

<script>

export default {
    name: 'TotalAssets',
    dependencies: ['authHelpers'],
    methods: {
        logout() {
            this.authHelpers.logout()
        }
    }
}
</script>

<style lang='scss'>
    #total-assets-wrapper {
        margin-bottom: 1rem;
    }
</style>
