<template>
    <div>
        <div class="modal-remove">
            <div class="modal-remove-trash-icon">
                <i class="fa-regular fa-trash-can"></i>
            </div>
            <p class="modal-remove-title">
                Tem certeza que deseja <strong>excluir</strong> esta tarefa?
            </p>
            <p>Está ação não poderá ser desfeita</p>
            <div class="modal-remove-buttons">
                <ui-button design="sucess md" @click-button="cancelRemove">Cancelar</ui-button>
                <ui-button design="danger md" @click-button="confirmRemove">Confirmar</ui-button>
            </div>
        </div>
    </div>
</template>

<script>
import UiButton from '@/components/ui/ui-button.vue';

export default {
    name: "UiTaskRemoveModal",
    components:{
        UiButton
    },
    props: {
        messageId: String,
    },
    methods: {
        confirmRemove() {
            this.$emit("confirm-remove");
        },
        cancelRemove() {
            this.$emit("cancel-remove");
        },
    },
};
</script>

<style lang="stylus" scoped>
    @import '../../assets/stylus/styles.styl';
</style> 