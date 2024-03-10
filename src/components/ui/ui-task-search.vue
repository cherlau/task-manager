<template>
    <div class="task-search-content">
        <input type="text" v-model="search" @input="handleSearchChange" placeholder="Buscar Tarefas" />
        <i class="fa-solid fa-magnifying-glass"></i>
    </div>
</template>

<script>
import { ref, defineComponent } from "vue";

export default defineComponent({
    name: "UiTaskSearch",
    props: {
        onSearchChange: Function,
    },
    setup(props) {
        const search = ref("");

        const handleSearchChange = () => {
            props.onSearchChange(search.value);
        };

        return {
            search,
            handleSearchChange,
        };
    },
});
</script>

<style lang="stylus" scoped>
    @import '../../assets/stylus/styles.styl';
</style> 