'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MapPopover = undefined;

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

var _taggedTemplateLiteral2 = require('babel-runtime/helpers/taggedTemplateLiteral');

var _taggedTemplateLiteral3 = _interopRequireDefault(_taggedTemplateLiteral2);

var _class, _temp;

var _templateObject = (0, _taggedTemplateLiteral3.default)(['\n  ', '\n  font-size: 11px;\n  font-weight: 500;\n  background-color: ', ';\n  color: ', ';\n  z-index: 1001;\n  position: absolute;\n  overflow-x: auto;\n\n  .gutter {\n    height: 6px;\n  }\n\n  table {\n    margin: 2px 12px 12px 12px;\n    width: auto;\n\n    tbody {\n      border-top: transparent;\n      border-bottom: transparent;\n    }\n\n    td {\n      border-color: transparent;\n      padding: 4px;\n      color: ', ';\n    }\n\n    td.row__value {\n      text-align: right;\n      font-weight: 500;\n      color: ', ';\n    }\n  }\n'], ['\n  ', '\n  font-size: 11px;\n  font-weight: 500;\n  background-color: ', ';\n  color: ', ';\n  z-index: 1001;\n  position: absolute;\n  overflow-x: auto;\n\n  .gutter {\n    height: 6px;\n  }\n\n  table {\n    margin: 2px 12px 12px 12px;\n    width: auto;\n\n    tbody {\n      border-top: transparent;\n      border-bottom: transparent;\n    }\n\n    td {\n      border-color: transparent;\n      padding: 4px;\n      color: ', ';\n    }\n\n    td.row__value {\n      text-align: right;\n      font-weight: 500;\n      color: ', ';\n    }\n  }\n']),
    _templateObject2 = (0, _taggedTemplateLiteral3.default)(['\n  position: absolute;\n  left: 50%;\n  transform: rotate(30deg);\n  top: 10px;\n  color: ', ';\n\n  :hover {\n    cursor: pointer;\n    color: ', ';\n  }\n'], ['\n  position: absolute;\n  left: 50%;\n  transform: rotate(30deg);\n  top: 10px;\n  color: ', ';\n\n  :hover {\n    cursor: pointer;\n    color: ', ';\n  }\n']),
    _templateObject3 = (0, _taggedTemplateLiteral3.default)(['\n  color: ', ';\n  font-size: 12px;\n  letter-spacing: 0.43px;\n  text-transform: capitalize;\n  padding-left: 14px;\n  margin-top: 12px;\n\n  svg {\n    margin-right: 4px;\n  }\n'], ['\n  color: ', ';\n  font-size: 12px;\n  letter-spacing: 0.43px;\n  text-transform: capitalize;\n  padding-left: 14px;\n  margin-top: 12px;\n\n  svg {\n    margin-right: 4px;\n  }\n']); // Copyright (c) 2018 Uber Technologies, Inc.
//
// Permission is hereby granted, free of charge, to any person obtaining a copy
// of this software and associated documentation files (the "Software"), to deal
// in the Software without restriction, including without limitation the rights
// to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
// copies of the Software, and to permit persons to whom the Software is
// furnished to do so, subject to the following conditions:
//
// The above copyright notice and this permission notice shall be included in
// all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
// IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
// FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
// AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
// LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
// OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
// THE SOFTWARE.

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _styledComponents = require('styled-components');

var _styledComponents2 = _interopRequireDefault(_styledComponents);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _styledComponents3 = require('../common/styled-components');

var _icons = require('../common/icons');

var _defaultSettings = require('../../constants/default-settings');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var MAX_WIDTH = 400;
var MAX_HEIGHT = 600;

var StyledMapPopover = _styledComponents2.default.div(_templateObject, function (props) {
  return props.theme.scrollBar;
}, function (props) {
  return props.theme.panelBackground;
}, function (props) {
  return props.theme.textColor;
}, function (props) {
  return props.theme.textColor;
}, function (props) {
  return props.theme.textColorHl;
});

var StyledPin = _styledComponents2.default.div(_templateObject2, function (props) {
  return props.theme.primaryBtnBgd;
}, function (props) {
  return props.theme.linkBtnColor;
});

var StyledLayerName = _styledComponents3.CenterFlexbox.extend(_templateObject3, function (props) {
  return props.theme.textColorHl;
});

