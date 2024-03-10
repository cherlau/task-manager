<template>
    <div class="user-content">
        <div class="img-content-header">
            <img :src="user.img" alt="usuário">
        </div>
        <div>
            <p>{{ user.name }}</p>
            <span>{{ user.position }}</span>
        </div>
    </div>
</template>

<script>
import { useTasks } from '@/store/tasks'

export default {
    name: 'UiHeaderUser',
    setup() {
        const store = useTasks();
        const user = store.user

        return { user }
    }
}
</script>


<style lang="stylus" scoped>
    @import '../../assets/stylus/styles.styl';
</style> 