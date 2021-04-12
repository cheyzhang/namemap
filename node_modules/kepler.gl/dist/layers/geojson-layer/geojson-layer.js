'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.featureResolver = exports.featureAccessor = exports.geoJsonRequiredColumns = exports.geojsonVisConfigs = undefined;

var _toConsumableArray2 = require('babel-runtime/helpers/toConsumableArray');

var _toConsumableArray3 = _interopRequireDefault(_toConsumableArray2);

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _get2 = require('babel-runtime/helpers/get');

var _get3 = _interopRequireDefault(_get2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

var _lodash = require('lodash.memoize');

var _lodash2 = _interopRequireDefault(_lodash);

var _lodash3 = require('lodash.uniq');

var _lodash4 = _interopRequireDefault(_lodash3);

var _baseLayer = require('../base-layer');

var _baseLayer2 = _interopRequireDefault(_baseLayer);

var _solidPolygonLayer = require('../../deckgl-layers/geojson-layer/solid-polygon-layer');

var _solidPolygonLayer2 = _interopRequireDefault(_solidPolygonLayer);

var _deck = require('deck.gl');

var _colorUtils = require('../../utils/color-utils');

var _geojsonUtils = require('./geojson-utils');

var _geojsonLayerIcon = require('./geojson-layer-icon');

var _geojsonLayerIcon2 = _interopRequireDefault(_geojsonLayerIcon);

var _defaultSettings = require('../../constants/default-settings');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var geojsonVisConfigs = exports.geojsonVisConfigs = {
  opacity: 'opacity',
  thickness: {
    type: 'number',
    defaultValue: 0.5,
    label: 'Stroke Width',
    isRanged: false,
    range: [0, 100],
    step: 0.1,
    group: 'stroke',
    property: 'thickness'
  },
  colorRange: 'colorRange',
  radius: 'radius',

  sizeRange: 'strokeWidthRange',
  radiusRange: 'radiusRange',
  heightRange: 'elevationRange',
  elevationScale: 'elevationScale',

  'hi-precision': 'hi-precision',
  stroked: 'stroked',
  filled: 'filled',
  enable3d: 'enable3d',
  wireframe: 'wireframe'
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

var geoJsonRequiredColumns = exports.geoJsonRequiredColumns = ['geojson'];
var featureAccessor = exports.featureAccessor = function featureAccessor(_ref) {
  var geojson = _ref.geojson;
  return function (d) {
    return d[geojson.fieldIdx];
  };
};
var featureResolver = exports.featureResolver = function featureResolver(_ref2) {
  var geojson = _ref2.geojson;
  return geojson.fieldIdx;
};

var GeoJsonLayer = function (_Layer) {
  (0, _inherits3.default)(GeoJsonLayer, _Layer);

  function GeoJsonLayer(props) {
    (0, _classCallCheck3.default)(this, GeoJsonLayer);

    var _this = (0, _possibleConstructorReturn3.default)(this, (GeoJsonLayer.__proto__ || Object.getPrototypeOf(GeoJsonLayer)).call(this, props));

    _this.dataToFeature = {};
    _this.registerVisConfig(geojsonVisConfigs);
    _this.getFeature = (0, _lodash2.default)(featureAccessor, featureResolver);
    return _this;
  }

  (0, _createClass3.default)(GeoJsonLayer, [{
    key: 'getDefaultLayerConfig',
    value: function getDefaultLayerConfig() {
      var props = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

      return (0, _extends3.default)({}, (0, _get3.default)(GeoJsonLayer.prototype.__proto__ || Object.getPrototypeOf(GeoJsonLayer.prototype), 'getDefaultLayerConfig', this).call(this, props), {

        // add height visual channel
        heightField: null,
        heightDomain: [0, 1],
        heightScale: 'linear',

        // add radius visual channel
        radiusField: null,
        radiusDomain: [0, 1],
        radiusScale: 'linear'
      });
    }
  }, {
    key: 'getHoverData',
    value: function getHoverData(object, allData) {
      // index of allData is saved to feature.properties
      return allData[object.properties.index];
    }
  }, {
    key: 'formatLayerData',
    value: function formatLayerData(_, allData, filteredIndex, oldLayerData) {
      var _this2 = this;

      var opt = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : {};
      var _config = this.config,
          colorScale = _config.colorScale,
          colorField = _config.colorField,
          colorDomain = _config.colorDomain,
          color = _config.color,
          sizeScale = _config.sizeScale,
          sizeDomain = _config.sizeDomain,
          sizeField = _config.sizeField,
          heightField = _config.heightField,
          heightDomain = _config.heightDomain,
          heightScale = _config.heightScale,
          radiusField = _config.radiusField,
          radiusDomain = _config.radiusDomain,
          radiusScale = _config.radiusScale,
          visConfig = _config.visConfig,
          columns = _config.columns;
      var enable3d = visConfig.enable3d,
          stroked = visConfig.stroked,
          colorRange = visConfig.colorRange,
          heightRange = visConfig.heightRange,
          sizeRange = visConfig.sizeRange,
          radiusRange = visConfig.radiusRange;


      var getFeature = this.getFeature(columns);

      // geojson feature are object, if doesn't exists
      // create it and save to layer
      if (!oldLayerData || oldLayerData.getFeature !== getFeature) {
        this.updateLayerMeta(allData, getFeature);
      }

      var geojsonData = void 0;

      if (oldLayerData && oldLayerData.data && opt.sameData && oldLayerData.getFeature === getFeature) {
        // no need to create a new array of data
        // use updateTriggers to selectively re-calculate attributes
        geojsonData = oldLayerData.data;
      } else {
        // filteredIndex is a reference of index in allData which can map to feature
        geojsonData = filteredIndex.map(function (i) {
          return _this2.dataToFeature[i];
        }).filter(function (d) {
          return d;
        });
      }

      var cScale = colorField && this.getVisChannelScale(colorScale, colorDomain, colorRange.colors.map(_colorUtils.hexToRgb));

      // calculate stroke scale - if stroked = true
      var sScale = sizeField && stroked && this.getVisChannelScale(sizeScale, sizeDomain, sizeRange);

      // calculate elevation scale - if extruded = true
      var eScale = heightField && enable3d && this.getVisChannelScale(heightScale, heightDomain, heightRange);

      // point radius
      var rScale = radiusField && this.getVisChannelScale(radiusScale, radiusDomain, radiusRange);

      return {
        data: geojsonData,
        getFeature: getFeature,
        getFillColor: function getFillColor(d) {
          return cScale ? _this2.getEncodedChannelValue(cScale, allData[d.properties.index], colorField) : d.properties.fillColor || color;
        },
        getLineColor: function getLineColor(d) {
          return cScale ? _this2.getEncodedChannelValue(cScale, allData[d.properties.index], colorField) : d.properties.lineColor || color;
        },
        getLineWidth: function getLineWidth(d) {
          return sScale ? _this2.getEncodedChannelValue(sScale, allData[d.properties.index], sizeField, 0) : d.properties.lineWidth || 1;
        },
        getElevation: function getElevation(d) {
          return eScale ? _this2.getEncodedChannelValue(eScale, allData[d.properties.index], heightField, 0) : d.properties.elevation || 500;
        },
        getRadius: function getRadius(d) {
          return rScale ? _this2.getEncodedChannelValue(rScale, allData[d.properties.index], radiusField, 0) : d.properties.radius || 1;
        }
      };
    }
  }, {
    key: 'updateLayerMeta',
    value: function updateLayerMeta(allData, getFeature) {
      this.dataToFeature = (0, _geojsonUtils.getGeojsonDataMaps)(allData, getFeature);

      // calculate layer meta
      var allFeatures = Object.values(this.dataToFeature);

      // get bounds from features
      var bounds = (0, _geojsonUtils.getGeojsonBounds)(allFeatures);

      // get lightSettings from points
      var lightSettings = this.getLightSettingsFromBounds(bounds);

      // if any of the feature has properties.hi-precision set to be true
      var fp64 = Boolean(allFeatures.find(function (d) {
        return d && d.properties && d.properties['hi-precision'];
      }));
      var fixedRadius = Boolean(allFeatures.find(function (d) {
        return d && d.properties && d.properties.radius;
      }));

      // keep a record of what type of geometry the collection has
      var featureTypes = allFeatures.reduce(function (accu, f) {
        var geoType = (0, _geojsonUtils.featureToDeckGlGeoType)(f && f.geometry && f.geometry.type);

        if (geoType) {
          accu[geoType] = true;
        }
        return accu;
      }, {});

      this.updateMeta({ bounds: bounds, lightSettings: lightSettings, fp64: fp64, fixedRadius: fixedRadius, featureTypes: featureTypes });
    }
  }, {
    key: 'renderLayer',
    value: function renderLayer(_ref3) {
      var data = _ref3.data,
          idx = _ref3.idx,
          objectHovered = _ref3.objectHovered,
          mapState = _ref3.mapState,
          interactionConfig = _ref3.interactionConfig;
      var _meta = this.meta,
          fp64 = _meta.fp64,
          lightSettings = _meta.lightSettings,
          fixedRadius = _meta.fixedRadius;

      var radiusScale = this.getRadiusScaleByZoom(mapState, fixedRadius);
      var zoomFactor = this.getZoomFactor(mapState);
      var visConfig = this.config.visConfig;


      var layerProps = {
        // multiplier applied just so it being consistent with previously saved maps
        lineWidthScale: visConfig.thickness * zoomFactor * 8,
        lineWidthMinPixels: 1,
        elevationScale: visConfig.elevationScale,
        pointRadiusScale: radiusScale,
        fp64: fp64 || visConfig['hi-precision'],
        lineMiterLimit: 4
      };

      var updateTriggers = {
        getElevation: {
          heightField: this.config.heightField,
          heightScale: this.config.heightScale,
          heightRange: visConfig.heightRange
        },
        getFillColor: {
          color: this.config.color,
          colorField: this.config.colorField,
          colorRange: visConfig.colorRange,
          colorScale: this.config.colorScale
        },
        getLineColor: {
          color: this.config.color,
          colorField: this.config.colorField,
          colorRange: visConfig.colorRange,
          colorScale: this.config.colorScale
        },
        getLineWidth: {
          sizeField: this.config.sizeField,
          sizeRange: visConfig.sizeRange
        },
        getRadius: {
          radiusField: this.config.radiusField,
          radiusRange: visConfig.radiusRange
        }
      };

      return [new _deck.GeoJsonLayer((0, _extends3.default)({}, layerProps, {
        id: this.id,
        idx: idx,
        data: data.data,
        getFillColor: data.getFillColor,
        getLineColor: data.getLineColor,
        getLineWidth: data.getLineWidth,
        getRadius: data.getRadius,
        getElevation: data.getElevation,
        // highlight
        pickable: true,
        // highlightColor: this.config.highlightColor,
        autoHighlight: visConfig.enable3d,
        // parameters
        parameters: { depthTest: Boolean(visConfig.enable3d || mapState.dragRotate) },
        opacity: visConfig.opacity,
        stroked: visConfig.stroked,
        filled: visConfig.filled,
        extruded: visConfig.enable3d,
        wireframe: visConfig.wireframe,
        lightSettings: lightSettings,
        updateTriggers: updateTriggers,

        subLayers: (0, _extends3.default)({}, _deck.GeoJsonLayer.defaultProps.subLayers, {
          PolygonLayer: _solidPolygonLayer2.default
        })
      }))].concat((0, _toConsumableArray3.default)(this.isLayerHovered(objectHovered) && !visConfig.enable3d ? [new _deck.GeoJsonLayer((0, _extends3.default)({}, layerProps, {
        id: this.id + '-hovered',
        data: [(0, _extends3.default)({}, objectHovered.object, {
          properties: (0, _extends3.default)({}, objectHovered.object.properties, {
            lineColor: this.config.highlightColor,
            fillColor: this.config.highlightColor
          }),
          getLineWidth: data.getLineWidth,
          getRadius: data.getRadius,
          getElevation: data.getElevation
        })],
        updateTriggers: updateTriggers,
        stroked: true,
        pickable: false,
        filled: false
      }))] : []));
    }
  }, {
    key: 'type',
    get: function get() {
      return 'geojson';
    }
  }, {
    key: 'name',
    get: function get() {
      return 'Polygon';
    }
  }, {
    key: 'layerIcon',
    get: function get() {
      return _geojsonLayerIcon2.default;
    }
  }, {
    key: 'requiredLayerColumns',
    get: function get() {
      return geoJsonRequiredColumns;
    }
  }, {
    key: 'visualChannels',
    get: function get() {
      return (0, _extends3.default)({}, (0, _get3.default)(GeoJsonLayer.prototype.__proto__ || Object.getPrototypeOf(GeoJsonLayer.prototype), 'visualChannels', this), {
        size: (0, _extends3.default)({}, (0, _get3.default)(GeoJsonLayer.prototype.__proto__ || Object.getPrototypeOf(GeoJsonLayer.prototype), 'visualChannels', this).size, {
          property: 'stroke',
          condition: function condition(config) {
            return config.visConfig.stroked;
          }
        }),
        height: {
          property: 'height',
          field: 'heightField',
          scale: 'heightScale',
          domain: 'heightDomain',
          range: 'heightRange',
          key: 'height',
          channelScaleType: 'size',
          condition: function condition(config) {
            return config.visConfig.enable3d;
          }
        },
        radius: {
          property: 'radius',
          field: 'radiusField',
          scale: 'radiusScale',
          domain: 'radiusDomain',
          range: 'radiusRange',
          key: 'radius',
          channelScaleType: 'radius'
        }
      });
    }
  }], [{
    key: 'findDefaultLayerProps',
    value: function findDefaultLayerProps(_ref4) {
      var _this3 = this;

      var label = _ref4.label,
          fields = _ref4.fields;

      var geojsonColumns = fields.filter(function (f) {
        return f.type === 'geojson';
      }).map(function (f) {
        return f.name;
      });

      var defaultColumns = {
        geojson: (0, _lodash4.default)([].concat((0, _toConsumableArray3.default)(_defaultSettings.GEOJSON_FIELDS.geojson), (0, _toConsumableArray3.default)(geojsonColumns)))
      };

      var foundColumns = this.findDefaultColumnField(defaultColumns, fields);
      if (!foundColumns || !foundColumns.length) {
        return [];
      }

      return foundColumns.map(function (columns) {
        return {
          label: typeof label === 'string' && label.replace(/\.[^/.]+$/, '') || _this3.type,
          columns: columns,
          isVisible: true
        };
      });
    }
  }]);
  return GeoJsonLayer;
}(_baseLayer2.default);

exports.default = GeoJsonLayer;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9sYXllcnMvZ2VvanNvbi1sYXllci9nZW9qc29uLWxheWVyLmpzIl0sIm5hbWVzIjpbImdlb2pzb25WaXNDb25maWdzIiwib3BhY2l0eSIsInRoaWNrbmVzcyIsInR5cGUiLCJkZWZhdWx0VmFsdWUiLCJsYWJlbCIsImlzUmFuZ2VkIiwicmFuZ2UiLCJzdGVwIiwiZ3JvdXAiLCJwcm9wZXJ0eSIsImNvbG9yUmFuZ2UiLCJyYWRpdXMiLCJzaXplUmFuZ2UiLCJyYWRpdXNSYW5nZSIsImhlaWdodFJhbmdlIiwiZWxldmF0aW9uU2NhbGUiLCJzdHJva2VkIiwiZmlsbGVkIiwiZW5hYmxlM2QiLCJ3aXJlZnJhbWUiLCJnZW9Kc29uUmVxdWlyZWRDb2x1bW5zIiwiZmVhdHVyZUFjY2Vzc29yIiwiZ2VvanNvbiIsImQiLCJmaWVsZElkeCIsImZlYXR1cmVSZXNvbHZlciIsIkdlb0pzb25MYXllciIsInByb3BzIiwiZGF0YVRvRmVhdHVyZSIsInJlZ2lzdGVyVmlzQ29uZmlnIiwiZ2V0RmVhdHVyZSIsImhlaWdodEZpZWxkIiwiaGVpZ2h0RG9tYWluIiwiaGVpZ2h0U2NhbGUiLCJyYWRpdXNGaWVsZCIsInJhZGl1c0RvbWFpbiIsInJhZGl1c1NjYWxlIiwib2JqZWN0IiwiYWxsRGF0YSIsInByb3BlcnRpZXMiLCJpbmRleCIsIl8iLCJmaWx0ZXJlZEluZGV4Iiwib2xkTGF5ZXJEYXRhIiwib3B0IiwiY29uZmlnIiwiY29sb3JTY2FsZSIsImNvbG9yRmllbGQiLCJjb2xvckRvbWFpbiIsImNvbG9yIiwic2l6ZVNjYWxlIiwic2l6ZURvbWFpbiIsInNpemVGaWVsZCIsInZpc0NvbmZpZyIsImNvbHVtbnMiLCJ1cGRhdGVMYXllck1ldGEiLCJnZW9qc29uRGF0YSIsImRhdGEiLCJzYW1lRGF0YSIsIm1hcCIsImkiLCJmaWx0ZXIiLCJjU2NhbGUiLCJnZXRWaXNDaGFubmVsU2NhbGUiLCJjb2xvcnMiLCJoZXhUb1JnYiIsInNTY2FsZSIsImVTY2FsZSIsInJTY2FsZSIsImdldEZpbGxDb2xvciIsImdldEVuY29kZWRDaGFubmVsVmFsdWUiLCJmaWxsQ29sb3IiLCJnZXRMaW5lQ29sb3IiLCJsaW5lQ29sb3IiLCJnZXRMaW5lV2lkdGgiLCJsaW5lV2lkdGgiLCJnZXRFbGV2YXRpb24iLCJlbGV2YXRpb24iLCJnZXRSYWRpdXMiLCJhbGxGZWF0dXJlcyIsIk9iamVjdCIsInZhbHVlcyIsImJvdW5kcyIsImxpZ2h0U2V0dGluZ3MiLCJnZXRMaWdodFNldHRpbmdzRnJvbUJvdW5kcyIsImZwNjQiLCJCb29sZWFuIiwiZmluZCIsImZpeGVkUmFkaXVzIiwiZmVhdHVyZVR5cGVzIiwicmVkdWNlIiwiYWNjdSIsImYiLCJnZW9UeXBlIiwiZ2VvbWV0cnkiLCJ1cGRhdGVNZXRhIiwiaWR4Iiwib2JqZWN0SG92ZXJlZCIsIm1hcFN0YXRlIiwiaW50ZXJhY3Rpb25Db25maWciLCJtZXRhIiwiZ2V0UmFkaXVzU2NhbGVCeVpvb20iLCJ6b29tRmFjdG9yIiwiZ2V0Wm9vbUZhY3RvciIsImxheWVyUHJvcHMiLCJsaW5lV2lkdGhTY2FsZSIsImxpbmVXaWR0aE1pblBpeGVscyIsInBvaW50UmFkaXVzU2NhbGUiLCJsaW5lTWl0ZXJMaW1pdCIsInVwZGF0ZVRyaWdnZXJzIiwiRGVja0dMR2VvSnNvbkxheWVyIiwiaWQiLCJwaWNrYWJsZSIsImF1dG9IaWdobGlnaHQiLCJwYXJhbWV0ZXJzIiwiZGVwdGhUZXN0IiwiZHJhZ1JvdGF0ZSIsImV4dHJ1ZGVkIiwic3ViTGF5ZXJzIiwiZGVmYXVsdFByb3BzIiwiUG9seWdvbkxheWVyIiwiSGlnaGxpZ2h0UG9seWdvbkxheWVyIiwiaXNMYXllckhvdmVyZWQiLCJoaWdobGlnaHRDb2xvciIsIkdlb2pzb25MYXllckljb24iLCJzaXplIiwiY29uZGl0aW9uIiwiaGVpZ2h0IiwiZmllbGQiLCJzY2FsZSIsImRvbWFpbiIsImtleSIsImNoYW5uZWxTY2FsZVR5cGUiLCJmaWVsZHMiLCJnZW9qc29uQ29sdW1ucyIsIm5hbWUiLCJkZWZhdWx0Q29sdW1ucyIsIkdFT0pTT05fRklFTERTIiwiZm91bmRDb2x1bW5zIiwiZmluZERlZmF1bHRDb2x1bW5GaWVsZCIsImxlbmd0aCIsInJlcGxhY2UiLCJpc1Zpc2libGUiLCJMYXllciJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFvQkE7Ozs7QUFDQTs7OztBQUVBOzs7O0FBQ0E7Ozs7QUFDQTs7QUFFQTs7QUFDQTs7QUFLQTs7OztBQUNBOzs7O0FBRU8sSUFBTUEsZ0RBQW9CO0FBQy9CQyxXQUFTLFNBRHNCO0FBRS9CQyxhQUFXO0FBQ1RDLFVBQU0sUUFERztBQUVUQyxrQkFBYyxHQUZMO0FBR1RDLFdBQU8sY0FIRTtBQUlUQyxjQUFVLEtBSkQ7QUFLVEMsV0FBTyxDQUFDLENBQUQsRUFBSSxHQUFKLENBTEU7QUFNVEMsVUFBTSxHQU5HO0FBT1RDLFdBQU8sUUFQRTtBQVFUQyxjQUFVO0FBUkQsR0FGb0I7QUFZL0JDLGNBQVksWUFabUI7QUFhL0JDLFVBQVEsUUFidUI7O0FBZS9CQyxhQUFXLGtCQWZvQjtBQWdCL0JDLGVBQWEsYUFoQmtCO0FBaUIvQkMsZUFBYSxnQkFqQmtCO0FBa0IvQkMsa0JBQWdCLGdCQWxCZTs7QUFvQi9CLGtCQUFnQixjQXBCZTtBQXFCL0JDLFdBQVMsU0FyQnNCO0FBc0IvQkMsVUFBUSxRQXRCdUI7QUF1Qi9CQyxZQUFVLFVBdkJxQjtBQXdCL0JDLGFBQVc7QUF4Qm9CLENBQTFCLEMsQ0FwQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBNkNPLElBQU1DLDBEQUF5QixDQUFDLFNBQUQsQ0FBL0I7QUFDQSxJQUFNQyw0Q0FBa0IsU0FBbEJBLGVBQWtCO0FBQUEsTUFBRUMsT0FBRixRQUFFQSxPQUFGO0FBQUEsU0FBZTtBQUFBLFdBQUtDLEVBQUVELFFBQVFFLFFBQVYsQ0FBTDtBQUFBLEdBQWY7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QUZnQixDQUF2Qjs7QUFJQSxVQUFNQyxpQkFBaUI7QUFDckJsSCxpQkFBUyxpRUFBU21ILGdDQUFlbkgsT0FBeEIsb0NBQW9DZ0gsY0FBcEM7QUFEWSxPQUF2Qjs7QUFJQSxVQUFNSSxlQUFlLEtBQUtDLHNCQUFMLENBQTRCSCxjQUE1QixFQUE0Q0gsTUFBNUMsQ0FBckI7QUFDQSxVQUFJLENBQUNLLFlBQUQsSUFBaUIsQ0FBQ0EsYUFBYUUsTUFBbkMsRUFBMkM7QUFDekMsZUFBTyxFQUFQO0FBQ0Q7O0FBRUQsYUFBT0YsYUFBYS9FLEdBQWIsQ0FBaUI7QUFBQSxlQUFZO0FBQ2xDdkQsaUJBQU8sT0FBT0EsS0FBUCxLQUFpQixRQUFqQixJQUE2QkEsTUFBTXlJLE9BQU4sQ0FBYyxXQUFkLEVBQTJCLEVBQTNCLENBQTdCLElBQStELE9BQUszSSxJQUR6QztBQUVsQ29ELDBCQUZrQztBQUdsQ3dGLHFCQUFXO0FBSHVCLFNBQVo7QUFBQSxPQUFqQixDQUFQO0FBS0Q7OztFQTFFdUNDLG1COztrQkFBckJySCxZIiwiZmlsZSI6Imdlb2pzb24tbGF5ZXIuanMiLCJzb3VyY2VzQ29udGVudCI6WyIvLyBDb3B5cmlnaHQgKGMpIDIwMTggVWJlciBUZWNobm9sb2dpZXMsIEluYy5cbi8vXG4vLyBQZXJtaXNzaW9uIGlzIGhlcmVieSBncmFudGVkLCBmcmVlIG9mIGNoYXJnZSwgdG8gYW55IHBlcnNvbiBvYnRhaW5pbmcgYSBjb3B5XG4vLyBvZiB0aGlzIHNvZnR3YXJlIGFuZCBhc3NvY2lhdGVkIGRvY3VtZW50YXRpb24gZmlsZXMgKHRoZSBcIlNvZnR3YXJlXCIpLCB0byBkZWFsXG4vLyBpbiB0aGUgU29mdHdhcmUgd2l0aG91dCByZXN0cmljdGlvbiwgaW5jbHVkaW5nIHdpdGhvdXQgbGltaXRhdGlvbiB0aGUgcmlnaHRzXG4vLyB0byB1c2UsIGNvcHksIG1vZGlmeSwgbWVyZ2UsIHB1Ymxpc2gsIGRpc3RyaWJ1dGUsIHN1YmxpY2Vuc2UsIGFuZC9vciBzZWxsXG4vLyBjb3BpZXMgb2YgdGhlIFNvZnR3YXJlLCBhbmQgdG8gcGVybWl0IHBlcnNvbnMgdG8gd2hvbSB0aGUgU29mdHdhcmUgaXNcbi8vIGZ1cm5pc2hlZCB0byBkbyBzbywgc3ViamVjdCB0byB0aGUgZm9sbG93aW5nIGNvbmRpdGlvbnM6XG4vL1xuLy8gVGhlIGFib3ZlIGNvcHlyaWdodCBub3RpY2UgYW5kIHRoaXMgcGVybWlzc2lvbiBub3RpY2Ugc2hhbGwgYmUgaW5jbHVkZWQgaW5cbi8vIGFsbCBjb3BpZXMgb3Igc3Vic3RhbnRpYWwgcG9ydGlvbnMgb2YgdGhlIFNvZnR3YXJlLlxuLy9cbi8vIFRIRSBTT0ZUV0FSRSBJUyBQUk9WSURFRCBcIkFTIElTXCIsIFdJVEhPVVQgV0FSUkFOVFkgT0YgQU5ZIEtJTkQsIEVYUFJFU1MgT1Jcbi8vIElNUExJRUQsIElOQ0xVRElORyBCVVQgTk9UIExJTUlURUQgVE8gVEhFIFdBUlJBTlRJRVMgT0YgTUVSQ0hBTlRBQklMSVRZLFxuLy8gRklUTkVTUyBGT1IgQSBQQVJUSUNVTEFSIFBVUlBPU0UgQU5EIE5PTklORlJJTkdFTUVOVC4gSU4gTk8gRVZFTlQgU0hBTEwgVEhFXG4vLyBBVVRIT1JTIE9SIENPUFlSSUdIVCBIT0xERVJTIEJFIExJQUJMRSBGT1IgQU5ZIENMQUlNLCBEQU1BR0VTIE9SIE9USEVSXG4vLyBMSUFCSUxJVFksIFdIRVRIRVIgSU4gQU4gQUNUSU9OIE9GIENPTlRSQUNULCBUT1JUIE9SIE9USEVSV0lTRSwgQVJJU0lORyBGUk9NLFxuLy8gT1VUIE9GIE9SIElOIENPTk5FQ1RJT04gV0lUSCBUSEUgU09GVFdBUkUgT1IgVEhFIFVTRSBPUiBPVEhFUiBERUFMSU5HUyBJTlxuLy8gVEhFIFNPRlRXQVJFLlxuXG5pbXBvcnQgbWVtb2l6ZSBmcm9tICdsb2Rhc2gubWVtb2l6ZSc7XG5pbXBvcnQgdW5pcSBmcm9tICdsb2Rhc2gudW5pcSc7XG5cbmltcG9ydCBMYXllciBmcm9tICcuLi9iYXNlLWxheWVyJztcbmltcG9ydCBIaWdobGlnaHRQb2x5Z29uTGF5ZXIgZnJvbSAnZGVja2dsLWxheWVycy9nZW9qc29uLWxheWVyL3NvbGlkLXBvbHlnb24tbGF5ZXInO1xuaW1wb3J0IHtHZW9Kc29uTGF5ZXIgYXMgRGVja0dMR2VvSnNvbkxheWVyfSBmcm9tICdkZWNrLmdsJztcblxuaW1wb3J0IHtoZXhUb1JnYn0gZnJvbSAndXRpbHMvY29sb3ItdXRpbHMnO1xuaW1wb3J0IHtcbiAgZ2V0R2VvanNvbkRhdGFNYXBzLFxuICBnZXRHZW9qc29uQm91bmRzLFxuICBmZWF0dXJlVG9EZWNrR2xHZW9UeXBlXG59IGZyb20gJy4vZ2VvanNvbi11dGlscyc7XG5pbXBvcnQgR2VvanNvbkxheWVySWNvbiBmcm9tICcuL2dlb2pzb24tbGF5ZXItaWNvbic7XG5pbXBvcnQge0dFT0pTT05fRklFTERTfSBmcm9tICdjb25zdGFudHMvZGVmYXVsdC1zZXR0aW5ncyc7XG5cbmV4cG9ydCBjb25zdCBnZW9qc29uVmlzQ29uZmlncyA9IHtcbiAgb3BhY2l0eTogJ29wYWNpdHknLFxuICB0aGlja25lc3M6IHtcbiAgICB0eXBlOiAnbnVtYmVyJyxcbiAgICBkZWZhdWx0VmFsdWU6IDAuNSxcbiAgICBsYWJlbDogJ1N0cm9rZSBXaWR0aCcsXG4gICAgaXNSYW5nZWQ6IGZhbHNlLFxuICAgIHJhbmdlOiBbMCwgMTAwXSxcbiAgICBzdGVwOiAwLjEsXG4gICAgZ3JvdXA6ICdzdHJva2UnLFxuICAgIHByb3BlcnR5OiAndGhpY2tuZXNzJ1xuICB9LFxuICBjb2xvclJhbmdlOiAnY29sb3JSYW5nZScsXG4gIHJhZGl1czogJ3JhZGl1cycsXG5cbiAgc2l6ZVJhbmdlOiAnc3Ryb2tlV2lkdGhSYW5nZScsXG4gIHJhZGl1c1JhbmdlOiAncmFkaXVzUmFuZ2UnLFxuICBoZWlnaHRSYW5nZTogJ2VsZXZhdGlvblJhbmdlJyxcbiAgZWxldmF0aW9uU2NhbGU6ICdlbGV2YXRpb25TY2FsZScsXG5cbiAgJ2hpLXByZWNpc2lvbic6ICdoaS1wcmVjaXNpb24nLFxuICBzdHJva2VkOiAnc3Ryb2tlZCcsXG4gIGZpbGxlZDogJ2ZpbGxlZCcsXG4gIGVuYWJsZTNkOiAnZW5hYmxlM2QnLFxuICB3aXJlZnJhbWU6ICd3aXJlZnJhbWUnXG59O1xuXG5leHBvcnQgY29uc3QgZ2VvSnNvblJlcXVpcmVkQ29sdW1ucyA9IFsnZ2VvanNvbiddO1xuZXhwb3J0IGNvbnN0IGZlYXR1cmVBY2Nlc3NvciA9ICh7Z2VvanNvbn0pID0+IGQgPT4gZFtnZW9qc29uLmZpZWxkSWR4XTtcbmV4cG9ydCBjb25zdCBmZWF0dXJlUmVzb2x2ZXIgPSAoe2dlb2pzb259KSA9PiBnZW9qc29uLmZpZWxkSWR4O1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBHZW9Kc29uTGF5ZXIgZXh0ZW5kcyBMYXllciB7XG4gIGNvbnN0cnVjdG9yKHByb3BzKSB7XG4gICAgc3VwZXIocHJvcHMpO1xuXG4gICAgdGhpcy5kYXRhVG9GZWF0dXJlID0ge307XG4gICAgdGhpcy5yZWdpc3RlclZpc0NvbmZpZyhnZW9qc29uVmlzQ29uZmlncyk7XG4gICAgdGhpcy5nZXRGZWF0dXJlID0gbWVtb2l6ZShmZWF0dXJlQWNjZXNzb3IsIGZlYXR1cmVSZXNvbHZlcik7XG4gIH1cblxuICBnZXQgdHlwZSgpIHtcbiAgICByZXR1cm4gJ2dlb2pzb24nO1xuICB9XG5cbiAgZ2V0IG5hbWUoKSB7XG4gICAgcmV0dXJuICdQb2x5Z29uJztcbiAgfVxuXG4gIGdldCBsYXllckljb24oKSB7XG4gICAgcmV0dXJuIEdlb2pzb25MYXllckljb247XG4gIH1cblxuICBnZXQgcmVxdWlyZWRMYXllckNvbHVtbnMoKSB7XG4gICAgcmV0dXJuIGdlb0pzb25SZXF1aXJlZENvbHVtbnM7XG4gIH1cblxuICBnZXQgdmlzdWFsQ2hhbm5lbHMoKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIC4uLnN1cGVyLnZpc3VhbENoYW5uZWxzLFxuICAgICAgc2l6ZToge1xuICAgICAgICAuLi5zdXBlci52aXN1YWxDaGFubmVscy5zaXplLFxuICAgICAgICBwcm9wZXJ0eTogJ3N0cm9rZScsXG4gICAgICAgIGNvbmRpdGlvbjogY29uZmlnID0+IGNvbmZpZy52aXNDb25maWcuc3Ryb2tlZFxuICAgICAgfSxcbiAgICAgIGhlaWdodDoge1xuICAgICAgICBwcm9wZXJ0eTogJ2hlaWdodCcsXG4gICAgICAgIGZpZWxkOiAnaGVpZ2h0RmllbGQnLFxuICAgICAgICBzY2FsZTogJ2hlaWdodFNjYWxlJyxcbiAgICAgICAgZG9tYWluOiAnaGVpZ2h0RG9tYWluJyxcbiAgICAgICAgcmFuZ2U6ICdoZWlnaHRSYW5nZScsXG4gICAgICAgIGtleTogJ2hlaWdodCcsXG4gICAgICAgIGNoYW5uZWxTY2FsZVR5cGU6ICdzaXplJyxcbiAgICAgICAgY29uZGl0aW9uOiBjb25maWcgPT4gY29uZmlnLnZpc0NvbmZpZy5lbmFibGUzZFxuICAgICAgfSxcbiAgICAgIHJhZGl1czoge1xuICAgICAgICBwcm9wZXJ0eTogJ3JhZGl1cycsXG4gICAgICAgIGZpZWxkOiAncmFkaXVzRmllbGQnLFxuICAgICAgICBzY2FsZTogJ3JhZGl1c1NjYWxlJyxcbiAgICAgICAgZG9tYWluOiAncmFkaXVzRG9tYWluJyxcbiAgICAgICAgcmFuZ2U6ICdyYWRpdXNSYW5nZScsXG4gICAgICAgIGtleTogJ3JhZGl1cycsXG4gICAgICAgIGNoYW5uZWxTY2FsZVR5cGU6ICdyYWRpdXMnXG4gICAgICB9XG4gICAgfTtcbiAgfVxuXG4gIHN0YXRpYyBmaW5kRGVmYXVsdExheWVyUHJvcHMoe2xhYmVsLCBmaWVsZHN9KSB7XG4gICAgY29uc3QgZ2VvanNvbkNvbHVtbnMgPSBmaWVsZHNcbiAgICAgIC5maWx0ZXIoZiA9PiBmLnR5cGUgPT09ICdnZW9qc29uJylcbiAgICAgIC5tYXAoZiA9PiBmLm5hbWUpO1xuXG4gICAgY29uc3QgZGVmYXVsdENvbHVtbnMgPSB7XG4gICAgICBnZW9qc29uOiB1bmlxKFsuLi5HRU9KU09OX0ZJRUxEUy5nZW9qc29uLCAuLi5nZW9qc29uQ29sdW1uc10pXG4gICAgfTtcblxuICAgIGNvbnN0IGZvdW5kQ29sdW1ucyA9IHRoaXMuZmluZERlZmF1bHRDb2x1bW5GaWVsZChkZWZhdWx0Q29sdW1ucywgZmllbGRzKTtcbiAgICBpZiAoIWZvdW5kQ29sdW1ucyB8fCAhZm91bmRDb2x1bW5zLmxlbmd0aCkge1xuICAgICAgcmV0dXJuIFtdO1xuICAgIH1cblxuICAgIHJldHVybiBmb3VuZENvbHVtbnMubWFwKGNvbHVtbnMgPT4gKHtcbiAgICAgIGxhYmVsOiB0eXBlb2YgbGFiZWwgPT09ICdzdHJpbmcnICYmIGxhYmVsLnJlcGxhY2UoL1xcLlteLy5dKyQvLCAnJykgfHwgdGhpcy50eXBlLFxuICAgICAgY29sdW1ucyxcbiAgICAgIGlzVmlzaWJsZTogdHJ1ZVxuICAgIH0pKTtcbiAgfVxuXG4gIGdldERlZmF1bHRMYXllckNvbmZpZyhwcm9wcyA9IHt9KSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIC4uLnN1cGVyLmdldERlZmF1bHRMYXllckNvbmZpZyhwcm9wcyksXG5cbiAgICAgIC8vIGFkZCBoZWlnaHQgdmlzdWFsIGNoYW5uZWxcbiAgICAgIGhlaWdodEZpZWxkOiBudWxsLFxuICAgICAgaGVpZ2h0RG9tYWluOiBbMCwgMV0sXG4gICAgICBoZWlnaHRTY2FsZTogJ2xpbmVhcicsXG5cbiAgICAgIC8vIGFkZCByYWRpdXMgdmlzdWFsIGNoYW5uZWxcbiAgICAgIHJhZGl1c0ZpZWxkOiBudWxsLFxuICAgICAgcmFkaXVzRG9tYWluOiBbMCwgMV0sXG4gICAgICByYWRpdXNTY2FsZTogJ2xpbmVhcidcbiAgICB9O1xuICB9XG5cbiAgZ2V0SG92ZXJEYXRhKG9iamVjdCwgYWxsRGF0YSkge1xuICAgIC8vIGluZGV4IG9mIGFsbERhdGEgaXMgc2F2ZWQgdG8gZmVhdHVyZS5wcm9wZXJ0aWVzXG4gICAgcmV0dXJuIGFsbERhdGFbb2JqZWN0LnByb3BlcnRpZXMuaW5kZXhdO1xuICB9XG5cbiAgZm9ybWF0TGF5ZXJEYXRhKF8sIGFsbERhdGEsIGZpbHRlcmVkSW5kZXgsIG9sZExheWVyRGF0YSwgb3B0ID0ge30pIHtcbiAgICBjb25zdCB7XG4gICAgICBjb2xvclNjYWxlLFxuICAgICAgY29sb3JGaWVsZCxcbiAgICAgIGNvbG9yRG9tYWluLFxuICAgICAgY29sb3IsXG4gICAgICBzaXplU2NhbGUsXG4gICAgICBzaXplRG9tYWluLFxuICAgICAgc2l6ZUZpZWxkLFxuICAgICAgaGVpZ2h0RmllbGQsXG4gICAgICBoZWlnaHREb21haW4sXG4gICAgICBoZWlnaHRTY2FsZSxcbiAgICAgIHJhZGl1c0ZpZWxkLFxuICAgICAgcmFkaXVzRG9tYWluLFxuICAgICAgcmFkaXVzU2NhbGUsXG4gICAgICB2aXNDb25maWcsXG4gICAgICBjb2x1bW5zXG4gICAgfSA9IHRoaXMuY29uZmlnO1xuXG4gICAgY29uc3Qge1xuICAgICAgZW5hYmxlM2QsXG4gICAgICBzdHJva2VkLFxuICAgICAgY29sb3JSYW5nZSxcbiAgICAgIGhlaWdodFJhbmdlLFxuICAgICAgc2l6ZVJhbmdlLFxuICAgICAgcmFkaXVzUmFuZ2VcbiAgICB9ID0gdmlzQ29uZmlnO1xuXG4gICAgY29uc3QgZ2V0RmVhdHVyZSA9IHRoaXMuZ2V0RmVhdHVyZShjb2x1bW5zKTtcblxuICAgIC8vIGdlb2pzb24gZmVhdHVyZSBhcmUgb2JqZWN0LCBpZiBkb2Vzbid0IGV4aXN0c1xuICAgIC8vIGNyZWF0ZSBpdCBhbmQgc2F2ZSB0byBsYXllclxuICAgIGlmICghb2xkTGF5ZXJEYXRhIHx8IG9sZExheWVyRGF0YS5nZXRGZWF0dXJlICE9PSBnZXRGZWF0dXJlKSB7XG4gICAgICB0aGlzLnVwZGF0ZUxheWVyTWV0YShhbGxEYXRhLCBnZXRGZWF0dXJlKTtcbiAgICB9XG5cbiAgICBsZXQgZ2VvanNvbkRhdGE7XG5cbiAgICBpZiAoXG4gICAgICBvbGRMYXllckRhdGEgJiZcbiAgICAgIG9sZExheWVyRGF0YS5kYXRhICYmXG4gICAgICBvcHQuc2FtZURhdGEgJiZcbiAgICAgIG9sZExheWVyRGF0YS5nZXRGZWF0dXJlID09PSBnZXRGZWF0dXJlXG4gICAgKSB7XG4gICAgICAvLyBubyBuZWVkIHRvIGNyZWF0ZSBhIG5ldyBhcnJheSBvZiBkYXRhXG4gICAgICAvLyB1c2UgdXBkYXRlVHJpZ2dlcnMgdG8gc2VsZWN0aXZlbHkgcmUtY2FsY3VsYXRlIGF0dHJpYnV0ZXNcbiAgICAgIGdlb2pzb25EYXRhID0gb2xkTGF5ZXJEYXRhLmRhdGE7XG4gICAgfSBlbHNlIHtcbiAgICAgIC8vIGZpbHRlcmVkSW5kZXggaXMgYSByZWZlcmVuY2Ugb2YgaW5kZXggaW4gYWxsRGF0YSB3aGljaCBjYW4gbWFwIHRvIGZlYXR1cmVcbiAgICAgIGdlb2pzb25EYXRhID0gZmlsdGVyZWRJbmRleFxuICAgICAgICAubWFwKGkgPT4gdGhpcy5kYXRhVG9GZWF0dXJlW2ldKVxuICAgICAgICAuZmlsdGVyKGQgPT4gZCk7XG4gICAgfVxuXG4gICAgY29uc3QgY1NjYWxlID1cbiAgICAgIGNvbG9yRmllbGQgJiZcbiAgICAgIHRoaXMuZ2V0VmlzQ2hhbm5lbFNjYWxlKFxuICAgICAgICBjb2xvclNjYWxlLFxuICAgICAgICBjb2xvckRvbWFpbixcbiAgICAgICAgY29sb3JSYW5nZS5jb2xvcnMubWFwKGhleFRvUmdiKVxuICAgICAgKTtcblxuICAgIC8vIGNhbGN1bGF0ZSBzdHJva2Ugc2NhbGUgLSBpZiBzdHJva2VkID0gdHJ1ZVxuICAgIGNvbnN0IHNTY2FsZSA9XG4gICAgICBzaXplRmllbGQgJiZcbiAgICAgIHN0cm9rZWQgJiZcbiAgICAgIHRoaXMuZ2V0VmlzQ2hhbm5lbFNjYWxlKHNpemVTY2FsZSwgc2l6ZURvbWFpbiwgc2l6ZVJhbmdlKTtcblxuICAgIC8vIGNhbGN1bGF0ZSBlbGV2YXRpb24gc2NhbGUgLSBpZiBleHRydWRlZCA9IHRydWVcbiAgICBjb25zdCBlU2NhbGUgPVxuICAgICAgaGVpZ2h0RmllbGQgJiZcbiAgICAgIGVuYWJsZTNkICYmXG4gICAgICB0aGlzLmdldFZpc0NoYW5uZWxTY2FsZShoZWlnaHRTY2FsZSwgaGVpZ2h0RG9tYWluLCBoZWlnaHRSYW5nZSk7XG5cbiAgICAvLyBwb2ludCByYWRpdXNcbiAgICBjb25zdCByU2NhbGUgPVxuICAgICAgcmFkaXVzRmllbGQgJiZcbiAgICAgIHRoaXMuZ2V0VmlzQ2hhbm5lbFNjYWxlKHJhZGl1c1NjYWxlLCByYWRpdXNEb21haW4sIHJhZGl1c1JhbmdlKTtcblxuICAgIHJldHVybiB7XG4gICAgICBkYXRhOiBnZW9qc29uRGF0YSxcbiAgICAgIGdldEZlYXR1cmUsXG4gICAgICBnZXRGaWxsQ29sb3I6IGQgPT5cbiAgICAgICAgY1NjYWxlXG4gICAgICAgICAgPyB0aGlzLmdldEVuY29kZWRDaGFubmVsVmFsdWUoXG4gICAgICAgICAgICAgIGNTY2FsZSxcbiAgICAgICAgICAgICAgYWxsRGF0YVtkLnByb3BlcnRpZXMuaW5kZXhdLFxuICAgICAgICAgICAgICBjb2xvckZpZWxkXG4gICAgICAgICAgICApXG4gICAgICAgICAgOiBkLnByb3BlcnRpZXMuZmlsbENvbG9yIHx8IGNvbG9yLFxuICAgICAgZ2V0TGluZUNvbG9yOiBkID0+XG4gICAgICAgIGNTY2FsZVxuICAgICAgICAgID8gdGhpcy5nZXRFbmNvZGVkQ2hhbm5lbFZhbHVlKFxuICAgICAgICAgICAgICBjU2NhbGUsXG4gICAgICAgICAgICAgIGFsbERhdGFbZC5wcm9wZXJ0aWVzLmluZGV4XSxcbiAgICAgICAgICAgICAgY29sb3JGaWVsZFxuICAgICAgICAgICAgKVxuICAgICAgICAgIDogZC5wcm9wZXJ0aWVzLmxpbmVDb2xvciB8fCBjb2xvcixcbiAgICAgIGdldExpbmVXaWR0aDogZCA9PlxuICAgICAgICBzU2NhbGVcbiAgICAgICAgICA/IHRoaXMuZ2V0RW5jb2RlZENoYW5uZWxWYWx1ZShcbiAgICAgICAgICAgICAgc1NjYWxlLFxuICAgICAgICAgICAgICBhbGxEYXRhW2QucHJvcGVydGllcy5pbmRleF0sXG4gICAgICAgICAgICAgIHNpemVGaWVsZCxcbiAgICAgICAgICAgICAgMFxuICAgICAgICAgICAgKVxuICAgICAgICAgIDogZC5wcm9wZXJ0aWVzLmxpbmVXaWR0aCB8fCAxLFxuICAgICAgZ2V0RWxldmF0aW9uOiBkID0+XG4gICAgICAgIGVTY2FsZVxuICAgICAgICAgID8gdGhpcy5nZXRFbmNvZGVkQ2hhbm5lbFZhbHVlKFxuICAgICAgICAgICAgICBlU2NhbGUsXG4gICAgICAgICAgICAgIGFsbERhdGFbZC5wcm9wZXJ0aWVzLmluZGV4XSxcbiAgICAgICAgICAgICAgaGVpZ2h0RmllbGQsXG4gICAgICAgICAgICAgIDBcbiAgICAgICAgICAgIClcbiAgICAgICAgICA6IGQucHJvcGVydGllcy5lbGV2YXRpb24gfHwgNTAwLFxuICAgICAgZ2V0UmFkaXVzOiBkID0+XG4gICAgICAgIHJTY2FsZVxuICAgICAgICAgID8gdGhpcy5nZXRFbmNvZGVkQ2hhbm5lbFZhbHVlKFxuICAgICAgICAgICAgICByU2NhbGUsXG4gICAgICAgICAgICAgIGFsbERhdGFbZC5wcm9wZXJ0aWVzLmluZGV4XSxcbiAgICAgICAgICAgICAgcmFkaXVzRmllbGQsXG4gICAgICAgICAgICAgIDBcbiAgICAgICAgICAgIClcbiAgICAgICAgICA6IGQucHJvcGVydGllcy5yYWRpdXMgfHwgMVxuICAgIH07XG4gIH1cblxuICB1cGRhdGVMYXllck1ldGEoYWxsRGF0YSwgZ2V0RmVhdHVyZSkge1xuICAgIHRoaXMuZGF0YVRvRmVhdHVyZSA9IGdldEdlb2pzb25EYXRhTWFwcyhhbGxEYXRhLCBnZXRGZWF0dXJlKTtcblxuICAgIC8vIGNhbGN1bGF0ZSBsYXllciBtZXRhXG4gICAgY29uc3QgYWxsRmVhdHVyZXMgPSBPYmplY3QudmFsdWVzKHRoaXMuZGF0YVRvRmVhdHVyZSk7XG5cbiAgICAvLyBnZXQgYm91bmRzIGZyb20gZmVhdHVyZXNcbiAgICBjb25zdCBib3VuZHMgPSBnZXRHZW9qc29uQm91bmRzKGFsbEZlYXR1cmVzKTtcblxuICAgIC8vIGdldCBsaWdodFNldHRpbmdzIGZyb20gcG9pbnRzXG4gICAgY29uc3QgbGlnaHRTZXR0aW5ncyA9IHRoaXMuZ2V0TGlnaHRTZXR0aW5nc0Zyb21Cb3VuZHMoYm91bmRzKTtcblxuICAgIC8vIGlmIGFueSBvZiB0aGUgZmVhdHVyZSBoYXMgcHJvcGVydGllcy5oaS1wcmVjaXNpb24gc2V0IHRvIGJlIHRydWVcbiAgICBjb25zdCBmcDY0ID0gQm9vbGVhbihcbiAgICAgIGFsbEZlYXR1cmVzLmZpbmQoZCA9PiBkICYmIGQucHJvcGVydGllcyAmJiBkLnByb3BlcnRpZXNbJ2hpLXByZWNpc2lvbiddKVxuICAgICk7XG4gICAgY29uc3QgZml4ZWRSYWRpdXMgPSBCb29sZWFuKFxuICAgICAgYWxsRmVhdHVyZXMuZmluZChkID0+IGQgJiYgZC5wcm9wZXJ0aWVzICYmIGQucHJvcGVydGllcy5yYWRpdXMpXG4gICAgKTtcblxuICAgIC8vIGtlZXAgYSByZWNvcmQgb2Ygd2hhdCB0eXBlIG9mIGdlb21ldHJ5IHRoZSBjb2xsZWN0aW9uIGhhc1xuICAgIGNvbnN0IGZlYXR1cmVUeXBlcyA9IGFsbEZlYXR1cmVzLnJlZHVjZSgoYWNjdSwgZikgPT4ge1xuICAgICAgY29uc3QgZ2VvVHlwZSA9IGZlYXR1cmVUb0RlY2tHbEdlb1R5cGUoXG4gICAgICAgIGYgJiYgZi5nZW9tZXRyeSAmJiBmLmdlb21ldHJ5LnR5cGVcbiAgICAgICk7XG5cbiAgICAgIGlmIChnZW9UeXBlKSB7XG4gICAgICAgIGFjY3VbZ2VvVHlwZV0gPSB0cnVlO1xuICAgICAgfVxuICAgICAgcmV0dXJuIGFjY3U7XG4gICAgfSwge30pO1xuXG4gICAgdGhpcy51cGRhdGVNZXRhKHtib3VuZHMsIGxpZ2h0U2V0dGluZ3MsIGZwNjQsIGZpeGVkUmFkaXVzLCBmZWF0dXJlVHlwZXN9KTtcbiAgfVxuXG4gIHJlbmRlckxheWVyKHtcbiAgICBkYXRhLFxuICAgIGlkeCxcbiAgICBvYmplY3RIb3ZlcmVkLFxuICAgIG1hcFN0YXRlLFxuICAgIGludGVyYWN0aW9uQ29uZmlnXG4gIH0pIHtcbiAgICBjb25zdCB7ZnA2NCwgbGlnaHRTZXR0aW5ncywgZml4ZWRSYWRpdXN9ID0gdGhpcy5tZXRhO1xuICAgIGNvbnN0IHJhZGl1c1NjYWxlID0gdGhpcy5nZXRSYWRpdXNTY2FsZUJ5Wm9vbShtYXBTdGF0ZSwgZml4ZWRSYWRpdXMpO1xuICAgIGNvbnN0IHpvb21GYWN0b3IgPSB0aGlzLmdldFpvb21GYWN0b3IobWFwU3RhdGUpO1xuICAgIGNvbnN0IHt2aXNDb25maWd9ID0gdGhpcy5jb25maWc7XG5cbiAgICBjb25zdCBsYXllclByb3BzID0ge1xuICAgICAgLy8gbXVsdGlwbGllciBhcHBsaWVkIGp1c3Qgc28gaXQgYmVpbmcgY29uc2lzdGVudCB3aXRoIHByZXZpb3VzbHkgc2F2ZWQgbWFwc1xuICAgICAgbGluZVdpZHRoU2NhbGU6IHZpc0NvbmZpZy50aGlja25lc3MgKiB6b29tRmFjdG9yICogOCxcbiAgICAgIGxpbmVXaWR0aE1pblBpeGVsczogMSxcbiAgICAgIGVsZXZhdGlvblNjYWxlOiB2aXNDb25maWcuZWxldmF0aW9uU2NhbGUsXG4gICAgICBwb2ludFJhZGl1c1NjYWxlOiByYWRpdXNTY2FsZSxcbiAgICAgIGZwNjQ6IGZwNjQgfHwgdmlzQ29uZmlnWydoaS1wcmVjaXNpb24nXSxcbiAgICAgIGxpbmVNaXRlckxpbWl0OiA0XG4gICAgfTtcblxuICAgIGNvbnN0IHVwZGF0ZVRyaWdnZXJzID0ge1xuICAgICAgZ2V0RWxldmF0aW9uOiB7XG4gICAgICAgIGhlaWdodEZpZWxkOiB0aGlzLmNvbmZpZy5oZWlnaHRGaWVsZCxcbiAgICAgICAgaGVpZ2h0U2NhbGU6IHRoaXMuY29uZmlnLmhlaWdodFNjYWxlLFxuICAgICAgICBoZWlnaHRSYW5nZTogdmlzQ29uZmlnLmhlaWdodFJhbmdlXG4gICAgICB9LFxuICAgICAgZ2V0RmlsbENvbG9yOiB7XG4gICAgICAgIGNvbG9yOiB0aGlzLmNvbmZpZy5jb2xvcixcbiAgICAgICAgY29sb3JGaWVsZDogdGhpcy5jb25maWcuY29sb3JGaWVsZCxcbiAgICAgICAgY29sb3JSYW5nZTogdmlzQ29uZmlnLmNvbG9yUmFuZ2UsXG4gICAgICAgIGNvbG9yU2NhbGU6IHRoaXMuY29uZmlnLmNvbG9yU2NhbGVcbiAgICAgIH0sXG4gICAgICBnZXRMaW5lQ29sb3I6IHtcbiAgICAgICAgY29sb3I6IHRoaXMuY29uZmlnLmNvbG9yLFxuICAgICAgICBjb2xvckZpZWxkOiB0aGlzLmNvbmZpZy5jb2xvckZpZWxkLFxuICAgICAgICBjb2xvclJhbmdlOiB2aXNDb25maWcuY29sb3JSYW5nZSxcbiAgICAgICAgY29sb3JTY2FsZTogdGhpcy5jb25maWcuY29sb3JTY2FsZVxuICAgICAgfSxcbiAgICAgIGdldExpbmVXaWR0aDoge1xuICAgICAgICBzaXplRmllbGQ6IHRoaXMuY29uZmlnLnNpemVGaWVsZCxcbiAgICAgICAgc2l6ZVJhbmdlOiB2aXNDb25maWcuc2l6ZVJhbmdlXG4gICAgICB9LFxuICAgICAgZ2V0UmFkaXVzOiB7XG4gICAgICAgIHJhZGl1c0ZpZWxkOiB0aGlzLmNvbmZpZy5yYWRpdXNGaWVsZCxcbiAgICAgICAgcmFkaXVzUmFuZ2U6IHZpc0NvbmZpZy5yYWRpdXNSYW5nZVxuICAgICAgfVxuICAgIH07XG5cbiAgICByZXR1cm4gW1xuICAgICAgbmV3IERlY2tHTEdlb0pzb25MYXllcih7XG4gICAgICAgIC4uLmxheWVyUHJvcHMsXG4gICAgICAgIGlkOiB0aGlzLmlkLFxuICAgICAgICBpZHgsXG4gICAgICAgIGRhdGE6IGRhdGEuZGF0YSxcbiAgICAgICAgZ2V0RmlsbENvbG9yOiBkYXRhLmdldEZpbGxDb2xvcixcbiAgICAgICAgZ2V0TGluZUNvbG9yOiBkYXRhLmdldExpbmVDb2xvcixcbiAgICAgICAgZ2V0TGluZVdpZHRoOiBkYXRhLmdldExpbmVXaWR0aCxcbiAgICAgICAgZ2V0UmFkaXVzOiBkYXRhLmdldFJhZGl1cyxcbiAgICAgICAgZ2V0RWxldmF0aW9uOiBkYXRhLmdldEVsZXZhdGlvbixcbiAgICAgICAgLy8gaGlnaGxpZ2h0XG4gICAgICAgIHBpY2thYmxlOiB0cnVlLFxuICAgICAgICAvLyBoaWdobGlnaHRDb2xvcjogdGhpcy5jb25maWcuaGlnaGxpZ2h0Q29sb3IsXG4gICAgICAgIGF1dG9IaWdobGlnaHQ6IHZpc0NvbmZpZy5lbmFibGUzZCxcbiAgICAgICAgLy8gcGFyYW1ldGVyc1xuICAgICAgICBwYXJhbWV0ZXJzOiB7ZGVwdGhUZXN0OiBCb29sZWFuKHZpc0NvbmZpZy5lbmFibGUzZCB8fCBtYXBTdGF0ZS5kcmFnUm90YXRlKX0sXG4gICAgICAgIG9wYWNpdHk6IHZpc0NvbmZpZy5vcGFjaXR5LFxuICAgICAgICBzdHJva2VkOiB2aXNDb25maWcuc3Ryb2tlZCxcbiAgICAgICAgZmlsbGVkOiB2aXNDb25maWcuZmlsbGVkLFxuICAgICAgICBleHRydWRlZDogdmlzQ29uZmlnLmVuYWJsZTNkLFxuICAgICAgICB3aXJlZnJhbWU6IHZpc0NvbmZpZy53aXJlZnJhbWUsXG4gICAgICAgIGxpZ2h0U2V0dGluZ3MsXG4gICAgICAgIHVwZGF0ZVRyaWdnZXJzLFxuXG4gICAgICAgIHN1YkxheWVyczoge1xuICAgICAgICAgIC4uLkRlY2tHTEdlb0pzb25MYXllci5kZWZhdWx0UHJvcHMuc3ViTGF5ZXJzLFxuICAgICAgICAgIFBvbHlnb25MYXllcjogSGlnaGxpZ2h0UG9seWdvbkxheWVyXG4gICAgICAgIH1cbiAgICAgIH0pLFxuICAgICAgLi4uKHRoaXMuaXNMYXllckhvdmVyZWQob2JqZWN0SG92ZXJlZCkgJiYgIXZpc0NvbmZpZy5lbmFibGUzZFxuICAgICAgICA/IFtcbiAgICAgICAgICAgIG5ldyBEZWNrR0xHZW9Kc29uTGF5ZXIoe1xuICAgICAgICAgICAgICAuLi5sYXllclByb3BzLFxuICAgICAgICAgICAgICBpZDogYCR7dGhpcy5pZH0taG92ZXJlZGAsXG4gICAgICAgICAgICAgIGRhdGE6IFtcbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAuLi5vYmplY3RIb3ZlcmVkLm9iamVjdCxcbiAgICAgICAgICAgICAgICAgIHByb3BlcnRpZXM6IHtcbiAgICAgICAgICAgICAgICAgICAgLi4ub2JqZWN0SG92ZXJlZC5vYmplY3QucHJvcGVydGllcyxcbiAgICAgICAgICAgICAgICAgICAgbGluZUNvbG9yOiB0aGlzLmNvbmZpZy5oaWdobGlnaHRDb2xvcixcbiAgICAgICAgICAgICAgICAgICAgZmlsbENvbG9yOiB0aGlzLmNvbmZpZy5oaWdobGlnaHRDb2xvclxuICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgIGdldExpbmVXaWR0aDogZGF0YS5nZXRMaW5lV2lkdGgsXG4gICAgICAgICAgICAgICAgICBnZXRSYWRpdXM6IGRhdGEuZ2V0UmFkaXVzLFxuICAgICAgICAgICAgICAgICAgZ2V0RWxldmF0aW9uOiBkYXRhLmdldEVsZXZhdGlvblxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgXSxcbiAgICAgICAgICAgICAgdXBkYXRlVHJpZ2dlcnMsXG4gICAgICAgICAgICAgIHN0cm9rZWQ6IHRydWUsXG4gICAgICAgICAgICAgIHBpY2thYmxlOiBmYWxzZSxcbiAgICAgICAgICAgICAgZmlsbGVkOiBmYWxzZVxuICAgICAgICAgICAgfSlcbiAgICAgICAgICBdXG4gICAgICAgIDogW10pXG4gICAgXTtcbiAgfVxufVxuIl19