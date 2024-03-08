<template>
    <div class="view-container">
        <div style="width: 333px"></div>
        <div class="view-content">
            <div class="view-content-text">
                <h1>Minhas Tarefas</h1>
                <p>
                    Olá <strong>{{ user.name }}</strong><span v-if="unfinishedTasks > 0">, você tem
                        <strong style="text-decoration: underline">{{ unfinishedTasks }} tarefas</strong>
                        pendentes</span>
                </p>
            </div>
            <!-- <task-search :onSearchChange="handleSearchChange"></task-search>
            <task-icon-add v-if="showModalForm" :onCreateTask="handleCriarTask"
                @close-modal-add="showModalForm = !showModalForm"></task-icon-add>
            <task-list :filteredTasks="currentFilteredTasks" :search="search"></task-list> -->
            <button @click="showModalForm = !showModalForm" class="btn-add-icon">
                +
            </button>
            <!--  -->
        </div>
    </div>
</template>

<script>
// import TaskList from "@/components/layouts/tasks_content/TaskList";
// import TaskIconAdd from "@/components/layouts/tasks_content/TaskIconAdd";
// import TaskSearch from "@/components/layouts/tasks_content/TaskSearch";

import { useTasks } from "@/stores/tasks";
import { ref, watch, computed, onBeforeMount } from "vue";

export default {
    name: "ViewDashboard",
    components: {
        // TaskList,
        // TaskIconAdd,
        // TaskSearch,
    },
    setup() {
        const store = useTasks();
        const search = ref("");
        const taskList = ref([]);
        const showModalForm = ref(false);
        const unfinishedTasks = ref(0);
        const user = store.user;

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
            showModalForm.value = false;
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
                case "all":
                    return filteredTasks.value;
                case "urgent":
                    return filteredTasksUrgents.value;
                case "important":
                    return filteredTasksImportants.value;
                case "others":
                    return filteredTasksOthers.value;
                case "finished":
                    return filteredTasksFinished.value;
                default:
                    return filteredTasks.value;
            }
        });

        return {
            search,
            handleCriarTask,
            handleSearchChange,
            filteredTasksUrgents,
            currentFilteredTasks,
            showModalForm,
            unfinishedTasks,
            user,
        };
    },
};
</script>

<style scoped>
.view-container {
    margin-top: 185px;
    display: flex;
    justify-content: center;
    width: 100vw;
}

.view-content {
    display: flex;
    flex-direction: column;
    flex-grow: 1;
    max-width: 630px;
}

.view-content-text {
    margin-bottom: 35px;
}

.btn-add-icon {
    display: flex;
    justify-content: center;
    align-items: center;
    position: fixed;
    bottom: 23px;
    right: 28px;
    background-color: #1ad18f;
    border: none;
    color: #fff;
    font-size: 50px;
    width: 76px;
    height: 76px;
    border-radius: 50%;
    box-shadow: 4px 4px 4px rgba(0, 0, 0, 0.1);
}

p {
    font-weight: 600;
    color: #77899e;
    font-size: 1.1rem;
}

strong {
    color: #2693ff;
}
</style>