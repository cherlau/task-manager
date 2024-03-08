<template>
    <div class="page-private">
        <div class="page-banner">
            <div class="img-content">
                <img src="../assets/imgs/facilita-task-logo.png" alt="">
            </div>
        </div>
        <slot></slot>
    </div>
</template>

<script>
export default {
    name: 'pagePublic'
}
</script>

<style lang="stylus" scoped>

@import '../assets/style.styl';

</style>
