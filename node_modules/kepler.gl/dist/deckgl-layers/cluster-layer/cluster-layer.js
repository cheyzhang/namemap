'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = undefined;

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

var _deck = require('deck.gl');

var _geoViewport = require('@mapbox/geo-viewport');

var _geoViewport2 = _interopRequireDefault(_geoViewport);

var _d3Array = require('d3-array');

var _dataScaleUtils = require('../../utils/data-scale-utils');

var _utils = require('../layer-utils/utils');

var _colorRanges = require('../../constants/color-ranges');

var _layerFactory = require('../../layers/layer-factory');

var _defaultSettings = require('../../constants/default-settings');

var _clusterUtils = require('../layer-utils/cluster-utils');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var defaultRadius = _layerFactory.LAYER_VIS_CONFIGS.clusterRadius.defaultValue; // Copyright (c) 2018 Uber Technologies, Inc.
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

var defaultRadiusRange = _layerFactory.LAYER_VIS_CONFIGS.clusterRadiusRange.defaultValue;

var defaultProps = {
  clusterRadius: defaultRadius,
  colorDomain: null,
  colorRange: _colorRanges.DefaultColorRange,
  colorScale: _defaultSettings.SCALE_TYPES.quantize,
  radiusRange: defaultRadiusRange,

  // maybe later...
  lowerPercentile: 0,
  upperPercentile: 100,

  getPosition: function getPosition(x) {
    return x.position;
  },

  // if want to have color based on customized aggregator, instead of count
  getColorValue: function getColorValue(points) {
    return points.length;
  },

  //  if want to have radius based on customized aggregator, instead of count
  getRadiusValue: function getRadiusValue(cell) {
    return cell.properties.point_count;
  },
  fp64: false
};

