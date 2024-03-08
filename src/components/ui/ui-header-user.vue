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
import { useTasks } from '@/stores/tasks'

export default {
    name: 'UiHeaderUser',
    setup() {
        const store = useTasks();
        const user = store.user

        return { user }
    }
}
</script>

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

p {
    font-weight: 700;
}

span {
    font-size: 13px;
    font-weight: 700;
    color: #2693FF;
}
</style>