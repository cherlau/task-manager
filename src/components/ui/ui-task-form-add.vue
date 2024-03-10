<template>
    <div>
    <div class="modal-add">
        <h2>Cadastrar Tarefa</h2>

        <ui-input 
            id="titulo"
            label="Titulo:"
            label-color="#5a7186" 
            input-height="46px" 
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
            <div class="modal-add-radios">
                
                <input type="radio" name="urgent" id="urgent" value="urgent" v-model="tipo" />
                <label for="urgent">Urgente</label>
                <input type="radio" name="important" id="important" value="important" v-model="tipo" />
                <label for="important">Importante</label>
            </div>
            <ui-button @click-button="criarTask" design="sucess lg">Adicionar</ui-button>
        </div>
    </div>
</div>
</template>

<script>
import UiInput from '@/components/ui/ui-input'
import UiTextarea from '@/components/ui/ui-textarea'
import UiButton from '@/components/ui/ui-button'
import { ref } from "vue";


export default {
    name: "UiTaskIconAdd",
    components:{
        UiButton,
        UiInput,
        UiTextarea
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

        const criarTask = () => {
            if (title.value !== "" && description.value !== "") {
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

        return { title, description, tipo, criarTask };
    },
};
</script>

<style scoped>

.modal-add {
    display: flex;
    flex-direction: column;
    box-sizing: border-box;
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