<template>
  <div class="pastillewrapper">
    <div :class="computedPastille" :style="borderedStyle" @click="click">
      <slot name="content">
        <i :class="classIcon">{{ icon }}</i
        >{{ text }}
      </slot>
    </div>
  </div>
</template>
<script>
import StdPastille from '@/components/StdPastille.vue'
import StdPastilleStyle from '@/styles/std-pastille.ts'
import StdIconStyle from '@/styles/std-icon.ts'

export default {
  //inherited ::  text
  mixins: [StdPastille],

  props: {
    classIcon: {
      type: String,
      expected: false,
      default: () => StdIconStyle.classIcon
    },
    icon: {
      type: String,
      expected: false,
      default: () => StdIconStyle.close
    },
    disable: {
      type: Boolean,
      expected: false,
      default: () => false
    }
  },
  data: () => ({}),

  computed: {
    computedPastille() {
      return this.disabled ? 'pastille pastille-disabled' : 'pastille'
    },
    disabled: {
      get() {
        return this.disable
      },
      set(value) {
        this.$emit('update:disable', value)
      }
    }
  },
  methods: {
    click() {
      if (!this.disable) {
        this.$emit('click')
      }
    }
  }
}
</script>

<style lang="scss" scoped>
$opacity-base: 0.8;
$opacity-low: 0.7;

.pastille {
  border-radius: 5%;

  cursor: pointer;
  transform: scale(1);
  opacity: $opacity-base;
  &:hover {
    opacity: 1;
    transition: all ease 0.2s;
    --transform: scale(1.05);
  }
}
.pastille-disabled {
  cursor: not-allowed;
  opacity: $opacity-low;
  &:hover {
    opacity: $opacity-base;
    transition: all ease 0.2s;
    --transform: scale(0.99);
  }
}
</style>
