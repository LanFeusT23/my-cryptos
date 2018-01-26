<template>
    <v-text-field
        v-if="editing"
        :name="'input-coin-' + label"
        :label="label"
        v-model="localValue"
        :rules="[rules.required, rules.number]"
        single-line
        type="number">
    </v-text-field>
    <span v-else>
        {{ valueBound }}
    </span>
</template>

<script>
    export default {
        name: 'AssetInput',
        props: {
            editing: {
                type: Boolean,
                required: true
            },
            valueBound: {
                type: Number,
                required: true
            },
            assetId: {
                type: String,
                required: true
            },
            label: {
                type: String,
                required: true
            }
        },
        data() {
            return {
                rules: {
                    required: (value) => !!value || 'Required.',
                    number: (value) => {
                        if (!value) return 'Not a number.';
                        if (isNaN(value)) return 'Not a number.';

                        return true;
                    }
                }
            }
        },
        computed: {
            localValue: {
                get() {
                    return this.valueBound
                },
                set(value) {
                    this.$emit('update:valueBound', +value)
                }
            }
        },
        methods: {
            updateValue(value) {
                this.$emit('update:valueBound', +value)
            }
        }
    }
</script>

<style lang="scss">
    input {
        width: 100%;
    }
</style>
