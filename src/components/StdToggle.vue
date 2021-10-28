<template>
  <label class="switch">
    <input :disabled="disable" v-model="checkModel" type="checkbox" :class="classSwitch" />
    <span :id="id" class="slider round" :class="{ disabled: disable }"></span>
  </label>
</template>
<script>
import StdPastille from '@/components/StdPastille.vue'
import StdPastilleStyle from '@/styles/std-pastille.ts'
import StdIconStyle from '@/styles/std-icon.ts'

const getRandomInt = max => {
  return 'id' + Math.floor(Math.random() * Math.floor(max))
}

export default {
  //inherited ::  text
  mixins: [StdPastille],

  props: {
    id: {
      type: String,
      expected: false,
      default: () => getRandomInt(10000)
    },
    classIcon: {
      type: String,
      expected: false,
      default: () => StdIconStyle.classIcon
    },
    classSwitch: {
      type: String,
      expected: false,
      default: () => StdIconStyle.classSwitch
    },
    check: {
      type: Boolean,
      expected: false,
      default: () => false
    },
    checkedString: {
      type: String,
      expected: false,
      default: () => ''
    },
    uncheckedString: {
      type: String,
      expected: false,
      default: () => ''
    },
    disable: {
      type: Boolean,
      expected: false,
      default: () => false
    }
  },
  data: () => ({ checkModel: false, init: false }),

  watch: {
    checkModel() {
      //console.log('watch', this.checkModel)
      this.checkedOne = this.checkModel
      this.applyCSS()
    }
  },
  mounted() {
    this.checkModel = this.checkedOne
    this.applyCSS()
    this.init = true
  },
  computed: {
    checkedOne: {
      get() {
        return this.check
      },
      set(value) {
        //console.log('->>>>>', value)
        let inverse = this.init ? value : !value
        this.$emit('update:check', value)

        this.$emit('click', this.check)

        this.applyCSS()
      }
    },
    content() {
      return this.checkModel ? this.checkedString : this.uncheckedString
    }
  },
  beforeUpdate: function() {
    this.applyCSS()
  },
  methods: {
    applyCSS() {
      let nodeId = 'style-' + this.id //'vue-ribbon-bkg'
      let style = document.getElementById(nodeId)
      if (!style) {
        style = document.createElement('style')
        style.id = nodeId
        style.type = 'text/css'
        this.$el.appendChild(style)
      }

      let cssRule = `#${this.id}:before { content: "${this.content}"; }`
      style.innerHTML = cssRule
    }
  }
}
</script>

<style lang="scss" scoped>
.checkboxWrapper {
  display: flex;
  align-items: center;
  justify-content: center;
  width: auto;
  text-align: center;
}

$w: 1.7rem;
$h: 1.4rem;
$i: 1px;

/* The switch - the box around the slider */
.switch {
  font-size: 0.9rem;

  position: relative;
  display: inline-block;
  width: calc(#{$w * 2}); //60
  height: calc(#{$h} - #{$i/2}); //34

  align-items: center;
  justify-content: center;
  text-align: center;
}

/* Hide default HTML checkbox */
.switch input {
  opacity: 0;
  width: 0;
  height: 0;
}

/* The slider */
.slider {
  position: absolute;
  cursor: pointer;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #ccc;
  -webkit-transition: 0.4s;
  transition: 0.4s;
}

.disabled {
  cursor: not-allowed !important;
}

.slider:before {
  content: '';
  position: absolute;
  height: calc(#{$h} - #{$i * 2});
  width: calc(#{$w} - #{$i * 2});
  left: $i;
  bottom: $i;

  background-color: white;
  -webkit-transition: 0.4s;
  transition: 0.4s;

  display: flex;
  flex-direction: row;
  align-items: center;
  place-content: center;
}

input:checked + .slider {
  background-color: $color-lighten-5;
}

input:focus + .slider {
  box-shadow: 0 0 1px $color-lighten-7;
}

input:checked + .slider:before {
  -webkit-transform: translateX(calc(#{$w} - #{$i * 2}));
  -ms-transform: translateX(calc(#{$w} - #{$i * 2}));
  transform: translateX(calc(#{$w} - #{$i * 2}));
}

/* Rounded sliders */
.slider.round {
  border-radius: $w;
}

.slider.round:before {
  border-radius: 50%;
}
</style>
