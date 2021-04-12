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

var _taggedTemplateLiteral2 = require('babel-runtime/helpers/taggedTemplateLiteral');

var _taggedTemplateLiteral3 = _interopRequireDefault(_taggedTemplateLiteral2);

var _class, _temp2;

var _templateObject = (0, _taggedTemplateLiteral3.default)(['\n  padding: 12px 12px 0 12px;\n'], ['\n  padding: 12px 12px 0 12px;\n']),
    _templateObject2 = (0, _taggedTemplateLiteral3.default)(['\n  padding-bottom: 12px;\n'], ['\n  padding-bottom: 12px;\n']),
    _templateObject3 = (0, _taggedTemplateLiteral3.default)(['\n  margin-bottom: 8px;\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n  .color-palette__config__label {\n    flex-grow: 1;\n  }\n  .color-palette__config__select {\n    flex-grow: 1;\n  }\n  .item-selector .item-selector__dropdown {\n    ', ';\n  }\n'], ['\n  margin-bottom: 8px;\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n  .color-palette__config__label {\n    flex-grow: 1;\n  }\n  .color-palette__config__select {\n    flex-grow: 1;\n  }\n  .item-selector .item-selector__dropdown {\n    ', ';\n  }\n']),
    _templateObject4 = (0, _taggedTemplateLiteral3.default)(['\n  padding: 0 8px;\n  :hover {\n    background-color: ', ';\n    cursor: pointer;\n  }\n'], ['\n  padding: 0 8px;\n  :hover {\n    background-color: ', ';\n    cursor: pointer;\n  }\n']); // Copyright (c) 2018 Uber Technologies, Inc.
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

var _lodash = require('lodash.uniq');

var _lodash2 = _interopRequireDefault(_lodash);

var _styledComponents = require('styled-components');

var _styledComponents2 = _interopRequireDefault(_styledComponents);

var _itemSelector = require('../../common/item-selector/item-selector');

var _itemSelector2 = _interopRequireDefault(_itemSelector);

var _styledComponents3 = require('../../common/styled-components');

var _rangeSlider = require('../../common/range-slider');

var _rangeSlider2 = _interopRequireDefault(_rangeSlider);

var _switch = require('../../common/switch');

var _switch2 = _interopRequireDefault(_switch);

var _colorPalette = require('./color-palette');

var _colorPalette2 = _interopRequireDefault(_colorPalette);

var _colorRanges = require('../../../constants/color-ranges');

var _dataUtils = require('../../../utils/data-utils');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var ALL_TYPES = (0, _lodash2.default)(_colorRanges.COLOR_RANGES.map(function (c) {
  return c.type;
}).concat(['all']));
var ALL_STEPS = (0, _lodash2.default)(_colorRanges.COLOR_RANGES.map(function (d) {
  return d.colors.length;
})).sort(_dataUtils.numberSort);

var StyledColorConfig = _styledComponents2.default.div(_templateObject);

var ColorRangeSelector = _styledComponents2.default.div(_templateObject2);
var ColorRangeSelect = (_temp2 = _class = function (_Component) {
  (0, _inherits3.default)(ColorRangeSelect, _Component);

  function ColorRangeSelect() {
    var _ref;

    var _temp, _this, _ret;

    (0, _classCallCheck3.default)(this, ColorRangeSelect);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = (0, _possibleConstructorReturn3.default)(this, (_ref = ColorRangeSelect.__proto__ || Object.getPrototypeOf(ColorRangeSelect)).call.apply(_ref, [this].concat(args))), _this), _this.state = {
      config: {
        type: {
          type: 'select',
          value: 'all',
          options: ALL_TYPES
        },
        steps: {
          type: 'select',
          value: 6,
          options: ALL_STEPS
        },
        reversed: {
          type: 'switch',
          value: false,
          options: [true, false]
        }
      }
    }, _this._updateConfig = function (_ref2) {
      var key = _ref2.key,
          value = _ref2.value;

      var currentValue = _this.state.config[key].value;
      if (value !== currentValue) {
        _this.setState({
          config: (0, _extends4.default)({}, _this.state.config, (0, _defineProperty3.default)({}, key, (0, _extends4.default)({}, _this.state.config[key], {
            value: value
          })))
        });
      }
    }, _temp), (0, _possibleConstructorReturn3.default)(_this, _ret);
  }

  (0, _createClass3.default)(ColorRangeSelect, [{
    key: 'render',
    value: function render() {
      var _this2 = this;

      var config = this.state.config;

      return _react2.default.createElement(
        ColorRangeSelector,
        { className: 'color-range-selector' },
        _react2.default.createElement(
          StyledColorConfig,
          null,
          Object.keys(config).map(function (key) {
            return _react2.default.createElement(PaletteConfig, {
              key: key,
              label: key,
              config: config[key],
              onChange: function onChange(value) {
                return _this2._updateConfig({ key: key, value: value });
              }
            });
          })
        ),
        _react2.default.createElement(ColorPaletteGroup, {
          config: config,
          colorRanges: this.props.colorRanges,
          onSelect: this.props.onSelectColorRange,
          selected: this.props.selectedColorRange
        })
      );
    }
  }]);
  return ColorRangeSelect;
}(_react.Component), _class.propTypes = {
  colorRanges: _propTypes2.default.arrayOf(_propTypes2.default.any),
  selectedColorRange: _propTypes2.default.object,
  onSelectColorRange: _propTypes2.default.func.isRequired
}, _class.defaultProps = {
  colorRanges: _colorRanges.COLOR_RANGES,
  onSelectColorRange: function onSelectColorRange() {}
}, _temp2);
exports.default = ColorRangeSelect;


