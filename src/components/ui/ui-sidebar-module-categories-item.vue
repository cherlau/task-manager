<template>
    <div class="sidebar-categorie-item-content">
        <button @click="selectCategorie(categorieName); toggleCategories()" :class="{ 'highlighted': isHighlighted }">
            <i class="fa-solid fa-chevron-right"></i>
            {{ categorie.name }} <div class="categorie-item-count" v-show="tipoCount[categorieName] > 0">{{
            tipoCount[categorieName] }}</div></button>
    </div>
</template>

<script>
import { useTasks } from '@/stores/tasks'
import { ref, watch } from 'vue'

export default {
    name: 'UiSidebarModuleCategoriesItem',
    props: {
        categorie: Object,
        categorieName: String,
        isHighlighted: Boolean,
    },
    methods: {
        toggleCategories() {
            this.$emit('categorieClick', this.categorieName)
        }
    },
    setup() {
        const store = useTasks();
        const tipoCount = ref(store.taskCountsByType())

        watch(() => store.taskCountsByType(), (newValue) => {
            tipoCount.value = newValue
        })

        function selectCategorie(categorie) {
            store.categorie = categorie
        }

        return {
            selectCategorie, tipoCount
        }
    }
}
</script>

<style scoped>
.sidebar-categorie-item-content:nth-child(3) div {
    background-color: #ff2e79;
}

.sidebar-categorie-item-content:nth-child(4) div {
    background-color: #ffc42e;
}

.sidebar-categorie-item-content:nth-child(5) div {
    background-color: #abc5d4;
}

.sidebar-categorie-item-content .highlighted {
    color: #2693ff;
}

.highlighted i {
    color: #2693ff;
}

button {
    background-color: #ffffff00;
    font-size: 14px;
    font-weight: 700;
    padding: 12px 0;
    color: #283848;
    display: flex;
    align-items: center;
}

i {
    font-size: 10px;
    padding-right: 7px;
}

.categorie-item-count {
    font-size: 11px;
    color: #fff;
    width: 20px;
    height: 20px;
    border-radius: 50%;
    display: flex;
    margin-left: 7px;
    align-items: center;
    justify-content: center;
}
</style>