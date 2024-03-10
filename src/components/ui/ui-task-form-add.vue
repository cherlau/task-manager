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
            height="179px"
            :value="description"
            v-model="description"
            ></ui-textarea>

        <div class="modal-add-bottom">
            <ui-radio :options="optionsRadio" v-model="tipo" ref="radioComponentRef"></ui-radio>
            <ui-button @click-button="criarTask" design="sucess lg" :disabled="disabled" :loading="loading">Adicionar</ui-button>
        </div>
  </div>
</template>

<script>
import UiInput from '@/components/ui/ui-input'
import UiTextarea from '@/components/ui/ui-textarea'
import UiButton from '@/components/ui/ui-button'
import UiRadio from '@/components/ui/ui-radio.vue'
import { ref, watch } from "vue";

export default {
  name: "UiTaskIconAdd",
  components: {
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
    const optionsRadio = ref(['Urgente', 'Importante'])
    const radioComponentRef = ref();
    const disabled = ref(true)
    const loading = ref(false)

    watch([title, description], ([newTitle, newDescription]) => {
      if (newTitle !== '' && newDescription !== '') {
        disabled.value = false;
      }else {
        disabled.value = true
      }
    });

    const criarTask = () => {
      loading.value = true
      
      setTimeout(() => {
        if (title.value !== "" && description.value !== "") {

          if (tipo.value === 'Urgente') tipo.value = 'urgent'
          if (tipo.value === 'Importante') tipo.value = 'important'

          const task = {
            title: title.value,
            description: description.value,
            tipo: tipo.value,
          };

          title.value = "";
          description.value = "";
          tipo.value = "others";

          radioComponentRef.value.selectedOption = null;

          props.onCreateTask(task);
          loading.value = false
        }
      }, "700");
    };

    return { title, description, tipo, criarTask, optionsRadio, radioComponentRef, disabled, loading };
  },
};
</script>

<style lang="stylus" scoped>
    @import '../../assets/stylus/styles.styl';
</style> 