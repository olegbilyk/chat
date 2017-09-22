import tmpl from './index.pug'
import './style.pcss'

class Chat {
  constructor ({el, chatService, data = {user: '', messages: [], loader: true}}) {
    this.el = el
    this.data = data
    this.chatService = chatService
    this.el.classList.add('chat')

    this._init()
  }

  render () {
    this.el.innerHTML = tmpl(this.getData())
    this._scrollNewMessage()
  }

  _scrollNewMessage () {
    let el = this.el.querySelector('.chat__body')

    if (el) {
      if (el.lastElementChild) el.lastElementChild.scrollIntoView(false)
    }
  }

  _saveScrollTop () {
    let chatBox = this.el.querySelector('.chat__body')

    if (chatBox) {
      this._scrollTop = chatBox.scrollTop
    }
  }

  _restoreScrollTop () {
    let chatBox = this.el.querySelector('.chat__body')

    if (chatBox) {
      chatBox.scrollTop = this._scrollTop
    }
  }

  isMine (name) {
    return name === this.data.user
  }

  getData () {
    return this.data
  }

  _init () {
    this.startPolling()
  }

  getUsername () {
    return this.data.user
  }

  setUserName (name) {
    this.data.user = name
  }

  set (messages = []) {
    this.data.messages.length = 0
    this.add(messages)
  }

  add (messages = []) {
    let addOneMessageMethod = this.addOne.bind(this)

    messages.forEach(addOneMessageMethod)
  }

  addOne (data) {
    this.data.messages.push(this._prepareMessage(data))
    this._scrollNewMessage()
  }

  _prepareMessage ({name, text, date = Date.now()}) {
    return {
      name,
      isMine: this.isMine(name),
      text,
      date: new Date(date)
    }
  }

  startPolling () {
    this.__pollingID = setInterval(() => {
      if (!this.data.user) {
        return
      }

      this.chatService.getMessages(data => {
        if (JSON.stringify(this.data.messages) === JSON.stringify(data.map(this._prepareMessage.bind(this)))) {
          return
        }

        this.set(data)
        if (this.data.loader) this.stopLoader()
        this.render()
      })
    }, 1000)
  }

  getLoader () {
    return this.data.loader
  }

  stopLoader () {
    this.data.loader = false
  }

  stopPolling () {
    clearInterval(this.__pollingID)
  }
}

export default Chat
