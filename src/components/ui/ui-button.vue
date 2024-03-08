<template>
    <div>
        <button>
            <slot></slot>
        </button>
    </div>
</template>

<script>

export default {
    name: 'ui-button',
    methods: {
        // callback: function (e) {
        //     this.$emit('click', e);
        // }
    }
}

</script>