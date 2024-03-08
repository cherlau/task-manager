<template>
    <div>
        <div class="sidebar-component">
            <div class="img-content"><img src="../../assets/imgs/facilita-logo.png" alt=""></div>
            <div class="sidebar-component-container">
                <div class="sidebar-module-content">
                    <ui-sidebar-modules v-for="(module, key) in modules" :key="key" :module="module" :moduleName="key"
                        :isHighlighted="highlightedModule === key"
                        @moduleClick="handleModuleClick"></ui-sidebar-modules>
                </div>
            </div>
        </div>
        <ui-sidebar-module-categories :categories="categoriesList"></ui-sidebar-module-categories>
    </div>
</template>

<script>
import UiSidebarModules from '@/components/ui/ui-sidebar-modules'
import UiSidebarModuleCategories from '@/components/ui/ui-sidebar-module-categories'
import { ref } from 'vue'

export default {
    name: 'UiSidebar',
    components: {
        UiSidebarModules,
        UiSidebarModuleCategories
    },
    setup() {
        const modules = {
            dashboard: {
                name: "Dashboard",
                icon: '<i class="fa-solid fa-chart-simple" style="font-size: 35px; color: #fff"></i>',
                categories: {
                    all: {
                        name: "Todas",
                        tasks: [],
                    },
                    urgent: {
                        name: "Urgentes",
                        tasks: [],
                    },
                    important: {
                        name: "Importantes",
                        tasks: [],
                    },
                    others: {
                        name: "Outras",
                        tasks: [],
                    },
                    finished: {
                        name: "Finalizadas",
                        tasks: [],
                    },
                },
            },
            tasks: {
                name: "Tarefas",
                icon: '<i class="fa-solid fa-check" style="font-size: 35px; color: #fff"></i>',
                categories: {},
            },
            settings: {
                name: "Configurações",
                icon: '<i class="fa-solid fa-gears" style="font-size: 35px; color: #fff"></i>',
                categories: {},
            },
        };

        const categoriesList = ref(modules.dashboard.categories)
        const highlightedModule = ref('dashboard')

        const handleModuleClick = (categories, moduleName) => {
            categoriesList.value = categories
            highlightedModule.value = moduleName
        };

        return { modules, handleModuleClick, categoriesList, highlightedModule }
    }
}
</script>


<style scoped>
.sidebar-component {
    background-color: #2693ff;
    height: 100vh;
    width: 106px;
}

.img-content {
    width: 75px;
    margin: 7px auto auto;
}

.img-content img {
    width: 100%;
}

.sidebar-component-container {
    height: calc(100% - 180px);
    display: flex;
    flex-direction: column;
    justify-content: center;
}

.sidebar-module-content {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
}
</style>