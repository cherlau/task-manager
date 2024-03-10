<template>
  <div class="radio-button-group" v-for="(option, key) in options" :key="key">
    <input
      type="radio"
      name="radio-input"
      :value="option"
      :id="option"
      :checked="option === selectedOption"
      @change="changed(option)"
    />
    <label class="radio-button-label" :for="option">{{ option }}</label>
  </div>
</template>

<script>
import { ref, watch } from 'vue';

export default {
  name: 'UiRadio',
  props: {
    options: {
      required: true,
      type: Array,
    },
    modelValue: {
      type: String,
    },
  },
  setup(props, { emit }) {
    const selectedOption = ref(props.modelValue);

    const changed = (option) => {
      selectedOption.value = option;
      emit('update:modelValue', option);
    };

    watch(() => props.modelValue, (newValue) => {
      selectedOption.value = newValue;
    });

    return {
      selectedOption,
      changed,
    };
  },
};
</script>

<style>
.radio-button-group {
  display: flex;
}

.radio-button-label{
  cursor: pointer;
}


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
