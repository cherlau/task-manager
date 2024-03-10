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


<style scoped>
.categories-content {
    display: flex;
    flex-direction: column;
    justify-content: center;
    background-color: #f4fbff;
    height: 100vh;
    width: 185px;
    box-shadow: 2px 0px 4px rgba(0, 0, 0, 0.1);
    padding-left: 42px;
}

.categories-content-title {
    margin-bottom: 62px;
    font-size: 17px;
}
</style>