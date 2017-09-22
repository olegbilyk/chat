import tmpl from './index.pug'
import './style.pcss'

class Form {
  constructor ({el, elClass, textTitle, textPlaceholder, textButton}) {
    this.el = el
    this.elClass = elClass
    this.data = {
      textTitle,
      textPlaceholder,
      textButton
    }

    this._initEvents()
  }

  render () {
    this.el.classList.add('form', this.elClass)
    this.el.innerHTML = tmpl(this.data)
    this.formEl = this.el.querySelector('form')

    this._addAutoSize()
  }

  on (name, cb) {
    this.el.addEventListener(name, cb)
  }

  trigger (name, data) {
    let event = new CustomEvent(name, {detail: data})

    this.el.dispatchEvent(event)
  }

  reset () {
    this.el.reset()
  }

  _initEvents () {
    this.el.addEventListener('submit', this._onSubmit.bind(this))
  }

  _onSubmit (event) {
    event.preventDefault()
    let formData = this._getFormData()

    this.trigger('message', formData)
  }

  _getInputs () {
    return this.el.querySelectorAll('input, textarea')
  }

  _getFormData () {
    let formData = {};

    [...this._getInputs()].forEach(input => {
      formData[input.name] = {
        value: input.value
      }
    })

    return formData
  }

  _addAutoSize () {
    [...this._getInputs()].forEach(input => {
      input.addEventListener('keydown', this._initEventsAutoSize)
    })
  }

  _initEventsAutoSize () {
    setTimeout(() => {
      this.style.cssText = 'height: auto;'
      this.style.cssText = 'height:' + this.scrollHeight + 'px'
    }, 4)
  }
}

export default Form
