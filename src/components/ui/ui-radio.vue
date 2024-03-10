<template>
  <div class="radio-button-group" >
    <div v-for="(option, key) in options" :key="key">
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

<style lang="stylus" scoped>
    @import '../../assets/stylus/styles.styl';
</style> 

