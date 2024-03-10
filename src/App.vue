<template>
  <div>

    <page-public v-if="!logged">
      <view-login></view-login>
    </page-public>

    <page-private v-else></page-private>

  </div>
</template>

<script>
import PagePublic from "@/templates/page-public";
import ViewLogin from "@/views/view-login";
import PagePrivate from "@/templates/page-private.vue"
import { useTasks } from "@/store/tasks";
import { watch, ref, onBeforeMount } from "vue";

export default {
  name: "App",
  components: {
    PagePrivate,
    PagePublic,
    ViewLogin
  },
  setup() {
    const store = useTasks();
    const logged = ref(store.logged);

    onBeforeMount(() => {
      store.loadLoggedStateFromLocalStorage();
    });

    watch(
      () => store.logged,
      (newTasks) => {
        logged.value = newTasks;
      }
    );

    return { logged };
  },
};
</script>

<style lang="stylus" scoped>
  @import './assets/stylus/style.styl'; 
</style>
