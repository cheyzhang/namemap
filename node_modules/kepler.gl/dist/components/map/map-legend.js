'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _toConsumableArray2 = require('babel-runtime/helpers/toConsumableArray');

var _toConsumableArray3 = _interopRequireDefault(_toConsumableArray2);

var _taggedTemplateLiteral2 = require('babel-runtime/helpers/taggedTemplateLiteral');

var _taggedTemplateLiteral3 = _interopRequireDefault(_taggedTemplateLiteral2);

var _templateObject = (0, _taggedTemplateLiteral3.default)(['\n  padding: 10px 0 10px ', 'px;\n  font-size: 11px;\n  border-bottom-color: ', ';\n  border-bottom-style: solid;\n  border-bottom-width: ', ';\n\n  .legend--layer_name {\n    font-size: 12px;\n    padding-right: ', 'px;\n    color: ', ';\n    font-weight: 500;\n  }\n  .legend--layer_type {\n    color: ', ';\n    font-weight: 500;\n    font-size: 11px;\n    padding-right: ', 'px;\n  }\n\n  .legend--layer__title {\n    padding-right: ', 'px;\n  }\n\n  .legend--layer_by {\n    color: ', ';\n  }\n\n  .legend--layer_color_field {\n    color: ', ';\n    font-weight: 500;\n  }\n\n  .legend--layer_color-legend {\n    margin-top: 6px;\n  }\n'], ['\n  padding: 10px 0 10px ', 'px;\n  font-size: 11px;\n  border-bottom-color: ', ';\n  border-bottom-style: solid;\n  border-bottom-width: ', ';\n\n  .legend--layer_name {\n    font-size: 12px;\n    padding-right: ', 'px;\n    color: ', ';\n    font-weight: 500;\n  }\n  .legend--layer_type {\n    color: ', ';\n    font-weight: 500;\n    font-size: 11px;\n    padding-right: ', 'px;\n  }\n\n  .legend--layer__title {\n    padding-right: ', 'px;\n  }\n\n  .legend--layer_by {\n    color: ', ';\n  }\n\n  .legend--layer_color_field {\n    color: ', ';\n    font-weight: 500;\n  }\n\n  .legend--layer_color-legend {\n    margin-top: 6px;\n  }\n']); // Copyright (c) 2018 Uber Technologies, Inc.
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

var _styledComponents = require('styled-components');

var _styledComponents2 = _interopRequireDefault(_styledComponents);

var _d3Color = require('d3-color');

var _colorLegend = require('../common/color-legend');

var _colorLegend2 = _interopRequireDefault(_colorLegend);

var _defaultSettings = require('../../constants/default-settings');

var _utils = require('../../utils/utils');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var StyledMapControlLegend = _styledComponents2.default.div(_templateObject, function (props) {
  return props.theme.mapControl.padding;
}, function (props) {
  return props.theme.panelBorderColor;
}, function (props) {
  return props.last ? 0 : '1px';
}, function (props) {
  return props.theme.mapControl.padding;
}, function (props) {
  return props.theme.textColorHl;
}, function (props) {
  return props.theme.subtextColor;
}, function (props) {
  return props.theme.mapControl.padding;
}, function (props) {
  return props.theme.mapControl.padding;
}, function (props) {
  return props.theme.subtextColor;
}, function (props) {
  return props.theme.textColor;
});

var VisualChannelMetric = function VisualChannelMetric(_ref) {
  var name = _ref.name;
  return _react2.default.createElement(
    'div',
    { className: 'legend--layer__title' },
    _react2.default.createElement(
      'span',
      { className: 'legend--layer_by' },
      'by '
    ),
    _react2.default.createElement(
      'span',
      { className: 'legend--layer_color_field' },
      name
    )
  );
};

var LayerSizeLegend = function LayerSizeLegend(_ref2) {
  var label = _ref2.label,
      name = _ref2.name;
  return _react2.default.createElement(
    'div',
    { className: 'legend--layer_size-schema' },
    _react2.default.createElement(
      'p',
      null,
      _react2.default.createElement(
        'span',
        { className: 'legend--layer_by' },
        label
      )
    ),
    _react2.default.createElement(VisualChannelMetric, { name: name })
  );
};

var propTypes = {
  layers: _propTypes2.default.array
};

