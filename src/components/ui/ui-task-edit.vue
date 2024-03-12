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
import { ref, watch } from "vue";

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
            if (this.editTitle !== "" && this.editDescription !== "") {

                if (this.editTipo === 'urgente') this.editTipo = 'urgent'
                if (this.editTipo === 'importante') this.editTipo = 'important'
                if (this.editTipo === 'outras') this.editTipo = 'others'

                this.$emit("task-edited", {
                    taskId: taskId,
                    editTitle: this.editTitle,
                    editDescription: this.editDescription,
                    editTipo: this.editTipo,
                    finished: this.task.finished
                });
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
        const optionsRadio = ref(['urgente', 'importante', 'outras'])

        watch(() => props.task.title, (newValue) => {
            editTitle.value = newValue
        })

        watch(() => props.task.description, (newValue) => {
            editDescription.value = newValue
        })

        watch(() => props.task.tipo, (newValue) => {
            editTipo.value = newValue
        })

        return { editTitle, editDescription, editTipo, optionsRadio };
    },
};
</script>

<style lang="stylus" scoped>
    @import '../../assets/stylus/styles.styl';
</style> 
