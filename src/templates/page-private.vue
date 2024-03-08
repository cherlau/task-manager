<template>
    <div class="task-page">
        <ui-sidebar></ui-sidebar>
        <div class="task-page-content">
            <ui-header></ui-header>

        </div>
    </div>
</template>

<script>

import UiSidebar from "@/components/ui/ui-sidebar"
import UiHeader from "@/components/ui/ui-header";

export default {
    name: 'PagePrivate',
    components: {
        UiSidebar,
        UiHeader
    }
};
</script>

<style scoped>
.task-page {
    height: 100%;
    display: flex;
}

.side-bar {
    display: flex;
    position: fixed
}
</style>