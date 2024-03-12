<template>
    <div class="task-item-content" :class="{ 'task-checked-content': finishedCheck }">
      <div class="task-item" :class="{ 'task-item-bottom-line': showEditTask || showDescription }">
        <div :class="{ 'task-checked-text': finishedCheck }">

          <ui-checkbox  
            :label="task.title" 
            v-model="finishedCheck" 
            design="custom-checkbox"
            @click-title="showDescription = !showDescription"
          />

          <span v-if="translateTipo()" class="task-item-tipo" :class="{'urgente-background': translateTipo() === 'Urgente', 'importante-background': translateTipo() === 'Importante'}">{{ translateTipo() }}</span>
        </div>

        <ui-kebab-menu 
            @start-task-edit="startTaskEdit" 
            @remove-task="removeTask" 
            :task-id="task.id" 
            :show-edit-task="showEditTask" 
            :show-remove-confirm="showRemoveConfirm"
            :showMenu="showMenu"
            @click-icon="handleKebabMenu"
        ></ui-kebab-menu>
      </div> 

      <ui-task-edit 
        :showEditTask="showEditTask" 
        @task-edited="handleTaskEdited" 
        @cancel-edit="showEditTask = !showEditTask"
        :task="task" 
        :taskId="task.id"
      ></ui-task-edit>
      
      <div class="task-item-description" v-if="showDescription"> {{ task.description }} </div>

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
import UiKebabMenu from "@/components/ui/ui-kebab-menu"
import { ref, watch } from "vue";
import { useTasks } from "@/store/tasks";

export default {
    name: "UiTaskListItem",
    props: {
        task: Object,
    },
    components: {
        UiTaskRemoveCard,
        UiTaskEdit,
        UiModal,
        UiCheckbox,
        UiKebabMenu
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

        watch(() => props.task.finished, (newValue) => {
            finishedCheck.value = newValue
        })

        const toggleModal = () => {
            showRemoveConfirm.value = !showRemoveConfirm.value
            modalActive.value = !modalActive.value;
        };

        const removeTask = (taskId) => {
            console.log(taskId)
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

        const handleKebabMenu = () => {
          showMenu.value = !showMenu.value
        }

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
            toggleModal,
            handleKebabMenu
        };
    },
};
</script>

<style lang="stylus" scoped>
    @import '../../assets/stylus/styles.styl';
</style> 