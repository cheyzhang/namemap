'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.clusterVisConfigs = undefined;

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

var _aggregationLayer = require('../aggregation-layer');

var _aggregationLayer2 = _interopRequireDefault(_aggregationLayer);

var _clusterLayer = require('../../deckgl-layers/cluster-layer/cluster-layer');

var _clusterLayer2 = _interopRequireDefault(_clusterLayer);

var _defaultSettings = require('../../constants/default-settings');

var _clusterLayerIcon = require('./cluster-layer-icon');

var _clusterLayerIcon2 = _interopRequireDefault(_clusterLayerIcon);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Copyright (c) 2018 Uber Technologies, Inc.
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

var clusterVisConfigs = exports.clusterVisConfigs = {
  opacity: 'opacity',
  clusterRadius: 'clusterRadius',
  colorRange: 'colorRange',
  radiusRange: 'clusterRadiusRange',
  'hi-precision': 'hi-precision',
  colorAggregation: 'aggregation'
};

var ClusterLayer = function (_AggregationLayer) {
  (0, _inherits3.default)(ClusterLayer, _AggregationLayer);

  function ClusterLayer(props) {
    (0, _classCallCheck3.default)(this, ClusterLayer);

    var _this = (0, _possibleConstructorReturn3.default)(this, (ClusterLayer.__proto__ || Object.getPrototypeOf(ClusterLayer)).call(this, props));

    _this.registerVisConfig(clusterVisConfigs);
    return _this;
  }

  (0, _createClass3.default)(ClusterLayer, [{
    key: 'renderLayer',
    value: function renderLayer(_ref) {
      var data = _ref.data,
          idx = _ref.idx,
          objectHovered = _ref.objectHovered,
          mapState = _ref.mapState,
          interaction = _ref.interaction,
          layerCallbacks = _ref.layerCallbacks;
      var visConfig = this.config.visConfig;


      return [new _clusterLayer2.default((0, _extends3.default)({}, data, {
        id: this.id,
        idx: idx,
        radiusScale: 1,
        radiusRange: visConfig.radiusRange,
        clusterRadius: visConfig.clusterRadius,
        colorRange: this.getColorRange(visConfig.colorRange),
        colorScale: this.config.colorScale,
        pickable: true,
        autoHighlight: true,
        highlightColor: this.config.highlightColor,
        opacity: visConfig.opacity,
        fp64: visConfig['hi-precision'],
        lightSettings: this.meta.lightSettings,
        zoom: mapState.zoom,

        // parameters
        parameters: { depthTest: mapState.dragRotate },

        // call back from layer after calculate clusters
        onSetColorDomain: layerCallbacks.onSetLayerDomain
      }))];
    }
  }, {
    key: 'type',
    get: function get() {
      return 'cluster';
    }
  }, {
    key: 'layerIcon',
    get: function get() {
      return _clusterLayerIcon2.default;
    }
  }, {
    key: 'visualChannels',
    get: function get() {
      return {
        color: {
          aggregation: 'colorAggregation',
          channelScaleType: _defaultSettings.CHANNEL_SCALES.colorAggr,
          defaultMeasure: 'Point Count',
          domain: 'colorDomain',
          field: 'colorField',
          key: 'color',
          property: 'color',
          range: 'colorRange',
          scale: 'colorScale'
        }
      };
    }
  }]);
  return ClusterLayer;
}(_aggregationLayer2.default);

