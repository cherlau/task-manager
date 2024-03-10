<template>
  <div class="radio-button-group" v-for="(option, key) in options" :key="key">
    <input type="radio" name="radio-input" :value="option" :id="option" @change="changed(option)"/>
    <label :for="option">{{ option }}</label>
  </div>
 </template>

<script>

 export default {
  name: 'UiRadio',
  methods:{
    changed(option){
      this.$emit("update:modelValue", option)
    }
  },
  props: {
    options: {
     required: true,
     type: Array
    }
  }
 }
</script>

<style>
.radio-button-group{
  display: flex;
}
</style>