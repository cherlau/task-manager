<template>
    <div class="categories-container">
        <div class="categories-content">
            <h4 class="categories-content-title">Categorias</h4>
            <ui-sidebar-module-categories-item v-for="(categorie, key) in categories" :key="key" :categorie="categorie"
                :categorie-name="key" :isHighlighted="highlightedModule === key"
                @categorieClick="handleModuleClick"></ui-sidebar-module-categories-item>
        </div>
    </div>
</template>

<script>

import UiSidebarModuleCategoriesItem from '@/components/ui/ui-sidebar-module-categories-item.vue'
import { ref } from 'vue'

export default {
    name: 'UiSidebarModuleCategories',
    components: {
        UiSidebarModuleCategoriesItem
    },
    props: {
        categories: Object,
    },
    setup() {
        const highlightedModule = ref('all')

        const handleModuleClick = (categorie) => {
            highlightedModule.value = categorie
        };
        return { handleModuleClick, highlightedModule }
    }
}
</script>

<style lang="stylus" scoped>
    @import '../../assets/stylus/styles.styl';
</style> 
