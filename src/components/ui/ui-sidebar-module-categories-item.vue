<template>
    <div class="sidebar-categorie-item-content">
        <ui-button @click-button="selectCategorie(categorieName); toggleCategories()" class="categories-item-btn" leftIcon="fa-solid fa-chevron-right" :design="buttonDesign.value">
            {{ categorie.name }}
            <span class="categorie-item-count" v-show="tipoCount[categorieName] > 0">{{ tipoCount[categorieName] }}</span>
        </ui-button>
    </div>
</template>

<script>
import UiButton from '@/components/ui/ui-button'
import { useTasks } from '@/store/tasks'
import { computed, ref, watch } from 'vue'

export default {
    name: 'UiSidebarModuleCategoriesItem',
    components: {
        UiButton
    },
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
    setup(props) {
        const store = useTasks();
        const tipoCount = ref(store.taskCountsByType());

        const buttonDesign = ref('')

        buttonDesign.value = computed(() => {
            if(props.isHighlighted) return 'highlighted'
            return ''
        })

        watch(() => store.taskCountsByType(), (newValue) => {
            tipoCount.value = newValue;
        });

        function selectCategorie(categorie) {
            store.categorie = categorie;
        }

        return {
            selectCategorie,
            tipoCount,
            buttonDesign
        };
    }
}
</script>

<style lang="stylus" scoped>
    @import '../../assets/stylus/styles.styl';
</style> 