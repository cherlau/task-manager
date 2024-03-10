<template>
    <div class="view-container">
        <div class="view-placeholder"></div>
        <div class="view-content">
            <div class="view-content-text">
                <h1>Minhas Tarefas</h1>
                <p>Olá <strong>{{ user.name }}</strong><span v-if="unfinishedTasks > 0">, você tem <strong style="text-decoration: underline">{{ unfinishedTasks }} tarefas</strong> pendentes</span></p>
            </div>

            <ui-task-search :onSearchChange="handleSearchChange"></ui-task-search>
            <ui-task-list :filteredTasks="currentFilteredTasks" :search="search"></ui-task-list>

            <ui-modal @close="toggleModal" :modalActive="modalActive">
                <ui-task-form-add :onCreateTask="handleCriarTask"></ui-task-form-add>
            </ui-modal>
            <ui-button
                design="btn-add-icon sucess"
                @click-button="toggleModal()"
            >
                <svg width="24" height="25" viewBox="0 0 24 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M23.5 11.0469H13.5V1.35938C13.5 1.09176 13.2762 0.875 13 0.875H11C10.7238 0.875 10.5 1.09176 10.5 1.35938V11.0469H0.5C0.22375 11.0469 0 11.2636 0 11.5312V13.4688C0 13.7364 0.22375 13.9531 0.5 13.9531H10.5V23.6406C10.5 23.9082 10.7238 24.125 11 24.125H13C13.2762 24.125 13.5 23.9082 13.5 23.6406V13.9531H23.5C23.7763 13.9531 24 13.7364 24 13.4688V11.5312C24 11.2636 23.7763 11.0469 23.5 11.0469Z" fill="white"/>
                </svg>
            </ui-button>
        </div>
    </div>
</template>

<script>
import UiTaskList from "@/components/ui/ui-task-list";
import UiTaskFormAdd from "@/components/ui/ui-task-form-add";
import UiTaskSearch from "@/components/ui/ui-task-search";
import UiButton from "@/components/ui/ui-button"
import UiModal from "@/components/ui/ui-modal"

import { useTasks } from "@/store/tasks";
import { ref, watch, computed, onBeforeMount } from "vue";

export default {
    name: "ViewDashboard",
    components: {
        UiTaskList,
        UiTaskFormAdd,
        UiTaskSearch,
        UiButton,
        UiModal
    },
    setup() {
        const store = useTasks();
        const search = ref("");
        const taskList = ref([]);
        const unfinishedTasks = ref(0);
        const user = store.user;
        const modalActive = ref(false)

        const toggleModal = () => {
          modalActive.value = !modalActive.value;
        };

        onBeforeMount(() => {
            store.loadTasksFromLocalStorage();
        });

        watch(
            () => store.countUnfinishedTasks(),
            (newValue) => {
                unfinishedTasks.value = newValue;
            }
        );

        const handleCriarTask = (obj) => {
            store.createTask(obj);
            modalActive.value = false;
        };

        const handleSearchChange = (value) => {
            search.value = value;
        };

        watch(
            () => store.tasksOrdered,
            (newTasks) => {
                taskList.value = newTasks;
            }
        );

        const filteredTasks = computed(() => {
            const searchTerm = search.value.toLowerCase();
            return taskList.value.filter(
                (task) =>
                    task.title.toLowerCase().includes(searchTerm) ||
                    task.description.toLowerCase().includes(searchTerm)
            );
        });

        const filteredTasksUrgents = computed(() => {
            const searchTerm = search.value.toLowerCase();
            return taskList.value.filter(
                (task) =>
                    (task.title.toLowerCase().includes(searchTerm) ||
                        task.description.toLowerCase().includes(searchTerm)) &&
                    task.tipo.includes("urgent")
            );
        });

        const filteredTasksImportants = computed(() => {
            const searchTerm = search.value.toLowerCase();
            return taskList.value.filter(
                (task) =>
                    (task.title.toLowerCase().includes(searchTerm) ||
                        task.description.toLowerCase().includes(searchTerm)) &&
                    task.tipo.includes("important")
            );
        });

        const filteredTasksOthers = computed(() => {
            const searchTerm = search.value.toLowerCase();
            return taskList.value.filter(
                (task) =>
                    (task.title.toLowerCase().includes(searchTerm) ||
                        task.description.toLowerCase().includes(searchTerm)) &&
                    task.tipo.includes("others")
            );
        });

        const filteredTasksFinished = computed(() => {
            const searchTerm = search.value.toLowerCase();
            return taskList.value.filter(
                (task) =>
                    (task.title.toLowerCase().includes(searchTerm) ||
                        task.description.toLowerCase().includes(searchTerm)) &&
                    task.finished === true
            );
        });

        const taskType = ref(store.categorie);

        watch(
            () => store.categorie,
            (categori) => {
                taskType.value = categori;
            }
        );

        const currentFilteredTasks = computed(() => {
            switch (taskType.value) {
                case "all":       return filteredTasks.value;
                case "urgent":    return filteredTasksUrgents.value;
                case "important": return filteredTasksImportants.value;
                case "others":    return filteredTasksOthers.value;
                case "finished":  return filteredTasksFinished.value;
                default:          return filteredTasks.value;
            }
        });

        return {
            search,
            handleCriarTask,
            handleSearchChange,
            filteredTasksUrgents,
            currentFilteredTasks,
            unfinishedTasks,
            user,
            modalActive,
            toggleModal
        };
    },
};
</script>

<style lang="stylus" scoped>
  @import '../assets/stylus/style.styl'; 
</style>