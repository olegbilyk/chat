import tmpl from './index.pug'
import './style.pcss'

/**
 * @typedef {Object} ChatMessage
 *
 * @property {string} text - Текст сообщения
 * @property {string} email - Email отправителя сообщения
 */
class Chat {
  constructor ({el, data = {
    user: '',
    messages: []
  }}) {
    this.el = el
    this.data = data
  }

  render () {
    this.el.innerHTML = tmpl(this.data)
  }

  /**
   * Добавить новое сообщение в чат
   * @param {ChatMessage} data
   */
  addMessage (data) {
    this.data.messages.push({
      avatar: 'https://avatars2.githubusercontent.com/u/15265408?v=4&s=50',
      name: data.name || this.data.user,
      isMine: data.name === this.data.user,
      text: data.text,
      date: data.date || new Date()
    })
  }

  setUserName (name) {
    this.data.user = name
  }
}

export default Chat
