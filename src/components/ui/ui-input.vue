<template>
    <div class="flex-column ui-input">
      <label v-if="label" :for="id" :style="{'color' : labelColor}">{{ label }}</label>
      <input 
          :type="type"
          :id="id"
          :value="value"
          :placeholder="placeholder"
          :class="design"
          :disabled="disabled"
          :maxlength="maxlength"
          @input="updateValue"
      />
      <i v-if="icon" :class="icon"></i>
    </div>
</template>
  
<script>
  export default{
      name: 'ui-input',
      props: {
          label: {
              type: String,
              required: false,
              default: ''
          },
          type: {
              type: String,
              required: false,
              default: 'text'
          },
          id: { 
              type: String,
              required: false,
              default: ''
          },
          value: {
              type: null,
              required: false,
              default: ''
          },
          placeholder: {
              type: String,
              required: false,
              default: null
          },
          disabled: {
              type: Boolean,
              required: false,
              default: false
          },
          maxlength: {
              type: [String, Number],
              required: false,
              default: null
          },
          design: {
              type: [String, Object],
              required: false,
              default: ''
          },
          labelColor: {
              type: String,
              default: ''
          },
          icon: {
              type: String,
              default: ''
          }
      },
      methods: {
        updateValue(event){
            this.$emit('update:modelValue', event.target.value)
        }
      }
  }
</script>
  
<style scoped>
.ui-input label{
    margin-bottom: 4px;
}

.ui-input input{
    margin-bottom: 18px;
}

</style>
  