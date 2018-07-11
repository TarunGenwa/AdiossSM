'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

var _reactTable = require('react-table');

var _reactTable2 = _interopRequireDefault(_reactTable);


function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var ipc = require('electron').ipcRenderer;
var PouchDB = require('pouchdb-browser');
var student_database_one = new PouchDB('student_database_one');
PouchDB.plugin(require('pouchdb-find'));


ipc.on('tci', function (e, args) {
  student_database_one.find({ selector: { _id: { $eq: args.enrollid } }
  });
  _reactDom2.default.render(_react2.default.createElement(TCpdf, { id: args.enrollid }), document.getElementById('tc'));
});

var TCpdf = function (_Component) {
  _inherits(TCpdf, _Component);

  function TCpdf(props) {
    _classCallCheck(this, TCpdf);

    var _this = _possibleConstructorReturn(this, (TCpdf.__proto__ || Object.getPrototypeOf(TCpdf)).call(this, props));

    _this.state = {};
    //console.log(this.props.id)
    return _this;
  }

  _createClass(TCpdf, [{
    key: 'render',
    value: function render() {
      return _react2.default.createElement(
        'div',
        { style: { flex: 1, overflowX: 'auto' } },
        _react2.default.createElement(
          'table',
          { style: { width: 790 } },
          _react2.default.createElement(
            'tbody',
            null,
            _react2.default.createElement(
              'tr',
              null,
              _react2.default.createElement(
                'td',
                {  colSpan: 10 },
                _react2.default.createElement('img', { src: '../../src/assets/logo.png' })
              )

            ),
            _react2.default.createElement(
              'tr',
              null,
              _react2.default.createElement(
                'td',
                { style: { width: 154, height:10 }, colSpan: 2 },
                _react2.default.createElement(
                  'p',
                  null,
                  'छात्र रजिस्टर संख्या'
                )
              ),
              _react2.default.createElement(
                'td',
                { style: { width: 77, height:10 } },
                _react2.default.createElement(
                  'p',
                  null,
                  '\xA0'
                )
              ),
              _react2.default.createElement(
                'td',
                { style: { width: 318, height:10 }, colSpan: 4 },
                _react2.default.createElement(
                  'p',
                  null,
                  'लेख प्रमाण (अ)'
                )
              ),
              _react2.default.createElement(
                'td',
                { style: { width: 156, height:10 }, colSpan: 2 },
                _react2.default.createElement(
                  'p',
                  null,
                  'प्रवेश रजिस्टर संख्या'
                )
              ),
              _react2.default.createElement(
                'td',
                { style: { width: 122, height:10 } },
                _react2.default.createElement(
                  'p',
                  null,
                  '\xA0'
                )
              )
            ),
            _react2.default.createElement(
              'tr',
              null,
              _react2.default.createElement(
                'td',
                { style: { width: 154 }, colSpan: 2 },
                _react2.default.createElement(
                  'p',
                  null,
                  'प्रवेश दिनांक'
                )
              ),
              _react2.default.createElement(
                'td',
                { style: { width: 77 } },
                _react2.default.createElement(
                  'p',
                  null,
                  '\xA0'
                )
              ),
              _react2.default.createElement(
                'td',
                { style: { width: 240 }, colSpan: 3 },
                _react2.default.createElement(
                  'p',
                  null,
                  'स्कूल छोड़ने की दिनांक'
                )
              ),
              _react2.default.createElement(
                'td',
                { style: { width: 356 }, colSpan: 4 },
                _react2.default.createElement(
                  'p',
                  null,
                  'स्कूल छोड़ने का कारण'
                )
              )
            ),
            _react2.default.createElement(
              'tr',
              null,
              _react2.default.createElement(
                'td',
                { style: { width: 154 }, colSpan: 2 },
                _react2.default.createElement(
                  'p',
                  null,
                  '\xA0'
                )
              ),
              _react2.default.createElement(
                'td',
                { style: { width: 77 } },
                _react2.default.createElement(
                  'p',
                  null,
                  '\xA0'
                )
              ),
              _react2.default.createElement(
                'td',
                { style: { width: 240 }, colSpan: 3 },
                _react2.default.createElement(
                  'p',
                  null,
                  '\xA0'
                )
              ),
              _react2.default.createElement(
                'td',
                { style: { width: 356 }, colSpan: 4 },
                _react2.default.createElement(
                  'p',
                  null,
                  '\xA0'
                )
              )
            ),
            _react2.default.createElement(
              'tr',
              null,
              _react2.default.createElement(
                'td',
                { style: { width: 154 }, colSpan: 2 },
                _react2.default.createElement(
                  'p',
                  null,
                  '\xA0'
                )
              ),
              _react2.default.createElement(
                'td',
                { style: { width: 317 }, colSpan: 4 },
                _react2.default.createElement(
                  'p',
                  null,
                  'लेख प्रमाण (ब)'
                )
              ),
              _react2.default.createElement(
                'td',
                { style: { width: 78 } },
                _react2.default.createElement(
                  'p',
                  null,
                  'आधार न.'
                )
              ),
              _react2.default.createElement(
                'td',
                { style: { width: 278 }, colSpan: 3 },
                _react2.default.createElement(
                  'p',
                  null,
                  '\xA0'
                )
              )
            ),
            _react2.default.createElement(
              'tr',
              null,
              _react2.default.createElement(
                'td',
                { style: { width: 154 }, colSpan: 2 },
                _react2.default.createElement(
                  'p',
                  null,
                  'छात्र का नाम'
                )
              ),
              _react2.default.createElement(
                'td',
                { style: { width: 120 }, colSpan: 2 },
                _react2.default.createElement(
                  'p',
                  null,
                  'पिता का नाम'
                )
              ),
              _react2.default.createElement(
                'td',
                { style: { width: 156 }, colSpan: 2, rowSpan: 2 },
                _react2.default.createElement(
                  'p',
                  null,
                  'विवाह की दिनांक यदि विवाह हो गया हो'
                )
              ),
              _react2.default.createElement(
                'td',
                { style: { width: 156 }, colSpan: 2, rowSpan: 4 },
                _react2.default.createElement(
                  'p',
                  null,
                  'इस स्कूल में प्रवेश लेने से पहले उस स्कूल का नाम जिसमे छात्र पढता था'
                )
              ),
              _react2.default.createElement(
                'td',
                { style: { width: 200 }, colSpan: 2, rowSpan: 4 },
                _react2.default.createElement(
                  'p',
                  null,
                  'पिछले स्कूल को छोड़ते समय कोनसी कक्षा में उत्तीर्ण हुआ, किस कक्षा में प्रवेश योग्य था'
                )
              )
            ),
            _react2.default.createElement(
              'tr',
              null,
              _react2.default.createElement(
                'td',
                { style: { width: 154 }, colSpan: 2, rowSpan: 2 },
                _react2.default.createElement(
                  'p',
                  null,
                  '\xA0'
                )
              ),
              _react2.default.createElement(
                'td',
                { style: { width: 120 }, colSpan: 2, rowSpan: 2 },
                _react2.default.createElement(
                  'p',
                  null,
                  '\xA0'
                )
              )
            ),
            _react2.default.createElement(
              'tr',
              null,
              _react2.default.createElement(
                'td',
                { style: { width: 156 }, colSpan: 2 },
                _react2.default.createElement(
                  'p',
                  null,
                  '\xA0'
                )
              )
            ),
            _react2.default.createElement(
              'tr',
              null,
              _react2.default.createElement(
                'td',
                { style: { width: 154 }, colSpan: 2 },
                _react2.default.createElement(
                  'p',
                  null,
                  'माता का नाम'
                )
              ),
              _react2.default.createElement(
                'td',
                { style: { width: 120 }, colSpan: 2 },
                _react2.default.createElement(
                  'p',
                  null,
                  'संरक्षक का नाम'
                )
              ),
              _react2.default.createElement(
                'td',
                { style: { width: 156 }, colSpan: 2 },
                _react2.default.createElement(
                  'p',
                  null,
                  'धर्म'
                )
              )
            ),
            _react2.default.createElement(
              'tr',
              null,
              _react2.default.createElement(
                'td',
                { style: { width: 154 }, colSpan: 2 },
                _react2.default.createElement(
                  'p',
                  null,
                  '\xA0'
                )
              ),
              _react2.default.createElement(
                'td',
                { style: { width: 120 }, colSpan: 2 },
                _react2.default.createElement(
                  'p',
                  null,
                  '\xA0'
                )
              ),
              _react2.default.createElement(
                'td',
                { style: { width: 156 }, colSpan: 2 },
                _react2.default.createElement(
                  'p',
                  null,
                  '\xA0'
                )
              ),
              _react2.default.createElement(
                'td',
                { style: { width: 156 }, colSpan: 2, rowSpan: 3 },
                _react2.default.createElement(
                  'p',
                  null,
                  '\xA0'
                )
              ),
              _react2.default.createElement(
                'td',
                { style: { width: 200 }, colSpan: 2, rowSpan: 3 },
                _react2.default.createElement(
                  'p',
                  null,
                  '\xA0'
                )
              )
            ),
            _react2.default.createElement(
              'tr',
              null,
              _react2.default.createElement(
                'td',
                { style: { width: 154 }, colSpan: 2 },
                _react2.default.createElement(
                  'p',
                  null,
                  'व्यवसाय'
                )
              ),
              _react2.default.createElement(
                'td',
                { style: { width: 317 }, colSpan: 4 },
                _react2.default.createElement(
                  'p',
                  null,
                  'छात्र का वर्तमान पता'
                )
              )
            ),
            _react2.default.createElement(
              'tr',
              null,
              _react2.default.createElement(
                'td',
                { style: { width: 154 }, colSpan: 2 },
                _react2.default.createElement(
                  'p',
                  null,
                  '\xA0'
                )
              ),
              _react2.default.createElement(
                'td',
                { style: { width: 317 }, colSpan: 4 },
                _react2.default.createElement(
                  'p',
                  null,
                  '\xA0'
                )
              )
            ),
            _react2.default.createElement(
              'tr',
              null,
              _react2.default.createElement(
                'td',
                { style: { width: 154 }, colSpan: 2 },
                _react2.default.createElement(
                  'p',
                  null,
                  'जन्मतिथि (अंकों में)'
                )
              ),
              _react2.default.createElement(
                'td',
                { style: { width: 120 }, colSpan: 2 },
                _react2.default.createElement(
                  'p',
                  null,
                  '\xA0'
                )
              ),
              _react2.default.createElement(
                'td',
                { style: { width: 78 } },
                _react2.default.createElement(
                  'p',
                  null,
                  'शब्दों में'
                )
              ),
              _react2.default.createElement(
                'td',
                { style: { width: 434 }, colSpan: 5 },
                _react2.default.createElement(
                  'p',
                  null,
                  '\xA0'
                )
              )
            ),
            _react2.default.createElement(
              'tr',
              null,
              _react2.default.createElement(
                'td',
                { style: { width: 154 }, colSpan: 2 },
                _react2.default.createElement(
                  'p',
                  null,
                  '\xA0'
                )
              ),
              _react2.default.createElement(
                'td',
                { style: { width: 317 }, colSpan: 4 },
                _react2.default.createElement(
                  'p',
                  null,
                  'लेख प्रमाण (स)'
                )
              ),
              _react2.default.createElement(
                'td',
                { style: { width: 356 }, colSpan: 4 },
                _react2.default.createElement(
                  'p',
                  null,
                  'लेख प्रमाण (द)'
                )
              )
            ),
            _react2.default.createElement(
              'tr',
              null,
              _react2.default.createElement(
                'td',
                { style: { width: 154 }, colSpan: 2 },
                _react2.default.createElement(
                  'p',
                  null,
                  'प्रवेश या उत्तीर्ण'
                )
              ),
              _react2.default.createElement(
                'td',
                { style: { width: 120 }, colSpan: 2, rowSpan: 3 },
                _react2.default.createElement(
                  'p',
                  null,
                  'इस स्कूल में कक्षा पास करने की दिनांक'
                )
              ),
              _react2.default.createElement(
                'td',
                { style: { width: 156 }, colSpan: 2 },
                _react2.default.createElement(
                  'p',
                  null,
                  'उपस्तिथि'
                )
              ),
              _react2.default.createElement(
                'td',
                { style: { width: 156 }, colSpan: 2 },
                _react2.default.createElement(
                  'p',
                  null,
                  'कक्षा में स्थान'
                )
              ),
              _react2.default.createElement(
                'td',
                { style: { width: 78 }, rowSpan: 3 },
                _react2.default.createElement(
                  'p',
                  null,
                  'विषय जो लिए गये हे'
                )
              ),
              _react2.default.createElement(
                'td',
                { style: { width: 122 }, rowSpan: 2 },
                _react2.default.createElement(
                  'p',
                  null,
                  'स्कूल वर्ष में आचरण तथा कार्य'
                )
              )
            ),
            _react2.default.createElement(
              'tr',
              null,
              _react2.default.createElement(
                'td',
                { style: { width: 77 }, rowSpan: 2 },
                _react2.default.createElement(
                  'p',
                  null,
                  'कक्षा'
                )
              ),
              _react2.default.createElement(
                'td',
                { style: { width: 77 }, rowSpan: 2 },
                _react2.default.createElement(
                  'p',
                  null,
                  'दिनांक'
                )
              ),
              _react2.default.createElement(
                'td',
                { style: { width: 78 }, rowSpan: 2 },
                _react2.default.createElement(
                  'p',
                  null,
                  'स्कूल मीटिंग की संख्या'
                )
              ),
              _react2.default.createElement(
                'td',
                { style: { width: 78 }, rowSpan: 2 },
                _react2.default.createElement(
                  'p',
                  null,
                  'उपस्तिथ रहने की मीटिंग संख्या'
                )
              ),
              _react2.default.createElement(
                'td',
                { style: { width: 78 }, rowSpan: 2 },
                _react2.default.createElement(
                  'p',
                  null,
                  'कक्षा में छात्रों की संख्या'
                )
              ),
              _react2.default.createElement(
                'td',
                { style: { width: 78 }, rowSpan: 2 },
                _react2.default.createElement(
                  'p',
                  null,
                  'कक्षा में अन्तिम परीक्षा के अनुस्वार स्थान'
                )
              )
            ),
            _react2.default.createElement(
              'tr',
              null,
              _react2.default.createElement(
                'td',
                { style: { width: 122 } },
                _react2.default.createElement(
                  'p',
                  null,
                  '\xA0'
                )
              )
            ),
            _react2.default.createElement(
              'tr',
              null,
              _react2.default.createElement(
                'td',
                { style: { width: 77 } },
                _react2.default.createElement(
                  'p',
                  null,
                  '1'
                )
              ),
              _react2.default.createElement(
                'td',
                { style: { width: 77 } },
                _react2.default.createElement(
                  'p',
                  null,
                  '2'
                )
              ),
              _react2.default.createElement(
                'td',
                { style: { width: 120 }, colSpan: 2 },
                _react2.default.createElement(
                  'p',
                  null,
                  '3'
                )
              ),
              _react2.default.createElement(
                'td',
                { style: { width: 78 } },
                _react2.default.createElement(
                  'p',
                  null,
                  '4'
                )
              ),
              _react2.default.createElement(
                'td',
                { style: { width: 78 } },
                _react2.default.createElement(
                  'p',
                  null,
                  '5'
                )
              ),
              _react2.default.createElement(
                'td',
                { style: { width: 78 } },
                _react2.default.createElement(
                  'p',
                  null,
                  '6'
                )
              ),
              _react2.default.createElement(
                'td',
                { style: { width: 78 } },
                _react2.default.createElement(
                  'p',
                  null,
                  '7'
                )
              ),
              _react2.default.createElement(
                'td',
                { style: { width: 78 } },
                _react2.default.createElement(
                  'p',
                  null,
                  '8'
                )
              ),
              _react2.default.createElement(
                'td',
                { style: { width: 122 } },
                _react2.default.createElement(
                  'p',
                  null,
                  '9'
                )
              )
            ),
            _react2.default.createElement(
              'tr',
              null,
              _react2.default.createElement(
                'td',
                { style: { width: 77 } },
                _react2.default.createElement(
                  'p',
                  null,
                  '\xA0'
                )
              ),
              _react2.default.createElement(
                'td',
                { style: { width: 77 } },
                _react2.default.createElement(
                  'p',
                  null,
                  '\xA0'
                )
              ),
              _react2.default.createElement(
                'td',
                { style: { width: 120 }, colSpan: 2 },
                _react2.default.createElement(
                  'p',
                  null,
                  '\xA0'
                )
              ),
              _react2.default.createElement(
                'td',
                { style: { width: 78 } },
                _react2.default.createElement(
                  'p',
                  null,
                  '\xA0'
                )
              ),
              _react2.default.createElement(
                'td',
                { style: { width: 78 } },
                _react2.default.createElement(
                  'p',
                  null,
                  '\xA0'
                )
              ),
              _react2.default.createElement(
                'td',
                { style: { width: 78 } },
                _react2.default.createElement(
                  'p',
                  null,
                  '\xA0'
                )
              ),
              _react2.default.createElement(
                'td',
                { style: { width: 78 } },
                _react2.default.createElement(
                  'p',
                  null,
                  '\xA0'
                )
              ),
              _react2.default.createElement(
                'td',
                { style: { width: 78 } },
                _react2.default.createElement(
                  'p',
                  null,
                  '\xA0'
                )
              ),
              _react2.default.createElement(
                'td',
                { style: { width: 122 } },
                _react2.default.createElement(
                  'p',
                  null,
                  '\xA0'
                )
              )
            ),
            _react2.default.createElement(
              'tr',
              null,
              _react2.default.createElement(
                'td',
                { style: { width: 77 } },
                _react2.default.createElement(
                  'p',
                  null,
                  '\xA0'
                )
              ),
              _react2.default.createElement(
                'td',
                { style: { width: 77 } },
                _react2.default.createElement(
                  'p',
                  null,
                  '\xA0'
                )
              ),
              _react2.default.createElement(
                'td',
                { style: { width: 120 }, colSpan: 2 },
                _react2.default.createElement(
                  'p',
                  null,
                  '\xA0'
                )
              ),
              _react2.default.createElement(
                'td',
                { style: { width: 78 } },
                _react2.default.createElement(
                  'p',
                  null,
                  '\xA0'
                )
              ),
              _react2.default.createElement(
                'td',
                { style: { width: 78 } },
                _react2.default.createElement(
                  'p',
                  null,
                  '\xA0'
                )
              ),
              _react2.default.createElement(
                'td',
                { style: { width: 78 } },
                _react2.default.createElement(
                  'p',
                  null,
                  '\xA0'
                )
              ),
              _react2.default.createElement(
                'td',
                { style: { width: 78 } },
                _react2.default.createElement(
                  'p',
                  null,
                  '\xA0'
                )
              ),
              _react2.default.createElement(
                'td',
                { style: { width: 78 } },
                _react2.default.createElement(
                  'p',
                  null,
                  '\xA0'
                )
              ),
              _react2.default.createElement(
                'td',
                { style: { width: 122 } },
                _react2.default.createElement(
                  'p',
                  null,
                  '\xA0'
                )
              )
            ),
            _react2.default.createElement(
              'tr',
              null,
              _react2.default.createElement(
                'td',
                { style: { width: 77 } },
                _react2.default.createElement(
                  'p',
                  null,
                  '\xA0'
                )
              ),
              _react2.default.createElement(
                'td',
                { style: { width: 77 } },
                _react2.default.createElement(
                  'p',
                  null,
                  '\xA0'
                )
              ),
              _react2.default.createElement(
                'td',
                { style: { width: 120 }, colSpan: 2 },
                _react2.default.createElement(
                  'p',
                  null,
                  '\xA0'
                )
              ),
              _react2.default.createElement(
                'td',
                { style: { width: 78 } },
                _react2.default.createElement(
                  'p',
                  null,
                  '\xA0'
                )
              ),
              _react2.default.createElement(
                'td',
                { style: { width: 78 } },
                _react2.default.createElement(
                  'p',
                  null,
                  '\xA0'
                )
              ),
              _react2.default.createElement(
                'td',
                { style: { width: 78 } },
                _react2.default.createElement(
                  'p',
                  null,
                  '\xA0'
                )
              ),
              _react2.default.createElement(
                'td',
                { style: { width: 78 } },
                _react2.default.createElement(
                  'p',
                  null,
                  '\xA0'
                )
              ),
              _react2.default.createElement(
                'td',
                { style: { width: 78 } },
                _react2.default.createElement(
                  'p',
                  null,
                  '\xA0'
                )
              ),
              _react2.default.createElement(
                'td',
                { style: { width: 122 } },
                _react2.default.createElement(
                  'p',
                  null,
                  '\xA0'
                )
              )
            ),
            _react2.default.createElement(
              'tr',
              null,
              _react2.default.createElement(
                'td',
                { style: { width: 77 } },
                _react2.default.createElement(
                  'p',
                  null,
                  '\xA0'
                )
              ),
              _react2.default.createElement(
                'td',
                { style: { width: 77 } },
                _react2.default.createElement(
                  'p',
                  null,
                  '\xA0'
                )
              ),
              _react2.default.createElement(
                'td',
                { style: { width: 120 }, colSpan: 2 },
                _react2.default.createElement(
                  'p',
                  null,
                  '\xA0'
                )
              ),
              _react2.default.createElement(
                'td',
                { style: { width: 78 } },
                _react2.default.createElement(
                  'p',
                  null,
                  '\xA0'
                )
              ),
              _react2.default.createElement(
                'td',
                { style: { width: 78 } },
                _react2.default.createElement(
                  'p',
                  null,
                  '\xA0'
                )
              ),
              _react2.default.createElement(
                'td',
                { style: { width: 78 } },
                _react2.default.createElement(
                  'p',
                  null,
                  '\xA0'
                )
              ),
              _react2.default.createElement(
                'td',
                { style: { width: 78 } },
                _react2.default.createElement(
                  'p',
                  null,
                  '\xA0'
                )
              ),
              _react2.default.createElement(
                'td',
                { style: { width: 78 } },
                _react2.default.createElement(
                  'p',
                  null,
                  '\xA0'
                )
              ),
              _react2.default.createElement(
                'td',
                { style: { width: 122 } },
                _react2.default.createElement(
                  'p',
                  null,
                  '\xA0'
                )
              )
            ),
            _react2.default.createElement(
              'tr',
              null,
              _react2.default.createElement(
                'td',
                { style: { width: 77 } },
                _react2.default.createElement(
                  'p',
                  null,
                  '\xA0'
                )
              ),
              _react2.default.createElement(
                'td',
                { style: { width: 77 } },
                _react2.default.createElement(
                  'p',
                  null,
                  '\xA0'
                )
              ),
              _react2.default.createElement(
                'td',
                { style: { width: 120 }, colSpan: 2 },
                _react2.default.createElement(
                  'p',
                  null,
                  '\xA0'
                )
              ),
              _react2.default.createElement(
                'td',
                { style: { width: 78 } },
                _react2.default.createElement(
                  'p',
                  null,
                  '\xA0'
                )
              ),
              _react2.default.createElement(
                'td',
                { style: { width: 78 } },
                _react2.default.createElement(
                  'p',
                  null,
                  '\xA0'
                )
              ),
              _react2.default.createElement(
                'td',
                { style: { width: 78 } },
                _react2.default.createElement(
                  'p',
                  null,
                  '\xA0'
                )
              ),
              _react2.default.createElement(
                'td',
                { style: { width: 78 } },
                _react2.default.createElement(
                  'p',
                  null,
                  '\xA0'
                )
              ),
              _react2.default.createElement(
                'td',
                { style: { width: 78 } },
                _react2.default.createElement(
                  'p',
                  null,
                  '\xA0'
                )
              ),
              _react2.default.createElement(
                'td',
                { style: { width: 122 } },
                _react2.default.createElement(
                  'p',
                  null,
                  '\xA0'
                )
              )
            ),
            _react2.default.createElement(
              'tr',
              null,
              _react2.default.createElement(
                'td',
                { style: { width: 77 } },
                _react2.default.createElement(
                  'p',
                  null,
                  '\xA0'
                )
              ),
              _react2.default.createElement(
                'td',
                { style: { width: 77 } },
                _react2.default.createElement(
                  'p',
                  null,
                  '\xA0'
                )
              ),
              _react2.default.createElement(
                'td',
                { style: { width: 120 }, colSpan: 2 },
                _react2.default.createElement(
                  'p',
                  null,
                  '\xA0'
                )
              ),
              _react2.default.createElement(
                'td',
                { style: { width: 78 } },
                _react2.default.createElement(
                  'p',
                  null,
                  '\xA0'
                )
              ),
              _react2.default.createElement(
                'td',
                { style: { width: 78 } },
                _react2.default.createElement(
                  'p',
                  null,
                  '\xA0'
                )
              ),
              _react2.default.createElement(
                'td',
                { style: { width: 78 } },
                _react2.default.createElement(
                  'p',
                  null,
                  '\xA0'
                )
              ),
              _react2.default.createElement(
                'td',
                { style: { width: 78 } },
                _react2.default.createElement(
                  'p',
                  null,
                  '\xA0'
                )
              ),
              _react2.default.createElement(
                'td',
                { style: { width: 78 } },
                _react2.default.createElement(
                  'p',
                  null,
                  '\xA0'
                )
              ),
              _react2.default.createElement(
                'td',
                { style: { width: 122 } },
                _react2.default.createElement(
                  'p',
                  null,
                  '\xA0'
                )
              )
            ),
            _react2.default.createElement(
              'tr',
              null,
              _react2.default.createElement(
                'td',
                { style: { width: 77 } },
                _react2.default.createElement(
                  'p',
                  null,
                  '\xA0'
                )
              ),
              _react2.default.createElement(
                'td',
                { style: { width: 77 } },
                _react2.default.createElement(
                  'p',
                  null,
                  '\xA0'
                )
              ),
              _react2.default.createElement(
                'td',
                { style: { width: 120 }, colSpan: 2 },
                _react2.default.createElement(
                  'p',
                  null,
                  '\xA0'
                )
              ),
              _react2.default.createElement(
                'td',
                { style: { width: 78 } },
                _react2.default.createElement(
                  'p',
                  null,
                  '\xA0'
                )
              ),
              _react2.default.createElement(
                'td',
                { style: { width: 78 } },
                _react2.default.createElement(
                  'p',
                  null,
                  '\xA0'
                )
              ),
              _react2.default.createElement(
                'td',
                { style: { width: 78 } },
                _react2.default.createElement(
                  'p',
                  null,
                  '\xA0'
                )
              ),
              _react2.default.createElement(
                'td',
                { style: { width: 78 } },
                _react2.default.createElement(
                  'p',
                  null,
                  '\xA0'
                )
              ),
              _react2.default.createElement(
                'td',
                { style: { width: 78 } },
                _react2.default.createElement(
                  'p',
                  null,
                  '\xA0'
                )
              ),
              _react2.default.createElement(
                'td',
                { style: { width: 122 } },
                _react2.default.createElement(
                  'p',
                  null,
                  '\xA0'
                )
              )
            ),
            _react2.default.createElement(
              'tr',
              null,
              _react2.default.createElement(
                'td',
                { style: { width: 77 } },
                _react2.default.createElement(
                  'p',
                  null,
                  '\xA0'
                )
              ),
              _react2.default.createElement(
                'td',
                { style: { width: 77 } },
                _react2.default.createElement(
                  'p',
                  null,
                  '\xA0'
                )
              ),
              _react2.default.createElement(
                'td',
                { style: { width: 120 }, colSpan: 2 },
                _react2.default.createElement(
                  'p',
                  null,
                  '\xA0'
                )
              ),
              _react2.default.createElement(
                'td',
                { style: { width: 78 } },
                _react2.default.createElement(
                  'p',
                  null,
                  '\xA0'
                )
              ),
              _react2.default.createElement(
                'td',
                { style: { width: 78 } },
                _react2.default.createElement(
                  'p',
                  null,
                  '\xA0'
                )
              ),
              _react2.default.createElement(
                'td',
                { style: { width: 78 } },
                _react2.default.createElement(
                  'p',
                  null,
                  '\xA0'
                )
              ),
              _react2.default.createElement(
                'td',
                { style: { width: 78 } },
                _react2.default.createElement(
                  'p',
                  null,
                  '\xA0'
                )
              ),
              _react2.default.createElement(
                'td',
                { style: { width: 78 } },
                _react2.default.createElement(
                  'p',
                  null,
                  '\xA0'
                )
              ),
              _react2.default.createElement(
                'td',
                { style: { width: 122 } },
                _react2.default.createElement(
                  'p',
                  null,
                  'संस्था प्रधान के हस्ताक्षर'
                )
              )

            )
          )
        )

      );
    }
  }]);

  return TCpdf;
}(_react.Component);

;
