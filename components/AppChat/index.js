import Chat from '../Chat'
import Form from '../Form'
import './style.pcss'

export default class AppChat {
  constructor ({el}) {
    this.el = el

    this._createComponents()
    this._initMediate()
    this.render()
  }

  render () {
    this.el.appendChild(this.chat.el)
    this.el.appendChild(this.form.el)
    this.chat.render()
    this.form.render()
  }

  _createComponents () {
    this.chat = new Chat({
      el: document.createElement('div'),
      data: {
        user: 'Oleg',
        messages: []
      }
    })

    this.form = new Form({
      el: document.createElement('div')
    })
  }

  _initMediate () {
    // this.el.addEventListener('submit', this._onSubmit.bind(this))
    this.form.on('message', (event) => {
    // this.el.addEventListener('message', (event) => {
      let data = event.detail
      console.log(data)

      this.chat.addMessage({
        text: data.message.value
      })
      this.chat.render()
      this.form.reset()
    })

    // this.form.onSubmit((data) => {
    //   this.chat.addMessage({
    //     text: data.message.value
    //   })
    //   this.chat.render()
    //   this.form.reset()
    // })
  }

  addMessage (data) {
    this.chat.addMessage(data)
  }
}
