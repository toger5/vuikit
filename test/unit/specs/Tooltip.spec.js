import { createVue, destroyVM, triggerEvent, queryByTag } from '../util'
import { each } from 'src/helpers/util'

const DELAY = 10

describe('Tooltip', () => {
  let vm
  afterEach(() => {
    destroyVM(vm)
  })

  it('create', () => {
    vm = createVue(`
      <button>
        <vk-tooltip content="Content">
      </button>`)

    const tooltip = queryByTag(vm, 'vk-tooltip')
    expect(tooltip.$el.classList.contains('uk-tooltip')).to.true
    expect(tooltip.$el.style.display).to.equal('none')
    expect(tooltip.$el.querySelector('.uk-tooltip-inner')).to.exist
    expect(tooltip.$el.querySelector('.uk-tooltip-inner').innerText)
      .to.equal('Content')
  })

  it('target', done => {
    vm = createVue({
      template: `
        <div>
          <vk-button />
          <vk-tooltip :target="target" />
        </div>`,
      data: () => ({
        target: false
      })
    })

    const tooltip = queryByTag(vm, 'vk-tooltip')
    const button = queryByTag(vm, 'vk-tooltip')
    expect(tooltip.targetElement).to.equal(vm.$el)
    vm.target = button
    setTimeout(_ => {
      expect(tooltip.targetElement).to.equal(button)
      done()
    }, DELAY)
  })

  it('placement', () => {
    vm = createVue({
      template: `
        <button>
          <vk-tooltip :placement="placement" />
        </button>`,
      data: () => ({
        placement: 'top'
      })
    })

    const placements = {
      'top': 'top',
      'top-start': 'top-left',
      'top-end': 'top-right',
      'right': 'right',
      'right-start': 'right-left',
      'right-end': 'right-right',
      'bottom': 'bottom',
      'bottom-start': 'bottom-left',
      'bottom-end': 'bottom-right',
      'left': 'left',
      'left-start': 'left-left',
      'left-end': 'left-right'
    }

    const tooltip = queryByTag(vm, 'vk-tooltip')
    expect(tooltip.$el.classList.contains('uk-tooltip-top')).to.true
    each(placements, (uikitStyle, popperStyle) => {
      expect(tooltip.convertPlacement(popperStyle)).to.equal(uikitStyle)
    })
  })

  it('show', done => {
    vm = createVue(`
      <button>
        <vk-tooltip />
      </button>`)

    const tooltip = queryByTag(vm, 'vk-tooltip')
    const cb = sinon.spy()

    tooltip.$on('show', cb)
    triggerEvent(vm.$el, 'mouseenter')
    setTimeout(_ => {
      expect(tooltip.$el.style.display).to.not.equal('none')
      expect(cb).to.have.been.called
      done()
    }, DELAY)
  })

  it('hide', done => {
    vm = createVue(`
      <button>
        <vk-tooltip />
      </button>`)

    const tooltip = queryByTag(vm, 'vk-tooltip')
    const cb = sinon.spy()

    tooltip.$on('hide', cb)
    triggerEvent(vm.$el, 'mouseenter')
    setTimeout(_ => {
      triggerEvent(vm.$el, 'mouseleave')
      setTimeout(_ => {
        expect(tooltip.$el.style.display).to.equal('none')
        expect(cb).to.have.been.called
        done()
      }, 30)
    }, DELAY)
  })
})
