<template>
    <div class="task-item-content" :class="{ 'task-checked-content': finishedCheck }">
      <div class="task-item" :class="{ 'task-item-bottom-line': showEditTask || showDescription }">
        <div :class="{ 'task-checked-text': finishedCheck }">

          <ui-checkbox  :label="task.title" v-model="finishedCheck" design="custom-checkbox" @click-title="showDescription = !showDescription"/>

          <span v-if="translateTipo()" class="task-item-tipo" :class="{'urgente-background': translateTipo() === 'Urgente', 'importante-background': translateTipo() === 'Importante'}">{{ translateTipo() }}</span>
        </div>

          <div v-if="showMenu" class="task-item-menu">
            <button @click="startTaskEdit" :class="{ 'task-item-menu-clicked': showEditTask }">
              <span></span>Editar
            </button>
            <button @click="removeTask(task.id)" :class="{ 'task-item-menu-clicked': showRemoveConfirm }">
              <span></span>Excluir
            </button>
          </div>


            <i @click="showMenu = !showMenu" class="fa-solid fa-ellipsis-vertical"
              :class="{ 'task-item-menu-clicked-icon': showMenu }"></i>
      </div>
            <div class="task-item-description" v-if="showDescription">
              {{ task.description }}
            </div>
            <ui-task-edit :showEditTask="showEditTask" @task-edited="handleTaskEdited" @cancel-edit="showEditTask = !showEditTask"
              :task="task" :taskId="task.id"></ui-task-edit>

            <ui-modal @close="toggleModal" :modalActive="modalActive">
                <ui-task-remove-card @confirm-remove="confirmRemoveTask" @cancel-remove="toggleModal"></ui-task-remove-card>
            </ui-modal>
    </div>
</template>

<script>
import UiTaskRemoveCard from "@/components/ui/ui-task-remove-card"
import UiTaskEdit from "@/components/ui/ui-task-edit"
import UiModal from "@/components/ui/ui-modal"
import UiCheckbox from "@/components/ui/ui-checkbox"
import { ref, watch } from "vue";
import { useTasks } from "@/stores/tasks";

export default {
    name: "UiTaskListItem",
    props: {
        task: Object,
    },
    components: {
        UiTaskRemoveCard,
        UiTaskEdit,
        UiModal,
        UiCheckbox
    },
    setup(props) {
        const store = useTasks();
        const taskIdToRemove = ref(null);
        const showRemoveConfirm = ref(false)
        const showEditTask = ref(false);
        const showDescription = ref(false);
        const showMenu = ref(false);
        const finishedCheck = ref(props.task.finished);
        const modalActive = ref(false)

        const toggleModal = () => {
            showRemoveConfirm.value = !showRemoveConfirm.value
            modalActive.value = !modalActive.value;
        };

        const removeTask = (taskId) => {
            showRemoveConfirm.value = true
            modalActive.value = true;
            taskIdToRemove.value = taskId;
        };


        const confirmRemoveTask = () => {
            showRemoveConfirm.value = false
            store.removerTask(taskIdToRemove.value);
            modalActive.value = false;
            taskIdToRemove.value = null;
            showMenu.value = false;
        };

        const updateFinishedStatus = () => {
            const taskToUpdate = store.tasks.find(
                (task) => task.id === props.task.id
            );
            if (taskToUpdate) {
                taskToUpdate.finished = finishedCheck.value;
                store.saveTasksToLocalStorage();
                store.orderTasks();
            }
        };

        watch(
            () => finishedCheck.value,
            () => {
                updateFinishedStatus();
            }
        );

        function startTaskEdit() {
            showEditTask.value = !showEditTask.value;
        }

        function handleTaskEdited(taskEdited) {
          store.editTask(
            taskEdited.taskId,
            taskEdited.editTitle,
            taskEdited.editDescription,
            taskEdited.editTipo,
            taskEdited.finished
          );
          showEditTask.value = false;
          showMenu.value = false;
        }

        function translateTipo() {
          switch (props.task.tipo) {
            case "important":
              return "Importante";
            case "urgent":
              return "Urgente";
            default:
              return false;
          }
        }

        const handleCheckboxChange = (isChecked) => {
          console.log(isChecked)
          finishedCheck.value = isChecked;
          updateFinishedStatus();
        };

        return {
            handleCheckboxChange,
            removeTask,
            confirmRemoveTask,
            showRemoveConfirm,
            showEditTask,
            startTaskEdit,
            handleTaskEdited,
            showDescription,
            finishedCheck,
            showMenu,
            translateTipo,
            modalActive,
            toggleModal
        };
    },
};
</script>

<style scoped>
button{
    border: none;
}

.task-item-content {
    padding: 14px;
    background-color: #fff;
    border-radius: 5px;
    margin-bottom: 7px;
    box-shadow: 0 0 1px rgba(0, 0, 0, 0.1);
}

.task-item {
    display: flex;
    justify-content: space-between;
    align-items: center;
    position: relative;
}

label {
    font-size: 17px;
    cursor: pointer;
}

.task-checked-content {
    background-color: #F4FAFD;
}

.fa-ellipsis-vertical {
    font-size: 20px;
    color: #9caec1;
    cursor: pointer;
    z-index: 1;
}

.task-item-menu {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: flex-start;
    position: absolute;
    right: -7px;
    top: -1px;
    box-shadow: 0 0 5px rgba(0, 0, 0, 0.1);
    height: 74px;
    width: 109px;
    background-color: #fff;
    border-radius: 5px;
    gap: 10px;
}

.task-item-menu button {
    background-color: transparent;
    color: #7189a0;
}

.task-item-menu span {
    display: inline-block;
    background-color: #d6e6ef;
    width: 9px;
    height: 9px;
    border-radius: 50%;
    margin: 0 6px 0 9px;
}

.task-item-menu-clicked {
    color: #395068 !important;
}

.task-item-menu-clicked span {
    background-color: #1ad18f;
}

.task-item-menu-clicked-icon {
    color: #2693ff;
}

.task-item-tipo {
    background-color: #7189a0;
    font-weight: 600;
    color: #fff;
    padding: 5px 10px;
    border-radius: 15px;
    font-size: 14px;
    position: absolute;
    top: 4px;
    right: 25px;
}

.task-item-description {
    padding: 15px 15px 0 15px;
    font-size: 15px;
    font-weight: 600;
}

.urgente-background {
    background-color: #f491ba;
}

.importante-background {
    background-color: #ffc42e;
}

.task-item-bottom-line {
    border-bottom: 1px solid #d6e6ef;

    padding-bottom: 14px;
}
</style>