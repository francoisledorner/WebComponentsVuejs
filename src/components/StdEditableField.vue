<template>
  <div class="flex-row" v-if="paramElement">
    <div v-if="type === 'string'">
      <div v-if="currentEditable === false">
        {{ currentElementValue }}
      </div>
      <div v-else-if="currentEditable === true">
        <input v-model="currentElementValue" @blur="onBlur" />
        <!--maxlength="..." size="..."  formatter-->
      </div>
    </div>
    <div v-if="type === 'date'">
      <div v-if="currentEditable === false">{{ currentElementValue | datefilter }}</div>
      <div v-else><date-picker v-model="currentElementValue" format="DD-MM-YYYY"></date-picker></div>
    </div>
    <div v-if="type === 'KeyValueCheckableModel'">
      <div v-if="currentEditable === false">
        {{ currentElementValue }}
      </div>
      <div v-else-if="currentEditable === true">
        <select v-model="selectedValidValue" @blur="onBlur">
          <option v-for="option in validValues" :key="option.codei" :value="option.codei">
            {{ option.libelle }}
          </option>
        </select>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { Vue, Prop, Emit, Watch, Component, PropSync } from 'vue-property-decorator'
import KeyValueCheckableModel from '@/api/KeyValueCheckableModel'

@Component({
  components: {}
})
export default class StfEditableField extends Vue {
  @PropSync('element', { type: Object }) paramElement!: any
  @PropSync('field', { type: String }) paramField!: string
  @PropSync('type', { type: String }) paramType!: any
  @PropSync('editable', {
    type: Boolean,
    default: () => {
      return undefined
    }
  })
  paramEditable!: boolean

  @PropSync('validValues', {
    type: Array,
    default: () => {
      return undefined
    }
  })
  paramValidValues!: []

  onBlur() {
    this.$emit('onBlur')
  }

  get currentEditable() {
    return this.paramEditable
  }

  get currentElement() {
    return this.paramElement
  }

  get currentElementValue() {
    return this.paramElement[this.paramField]
  }

  set currentElementValue(value: any) {
    //console.log('set currentElementValue', value)
    this.paramElement[this.paramField] = value
    this.$emit('update:element', this.paramElement)
    //this.$emit(`update:element['${this.paramField}']`, value)
  }

  set selectedValidValue(codei: string) {
    this.paramElement[this.paramField] = codei
  }

  get selectedValidValue() {
    return this.paramElement[this.paramField]
  }
}
</script>

<style lang="scss">
@import '@/styles/std-flex.scss';
</style>
