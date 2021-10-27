<template>
  <div v-if="end || start" style="z-index: 9999;" :class="[start ? 'fade-in' : '', end ? 'fade-out' : '']">
    {{ currentText }}
  </div>
</template>

<script lang="ts">
import { Vue, Prop, Emit, Watch, Component, PropSync } from 'vue-property-decorator'

@Component({
  components: {
    //
  }
})
export default class CasSecuComponent extends Vue {
  @PropSync('text', { type: String }) paramText!: String | any

  start: boolean = false
  end: boolean = false

  get currentText() {
    return this.paramText
  }

  @Watch('text')
  updateClass() {
    console.log('--text--')
    this.start = true
    this.end = false
    setTimeout(() => {
      this.start = false
      this.end = true
      setTimeout(() => {
        this.end = false
        this.start = false
      }, 2000)
    }, 1000)
  }
}
</script>

<style lang="scss" scoped>
.fade-in {
  animation-iteration-count: 1;
  animation: fadeIn ease 1s;
  -webkit-animation: fadeIn ease 1s;
  -moz-animation: fadeIn ease 1s;
  -o-animation: fadeIn ease 1s;
  -ms-animation: fadeIn ease 1s;
}
@keyframes fadeIn {
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}

@-moz-keyframes fadeIn {
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}

@-webkit-keyframes fadeIn {
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}

@-o-keyframes fadeIn {
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}

@-ms-keyframes fadeIn {
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}

.fade-out {
  animation-iteration-count: 1;
  animation: fadeOut ease 2s;
  -webkit-animation: fadeOut ease 2s;
  -moz-animation: fadeOut ease 2s;
  -o-animation: fadeOut ease 2s;
  -ms-animation: fadeOut ease 2s;
}
@keyframes fadeOut {
  0% {
    opacity: 1;
  }
  100% {
    opacity: 0;
  }
}

@-moz-keyframes fadeOut {
  0% {
    opacity: 1;
  }
  100% {
    opacity: 0;
  }
}

@-webkit-keyframes fadeOut {
  0% {
    opacity: 1;
  }
  100% {
    opacity: 0;
  }
}

@-o-keyframes fadeOut {
  0% {
    opacity: 1;
  }
  100% {
    opacity: 0;
  }
}

@-ms-keyframes fadeOut {
  0% {
    opacity: 1;
  }
  100% {
    opacity: 0;
  }
}
</style>
