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
        <i  class="fa-solid fa-ellipsis-vertical" @click="clickIcon()" :class="{ 'task-item-menu-clicked-icon': show }"></i>
    </div>
</template>

<script>
import { ref, watch } from 'vue'

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
        showMenu: {
            typeof: Boolean,
            required: false,
            default: false
        }
    },
    methods:{
        startTaskEdit(){
            this.$emit('start-task-edit')
        },
        removeTask(taskId){
            this.$emit('remove-task', taskId)
        },
        clickIcon() {
            console.log('aqui')
            this.$emit('click-icon');
        }
    },
    setup(props){
        const show = ref(props.showMenu)

        watch(() => props.showMenu, (newValue) => {
            show.value = newValue
        })

        return { show }
    }
}
</script>

<style lang="stylus" scoped>
    @import '../../assets/stylus/styles.styl';
</style> 