var SingleColorLegend = function SingleColorLegend(_ref3) {
  var layer = _ref3.layer,
      width = _ref3.width;
  return _react2.default.createElement(_colorLegend2.default, {
    scaleType: 'ordinal',
    displayLabel: false,
    domain: [''],
    fieldType: null,
    range: [_d3Color.rgb.apply(undefined, (0, _toConsumableArray3.default)(layer.config.color)).toString()],
    width: width
  });
};

var MultiColorLegend = function MultiColorLegend(_ref4) {
  var layer = _ref4.layer,
      width = _ref4.width;
  var _layer$config = layer.config,
      visConfig = _layer$config.visConfig,
      colorField = _layer$config.colorField,
      colorScale = _layer$config.colorScale,
      colorDomain = _layer$config.colorDomain;


  return _react2.default.createElement(_colorLegend2.default, {
    scaleType: colorScale,
    displayLabel: true,
    domain: colorDomain,
    fieldType: colorField && colorField.type || 'real',
    range: visConfig.colorRange.colors,
    width: width
  });
};

var MapLegend = function MapLegend(_ref5) {
  var layers = _ref5.layers;
  return _react2.default.createElement(
    'div',
    null,
    layers.map(function (layer, index) {
      if (!layer.isValidToSave()) {
        return null;
      }

      var colorChannelConfig = layer.getVisualChannelDescription('color');
      var enableColorBy = colorChannelConfig.measure;
      var width = _defaultSettings.DIMENSIONS.mapControl.width - 2 * _defaultSettings.DIMENSIONS.mapControl.padding;

      return _react2.default.createElement(
        StyledMapControlLegend,
        {
          className: 'legend--layer',
          last: index === layers.length - 1,
          key: index
        },
        _react2.default.createElement(
          'div',
          { className: 'legend--layer_name' },
          layer.config.label
        ),
        _react2.default.createElement(
          'div',
          { className: 'legend--layer_type' },
          (0, _utils.capitalizeFirstLetter)(layer.name) + ' color'
        ),
        _react2.default.createElement(
          'div',
          { className: 'legend--layer_color-schema' },
          _react2.default.createElement(
            'div',
            null,
            enableColorBy ? _react2.default.createElement(VisualChannelMetric, { name: enableColorBy }) : null,
            _react2.default.createElement(
              'div',
              { className: 'legend--layer_color-legend' },
              enableColorBy ? _react2.default.createElement(MultiColorLegend, { layer: layer, width: width }) : _react2.default.createElement(SingleColorLegend, { layer: layer, width: width })
            )
          )
        ),
        Object.keys(layer.visualChannels).filter(function (k) {
          return k !== 'color';
        }).map(function (key) {
          var matchCondition = !layer.visualChannels[key].condition || layer.visualChannels[key].condition(layer.config);
          var enabled = layer.config[layer.visualChannels[key].field] || layer.visualChannels[key].defaultMeasure;

          var visualChannelDescription = layer.getVisualChannelDescription(key);
          if (matchCondition && enabled) {
            return _react2.default.createElement(LayerSizeLegend, {
              key: key,
              label: visualChannelDescription.label,
              name: visualChannelDescription.measure
            });
          }
          return null;
        })
      );
    })
  );
};

MapLegend.propTypes = propTypes;

