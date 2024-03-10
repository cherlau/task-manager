<template>
    <div class="user-content">
        <div class="img-content">
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

<style scoped>
.user-content {
    display: flex;
    align-items: center;
    padding-inline: 34px;
}

.img-content {
    width: 46px;
    margin-right: 12px;
}

.img-content img {
    width: 100%;
    border-radius: 50%;
}

.user-content p {
    font-weight: 700;
}

.user-content span {
    font-size: 13px;
    font-weight: 700;
    color: #2693FF;
}
</style>