exports.default = ClusterLayer;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9sYXllcnMvY2x1c3Rlci1sYXllci9jbHVzdGVyLWxheWVyLmpzIl0sIm5hbWVzIjpbImNsdXN0ZXJWaXNDb25maWdzIiwib3BhY2l0eSIsImNsdXN0ZXJSYWRpdXMiLCJjb2xvclJhbmdlIiwicmFkaXVzUmFuZ2UiLCJjb2xvckFnZ3JlZ2F0aW9uIiwiQ2x1c3RlckxheWVyIiwicHJvcHMiLCJyZWdpc3RlclZpc0NvbmZpZyIsImRhdGEiLCJpZHgiLCJvYmplY3RIb3ZlcmVkIiwibWFwU3RhdGUiLCJpbnRlcmFjdGlvbiIsImxheWVyQ2FsbGJhY2tzIiwidmlzQ29uZmlnIiwiY29uZmlnIiwiRGVja0dMQ2x1c3RlckxheWVyIiwiaWQiLCJyYWRpdXNTY2FsZSIsImdldENvbG9yUmFuZ2UiLCJjb2xvclNjYWxlIiwicGlja2FibGUiLCJhdXRvSGlnaGxpZ2h0IiwiaGlnaGxpZ2h0Q29sb3IiLCJmcDY0IiwibGlnaHRTZXR0aW5ncyIsIm1ldGEiLCJ6b29tIiwicGFyYW1ldGVycyIsImRlcHRoVGVzdCIsImRyYWdSb3RhdGUiLCJvblNldENvbG9yRG9tYWluIiwib25TZXRMYXllckRvbWFpbiIsIkNsdXN0ZXJMYXllckljb24iLCJjb2xvciIsImFnZ3JlZ2F0aW9uIiwiY2hhbm5lbFNjYWxlVHlwZSIsIkNIQU5ORUxfU0NBTEVTIiwiY29sb3JBZ2dyIiwiZGVmYXVsdE1lYXN1cmUiLCJkb21haW4iLCJmaWVsZCIsImtleSIsInByb3BlcnR5IiwicmFuZ2UiLCJzY2FsZSIsIkFnZ3JlZ2F0aW9uTGF5ZXIiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQW9CQTs7OztBQUNBOzs7O0FBQ0E7O0FBQ0E7Ozs7OztBQXZCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFPTyxJQUFNQSxnREFBb0I7QUFDL0JDLFdBQVMsU0FEc0I7QUFFL0JDLGlCQUFlLGVBRmdCO0FBRy9CQyxjQUFZLFlBSG1CO0FBSS9CQyxlQUFhLG9CQUprQjtBQUsvQixrQkFBZ0IsY0FMZTtBQU0vQkMsb0JBQWtCO0FBTmEsQ0FBMUI7O0lBU2NDLFk7OztBQUNuQix3QkFBWUMsS0FBWixFQUFtQjtBQUFBOztBQUFBLDBJQUNYQSxLQURXOztBQUVqQixVQUFLQyxpQkFBTCxDQUF1QlIsaUJBQXZCO0FBRmlCO0FBR2xCOzs7O3NDQWlDRTtBQUFBLFVBTkRTLElBTUMsUUFOREEsSUFNQztBQUFBLFVBTERDLEdBS0MsUUFMREEsR0FLQztBQUFBLFVBSkRDLGFBSUMsUUFKREEsYUFJQztBQUFBLFVBSERDLFFBR0MsUUFIREEsUUFHQztBQUFBLFVBRkRDLFdBRUMsUUFGREEsV0FFQztBQUFBLFVBRERDLGNBQ0MsUUFEREEsY0FDQztBQUFBLFVBQ01DLFNBRE4sR0FDbUIsS0FBS0MsTUFEeEIsQ0FDTUQsU0FETjs7O0FBR0QsYUFBTyxDQUNMLElBQUlFLHNCQUFKLDRCQUNLUixJQURMO0FBRUVTLFlBQUksS0FBS0EsRUFGWDtBQUdFUixnQkFIRjtBQUlFUyxxQkFBYSxDQUpmO0FBS0VmLHFCQUFhVyxVQUFVWCxXQUx6QjtBQU1FRix1QkFBZWEsVUFBVWIsYUFOM0I7QUFPRUMsb0JBQVksS0FBS2lCLGFBQUwsQ0FBbUJMLFVBQVVaLFVBQTdCLENBUGQ7QUFRRWtCLG9CQUFZLEtBQUtMLE1BQUwsQ0FBWUssVUFSMUI7QUFTRUMsa0JBQVUsSUFUWjtBQVVFQyx1QkFBZSxJQVZqQjtBQVdFQyx3QkFBZ0IsS0FBS1IsTUFBTCxDQUFZUSxjQVg5QjtBQVlFdkIsaUJBQVNjLFVBQVVkLE9BWnJCO0FBYUV3QixjQUFNVixVQUFVLGNBQVYsQ0FiUjtBQWNFVyx1QkFBZSxLQUFLQyxJQUFMLENBQVVELGFBZDNCO0FBZUVFLGNBQU1oQixTQUFTZ0IsSUFmakI7O0FBaUJFO0FBQ0FDLG9CQUFZLEVBQUNDLFdBQVdsQixTQUFTbUIsVUFBckIsRUFsQmQ7O0FBb0JFO0FBQ0FDLDBCQUFrQmxCLGVBQWVtQjtBQXJCbkMsU0FESyxDQUFQO0FBeUJEOzs7d0JBM0RVO0FBQ1QsYUFBTyxTQUFQO0FBQ0Q7Ozt3QkFFZTtBQUNkLGFBQU9DLDBCQUFQO0FBQ0Q7Ozt3QkFFb0I7QUFDbkIsYUFBTztBQUNMQyxlQUFPO0FBQ0xDLHVCQUFhLGtCQURSO0FBRUxDLDRCQUFrQkMsZ0NBQWVDLFNBRjVCO0FBR0xDLDBCQUFnQixhQUhYO0FBSUxDLGtCQUFRLGFBSkg7QUFLTEMsaUJBQU8sWUFMRjtBQU1MQyxlQUFLLE9BTkE7QUFPTEMsb0JBQVUsT0FQTDtBQVFMQyxpQkFBTyxZQVJGO0FBU0xDLGlCQUFPO0FBVEY7QUFERixPQUFQO0FBYUQ7OztFQTVCdUNDLDBCOztrQkFBckJ6QyxZIiwiZmlsZSI6ImNsdXN0ZXItbGF5ZXIuanMiLCJzb3VyY2VzQ29udGVudCI6WyIvLyBDb3B5cmlnaHQgKGMpIDIwMTggVWJlciBUZWNobm9sb2dpZXMsIEluYy5cbi8vXG4vLyBQZXJtaXNzaW9uIGlzIGhlcmVieSBncmFudGVkLCBmcmVlIG9mIGNoYXJnZSwgdG8gYW55IHBlcnNvbiBvYnRhaW5pbmcgYSBjb3B5XG4vLyBvZiB0aGlzIHNvZnR3YXJlIGFuZCBhc3NvY2lhdGVkIGRvY3VtZW50YXRpb24gZmlsZXMgKHRoZSBcIlNvZnR3YXJlXCIpLCB0byBkZWFsXG4vLyBpbiB0aGUgU29mdHdhcmUgd2l0aG91dCByZXN0cmljdGlvbiwgaW5jbHVkaW5nIHdpdGhvdXQgbGltaXRhdGlvbiB0aGUgcmlnaHRzXG4vLyB0byB1c2UsIGNvcHksIG1vZGlmeSwgbWVyZ2UsIHB1Ymxpc2gsIGRpc3RyaWJ1dGUsIHN1YmxpY2Vuc2UsIGFuZC9vciBzZWxsXG4vLyBjb3BpZXMgb2YgdGhlIFNvZnR3YXJlLCBhbmQgdG8gcGVybWl0IHBlcnNvbnMgdG8gd2hvbSB0aGUgU29mdHdhcmUgaXNcbi8vIGZ1cm5pc2hlZCB0byBkbyBzbywgc3ViamVjdCB0byB0aGUgZm9sbG93aW5nIGNvbmRpdGlvbnM6XG4vL1xuLy8gVGhlIGFib3ZlIGNvcHlyaWdodCBub3RpY2UgYW5kIHRoaXMgcGVybWlzc2lvbiBub3RpY2Ugc2hhbGwgYmUgaW5jbHVkZWQgaW5cbi8vIGFsbCBjb3BpZXMgb3Igc3Vic3RhbnRpYWwgcG9ydGlvbnMgb2YgdGhlIFNvZnR3YXJlLlxuLy9cbi8vIFRIRSBTT0ZUV0FSRSBJUyBQUk9WSURFRCBcIkFTIElTXCIsIFdJVEhPVVQgV0FSUkFOVFkgT0YgQU5ZIEtJTkQsIEVYUFJFU1MgT1Jcbi8vIElNUExJRUQsIElOQ0xVRElORyBCVVQgTk9UIExJTUlURUQgVE8gVEhFIFdBUlJBTlRJRVMgT0YgTUVSQ0hBTlRBQklMSVRZLFxuLy8gRklUTkVTUyBGT1IgQSBQQVJUSUNVTEFSIFBVUlBPU0UgQU5EIE5PTklORlJJTkdFTUVOVC4gSU4gTk8gRVZFTlQgU0hBTEwgVEhFXG4vLyBBVVRIT1JTIE9SIENPUFlSSUdIVCBIT0xERVJTIEJFIExJQUJMRSBGT1IgQU5ZIENMQUlNLCBEQU1BR0VTIE9SIE9USEVSXG4vLyBMSUFCSUxJVFksIFdIRVRIRVIgSU4gQU4gQUNUSU9OIE9GIENPTlRSQUNULCBUT1JUIE9SIE9USEVSV0lTRSwgQVJJU0lORyBGUk9NLFxuLy8gT1VUIE9GIE9SIElOIENPTk5FQ1RJT04gV0lUSCBUSEUgU09GVFdBUkUgT1IgVEhFIFVTRSBPUiBPVEhFUiBERUFMSU5HUyBJTlxuLy8gVEhFIFNPRlRXQVJFLlxuXG5pbXBvcnQgQWdncmVnYXRpb25MYXllciBmcm9tICcuLi9hZ2dyZWdhdGlvbi1sYXllcic7XG5pbXBvcnQgRGVja0dMQ2x1c3RlckxheWVyIGZyb20gJ2RlY2tnbC1sYXllcnMvY2x1c3Rlci1sYXllci9jbHVzdGVyLWxheWVyJztcbmltcG9ydCB7Q0hBTk5FTF9TQ0FMRVN9IGZyb20gJ2NvbnN0YW50cy9kZWZhdWx0LXNldHRpbmdzJztcbmltcG9ydCBDbHVzdGVyTGF5ZXJJY29uIGZyb20gJy4vY2x1c3Rlci1sYXllci1pY29uJztcblxuZXhwb3J0IGNvbnN0IGNsdXN0ZXJWaXNDb25maWdzID0ge1xuICBvcGFjaXR5OiAnb3BhY2l0eScsXG4gIGNsdXN0ZXJSYWRpdXM6ICdjbHVzdGVyUmFkaXVzJyxcbiAgY29sb3JSYW5nZTogJ2NvbG9yUmFuZ2UnLFxuICByYWRpdXNSYW5nZTogJ2NsdXN0ZXJSYWRpdXNSYW5nZScsXG4gICdoaS1wcmVjaXNpb24nOiAnaGktcHJlY2lzaW9uJyxcbiAgY29sb3JBZ2dyZWdhdGlvbjogJ2FnZ3JlZ2F0aW9uJ1xufTtcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgQ2x1c3RlckxheWVyIGV4dGVuZHMgQWdncmVnYXRpb25MYXllciB7XG4gIGNvbnN0cnVjdG9yKHByb3BzKSB7XG4gICAgc3VwZXIocHJvcHMpO1xuICAgIHRoaXMucmVnaXN0ZXJWaXNDb25maWcoY2x1c3RlclZpc0NvbmZpZ3MpO1xuICB9XG5cbiAgZ2V0IHR5cGUoKSB7XG4gICAgcmV0dXJuICdjbHVzdGVyJztcbiAgfVxuXG4gIGdldCBsYXllckljb24oKSB7XG4gICAgcmV0dXJuIENsdXN0ZXJMYXllckljb247XG4gIH1cblxuICBnZXQgdmlzdWFsQ2hhbm5lbHMoKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIGNvbG9yOiB7XG4gICAgICAgIGFnZ3JlZ2F0aW9uOiAnY29sb3JBZ2dyZWdhdGlvbicsXG4gICAgICAgIGNoYW5uZWxTY2FsZVR5cGU6IENIQU5ORUxfU0NBTEVTLmNvbG9yQWdncixcbiAgICAgICAgZGVmYXVsdE1lYXN1cmU6ICdQb2ludCBDb3VudCcsXG4gICAgICAgIGRvbWFpbjogJ2NvbG9yRG9tYWluJyxcbiAgICAgICAgZmllbGQ6ICdjb2xvckZpZWxkJyxcbiAgICAgICAga2V5OiAnY29sb3InLFxuICAgICAgICBwcm9wZXJ0eTogJ2NvbG9yJyxcbiAgICAgICAgcmFuZ2U6ICdjb2xvclJhbmdlJyxcbiAgICAgICAgc2NhbGU6ICdjb2xvclNjYWxlJ1xuICAgICAgfVxuICAgIH07XG4gIH1cblxuICByZW5kZXJMYXllcih7XG4gICAgZGF0YSxcbiAgICBpZHgsXG4gICAgb2JqZWN0SG92ZXJlZCxcbiAgICBtYXBTdGF0ZSxcbiAgICBpbnRlcmFjdGlvbixcbiAgICBsYXllckNhbGxiYWNrc1xuICB9KSB7XG4gICAgY29uc3Qge3Zpc0NvbmZpZ30gPSB0aGlzLmNvbmZpZztcblxuICAgIHJldHVybiBbXG4gICAgICBuZXcgRGVja0dMQ2x1c3RlckxheWVyKHtcbiAgICAgICAgLi4uZGF0YSxcbiAgICAgICAgaWQ6IHRoaXMuaWQsXG4gICAgICAgIGlkeCxcbiAgICAgICAgcmFkaXVzU2NhbGU6IDEsXG4gICAgICAgIHJhZGl1c1JhbmdlOiB2aXNDb25maWcucmFkaXVzUmFuZ2UsXG4gICAgICAgIGNsdXN0ZXJSYWRpdXM6IHZpc0NvbmZpZy5jbHVzdGVyUmFkaXVzLFxuICAgICAgICBjb2xvclJhbmdlOiB0aGlzLmdldENvbG9yUmFuZ2UodmlzQ29uZmlnLmNvbG9yUmFuZ2UpLFxuICAgICAgICBjb2xvclNjYWxlOiB0aGlzLmNvbmZpZy5jb2xvclNjYWxlLFxuICAgICAgICBwaWNrYWJsZTogdHJ1ZSxcbiAgICAgICAgYXV0b0hpZ2hsaWdodDogdHJ1ZSxcbiAgICAgICAgaGlnaGxpZ2h0Q29sb3I6IHRoaXMuY29uZmlnLmhpZ2hsaWdodENvbG9yLFxuICAgICAgICBvcGFjaXR5OiB2aXNDb25maWcub3BhY2l0eSxcbiAgICAgICAgZnA2NDogdmlzQ29uZmlnWydoaS1wcmVjaXNpb24nXSxcbiAgICAgICAgbGlnaHRTZXR0aW5nczogdGhpcy5tZXRhLmxpZ2h0U2V0dGluZ3MsXG4gICAgICAgIHpvb206IG1hcFN0YXRlLnpvb20sXG5cbiAgICAgICAgLy8gcGFyYW1ldGVyc1xuICAgICAgICBwYXJhbWV0ZXJzOiB7ZGVwdGhUZXN0OiBtYXBTdGF0ZS5kcmFnUm90YXRlfSxcblxuICAgICAgICAvLyBjYWxsIGJhY2sgZnJvbSBsYXllciBhZnRlciBjYWxjdWxhdGUgY2x1c3RlcnNcbiAgICAgICAgb25TZXRDb2xvckRvbWFpbjogbGF5ZXJDYWxsYmFja3Mub25TZXRMYXllckRvbWFpblxuICAgICAgfSlcbiAgICBdO1xuICB9XG59XG4iXX0=