var StyledPaletteConfig = _styledComponents2.default.div(_templateObject3, function (props) {
  return props.theme.secondaryInput;
});

var PaletteConfig = function PaletteConfig(_ref3) {
  var category = _ref3.category,
      label = _ref3.label,
      _ref3$config = _ref3.config,
      type = _ref3$config.type,
      value = _ref3$config.value,
      options = _ref3$config.options,
      _onChange = _ref3.onChange;
  return _react2.default.createElement(
    StyledPaletteConfig,
    {
      className: 'color-palette__config',
      onClick: function onClick(e) {
        return e.stopPropagation();
      }
    },
    _react2.default.createElement(
      'div',
      { className: 'color-palette__config__label' },
      _react2.default.createElement(
        _styledComponents3.PanelLabel,
        null,
        label
      )
    ),
    type === 'select' && _react2.default.createElement(
      'div',
      { className: 'color-palette__config__select' },
      _react2.default.createElement(_itemSelector2.default, {
        selectedItems: value,
        options: options,
        multiSelect: false,
        searchable: false,
        onChange: _onChange
      })
    ),
    type === 'slider' && _react2.default.createElement(
      'div',
      { className: 'color-palette__config__slider' },
      _react2.default.createElement(
        'div',
        { className: 'color-palette__config__slider__slider' },
        _react2.default.createElement(_rangeSlider2.default, {
          range: options,
          value0: options[0],
          value1: value,
          step: 1,
          isRanged: false,
          showInput: false,
          onChange: function onChange(val) {
            return _onChange(val[1]);
          }
        })
      ),
      _react2.default.createElement(
        'div',
        { className: 'color-palette__config__slider__number' },
        value
      )
    ),
    type === 'switch' && _react2.default.createElement(_switch2.default, {
      checked: value,
      id: category + '-' + label + '-toggle',
      onChange: function onChange() {
        return _onChange(!value);
      },
      secondary: true
    })
  );
};

var StyledColorRange = _styledComponents2.default.div(_templateObject4, function (props) {
  return props.theme.panelBackgroundHover;
});

