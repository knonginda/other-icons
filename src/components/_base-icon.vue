<script>
export default {
  inheritAttrs: false,
  props: {
    name: {
      type: [String, Array],
      required: true,
    },
    width: {
      type: String,
      default: '64',
    },
    height: {
      type: String,
      default: '64',
    },
    color: {
      type: String,
      default: '#333333',
    },
    className: {
      type: String,
      default: null,
    },
    click: {
      type: Function,
      default: null,
    },
  },
  computed: {
    iconStyles() {
      let width = this.width
      let height = this.height
      let color = this.color

      if (width !== null) {
        if (Number.isInteger(Number(width))) {
          width = width + 'px'
        }
      }

      if (height !== null) {
        if (Number.isInteger(Number(height))) {
          height = height + 'px'
        }
      }

      return {
        width,
        height,
        color,
        display: 'inline-block',
      }
    },
  },
}
</script>

<template>
  <span :class="className" :style="iconStyles" v-bind="$attrs" v-on="$listeners" @click="click()">
    <svg style="width: 100% !important; height: 100% !important;">
      <use v-bind="{ 'xlink:href': '#' + name }"></use>
    </svg>
  </span>
</template>
