import Vue from 'vue'
import fs from 'fs'
import path from 'path'
import vueTestUtils from '@vue/test-utils'
import _ from 'lodash'
_.mixin({
  pascalCase: _.flow(
    _.camelCase,
    _.upperFirst
  ),
})

Vue.config.productionTip = false

const globalComponentFiles = fs
  .readdirSync(path.join(__dirname, '../../src/components'))
  .filter((fileName) => /^_base-.+\.vue$/.test(fileName))

for (const fileName of globalComponentFiles) {
  const componentName = _.pascalCase(fileName.match(/^_(base-.+)\.vue$/)[1])
  const componentConfig = require('../../src/components/' + fileName)
  Vue.component(componentName, componentConfig.default || componentConfig)
}

Object.defineProperty(window, 'localStorage', {
  value: (function() {
    let store = {}
    return {
      getItem: function(key) {
        return store[key] || null
      },
      setItem: function(key, value) {
        store[key] = value.toString()
      },
      clear: function() {
        store = {}
      },
    }
  })(),
})

// https://vue-test-utils.vuejs.org/api/#mount
global.mount = vueTestUtils.mount

// https://vue-test-utils.vuejs.org/api/#shallowmount
global.shallowMount = vueTestUtils.shallowMount

// A special version of `shallowMount` for view components
global.shallowMountView = (Component, options = {}) => {
  return global.shallowMount(Component, {
    ...options,
    stubs: {
      Layout: {
        functional: true,
        render(h, { slots }) {
          return <div> {slots().default} </div>
        },
      },
      ...(options.stubs || {}),
    },
  })
}

// A helper for creating Vue component mocks
global.createComponentMocks = ({
  router,
  style,
  mocks,
  stubs,
  slots,
  directives,
}) => {
  // Use a local version of Vue, to avoid polluting the global
  // Vue and thereby affecting other tests.
  // https://vue-test-utils.vuejs.org/api/#createlocalvue
  const localVue = vueTestUtils.createLocalVue()
  const returnOptions = {
    localVue,
  }

  // https://vue-test-utils.vuejs.org/api/options.html#stubs
  returnOptions.stubs = stubs || {}
  // https://vue-test-utils.vuejs.org/api/options.html#mocks
  returnOptions.mocks = mocks || {}

  // If using `router: true`, we'll automatically stub out
  // components from Vue Router.
  if (router) {
    returnOptions.stubs['router-link'] = true
    returnOptions.stubs['router-view'] = true
  }

  // If a `style` object is provided, mock some styles.
  if (style) {
    returnOptions.mocks.$style = style
  }

  if (slots) {
    returnOptions.slots = {
      default: slots.default,
    }
  }

  if (directives) {
    returnOptions.directives = directives
  }

  return returnOptions
}
