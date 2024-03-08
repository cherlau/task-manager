<template>
    <div class="view-container">
        <div style="width: 333px"></div>
        <div class="view-content">
            <div class="view-content-text">
                <h1>Tarefas ✔️</h1>
            </div>
        </div>
    </div>
</template>

<script>

export default {
    name: "ViewTasks"
}

</script>

<style scoped>
.view-container {
    margin-top: 185px;
    display: flex;
    justify-content: center;
    width: 100vw;
}

.view-content {
    display: flex;
    flex-direction: column;
    flex-grow: 1;
    max-width: 630px;
}

.view-content-text {
    margin-bottom: 35px;
}
</style>