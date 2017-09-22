import Chat from '../Chat'
import Form from '../Form'
import ChatService from '../../modules/СhatService'
import './style.pcss'

const chatService = new ChatService({
  baseUrl: 'https://oleg-bilyk-js-chat.firebaseio.com/messages.json'
})

export default class AppChat {
  constructor ({el}) {
    this.el = el

    this._createComponents()
    this._initMediate()
    this.render()
  }

  render () {
    this.el.appendChild(this.formUser.el)
    this.formUser.render()
  }

  _createComponents () {
    this.formUser = new Form({
      el: document.createElement('form'),
      textTitle: 'Welcome to chat',
      elClass: 'app-chat__form',
      textPlaceholder: 'Enter your name...',
      textButton: 'Submit'
    })

    this.chat = new Chat({
      el: document.createElement('div'),
      chatService,
      data: {
        user: null,
        messages: [],
        loader: true
      }
    })

    this.formChat = new Form({
      el: document.createElement('form'),
      elClass: 'form--chat',
      textPlaceholder: 'Write a message...',
      textButton: 'Send'
    })
  }

  _initMediate () {
    this.formUser.on('message', (event) => {
      let data = event.detail

      this.chat.setUserName(data.message.value)
      this.formUser.el.classList.add('form--hidden')

      this.el.appendChild(this.chat.el)
      this.el.appendChild(this.formChat.el)
      this.chat.render()
      this.formChat.render()
    })

    this.formChat.on('message', (event) => {
      let data = event.detail

      data = {
        text: data.message.value,
        name: this.chat.getUsername()
      }

      chatService.sendMessage(data, () => null)

      this.chat.addOne(data)
      this.chat.render()
      this.formChat.reset()
    })
  }
}