var ColorPaletteGroup = function ColorPaletteGroup(_ref4) {
  var _ref4$config = _ref4.config,
      config = _ref4$config === undefined ? {} : _ref4$config,
      onSelect = _ref4.onSelect,
      selected = _ref4.selected,
      colorRanges = _ref4.colorRanges;
  var steps = config.steps,
      reversed = config.reversed,
      type = config.type;


  var filtered = colorRanges.filter(function (colorRange) {
    var isType = !type || type.value === 'all' || type.value === colorRange.type;
    var isStep = !steps || Number(steps.value) === colorRange.colors.length;

    return isType && isStep;
  });

  var isReversed = Boolean(reversed && reversed.value);

  return _react2.default.createElement(
    'div',
    { className: 'color-palette__group' },
    filtered.map(function (colorRange) {
      return _react2.default.createElement(
        StyledColorRange,
        {
          className: 'color-ranges',
          key: colorRange.name,
          onClick: function onClick(e) {
            return onSelect((0, _extends4.default)({}, colorRange, {
              reversed: isReversed,
              colors: isReversed ? colorRange.colors.slice().reverse() : colorRange.colors
            }), e);
          }
        },
        _react2.default.createElement(_colorPalette2.default, {
          colors: colorRange.colors,
          isReversed: isReversed,
          isSelected: colorRange.name === selected.name && isReversed === Boolean(selected.reversed)
        })
      );
    })
  );
};
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9jb21wb25lbnRzL3NpZGUtcGFuZWwvbGF5ZXItcGFuZWwvY29sb3ItcmFuZ2Utc2VsZWN0b3IuanMiXSwibmFtZXMiOlsiQUxMX1RZUEVTIiwiQ09MT1JfUkFOR0VTIiwibWFwIiwiYyIsInR5cGUiLCJjb25jYXQiLCJBTExfU1RFUFMiLCJkIiwiY29sb3JzIiwibGVuZ3RoIiwic29ydCIsIm51bWJlclNvcnQiLCJTdHlsZWRDb2xvckNvbmZpZyIsInN0eWxlZCIsImRpdiIsIkNvbG9yUmFuZ2VTZWxlY3RvciIsIkNvbG9yUmFuZ2VTZWxlY3QiLCJzdGF0ZSIsImNvbmZpZyIsInZhbHVlIiwib3B0aW9ucyIsInN0ZXBzIiwicmV2ZXJzZWQiLCJfdXBkYXRlQ29uZmlnIiwia2V5IiwiY3VycmVudFZhbHVlIiwic2V0U3RhdGUiLCJPYmplY3QiLCJrZXlzIiwicHJvcHMiLCJjb2xvclJhbmdlcyIsIm9uU2VsZWN0Q29sb3JSYW5nZSIsInNlbGVjdGVkQ29sb3JSYW5nZSIsIkNvbXBvbmVudCIsInByb3BUeXBlcyIsIlByb3BUeXBlcyIsImFycmF5T2YiLCJhbnkiLCJvYmplY3QiLCJmdW5jIiwiaXNSZXF1aXJlZCIsImRlZmF1bHRQcm9wcyIsIlN0eWxlZFBhbGV0dGVDb25maWciLCJ0aGVtZSIsInNlY29uZGFyeUlucHV0IiwiUGFsZXR0ZUNvbmZpZyIsImNhdGVnb3J5IiwibGFiZWwiLCJvbkNoYW5nZSIsImUiLCJzdG9wUHJvcGFnYXRpb24iLCJ2YWwiLCJTdHlsZWRDb2xvclJhbmdlIiwicGFuZWxCYWNrZ3JvdW5kSG92ZXIiLCJDb2xvclBhbGV0dGVHcm91cCIsIm9uU2VsZWN0Iiwic2VsZWN0ZWQiLCJmaWx0ZXJlZCIsImZpbHRlciIsImlzVHlwZSIsImNvbG9yUmFuZ2UiLCJpc1N0ZXAiLCJOdW1iZXIiLCJpc1JldmVyc2VkIiwiQm9vbGVhbiIsIm5hbWUiLCJzbGljZSIsInJldmVyc2UiXSwibWFwcGluZ3MiOiI7Ozs7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QUFNeUQsU0FBUyxDQUFDeEMsS0FBRCxJQUFVeUMsT0FBT3pDLE1BQU1GLEtBQWIsTUFBd0J5QyxXQUFXcEQsTUFBWCxDQUFrQkMsTUFBbkU7O0FBRUEsV0FBT2tELFVBQVVFLE1BQWpCO0FBQ0QsR0FOZ0IsQ0FBakI7O0FBUUEsTUFBTUUsYUFBYUMsUUFBUTFDLFlBQVlBLFNBQVNILEtBQTdCLENBQW5COztBQUVBLFNBQ0U7QUFBQTtBQUFBLE1BQUssV0FBVSxzQkFBZjtBQUNHc0MsYUFBU3ZELEdBQVQsQ0FBYTtBQUFBLGFBQ1o7QUFBQyx3QkFBRDtBQUFBO0FBQ0UscUJBQVUsY0FEWjtBQUVFLGVBQUswRCxXQUFXSyxJQUZsQjtBQUdFLG1CQUFTO0FBQUEsbUJBQ1BWLG9DQUVPSyxVQUZQO0FBR0l0Qyx3QkFBVXlDLFVBSGQ7QUFJSXZELHNCQUFRdUQsYUFDSkgsV0FBV3BELE1BQVgsQ0FBa0IwRCxLQUFsQixHQUEwQkMsT0FBMUIsRUFESSxHQUVKUCxXQUFXcEQ7QUFObkIsZ0JBUUV5QyxDQVJGLENBRE87QUFBQTtBQUhYO0FBZ0JFLHNDQUFDLHNCQUFEO0FBQ0Usa0JBQVFXLFdBQVdwRCxNQURyQjtBQUVFLHNCQUFZdUQsVUFGZDtBQUdFLHNCQUNFSCxXQUFXSyxJQUFYLEtBQW9CVCxTQUFTUyxJQUE3QixJQUNBRixlQUFlQyxRQUFRUixTQUFTbEMsUUFBakI7QUFMbkI7QUFoQkYsT0FEWTtBQUFBLEtBQWI7QUFESCxHQURGO0FBK0JELENBNUNEIiwiZmlsZSI6ImNvbG9yLXJhbmdlLXNlbGVjdG9yLmpzIiwic291cmNlc0NvbnRlbnQiOlsiLy8gQ29weXJpZ2h0IChjKSAyMDE4IFViZXIgVGVjaG5vbG9naWVzLCBJbmMuXG4vL1xuLy8gUGVybWlzc2lvbiBpcyBoZXJlYnkgZ3JhbnRlZCwgZnJlZSBvZiBjaGFyZ2UsIHRvIGFueSBwZXJzb24gb2J0YWluaW5nIGEgY29weVxuLy8gb2YgdGhpcyBzb2Z0d2FyZSBhbmQgYXNzb2NpYXRlZCBkb2N1bWVudGF0aW9uIGZpbGVzICh0aGUgXCJTb2Z0d2FyZVwiKSwgdG8gZGVhbFxuLy8gaW4gdGhlIFNvZnR3YXJlIHdpdGhvdXQgcmVzdHJpY3Rpb24sIGluY2x1ZGluZyB3aXRob3V0IGxpbWl0YXRpb24gdGhlIHJpZ2h0c1xuLy8gdG8gdXNlLCBjb3B5LCBtb2RpZnksIG1lcmdlLCBwdWJsaXNoLCBkaXN0cmlidXRlLCBzdWJsaWNlbnNlLCBhbmQvb3Igc2VsbFxuLy8gY29waWVzIG9mIHRoZSBTb2Z0d2FyZSwgYW5kIHRvIHBlcm1pdCBwZXJzb25zIHRvIHdob20gdGhlIFNvZnR3YXJlIGlzXG4vLyBmdXJuaXNoZWQgdG8gZG8gc28sIHN1YmplY3QgdG8gdGhlIGZvbGxvd2luZyBjb25kaXRpb25zOlxuLy9cbi8vIFRoZSBhYm92ZSBjb3B5cmlnaHQgbm90aWNlIGFuZCB0aGlzIHBlcm1pc3Npb24gbm90aWNlIHNoYWxsIGJlIGluY2x1ZGVkIGluXG4vLyBhbGwgY29waWVzIG9yIHN1YnN0YW50aWFsIHBvcnRpb25zIG9mIHRoZSBTb2Z0d2FyZS5cbi8vXG4vLyBUSEUgU09GVFdBUkUgSVMgUFJPVklERUQgXCJBUyBJU1wiLCBXSVRIT1VUIFdBUlJBTlRZIE9GIEFOWSBLSU5ELCBFWFBSRVNTIE9SXG4vLyBJTVBMSUVELCBJTkNMVURJTkcgQlVUIE5PVCBMSU1JVEVEIFRPIFRIRSBXQVJSQU5USUVTIE9GIE1FUkNIQU5UQUJJTElUWSxcbi8vIEZJVE5FU1MgRk9SIEEgUEFSVElDVUxBUiBQVVJQT1NFIEFORCBOT05JTkZSSU5HRU1FTlQuIElOIE5PIEVWRU5UIFNIQUxMIFRIRVxuLy8gQVVUSE9SUyBPUiBDT1BZUklHSFQgSE9MREVSUyBCRSBMSUFCTEUgRk9SIEFOWSBDTEFJTSwgREFNQUdFUyBPUiBPVEhFUlxuLy8gTElBQklMSVRZLCBXSEVUSEVSIElOIEFOIEFDVElPTiBPRiBDT05UUkFDVCwgVE9SVCBPUiBPVEhFUldJU0UsIEFSSVNJTkcgRlJPTSxcbi8vIE9VVCBPRiBPUiBJTiBDT05ORUNUSU9OIFdJVEggVEhFIFNPRlRXQVJFIE9SIFRIRSBVU0UgT1IgT1RIRVIgREVBTElOR1MgSU5cbi8vIFRIRSBTT0ZUV0FSRS5cblxuaW1wb3J0IFJlYWN0LCB7Q29tcG9uZW50fSBmcm9tICdyZWFjdCc7XG5pbXBvcnQgUHJvcFR5cGVzIGZyb20gJ3Byb3AtdHlwZXMnO1xuaW1wb3J0IHVuaXEgZnJvbSAnbG9kYXNoLnVuaXEnO1xuaW1wb3J0IHN0eWxlZCBmcm9tICdzdHlsZWQtY29tcG9uZW50cyc7XG5pbXBvcnQgSXRlbVNlbGVjdG9yIGZyb20gJ2NvbXBvbmVudHMvY29tbW9uL2l0ZW0tc2VsZWN0b3IvaXRlbS1zZWxlY3Rvcic7XG5pbXBvcnQge1BhbmVsTGFiZWx9IGZyb20gJ2NvbXBvbmVudHMvY29tbW9uL3N0eWxlZC1jb21wb25lbnRzJztcbmltcG9ydCBSYW5nZVNsaWRlciBmcm9tICdjb21wb25lbnRzL2NvbW1vbi9yYW5nZS1zbGlkZXInO1xuaW1wb3J0IFN3aXRjaCBmcm9tICdjb21wb25lbnRzL2NvbW1vbi9zd2l0Y2gnO1xuaW1wb3J0IENvbG9yUGFsZXR0ZSBmcm9tICcuL2NvbG9yLXBhbGV0dGUnO1xuXG5pbXBvcnQge0NPTE9SX1JBTkdFU30gZnJvbSAnY29uc3RhbnRzL2NvbG9yLXJhbmdlcyc7XG5pbXBvcnQge251bWJlclNvcnR9IGZyb20gJ3V0aWxzL2RhdGEtdXRpbHMnO1xuXG5jb25zdCBBTExfVFlQRVMgPSB1bmlxKENPTE9SX1JBTkdFUy5tYXAoYyA9PiBjLnR5cGUpLmNvbmNhdChbJ2FsbCddKSk7XG5jb25zdCBBTExfU1RFUFMgPSB1bmlxKENPTE9SX1JBTkdFUy5tYXAoZCA9PiBkLmNvbG9ycy5sZW5ndGgpKS5zb3J0KG51bWJlclNvcnQpO1xuXG5jb25zdCBTdHlsZWRDb2xvckNvbmZpZyA9IHN0eWxlZC5kaXZgXG4gIHBhZGRpbmc6IDEycHggMTJweCAwIDEycHg7XG5gO1xuXG5jb25zdCBDb2xvclJhbmdlU2VsZWN0b3IgPSBzdHlsZWQuZGl2YFxuICBwYWRkaW5nLWJvdHRvbTogMTJweDtcbmA7XG5leHBvcnQgZGVmYXVsdCBjbGFzcyBDb2xvclJhbmdlU2VsZWN0IGV4dGVuZHMgQ29tcG9uZW50IHtcbiAgc3RhdGljIHByb3BUeXBlcyA9IHtcbiAgICBjb2xvclJhbmdlczogUHJvcFR5cGVzLmFycmF5T2YoUHJvcFR5cGVzLmFueSksXG4gICAgc2VsZWN0ZWRDb2xvclJhbmdlOiBQcm9wVHlwZXMub2JqZWN0LFxuICAgIG9uU2VsZWN0Q29sb3JSYW5nZTogUHJvcFR5cGVzLmZ1bmMuaXNSZXF1aXJlZFxuICB9O1xuXG4gIHN0YXRpYyBkZWZhdWx0UHJvcHMgPSB7XG4gICAgY29sb3JSYW5nZXM6IENPTE9SX1JBTkdFUyxcbiAgICBvblNlbGVjdENvbG9yUmFuZ2U6ICgpID0+IHt9XG4gIH07XG5cbiAgc3RhdGUgPSB7XG4gICAgY29uZmlnOiB7XG4gICAgICB0eXBlOiB7XG4gICAgICAgIHR5cGU6ICdzZWxlY3QnLFxuICAgICAgICB2YWx1ZTogJ2FsbCcsXG4gICAgICAgIG9wdGlvbnM6IEFMTF9UWVBFU1xuICAgICAgfSxcbiAgICAgIHN0ZXBzOiB7XG4gICAgICAgIHR5cGU6ICdzZWxlY3QnLFxuICAgICAgICB2YWx1ZTogNixcbiAgICAgICAgb3B0aW9uczogQUxMX1NURVBTXG4gICAgICB9LFxuICAgICAgcmV2ZXJzZWQ6IHtcbiAgICAgICAgdHlwZTogJ3N3aXRjaCcsXG4gICAgICAgIHZhbHVlOiBmYWxzZSxcbiAgICAgICAgb3B0aW9uczogW3RydWUsIGZhbHNlXVxuICAgICAgfVxuICAgIH1cbiAgfTtcblxuICBfdXBkYXRlQ29uZmlnID0gKHtrZXksIHZhbHVlfSkgPT4ge1xuICAgIGNvbnN0IGN1cnJlbnRWYWx1ZSA9IHRoaXMuc3RhdGUuY29uZmlnW2tleV0udmFsdWU7XG4gICAgaWYgKHZhbHVlICE9PSBjdXJyZW50VmFsdWUpIHtcbiAgICAgIHRoaXMuc2V0U3RhdGUoe1xuICAgICAgICBjb25maWc6IHtcbiAgICAgICAgICAuLi50aGlzLnN0YXRlLmNvbmZpZyxcbiAgICAgICAgICBba2V5XToge1xuICAgICAgICAgICAgLi4udGhpcy5zdGF0ZS5jb25maWdba2V5XSxcbiAgICAgICAgICAgIHZhbHVlXG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9KTtcbiAgICB9XG4gIH07XG5cbiAgcmVuZGVyKCkge1xuICAgIGNvbnN0IHtjb25maWd9ID0gdGhpcy5zdGF0ZTtcbiAgICByZXR1cm4gKFxuICAgICAgPENvbG9yUmFuZ2VTZWxlY3RvciBjbGFzc05hbWU9XCJjb2xvci1yYW5nZS1zZWxlY3RvclwiPlxuICAgICAgICA8U3R5bGVkQ29sb3JDb25maWc+XG4gICAgICAgICAge09iamVjdC5rZXlzKGNvbmZpZykubWFwKGtleSA9PiAoXG4gICAgICAgICAgICA8UGFsZXR0ZUNvbmZpZ1xuICAgICAgICAgICAgICBrZXk9e2tleX1cbiAgICAgICAgICAgICAgbGFiZWw9e2tleX1cbiAgICAgICAgICAgICAgY29uZmlnPXtjb25maWdba2V5XX1cbiAgICAgICAgICAgICAgb25DaGFuZ2U9e3ZhbHVlID0+IHRoaXMuX3VwZGF0ZUNvbmZpZyh7a2V5LCB2YWx1ZX0pfVxuICAgICAgICAgICAgLz5cbiAgICAgICAgICApKX1cbiAgICAgICAgPC9TdHlsZWRDb2xvckNvbmZpZz5cbiAgICAgICAgPENvbG9yUGFsZXR0ZUdyb3VwXG4gICAgICAgICAgY29uZmlnPXtjb25maWd9XG4gICAgICAgICAgY29sb3JSYW5nZXM9e3RoaXMucHJvcHMuY29sb3JSYW5nZXN9XG4gICAgICAgICAgb25TZWxlY3Q9e3RoaXMucHJvcHMub25TZWxlY3RDb2xvclJhbmdlfVxuICAgICAgICAgIHNlbGVjdGVkPXt0aGlzLnByb3BzLnNlbGVjdGVkQ29sb3JSYW5nZX1cbiAgICAgICAgLz5cbiAgICAgIDwvQ29sb3JSYW5nZVNlbGVjdG9yPlxuICAgICk7XG4gIH1cbn1cblxuY29uc3QgU3R5bGVkUGFsZXR0ZUNvbmZpZyA9IHN0eWxlZC5kaXZgXG4gIG1hcmdpbi1ib3R0b206IDhweDtcbiAgZGlzcGxheTogZmxleDtcbiAganVzdGlmeS1jb250ZW50OiBzcGFjZS1iZXR3ZWVuO1xuICBhbGlnbi1pdGVtczogY2VudGVyO1xuICAuY29sb3ItcGFsZXR0ZV9fY29uZmlnX19sYWJlbCB7XG4gICAgZmxleC1ncm93OiAxO1xuICB9XG4gIC5jb2xvci1wYWxldHRlX19jb25maWdfX3NlbGVjdCB7XG4gICAgZmxleC1ncm93OiAxO1xuICB9XG4gIC5pdGVtLXNlbGVjdG9yIC5pdGVtLXNlbGVjdG9yX19kcm9wZG93biB7XG4gICAgJHtwcm9wcyA9PiBwcm9wcy50aGVtZS5zZWNvbmRhcnlJbnB1dH07XG4gIH1cbmA7XG5cbmNvbnN0IFBhbGV0dGVDb25maWcgPSAoe1xuICBjYXRlZ29yeSxcbiAgbGFiZWwsXG4gIGNvbmZpZzoge3R5cGUsIHZhbHVlLCBvcHRpb25zfSxcbiAgb25DaGFuZ2Vcbn0pID0+IChcbiAgPFN0eWxlZFBhbGV0dGVDb25maWdcbiAgICBjbGFzc05hbWU9XCJjb2xvci1wYWxldHRlX19jb25maWdcIlxuICAgIG9uQ2xpY2s9e2UgPT4gZS5zdG9wUHJvcGFnYXRpb24oKX1cbiAgPlxuICAgIDxkaXYgY2xhc3NOYW1lPVwiY29sb3ItcGFsZXR0ZV9fY29uZmlnX19sYWJlbFwiPlxuICAgICAgPFBhbmVsTGFiZWw+e2xhYmVsfTwvUGFuZWxMYWJlbD5cbiAgICA8L2Rpdj5cbiAgICB7dHlwZSA9PT0gJ3NlbGVjdCcgJiYgKFxuICAgICAgPGRpdiBjbGFzc05hbWU9XCJjb2xvci1wYWxldHRlX19jb25maWdfX3NlbGVjdFwiPlxuICAgICAgICA8SXRlbVNlbGVjdG9yXG4gICAgICAgICAgc2VsZWN0ZWRJdGVtcz17dmFsdWV9XG4gICAgICAgICAgb3B0aW9ucz17b3B0aW9uc31cbiAgICAgICAgICBtdWx0aVNlbGVjdD17ZmFsc2V9XG4gICAgICAgICAgc2VhcmNoYWJsZT17ZmFsc2V9XG4gICAgICAgICAgb25DaGFuZ2U9e29uQ2hhbmdlfVxuICAgICAgICAvPlxuICAgICAgPC9kaXY+XG4gICAgKX1cbiAgICB7dHlwZSA9PT0gJ3NsaWRlcicgJiYgKFxuICAgICAgPGRpdiBjbGFzc05hbWU9XCJjb2xvci1wYWxldHRlX19jb25maWdfX3NsaWRlclwiPlxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImNvbG9yLXBhbGV0dGVfX2NvbmZpZ19fc2xpZGVyX19zbGlkZXJcIj5cbiAgICAgICAgICA8UmFuZ2VTbGlkZXJcbiAgICAgICAgICAgIHJhbmdlPXtvcHRpb25zfVxuICAgICAgICAgICAgdmFsdWUwPXtvcHRpb25zWzBdfVxuICAgICAgICAgICAgdmFsdWUxPXt2YWx1ZX1cbiAgICAgICAgICAgIHN0ZXA9ezF9XG4gICAgICAgICAgICBpc1JhbmdlZD17ZmFsc2V9XG4gICAgICAgICAgICBzaG93SW5wdXQ9e2ZhbHNlfVxuICAgICAgICAgICAgb25DaGFuZ2U9e3ZhbCA9PiBvbkNoYW5nZSh2YWxbMV0pfVxuICAgICAgICAgIC8+XG4gICAgICAgIDwvZGl2PlxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImNvbG9yLXBhbGV0dGVfX2NvbmZpZ19fc2xpZGVyX19udW1iZXJcIj57dmFsdWV9PC9kaXY+XG4gICAgICA8L2Rpdj5cbiAgICApfVxuICAgIHt0eXBlID09PSAnc3dpdGNoJyAmJiAoXG4gICAgICA8U3dpdGNoXG4gICAgICAgIGNoZWNrZWQ9e3ZhbHVlfVxuICAgICAgICBpZD17YCR7Y2F0ZWdvcnl9LSR7bGFiZWx9LXRvZ2dsZWB9XG4gICAgICAgIG9uQ2hhbmdlPXsoKSA9PiBvbkNoYW5nZSghdmFsdWUpfVxuICAgICAgICBzZWNvbmRhcnlcbiAgICAgIC8+XG4gICAgKX1cbiAgPC9TdHlsZWRQYWxldHRlQ29uZmlnPlxuKTtcblxuY29uc3QgU3R5bGVkQ29sb3JSYW5nZSA9IHN0eWxlZC5kaXZgXG4gIHBhZGRpbmc6IDAgOHB4O1xuICA6aG92ZXIge1xuICAgIGJhY2tncm91bmQtY29sb3I6ICR7cHJvcHMgPT4gcHJvcHMudGhlbWUucGFuZWxCYWNrZ3JvdW5kSG92ZXJ9O1xuICAgIGN1cnNvcjogcG9pbnRlcjtcbiAgfVxuYDtcblxuY29uc3QgQ29sb3JQYWxldHRlR3JvdXAgPSAoe2NvbmZpZyA9IHt9LCBvblNlbGVjdCwgc2VsZWN0ZWQsIGNvbG9yUmFuZ2VzfSkgPT4ge1xuICBjb25zdCB7c3RlcHMsIHJldmVyc2VkLCB0eXBlfSA9IGNvbmZpZztcblxuICBjb25zdCBmaWx0ZXJlZCA9IGNvbG9yUmFuZ2VzLmZpbHRlcihjb2xvclJhbmdlID0+IHtcbiAgICBjb25zdCBpc1R5cGUgPVxuICAgICAgIXR5cGUgfHwgdHlwZS52YWx1ZSA9PT0gJ2FsbCcgfHwgdHlwZS52YWx1ZSA9PT0gY29sb3JSYW5nZS50eXBlO1xuICAgIGNvbnN0IGlzU3RlcCA9ICFzdGVwcyB8fCBOdW1iZXIoc3RlcHMudmFsdWUpID09PSBjb2xvclJhbmdlLmNvbG9ycy5sZW5ndGg7XG5cbiAgICByZXR1cm4gaXNUeXBlICYmIGlzU3RlcDtcbiAgfSk7XG5cbiAgY29uc3QgaXNSZXZlcnNlZCA9IEJvb2xlYW4ocmV2ZXJzZWQgJiYgcmV2ZXJzZWQudmFsdWUpO1xuXG4gIHJldHVybiAoXG4gICAgPGRpdiBjbGFzc05hbWU9XCJjb2xvci1wYWxldHRlX19ncm91cFwiPlxuICAgICAge2ZpbHRlcmVkLm1hcChjb2xvclJhbmdlID0+IChcbiAgICAgICAgPFN0eWxlZENvbG9yUmFuZ2VcbiAgICAgICAgICBjbGFzc05hbWU9XCJjb2xvci1yYW5nZXNcIlxuICAgICAgICAgIGtleT17Y29sb3JSYW5nZS5uYW1lfVxuICAgICAgICAgIG9uQ2xpY2s9e2UgPT5cbiAgICAgICAgICAgIG9uU2VsZWN0KFxuICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgLi4uY29sb3JSYW5nZSxcbiAgICAgICAgICAgICAgICByZXZlcnNlZDogaXNSZXZlcnNlZCxcbiAgICAgICAgICAgICAgICBjb2xvcnM6IGlzUmV2ZXJzZWRcbiAgICAgICAgICAgICAgICAgID8gY29sb3JSYW5nZS5jb2xvcnMuc2xpY2UoKS5yZXZlcnNlKClcbiAgICAgICAgICAgICAgICAgIDogY29sb3JSYW5nZS5jb2xvcnNcbiAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgZVxuICAgICAgICAgICAgKVxuICAgICAgICAgIH1cbiAgICAgICAgPlxuICAgICAgICAgIDxDb2xvclBhbGV0dGVcbiAgICAgICAgICAgIGNvbG9ycz17Y29sb3JSYW5nZS5jb2xvcnN9XG4gICAgICAgICAgICBpc1JldmVyc2VkPXtpc1JldmVyc2VkfVxuICAgICAgICAgICAgaXNTZWxlY3RlZD17XG4gICAgICAgICAgICAgIGNvbG9yUmFuZ2UubmFtZSA9PT0gc2VsZWN0ZWQubmFtZSAmJlxuICAgICAgICAgICAgICBpc1JldmVyc2VkID09PSBCb29sZWFuKHNlbGVjdGVkLnJldmVyc2VkKVxuICAgICAgICAgICAgfVxuICAgICAgICAgIC8+XG4gICAgICAgIDwvU3R5bGVkQ29sb3JSYW5nZT5cbiAgICAgICkpfVxuICAgIDwvZGl2PlxuICApO1xufTtcbiJdfQ==