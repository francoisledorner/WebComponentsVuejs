<template>
  <div :class="{ 'flex-row': true, fJcenter: type === 'date', fJend: ((classContainerParam !=null && classContainerParam.indexOf('fJ') == -1) && type !== 'date'), ...classContainerObject }" v-if="paramElement">
    <div v-if="type === 'string'">
      <div v-if="currentEditable === false">
        {{ currentElementValue }}
      </div>
      <div v-else-if="currentEditable === true">
        <input v-model="currentElementValue" @blur="onBlur" :placeholder="currentPlaceholder" />
        <!--maxlength="..." size="..."  formatter validator-->
      </div>
    </div>

    <div v-if="type === 'textarea'">
      <div v-if="currentEditable === false">
        <span v-html="currentElementValueFormatted"></span>
      </div>
      <div v-else-if="currentEditable === true">
        <textarea   v-model="currentElementValueFormatted" @blur="onBlur" :placeholder="currentPlaceholder" rows="10" cols="35" />
        <!--maxlength="..." size="..."  formatter validator-->
      </div>
    </div>

    <div v-if="type === 'number'">
      <div v-if="currentEditable === false">
        {{ currentElementValue | numberFilter }}
      </div>
      <div v-else-if="currentEditable === true">
        <input class="numberClass" v-model="currentElementValueStringify" @blur="onBlur" :placeholder="currentPlaceholder" />
        <!--maxlength="..." size="..."  formatter validator-->
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
            <!-- validator -->
          </option>
        </select>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import numeral from 'numeral'
import { Vue, Prop, Emit, Watch, Component, PropSync } from 'vue-property-decorator'
import KeyValueCheckableModel from '@/api/KeyValueCheckableModel'

let timeout: any = undefined

@Component({
  components: {}
})
export default class StdEditableField extends Vue {
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

  @PropSync('placeHolder', { type: String }) paramPlaceholder!: string

  @PropSync('classContainer', {
    type: String,
    default: () => {
      return undefined
    }
  })
  classContainerParam!: string

  @PropSync('validValues', {
    type: Array,
    default: () => {
      return undefined
    }
  })
  paramValidValues!: []

  get currentElementValueFormatted() {
    return this.currentElementValue.replaceAll('\n', '<br>')
  }

  set currentElementValueFormatted(val: string) {
    this.currentElementValue = val.replaceAll('<br>', '\n')
  }

  // just to store for convertion
  get currentElementValueStringify() {
    return this.paramElement[this.paramField] != null ? numeral(this.paramElement[this.paramField]).format() : ''
  }

  set currentElementValueStringify(value: string) {
    if (timeout) {
      clearTimeout(timeout)
      timeout = undefined
    }
    timeout = setTimeout(() => {
      console.log('setTimeout')
      this.currentElementValue = numeral(value)
    }, 1000)
  }

  get classContainerObject() {
    const x = {} as any
    if (this.classContainerParam) {
      x[this.classContainerParam] = true
    }
    return x
  }

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

  get currentPlaceholder() {
    if (this.currentElementValue == '') {
      return this.paramPlaceholder
    } else return ''
  }
}
</script>

<style lang="scss">
@import '@/styles/std-flex.scss';

.numberClass {
  text-align: right;
}
</style>
