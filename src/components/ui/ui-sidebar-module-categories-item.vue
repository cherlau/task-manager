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

<style scoped>
.sidebar-categorie-item-content:nth-child(3) span {
    background-color: #ff2e79;
}

.sidebar-categorie-item-content:nth-child(4) span {
    background-color: #ffc42e;
}

.sidebar-categorie-item-content:nth-child(5) span {
    background-color: #abc5d4;
}

.sidebar-categorie-item-content .highlighted button {
    color: #2693ff ;
}

.categories-item-btn {
    background-color: #ffffff00;
    font-size: 14px;
    font-weight: 700;
    padding: 12px 0;
    color: #283848;
    display: flex;
    align-items: center;
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
