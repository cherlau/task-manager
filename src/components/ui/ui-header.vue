<template>
    <header>
        <ui-header-user></ui-header-user>
    </header>
</template>

<script>
import UiHeaderUser from "@/components/ui/ui-header-user"

export default {
    name: 'UiHeader',
    components: {
        UiHeaderUser
    }
}


</script>
<style lang="stylus" scoped>
    @import '../../assets/stylus/styles.styl';
</style> 

<style scoped>
header {
    width: calc(100vw - 106px);
    height: 83px;
    display: flex;
    flex-direction: row-reverse;
    box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.1);
    position: fixed;
    left: 106px;
    background-color: #fff;
    z-index: 1;
}
</style>