var ClusterLayer = function (_CompositeLayer) {
  (0, _inherits3.default)(ClusterLayer, _CompositeLayer);

  function ClusterLayer() {
    (0, _classCallCheck3.default)(this, ClusterLayer);
    return (0, _possibleConstructorReturn3.default)(this, (ClusterLayer.__proto__ || Object.getPrototypeOf(ClusterLayer)).apply(this, arguments));
  }

  (0, _createClass3.default)(ClusterLayer, [{
    key: 'initializeState',
    value: function initializeState() {
      this.state = {
        clusters: null,
        geoJSON: null
      };
    }
  }, {
    key: 'shouldUpdateState',
    value: function shouldUpdateState(_ref) {
      var changeFlags = _ref.changeFlags;

      return changeFlags.somethingChanged;
    }
  }, {
    key: 'updateState',
    value: function updateState(_ref2) {
      var context = _ref2.context,
          oldProps = _ref2.oldProps,
          props = _ref2.props,
          changeFlags = _ref2.changeFlags;

      if (changeFlags.dataChanged || this.needsReProjectPoints(oldProps, props)) {
        // project data into clusters, and get clustered data
        this.processGeoJSON();
        this.getClusters();

        // this needs clustered data to be set
        this.getColorValueDomain();
      } else if (this.needsReclusterPoints(oldProps, props)) {
        this.getClusters();
        this.getColorValueDomain();
      } else if (this.needsRecalculateScaleFunction(oldProps, props)) {
        this.getColorValueDomain();
      }
    }
  }, {
    key: 'needsReProjectPoints',
    value: function needsReProjectPoints(oldProps, props) {
      return oldProps.clusterRadius !== props.clusterRadius || oldProps.getPosition !== props.getPosition;
    }
  }, {
    key: 'needsReclusterPoints',
    value: function needsReclusterPoints(oldProps, props) {
      return Math.round(oldProps.zoom) !== Math.round(props.zoom);
    }
  }, {
    key: 'needsRecalculateScaleFunction',
    value: function needsRecalculateScaleFunction(oldProps, props) {
      return (0, _utils.needsRecalculateColorDomain)(oldProps, props) || (0, _utils.needReCalculateScaleFunction)(oldProps, props) || (0, _utils.needsRecalculateRadiusRange)(oldProps, props) || oldProps.getColorValue !== props.getColorValue;
    }
  }, {
    key: 'processGeoJSON',
    value: function processGeoJSON() {
      var _props = this.props,
          data = _props.data,
          getPosition = _props.getPosition;

      this.setState({ geoJSON: (0, _clusterUtils.getGeoJSON)(data, getPosition) });
      (0, _clusterUtils.clearClustererCache)();
    }
  }, {
    key: 'getClusters',
    value: function getClusters() {
      var geoJSON = this.state.geoJSON;
      var clusterRadius = this.props.clusterRadius;
      var _context = this.context,
          viewport = _context.viewport,
          _context$viewport = _context.viewport,
          longitude = _context$viewport.longitude,
          latitude = _context$viewport.latitude,
          height = _context$viewport.height,
          width = _context$viewport.width;

      // zoom needs to be an integer for the different map utils. Also helps with cache key.

      var zoom = Math.round(viewport.zoom);
      var bbox = _geoViewport2.default.bounds([longitude, latitude], zoom, [width, height]);

      var clusters = (0, _clusterUtils.clustersAtZoom)({ bbox: bbox, clusterRadius: clusterRadius, geoJSON: geoJSON, zoom: zoom });

      this.setState({ clusters: clusters });
    }
  }, {
    key: 'getColorValueDomain',
    value: function getColorValueDomain() {
      var _props2 = this.props,
          colorScale = _props2.colorScale,
          getColorValue = _props2.getColorValue,
          getRadiusValue = _props2.getRadiusValue,
          onSetColorDomain = _props2.onSetColorDomain;
      var clusters = this.state.clusters;


      var radiusDomain = [0, (0, _d3Array.max)(clusters, getRadiusValue)];

      var colorValues = clusters.map(function (d) {
        return getColorValue(d.properties.points);
      });

      var identity = function identity(d) {
        return d;
      };

      var colorDomain = colorScale === _defaultSettings.SCALE_TYPES.ordinal ? (0, _dataScaleUtils.getOrdinalDomain)(colorValues, identity) : colorScale === _defaultSettings.SCALE_TYPES.quantile ? (0, _dataScaleUtils.getQuantileDomain)(colorValues, identity, _d3Array.ascending) : (0, _dataScaleUtils.getLinearDomain)(colorValues, identity);

      this.setState({
        colorDomain: colorDomain,
        radiusDomain: radiusDomain
      });

      (0, _utils.getColorScaleFunction)(this);
      (0, _utils.getRadiusScaleFunction)(this);

      onSetColorDomain(colorDomain);
    }
  }, {
    key: 'getUpdateTriggers',
    value: function getUpdateTriggers() {
      return {
        getColor: {
          colorRange: this.props.colorRange,
          colorDomain: this.props.colorDomain,
          getColorValue: this.props.getColorValue,
          colorScale: this.props.colorScale,
          lowerPercentile: this.props.lowerPercentile,
          upperPercentile: this.props.upperPercentile
        },
        getRadius: {
          radiusRange: this.props.radiusRange,
          radiusDomain: this.props.radiusDomain,
          getRadiusValue: this.props.getRadiusValue
        }
      };
    }

    /*
     * override default layer method to calculate cell color based on color scale function
     */

  }, {
    key: '_onGetSublayerColor',
    value: function _onGetSublayerColor(cell) {
      var getColorValue = this.props.getColorValue;
      var _state = this.state,
          colorScaleFunc = _state.colorScaleFunc,
          colorDomain = _state.colorDomain;


      var cv = getColorValue(cell.properties.points);

      // if cell value is outside domain, set alpha to 0
      var color = cv >= colorDomain[0] && cv <= colorDomain[colorDomain.length - 1] ? colorScaleFunc(cv) : [0, 0, 0, 0];

      // add final alpha to color
      color[3] = Number.isFinite(color[3]) ? color[3] : 255;

      return color;
    }
  }, {
    key: '_onGetSublayerRadius',
    value: function _onGetSublayerRadius(cell) {
      var getRadiusValue = this.props.getRadiusValue;
      var radiusScaleFunc = this.state.radiusScaleFunc;

      return radiusScaleFunc(getRadiusValue(cell));
    }
  }, {
    key: 'getPickingInfo',
    value: function getPickingInfo(_ref3) {
      var info = _ref3.info;
      var clusters = this.state.clusters;

      var isPicked = info.picked && info.index > -1;

      var object = null;
      if (isPicked) {
        // add cluster colorValue to object
        var cluster = clusters[info.index];
        var colorValue = this.props.getColorValue(cluster.properties.points);

        object = (0, _extends3.default)({}, cluster.properties, {
          colorValue: colorValue,
          radius: this._onGetSublayerRadius(cluster),
          position: cluster.geometry.coordinates
        });
      }

      return (0, _extends3.default)({}, info, {
        picked: Boolean(object),
        // override object with picked cluster property
        object: object
      });
    }
  }, {
    key: 'renderLayers',
    value: function renderLayers() {
      // for subclassing, override this method to return
      // customized sub layer props
      var _props3 = this.props,
          id = _props3.id,
          radiusScale = _props3.radiusScale,
          fp64 = _props3.fp64;

      // base layer props

      var _props4 = this.props,
          opacity = _props4.opacity,
          pickable = _props4.pickable,
          autoHighlight = _props4.autoHighlight,
          highlightColor = _props4.highlightColor;

      // return props to the sublayer constructor

      return new _deck.ScatterplotLayer({
        id: id + '-cluster',
        data: this.state.clusters,
        radiusScale: radiusScale,
        fp64: fp64,
        opacity: opacity,
        pickable: pickable,
        autoHighlight: autoHighlight,
        highlightColor: highlightColor,
        getPosition: function getPosition(d) {
          return d.geometry.coordinates;
        },
        getRadius: this._onGetSublayerRadius.bind(this),
        getColor: this._onGetSublayerColor.bind(this),
        updateTriggers: this.getUpdateTriggers()
      });
    }
  }]);
  return ClusterLayer;
}(_deck.CompositeLayer);

exports.default = ClusterLayer;


