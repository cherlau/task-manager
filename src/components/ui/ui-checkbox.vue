<template>
  <div>
    <input type="checkbox" v-model="model" :value="value" :class="design"/>
    <span class="checkbox-span" :class="{'task-checked-text': modelValue}" @click="handleClick">{{ label }}</span>
  </div>
</template>
  
<script >
  export default {
    props:{
      modelValue: { 
          type: [Array, Boolean] 
      },
      value: { 
          type: [Boolean, Object] 
      },
      label: { 
          type: String 
      },
      design: {
          type: String 
      }
    },
    methods:{
      handleClick(){
          this.$emit("click-title")
      }
    },
    computed:{
      model:{
         get() {
            return this.modelValue;
          },
          set(value) {
            this.$emit("update:modelValue", value);
          }
      }
    }
  }
</script>

<style lang="stylus" scoped>
    @import '../../assets/stylus/styles.styl';
</style> 

