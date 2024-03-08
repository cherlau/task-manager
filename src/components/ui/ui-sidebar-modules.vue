<template>
    <div class="sidebar-module-item" :class="{ 'highlighted': isHighlighted }" @click="toggleCategories">
        <span v-html="module.icon"></span>
        <h3>{{ module.name }}</h3>
        {{ isHighlighted }}
    </div>
</template>

<script>
export default {
    name: 'UiSidebarModules',
    props: {
        module: Object,
        moduleName: String,
        isHighlighted: Boolean,
    },
    methods: {
        toggleCategories() {
            this.$emit('clickChangeView', this.module.categories, this.moduleName)
            this.$emit('clickChangeHighlight', this.moduleName);
        }
    },
}
</script>

<style scoped>
h3 {
    color: #fff;
    font-size: 12px;
    margin-top: 8px;
}

.sidebar-module-item {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 19px 0;
    border-top: 1px solid rgba(255, 255, 255, 0.219);
    width: 100%;
    cursor: pointer;
}

div:last-of-type {
    border-bottom: 1px solid rgba(255, 255, 255, 0.219);
}

.highlighted {
    background-color: #1182f2;
    /* Adicione a cor que você deseja para destacar */
}
</style>