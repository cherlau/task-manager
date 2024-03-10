<template>
    <div class="flex-column ui-textarea">
      <label v-if="label" :for="id" :style="{'color' : labelColor}">{{ label }}</label>
      <textarea 
          :id="id"
          :value="value"
          :placeholder="placeholder"
          :class="design"
          :disabled="disabled"
          :style="{'height': height}"
          @input="updateValue"
      ></textarea>
    </div>
</template>
  
<script>
  export default{
      name: 'UiTextarea',
      props: {
          label: {
              type: String,
              required: false,
              default: ''
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
          design: {
              type: [String, Object],
              required: false,
              default: ''
          },
          labelColor: {
              type: String,
              default: ''
          },
          height: {
              type: [String, Number],
              default: 'inherit'
          },
      },
      methods: {
        updateValue(event){
            this.$emit('update:modelValue', event.target.value)
        }
      }
  }
</script>
  
