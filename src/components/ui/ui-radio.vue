<template>
    <div>
      <input 
          type="radio"
          :id="id"
          :value="value"
          :disabled="disabled"
          :checked="checked"
          :name="name"
          @change="updateValue(value)"
      />
      <label v-if="label" :for="id" :style="{'color' : labelColor}">{{ label }}</label>
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
          id: { 
              type: String,
              required: false,
              default: ''
          },
          value: {
            type: [String, undefined],
            required: false,
            default: undefined,
          },
          disabled: {
              type: Boolean,
              required: false,
              default: false
          },

          labelColor: {
              type: String,
              required: false,
              default: ''
          },
          checked: {
            type: Boolean,
            required: false,
            default: false
          },
          name: {
            type: String,
              required: false,
              default: ''
          },
      },
      methods: {
        updateValue(value){
            this.$emit('input', value)
        }
      }
  }
</script>
  
<style scoped>


[type="radio"]:checked,
[type="radio"]:not(:checked) {
  position: absolute;
  left: -9999px;
}

[type="radio"]:checked+label,
[type="radio"]:not(:checked)+label {
  position: relative;
  padding-left: 28px;
  cursor: pointer;
  line-height: 20px;
  display: inline-block;
  color: #666;
}

[type="radio"]:checked+label:before,
[type="radio"]:not(:checked)+label:before {
  content: '';
  position: absolute;
  left: 0;
  top: 0;
  width: 18px;
  height: 18px;
  border: 2px solid #bfdaeb;
  border-radius: 100%;
  background: #fff;
}

[type="radio"]:checked+label:after,
[type="radio"]:not(:checked)+label:after {
  content: '';
  width: 10px;
  height: 10px;
  background: #2693ff;
  position: absolute;
  top: 5px;
  left: 5px;
  border-radius: 100%;
  -webkit-transition: all 0.2s ease;
  transition: all 0.2s ease;
}

[type="radio"]:not(:checked)+label:after {
  opacity: 0;
  -webkit-transform: scale(0);
  transform: scale(0);
}

[type="radio"]:checked+label:after {
  opacity: 1;
  -webkit-transform: scale(1);
  transform: scale(1);
}





</style>
  