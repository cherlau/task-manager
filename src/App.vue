<template>
  <page-public>
    <view-form-login></view-form-login>
  </page-public>

  <div>
    <page-private></page-private>
  </div>
</template>

<script>
import PagePublic from "@/templates/page-public";
import ViewFormLogin from "@/views/view-form-login";
import PagePrivate from "@/templates/page-private.vue"

//import TaskPage from "@/views/TaskPage";

export default {
  name: "App",
  components: {
    PagePrivate,
    PagePublic,
    ViewFormLogin
  }
};
</script>



<style lang="stylus" scoped>

@import './assets/style.styl';

</style>
