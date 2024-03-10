<template>
  <Teleport to="#modal">
    <transition name="modal-animation">
      <div v-show="modalActive" class="overlay" @click="closeModal"></div>
    </transition>
    <transition name="modal-animation">
      <div v-show="modalActive" class="modal">
        <transition name="modal-animation-inner">
          <div v-show="modalActive" class="modal-inner">
            <svg @click="closeModal" width="10" height="10" viewBox="0 0 10 10" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M3.93919 5.00016L0.734086 1.79506L0.0731277 1.1341C-0.024375 1.03659 -0.024375 0.878153 0.0731277 0.78065L0.780337 0.0734399C0.87784 -0.0240632 1.03628 -0.0240632 1.13379 0.0734399L4.99984 3.9395L8.8659 0.0731273C8.96341 -0.0243758 9.12185 -0.0243758 9.21935 0.0731273L9.92687 0.780337C10.0244 0.87784 10.0244 1.03628 9.92687 1.13379L6.0605 5.00016L9.92687 8.86621C10.0244 8.96372 10.0244 9.12216 9.92687 9.21966L9.21966 9.92687C9.12216 10.0244 8.96372 10.0244 8.86621 9.92687L4.99984 6.06081L1.79474 9.26591L1.13379 9.92687C1.03628 10.0244 0.87784 10.0244 0.780337 9.92687L0.0731277 9.21966C-0.024375 9.12216 -0.024375 8.96372 0.0731277 8.86621L3.93919 5.00016Z" fill="#4E657B"/>
            </svg>
            <slot></slot>
          </div>
        </transition>
      </div>
    </transition>
  </Teleport>
</template>

<script>
export default {
  props: ['modalActive'],
  emits: ['close'],
  methods: {
    closeModal() {
      this.$emit('close');
    }
  }
}
</script>

<style lang="stylus" scoped>
    @import '../../assets/stylus/styles.styl';
</style> 

<style scoped>
.modal-animation-enter-active,
.modal-animation-leave-active {
  transition: opacity 0.3s cubic-bezier(0.52, 0.02, 0.19, 1.02);
}

.modal-animation-enter-from,
.modal-animation-leave-to {
  opacity: 0;
}

.modal-animation-inner-enter-active {
  transition: all 0.3s cubic-bezier(0.52, 0.02, 0.19, 1.02) 0.15s;
}

.modal-animation-inner-leave-active {
  transition: all 0.3s cubic-bezier(0.52, 0.02, 0.19, 1.02);
}

.modal-animation-inner-enter-from {
  opacity: 0;
  transform: scale(0.8);
}

.modal-animation-inner-leave-to {
  transform: scale(0.8);
}

.overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.45);
    z-index: 10;
}

.modal{
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 10;
    box-sizing: border-box;
}

.modal-inner{
    position: relative;
    background-color: #fff;
    border-radius: 10px;
    z-index: 10;
    box-shadow: 0 4px 6px -1px rgba(0,0,0, 0.1),0 2px 4px -1px rgba(0,0,0,0.6);
}

.modal-inner svg {
    position: absolute;
    top: 17px;
    right: 17px;
    cursor: pointer;
}

</style>