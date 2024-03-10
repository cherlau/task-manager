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

<style scoped>
.modal-remove {
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 20px;
    background-color: white;
    width: 476px;
    height: 345px;
    box-shadow: 0 0 5px rgba(0, 0, 0, 0.1);
    border-radius: 10px;
}

.modal-remove-trash-icon {
    width: 135px;
    height: 135px;
    background-color: #edf6fc;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 70px;
    margin: 20px 0 10px;
}

.modal-remove p {
    color: #475e78;
    font-weight: 600;
}

.modal-remove-title {
    font-size: 20px;
    font-weight: 700;
    margin: 5px;
    color: #283848;
}

.modal-remove-title strong{
    color: #ff4874;
}

.modal-remove-buttons{
    display: flex;
    gap: 11px;
    margin-top: 33px;
}

</style>