var MapPopover = exports.MapPopover = (_temp = _class = function (_Component) {
  (0, _inherits3.default)(MapPopover, _Component);

  function MapPopover(props) {
    (0, _classCallCheck3.default)(this, MapPopover);

    var _this = (0, _possibleConstructorReturn3.default)(this, (MapPopover.__proto__ || Object.getPrototypeOf(MapPopover)).call(this, props));

    _this.state = {
      isMouseOver: false,
      width: 380,
      height: 160
    };
    return _this;
  }

  (0, _createClass3.default)(MapPopover, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      this._setContainerSize();
    }
  }, {
    key: 'componentDidUpdate',
    value: function componentDidUpdate() {
      this._setContainerSize();
    }
  }, {
    key: '_setContainerSize',
    value: function _setContainerSize() {
      var node = this.popover;
      if (!node) {
        return;
      }

      var width = Math.min(node.scrollWidth, MAX_WIDTH);
      var height = Math.min(node.scrollHeight, MAX_HEIGHT);

      if (width !== this.state.width || height !== this.state.height) {
        this.setState({ width: width, height: height });
      }
    }
  }, {
    key: '_getPosition',
    value: function _getPosition(x, y) {
      var topOffset = 30;
      var leftOffset = 30;
      var mapState = this.props.mapState;
      var _state = this.state,
          width = _state.width,
          height = _state.height;

      var pos = {};
      if (x + leftOffset + width > mapState.width) {
        pos.right = mapState.width - x + leftOffset;
      } else {
        pos.left = x + leftOffset;
      }

      if (y + topOffset + height > mapState.height) {
        pos.bottom = 10;
      } else {
        pos.top = y + topOffset;
      }

      return pos;
    }
  }, {
    key: 'render',
    value: function render() {
      var _this2 = this;

      var _props = this.props,
          x = _props.x,
          y = _props.y,
          isVisible = _props.isVisible,
          data = _props.data,
          layer = _props.layer,
          freezed = _props.freezed,
          fields = _props.fields,
          _props$fieldsToShow = _props.fieldsToShow,
          fieldsToShow = _props$fieldsToShow === undefined ? [] : _props$fieldsToShow;

      var hidden = !isVisible && !this.state.isMouseOver;
      var width = this.state.width;


      if (!data || !layer || !fieldsToShow.length) {
        return null;
      }

      var infoProps = { data: data, layer: layer, fieldsToShow: fieldsToShow, fields: fields };

      var style = Number.isFinite(x) && Number.isFinite(y) ? this._getPosition(x, y) : {};

      return _react2.default.createElement(
        StyledMapPopover,
        {
          innerRef: function innerRef(comp) {
            _this2.popover = comp;
          },
          className: (0, _classnames2.default)('map-popover', { hidden: hidden }),
          style: (0, _extends3.default)({}, style, {
            maxWidth: width
          }),
          onMouseEnter: function onMouseEnter() {
            _this2.setState({ isMouseOver: true });
          },
          onMouseLeave: function onMouseLeave() {
            _this2.setState({ isMouseOver: false });
          }
        },
        freezed ? _react2.default.createElement(
          'div',
          { className: 'map-popover__top' },
          _react2.default.createElement('div', { className: 'gutter' }),
          _react2.default.createElement(
            StyledPin,
            { className: 'popover-pin', onClick: this.props.onClose },
            _react2.default.createElement(_icons.Pin, { height: '16px' })
          )
        ) : null,
        _react2.default.createElement(
          StyledLayerName,
          { className: 'map-popover__layer-name' },
          _react2.default.createElement(_icons.Layers, { height: '12px' }),
          layer.config.label
        ),
        _react2.default.createElement(
          'table',
          { className: 'map-popover__table' },
          layer.isAggregated ? _react2.default.createElement(CellInfo, infoProps) : _react2.default.createElement(EntryInfo, infoProps)
        )
      );
    }
  }]);
  return MapPopover;
}(_react.Component), _class.propTypes = {
  fields: _propTypes2.default.arrayOf(_propTypes2.default.any),
  fieldsToShow: _propTypes2.default.arrayOf(_propTypes2.default.any),
  isVisible: _propTypes2.default.bool,
  layer: _propTypes2.default.object,
  data: _propTypes2.default.oneOfType([_propTypes2.default.arrayOf(_propTypes2.default.any), _propTypes2.default.object]),
  freezed: _propTypes2.default.bool,
  x: _propTypes2.default.number,
  y: _propTypes2.default.number,
  onClose: _propTypes2.default.func,
  mapState: _propTypes2.default.object.isRequired
}, _temp);


var Row = function Row(_ref) {
  var name = _ref.name,
      value = _ref.value,
      url = _ref.url;

  // Set 'url' to 'value' if it looks like a url
  if (!url && value && typeof value === 'string' && value.match(/^http/)) {
    url = value;
  }

  var asImg = /<img>/.test(name);
  return _react2.default.createElement(
    'tr',
    { className: 'row', key: name },
    _react2.default.createElement(
      'td',
      { className: 'row__name' },
      name
    ),
    _react2.default.createElement(
      'td',
      { className: 'row__value' },
      asImg ? _react2.default.createElement('img', { src: value }) : url ? _react2.default.createElement(
        'a',
        { target: '_blank', rel: 'noopener noreferrer', href: url },
        value
      ) : value
    )
  );
};

var EntryInfo = function EntryInfo(_ref2) {
  var fieldsToShow = _ref2.fieldsToShow,
      fields = _ref2.fields,
      data = _ref2.data;
  return _react2.default.createElement(
    'tbody',
    null,
    fieldsToShow.map(function (name) {
      return _react2.default.createElement(EntryInfoRow, { key: name, name: name, fields: fields, data: data });
    })
  );
};

var EntryInfoRow = function EntryInfoRow(_ref3) {
  var name = _ref3.name,
      fields = _ref3.fields,
      data = _ref3.data;

  var field = fields.find(function (f) {
    return f.name === name;
  });
  if (!field) {
    return null;
  }

  var valueIdx = field.tableFieldIndex - 1;
  var format = _getCellFormat(field.type);

  return _react2.default.createElement(Row, { name: name, value: format ? format(data[valueIdx]) : data[valueIdx] });
};

var CellInfo = function CellInfo(_ref4) {
  var data = _ref4.data,
      layer = _ref4.layer;
  var _layer$config = layer.config,
      colorField = _layer$config.colorField,
      sizeField = _layer$config.sizeField;


  return _react2.default.createElement(
    'tbody',
    null,
    _react2.default.createElement(Row, { name: 'total points', key: 'count', value: data.points && data.points.length }),
    colorField && layer.visualChannels.color ? _react2.default.createElement(Row, {
      name: layer.getVisualChannelDescription('color').measure,
      key: 'color',
      value: data.colorValue || 'N/A'
    }) : null,
    sizeField && layer.visualChannels.size ? _react2.default.createElement(Row, {
      name: layer.getVisualChannelDescription('size').measure,
      key: 'size',
      value: data.elevationValue || 'N/A'
    }) : null
  );
};

