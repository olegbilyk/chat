/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 4);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var pug_has_own_property = Object.prototype.hasOwnProperty;

/**
 * Merge two attribute objects giving precedence
 * to values in object `b`. Classes are special-cased
 * allowing for arrays and merging/joining appropriately
 * resulting in a string.
 *
 * @param {Object} a
 * @param {Object} b
 * @return {Object} a
 * @api private
 */

exports.merge = pug_merge;
function pug_merge(a, b) {
  if (arguments.length === 1) {
    var attrs = a[0];
    for (var i = 1; i < a.length; i++) {
      attrs = pug_merge(attrs, a[i]);
    }
    return attrs;
  }

  for (var key in b) {
    if (key === 'class') {
      var valA = a[key] || [];
      a[key] = (Array.isArray(valA) ? valA : [valA]).concat(b[key] || []);
    } else if (key === 'style') {
      var valA = pug_style(a[key]);
      var valB = pug_style(b[key]);
      a[key] = valA + valB;
    } else {
      a[key] = b[key];
    }
  }

  return a;
};

/**
 * Process array, object, or string as a string of classes delimited by a space.
 *
 * If `val` is an array, all members of it and its subarrays are counted as
 * classes. If `escaping` is an array, then whether or not the item in `val` is
 * escaped depends on the corresponding item in `escaping`. If `escaping` is
 * not an array, no escaping is done.
 *
 * If `val` is an object, all the keys whose value is truthy are counted as
 * classes. No escaping is done.
 *
 * If `val` is a string, it is counted as a class. No escaping is done.
 *
 * @param {(Array.<string>|Object.<string, boolean>|string)} val
 * @param {?Array.<string>} escaping
 * @return {String}
 */
exports.classes = pug_classes;
function pug_classes_array(val, escaping) {
  var classString = '', className, padding = '', escapeEnabled = Array.isArray(escaping);
  for (var i = 0; i < val.length; i++) {
    className = pug_classes(val[i]);
    if (!className) continue;
    escapeEnabled && escaping[i] && (className = pug_escape(className));
    classString = classString + padding + className;
    padding = ' ';
  }
  return classString;
}
function pug_classes_object(val) {
  var classString = '', padding = '';
  for (var key in val) {
    if (key && val[key] && pug_has_own_property.call(val, key)) {
      classString = classString + padding + key;
      padding = ' ';
    }
  }
  return classString;
}
function pug_classes(val, escaping) {
  if (Array.isArray(val)) {
    return pug_classes_array(val, escaping);
  } else if (val && typeof val === 'object') {
    return pug_classes_object(val);
  } else {
    return val || '';
  }
}

/**
 * Convert object or string to a string of CSS styles delimited by a semicolon.
 *
 * @param {(Object.<string, string>|string)} val
 * @return {String}
 */

exports.style = pug_style;
function pug_style(val) {
  if (!val) return '';
  if (typeof val === 'object') {
    var out = '';
    for (var style in val) {
      /* istanbul ignore else */
      if (pug_has_own_property.call(val, style)) {
        out = out + style + ':' + val[style] + ';';
      }
    }
    return out;
  } else {
    val += '';
    if (val[val.length - 1] !== ';') 
      return val + ';';
    return val;
  }
};

/**
 * Render the given attribute.
 *
 * @param {String} key
 * @param {String} val
 * @param {Boolean} escaped
 * @param {Boolean} terse
 * @return {String}
 */
