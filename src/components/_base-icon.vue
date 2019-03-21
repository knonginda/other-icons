<script>
export default {
  inheritAttrs: false,
  props: {
    name: {
      type: [String, Array],
      required: true,
    },
    size: {
      type: String,
      default: 'small',
    },
    color: {
      type: String,
      default: '',
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
    overlayClasses() {
      const sizes = ['large', 'medium', 'small', 'xsmall']
      if (sizes.includes(this.size)) {
        return [this.$style[this.size], this.$style.baseIcon]
      } else {
        return [this.$style.small, this.$style.baseIcon]
      }
    },
  },
}
</script>

<template>
  <span
    :class="[overlayClasses, className]"
    :style="{color: color}"
    v-bind="$attrs"
    v-on="$listeners"
    @click="click()"
  >
    <svg>
      <use v-bind="{ 'xlink:href': '#' + name }"></use>
    </svg>
  </span>
</template>

<style lang="scss" module>
.baseIcon {
  display: inline-block;

  > svg {
    width: 100% !important;
    height: 100% !important;
  }
}

.xsmall {
  width: 12px;
  height: 12px;
}

.small {
  width: 16px;
  height: 16px;
}

.medium {
  width: 32px;
  height: 32px;
}

.large {
  width: 64px;
  height: 64px;
}
</style>
