'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.hexagonVisConfigs = undefined;

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _toConsumableArray2 = require('babel-runtime/helpers/toConsumableArray');

var _toConsumableArray3 = _interopRequireDefault(_toConsumableArray2);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

var _deck = require('deck.gl');

var _aggregationLayer = require('../aggregation-layer');

var _aggregationLayer2 = _interopRequireDefault(_aggregationLayer);

var _enhancedHexagonLayer = require('../../deckgl-layers/hexagon-layer/enhanced-hexagon-layer');

var _enhancedHexagonLayer2 = _interopRequireDefault(_enhancedHexagonLayer);

var _hexagonUtils = require('./hexagon-utils');

var _hexagonLayerIcon = require('./hexagon-layer-icon');

var _hexagonLayerIcon2 = _interopRequireDefault(_hexagonLayerIcon);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var hexagonVisConfigs = exports.hexagonVisConfigs = {
  opacity: 'opacity',
  worldUnitSize: 'worldUnitSize',
  resolution: 'resolution',
  colorRange: 'colorRange',
  coverage: 'coverage',
  sizeRange: 'elevationRange',
  percentile: 'percentile',
  elevationPercentile: 'elevationPercentile',
  elevationScale: 'elevationScale',
  'hi-precision': 'hi-precision',
  colorAggregation: 'aggregation',
  sizeAggregation: 'sizeAggregation',
  enable3d: 'enable3d'
}; // Copyright (c) 2018 Uber Technologies, Inc.
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

var HexagonLayer = function (_AggregationLayer) {
  (0, _inherits3.default)(HexagonLayer, _AggregationLayer);

  function HexagonLayer(props) {
    (0, _classCallCheck3.default)(this, HexagonLayer);

    var _this = (0, _possibleConstructorReturn3.default)(this, (HexagonLayer.__proto__ || Object.getPrototypeOf(HexagonLayer)).call(this, props));

    _this.registerVisConfig(hexagonVisConfigs);
    _this.visConfigSettings.worldUnitSize.label = 'Hexagon Radius (km)';
    return _this;
  }

  (0, _createClass3.default)(HexagonLayer, [{
    key: 'renderLayer',
    value: function renderLayer(_ref) {
      var data = _ref.data,
          idx = _ref.idx,
          objectHovered = _ref.objectHovered,
          mapState = _ref.mapState,
          interaction = _ref.interaction,
          layerCallbacks = _ref.layerCallbacks;

      var zoomFactor = this.getZoomFactor(mapState);
      var eleZoomFactor = this.getElevationZoomFactor(mapState);
      var visConfig = this.config.visConfig;

      var radius = visConfig.worldUnitSize * 1000;

      return [new _enhancedHexagonLayer2.default((0, _extends3.default)({}, data, {
        id: this.id,
        idx: idx,

        // highlight
        autoHighlight: visConfig.enable3d,

        radius: radius,
        coverage: visConfig.coverage,

        // color
        colorRange: this.getColorRange(visConfig.colorRange),
        colorScale: this.config.colorScale,
        opacity: visConfig.opacity,
        upperPercentile: visConfig.percentile[1],
        lowerPercentile: visConfig.percentile[0],

        // parameters
        parameters: { depthTest: Boolean(visConfig.enable3d || mapState.dragRotate) },

        // elevation
        extruded: visConfig.enable3d,
        elevationScale: visConfig.elevationScale * eleZoomFactor,
        elevationLowerPercentile: visConfig.elevationPercentile[0],
        elevationUpperPercentile: visConfig.elevationPercentile[1],

        // render
        fp64: visConfig['hi-precision'],
        pickable: true,
        lightSettings: this.meta.lightSettings,
        // callbacks
        onSetColorDomain: layerCallbacks.onSetLayerDomain
      }))].concat((0, _toConsumableArray3.default)(this.isLayerHovered(objectHovered) && !visConfig.enable3d ? [new _deck.GeoJsonLayer({
        id: this.id + '-hovered',
        data: [(0, _hexagonUtils.hexagonToPolygonGeo)(objectHovered, {}, radius * visConfig.coverage, mapState)],
        getLineColor: this.config.highlightColor,
        lineWidthScale: 8 * zoomFactor
      })] : []));
    }
  }, {
    key: 'type',
    get: function get() {
      return 'hexagon';
    }
  }, {
    key: 'name',
    get: function get() {
      return 'Hexbin';
    }
  }, {
    key: 'layerIcon',
    get: function get() {
      return _hexagonLayerIcon2.default;
    }
  }]);
  return HexagonLayer;
}(_aggregationLayer2.default);

