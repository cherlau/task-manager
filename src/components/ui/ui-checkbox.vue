<template>
    <input type="checkbox" v-model="model" :value="value" :class="design"/>
    <span :class="{'task-checked-text': modelValue}" @click="handleClick">{{ label }}</span>
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

  <style scoped>
  
.custom-checkbox {
    appearance: none;
    -webkit-appearance: none;
    -moz-appearance: none;
    width: 33px;
    height: 33px;
    background-color: #d7e4ef;
    border: none;
    border-radius: 4px;
    outline: none;
    cursor: pointer;
    margin-right: 8px;
    vertical-align: middle;
    position: relative;
}

.custom-checkbox:checked {
    background-color: #7ce7bf;
    color: #fff;
}

.custom-checkbox::before {
    content: "\2713";
    font-size: 20px;
    color: #fff;
    position: absolute;
    top: 45%;
    left: 50%;
    transform: translate(-50%, -50%);
    display: none;
}

.custom-checkbox:checked::before {
    display: block;
}

.task-checked-text {
    text-decoration: line-through;
    color: #8d9ca9;
}
</style>