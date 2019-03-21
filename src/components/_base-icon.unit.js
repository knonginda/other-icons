import BaseIcon from './_base-icon'

describe('@components/_base-icon', () => {
  it('renders its content', () => {
    const wrapper = shallowMount(BaseIcon, {
      propsData: {
        name: 'some-icon',
      },
    })
    expect(wrapper).toMatchSnapshot()
  })

  it('renders its content when size is medium', () => {
    const wrapper = shallowMount(BaseIcon, {
      propsData: {
        name: 'some-icon',
        size: 'medium',
      },
    })
    expect(wrapper).toMatchSnapshot()
  })

  it('renders its content when size is large', () => {
    const wrapper = shallowMount(BaseIcon, {
      propsData: {
        name: 'some-icon',
        size: 'large',
      },
    })
    expect(wrapper).toMatchSnapshot()
  })

  it('renders its content when size is xsmall', () => {
    const wrapper = shallowMount(BaseIcon, {
      propsData: {
        name: 'some-icon',
        size: 'xsmall',
      },
    })
    expect(wrapper).toMatchSnapshot()
  })

  it('renders its content when size is invalid', () => {
    const wrapper = shallowMount(BaseIcon, {
      propsData: {
        name: 'some-icon',
        size: 'invalid',
      },
    })
    expect(wrapper).toMatchSnapshot()
  })
})