exports.attr = pug_attr;
function pug_attr(key, val, escaped, terse) {
  if (val === false || val == null || !val && (key === 'class' || key === 'style')) {
    return '';
  }
  if (val === true) {
    return ' ' + (terse ? key : key + '="' + key + '"');
  }
  if (typeof val.toJSON === 'function') {
    val = val.toJSON();
  }
  if (typeof val !== 'string') {
    val = JSON.stringify(val);
    if (!escaped && val.indexOf('"') !== -1) {
      return ' ' + key + '=\'' + val.replace(/'/g, '&#39;') + '\'';
    }
  }
  if (escaped) val = pug_escape(val);
  return ' ' + key + '="' + val + '"';
};

/**
 * Render the given attributes object.
 *
 * @param {Object} obj
 * @param {Object} terse whether to use HTML5 terse boolean attributes
 * @return {String}
 */
exports.attrs = pug_attrs;
function pug_attrs(obj, terse){
  var attrs = '';

  for (var key in obj) {
    if (pug_has_own_property.call(obj, key)) {
      var val = obj[key];

      if ('class' === key) {
        val = pug_classes(val);
        attrs = pug_attr(key, val, false, terse) + attrs;
        continue;
      }
      if ('style' === key) {
        val = pug_style(val);
      }
      attrs += pug_attr(key, val, false, terse);
    }
  }

  return attrs;
};

/**
 * Escape the given string of `html`.
 *
 * @param {String} html
 * @return {String}
 * @api private
 */

var pug_match_html = /["&<>]/;
exports.escape = pug_escape;
function pug_escape(_html){
  var html = '' + _html;
  var regexResult = pug_match_html.exec(html);
  if (!regexResult) return _html;

  var result = '';
  var i, lastIndex, escape;
  for (i = regexResult.index, lastIndex = 0; i < html.length; i++) {
    switch (html.charCodeAt(i)) {
      case 34: escape = '&quot;'; break;
      case 38: escape = '&amp;'; break;
      case 60: escape = '&lt;'; break;
      case 62: escape = '&gt;'; break;
      default: continue;
    }
    if (lastIndex !== i) result += html.substring(lastIndex, i);
    lastIndex = i + 1;
    result += escape;
  }
  if (lastIndex !== i) return result + html.substring(lastIndex, i);
  else return result;
};

/**
 * Re-throw the given `err` in context to the
 * the pug in `filename` at the given `lineno`.
 *
 * @param {Error} err
 * @param {String} filename
 * @param {String} lineno
 * @param {String} str original source
 * @api private
 */

exports.rethrow = pug_rethrow;
function pug_rethrow(err, filename, lineno, str){
  if (!(err instanceof Error)) throw err;
  if ((typeof window != 'undefined' || !filename) && !str) {
    err.message += ' on line ' + lineno;
    throw err;
  }
  try {
    str = str || __webpack_require__(11).readFileSync(filename, 'utf8')
  } catch (ex) {
    pug_rethrow(err, null, lineno)
  }
  var context = 3
    , lines = str.split('\n')
    , start = Math.max(lineno - context, 0)
    , end = Math.min(lines.length, lineno + context);

  // Error context
  var context = lines.slice(start, end).map(function(line, i){
    var curr = i + start + 1;
    return (curr == lineno ? '  > ' : '    ')
      + curr
      + '| '
      + line;
  }).join('\n');

  // Alter exception message
  err.path = filename;
  err.message = (filename || 'Pug') + ':' + lineno
    + '\n' + context + '\n\n' + err.message;
  throw err;
};


/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _Chat = __webpack_require__(2);

var _Chat2 = _interopRequireDefault(_Chat);

var _Form = __webpack_require__(3);

var _Form2 = _interopRequireDefault(_Form);

var _hatService = __webpack_require__(5);

var _hatService2 = _interopRequireDefault(_hatService);

__webpack_require__(6);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var chatService = new _hatService2.default({
  baseUrl: 'https://oleg-bilyk-js-chat.firebaseio.com/messages.json'
});

var AppChat = function () {
  function AppChat(_ref) {
    var el = _ref.el;

    _classCallCheck(this, AppChat);

    this.el = el;

    this._createComponents();
    this._initMediate();
    this.render();
  }

  _createClass(AppChat, [{
    key: 'render',
    value: function render() {
      this.el.appendChild(this.formUser.el);
      this.formUser.render();
    }
  }, {
    key: '_createComponents',
    value: function _createComponents() {
      this.formUser = new _Form2.default({
        el: document.createElement('form'),
        textTitle: 'Welcome to chat',
        elClass: 'app-chat__form',
        textPlaceholder: 'Enter your name...',
        textButton: 'Submit'
      });

      this.chat = new _Chat2.default({
        el: document.createElement('div'),
        chatService: chatService,
        data: {
          user: null,
          messages: [],
          loader: true
        }
      });

      this.formChat = new _Form2.default({
        el: document.createElement('form'),
        elClass: 'form--chat',
        textPlaceholder: 'Write a message...',
        textButton: 'Send'
      });
    }
  }, {
    key: '_initMediate',
    value: function _initMediate() {
      var _this = this;

      this.formUser.on('message', function (event) {
        var data = event.detail;

        _this.chat.setUserName(data.message.value);
        _this.formUser.el.classList.add('form--hidden');

        _this.el.appendChild(_this.chat.el);
        _this.el.appendChild(_this.formChat.el);
        _this.chat.render();
        _this.formChat.render();
      });

      this.formChat.on('message', function (event) {
        var data = event.detail;

        data = {
          text: data.message.value,
          name: _this.chat.getUsername()
        };

        chatService.sendMessage(data, function () {
          return null;
        });

        _this.chat.addOne(data);
        _this.chat.render();
        _this.formChat.reset();
      });
    }
  }]);

  return AppChat;
}();

exports.default = AppChat;

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _index = __webpack_require__(9);

var _index2 = _interopRequireDefault(_index);

__webpack_require__(7);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Chat = function () {
  function Chat(_ref) {
    var el = _ref.el,
        chatService = _ref.chatService,
        _ref$data = _ref.data,
        data = _ref$data === undefined ? { user: '', messages: [], loader: true } : _ref$data;

    _classCallCheck(this, Chat);

    this.el = el;
    this.data = data;
    this.chatService = chatService;
    this.el.classList.add('chat');

    this._init();
  }

  _createClass(Chat, [{
    key: 'render',
    value: function render() {
      this.el.innerHTML = (0, _index2.default)(this.getData());
      this._scrollNewMessage();
    }
  }, {
    key: '_scrollNewMessage',
    value: function _scrollNewMessage() {
      var el = this.el.querySelector('.chat__body');

      if (el) {
        if (el.lastElementChild) el.lastElementChild.scrollIntoView(false);
      }
    }
  }, {
    key: '_saveScrollTop',
    value: function _saveScrollTop() {
      var chatBox = this.el.querySelector('.chat__body');

      if (chatBox) {
        this._scrollTop = chatBox.scrollTop;
      }
    }
  }, {
    key: '_restoreScrollTop',
    value: function _restoreScrollTop() {
      var chatBox = this.el.querySelector('.chat__body');

      if (chatBox) {
        chatBox.scrollTop = this._scrollTop;
      }
    }
  }, {
    key: 'isMine',
    value: function isMine(name) {
      return name === this.data.user;
    }
  }, {
    key: 'getData',
    value: function getData() {
      return this.data;
    }
  }, {
    key: '_init',
    value: function _init() {
      this.startPolling();
    }
  }, {
    key: 'getUsername',
    value: function getUsername() {
      return this.data.user;
    }
  }, {
    key: 'setUserName',
    value: function setUserName(name) {
      this.data.user = name;
    }
  }, {
    key: 'set',
    value: function set() {
      var messages = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];

      this.data.messages.length = 0;
      this.add(messages);
    }
  }, {
    key: 'add',
    value: function add() {
      var messages = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];

      var addOneMessageMethod = this.addOne.bind(this);

      messages.forEach(addOneMessageMethod);
    }
  }, {
    key: 'addOne',
    value: function addOne(data) {
      this.data.messages.push(this._prepareMessage(data));
      this._scrollNewMessage();
    }
  }, {
    key: '_prepareMessage',
    value: function _prepareMessage(_ref2) {
      var name = _ref2.name,
          text = _ref2.text,
          _ref2$date = _ref2.date,
          date = _ref2$date === undefined ? Date.now() : _ref2$date;

      return {
        name: name,
        isMine: this.isMine(name),
        text: text,
        date: new Date(date)
      };
    }
  }, {
    key: 'startPolling',
    value: function startPolling() {
      var _this = this;

      this.__pollingID = setInterval(function () {
        if (!_this.data.user) {
          return;
        }

        _this.chatService.getMessages(function (data) {
          if (JSON.stringify(_this.data.messages) === JSON.stringify(data.map(_this._prepareMessage.bind(_this)))) {
            return;
          }

          _this.set(data);
          if (_this.data.loader) _this.stopLoader();
          _this.render();
        });
      }, 1000);
    }
  }, {
    key: 'getLoader',
    value: function getLoader() {
      return this.data.loader;
    }
  }, {
    key: 'stopLoader',
    value: function stopLoader() {
      this.data.loader = false;
    }
  }, {
    key: 'stopPolling',
    value: function stopPolling() {
      clearInterval(this.__pollingID);
    }
  }]);

  return Chat;
}();

