<template>
    <div>
        <div v-show="show" class="task-item-menu" >
          <button @click="startTaskEdit" :class="{ 'task-item-menu-clicked': showEditTask }">
            <span></span>Editar
          </button>
          <button @click="removeTask(taskId)"  :class="{ 'task-item-menu-clicked': showRemoveConfirm }">
            <span></span>Excluir
          </button> 
        </div>
        <i  class="fa-solid fa-ellipsis-vertical" @click="show = !show" :class="{ 'task-item-menu-clicked-icon': show }"></i>
    </div>
</template>

<script>
import { ref } from 'vue'

export default{
    name: 'UiKebabMenu',
    props:{
        taskId:{
            typeof: String,
            required: false
        },
        showEditTask:{
            typeof: Boolean,
            required: false,
            default: false
        },
        showRemoveConfirm:{
            typeof: Boolean,
            required: false,
            default: false
        },
    },
    methods:{
        startTaskEdit(){
            this.$emit('start-task-edit')
        },
        removeTask(taskId){
            this.$emit('remove-task', taskId)
        }
    },
    setup(){
        const show = ref(false)

        return { show }
    }
}
</script>

<style scoped>
.task-item-menu {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: flex-start;
    position: absolute;
    right: -10px;
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


.fa-solid {
    font-size: 20px;
    color: #9caec1;
    cursor: pointer;
    z-index: 100;
    position: relative;
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

</style>

