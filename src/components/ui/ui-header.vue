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