exports.default = Chat;

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _index = __webpack_require__(10);

var _index2 = _interopRequireDefault(_index);

__webpack_require__(8);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Form = function () {
  function Form(_ref) {
    var el = _ref.el,
        elClass = _ref.elClass,
        textTitle = _ref.textTitle,
        textPlaceholder = _ref.textPlaceholder,
        textButton = _ref.textButton;

    _classCallCheck(this, Form);

    this.el = el;
    this.elClass = elClass;
    this.data = {
      textTitle: textTitle,
      textPlaceholder: textPlaceholder,
      textButton: textButton
    };

    this._initEvents();
  }

  _createClass(Form, [{
    key: 'render',
    value: function render() {
      this.el.classList.add('form', this.elClass);
      this.el.innerHTML = (0, _index2.default)(this.data);
      this.formEl = this.el.querySelector('form');

      this._addAutoSize();
    }
  }, {
    key: 'on',
    value: function on(name, cb) {
      this.el.addEventListener(name, cb);
    }
  }, {
    key: 'trigger',
    value: function trigger(name, data) {
      var event = new CustomEvent(name, { detail: data });

      this.el.dispatchEvent(event);
    }
  }, {
    key: 'reset',
    value: function reset() {
      this.el.reset();
    }
  }, {
    key: '_initEvents',
    value: function _initEvents() {
      this.el.addEventListener('submit', this._onSubmit.bind(this));
    }
  }, {
    key: '_onSubmit',
    value: function _onSubmit(event) {
      event.preventDefault();
      var formData = this._getFormData();

      this.trigger('message', formData);
    }
  }, {
    key: '_getInputs',
    value: function _getInputs() {
      return this.el.querySelectorAll('input, textarea');
    }
  }, {
    key: '_getFormData',
    value: function _getFormData() {
      var formData = {};

      [].concat(_toConsumableArray(this._getInputs())).forEach(function (input) {
        formData[input.name] = {
          value: input.value
        };
      });

      return formData;
    }
  }, {
    key: '_addAutoSize',
    value: function _addAutoSize() {
      var _this = this;

      [].concat(_toConsumableArray(this._getInputs())).forEach(function (input) {
        input.addEventListener('keydown', _this._initEventsAutoSize);
      });
    }
  }, {
    key: '_initEventsAutoSize',
    value: function _initEventsAutoSize() {
      var _this2 = this;

      setTimeout(function () {
        _this2.style.cssText = 'height: auto;';
        _this2.style.cssText = 'height:' + _this2.scrollHeight + 'px';
      }, 4);
    }
  }]);

  return Form;
}();

