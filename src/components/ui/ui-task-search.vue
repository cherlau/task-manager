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

<style scoped>
.task-search-content {
    position: relative;
}

.task-search-content input {
    box-sizing: border-box;
    width: 100%;
    padding: 18px 0 18px 18px;
    margin-bottom: 30px;
}

input::placeholder {
    color: #a6c1d2;
    font-size: 17px;
}

.fa-solid {
    position: absolute;
    right: 10px;
    top: 15px;
    font-size: 27px;
    color: #bfdaeb;
}
</style>