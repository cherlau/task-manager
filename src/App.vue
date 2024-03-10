<template>
  <div>

    <page-public v-if="!logged">
      <view-form-login></view-form-login>
    </page-public>

    <page-private v-else></page-private>

  </div>
</template>

<script>
import PagePublic from "@/templates/page-public";
import ViewFormLogin from "@/views/view-form-login";
import PagePrivate from "@/templates/page-private.vue"
import { useTasks } from "@/stores/tasks";
import { watch, ref, onBeforeMount } from "vue";

export default {
  name: "App",
  components: {
    PagePrivate,
    PagePublic,
    ViewFormLogin
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
  @import './assets/style.styl'; 
</style>