function _getCellFormat(type) {
  return _defaultSettings.FIELD_DISPLAY_FORMAT[type];
}

var MapPopoverFactory = function MapPopoverFactory() {
  return MapPopover;
};
exports.default = MapPopoverFactory;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9jb21wb25lbnRzL21hcC9tYXAtcG9wb3Zlci5qcyJdLCJuYW1lcyI6WyJNQVhfV0lEVEgiLCJNQVhfSEVJR0hUIiwiU3R5bGVkTWFwUG9wb3ZlciIsInN0eWxlZCIsImRpdiIsInByb3BzIiwidGhlbWUiLCJzY3JvbGxCYXIiLCJwYW5lbEJhY2tncm91bmQiLCJ0ZXh0Q29sb3IiLCJ0ZXh0Q29sb3JIbCIsIlN0eWxlZFBpbiIsInByaW1hcnlCdG5CZ2QiLCJsaW5rQnRuQ29sb3IiLCJTdHlsZWRMYXllck5hbWUiLCJDZW50ZXJGbGV4Ym94IiwiZXh0ZW5kIiwiTWFwUG9wb3ZlciIsInN0YXRlIiwiaXNNb3VzZU92ZXIiLCJ3aWR0aCIsImhlaWdodCIsIl9zZXRDb250YWluZXJTaXplIiwibm9kZSIsInBvcG92ZXIiLCJNYXRoIiwibWluIiwic2Nyb2xsV2lkdGgiLCJzY3JvbGxIZWlnaHQiLCJzZXRTdGF0ZSIsIngiLCJ5IiwidG9wT2Zmc2V0IiwibGVmdE9mZnNldCIsIm1hcFN0YXRlIiwicG9zIiwicmlnaHQiLCJsZWZ0IiwiYm90dG9tIiwidG9wIiwiaXNWaXNpYmxlIiwiZGF0YSIsImxheWVyIiwiZnJlZXplZCIsImZpZWxkcyIsImZpZWxkc1RvU2hvdyIsImhpZGRlbiIsImxlbmd0aCIsImluZm9Qcm9wcyIsInN0eWxlIiwiTnVtYmVyIiwiaXNGaW5pdGUiLCJfZ2V0UG9zaXRpb24iLCJjb21wIiwibWF4V2lkdGgiLCJvbkNsb3NlIiwiY29uZmlnIiwibGFiZWwiLCJpc0FnZ3JlZ2F0ZWQiLCJDb21wb25lbnQiLCJwcm9wVHlwZXMiLCJQcm9wVHlwZXMiLCJhcnJheU9mIiwiYW55IiwiYm9vbCIsIm9iamVjdCIsIm9uZU9mVHlwZSIsIm51bWJlciIsImZ1bmMiLCJpc1JlcXVpcmVkIiwiUm93IiwibmFtZSIsInZhbHVlIiwidXJsIiwibWF0Y2giLCJhc0ltZyIsInRlc3QiLCJFbnRyeUluZm8iLCJtYXAiLCJFbnRyeUluZm9Sb3ciLCJmaWVsZCIsImZpbmQiLCJmIiwidmFsdWVJZHgiLCJ0YWJsZUZpZWxkSW5kZXgiLCJmb3JtYXQiLCJfZ2V0Q2VsbEZvcm1hdCIsInR5cGUiLCJDZWxsSW5mbyIsImNvbG9yRmllbGQiLCJzaXplRmllbGQiLCJwb2ludHMiLCJ2aXN1YWxDaGFubmVscyIsImNvbG9yIiwiZ2V0VmlzdWFsQ2hhbm5lbERlc2NyaXB0aW9uIiwibWVhc3VyZSIsImNvbG9yVmFsdWUiLCJzaXplIiwiZWxldmF0aW9uVmFsdWUiLCJGSUVMRF9ESVNQTEFZX0ZPUk1BVCIsIk1hcFBvcG92ZXJGYWN0b3J5Il0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztpYkFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOztBQUNBOztBQUNBOzs7O0FBRUEsSUFBTUEsWUFBWSxHQUFsQjtBQUNBLElBQU1DLGFBQWEsR0FBbkI7O0FBRUEsSUFBTUMsbUJBQW1CQywyQkFBT0MsR0FBMUIsa0JBQ0Y7QUFBQSxTQUFTQyxNQUFNQyxLQUFOLENBQVlDLFNBQXJCO0FBQUEsQ0FERSxFQUlnQjtBQUFBLFNBQVNGLE1BQU1DLEtBQU4sQ0FBWUUsZUFBckI7QUFBQSxDQUpoQixFQUtLO0FBQUEsU0FBU0gsTUFBTUMsS0FBTixDQUFZRyxTQUFyQjtBQUFBLENBTEwsRUEwQlM7QUFBQSxTQUFTSixNQUFNQyxLQUFOLENBQVlHLFNBQXJCO0FBQUEsQ0ExQlQsRUFnQ1M7QUFBQSxTQUFTSixNQUFNQyxLQUFOLENBQVlJLFdBQXJCO0FBQUEsQ0FoQ1QsQ0FBTjs7QUFxQ0EsSUFBTUMsWUFBWVIsMkJBQU9DLEdBQW5CLG1CQUtLO0FBQUEsU0FBU0MsTUFBTUMsS0FBTixDQUFZTSxhQUFyQjtBQUFBLENBTEwsRUFTTztBQUFBLFNB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WEEsUUFBVyxRQUFtQjtBQUFBLE1BQWpCL0MsSUFBaUIsU0FBakJBLElBQWlCO0FBQUEsTUFBWEMsS0FBVyxTQUFYQSxLQUFXO0FBQUEsc0JBQ0ZBLE1BQU1jLE1BREo7QUFBQSxNQUMzQmlDLFVBRDJCLGlCQUMzQkEsVUFEMkI7QUFBQSxNQUNmQyxTQURlLGlCQUNmQSxTQURlOzs7QUFHbEMsU0FDRTtBQUFBO0FBQUE7QUFDRSxrQ0FBQyxHQUFELElBQUssTUFBTSxjQUFYLEVBQTJCLEtBQUksT0FBL0IsRUFBdUMsT0FBT2pELEtBQUtrRCxNQUFMLElBQWVsRCxLQUFLa0QsTUFBTCxDQUFZNUMsTUFBekUsR0FERjtBQUVHMEMsa0JBQWMvQyxNQUFNa0QsY0FBTixDQUFxQkMsS0FBbkMsR0FDQyw4QkFBQyxHQUFEO0FBQ0UsWUFBTW5ELE1BQU1vRCwyQkFBTixDQUFrQyxPQUFsQyxFQUEyQ0MsT0FEbkQ7QUFFRSxXQUFJLE9BRk47QUFHRSxhQUFPdEQsS0FBS3VELFVBQUwsSUFBbUI7QUFINUIsTUFERCxHQU1HLElBUk47QUFTR04saUJBQWFoRCxNQUFNa0QsY0FBTixDQUFxQkssSUFBbEMsR0FDQyw4QkFBQyxHQUFEO0FBQ0UsWUFBTXZELE1BQU1vRCwyQkFBTixDQUFrQyxNQUFsQyxFQUEwQ0MsT0FEbEQ7QUFFRSxXQUFJLE1BRk47QUFHRSxhQUFPdEQsS0FBS3lELGNBQUwsSUFBdUI7QUFIaEMsTUFERCxHQU1HO0FBZk4sR0FERjtBQW1CRCxDQXRCRDs7QUF3QkEsU0FBU1osY0FBVCxDQUF3QkMsSUFBeEIsRUFBOEI7QUFDNUIsU0FBT1ksc0NBQXFCWixJQUFyQixDQUFQO0FBQ0Q7O0FBRUQsSUFBTWEsb0JBQXFCLFNBQXJCQSxpQkFBcUI7QUFBQSxTQUFNbkYsVUFBTjtBQUFBLENBQTNCO2tCQUNlbUYsaUIiLCJmaWxlIjoibWFwLXBvcG92ZXIuanMiLCJzb3VyY2VzQ29udGVudCI6WyIvLyBDb3B5cmlnaHQgKGMpIDIwMTggVWJlciBUZWNobm9sb2dpZXMsIEluYy5cbi8vXG4vLyBQZXJtaXNzaW9uIGlzIGhlcmVieSBncmFudGVkLCBmcmVlIG9mIGNoYXJnZSwgdG8gYW55IHBlcnNvbiBvYnRhaW5pbmcgYSBjb3B5XG4vLyBvZiB0aGlzIHNvZnR3YXJlIGFuZCBhc3NvY2lhdGVkIGRvY3VtZW50YXRpb24gZmlsZXMgKHRoZSBcIlNvZnR3YXJlXCIpLCB0byBkZWFsXG4vLyBpbiB0aGUgU29mdHdhcmUgd2l0aG91dCByZXN0cmljdGlvbiwgaW5jbHVkaW5nIHdpdGhvdXQgbGltaXRhdGlvbiB0aGUgcmlnaHRzXG4vLyB0byB1c2UsIGNvcHksIG1vZGlmeSwgbWVyZ2UsIHB1Ymxpc2gsIGRpc3RyaWJ1dGUsIHN1YmxpY2Vuc2UsIGFuZC9vciBzZWxsXG4vLyBjb3BpZXMgb2YgdGhlIFNvZnR3YXJlLCBhbmQgdG8gcGVybWl0IHBlcnNvbnMgdG8gd2hvbSB0aGUgU29mdHdhcmUgaXNcbi8vIGZ1cm5pc2hlZCB0byBkbyBzbywgc3ViamVjdCB0byB0aGUgZm9sbG93aW5nIGNvbmRpdGlvbnM6XG4vL1xuLy8gVGhlIGFib3ZlIGNvcHlyaWdodCBub3RpY2UgYW5kIHRoaXMgcGVybWlzc2lvbiBub3RpY2Ugc2hhbGwgYmUgaW5jbHVkZWQgaW5cbi8vIGFsbCBjb3BpZXMgb3Igc3Vic3RhbnRpYWwgcG9ydGlvbnMgb2YgdGhlIFNvZnR3YXJlLlxuLy9cbi8vIFRIRSBTT0ZUV0FSRSBJUyBQUk9WSURFRCBcIkFTIElTXCIsIFdJVEhPVVQgV0FSUkFOVFkgT0YgQU5ZIEtJTkQsIEVYUFJFU1MgT1Jcbi8vIElNUExJRUQsIElOQ0xVRElORyBCVVQgTk9UIExJTUlURUQgVE8gVEhFIFdBUlJBTlRJRVMgT0YgTUVSQ0hBTlRBQklMSVRZLFxuLy8gRklUTkVTUyBGT1IgQSBQQVJUSUNVTEFSIFBVUlBPU0UgQU5EIE5PTklORlJJTkdFTUVOVC4gSU4gTk8gRVZFTlQgU0hBTEwgVEhFXG4vLyBBVVRIT1JTIE9SIENPUFlSSUdIVCBIT0xERVJTIEJFIExJQUJMRSBGT1IgQU5ZIENMQUlNLCBEQU1BR0VTIE9SIE9USEVSXG4vLyBMSUFCSUxJVFksIFdIRVRIRVIgSU4gQU4gQUNUSU9OIE9GIENPTlRSQUNULCBUT1JUIE9SIE9USEVSV0lTRSwgQVJJU0lORyBGUk9NLFxuLy8gT1VUIE9GIE9SIElOIENPTk5FQ1RJT04gV0lUSCBUSEUgU09GVFdBUkUgT1IgVEhFIFVTRSBPUiBPVEhFUiBERUFMSU5HUyBJTlxuLy8gVEhFIFNPRlRXQVJFLlxuXG5pbXBvcnQgUmVhY3QsIHtDb21wb25lbnR9IGZyb20gJ3JlYWN0JztcbmltcG9ydCBzdHlsZWQgZnJvbSAnc3R5bGVkLWNvbXBvbmVudHMnO1xuaW1wb3J0IFByb3BUeXBlcyBmcm9tICdwcm9wLXR5cGVzJztcbmltcG9ydCBjbGFzc25hbWVzIGZyb20gJ2NsYXNzbmFtZXMnO1xuaW1wb3J0IHtDZW50ZXJGbGV4Ym94fSBmcm9tICdjb21wb25lbnRzL2NvbW1vbi9zdHlsZWQtY29tcG9uZW50cyc7XG5pbXBvcnQge1BpbiwgTGF5ZXJzfSBmcm9tICdjb21wb25lbnRzL2NvbW1vbi9pY29ucyc7XG5pbXBvcnQge0ZJRUxEX0RJU1BMQVlfRk9STUFUfSBmcm9tICdjb25zdGFudHMvZGVmYXVsdC1zZXR0aW5ncyc7XG5cbmNvbnN0IE1BWF9XSURUSCA9IDQwMDtcbmNvbnN0IE1BWF9IRUlHSFQgPSA2MDA7XG5cbmNvbnN0IFN0eWxlZE1hcFBvcG92ZXIgPSBzdHlsZWQuZGl2YFxuICAke3Byb3BzID0+IHByb3BzLnRoZW1lLnNjcm9sbEJhcn1cbiAgZm9udC1zaXplOiAxMXB4O1xuICBmb250LXdlaWdodDogNTAwO1xuICBiYWNrZ3JvdW5kLWNvbG9yOiAke3Byb3BzID0+IHByb3BzLnRoZW1lLnBhbmVsQmFja2dyb3VuZH07XG4gIGNvbG9yOiAke3Byb3BzID0+IHByb3BzLnRoZW1lLnRleHRDb2xvcn07XG4gIHotaW5kZXg6IDEwMDE7XG4gIHBvc2l0aW9uOiBhYnNvbHV0ZTtcbiAgb3ZlcmZsb3cteDogYXV0bztcblxuICAuZ3V0dGVyIHtcbiAgICBoZWlnaHQ6IDZweDtcbiAgfVxuXG4gIHRhYmxlIHtcbiAgICBtYXJnaW46IDJweCAxMnB4IDEycHggMTJweDtcbiAgICB3aWR0aDogYXV0bztcblxuICAgIHRib2R5IHtcbiAgICAgIGJvcmRlci10b3A6IHRyYW5zcGFyZW50O1xuICAgICAgYm9yZGVyLWJvdHRvbTogdHJhbnNwYXJlbnQ7XG4gICAgfVxuXG4gICAgdGQge1xuICAgICAgYm9yZGVyLWNvbG9yOiB0cmFuc3BhcmVudDtcbiAgICAgIHBhZGRpbmc6IDRweDtcbiAgICAgIGNvbG9yOiAke3Byb3BzID0+IHByb3BzLnRoZW1lLnRleHRDb2xvcn07XG4gICAgfVxuXG4gICAgdGQucm93X192YWx1ZSB7XG4gICAgICB0ZXh0LWFsaWduOiByaWdodDtcbiAgICAgIGZvbnQtd2VpZ2h0OiA1MDA7XG4gICAgICBjb2xvcjogJHtwcm9wcyA9PiBwcm9wcy50aGVtZS50ZXh0Q29sb3JIbH07XG4gICAgfVxuICB9XG5gO1xuXG5jb25zdCBTdHlsZWRQaW4gPSBzdHlsZWQuZGl2YFxuICBwb3NpdGlvbjogYWJzb2x1dGU7XG4gIGxlZnQ6IDUwJTtcbiAgdHJhbnNmb3JtOiByb3RhdGUoMzBkZWcpO1xuICB0b3A6IDEwcHg7XG4gIGNvbG9yOiAke3Byb3BzID0+IHByb3BzLnRoZW1lLnByaW1hcnlCdG5CZ2R9O1xuXG4gIDpob3ZlciB7XG4gICAgY3Vyc29yOiBwb2ludGVyO1xuICAgIGNvbG9yOiAke3Byb3BzID0+IHByb3BzLnRoZW1lLmxpbmtCdG5Db2xvcn07XG4gIH1cbmA7XG5cbmNvbnN0IFN0eWxlZExheWVyTmFtZSA9IENlbnRlckZsZXhib3guZXh0ZW5kYFxuICBjb2xvcjogJHtwcm9wcyA9PiBwcm9wcy50aGVtZS50ZXh0Q29sb3JIbH07XG4gIGZvbnQtc2l6ZTogMTJweDtcbiAgbGV0dGVyLXNwYWNpbmc6IDAuNDNweDtcbiAgdGV4dC10cmFuc2Zvcm06IGNhcGl0YWxpemU7XG4gIHBhZGRpbmctbGVmdDogMTRweDtcbiAgbWFyZ2luLXRvcDogMTJweDtcblxuICBzdmcge1xuICAgIG1hcmdpbi1yaWdodDogNHB4O1xuICB9XG5gO1xuXG5leHBvcnQgY2xhc3MgTWFwUG9wb3ZlciBleHRlbmRzIENvbXBvbmVudCB7XG4gIHN0YXRpYyBwcm9wVHlwZXMgPSB7XG4gICAgZmllbGRzOiBQcm9wVHlwZXMuYXJyYXlPZihQcm9wVHlwZXMuYW55KSxcbiAgICBmaWVsZHNUb1Nob3c6IFByb3BUeXBlcy5hcnJheU9mKFByb3BUeXBlcy5hbnkpLFxuICAgIGlzVmlzaWJsZTogUHJvcFR5cGVzLmJvb2wsXG4gICAgbGF5ZXI6IFByb3BUeXBlcy5vYmplY3QsXG4gICAgZGF0YTogUHJvcFR5cGVzLm9uZU9mVHlwZShbUHJvcFR5cGVzLmFycmF5T2YoUHJvcFR5cGVzLmFueSksIFByb3BUeXBlcy5vYmplY3RdKSxcbiAgICBmcmVlemVkOiBQcm9wVHlwZXMuYm9vbCxcbiAgICB4OiBQcm9wVHlwZXMubnVtYmVyLFxuICAgIHk6IFByb3BUeXBlcy5udW1iZXIsXG4gICAgb25DbG9zZTogUHJvcFR5cGVzLmZ1bmMsXG4gICAgbWFwU3RhdGU6IFByb3BUeXBlcy5vYmplY3QuaXNSZXF1aXJlZFxuICB9O1xuXG4gIGNvbnN0cnVjdG9yKHByb3BzKSB7XG4gICAgc3VwZXIocHJvcHMpO1xuICAgIHRoaXMuc3RhdGUgPSB7XG4gICAgICBpc01vdXNlT3ZlcjogZmFsc2UsXG4gICAgICB3aWR0aDogMzgwLFxuICAgICAgaGVpZ2h0OiAxNjBcbiAgICB9O1xuICB9XG5cbiAgY29tcG9uZW50RGlkTW91bnQoKSB7XG4gICAgdGhpcy5fc2V0Q29udGFpbmVyU2l6ZSgpO1xuICB9XG5cbiAgY29tcG9uZW50RGlkVXBkYXRlKCkge1xuICAgIHRoaXMuX3NldENvbnRhaW5lclNpemUoKTtcbiAgfVxuXG4gIF9zZXRDb250YWluZXJTaXplKCkge1xuICAgIGNvbnN0IG5vZGUgPSB0aGlzLnBvcG92ZXI7XG4gICAgaWYgKCFub2RlKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgY29uc3Qgd2lkdGggPSBNYXRoLm1pbihub2RlLnNjcm9sbFdpZHRoLCBNQVhfV0lEVEgpO1xuICAgIGNvbnN0IGhlaWdodCA9IE1hdGgubWluKG5vZGUuc2Nyb2xsSGVpZ2h0LCBNQVhfSEVJR0hUKTtcblxuICAgIGlmICh3aWR0aCAhPT0gdGhpcy5zdGF0ZS53aWR0aCB8fCBoZWlnaHQgIT09IHRoaXMuc3RhdGUuaGVpZ2h0KSB7XG4gICAgICB0aGlzLnNldFN0YXRlKHt3aWR0aCwgaGVpZ2h0fSk7XG4gICAgfVxuICB9XG5cbiAgX2dldFBvc2l0aW9uKHgsIHkpIHtcbiAgICBjb25zdCB0b3BPZmZzZXQgPSAzMDtcbiAgICBjb25zdCBsZWZ0T2Zmc2V0ID0gMzA7XG4gICAgY29uc3Qge21hcFN0YXRlfSA9IHRoaXMucHJvcHM7XG4gICAgY29uc3Qge3dpZHRoLCBoZWlnaHR9ID0gdGhpcy5zdGF0ZTtcbiAgICBjb25zdCBwb3MgPSB7fTtcbiAgICBpZiAoeCArIGxlZnRPZmZzZXQgKyB3aWR0aCA+IG1hcFN0YXRlLndpZHRoKSB7XG4gICAgICBwb3MucmlnaHQgPSBtYXBTdGF0ZS53aWR0aCAtIHggKyBsZWZ0T2Zmc2V0O1xuICAgIH0gZWxzZSB7XG4gICAgICBwb3MubGVmdCA9IHggKyBsZWZ0T2Zmc2V0O1xuICAgIH1cblxuICAgIGlmICh5ICsgdG9wT2Zmc2V0ICsgaGVpZ2h0ID4gbWFwU3RhdGUuaGVpZ2h0KSB7XG4gICAgICBwb3MuYm90dG9tID0gMTA7XG4gICAgfSBlbHNlIHtcbiAgICAgIHBvcy50b3AgPSB5ICsgdG9wT2Zmc2V0O1xuICAgIH1cblxuICAgIHJldHVybiBwb3M7XG4gIH1cblxuICByZW5kZXIoKSB7XG4gICAgY29uc3Qge1xuICAgICAgeCxcbiAgICAgIHksXG4gICAgICBpc1Zpc2libGUsXG4gICAgICBkYXRhLFxuICAgICAgbGF5ZXIsXG4gICAgICBmcmVlemVkLFxuICAgICAgZmllbGRzLFxuICAgICAgZmllbGRzVG9TaG93ID0gW11cbiAgICB9ID0gdGhpcy5wcm9wcztcbiAgICBjb25zdCBoaWRkZW4gPSAhaXNWaXNpYmxlICYmICF0aGlzLnN0YXRlLmlzTW91c2VPdmVyO1xuICAgIGNvbnN0IHt3aWR0aH0gPSB0aGlzLnN0YXRlO1xuXG4gICAgaWYgKCFkYXRhIHx8ICFsYXllciB8fCAhZmllbGRzVG9TaG93Lmxlbmd0aCkge1xuICAgICAgcmV0dXJuIG51bGw7XG4gICAgfVxuXG4gICAgY29uc3QgaW5mb1Byb3BzID0ge2RhdGEsIGxheWVyLCBmaWVsZHNUb1Nob3csIGZpZWxkc307XG5cbiAgICBjb25zdCBzdHlsZSA9XG4gICAgICBOdW1iZXIuaXNGaW5pdGUoeCkgJiYgTnVtYmVyLmlzRmluaXRlKHkpID8gdGhpcy5fZ2V0UG9zaXRpb24oeCwgeSkgOiB7fTtcblxuICAgIHJldHVybiAoXG4gICAgICA8U3R5bGVkTWFwUG9wb3ZlclxuICAgICAgICBpbm5lclJlZj17Y29tcCA9PiB7XG4gICAgICAgICAgdGhpcy5wb3BvdmVyID0gY29tcDtcbiAgICAgICAgfX1cbiAgICAgICAgY2xhc3NOYW1lPXtjbGFzc25hbWVzKCdtYXAtcG9wb3ZlcicsIHtoaWRkZW59KX1cbiAgICAgICAgc3R5bGU9e3tcbiAgICAgICAgICAuLi5zdHlsZSxcbiAgICAgICAgICBtYXhXaWR0aDogd2lkdGhcbiAgICAgICAgfX1cbiAgICAgICAgb25Nb3VzZUVudGVyPXsoKSA9PiB7XG4gICAgICAgICAgdGhpcy5zZXRTdGF0ZSh7aXNNb3VzZU92ZXI6IHRydWV9KTtcbiAgICAgICAgfX1cbiAgICAgICAgb25Nb3VzZUxlYXZlPXsoKSA9PiB7XG4gICAgICAgICAgdGhpcy5zZXRTdGF0ZSh7aXNNb3VzZU92ZXI6IGZhbHNlfSk7XG4gICAgICAgIH19XG4gICAgICA+XG4gICAgICAgIHtmcmVlemVkID8gKFxuICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwibWFwLXBvcG92ZXJfX3RvcFwiPlxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJndXR0ZXJcIiAvPlxuICAgICAgICAgICAgPFN0eWxlZFBpbiBjbGFzc05hbWU9XCJwb3BvdmVyLXBpblwiIG9uQ2xpY2s9e3RoaXMucHJvcHMub25DbG9zZX0+XG4gICAgICAgICAgICAgIDxQaW4gaGVpZ2h0PVwiMTZweFwiIC8+XG4gICAgICAgICAgICA8L1N0eWxlZFBpbj5cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgKSA6IG51bGx9XG4gICAgICAgIDxTdHlsZWRMYXllck5hbWUgY2xhc3NOYW1lPVwibWFwLXBvcG92ZXJfX2xheWVyLW5hbWVcIj5cbiAgICAgICAgICA8TGF5ZXJzIGhlaWdodD1cIjEycHhcIi8+e2xheWVyLmNvbmZpZy5sYWJlbH08L1N0eWxlZExheWVyTmFtZT5cbiAgICAgICAgPHRhYmxlIGNsYXNzTmFtZT1cIm1hcC1wb3BvdmVyX190YWJsZVwiPlxuICAgICAgICAgIHtsYXllci5pc0FnZ3JlZ2F0ZWQgPyAoXG4gICAgICAgICAgICA8Q2VsbEluZm8gey4uLmluZm9Qcm9wc30gLz5cbiAgICAgICAgICApIDogKFxuICAgICAgICAgICAgPEVudHJ5SW5mbyB7Li4uaW5mb1Byb3BzfSAvPlxuICAgICAgICAgICl9XG4gICAgICAgIDwvdGFibGU+XG4gICAgICA8L1N0eWxlZE1hcFBvcG92ZXI+XG4gICAgKTtcbiAgfVxufVxuXG5jb25zdCBSb3cgPSAoe25hbWUsIHZhbHVlLCB1cmx9KSA9PiB7XG4gIC8vIFNldCAndXJsJyB0byAndmFsdWUnIGlmIGl0IGxvb2tzIGxpa2UgYSB1cmxcbiAgaWYgKCF1cmwgJiYgdmFsdWUgJiYgdHlwZW9mIHZhbHVlID09PSAnc3RyaW5nJyAmJiB2YWx1ZS5tYXRjaCgvXmh0dHAvKSkge1xuICAgIHVybCA9IHZhbHVlO1xuICB9XG5cbiAgY29uc3QgYXNJbWcgPSAvPGltZz4vLnRlc3QobmFtZSk7XG4gIHJldHVybiAoXG4gICAgPHRyIGNsYXNzTmFtZT1cInJvd1wiIGtleT17bmFtZX0+XG4gICAgICA8dGQgY2xhc3NOYW1lPVwicm93X19uYW1lXCI+e25hbWV9PC90ZD5cbiAgICAgIDx0ZCBjbGFzc05hbWU9XCJyb3dfX3ZhbHVlXCI+XG4gICAgICAgIHthc0ltZyA/IChcbiAgICAgICAgICA8aW1nIHNyYz17dmFsdWV9IC8+XG4gICAgICAgICkgOiB1cmwgPyAoXG4gICAgICAgICAgPGEgdGFyZ2V0PVwiX2JsYW5rXCIgcmVsPVwibm9vcGVuZXIgbm9yZWZlcnJlclwiIGhyZWY9e3VybH0+XG4gICAgICAgICAgICB7dmFsdWV9XG4gICAgICAgICAgPC9hPlxuICAgICAgICApIDogKFxuICAgICAgICAgIHZhbHVlXG4gICAgICAgICl9XG4gICAgICA8L3RkPlxuICAgIDwvdHI+XG4gICk7XG59O1xuXG5jb25zdCBFbnRyeUluZm8gPSAoe2ZpZWxkc1RvU2hvdywgZmllbGRzLCBkYXRhfSkgPT4gKFxuICA8dGJvZHk+XG4gICAge2ZpZWxkc1RvU2hvdy5tYXAobmFtZSA9PiAoXG4gICAgICA8RW50cnlJbmZvUm93IGtleT17bmFtZX0gbmFtZT17bmFtZX0gZmllbGRzPXtmaWVsZHN9IGRhdGE9e2RhdGF9IC8+XG4gICAgKSl9XG4gIDwvdGJvZHk+XG4pO1xuXG5jb25zdCBFbnRyeUluZm9Sb3cgPSAoe25hbWUsIGZpZWxkcywgZGF0YX0pID0+IHtcbiAgY29uc3QgZmllbGQgPSBmaWVsZHMuZmluZChmID0+IGYubmFtZSA9PT0gbmFtZSk7XG4gIGlmICghZmllbGQpIHtcbiAgICByZXR1cm4gbnVsbDtcbiAgfVxuXG4gIGNvbnN0IHZhbHVlSWR4ID0gZmllbGQudGFibGVGaWVsZEluZGV4IC0gMTtcbiAgY29uc3QgZm9ybWF0ID0gX2dldENlbGxGb3JtYXQoZmllbGQudHlwZSk7XG5cbiAgcmV0dXJuIChcbiAgICA8Um93IG5hbWU9e25hbWV9IHZhbHVlPXtmb3JtYXQgPyBmb3JtYXQoZGF0YVt2YWx1ZUlkeF0pIDogZGF0YVt2YWx1ZUlkeF19IC8+XG4gICk7XG59O1xuXG5jb25zdCBDZWxsSW5mbyA9ICh7ZGF0YSwgbGF5ZXJ9KSA9PiB7XG4gIGNvbnN0IHtjb2xvckZpZWxkLCBzaXplRmllbGR9ID0gbGF5ZXIuY29uZmlnO1xuXG4gIHJldHVybiAoXG4gICAgPHRib2R5PlxuICAgICAgPFJvdyBuYW1lPXsndG90YWwgcG9pbnRzJ30ga2V5PVwiY291bnRcIiB2YWx1ZT17ZGF0YS5wb2ludHMgJiYgZGF0YS5wb2ludHMubGVuZ3RofSAvPlxuICAgICAge2NvbG9yRmllbGQgJiYgbGF5ZXIudmlzdWFsQ2hhbm5lbHMuY29sb3IgPyAoXG4gICAgICAgIDxSb3dcbiAgICAgICAgICBuYW1lPXtsYXllci5nZXRWaXN1YWxDaGFubmVsRGVzY3JpcHRpb24oJ2NvbG9yJykubWVhc3VyZX1cbiAgICAgICAgICBrZXk9XCJjb2xvclwiXG4gICAgICAgICAgdmFsdWU9e2RhdGEuY29sb3JWYWx1ZSB8fCAnTi9BJ31cbiAgICAgICAgLz5cbiAgICAgICkgOiBudWxsfVxuICAgICAge3NpemVGaWVsZCAmJiBsYXllci52aXN1YWxDaGFubmVscy5zaXplID8gKFxuICAgICAgICA8Um93XG4gICAgICAgICAgbmFtZT17bGF5ZXIuZ2V0VmlzdWFsQ2hhbm5lbERlc2NyaXB0aW9uKCdzaXplJykubWVhc3VyZX1cbiAgICAgICAgICBrZXk9XCJzaXplXCJcbiAgICAgICAgICB2YWx1ZT17ZGF0YS5lbGV2YXRpb25WYWx1ZSB8fCAnTi9BJ31cbiAgICAgICAgLz5cbiAgICAgICkgOiBudWxsfVxuICAgIDwvdGJvZHk+XG4gICk7XG59O1xuXG5mdW5jdGlvbiBfZ2V0Q2VsbEZvcm1hdCh0eXBlKSB7XG4gIHJldHVybiBGSUVMRF9ESVNQTEFZX0ZPUk1BVFt0eXBlXTtcbn1cblxuY29uc3QgTWFwUG9wb3ZlckZhY3RvcnkgPSAgKCkgPT4gTWFwUG9wb3ZlcjtcbmV4cG9ydCBkZWZhdWx0IE1hcFBvcG92ZXJGYWN0b3J5O1xuIl19