exports.default = MapLegend;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9jb21wb25lbnRzL21hcC9tYXAtbGVnZW5kLmpzIl0sIm5hbWVzIjpbIlN0eWxlZE1hcENvbnRyb2xMZWdlbmQiLCJzdHlsZWQiLCJkaXYiLCJwcm9wcyIsInRoZW1lIiwibWFwQ29udHJvbCIsInBhZGRpbmciLCJwYW5lbEJvcmRlckNvbG9yIiwibGFzdCIsInRleHRDb2xvckhsIiwic3VidGV4dENvbG9yIiwidGV4dENvbG9yIiwiVmlzdWFsQ2hhbm5lbE1ldHJpYyIsIm5hbWUiLCJMYXllclNpemVMZWdlbmQiLCJsYWJlbCIsInByb3BUeXBlcyIsImxheWVycyIsIlByb3BUeXBlcyIsImFycmF5IiwiU2luZ2xlQ29sb3JMZWdlbmQiLCJsYXllciIsIndpZHRoIiwicmdiIiwiY29uZmlnIiwiY29sb3IiLCJ0b1N0cmluZyIsIk11bHRpQ29sb3JMZWdlbmQiLCJ2aXNDb25maWciLCJjb2xvckZpZWxkIiwiY29sb3JTY2FsZSIsImNvbG9yRG9tYWluIiwidHlwZSIsImNvbG9yUmFuZ2UiLCJjb2xvcnMiLCJNYXBMZWdlbmQiLCJtYXAiLCJpbmRleCIsImlzVmFsaWRUb1NhdmUiLCJjb2xvckNoYW5uZWxDb25maWciLCJnZXRWaXN1YWxDaGFubmVsRGVzY3JpcHRpb24iLCJlbmFibGVDb2xvckJ5IiwibWVhc3VyZSIsIkRJTUVOU0lPTlMiLCJsZW5ndGgiLCJPYmplY3QiLCJrZXlzIiwidmlzdWFsQ2hhbm5lbHMiLCJmaWx0ZXIiLCJrIiwibWF0Y2hDb25kaXRpb24iLCJrZXkiLCJjb25kaXRpb24iLCJlbmFibGVkIiwiZmllbGQiLCJkZWZhdWx0TWVhc3VyZSIsInZpc3VhbENoYW5uZWxEZXNjcmlwdGlvbiJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7MDBDQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztB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QTFCLEVBQWlDLE9BQU9DLEtBQXhDO0FBSEo7QUFKRjtBQURGLFNBVEY7QUFzQkd1QixlQUFPQyxJQUFQLENBQVl6QixNQUFNMEIsY0FBbEIsRUFDRUMsTUFERixDQUNTO0FBQUEsaUJBQUtDLE1BQU0sT0FBWDtBQUFBLFNBRFQsRUFFRWIsR0FGRixDQUVNLGVBQU87QUFDVixjQUFNYyxpQkFDSixDQUFDN0IsTUFBTTBCLGNBQU4sQ0FBcUJJLEdBQXJCLEVBQTBCQyxTQUEzQixJQUNBL0IsTUFBTTBCLGNBQU4sQ0FBcUJJLEdBQXJCLEVBQTBCQyxTQUExQixDQUFvQy9CLE1BQU1HLE1BQTFDLENBRkY7QUFHQSxjQUFNNkIsVUFDSmhDLE1BQU1HLE1BQU4sQ0FBYUgsTUFBTTBCLGNBQU4sQ0FBcUJJLEdBQXJCLEVBQTBCRyxLQUF2QyxLQUNBakMsTUFBTTBCLGNBQU4sQ0FBcUJJLEdBQXJCLEVBQTBCSSxjQUY1Qjs7QUFJQSxjQUFNQywyQkFBMkJuQyxNQUFNbUIsMkJBQU4sQ0FBa0NXLEdBQWxDLENBQWpDO0FBQ0EsY0FBSUQsa0JBQWtCRyxPQUF0QixFQUErQjtBQUM3QixtQkFDRSw4QkFBQyxlQUFEO0FBQ0UsbUJBQUtGLEdBRFA7QUFFRSxxQkFBT0sseUJBQXlCekMsS0FGbEM7QUFHRSxvQkFBTXlDLHlCQUF5QmQ7QUFIakMsY0FERjtBQU9EO0FBQ0QsaUJBQU8sSUFBUDtBQUNELFNBckJGO0FBdEJILE9BREY7QUErQ0QsS0F4REE7QUFESCxHQURnQjtBQUFBLENBQWxCOztBQThEQVAsVUFBVW5CLFNBQVYsR0FBc0JBLFNBQXRCOztrQkFFZW1CLFMiLCJmaWxlIjoibWFwLWxlZ2VuZC5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8vIENvcHlyaWdodCAoYykgMjAxOCBVYmVyIFRlY2hub2xvZ2llcywgSW5jLlxuLy9cbi8vIFBlcm1pc3Npb24gaXMgaGVyZWJ5IGdyYW50ZWQsIGZyZWUgb2YgY2hhcmdlLCB0byBhbnkgcGVyc29uIG9idGFpbmluZyBhIGNvcHlcbi8vIG9mIHRoaXMgc29mdHdhcmUgYW5kIGFzc29jaWF0ZWQgZG9jdW1lbnRhdGlvbiBmaWxlcyAodGhlIFwiU29mdHdhcmVcIiksIHRvIGRlYWxcbi8vIGluIHRoZSBTb2Z0d2FyZSB3aXRob3V0IHJlc3RyaWN0aW9uLCBpbmNsdWRpbmcgd2l0aG91dCBsaW1pdGF0aW9uIHRoZSByaWdodHNcbi8vIHRvIHVzZSwgY29weSwgbW9kaWZ5LCBtZXJnZSwgcHVibGlzaCwgZGlzdHJpYnV0ZSwgc3VibGljZW5zZSwgYW5kL29yIHNlbGxcbi8vIGNvcGllcyBvZiB0aGUgU29mdHdhcmUsIGFuZCB0byBwZXJtaXQgcGVyc29ucyB0byB3aG9tIHRoZSBTb2Z0d2FyZSBpc1xuLy8gZnVybmlzaGVkIHRvIGRvIHNvLCBzdWJqZWN0IHRvIHRoZSBmb2xsb3dpbmcgY29uZGl0aW9uczpcbi8vXG4vLyBUaGUgYWJvdmUgY29weXJpZ2h0IG5vdGljZSBhbmQgdGhpcyBwZXJtaXNzaW9uIG5vdGljZSBzaGFsbCBiZSBpbmNsdWRlZCBpblxuLy8gYWxsIGNvcGllcyBvciBzdWJzdGFudGlhbCBwb3J0aW9ucyBvZiB0aGUgU29mdHdhcmUuXG4vL1xuLy8gVEhFIFNPRlRXQVJFIElTIFBST1ZJREVEIFwiQVMgSVNcIiwgV0lUSE9VVCBXQVJSQU5UWSBPRiBBTlkgS0lORCwgRVhQUkVTUyBPUlxuLy8gSU1QTElFRCwgSU5DTFVESU5HIEJVVCBOT1QgTElNSVRFRCBUTyBUSEUgV0FSUkFOVElFUyBPRiBNRVJDSEFOVEFCSUxJVFksXG4vLyBGSVRORVNTIEZPUiBBIFBBUlRJQ1VMQVIgUFVSUE9TRSBBTkQgTk9OSU5GUklOR0VNRU5ULiBJTiBOTyBFVkVOVCBTSEFMTCBUSEVcbi8vIEFVVEhPUlMgT1IgQ09QWVJJR0hUIEhPTERFUlMgQkUgTElBQkxFIEZPUiBBTlkgQ0xBSU0sIERBTUFHRVMgT1IgT1RIRVJcbi8vIExJQUJJTElUWSwgV0hFVEhFUiBJTiBBTiBBQ1RJT04gT0YgQ09OVFJBQ1QsIFRPUlQgT1IgT1RIRVJXSVNFLCBBUklTSU5HIEZST00sXG4vLyBPVVQgT0YgT1IgSU4gQ09OTkVDVElPTiBXSVRIIFRIRSBTT0ZUV0FSRSBPUiBUSEUgVVNFIE9SIE9USEVSIERFQUxJTkdTIElOXG4vLyBUSEUgU09GVFdBUkUuXG5cbmltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XG5pbXBvcnQgUHJvcFR5cGVzIGZyb20gJ3Byb3AtdHlwZXMnO1xuaW1wb3J0IHN0eWxlZCBmcm9tICdzdHlsZWQtY29tcG9uZW50cyc7XG5pbXBvcnQge3JnYn0gZnJvbSAnZDMtY29sb3InO1xuaW1wb3J0IENvbG9yTGVnZW5kIGZyb20gJ2NvbXBvbmVudHMvY29tbW9uL2NvbG9yLWxlZ2VuZCc7XG5pbXBvcnQge0RJTUVOU0lPTlN9IGZyb20gJ2NvbnN0YW50cy9kZWZhdWx0LXNldHRpbmdzJztcbmltcG9ydCB7Y2FwaXRhbGl6ZUZpcnN0TGV0dGVyfSBmcm9tICd1dGlscy91dGlscyc7XG5cbmNvbnN0IFN0eWxlZE1hcENvbnRyb2xMZWdlbmQgPSBzdHlsZWQuZGl2YFxuICBwYWRkaW5nOiAxMHB4IDAgMTBweCAke3Byb3BzID0+IHByb3BzLnRoZW1lLm1hcENvbnRyb2wucGFkZGluZ31weDtcbiAgZm9udC1zaXplOiAxMXB4O1xuICBib3JkZXItYm90dG9tLWNvbG9yOiAke3Byb3BzID0+IHByb3BzLnRoZW1lLnBhbmVsQm9yZGVyQ29sb3J9O1xuICBib3JkZXItYm90dG9tLXN0eWxlOiBzb2xpZDtcbiAgYm9yZGVyLWJvdHRvbS13aWR0aDogJHtwcm9wcyA9PiAocHJvcHMubGFzdCA/IDAgOiAnMXB4Jyl9O1xuXG4gIC5sZWdlbmQtLWxheWVyX25hbWUge1xuICAgIGZvbnQtc2l6ZTogMTJweDtcbiAgICBwYWRkaW5nLXJpZ2h0OiAke3Byb3BzID0+IHByb3BzLnRoZW1lLm1hcENvbnRyb2wucGFkZGluZ31weDtcbiAgICBjb2xvcjogJHtwcm9wcyA9PiBwcm9wcy50aGVtZS50ZXh0Q29sb3JIbH07XG4gICAgZm9udC13ZWlnaHQ6IDUwMDtcbiAgfVxuICAubGVnZW5kLS1sYXllcl90eXBlIHtcbiAgICBjb2xvcjogJHtwcm9wcyA9PiBwcm9wcy50aGVtZS5zdWJ0ZXh0Q29sb3J9O1xuICAgIGZvbnQtd2VpZ2h0OiA1MDA7XG4gICAgZm9udC1zaXplOiAxMXB4O1xuICAgIHBhZGRpbmctcmlnaHQ6ICR7cHJvcHMgPT4gcHJvcHMudGhlbWUubWFwQ29udHJvbC5wYWRkaW5nfXB4O1xuICB9XG5cbiAgLmxlZ2VuZC0tbGF5ZXJfX3RpdGxlIHtcbiAgICBwYWRkaW5nLXJpZ2h0OiAke3Byb3BzID0+IHByb3BzLnRoZW1lLm1hcENvbnRyb2wucGFkZGluZ31weDtcbiAgfVxuXG4gIC5sZWdlbmQtLWxheWVyX2J5IHtcbiAgICBjb2xvcjogJHtwcm9wcyA9PiBwcm9wcy50aGVtZS5zdWJ0ZXh0Q29sb3J9O1xuICB9XG5cbiAgLmxlZ2VuZC0tbGF5ZXJfY29sb3JfZmllbGQge1xuICAgIGNvbG9yOiAke3Byb3BzID0+IHByb3BzLnRoZW1lLnRleHRDb2xvcn07XG4gICAgZm9udC13ZWlnaHQ6IDUwMDtcbiAgfVxuXG4gIC5sZWdlbmQtLWxheWVyX2NvbG9yLWxlZ2VuZCB7XG4gICAgbWFyZ2luLXRvcDogNnB4O1xuICB9XG5gO1xuXG5jb25zdCBWaXN1YWxDaGFubmVsTWV0cmljID0gKHtuYW1lfSkgPT4gKFxuICA8ZGl2IGNsYXNzTmFtZT1cImxlZ2VuZC0tbGF5ZXJfX3RpdGxlXCI+XG4gICAgPHNwYW4gY2xhc3NOYW1lPVwibGVnZW5kLS1sYXllcl9ieVwiPmJ5IDwvc3Bhbj5cbiAgICA8c3BhbiBjbGFzc05hbWU9XCJsZWdlbmQtLWxheWVyX2NvbG9yX2ZpZWxkXCI+e25hbWV9PC9zcGFuPlxuICA8L2Rpdj5cbik7XG5cbmNvbnN0IExheWVyU2l6ZUxlZ2VuZCA9ICh7bGFiZWwsIG5hbWV9KSA9PiAoXG4gIDxkaXYgY2xhc3NOYW1lPVwibGVnZW5kLS1sYXllcl9zaXplLXNjaGVtYVwiPlxuICAgIDxwPlxuICAgICAgPHNwYW4gY2xhc3NOYW1lPVwibGVnZW5kLS1sYXllcl9ieVwiPntsYWJlbH08L3NwYW4+XG4gICAgPC9wPlxuICAgIDxWaXN1YWxDaGFubmVsTWV0cmljIG5hbWU9e25hbWV9IC8+XG4gIDwvZGl2PlxuKTtcblxuY29uc3QgcHJvcFR5cGVzID0ge1xuICBsYXllcnM6IFByb3BUeXBlcy5hcnJheVxufTtcblxuY29uc3QgU2luZ2xlQ29sb3JMZWdlbmQgPSAoe2xheWVyLCB3aWR0aH0pID0+IChcbiAgPENvbG9yTGVnZW5kXG4gICAgc2NhbGVUeXBlPVwib3JkaW5hbFwiXG4gICAgZGlzcGxheUxhYmVsPXtmYWxzZX1cbiAgICBkb21haW49e1snJ119XG4gICAgZmllbGRUeXBlPXtudWxsfVxuICAgIHJhbmdlPXtbcmdiKC4uLmxheWVyLmNvbmZpZy5jb2xvcikudG9TdHJpbmcoKV19XG4gICAgd2lkdGg9e3dpZHRofVxuICAvPlxuKTtcblxuY29uc3QgTXVsdGlDb2xvckxlZ2VuZCA9ICh7bGF5ZXIsIHdpZHRofSkgPT4ge1xuICBjb25zdCB7dmlzQ29uZmlnLCBjb2xvckZpZWxkLCBjb2xvclNjYWxlLCBjb2xvckRvbWFpbn0gPSBsYXllci5jb25maWc7XG5cbiAgcmV0dXJuIChcbiAgICA8Q29sb3JMZWdlbmRcbiAgICAgIHNjYWxlVHlwZT17Y29sb3JTY2FsZX1cbiAgICAgIGRpc3BsYXlMYWJlbFxuICAgICAgZG9tYWluPXtjb2xvckRvbWFpbn1cbiAgICAgIGZpZWxkVHlwZT17KGNvbG9yRmllbGQgJiYgY29sb3JGaWVsZC50eXBlKSB8fCAncmVhbCd9XG4gICAgICByYW5nZT17dmlzQ29uZmlnLmNvbG9yUmFuZ2UuY29sb3JzfVxuICAgICAgd2lkdGg9e3dpZHRofVxuICAgIC8+XG4gICk7XG59O1xuXG5jb25zdCBNYXBMZWdlbmQgPSAoe2xheWVyc30pID0+IChcbiAgPGRpdj5cbiAgICB7bGF5ZXJzLm1hcCgobGF5ZXIsIGluZGV4KSA9PiB7XG4gICAgICBpZiAoIWxheWVyLmlzVmFsaWRUb1NhdmUoKSkge1xuICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgIH1cblxuICAgICAgY29uc3QgY29sb3JDaGFubmVsQ29uZmlnID0gbGF5ZXIuZ2V0VmlzdWFsQ2hhbm5lbERlc2NyaXB0aW9uKCdjb2xvcicpO1xuICAgICAgY29uc3QgZW5hYmxlQ29sb3JCeSA9IGNvbG9yQ2hhbm5lbENvbmZpZy5tZWFzdXJlO1xuICAgICAgY29uc3Qgd2lkdGggPSBESU1FTlNJT05TLm1hcENvbnRyb2wud2lkdGggLSAyICogRElNRU5TSU9OUy5tYXBDb250cm9sLnBhZGRpbmc7XG5cbiAgICAgIHJldHVybiAoXG4gICAgICAgIDxTdHlsZWRNYXBDb250cm9sTGVnZW5kXG4gICAgICAgICAgY2xhc3NOYW1lPVwibGVnZW5kLS1sYXllclwiXG4gICAgICAgICAgbGFzdD17aW5kZXggPT09IGxheWVycy5sZW5ndGggLSAxfVxuICAgICAgICAgIGtleT17aW5kZXh9XG4gICAgICAgID5cbiAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImxlZ2VuZC0tbGF5ZXJfbmFtZVwiPntsYXllci5jb25maWcubGFiZWx9PC9kaXY+XG4gICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJsZWdlbmQtLWxheWVyX3R5cGVcIj57YCR7Y2FwaXRhbGl6ZUZpcnN0TGV0dGVyKFxuICAgICAgICAgICAgbGF5ZXIubmFtZVxuICAgICAgICAgICl9IGNvbG9yYH08L2Rpdj5cbiAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImxlZ2VuZC0tbGF5ZXJfY29sb3Itc2NoZW1hXCI+XG4gICAgICAgICAgICA8ZGl2PlxuICAgICAgICAgICAgICB7ZW5hYmxlQ29sb3JCeSA/IChcbiAgICAgICAgICAgICAgICA8VmlzdWFsQ2hhbm5lbE1ldHJpYyBuYW1lPXtlbmFibGVDb2xvckJ5fSAvPlxuICAgICAgICAgICAgICApIDogbnVsbH1cbiAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJsZWdlbmQtLWxheWVyX2NvbG9yLWxlZ2VuZFwiPlxuICAgICAgICAgICAgICAgIHtlbmFibGVDb2xvckJ5ID9cbiAgICAgICAgICAgICAgICAgIDxNdWx0aUNvbG9yTGVnZW5kIGxheWVyPXtsYXllcn0gd2lkdGg9e3dpZHRofS8+IDpcbiAgICAgICAgICAgICAgICAgIDxTaW5nbGVDb2xvckxlZ2VuZCBsYXllcj17bGF5ZXJ9IHdpZHRoPXt3aWR0aH0vPlxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICB7T2JqZWN0LmtleXMobGF5ZXIudmlzdWFsQ2hhbm5lbHMpXG4gICAgICAgICAgICAuZmlsdGVyKGsgPT4gayAhPT0gJ2NvbG9yJylcbiAgICAgICAgICAgIC5tYXAoa2V5ID0+IHtcbiAgICAgICAgICAgICAgY29uc3QgbWF0Y2hDb25kaXRpb24gPVxuICAgICAgICAgICAgICAgICFsYXllci52aXN1YWxDaGFubmVsc1trZXldLmNvbmRpdGlvbiB8fFxuICAgICAgICAgICAgICAgIGxheWVyLnZpc3VhbENoYW5uZWxzW2tleV0uY29uZGl0aW9uKGxheWVyLmNvbmZpZyk7XG4gICAgICAgICAgICAgIGNvbnN0IGVuYWJsZWQgPVxuICAgICAgICAgICAgICAgIGxheWVyLmNvbmZpZ1tsYXllci52aXN1YWxDaGFubmVsc1trZXldLmZpZWxkXSB8fFxuICAgICAgICAgICAgICAgIGxheWVyLnZpc3VhbENoYW5uZWxzW2tleV0uZGVmYXVsdE1lYXN1cmU7XG5cbiAgICAgICAgICAgICAgY29uc3QgdmlzdWFsQ2hhbm5lbERlc2NyaXB0aW9uID0gbGF5ZXIuZ2V0VmlzdWFsQ2hhbm5lbERlc2NyaXB0aW9uKGtleSk7XG4gICAgICAgICAgICAgIGlmIChtYXRjaENvbmRpdGlvbiAmJiBlbmFibGVkKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgICAgICAgIDxMYXllclNpemVMZWdlbmRcbiAgICAgICAgICAgICAgICAgICAga2V5PXtrZXl9XG4gICAgICAgICAgICAgICAgICAgIGxhYmVsPXt2aXN1YWxDaGFubmVsRGVzY3JpcHRpb24ubGFiZWx9XG4gICAgICAgICAgICAgICAgICAgIG5hbWU9e3Zpc3VhbENoYW5uZWxEZXNjcmlwdGlvbi5tZWFzdXJlfVxuICAgICAgICAgICAgICAgICAgLz5cbiAgICAgICAgICAgICAgICApO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIHJldHVybiBudWxsO1xuICAgICAgICAgICAgfSl9XG4gICAgICAgIDwvU3R5bGVkTWFwQ29udHJvbExlZ2VuZD5cbiAgICAgICk7XG4gICAgfSl9XG4gIDwvZGl2PlxuKTtcblxuTWFwTGVnZW5kLnByb3BUeXBlcyA9IHByb3BUeXBlcztcblxuZXhwb3J0IGRlZmF1bHQgTWFwTGVnZW5kO1xuIl19