exports.default = Form;

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _AppChat = __webpack_require__(1);

var _AppChat2 = _interopRequireDefault(_AppChat);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

new _AppChat2.default({
  el: document.getElementById('app-chat')
});

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var ChatService = function () {
  function ChatService(_ref) {
    var baseUrl = _ref.baseUrl;

    _classCallCheck(this, ChatService);

    this.baseUrl = baseUrl;
  }

  _createClass(ChatService, [{
    key: '_makeRequest',
    value: function _makeRequest(cb) {
      var type = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'GET';
      var data = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};

      var xhr = new XMLHttpRequest();
      xhr.open(type, this.baseUrl, true);

      xhr.onload = function () {
        cb(JSON.parse(xhr.responseText));
      };

      xhr.send(JSON.stringify(data));
    }
  }, {
    key: 'getMessages',
    value: function getMessages(cb) {
      this._makeRequest(function (messages) {
        return cb(Object.values(messages));
      });
    }
  }, {
    key: 'sendMessage',
    value: function sendMessage(data, cb) {
      data.date = Date.now();
      this._makeRequest(cb, 'POST', data);
    }
  }]);

  return ChatService;
}();

exports.default = ChatService;

/***/ }),
/* 6 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 7 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 8 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

var pug = __webpack_require__(0);

function template(locals) {var pug_html = "", pug_mixins = {}, pug_interp;;var locals_for_with = (locals || {});(function (loader, messages, user) {pug_html = pug_html + "\u003Cdiv class=\"chat__header\"\u003E";
if (!!user) {
pug_html = pug_html + "\u003Ch1 class=\"chat__title\"\u003E" + (pug.escape(null == (pug_interp = 'Welcome to chat') ? "" : pug_interp)) + "\u003C\u002Fh1\u003E\u003Cspan class=\"chat__user\"\u003E" + (pug.escape(null == (pug_interp = user) ? "" : pug_interp)) + "\u003C\u002Fspan\u003E";
}
pug_html = pug_html + "\u003C\u002Fdiv\u003E";
if (!!messages.length) {
pug_html = pug_html + "\u003Cdiv class=\"chat__body\"\u003E\u003Ch2 class=\"visually-hidden\"\u003E" + (pug.escape(null == (pug_interp = 'Chat messages') ? "" : pug_interp)) + "\u003C\u002Fh2\u003E";
// iterate messages
;(function(){
  var $$obj = messages;
  if ('number' == typeof $$obj.length) {
      for (var pug_index0 = 0, $$l = $$obj.length; pug_index0 < $$l; pug_index0++) {
        var message = $$obj[pug_index0];
pug_html = pug_html + "\u003Cdiv" + (pug.attr("class", pug.classes(["message",message.isMine ? 'message--user' : 'message--other'], [false,true]), false, true)) + "\u003E\u003Cdiv class=\"message__box\"\u003E";
if (!message.isMine) {
pug_html = pug_html + "\u003Cspan class=\"message__name\"\u003E" + (pug.escape(null == (pug_interp = message.name) ? "" : pug_interp)) + "\u003C\u002Fspan\u003E";
}
pug_html = pug_html + "\u003Cp class=\"message__text\"\u003E" + (pug.escape(null == (pug_interp = message.text) ? "" : pug_interp)) + "\u003C\u002Fp\u003E\u003Ctime" + (" class=\"message__time\""+pug.attr("datetime", message.date, true, true)) + "\u003E" + (pug.escape(null == (pug_interp = `${('0' + (message.date.getHours())).slice(-2)}:${('0' + (message.date.getMinutes())).slice(-2)}`) ? "" : pug_interp)) + "\u003Cspan\u003E" + (pug.escape(null == (pug_interp = `${('0' + message.date.getDate()).slice(-2)}-${('0' + (message.date.getMonth() + 1)).slice(-2)}-${message.date.getFullYear()}`) ? "" : pug_interp)) + "\u003C\u002Fspan\u003E\u003C\u002Ftime\u003E\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E";
      }
  } else {
    var $$l = 0;
    for (var pug_index0 in $$obj) {
      $$l++;
      var message = $$obj[pug_index0];
pug_html = pug_html + "\u003Cdiv" + (pug.attr("class", pug.classes(["message",message.isMine ? 'message--user' : 'message--other'], [false,true]), false, true)) + "\u003E\u003Cdiv class=\"message__box\"\u003E";
if (!message.isMine) {
pug_html = pug_html + "\u003Cspan class=\"message__name\"\u003E" + (pug.escape(null == (pug_interp = message.name) ? "" : pug_interp)) + "\u003C\u002Fspan\u003E";
}
pug_html = pug_html + "\u003Cp class=\"message__text\"\u003E" + (pug.escape(null == (pug_interp = message.text) ? "" : pug_interp)) + "\u003C\u002Fp\u003E\u003Ctime" + (" class=\"message__time\""+pug.attr("datetime", message.date, true, true)) + "\u003E" + (pug.escape(null == (pug_interp = `${('0' + (message.date.getHours())).slice(-2)}:${('0' + (message.date.getMinutes())).slice(-2)}`) ? "" : pug_interp)) + "\u003Cspan\u003E" + (pug.escape(null == (pug_interp = `${('0' + message.date.getDate()).slice(-2)}-${('0' + (message.date.getMonth() + 1)).slice(-2)}-${message.date.getFullYear()}`) ? "" : pug_interp)) + "\u003C\u002Fspan\u003E\u003C\u002Ftime\u003E\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E";
    }
  }
}).call(this);

pug_html = pug_html + "\u003C\u002Fdiv\u003E";
}
if (!!loader) {
pug_html = pug_html + "\u003Cdiv class=\"chat__loader\"\u003E\u003C\u002Fdiv\u003E";
}}.call(this,"loader" in locals_for_with?locals_for_with.loader:typeof loader!=="undefined"?loader:undefined,"messages" in locals_for_with?locals_for_with.messages:typeof messages!=="undefined"?messages:undefined,"user" in locals_for_with?locals_for_with.user:typeof user!=="undefined"?user:undefined));;return pug_html;};
module.exports = template;

/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

var pug = __webpack_require__(0);

function template(locals) {var pug_html = "", pug_mixins = {}, pug_interp;;var locals_for_with = (locals || {});(function (textButton, textPlaceholder, textTitle) {if (!!textTitle) {
pug_html = pug_html + "\u003Ch3 class=\"form__title\"\u003E" + (pug.escape(null == (pug_interp = textTitle) ? "" : pug_interp)) + "\u003C\u002Fh3\u003E";
}
pug_html = pug_html + "\u003Cdiv class=\"form__textarea-wrap\"\u003E\u003Ctextarea" + (" class=\"form__textarea\""+" required autofocus name=\"message\""+pug.attr("placeholder", textPlaceholder, true, true)+" rows=\"1\"") + "\u003E\u003C\u002Ftextarea\u003E\u003Cbutton class=\"button form__button\" value=\"submit\" type=\"submit\"\u003E" + (pug.escape(null == (pug_interp = textButton) ? "" : pug_interp)) + "\u003C\u002Fbutton\u003E\u003C\u002Fdiv\u003E";}.call(this,"textButton" in locals_for_with?locals_for_with.textButton:typeof textButton!=="undefined"?textButton:undefined,"textPlaceholder" in locals_for_with?locals_for_with.textPlaceholder:typeof textPlaceholder!=="undefined"?textPlaceholder:undefined,"textTitle" in locals_for_with?locals_for_with.textTitle:typeof textTitle!=="undefined"?textTitle:undefined));;return pug_html;};
module.exports = template;

/***/ }),
/* 11 */
/***/ (function(module, exports) {

/* (ignored) */

/***/ })
/******/ ]);