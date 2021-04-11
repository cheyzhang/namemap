'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = undefined;

var _defineProperty2 = require('babel-runtime/helpers/defineProperty');

var _defineProperty3 = _interopRequireDefault(_defineProperty2);

var _extends3 = require('babel-runtime/helpers/extends');

var _extends4 = _interopRequireDefault(_extends3);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

var _class, _temp2; // Copyright (c) 2018 Uber Technologies, Inc.
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

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _styledComponents = require('../../common/styled-components');

var _colorSelector = require('./color-selector');

var _colorSelector2 = _interopRequireDefault(_colorSelector);

var _fieldSelector = require('../../common/field-selector');

var _fieldSelector2 = _interopRequireDefault(_fieldSelector);

var _itemSelector = require('../../common/item-selector/item-selector');

var _itemSelector2 = _interopRequireDefault(_itemSelector);

var _layerConfigGroup = require('./layer-config-group');

var _layerConfigGroup2 = _interopRequireDefault(_layerConfigGroup);

var _rangeSlider = require('../../common/range-slider');

var _rangeSlider2 = _interopRequireDefault(_rangeSlider);

var _layerFactory = require('../../../layers/layer-factory');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var LayerConfigurator = (_temp2 = _class = function (_Component) {
  (0, _inherits3.default)(LayerConfigurator, _Component);

  function LayerConfigurator() {
    var _ref;

    var _temp, _this, _ret;

    (0, _classCallCheck3.default)(this, LayerConfigurator);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = (0, _possibleConstructorReturn3.default)(this, (_ref = LayerConfigurator.__proto__ || Object.getPrototypeOf(LayerConfigurator)).call.apply(_ref, [this].concat(args))), _this), _this.onAttributeChange = function (attribute) {
      var _this$props = _this.props,
          layerConfiguratorProps = _this$props.layerConfiguratorProps,
          textLabel = _this$props.textLabel;

      return function (v) {
        return layerConfiguratorProps.onChange({
          textLabel: (0, _extends4.default)({}, textLabel, (0, _defineProperty3.default)({}, attribute, v))
        });
      };
    }, _this.onChangeTextAnchor = function (anchor) {
      var _this$props2 = _this.props,
          layerConfiguratorProps = _this$props2.layerConfiguratorProps,
          textLabel = _this$props2.textLabel;
      // TODO: we can be smarter on determining the offset of the text

      layerConfiguratorProps.onChange({
        textLabel: (0, _extends4.default)({}, textLabel, {
          anchor: anchor,
          offset: [anchor === 'start' ? 10 : anchor === 'end' ? -10 : 0, anchor === 'middle' ? 10 : 0]
        })
      });
    }, _temp), (0, _possibleConstructorReturn3.default)(_this, _ret);
  }

  (0, _createClass3.default)(LayerConfigurator, [{
    key: 'render',
    value: function render() {
      var _this2 = this;

      var _props = this.props,
          visConfiguratorProps = _props.visConfiguratorProps,
          textLabel = _props.textLabel;

      return _react2.default.createElement(
        _layerConfigGroup2.default,
        { label: 'text' },
        _react2.default.createElement(
          _styledComponents.PanelLabel,
          null,
          'Show text label based on'
        ),
        _react2.default.createElement(_fieldSelector2.default, {
          fields: visConfiguratorProps.fields,
          value: textLabel.field && textLabel.field.name || 'select a field',
          placeholder: 'empty',
          onSelect: this.onAttributeChange('field'),
          erasable: true
        }),
        _react2.default.createElement(
          _styledComponents.PanelLabel,
          null,
          'Font size'
        ),
        _react2.default.createElement(_rangeSlider2.default, (0, _extends4.default)({}, _layerFactory.LAYER_TEXT_CONFIGS.fontSize, {
          value1: textLabel.size,
          onChange: function onChange(v) {
            return _this2.onAttributeChange('size')(v[1]);
          }
        })),
        _react2.default.createElement(
          _styledComponents.PanelLabel,
          null,
          'Font color'
        ),
        _react2.default.createElement(_colorSelector2.default, {
          colorSets: [{
            selectedColor: textLabel.color,
            setColor: this.onAttributeChange('color')
          }]
        }),
        _react2.default.createElement(
          _styledComponents.PanelLabel,
          null,
          'Text anchor'
        ),
        _react2.default.createElement(_itemSelector2.default, (0, _extends4.default)({}, _layerFactory.LAYER_TEXT_CONFIGS.textAnchor, {
          selectedItems: textLabel.anchor,
          onChange: this.onChangeTextAnchor
        }))
      );
    }
  }]);
  return LayerConfigurator;
}(_react.Component), _class.propTypes = {
  layerConfiguratorProps: _propTypes2.default.object.isRequired,
  textLabel: _propTypes2.default.object.isRequired,
  visConfiguratorProps: _propTypes2.default.object.isRequired
}, _temp2);
exports.default = LayerConfigurator;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9jb21wb25lbnRzL3NpZGUtcGFuZWwvbGF5ZXItcGFuZWwvdGV4dC1sYWJlbC1wYW5lbC5qcyJdLCJuYW1lcyI6WyJMYXllckNvbmZpZ3VyYXRvciIsIm9uQXR0cmlidXRlQ2hhbmdlIiwicHJvcHMiLCJsYXllckNvbmZpZ3VyYXRvclByb3BzIiwidGV4dExhYmVsIiwib25DaGFuZ2UiLCJhdHRyaWJ1dGUiLCJ2Iiwib25DaGFuZ2VUZXh0QW5jaG9yIiwiYW5jaG9yIiwib2Zmc2V0IiwidmlzQ29uZmlndXJhdG9yUHJvcHMiLCJmaWVsZHMiLCJmaWVsZCIsIm5hbWUiLCJMQVlFUl9URVhUX0NPTkZJR1MiLCJmb250U2l6ZSIsInNpemUiLCJzZWxlY3RlZENvbG9yIiwiY29sb3IiLCJzZXRDb2xvciIsInRleHRBbmNob3IiLCJDb21wb25lbnQiLCJwcm9wVHlwZXMiLCJQcm9wVHlwZXMiLCJvYmplY3QiLCJpc1JlcXVpcmVkIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O29CQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOzs7O0FBQ0E7Ozs7QUFFQTs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7O0FBRUE7Ozs7SUFFcUJBLGlCOzs7Ozs7Ozs7Ozs7OzswTkFPbkJDLGlCLEdBQW9CLHFCQUFhO0FBQUEsd0JBQ2EsTUFBS0MsS0FEbEI7QUFBQSxVQUN4QkMsc0JBRHdCLGVBQ3hCQSxzQkFEd0I7QUFBQSxVQUNBQyxTQURBLGVBQ0FBLFNBREE7O0FBRS9CLGFBQU87QUFBQSxlQUFLRCx1QkFBdUJFLFFBQXZCLENBQWdDO0FBQzFDRCxnREFDS0EsU0FETCxvQ0FFR0UsU0FGSCxFQUVlQyxDQUZmO0FBRDBDLFNBQWhDLENBQUw7QUFBQSxPQUFQO0FBTUQsSyxRQUVEQyxrQixHQUFxQixrQkFBVTtBQUFBLHlCQUNlLE1BQUtOLEtBRHBCO0FBQUEsVUFDdEJDLHNCQURzQixnQkFDdEJBLHNCQURzQjtBQUFBLFVBQ0VDLFNBREYsZ0JBQ0VBLFNBREY7QUFFN0I7O0FBQ0FELDZCQUF1QkUsUUFBdkIsQ0FBZ0M7QUFDOUJELDhDQUNLQSxTQURMO0FBRUVLLHdCQUZGO0FBR0VDLGtCQUFRLENBQ05ELFdBQVcsT0FBWCxHQUFxQixFQUFyQixHQUEwQkEsV0FBVyxLQUFYLEdBQW1CLENBQUMsRUFBcEIsR0FBeUIsQ0FEN0MsRUFFTkEsV0FBVyxRQUFYLEdBQXNCLEVBQXRCLEdBQTJCLENBRnJCO0FBSFY7QUFEOEIsT0FBaEM7QUFVRCxLOzs7Ozs2QkFFUTtBQUFBOztBQUFBLG1CQUlILEtBQUtQLEtBSkY7QUFBQSxVQUVMUyxvQkFGSyxVQUVMQSxvQkFGSztBQUFBLFVBR0xQLFNBSEssVUFHTEEsU0FISzs7QUFLUCxhQUNFO0FBQUMsa0NBQUQ7QUFBQSxVQUFrQixPQUFPLE1BQXpCO0FBQ0U7QUFBQyxzQ0FBRDtBQUFBO0FBQUE7QUFBQSxTQURGO0FBRUksc0NBQUMsdUJBQUQ7QUFDRSxrQkFBUU8scUJBQXFCQyxNQUQvQjtBQUVFLGlCQUFPUixVQUFVUyxLQUFWLElBQW1CVCxVQUFVUyxLQUFWLENBQWdCQyxJQUFuQyxJQUEyQyxnQkFGcEQ7QUFHRSx1QkFBYSxPQUhmO0FBSUUsb0JBQVUsS0FBS2IsaUJBQUwsQ0FBdUIsT0FBdkIsQ0FKWjtBQUtFO0FBTEYsVUFGSjtBQVNJO0FBQUMsc0NBQUQ7QUFBQTtBQUFBO0FBQUEsU0FUSjtBQVVJLHNDQUFDLHFCQUFELDZCQUNNYyxpQ0FBbUJDLFFBRHpCO0FBRUUsa0JBQVFaLFVBQVVhLElBRnBCO0FBR0Usb0JBQVU7QUFBQSxtQkFBSyxPQUFLaEIsaUJBQUwsQ0FBdUIsTUFBdkIsRUFBK0JNLEVBQUUsQ0FBRixDQUEvQixDQUFMO0FBQUE7QUFIWixXQVZKO0FBZUk7QUFBQyxzQ0FBRDtBQUFBO0FBQUE7QUFBQSxTQWZKO0FBZ0JJLHNDQUFDLHVCQUFEO0FBQ0UscUJBQVcsQ0FDVDtBQUNFVywyQkFBZWQsVUFBVWUsS0FEM0I7QUFFRUMsc0JBQVUsS0FBS25CLGlCQUFMLENBQXVCLE9BQXZCO0FBRlosV0FEUztBQURiLFVBaEJKO0FBd0JJO0FBQUMsc0NBQUQ7QUFBQTtBQUFBO0FBQUEsU0F4Qko7QUF5Qkksc0NBQUMsc0JBQUQsNkJBQ01jLGlDQUFtQk0sVUFEekI7QUFFRSx5QkFBZWpCLFVBQVVLLE1BRjNCO0FBR0Usb0JBQVUsS0FBS0Q7QUFIakI7QUF6QkosT0FERjtBQWlDRDs7O0VBdEU0Q2MsZ0IsVUFDdENDLFMsR0FBWTtBQUNqQnBCLDBCQUF3QnFCLG9CQUFVQyxNQUFWLENBQWlCQyxVQUR4QjtBQUVqQnRCLGFBQVdvQixvQkFBVUMsTUFBVixDQUFpQkMsVUFGWDtBQUdqQmYsd0JBQXNCYSxvQkFBVUMsTUFBVixDQUFpQkM7QUFIdEIsQztrQkFEQTFCLGlCIiwiZmlsZSI6InRleHQtbGFiZWwtcGFuZWwuanMiLCJzb3VyY2VzQ29udGVudCI6WyIvLyBDb3B5cmlnaHQgKGMpIDIwMTggVWJlciBUZWNobm9sb2dpZXMsIEluYy5cbi8vXG4vLyBQZXJtaXNzaW9uIGlzIGhlcmVieSBncmFudGVkLCBmcmVlIG9mIGNoYXJnZSwgdG8gYW55IHBlcnNvbiBvYnRhaW5pbmcgYSBjb3B5XG4vLyBvZiB0aGlzIHNvZnR3YXJlIGFuZCBhc3NvY2lhdGVkIGRvY3VtZW50YXRpb24gZmlsZXMgKHRoZSBcIlNvZnR3YXJlXCIpLCB0byBkZWFsXG4vLyBpbiB0aGUgU29mdHdhcmUgd2l0aG91dCByZXN0cmljdGlvbiwgaW5jbHVkaW5nIHdpdGhvdXQgbGltaXRhdGlvbiB0aGUgcmlnaHRzXG4vLyB0byB1c2UsIGNvcHksIG1vZGlmeSwgbWVyZ2UsIHB1Ymxpc2gsIGRpc3RyaWJ1dGUsIHN1YmxpY2Vuc2UsIGFuZC9vciBzZWxsXG4vLyBjb3BpZXMgb2YgdGhlIFNvZnR3YXJlLCBhbmQgdG8gcGVybWl0IHBlcnNvbnMgdG8gd2hvbSB0aGUgU29mdHdhcmUgaXNcbi8vIGZ1cm5pc2hlZCB0byBkbyBzbywgc3ViamVjdCB0byB0aGUgZm9sbG93aW5nIGNvbmRpdGlvbnM6XG4vL1xuLy8gVGhlIGFib3ZlIGNvcHlyaWdodCBub3RpY2UgYW5kIHRoaXMgcGVybWlzc2lvbiBub3RpY2Ugc2hhbGwgYmUgaW5jbHVkZWQgaW5cbi8vIGFsbCBjb3BpZXMgb3Igc3Vic3RhbnRpYWwgcG9ydGlvbnMgb2YgdGhlIFNvZnR3YXJlLlxuLy9cbi8vIFRIRSBTT0ZUV0FSRSBJUyBQUk9WSURFRCBcIkFTIElTXCIsIFdJVEhPVVQgV0FSUkFOVFkgT0YgQU5ZIEtJTkQsIEVYUFJFU1MgT1Jcbi8vIElNUExJRUQsIElOQ0xVRElORyBCVVQgTk9UIExJTUlURUQgVE8gVEhFIFdBUlJBTlRJRVMgT0YgTUVSQ0hBTlRBQklMSVRZLFxuLy8gRklUTkVTUyBGT1IgQSBQQVJUSUNVTEFSIFBVUlBPU0UgQU5EIE5PTklORlJJTkdFTUVOVC4gSU4gTk8gRVZFTlQgU0hBTEwgVEhFXG4vLyBBVVRIT1JTIE9SIENPUFlSSUdIVCBIT0xERVJTIEJFIExJQUJMRSBGT1IgQU5ZIENMQUlNLCBEQU1BR0VTIE9SIE9USEVSXG4vLyBMSUFCSUxJVFksIFdIRVRIRVIgSU4gQU4gQUNUSU9OIE9GIENPTlRSQUNULCBUT1JUIE9SIE9USEVSV0lTRSwgQVJJU0lORyBGUk9NLFxuLy8gT1VUIE9GIE9SIElOIENPTk5FQ1RJT04gV0lUSCBUSEUgU09GVFdBUkUgT1IgVEhFIFVTRSBPUiBPVEhFUiBERUFMSU5HUyBJTlxuLy8gVEhFIFNPRlRXQVJFLlxuXG5pbXBvcnQgUmVhY3QsIHtDb21wb25lbnR9IGZyb20gJ3JlYWN0JztcbmltcG9ydCBQcm9wVHlwZXMgZnJvbSAncHJvcC10eXBlcyc7XG5cbmltcG9ydCB7UGFuZWxMYWJlbH0gZnJvbSAnY29tcG9uZW50cy9jb21tb24vc3R5bGVkLWNvbXBvbmVudHMnO1xuaW1wb3J0IENvbG9yU2VsZWN0b3IgZnJvbSAnLi9jb2xvci1zZWxlY3Rvcic7XG5pbXBvcnQgRmllbGRTZWxlY3RvciBmcm9tICdjb21wb25lbnRzL2NvbW1vbi9maWVsZC1zZWxlY3Rvcic7XG5pbXBvcnQgSXRlbVNlbGVjdG9yIGZyb20gJ2NvbXBvbmVudHMvY29tbW9uL2l0ZW0tc2VsZWN0b3IvaXRlbS1zZWxlY3Rvcic7XG5pbXBvcnQgTGF5ZXJDb25maWdHcm91cCBmcm9tICcuL2xheWVyLWNvbmZpZy1ncm91cCc7XG5pbXBvcnQgUmFuZ2VTbGlkZXIgZnJvbSAnY29tcG9uZW50cy9jb21tb24vcmFuZ2Utc2xpZGVyJztcblxuaW1wb3J0IHtMQVlFUl9URVhUX0NPTkZJR1N9IGZyb20gJ2xheWVycy9sYXllci1mYWN0b3J5JztcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgTGF5ZXJDb25maWd1cmF0b3IgZXh0ZW5kcyBDb21wb25lbnQge1xuICBzdGF0aWMgcHJvcFR5cGVzID0ge1xuICAgIGxheWVyQ29uZmlndXJhdG9yUHJvcHM6IFByb3BUeXBlcy5vYmplY3QuaXNSZXF1aXJlZCxcbiAgICB0ZXh0TGFiZWw6IFByb3BUeXBlcy5vYmplY3QuaXNSZXF1aXJlZCxcbiAgICB2aXNDb25maWd1cmF0b3JQcm9wczogUHJvcFR5cGVzLm9iamVjdC5pc1JlcXVpcmVkXG4gIH07XG5cbiAgb25BdHRyaWJ1dGVDaGFuZ2UgPSBhdHRyaWJ1dGUgPT4ge1xuICAgIGNvbnN0IHtsYXllckNvbmZpZ3VyYXRvclByb3BzLCB0ZXh0TGFiZWx9ID0gdGhpcy5wcm9wcztcbiAgICByZXR1cm4gdiA9PiBsYXllckNvbmZpZ3VyYXRvclByb3BzLm9uQ2hhbmdlKHtcbiAgICAgIHRleHRMYWJlbDoge1xuICAgICAgICAuLi50ZXh0TGFiZWwsXG4gICAgICAgIFthdHRyaWJ1dGVdOiB2XG4gICAgICB9XG4gICAgfSk7XG4gIH07XG5cbiAgb25DaGFuZ2VUZXh0QW5jaG9yID0gYW5jaG9yID0+IHtcbiAgICBjb25zdCB7bGF5ZXJDb25maWd1cmF0b3JQcm9wcywgdGV4dExhYmVsfSA9IHRoaXMucHJvcHM7XG4gICAgLy8gVE9ETzogd2UgY2FuIGJlIHNtYXJ0ZXIgb24gZGV0ZXJtaW5pbmcgdGhlIG9mZnNldCBvZiB0aGUgdGV4dFxuICAgIGxheWVyQ29uZmlndXJhdG9yUHJvcHMub25DaGFuZ2Uoe1xuICAgICAgdGV4dExhYmVsOiB7XG4gICAgICAgIC4uLnRleHRMYWJlbCxcbiAgICAgICAgYW5jaG9yLFxuICAgICAgICBvZmZzZXQ6IFtcbiAgICAgICAgICBhbmNob3IgPT09ICdzdGFydCcgPyAxMCA6IGFuY2hvciA9PT0gJ2VuZCcgPyAtMTAgOiAwLFxuICAgICAgICAgIGFuY2hvciA9PT0gJ21pZGRsZScgPyAxMCA6IDBcbiAgICAgICAgXVxuICAgICAgfVxuICAgIH0pO1xuICB9O1xuXG4gIHJlbmRlcigpIHtcbiAgICBjb25zdCB7XG4gICAgICB2aXNDb25maWd1cmF0b3JQcm9wcyxcbiAgICAgIHRleHRMYWJlbFxuICAgIH0gPSB0aGlzLnByb3BzO1xuICAgIHJldHVybiAoXG4gICAgICA8TGF5ZXJDb25maWdHcm91cCBsYWJlbD17J3RleHQnfT5cbiAgICAgICAgPFBhbmVsTGFiZWw+e2BTaG93IHRleHQgbGFiZWwgYmFzZWQgb25gfTwvUGFuZWxMYWJlbD5cbiAgICAgICAgICA8RmllbGRTZWxlY3RvclxuICAgICAgICAgICAgZmllbGRzPXt2aXNDb25maWd1cmF0b3JQcm9wcy5maWVsZHN9XG4gICAgICAgICAgICB2YWx1ZT17dGV4dExhYmVsLmZpZWxkICYmIHRleHRMYWJlbC5maWVsZC5uYW1lIHx8ICdzZWxlY3QgYSBmaWVsZCd9XG4gICAgICAgICAgICBwbGFjZWhvbGRlcj17J2VtcHR5J31cbiAgICAgICAgICAgIG9uU2VsZWN0PXt0aGlzLm9uQXR0cmlidXRlQ2hhbmdlKCdmaWVsZCcpfVxuICAgICAgICAgICAgZXJhc2FibGVcbiAgICAgICAgICAvPlxuICAgICAgICAgIDxQYW5lbExhYmVsPntgRm9udCBzaXplYH08L1BhbmVsTGFiZWw+XG4gICAgICAgICAgPFJhbmdlU2xpZGVyXG4gICAgICAgICAgICB7Li4uTEFZRVJfVEVYVF9DT05GSUdTLmZvbnRTaXplfVxuICAgICAgICAgICAgdmFsdWUxPXt0ZXh0TGFiZWwuc2l6ZX1cbiAgICAgICAgICAgIG9uQ2hhbmdlPXt2ID0+IHRoaXMub25BdHRyaWJ1dGVDaGFuZ2UoJ3NpemUnKSh2WzFdKX1cbiAgICAgICAgICAvPlxuICAgICAgICAgIDxQYW5lbExhYmVsPntgRm9udCBjb2xvcmB9PC9QYW5lbExhYmVsPlxuICAgICAgICAgIDxDb2xvclNlbGVjdG9yXG4gICAgICAgICAgICBjb2xvclNldHM9e1tcbiAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIHNlbGVjdGVkQ29sb3I6IHRleHRMYWJlbC5jb2xvcixcbiAgICAgICAgICAgICAgICBzZXRDb2xvcjogdGhpcy5vbkF0dHJpYnV0ZUNoYW5nZSgnY29sb3InKVxuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICBdfVxuICAgICAgICAgIC8+XG4gICAgICAgICAgPFBhbmVsTGFiZWw+e2BUZXh0IGFuY2hvcmB9PC9QYW5lbExhYmVsPlxuICAgICAgICAgIDxJdGVtU2VsZWN0b3JcbiAgICAgICAgICAgIHsuLi5MQVlFUl9URVhUX0NPTkZJR1MudGV4dEFuY2hvcn1cbiAgICAgICAgICAgIHNlbGVjdGVkSXRlbXM9e3RleHRMYWJlbC5hbmNob3J9XG4gICAgICAgICAgICBvbkNoYW5nZT17dGhpcy5vbkNoYW5nZVRleHRBbmNob3J9XG4gICAgICAgICAgLz5cbiAgICAgIDwvTGF5ZXJDb25maWdHcm91cD5cbiAgICApO1xuICB9XG59XG4iXX0=