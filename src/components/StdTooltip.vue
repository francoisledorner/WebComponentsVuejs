<template>
  <div class="tooltip">
    <i :class="classIcon" @click="showToolTip = !showToolTip">{{ iconTooltip }}</i>
    <div
      class="tooltiptext"
      :class="{ showToolTipClass: showToolTip, hideToolTipClass: !showToolTip, tooltiptextAbsolute: tooltiptextAbsolute }"
      :style="tooltiptextStyle"
    >
      <div class="tooltipcontent" :style="tooltipcontentStyle">
        <slot name="tooltipcontent">contenu du slot tooltipcontent</slot>
      </div>
      <div class="tooltipbotton" v-if="(iconClose != '' || iconPlusInfo != '') && showToolTip">
        <div>
          <i :class="classIcon" @click="showToolTip = false">{{ iconClose }}</i>
        </div>
        <div>
          <i :class="classIcon" @click="moreToolTip">{{ iconPlusInfo }}</i>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import StdIconStyle from '@/styles/std-icon.ts'

export default {
  props: {
    classIcon: {
      type: String,
      expected: false,
      default: () => StdIconStyle.classIcon
    },
    tooltiptextAbsolute: {
      type: Boolean,
      expected: false,
      default: () => true
    },
    iconTooltip: {
      type: String,
      expected: false,
      default: () => StdIconStyle.info
    },
    iconClose: {
      type: String,
      expected: false,
      default: () => StdIconStyle.close
    },
    iconPlusInfo: {
      type: String,
      expected: false,
      default: () => StdIconStyle.plusInfo
    },
    moreToolTipData: {
      type: Object,
      default: () => ({})
    },
    tooltiptextStyle: {
      type: String,
      expected: false,
      default: () => {
        return 'width:200px;'
      }
    },
    tooltipcontentStyle: {
      type: String,
      expected: false,
      default: () => {
        return 'height:50px;'
      }
    }
  },
  data: () => ({ showToolTip: false }),
  methods: {
    moreToolTip() {
      this.$emit('moreToolTip', this.moreToolTipData)
    }
  },
  computed: {
    showToolTipDynClass() {
      return this.showToolTip
    }
  }
}
</script>
<style lang="scss" scoped>
@import '@/styles/std-tooltip.scss';
</style>
