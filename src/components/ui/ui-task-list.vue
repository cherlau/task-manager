<template>
    <div>
        <ui-task-list-item v-for="(task, key) in filteredTasks" :key="key" :task="task"
            @update-task="updateTaskStatus"></ui-task-list-item>
    </div>
</template>

<script>
import { useTasks } from "@/store/tasks";
import UiTaskListItem from "@/components/ui/ui-task-list-item.vue";

export default {
    name: "UiTaskList",
    props: {
        filteredTasks: Array
    },
    components: {
        UiTaskListItem,
    },
    setup() {
        const store = useTasks();

        function updateTaskStatus(taskId) {
            const taskIndex = store.tasks.find((task) => task.id === taskId);

            taskIndex.finished = !taskIndex.finished;
        }

        return { updateTaskStatus };
    },
};
</script>