ClusterLayer.layerName = 'ClusterLayer';
ClusterLayer.defaultProps = defaultProps;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9kZWNrZ2wtbGF5ZXJzL2NsdXN0ZXItbGF5ZXIvY2x1c3Rlci1sYXllci5qcyJdLCJuYW1lcyI6WyJkZWZhdWx0UmFkaXVzIiwiTEFZRVJfVklTX0NPTkZJR1MiLCJjbHVzdGVyUmFkaXVzIiwiZGVmYXVsdFZhbHVlIiwiZGVmYXVsdFJhZGl1c1JhbmdlIiwiY2x1c3RlclJhZGl1c1JhbmdlIiwiZGVmYXVsdFByb3BzIiwiY29sb3JEb21haW4iLCJjb2xvclJhbmdlIiwiRGVmYXVsdENvbG9yUmFuZ2UiLCJjb2xvclNjYWxlIiwiU0NBTEVfVFlQRVMiLCJxdWFudGl6ZSIsInJhZGl1c1JhbmdlIiwibG93ZXJQZXJjZW50aWxlIiwidXBwZXJQZXJjZW50aWxlIiwiZ2V0UG9zaXRpb24iLCJ4IiwicG9zaXRpb24iLCJnZXRDb2xvclZhbHVlIiwicG9pbnRzIiwibGVuZ3RoIiwiZ2V0UmFkaXVzVmFsdWUiLCJjZWxsIiwicHJvcGVydGllcyIsInBvaW50X2NvdW50IiwiZnA2NCIsIkNsdXN0ZXJMYXllciIsInN0YXRlIiwiY2x1c3RlcnMiLCJnZW9KU09OIiwiY2hhbmdlRmxhZ3MiLCJzb21ldGhpbmdDaGFuZ2VkIiwiY29udGV4dCIsIm9sZFByb3BzIiwicHJvcHMiLCJkYXRhQ2hhbmdlZCIsIm5lZWRzUmVQcm9qZWN0UG9pbnRzIiwicHJvY2Vzc0dlb0pTT04iLCJnZXRDbHVzdGVycyIsImdldENvbG9yVmFsdWVEb21haW4iLCJuZWVkc1JlY2x1c3RlclBvaW50cyIsIm5lZWRzUmVjYWxjdWxhdGVTY2FsZUZ1bmN0aW9uIiwiTWF0aCIsInJvdW5kIiwiem9vbSIsImRhdGEiLCJzZXRTdGF0ZSIsInZpZXdwb3J0IiwibG9uZ2l0dWRlIiwibGF0aXR1ZGUiLCJoZWlnaHQiLCJ3aWR0aCIsImJib3giLCJnZW9WaWV3cG9ydCIsImJvdW5kcyIsIm9uU2V0Q29sb3JEb21haW4iLCJyYWRpdXNEb21haW4iLCJjb2xvclZhbHVlcyIsIm1hcCIsImQiLCJpZGVudGl0eSIsIm9yZGluYWwiLCJxdWFudGlsZSIsImFzY2VuZGluZyIsImdldENvbG9yIiwiZ2V0UmFkaXVzIiwiY29sb3JTY2FsZUZ1bmMiLCJjdiIsImNvbG9yIiwiTnVtYmVyIiwiaXNGaW5pdGUiLCJyYWRpdXNTY2FsZUZ1bmMiLCJpbmZvIiwiaXNQaWNrZWQiLCJwaWNrZWQiLCJpbmRleCIsIm9iamVjdCIsImNsdXN0ZXIiLCJjb2xvclZhbHVlIiwicmFkaXVzIiwiX29uR2V0U3VibGF5ZXJSYWRpdXMiLCJnZW9tZXRyeSIsImNvb3JkaW5hdGVzIiwiQm9vbGVhbiIsImlkIiwicmFkaXVzU2NhbGUiLCJvcGFjaXR5IiwicGlja2FibGUiLCJhdXRvSGlnaGxpZ2h0IiwiaGlnaGxpZ2h0Q29sb3IiLCJTY2F0dGVycGxvdExheWVyIiwiYmluZCIsIl9vbkdldFN1YmxheWVyQ29sb3IiLCJ1cGRhdGVUcmlnZ2VycyIsImdldFVwZGF0ZVRyaWdnZXJzIiwiQ29tcG9zaXRlTGF5ZXIiLCJsYXllck5hbWUiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQW9CQTs7QUFDQTs7OztBQUNBOztBQUNBOztBQUtBOztBQU9BOztBQUNBOztBQUNBOztBQUVBOzs7O0FBTUEsSUFBTUEsZ0JBQWdCQyxnQ0FBa0JDLGFBQWxCLENBQWdDQyxZQUF0RCxDLENBN0NBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQTRCQSxJQUFNQyxxQkFBcUJILGdDQUFrQkksa0JBQWxCLENBQXFDRixZQUFoRTs7QUFFQSxJQUFNRyxlQUFlO0FBQ25CSixpQkFBZUYsYUFESTtBQUVuQk8sZUFBYSxJQUZNO0FBR25CQyxjQUFZQyw4QkFITztBQUluQkMsY0FBWUMsNkJBQVlDLFFBSkw7QUFLbkJDLGVBQWFULGtCQUxNOztBQU9uQjtBQUNBVSxtQkFBaUIsQ0FSRTtBQVNuQkMs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Tk07QUFBQSxVQU1HQyxRQU5ILFdBTUdBLFFBTkg7QUFBQSxVQU1hQyxhQU5iLFdBTWFBLGFBTmI7QUFBQSxVQU00QkMsY0FONUIsV0FNNEJBLGNBTjVCOztBQVFiOztBQUNBLGFBQU8sSUFBSUMsc0JBQUosQ0FBcUI7QUFDMUJOLFlBQU9BLEVBQVAsYUFEMEI7QUFFMUJ2QyxjQUFNLEtBQUtsQixLQUFMLENBQVdDLFFBRlM7QUFHMUJ5RCxnQ0FIMEI7QUFJMUI1RCxrQkFKMEI7QUFLMUI2RCx3QkFMMEI7QUFNMUJDLDBCQU4wQjtBQU8xQkMsb0NBUDBCO0FBUTFCQyxzQ0FSMEI7QUFTMUIxRSxxQkFBYTtBQUFBLGlCQUFLNEMsRUFBRXNCLFFBQUYsQ0FBV0MsV0FBaEI7QUFBQSxTQVRhO0FBVTFCakIsbUJBQVcsS0FBS2Usb0JBQUwsQ0FBMEJXLElBQTFCLENBQStCLElBQS9CLENBVmU7QUFXMUIzQixrQkFBVSxLQUFLNEIsbUJBQUwsQ0FBeUJELElBQXpCLENBQThCLElBQTlCLENBWGdCO0FBWTFCRSx3QkFBZ0IsS0FBS0MsaUJBQUw7QUFaVSxPQUFyQixDQUFQO0FBY0Q7OztFQTNNdUNDLG9COztrQkFBckJyRSxZOzs7QUE4TXJCQSxhQUFhc0UsU0FBYixHQUF5QixjQUF6QjtBQUNBdEUsYUFBYXJCLFlBQWIsR0FBNEJBLFlBQTVCIiwiZmlsZSI6ImNsdXN0ZXItbGF5ZXIuanMiLCJzb3VyY2VzQ29udGVudCI6WyIvLyBDb3B5cmlnaHQgKGMpIDIwMTggVWJlciBUZWNobm9sb2dpZXMsIEluYy5cbi8vXG4vLyBQZXJtaXNzaW9uIGlzIGhlcmVieSBncmFudGVkLCBmcmVlIG9mIGNoYXJnZSwgdG8gYW55IHBlcnNvbiBvYnRhaW5pbmcgYSBjb3B5XG4vLyBvZiB0aGlzIHNvZnR3YXJlIGFuZCBhc3NvY2lhdGVkIGRvY3VtZW50YXRpb24gZmlsZXMgKHRoZSBcIlNvZnR3YXJlXCIpLCB0byBkZWFsXG4vLyBpbiB0aGUgU29mdHdhcmUgd2l0aG91dCByZXN0cmljdGlvbiwgaW5jbHVkaW5nIHdpdGhvdXQgbGltaXRhdGlvbiB0aGUgcmlnaHRzXG4vLyB0byB1c2UsIGNvcHksIG1vZGlmeSwgbWVyZ2UsIHB1Ymxpc2gsIGRpc3RyaWJ1dGUsIHN1YmxpY2Vuc2UsIGFuZC9vciBzZWxsXG4vLyBjb3BpZXMgb2YgdGhlIFNvZnR3YXJlLCBhbmQgdG8gcGVybWl0IHBlcnNvbnMgdG8gd2hvbSB0aGUgU29mdHdhcmUgaXNcbi8vIGZ1cm5pc2hlZCB0byBkbyBzbywgc3ViamVjdCB0byB0aGUgZm9sbG93aW5nIGNvbmRpdGlvbnM6XG4vL1xuLy8gVGhlIGFib3ZlIGNvcHlyaWdodCBub3RpY2UgYW5kIHRoaXMgcGVybWlzc2lvbiBub3RpY2Ugc2hhbGwgYmUgaW5jbHVkZWQgaW5cbi8vIGFsbCBjb3BpZXMgb3Igc3Vic3RhbnRpYWwgcG9ydGlvbnMgb2YgdGhlIFNvZnR3YXJlLlxuLy9cbi8vIFRIRSBTT0ZUV0FSRSBJUyBQUk9WSURFRCBcIkFTIElTXCIsIFdJVEhPVVQgV0FSUkFOVFkgT0YgQU5ZIEtJTkQsIEVYUFJFU1MgT1Jcbi8vIElNUExJRUQsIElOQ0xVRElORyBCVVQgTk9UIExJTUlURUQgVE8gVEhFIFdBUlJBTlRJRVMgT0YgTUVSQ0hBTlRBQklMSVRZLFxuLy8gRklUTkVTUyBGT1IgQSBQQVJUSUNVTEFSIFBVUlBPU0UgQU5EIE5PTklORlJJTkdFTUVOVC4gSU4gTk8gRVZFTlQgU0hBTEwgVEhFXG4vLyBBVVRIT1JTIE9SIENPUFlSSUdIVCBIT0xERVJTIEJFIExJQUJMRSBGT1IgQU5ZIENMQUlNLCBEQU1BR0VTIE9SIE9USEVSXG4vLyBMSUFCSUxJVFksIFdIRVRIRVIgSU4gQU4gQUNUSU9OIE9GIENPTlRSQUNULCBUT1JUIE9SIE9USEVSV0lTRSwgQVJJU0lORyBGUk9NLFxuLy8gT1VUIE9GIE9SIElOIENPTk5FQ1RJT04gV0lUSCBUSEUgU09GVFdBUkUgT1IgVEhFIFVTRSBPUiBPVEhFUiBERUFMSU5HUyBJTlxuLy8gVEhFIFNPRlRXQVJFLlxuXG5pbXBvcnQge0NvbXBvc2l0ZUxheWVyLCBTY2F0dGVycGxvdExheWVyfSBmcm9tICdkZWNrLmdsJztcbmltcG9ydCBnZW9WaWV3cG9ydCBmcm9tICdAbWFwYm94L2dlby12aWV3cG9ydCc7XG5pbXBvcnQge2FzY2VuZGluZywgbWF4fSBmcm9tICdkMy1hcnJheSc7XG5pbXBvcnQge1xuICBnZXRRdWFudGlsZURvbWFpbixcbiAgZ2V0T3JkaW5hbERvbWFpbixcbiAgZ2V0TGluZWFyRG9tYWluXG59IGZyb20gJ3V0aWxzL2RhdGEtc2NhbGUtdXRpbHMnO1xuaW1wb3J0IHtcbiAgZ2V0Q29sb3JTY2FsZUZ1bmN0aW9uLFxuICBnZXRSYWRpdXNTY2FsZUZ1bmN0aW9uLFxuICBuZWVkc1JlY2FsY3VsYXRlUmFkaXVzUmFuZ2UsXG4gIG5lZWRzUmVjYWxjdWxhdGVDb2xvckRvbWFpbixcbiAgbmVlZFJlQ2FsY3VsYXRlU2NhbGVGdW5jdGlvblxufSBmcm9tICcuLi9sYXllci11dGlscy91dGlscyc7XG5pbXBvcnQge0RlZmF1bHRDb2xvclJhbmdlfSBmcm9tICdjb25zdGFudHMvY29sb3ItcmFuZ2VzJztcbmltcG9ydCB7TEFZRVJfVklTX0NPTkZJR1N9IGZyb20gJ2xheWVycy9sYXllci1mYWN0b3J5JztcbmltcG9ydCB7U0NBTEVfVFlQRVN9IGZyb20gJ2NvbnN0YW50cy9kZWZhdWx0LXNldHRpbmdzJztcblxuaW1wb3J0IHtcbiAgY2xlYXJDbHVzdGVyZXJDYWNoZSxcbiAgY2x1c3RlcnNBdFpvb20sXG4gIGdldEdlb0pTT05cbn0gZnJvbSAnLi4vbGF5ZXItdXRpbHMvY2x1c3Rlci11dGlscyc7XG5cbmNvbnN0IGRlZmF1bHRSYWRpdXMgPSBMQVlFUl9WSVNfQ09ORklHUy5jbHVzdGVyUmFkaXVzLmRlZmF1bHRWYWx1ZTtcbmNvbnN0IGRlZmF1bHRSYWRpdXNSYW5nZSA9IExBWUVSX1ZJU19DT05GSUdTLmNsdXN0ZXJSYWRpdXNSYW5nZS5kZWZhdWx0VmFsdWU7XG5cbmNvbnN0IGRlZmF1bHRQcm9wcyA9IHtcbiAgY2x1c3RlclJhZGl1czogZGVmYXVsdFJhZGl1cyxcbiAgY29sb3JEb21haW46IG51bGwsXG4gIGNvbG9yUmFuZ2U6IERlZmF1bHRDb2xvclJhbmdlLFxuICBjb2xvclNjYWxlOiBTQ0FMRV9UWVBFUy5xdWFudGl6ZSxcbiAgcmFkaXVzUmFuZ2U6IGRlZmF1bHRSYWRpdXNSYW5nZSxcblxuICAvLyBtYXliZSBsYXRlci4uLlxuICBsb3dlclBlcmNlbnRpbGU6IDAsXG4gIHVwcGVyUGVyY2VudGlsZTogMTAwLFxuXG4gIGdldFBvc2l0aW9uOiB4ID0+IHgucG9zaXRpb24sXG5cbiAgLy8gaWYgd2FudCB0byBoYXZlIGNvbG9yIGJhc2VkIG9uIGN1c3RvbWl6ZWQgYWdncmVnYXRvciwgaW5zdGVhZCBvZiBjb3VudFxuICBnZXRDb2xvclZhbHVlOiBwb2ludHMgPT4gcG9pbnRzLmxlbmd0aCxcblxuICAvLyAgaWYgd2FudCB0byBoYXZlIHJhZGl1cyBiYXNlZCBvbiBjdXN0b21pemVkIGFnZ3JlZ2F0b3IsIGluc3RlYWQgb2YgY291bnRcbiAgZ2V0UmFkaXVzVmFsdWU6IGNlbGwgPT4gY2VsbC5wcm9wZXJ0aWVzLnBvaW50X2NvdW50LFxuICBmcDY0OiBmYWxzZVxufTtcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgQ2x1c3RlckxheWVyIGV4dGVuZHMgQ29tcG9zaXRlTGF5ZXIge1xuICBpbml0aWFsaXplU3RhdGUoKSB7XG4gICAgdGhpcy5zdGF0ZSA9IHtcbiAgICAgIGNsdXN0ZXJzOiBudWxsLFxuICAgICAgZ2VvSlNPTjogbnVsbFxuICAgIH07XG4gIH1cblxuICBzaG91bGRVcGRhdGVTdGF0ZSh7Y2hhbmdlRmxhZ3N9KSB7XG4gICAgcmV0dXJuIGNoYW5nZUZsYWdzLnNvbWV0aGluZ0NoYW5nZWQ7XG4gIH1cblxuICB1cGRhdGVTdGF0ZSh7Y29udGV4dCwgb2xkUHJvcHMsIHByb3BzLCBjaGFuZ2VGbGFnc30pIHtcbiAgICBpZiAoY2hhbmdlRmxhZ3MuZGF0YUNoYW5nZWQgfHwgdGhpcy5uZWVkc1JlUHJvamVjdFBvaW50cyhvbGRQcm9wcywgcHJvcHMpKSB7XG4gICAgICAvLyBwcm9qZWN0IGRhdGEgaW50byBjbHVzdGVycywgYW5kIGdldCBjbHVzdGVyZWQgZGF0YVxuICAgICAgdGhpcy5wcm9jZXNzR2VvSlNPTigpO1xuICAgICAgdGhpcy5nZXRDbHVzdGVycygpO1xuXG4gICAgICAvLyB0aGlzIG5lZWRzIGNsdXN0ZXJlZCBkYXRhIHRvIGJlIHNldFxuICAgICAgdGhpcy5nZXRDb2xvclZhbHVlRG9tYWluKCk7XG4gICAgfSBlbHNlIGlmICh0aGlzLm5lZWRzUmVjbHVzdGVyUG9pbnRzKG9sZFByb3BzLCBwcm9wcykpIHtcbiAgICAgIHRoaXMuZ2V0Q2x1c3RlcnMoKTtcbiAgICAgIHRoaXMuZ2V0Q29sb3JWYWx1ZURvbWFpbigpO1xuICAgIH0gZWxzZSBpZiAodGhpcy5uZWVkc1JlY2FsY3VsYXRlU2NhbGVGdW5jdGlvbihvbGRQcm9wcywgcHJvcHMpKSB7XG4gICAgICB0aGlzLmdldENvbG9yVmFsdWVEb21haW4oKTtcbiAgICB9XG4gIH1cblxuICBuZWVkc1JlUHJvamVjdFBvaW50cyhvbGRQcm9wcywgcHJvcHMpIHtcbiAgICByZXR1cm4gKFxuICAgICAgb2xkUHJvcHMuY2x1c3RlclJhZGl1cyAhPT0gcHJvcHMuY2x1c3RlclJhZGl1cyB8fFxuICAgICAgb2xkUHJvcHMuZ2V0UG9zaXRpb24gIT09IHByb3BzLmdldFBvc2l0aW9uXG4gICAgKTtcbiAgfVxuXG4gIG5lZWRzUmVjbHVzdGVyUG9pbnRzKG9sZFByb3BzLCBwcm9wcykge1xuICAgIHJldHVybiAoXG4gICAgICBNYXRoLnJvdW5kKG9sZFByb3BzLnpvb20pICE9PSBNYXRoLnJvdW5kKHByb3BzLnpvb20pXG4gICAgKTtcbiAgfVxuXG4gIG5lZWRzUmVjYWxjdWxhdGVTY2FsZUZ1bmN0aW9uKG9sZFByb3BzLCBwcm9wcykge1xuICAgIHJldHVybiAoXG4gICAgICBuZWVkc1JlY2FsY3VsYXRlQ29sb3JEb21haW4ob2xkUHJvcHMsIHByb3BzKSB8fFxuICAgICAgbmVlZFJlQ2FsY3VsYXRlU2NhbGVGdW5jdGlvbihvbGRQcm9wcywgcHJvcHMpIHx8XG4gICAgICBuZWVkc1JlY2FsY3VsYXRlUmFkaXVzUmFuZ2Uob2xkUHJvcHMsIHByb3BzKSB8fFxuICAgICAgb2xkUHJvcHMuZ2V0Q29sb3JWYWx1ZSAhPT0gcHJvcHMuZ2V0Q29sb3JWYWx1ZVxuICAgICk7XG4gIH1cblxuICBwcm9jZXNzR2VvSlNPTigpIHtcbiAgICBjb25zdCB7ZGF0YSwgZ2V0UG9zaXRpb259ID0gdGhpcy5wcm9wcztcbiAgICB0aGlzLnNldFN0YXRlKHtnZW9KU09OOiBnZXRHZW9KU09OKGRhdGEsIGdldFBvc2l0aW9uKX0pO1xuICAgIGNsZWFyQ2x1c3RlcmVyQ2FjaGUoKTtcbiAgfVxuXG4gIGdldENsdXN0ZXJzKCkge1xuICAgIGNvbnN0IHtnZW9KU09OfSA9IHRoaXMuc3RhdGU7XG4gICAgY29uc3Qge2NsdXN0ZXJSYWRpdXN9ID0gdGhpcy5wcm9wcztcbiAgICBjb25zdCB7XG4gICAgICB2aWV3cG9ydCxcbiAgICAgIHZpZXdwb3J0OiB7bG9uZ2l0dWRlLCBsYXRpdHVkZSwgaGVpZ2h0LCB3aWR0aH1cbiAgICB9ID0gdGhpcy5jb250ZXh0O1xuXG4gICAgLy8gem9vbSBuZWVkcyB0byBiZSBhbiBpbnRlZ2VyIGZvciB0aGUgZGlmZmVyZW50IG1hcCB1dGlscy4gQWxzbyBoZWxwcyB3aXRoIGNhY2hlIGtleS5cbiAgICBjb25zdCB6b29tID0gTWF0aC5yb3VuZCh2aWV3cG9ydC56b29tKTtcbiAgICBjb25zdCBiYm94ID0gZ2VvVmlld3BvcnQuYm91bmRzKFtsb25naXR1ZGUsIGxhdGl0dWRlXSwgem9vbSwgW1xuICAgICAgd2lkdGgsXG4gICAgICBoZWlnaHRcbiAgICBdKTtcblxuICAgIGNvbnN0IGNsdXN0ZXJzID0gY2x1c3RlcnNBdFpvb20oe2Jib3gsIGNsdXN0ZXJSYWRpdXMsIGdlb0pTT04sIHpvb219KTtcblxuICAgIHRoaXMuc2V0U3RhdGUoe2NsdXN0ZXJzfSk7XG4gIH1cblxuICBnZXRDb2xvclZhbHVlRG9tYWluKCkge1xuICAgIGNvbnN0IHtcbiAgICAgIGNvbG9yU2NhbGUsXG4gICAgICBnZXRDb2xvclZhbHVlLFxuICAgICAgZ2V0UmFkaXVzVmFsdWUsXG4gICAgICBvblNldENvbG9yRG9tYWluXG4gICAgfSA9IHRoaXMucHJvcHM7XG4gICAgY29uc3Qge2NsdXN0ZXJzfSA9IHRoaXMuc3RhdGU7XG5cbiAgICBjb25zdCByYWRpdXNEb21haW4gPSBbMCwgbWF4KGNsdXN0ZXJzLCBnZXRSYWRpdXNWYWx1ZSldO1xuXG4gICAgY29uc3QgY29sb3JWYWx1ZXMgPSBjbHVzdGVycy5tYXAoZCA9PiBnZXRDb2xvclZhbHVlKGQucHJvcGVydGllcy5wb2ludHMpKTtcblxuICAgIGNvbnN0IGlkZW50aXR5ID0gZCA9PiBkO1xuXG4gICAgY29uc3QgY29sb3JEb21haW4gPVxuICAgICAgY29sb3JTY2FsZSA9PT0gU0NBTEVfVFlQRVMub3JkaW5hbFxuICAgICAgICA/IGdldE9yZGluYWxEb21haW4oY29sb3JWYWx1ZXMsIGlkZW50aXR5KVxuICAgICAgICA6IGNvbG9yU2NhbGUgPT09IFNDQUxFX1RZUEVTLnF1YW50aWxlXG4gICAgICAgICAgPyBnZXRRdWFudGlsZURvbWFpbihjb2xvclZhbHVlcywgaWRlbnRpdHksIGFzY2VuZGluZylcbiAgICAgICAgICA6IGdldExpbmVhckRvbWFpbihjb2xvclZhbHVlcywgaWRlbnRpdHkpO1xuXG4gICAgdGhpcy5zZXRTdGF0ZSh7XG4gICAgICBjb2xvckRvbWFpbixcbiAgICAgIHJhZGl1c0RvbWFpblxuICAgIH0pO1xuXG4gICAgZ2V0Q29sb3JTY2FsZUZ1bmN0aW9uKHRoaXMpO1xuICAgIGdldFJhZGl1c1NjYWxlRnVuY3Rpb24odGhpcyk7XG5cbiAgICBvblNldENvbG9yRG9tYWluKGNvbG9yRG9tYWluKTtcbiAgfVxuXG4gIGdldFVwZGF0ZVRyaWdnZXJzKCkge1xuICAgIHJldHVybiB7XG4gICAgICBnZXRDb2xvcjoge1xuICAgICAgICBjb2xvclJhbmdlOiB0aGlzLnByb3BzLmNvbG9yUmFuZ2UsXG4gICAgICAgIGNvbG9yRG9tYWluOiB0aGlzLnByb3BzLmNvbG9yRG9tYWluLFxuICAgICAgICBnZXRDb2xvclZhbHVlOiB0aGlzLnByb3BzLmdldENvbG9yVmFsdWUsXG4gICAgICAgIGNvbG9yU2NhbGU6IHRoaXMucHJvcHMuY29sb3JTY2FsZSxcbiAgICAgICAgbG93ZXJQZXJjZW50aWxlOiB0aGlzLnByb3BzLmxvd2VyUGVyY2VudGlsZSxcbiAgICAgICAgdXBwZXJQZXJjZW50aWxlOiB0aGlzLnByb3BzLnVwcGVyUGVyY2VudGlsZVxuICAgICAgfSxcbiAgICAgIGdldFJhZGl1czoge1xuICAgICAgICByYWRpdXNSYW5nZTogdGhpcy5wcm9wcy5yYWRpdXNSYW5nZSxcbiAgICAgICAgcmFkaXVzRG9tYWluOiB0aGlzLnByb3BzLnJhZGl1c0RvbWFpbixcbiAgICAgICAgZ2V0UmFkaXVzVmFsdWU6IHRoaXMucHJvcHMuZ2V0UmFkaXVzVmFsdWVcbiAgICAgIH1cbiAgICB9O1xuICB9XG5cbiAgLypcbiAgICogb3ZlcnJpZGUgZGVmYXVsdCBsYXllciBtZXRob2QgdG8gY2FsY3VsYXRlIGNlbGwgY29sb3IgYmFzZWQgb24gY29sb3Igc2NhbGUgZnVuY3Rpb25cbiAgICovXG4gIF9vbkdldFN1YmxheWVyQ29sb3IoY2VsbCkge1xuICAgIGNvbnN0IHtnZXRDb2xvclZhbHVlfSA9IHRoaXMucHJvcHM7XG4gICAgY29uc3Qge2NvbG9yU2NhbGVGdW5jLCBjb2xvckRvbWFpbn0gPSB0aGlzLnN0YXRlO1xuXG4gICAgY29uc3QgY3YgPSBnZXRDb2xvclZhbHVlKGNlbGwucHJvcGVydGllcy5wb2ludHMpO1xuXG4gICAgLy8gaWYgY2VsbCB2YWx1ZSBpcyBvdXRzaWRlIGRvbWFpbiwgc2V0IGFscGhhIHRvIDBcbiAgICBjb25zdCBjb2xvciA9XG4gICAgICBjdiA+PSBjb2xvckRvbWFpblswXSAmJiBjdiA8PSBjb2xvckRvbWFpbltjb2xvckRvbWFpbi5sZW5ndGggLSAxXVxuICAgICAgICA/IGNvbG9yU2NhbGVGdW5jKGN2KVxuICAgICAgICA6IFswLCAwLCAwLCAwXTtcblxuICAgIC8vIGFkZCBmaW5hbCBhbHBoYSB0byBjb2xvclxuICAgIGNvbG9yWzNdID0gTnVtYmVyLmlzRmluaXRlKGNvbG9yWzNdKSA/IGNvbG9yWzNdIDogMjU1O1xuXG4gICAgcmV0dXJuIGNvbG9yO1xuICB9XG5cbiAgX29uR2V0U3VibGF5ZXJSYWRpdXMoY2VsbCkge1xuICAgIGNvbnN0IHtnZXRSYWRpdXNWYWx1ZX0gPSB0aGlzLnByb3BzO1xuICAgIGNvbnN0IHtyYWRpdXNTY2FsZUZ1bmN9ID0gdGhpcy5zdGF0ZTtcbiAgICByZXR1cm4gcmFkaXVzU2NhbGVGdW5jKGdldFJhZGl1c1ZhbHVlKGNlbGwpKTtcbiAgfVxuXG4gIGdldFBpY2tpbmdJbmZvKHtpbmZvfSkge1xuICAgIGNvbnN0IHtjbHVzdGVyc30gPSB0aGlzLnN0YXRlO1xuICAgIGNvbnN0IGlzUGlja2VkID0gaW5mby5waWNrZWQgJiYgaW5mby5pbmRleCA+IC0xO1xuXG4gICAgbGV0IG9iamVjdCA9IG51bGw7XG4gICAgaWYgKGlzUGlja2VkKSB7XG4gICAgICAvLyBhZGQgY2x1c3RlciBjb2xvclZhbHVlIHRvIG9iamVjdFxuICAgICAgY29uc3QgY2x1c3RlciA9IGNsdXN0ZXJzW2luZm8uaW5kZXhdO1xuICAgICAgY29uc3QgY29sb3JWYWx1ZSA9IHRoaXMucHJvcHMuZ2V0Q29sb3JWYWx1ZShjbHVzdGVyLnByb3BlcnRpZXMucG9pbnRzKTtcblxuICAgICAgb2JqZWN0ID0ge1xuICAgICAgICAuLi5jbHVzdGVyLnByb3BlcnRpZXMsXG4gICAgICAgIGNvbG9yVmFsdWUsXG4gICAgICAgIHJhZGl1czogdGhpcy5fb25HZXRTdWJsYXllclJhZGl1cyhjbHVzdGVyKSxcbiAgICAgICAgcG9zaXRpb246IGNsdXN0ZXIuZ2VvbWV0cnkuY29vcmRpbmF0ZXNcbiAgICAgIH07XG4gICAgfVxuXG4gICAgcmV0dXJuIHtcbiAgICAgIC4uLmluZm8sXG4gICAgICBwaWNrZWQ6IEJvb2xlYW4ob2JqZWN0KSxcbiAgICAgIC8vIG92ZXJyaWRlIG9iamVjdCB3aXRoIHBpY2tlZCBjbHVzdGVyIHByb3BlcnR5XG4gICAgICBvYmplY3RcbiAgICB9O1xuICB9XG5cbiAgcmVuZGVyTGF5ZXJzKCkge1xuICAgIC8vIGZvciBzdWJjbGFzc2luZywgb3ZlcnJpZGUgdGhpcyBtZXRob2QgdG8gcmV0dXJuXG4gICAgLy8gY3VzdG9taXplZCBzdWIgbGF5ZXIgcHJvcHNcbiAgICBjb25zdCB7aWQsIHJhZGl1c1NjYWxlLCBmcDY0fSA9IHRoaXMucHJvcHM7XG5cbiAgICAvLyBiYXNlIGxheWVyIHByb3BzXG4gICAgY29uc3Qge29wYWNpdHksIHBpY2thYmxlLCBhdXRvSGlnaGxpZ2h0LCBoaWdobGlnaHRDb2xvcn0gPSB0aGlzLnByb3BzO1xuXG4gICAgLy8gcmV0dXJuIHByb3BzIHRvIHRoZSBzdWJsYXllciBjb25zdHJ1Y3RvclxuICAgIHJldHVybiBuZXcgU2NhdHRlcnBsb3RMYXllcih7XG4gICAgICBpZDogYCR7aWR9LWNsdXN0ZXJgLFxuICAgICAgZGF0YTogdGhpcy5zdGF0ZS5jbHVzdGVycyxcbiAgICAgIHJhZGl1c1NjYWxlLFxuICAgICAgZnA2NCxcbiAgICAgIG9wYWNpdHksXG4gICAgICBwaWNrYWJsZSxcbiAgICAgIGF1dG9IaWdobGlnaHQsXG4gICAgICBoaWdobGlnaHRDb2xvcixcbiAgICAgIGdldFBvc2l0aW9uOiBkID0+IGQuZ2VvbWV0cnkuY29vcmRpbmF0ZXMsXG4gICAgICBnZXRSYWRpdXM6IHRoaXMuX29uR2V0U3VibGF5ZXJSYWRpdXMuYmluZCh0aGlzKSxcbiAgICAgIGdldENvbG9yOiB0aGlzLl9vbkdldFN1YmxheWVyQ29sb3IuYmluZCh0aGlzKSxcbiAgICAgIHVwZGF0ZVRyaWdnZXJzOiB0aGlzLmdldFVwZGF0ZVRyaWdnZXJzKClcbiAgICB9KTtcbiAgfVxufVxuXG5DbHVzdGVyTGF5ZXIubGF5ZXJOYW1lID0gJ0NsdXN0ZXJMYXllcic7XG5DbHVzdGVyTGF5ZXIuZGVmYXVsdFByb3BzID0gZGVmYXVsdFByb3BzO1xuIl19