<template>
    <div v-if="showEditTask" class="task-edit-content">
   
        <ui-input 
          id="titulo"
          label="Titulo:"
          design="sm"
          :value="editTitle"
          v-model="editTitle"
        ></ui-input>

        <ui-textarea 
          id="descrição"
          label="Descrição:"
          label-color="#5a7186"
          height="100px"
          :value="editDescription"
          v-model="editDescription"
        ></ui-textarea>

        <div class="task-edit-radios">
            <ui-radio :options="optionsRadio" v-model="editTipo"></ui-radio>
        </div>
        <div class="task-edit-buttons">
            <ui-button design="sucess xs" @click-button="finishEdit(taskId)">Salvar</ui-button>
            <ui-button design="danger xs" @click-button="cancelEdit">Cancelar</ui-button>
        </div>
    </div>
</template>

<script>
import UiInput from '@/components/ui/ui-input'
import uiTextarea from '@/components/ui/ui-textarea';
import UiRadio from '@/components/ui/ui-radio'
import UiButton from '@/components/ui/ui-button'
import { ref } from "vue";

export default {
    name: "UiTaskEdit",
    components:{
        UiInput,
        uiTextarea,
        UiRadio,
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

                if (this.editTipo === 'Urgente') this.editTipo = 'urgent'
                if (this.editTipo === 'Importante') this.editTipo = 'important'
                if (this.editTipo === 'Outras') this.editTipo = 'others'

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
        const optionsRadio = ref(['Urgente', 'Importante', 'Outras'])


        return { editTitle, editDescription, editTipo, optionsRadio };
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

.task-edit-radios{
    display: flex;
}

.task-edit-buttons{
    display: flex;
    gap: 10px;
}

</style>