exports.default = HexagonLayer;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9sYXllcnMvaGV4YWdvbi1sYXllci9oZXhhZ29uLWxheWVyLmpzIl0sIm5hbWVzIjpbImhleGFnb25WaXNDb25maWdzIiwib3BhY2l0eSIsIndvcmxkVW5pdFNpemUiLCJyZXNvbHV0aW9uIiwiY29sb3JSYW5nZSIsImNvdmVyYWdlIiwic2l6ZVJhbmdlIiwicGVyY2VudGlsZSIsImVsZXZhdGlvblBlcmNlbnRpbGUiLCJlbGV2YXRpb25TY2FsZSIsImNvbG9yQWdncmVnYXRpb24iLCJzaXplQWdncmVnYXRpb24iLCJlbmFibGUzZCIsIkhleGFnb25MYXllciIsInByb3BzIiwicmVnaXN0ZXJWaXNDb25maWciLCJ2aXNDb25maWdTZXR0aW5ncyIsImxhYmVsIiwiZGF0YSIsImlkeCIsIm9iamVjdEhvdmVyZWQiLCJtYXBTdGF0ZSIsImludGVyYWN0aW9uIiwibGF5ZXJDYWxsYmFja3MiLCJ6b29tRmFjdG9yIiwiZ2V0Wm9vbUZhY3RvciIsImVsZVpvb21GYWN0b3IiLCJnZXRFbGV2YXRpb25ab29tRmFjdG9yIiwidmlzQ29uZmlnIiwiY29uZmlnIiwicmFkaXVzIiwiRW5oYW5jZWRIZXhhZ29uTGF5ZXIiLCJpZCIsImF1dG9IaWdobGlnaHQiLCJnZXRDb2xvclJhbmdlIiwiY29sb3JTY2FsZSIsInVwcGVyUGVyY2VudGlsZSIsImxvd2VyUGVyY2VudGlsZSIsInBhcmFtZXRlcnMiLCJkZXB0aFRlc3QiLCJCb29sZWFuIiwiZHJhZ1JvdGF0ZSIsImV4dHJ1ZGVkIiwiZWxldmF0aW9uTG93ZXJQZXJjZW50aWxlIiwiZWxldmF0aW9uVXBwZXJQZXJjZW50aWxlIiwiZnA2NCIsInBpY2thYmxlIiwibGlnaHRTZXR0aW5ncyIsIm1ldGEiLCJvblNldENvbG9yRG9tYWluIiwib25TZXRMYXllckRvbWFpbiIsImlzTGF5ZXJIb3ZlcmVkIiwiR2VvSnNvbkxheWVyIiwiZ2V0TGluZUNvbG9yIiwiaGlnaGxpZ2h0Q29sb3IiLCJsaW5lV2lkdGhT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VWhCLFFBQWpELEdBQ0EsQ0FDRSxJQUFJd0Msa0JBQUosQ0FBaUI7QUFDZnBCLFlBQU8sS0FBS0EsRUFBWixhQURlO0FBRWZkLGNBQU0sQ0FDSix1Q0FDRUUsYUFERixFQUVFLEVBRkYsRUFHRVUsU0FBU0YsVUFBVXZCLFFBSHJCLEVBSUVnQixRQUpGLENBREksQ0FGUztBQVVmZ0Msc0JBQWMsS0FBS3hCLE1BQUwsQ0FBWXlCLGNBVlg7QUFXZkMsd0JBQWdCLElBQUkvQjtBQVhMLE9BQWpCLENBREYsQ0FEQSxHQWdCQSxFQXJETjtBQXVERDs7O3dCQWhGVTtBQUNULGFBQU8sU0FBUDtBQUNEOzs7d0JBRVU7QUFDVCxhQUFPLFFBQVA7QUFDRDs7O3dCQUVlO0FBQ2QsYUFBT2dDLDBCQUFQO0FBQ0Q7OztFQWxCdUNDLDBCOztrQkFBckI1QyxZIiwiZmlsZSI6ImhleGFnb24tbGF5ZXIuanMiLCJzb3VyY2VzQ29udGVudCI6WyIvLyBDb3B5cmlnaHQgKGMpIDIwMTggVWJlciBUZWNobm9sb2dpZXMsIEluYy5cbi8vXG4vLyBQZXJtaXNzaW9uIGlzIGhlcmVieSBncmFudGVkLCBmcmVlIG9mIGNoYXJnZSwgdG8gYW55IHBlcnNvbiBvYnRhaW5pbmcgYSBjb3B5XG4vLyBvZiB0aGlzIHNvZnR3YXJlIGFuZCBhc3NvY2lhdGVkIGRvY3VtZW50YXRpb24gZmlsZXMgKHRoZSBcIlNvZnR3YXJlXCIpLCB0byBkZWFsXG4vLyBpbiB0aGUgU29mdHdhcmUgd2l0aG91dCByZXN0cmljdGlvbiwgaW5jbHVkaW5nIHdpdGhvdXQgbGltaXRhdGlvbiB0aGUgcmlnaHRzXG4vLyB0byB1c2UsIGNvcHksIG1vZGlmeSwgbWVyZ2UsIHB1Ymxpc2gsIGRpc3RyaWJ1dGUsIHN1YmxpY2Vuc2UsIGFuZC9vciBzZWxsXG4vLyBjb3BpZXMgb2YgdGhlIFNvZnR3YXJlLCBhbmQgdG8gcGVybWl0IHBlcnNvbnMgdG8gd2hvbSB0aGUgU29mdHdhcmUgaXNcbi8vIGZ1cm5pc2hlZCB0byBkbyBzbywgc3ViamVjdCB0byB0aGUgZm9sbG93aW5nIGNvbmRpdGlvbnM6XG4vL1xuLy8gVGhlIGFib3ZlIGNvcHlyaWdodCBub3RpY2UgYW5kIHRoaXMgcGVybWlzc2lvbiBub3RpY2Ugc2hhbGwgYmUgaW5jbHVkZWQgaW5cbi8vIGFsbCBjb3BpZXMgb3Igc3Vic3RhbnRpYWwgcG9ydGlvbnMgb2YgdGhlIFNvZnR3YXJlLlxuLy9cbi8vIFRIRSBTT0ZUV0FSRSBJUyBQUk9WSURFRCBcIkFTIElTXCIsIFdJVEhPVVQgV0FSUkFOVFkgT0YgQU5ZIEtJTkQsIEVYUFJFU1MgT1Jcbi8vIElNUExJRUQsIElOQ0xVRElORyBCVVQgTk9UIExJTUlURUQgVE8gVEhFIFdBUlJBTlRJRVMgT0YgTUVSQ0hBTlRBQklMSVRZLFxuLy8gRklUTkVTUyBGT1IgQSBQQVJUSUNVTEFSIFBVUlBPU0UgQU5EIE5PTklORlJJTkdFTUVOVC4gSU4gTk8gRVZFTlQgU0hBTEwgVEhFXG4vLyBBVVRIT1JTIE9SIENPUFlSSUdIVCBIT0xERVJTIEJFIExJQUJMRSBGT1IgQU5ZIENMQUlNLCBEQU1BR0VTIE9SIE9USEVSXG4vLyBMSUFCSUxJVFksIFdIRVRIRVIgSU4gQU4gQUNUSU9OIE9GIENPTlRSQUNULCBUT1JUIE9SIE9USEVSV0lTRSwgQVJJU0lORyBGUk9NLFxuLy8gT1VUIE9GIE9SIElOIENPTk5FQ1RJT04gV0lUSCBUSEUgU09GVFdBUkUgT1IgVEhFIFVTRSBPUiBPVEhFUiBERUFMSU5HUyBJTlxuLy8gVEhFIFNPRlRXQVJFLlxuXG5pbXBvcnQge0dlb0pzb25MYXllcn0gZnJvbSAnZGVjay5nbCc7XG5pbXBvcnQgQWdncmVnYXRpb25MYXllciBmcm9tICcuLi9hZ2dyZWdhdGlvbi1sYXllcic7XG5pbXBvcnQgRW5oYW5jZWRIZXhhZ29uTGF5ZXIgZnJvbSAnZGVja2dsLWxheWVycy9oZXhhZ29uLWxheWVyL2VuaGFuY2VkLWhleGFnb24tbGF5ZXInO1xuaW1wb3J0IHtoZXhhZ29uVG9Qb2x5Z29uR2VvfSBmcm9tICcuL2hleGFnb24tdXRpbHMnO1xuaW1wb3J0IEhleGFnb25MYXllckljb24gZnJvbSAnLi9oZXhhZ29uLWxheWVyLWljb24nO1xuXG5leHBvcnQgY29uc3QgaGV4YWdvblZpc0NvbmZpZ3MgPSB7XG4gIG9wYWNpdHk6ICdvcGFjaXR5JyxcbiAgd29ybGRVbml0U2l6ZTogJ3dvcmxkVW5pdFNpemUnLFxuICByZXNvbHV0aW9uOiAncmVzb2x1dGlvbicsXG4gIGNvbG9yUmFuZ2U6ICdjb2xvclJhbmdlJyxcbiAgY292ZXJhZ2U6ICdjb3ZlcmFnZScsXG4gIHNpemVSYW5nZTogJ2VsZXZhdGlvblJhbmdlJyxcbiAgcGVyY2VudGlsZTogJ3BlcmNlbnRpbGUnLFxuICBlbGV2YXRpb25QZXJjZW50aWxlOiAnZWxldmF0aW9uUGVyY2VudGlsZScsXG4gIGVsZXZhdGlvblNjYWxlOiAnZWxldmF0aW9uU2NhbGUnLFxuICAnaGktcHJlY2lzaW9uJzogJ2hpLXByZWNpc2lvbicsXG4gIGNvbG9yQWdncmVnYXRpb246ICdhZ2dyZWdhdGlvbicsXG4gIHNpemVBZ2dyZWdhdGlvbjogJ3NpemVBZ2dyZWdhdGlvbicsXG4gIGVuYWJsZTNkOiAnZW5hYmxlM2QnXG59O1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBIZXhhZ29uTGF5ZXIgZXh0ZW5kcyBBZ2dyZWdhdGlvbkxheWVyIHtcbiAgY29uc3RydWN0b3IocHJvcHMpIHtcbiAgICBzdXBlcihwcm9wcyk7XG5cbiAgICB0aGlzLnJlZ2lzdGVyVmlzQ29uZmlnKGhleGFnb25WaXNDb25maWdzKTtcbiAgICB0aGlzLnZpc0NvbmZpZ1NldHRpbmdzLndvcmxkVW5pdFNpemUubGFiZWwgPSAnSGV4YWdvbiBSYWRpdXMgKGttKSc7XG4gIH1cblxuICBnZXQgdHlwZSgpIHtcbiAgICByZXR1cm4gJ2hleGFnb24nO1xuICB9XG5cbiAgZ2V0IG5hbWUoKSB7XG4gICAgcmV0dXJuICdIZXhiaW4nO1xuICB9XG5cbiAgZ2V0IGxheWVySWNvbigpIHtcbiAgICByZXR1cm4gSGV4YWdvbkxheWVySWNvbjtcbiAgfVxuXG4gIHJlbmRlckxheWVyKHtcbiAgICBkYXRhLFxuICAgIGlkeCxcbiAgICBvYmplY3RIb3ZlcmVkLFxuICAgIG1hcFN0YXRlLFxuICAgIGludGVyYWN0aW9uLFxuICAgIGxheWVyQ2FsbGJhY2tzXG4gIH0pIHtcbiAgICBjb25zdCB6b29tRmFjdG9yID0gdGhpcy5nZXRab29tRmFjdG9yKG1hcFN0YXRlKTtcbiAgICBjb25zdCBlbGVab29tRmFjdG9yID0gdGhpcy5nZXRFbGV2YXRpb25ab29tRmFjdG9yKG1hcFN0YXRlKTtcbiAgICBjb25zdCB7dmlzQ29uZmlnfSA9IHRoaXMuY29uZmlnO1xuICAgIGNvbnN0IHJhZGl1cyA9IHZpc0NvbmZpZy53b3JsZFVuaXRTaXplICogMTAwMDtcblxuICAgIHJldHVybiBbXG4gICAgICBuZXcgRW5oYW5jZWRIZXhhZ29uTGF5ZXIoe1xuICAgICAgICAuLi5kYXRhLFxuICAgICAgICBpZDogdGhpcy5pZCxcbiAgICAgICAgaWR4LFxuXG4gICAgICAgIC8vIGhpZ2hsaWdodFxuICAgICAgICBhdXRvSGlnaGxpZ2h0OiB2aXNDb25maWcuZW5hYmxlM2QsXG5cbiAgICAgICAgcmFkaXVzLFxuICAgICAgICBjb3ZlcmFnZTogdmlzQ29uZmlnLmNvdmVyYWdlLFxuXG4gICAgICAgIC8vIGNvbG9yXG4gICAgICAgIGNvbG9yUmFuZ2U6IHRoaXMuZ2V0Q29sb3JSYW5nZSh2aXNDb25maWcuY29sb3JSYW5nZSksXG4gICAgICAgIGNvbG9yU2NhbGU6IHRoaXMuY29uZmlnLmNvbG9yU2NhbGUsXG4gICAgICAgIG9wYWNpdHk6IHZpc0NvbmZpZy5vcGFjaXR5LFxuICAgICAgICB1cHBlclBlcmNlbnRpbGU6IHZpc0NvbmZpZy5wZXJjZW50aWxlWzFdLFxuICAgICAgICBsb3dlclBlcmNlbnRpbGU6IHZpc0NvbmZpZy5wZXJjZW50aWxlWzBdLFxuXG4gICAgICAgIC8vIHBhcmFtZXRlcnNcbiAgICAgICAgcGFyYW1ldGVyczoge2RlcHRoVGVzdDogQm9vbGVhbih2aXNDb25maWcuZW5hYmxlM2QgfHwgbWFwU3RhdGUuZHJhZ1JvdGF0ZSl9LFxuXG4gICAgICAgIC8vIGVsZXZhdGlvblxuICAgICAgICBleHRydWRlZDogdmlzQ29uZmlnLmVuYWJsZTNkLFxuICAgICAgICBlbGV2YXRpb25TY2FsZTogdmlzQ29uZmlnLmVsZXZhdGlvblNjYWxlICogZWxlWm9vbUZhY3RvcixcbiAgICAgICAgZWxldmF0aW9uTG93ZXJQZXJjZW50aWxlOiB2aXNDb25maWcuZWxldmF0aW9uUGVyY2VudGlsZVswXSxcbiAgICAgICAgZWxldmF0aW9uVXBwZXJQZXJjZW50aWxlOiB2aXNDb25maWcuZWxldmF0aW9uUGVyY2VudGlsZVsxXSxcblxuICAgICAgICAvLyByZW5kZXJcbiAgICAgICAgZnA2NDogdmlzQ29uZmlnWydoaS1wcmVjaXNpb24nXSxcbiAgICAgICAgcGlja2FibGU6IHRydWUsXG4gICAgICAgIGxpZ2h0U2V0dGluZ3M6IHRoaXMubWV0YS5saWdodFNldHRpbmdzLFxuICAgICAgICAvLyBjYWxsYmFja3NcbiAgICAgICAgb25TZXRDb2xvckRvbWFpbjogbGF5ZXJDYWxsYmFja3Mub25TZXRMYXllckRvbWFpblxuICAgICAgfSksXG5cbiAgICAgIC8vIHJlbmRlciBhbiBvdXRsaW5lIG9mIGVhY2ggaGV4YWdvbiBpZiBub3QgZXh0cnVkZWRcbiAgICAgIC4uLih0aGlzLmlzTGF5ZXJIb3ZlcmVkKG9iamVjdEhvdmVyZWQpICYmICF2aXNDb25maWcuZW5hYmxlM2RcbiAgICAgICAgPyBbXG4gICAgICAgICAgICBuZXcgR2VvSnNvbkxheWVyKHtcbiAgICAgICAgICAgICAgaWQ6IGAke3RoaXMuaWR9LWhvdmVyZWRgLFxuICAgICAgICAgICAgICBkYXRhOiBbXG4gICAgICAgICAgICAgICAgaGV4YWdvblRvUG9seWdvbkdlbyhcbiAgICAgICAgICAgICAgICAgIG9iamVjdEhvdmVyZWQsXG4gICAgICAgICAgICAgICAgICB7fSxcbiAgICAgICAgICAgICAgICAgIHJhZGl1cyAqIHZpc0NvbmZpZy5jb3ZlcmFnZSxcbiAgICAgICAgICAgICAgICAgIG1hcFN0YXRlXG4gICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICBdLFxuICAgICAgICAgICAgICBnZXRMaW5lQ29sb3I6IHRoaXMuY29uZmlnLmhpZ2hsaWdodENvbG9yLFxuICAgICAgICAgICAgICBsaW5lV2lkdGhTY2FsZTogOCAqIHpvb21GYWN0b3JcbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgXVxuICAgICAgICA6IFtdKVxuICAgIF07XG4gIH1cbn1cbiJdfQ==