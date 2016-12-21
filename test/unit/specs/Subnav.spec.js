import { createVue, destroyVM, queryByTag } from '../util'

const DELAY = 10

describe('Subnav', () => {
  let vm
  afterEach(() => {
    destroyVM(vm)
  })
  it('create', () => {
    vm = createVue(`
      <vk-subnav line pill>
        <vk-subnav-item>Item</vk-subnav-item>
        <vk-subnav-item>Item</vk-subnav-item>
      </vk-subnav>
    `)
    expect(vm.$el.classList.contains('uk-subnav')).to.be.true
    expect(vm.$el.classList.contains('uk-subnav-line')).to.be.true
    expect(vm.$el.classList.contains('uk-subnav-pill')).to.be.true
  })

  it('active', () => {
    vm = createVue(`
      <vk-subnav :index="1">
        <vk-subnav-item>Item 1</vk-subnav-item>
        <vk-subnav-item>Item 2</vk-subnav-item>
      </vk-subnav>
    `)
    expect(vm.$el.querySelector('.uk-active a'))
      .to.have.property('textContent').to.equal('Item 2')
  })

  it('disabled', done => {
    vm = createVue(`
      <vk-subnav>
        <vk-subnav-item>Item</vk-subnav-item>
        <vk-subnav-item disabled>Item</vk-subnav-item>
      </vk-subnav>
    `)
    const subnav = queryByTag(vm, 'vk-subnav')

    setTimeout(_ => {
      expect(subnav.$children[0].$el.classList.contains('uk-disabled')).to.be.false
      expect(subnav.$children[1].$el.classList.contains('uk-disabled')).to.be.true
      done()
    }, DELAY)
  })

  describe('events', () => {
    it('change', done => {
      vm = createVue(`
        <vk-subnav :index="0">
          <vk-subnav-item>Item 1</vk-subnav-item>
          <vk-subnav-item>Item 2</vk-subnav-item>
          <vk-subnav-item>Item 3</vk-subnav-item>
        </vk-subnav>
      `)
      const subnav = queryByTag(vm, 'vk-subnav')
      const callback = sinon.spy()
      subnav.$on('change', callback)
      subnav.$on('change', () => {
        expect(callback.called).to.be.true
        done()
      })
      subnav.$children[1].$el.querySelector('a').click()
    })
  })
})
