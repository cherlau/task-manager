<template>
    <div class="modal-add">
        <h2>Cadastrar Tarefa</h2>

        <ui-input 
            id="titulo"
            label="Titulo:"
            design="lg"
            :value="title"
            v-model="title"
            ></ui-input>

        <ui-textarea 
            id="descrição"
            label="Descrição:"
            label-color="#5a7186" 
            height="179px"
            :value="description"
            v-model="description"
            ></ui-textarea>

        <div class="modal-add-bottom">
            <ui-radio :options="options" v-model="tipo"></ui-radio>
            <ui-button @click-button="criarTask" design="sucess lg">Adicionar</ui-button>
        </div>
    </div>
</template>

<script>
import UiInput from '@/components/ui/ui-input'
import UiTextarea from '@/components/ui/ui-textarea'
import UiButton from '@/components/ui/ui-button'
import UiRadio from '@/components/ui/ui-radio.vue'
import { ref } from "vue";


export default {
    name: "UiTaskIconAdd",
    components:{
        UiButton,
        UiInput,
        UiTextarea,
        UiRadio
    },
    props: {
        onCreateTask: Function,
    },
    methods: {
        closeModal() {
            this.$emit("close-modal-add");
        },
    },
    setup(props) {
        const title = ref("");
        const description = ref("");
        const tipo = ref("others");
        const options = ref(['Urgente', 'Importante'])

        const criarTask = () => {
            if (title.value !== "" && description.value !== "") {

                if(tipo.value === 'Urgente')    tipo.value = 'urgent'
                if(tipo.value === 'Importante') tipo.value = 'important'

                const task = {
                    title: title.value,
                    description: description.value,
                    tipo: tipo.value,
                };

                title.value = "";
                description.value = "";
                tipo.value = "others";

                props.onCreateTask(task);
            }
        };

        return { title, description, tipo, criarTask, options };
    },
};
</script>

<style scoped>

.modal-add {
    display: flex;
    flex-direction: column;
    box-sizing: border-box;
    min-width: 660px;
    padding: 20px 40px;
    border-radius: 7px;
    gap: 10px;
    background-color: white;
    border: none;
}

h2 {
    margin: 9px 0 25px;
}

label {
    font-size: 14px;
    color: #64788b;
}

input {
    padding: 13px;
}

textarea {
    width: 560px;
    height: 180px;
    resize: none;
    overflow: auto;
    padding: 13px;
}

.modal-add-bottom {
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.modal-add-radios label {
    margin: 0 10px 0 7px;
}

</style>