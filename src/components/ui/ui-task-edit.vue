<template>
    <div v-if="showEditTask" class="task-edit-content">
        <div class="flex-column">
            <ui-input 
            id="titulo"
            label="Titulo:"
            design="sm"
            :value="editTitle"
            v-model="editTitle"
            ></ui-input>

        </div>
        <div class="flex-column">
            <label for="">Descricao:</label>
            <textarea type="text" v-model="editDescription"></textarea>
        </div>
        <div class="task-edit-radios">
            <input type="radio" name="editUrgent" id="editUrgent" value="urgent" v-model="editTipo" />
            <label for="editUrgent">Urgente</label>
            <input type="radio" name="editImportant" id="editImportant" value="important" v-model="editTipo" />
            <label for="editImportant">Importante</label>
            <input type="radio" name="editOthers" id="editOthers" value="others" v-model="editTipo" />
            <label for="editOthers">Outras</label>
        </div>
        <div class="task-edit-buttons">
            <ui-button design="sucess xs" @click-button="finishEdit(taskId)">Salvar</ui-button>
            <ui-button design="danger xs" @click-button="cancelEdit">Cancelar</ui-button>
        </div>
    </div>
</template>

<script>
import UiInput from '@/components/ui/ui-input'
import UiButton from '@/components/ui/ui-button'
import { ref } from "vue";

export default {
    name: "UiTaskEdit",
    components:{
        UiInput,
        UiButton
    },
    props: {
        showEditTask: Boolean,
        taskId: Number,
        task: Object,
    },
    methods: {
        finishEdit(taskId) {
            if (this.editTitle !== "") {
                this.$emit("task-edited", {
                    taskId: taskId,
                    editTitle: this.editTitle,
                    editDescription: this.editDescription,
                    editTipo: this.editTipo,
                    finished: this.task.finished
                });

                this.editTitle = "";
                this.editDescription = "";
                this.editTipo = "others";
            }
        },
        cancelEdit() {
            this.$emit("cancel-edit");
        },
    },
    setup(props) {
        const editTitle = ref(props.task.title);
        const editDescription = ref(props.task.description);
        const editTipo = ref(props.task.tipo);


        return { editTitle, editDescription, editTipo };
    },
};
</script>

<style scoped>
.task-edit-content {
    display: flex;
    flex-direction: column;
    padding: 20px 15px 10px 20px;
    gap: 10px;
}

input {
    padding: 8px;
}

textarea {
    max-width: 560px;
    max-width: 560px;
    min-height: 80px;
    padding: 8px;
}

label {
    font-size: 14px;
    color: #64788b;
}

.task-edit-radios label {
    margin: 0 10px 0 4px;
}

.task-edit-buttons{
    display: flex;
    gap: 10px;
}

</style>