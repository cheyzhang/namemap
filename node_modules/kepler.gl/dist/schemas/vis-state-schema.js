'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.visStateSchema = exports.visStateSchemaV1 = exports.visStateSchemaV0 = exports.propertiesV1 = exports.propertiesV0 = exports.filterPropsV1 = exports.DimensionFieldSchema = exports.filterPropsV0 = exports.layerPropsV1 = exports.layerPropsV0 = exports.dimensionPropsV0 = undefined;

var _extends11 = require('babel-runtime/helpers/extends');

var _extends12 = _interopRequireDefault(_extends11);

var _defineProperty2 = require('babel-runtime/helpers/defineProperty');

var _defineProperty3 = _interopRequireDefault(_defineProperty2);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

var _visStateSchema; // Copyright (c) 2018 Uber Technologies, Inc.
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

var _lodash = require('lodash.pick');

var _lodash2 = _interopRequireDefault(_lodash);

var _versions = require('./versions');

var _filterUtils = require('../utils/filter-utils');

var _schema = require('./schema');

var _schema2 = _interopRequireDefault(_schema);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * V0 Schema
 */

var dimensionPropsV0 = exports.dimensionPropsV0 = ['name', 'type'];

// in v0 geojson there is only sizeField

// in v1 geojson
// stroke base on -> sizeField
// height based on -> heightField
// radius based on -> radiusField
// here we make our wiredst guess on which channel sizeField belongs to
function geojsonSizeFieldV0ToV1(config) {
  var defaultRaiuds = 10;
  var defaultRadiusRange = [0, 50];

  // if extruded, sizeField is most likely used for height
  if (config.visConfig.extruded) {
    return 'heightField';
  }

  // if show stroke enabled, sizeField is most likely used for stroke
  if (config.visConfig.stroked) {
    return 'sizeField';
  }

  // if radius changed, or radius Range Changed, sizeField is most likely used for radius
  // this is the most unreliable guess, that's why we put it in the end
  if (config.visConfig.radius !== defaultRaiuds || config.visConfig.radiusRange.some(function (d, i) {
    return d !== defaultRadiusRange[i];
  })) {
    return 'radiusField';
  }

  return 'sizeField';
}

// convert v0 to v1 layer config

var DimensionFieldSchemaV0 = function (_Schema) {
  (0, _inherits3.default)(DimensionFieldSchemaV0, _Schema);

  function DimensionFieldSchemaV0() {
    var _ref;

    var _temp, _this, _ret;

    (0, _classCallCheck3.default)(this, DimensionFieldSchemaV0);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = (0, _possibleConstructorReturn3.default)(this, (_ref = DimensionFieldSchemaV0.__proto__ || Object.getPrototypeOf(DimensionFieldSchemaV0)).call.apply(_ref, [this].concat(args))), _this), _this.version = _versions.VERSIONS.v0, _temp), (0, _possibleConstructorReturn3.default)(_this, _ret);
  }

  (0, _createClass3.default)(DimensionFieldSchemaV0, [{
    key: 'save',
    value: function save(field, config) {
      // should not be called anymore
      return (0, _defineProperty3.default)({}, this.key, field !== null ? this.savePropertiesOrApplySchema(field)[this.key] : null);
    }
  }, {
    key: 'load',
    value: function load(field, config, accumulated) {
      var fieldName = this.key;
      if (config.type === 'geojson' && this.key === 'sizeField' && field) {
        fieldName = geojsonSizeFieldV0ToV1(config);
      }
      // fold into visualChannels to be load by VisualChannelSchemaV1
      return {
        visualChannels: (0, _extends12.default)({}, accumulated.visualChannels || {}, (0, _defineProperty3.default)({}, fieldName, field))
      };
    }
  }]);
  return DimensionFieldSchemaV0;
}(_schema2.default);

var DimensionScaleSchemaV0 = function (_Schema2) {
  (0, _inherits3.default)(DimensionScaleSchemaV0, _Schema2);

  function DimensionScaleSchemaV0() {
    var _ref3;

    var _temp2, _this2, _ret2;

    (0, _classCallCheck3.default)(this, DimensionScaleSchemaV0);

    for (var _len2 = arguments.length, args = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
      args[_key2] = arguments[_key2];
    }

    return _ret2 = (_temp2 = (_this2 = (0, _possibleConstructorReturn3.default)(this, (_ref3 = DimensionScaleSchemaV0.__proto__ || Object.getPrototypeOf(DimensionScaleSchemaV0)).call.apply(_ref3, [this].concat(args))), _this2), _this2.version = _versions.VERSIONS.v0, _temp2), (0, _possibleConstructorReturn3.default)(_this2, _ret2);
  }

  (0, _createClass3.default)(DimensionScaleSchemaV0, [{
    key: 'save',
    value: function save(scale) {
      return (0, _defineProperty3.default)({}, this.key, scale);
    }
  }, {
    key: 'load',
    value: function load(scale, config, accumulated) {
      // fold into visualChannels to be load by VisualChannelSchemaV1
      if (this.key === 'sizeScale' && config.type === 'geojson') {
        // sizeScale now split into radiusScale, heightScale
        // no user customization, just use default
        return {};
      }

      return {
        visualChannels: (0, _extends12.default)({}, accumulated.visualChannels || {}, (0, _defineProperty3.default)({}, this.key, scale))
      };
    }
  }]);
  return DimensionScaleSchemaV0;
}(_schema2.default);

// used to convert v0 to v1 layer config


var LayerConfigSchemaV0 = function (_Schema3) {
  (0, _inherits3.default)(LayerConfigSchemaV0, _Schema3);

  function LayerConfigSchemaV0() {
    var _ref5;

    var _temp3, _this3, _ret3;

    (0, _classCallCheck3.default)(this, LayerConfigSchemaV0);

    for (var _len3 = arguments.length, args = Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
      args[_key3] = arguments[_key3];
    }

    return _ret3 = (_temp3 = (_this3 = (0, _possibleConstructorReturn3.default)(this, (_ref5 = LayerConfigSchemaV0.__proto__ || Object.getPrototypeOf(LayerConfigSchemaV0)).call.apply(_ref5, [this].concat(args))), _this3), _this3.version = _versions.VERSIONS.v0, _temp3), (0, _possibleConstructorReturn3.default)(_this3, _ret3);
  }

  (0, _createClass3.default)(LayerConfigSchemaV0, [{
    key: 'load',
    value: function load(saved, layer, accumulated) {
      // fold v0 layer property into config.key
      return {
        config: (0, _extends12.default)({}, accumulated.config || {}, (0, _defineProperty3.default)({}, this.key, saved))
      };
    }
  }]);
  return LayerConfigSchemaV0;
}(_schema2.default);

// used to convert v0 to v1 layer columns
// only return column value for each column


var LayerColumnsSchemaV0 = function (_Schema4) {
  (0, _inherits3.default)(LayerColumnsSchemaV0, _Schema4);

  function LayerColumnsSchemaV0() {
    var _ref6;

    var _temp4, _this4, _ret4;

    (0, _classCallCheck3.default)(this, LayerColumnsSchemaV0);

    for (var _len4 = arguments.length, args = Array(_len4), _key4 = 0; _key4 < _len4; _key4++) {
      args[_key4] = arguments[_key4];
    }

    return _ret4 = (_temp4 = (_this4 = (0, _possibleConstructorReturn3.default)(this, (_ref6 = LayerColumnsSchemaV0.__proto__ || Object.getPrototypeOf(LayerColumnsSchemaV0)).call.apply(_ref6, [this].concat(args))), _this4), _this4.version = _versions.VERSIONS.v0, _temp4), (0, _possibleConstructorReturn3.default)(_this4, _ret4);
  }

  (0, _createClass3.default)(LayerColumnsSchemaV0, [{
    key: 'load',
    value: function load(saved, layer, accumulated) {
      // fold v0 layer property into config.key, flatten columns
      return {
        config: (0, _extends12.default)({}, accumulated.config || {}, {
          columns: Object.keys(saved).reduce(function (accu, key) {
            return (0, _extends12.default)({}, accu, (0, _defineProperty3.default)({}, key, saved[key].value));
          }, {})
        })
      };
    }
  }]);
  return LayerColumnsSchemaV0;
}(_schema2.default);

// used to convert v0 to v1 layer config.visConfig


var LayerConfigToVisConfigSchemaV0 = function (_Schema5) {
  (0, _inherits3.default)(LayerConfigToVisConfigSchemaV0, _Schema5);

  function LayerConfigToVisConfigSchemaV0() {
    var _ref7;

    var _temp5, _this5, _ret5;

    (0, _classCallCheck3.default)(this, LayerConfigToVisConfigSchemaV0);

    for (var _len5 = arguments.length, args = Array(_len5), _key5 = 0; _key5 < _len5; _key5++) {
      args[_key5] = arguments[_key5];
    }

    return _ret5 = (_temp5 = (_this5 = (0, _possibleConstructorReturn3.default)(this, (_ref7 = LayerConfigToVisConfigSchemaV0.__proto__ || Object.getPrototypeOf(LayerConfigToVisConfigSchemaV0)).call.apply(_ref7, [this].concat(args))), _this5), _this5.version = _versions.VERSIONS.v0, _temp5), (0, _possibleConstructorReturn3.default)(_this5, _ret5);
  }

  (0, _createClass3.default)(LayerConfigToVisConfigSchemaV0, [{
    key: 'load',
    value: function load(saved, layer, accumulated) {
      // fold v0 layer property into config.visConfig
      var accumulatedConfig = accumulated.config || {};
      return {
        config: (0, _extends12.default)({}, accumulatedConfig, {
          visConfig: (0, _extends12.default)({}, accumulatedConfig.visConfig || {}, (0, _defineProperty3.default)({}, this.key, saved))
        })
      };
    }
  }]);
  return LayerConfigToVisConfigSchemaV0;
}(_schema2.default);

var LayerVisConfigSchemaV0 = function (_Schema6) {
  (0, _inherits3.default)(LayerVisConfigSchemaV0, _Schema6);

  function LayerVisConfigSchemaV0() {
    var _ref8;

    var _temp6, _this6, _ret6;

    (0, _classCallCheck3.default)(this, LayerVisConfigSchemaV0);

    for (var _len6 = arguments.length, args = Array(_len6), _key6 = 0; _key6 < _len6; _key6++) {
      args[_key6] = arguments[_key6];
    }

    return _ret6 = (_temp6 = (_this6 = (0, _possibleConstructorReturn3.default)(this, (_ref8 = LayerVisConfigSchemaV0.__proto__ || Object.getPrototypeOf(LayerVisConfigSchemaV0)).call.apply(_ref8, [this].concat(args))), _this6), _this6.version = _versions.VERSIONS.v0, _this6.key = 'visConfig', _temp6), (0, _possibleConstructorReturn3.default)(_this6, _ret6);
  }

  (0, _createClass3.default)(LayerVisConfigSchemaV0, [{
    key: 'load',
    value: function load(visConfig, config, accumulator) {
      var rename = {
        geojson: {
          extruded: 'enable3d',
          elevationRange: 'heightRange'
        }
      };

      if (config.type in rename) {
        var propToRename = rename[config.type];
        return {
          config: (0, _extends12.default)({}, accumulator.config || {}, {
            visConfig: Object.keys(visConfig).reduce(function (accu, key) {
              return (0, _extends12.default)({}, accu, propToRename[key] ? (0, _defineProperty3.default)({}, propToRename[key], visConfig[key]) : (0, _defineProperty3.default)({}, key, visConfig[key]));
            }, {})
          })
        };
      }

      return {
        config: (0, _extends12.default)({}, accumulator.config || {}, {
          visConfig: visConfig
        })
      };
    }
  }]);
  return LayerVisConfigSchemaV0;
}(_schema2.default);

var LayerConfigSchemaDeleteV0 = function (_Schema7) {
  (0, _inherits3.default)(LayerConfigSchemaDeleteV0, _Schema7);

  function LayerConfigSchemaDeleteV0() {
    var _ref11;

    var _temp7, _this7, _ret7;

    (0, _classCallCheck3.default)(this, LayerConfigSchemaDeleteV0);

    for (var _len7 = arguments.length, args = Array(_len7), _key7 = 0; _key7 < _len7; _key7++) {
      args[_key7] = arguments[_key7];
    }

    return _ret7 = (_temp7 = (_this7 = (0, _possibleConstructorReturn3.default)(this, (_ref11 = LayerConfigSchemaDeleteV0.__proto__ || Object.getPrototypeOf(LayerConfigSchemaDeleteV0)).call.apply(_ref11, [this].concat(args))), _this7), _this7.version = _versions.VERSIONS.v0, _temp7), (0, _possibleConstructorReturn3.default)(_this7, _ret7);
  }

  (0, _createClass3.default)(LayerConfigSchemaDeleteV0, [{
    key: 'load',
    value: function load(value) {
      return {};
    }
  }]);
  return LayerConfigSchemaDeleteV0;
}(_schema2.default);

/**
 * V0 -> V1 Changes
 * - layer is now a class
 * - config saved in a config object
 * - id, type, isAggregated is outside layer.config
 * - visualChannels is outside config, it defines available visual channel and
 *   property names for field, scale, domain and range of each visual chanel.
 * - enable3d, colorAggregation and sizeAggregation are moved into visConfig
 * - GeojsonLayer - added height, radius specific properties
 */

var layerPropsV0 = exports.layerPropsV0 = {
  id: null,
  type: null,

  // move into layer.config
  dataId: new LayerConfigSchemaV0({ key: 'dataId' }),
  label: new LayerConfigSchemaV0({ key: 'label' }),
  color: new LayerConfigSchemaV0({ key: 'color' }),
  isVisible: new LayerConfigSchemaV0({ key: 'isVisible' }),

  // convert visConfig
  visConfig: new LayerVisConfigSchemaV0({ key: 'visConfig' }),

  // move into layer.config
  // flatten
  columns: new LayerColumnsSchemaV0(),

  // save into visualChannels
  colorField: new DimensionFieldSchemaV0({
    properties: dimensionPropsV0,
    key: 'colorField'
  }),
  colorScale: new DimensionScaleSchemaV0({
    key: 'colorScale'
  }),
  sizeField: new DimensionFieldSchemaV0({
    properties: dimensionPropsV0,
    key: 'sizeField'
  }),
  sizeScale: new DimensionScaleSchemaV0({
    key: 'sizeScale'
  }),

  // move into config.visConfig
  enable3d: new LayerConfigToVisConfigSchemaV0({ key: 'enable3d' }),
  colorAggregation: new LayerConfigToVisConfigSchemaV0({
    key: 'colorAggregation'
  }),
  sizeAggregation: new LayerConfigToVisConfigSchemaV0({ key: 'sizeAggregation' }),

  // delete
  isAggregated: new LayerConfigSchemaDeleteV0()
};

/**
 * V1 Schema
 */

var ColumnSchemaV1 = function (_Schema8) {
  (0, _inherits3.default)(ColumnSchemaV1, _Schema8);

  function ColumnSchemaV1() {
    (0, _classCallCheck3.default)(this, ColumnSchemaV1);
    return (0, _possibleConstructorReturn3.default)(this, (ColumnSchemaV1.__proto__ || Object.getPrototypeOf(ColumnSchemaV1)).apply(this, arguments));
  }

  (0, _createClass3.default)(ColumnSchemaV1, [{
    key: 'save',
    value: function save(columns, state) {
      // starting from v1, only save column value
      // fieldIdx will be calculated during merge
      return (0, _defineProperty3.default)({}, this.key, Object.keys(columns).reduce(function (accu, ckey) {
        return (0, _extends12.default)({}, accu, (0, _defineProperty3.default)({}, ckey, columns[ckey].value));
      }, {}));
    }
  }, {
    key: 'load',
    value: function load(columns) {
      return { columns: columns };
    }
  }]);
  return ColumnSchemaV1;
}(_schema2.default);

var TextLabelSchemaV1 = function (_Schema9) {
  (0, _inherits3.default)(TextLabelSchemaV1, _Schema9);

  function TextLabelSchemaV1() {
    (0, _classCallCheck3.default)(this, TextLabelSchemaV1);
    return (0, _possibleConstructorReturn3.default)(this, (TextLabelSchemaV1.__proto__ || Object.getPrototypeOf(TextLabelSchemaV1)).apply(this, arguments));
  }

  (0, _createClass3.default)(TextLabelSchemaV1, [{
    key: 'save',
    value: function save(textLabel) {
      return (0, _defineProperty3.default)({}, this.key, (0, _extends12.default)({}, textLabel, {
        field: textLabel.field ? (0, _lodash2.default)(textLabel.field, ['name', 'type']) : null
      }));
    }
  }, {
    key: 'load',
    value: function load(textLabel) {
      return { textLabel: textLabel };
    }
  }]);
  return TextLabelSchemaV1;
}(_schema2.default);

/**
 * V1: save [field]: {name, type}, [scale]: '' for each channel
 */


var VisualChannelSchemaV1 = function (_Schema10) {
  (0, _inherits3.default)(VisualChannelSchemaV1, _Schema10);

  function VisualChannelSchemaV1() {
    (0, _classCallCheck3.default)(this, VisualChannelSchemaV1);
    return (0, _possibleConstructorReturn3.default)(this, (VisualChannelSchemaV1.__proto__ || Object.getPrototypeOf(VisualChannelSchemaV1)).apply(this, arguments));
  }

  (0, _createClass3.default)(VisualChannelSchemaV1, [{
    key: 'save',
    value: function save(visualChannels, layer) {
      // only save field and scale of each channel
      return (0, _defineProperty3.default)({}, this.key, Object.keys(visualChannels).reduce(
      //  save channel to null if didn't select any field
      function (accu, key) {
        var _extends8;

        return (0, _extends12.default)({}, accu, (_extends8 = {}, (0, _defineProperty3.default)(_extends8, visualChannels[key].field, layer.config[visualChannels[key].field] ? (0, _lodash2.default)(layer.config[visualChannels[key].field], ['name', 'type']) : null), (0, _defineProperty3.default)(_extends8, visualChannels[key].scale, layer.config[visualChannels[key].scale]), _extends8));
      }, {}));
    }
  }, {
    key: 'load',
    value: function load(vc, layer, accumulator) {
      // fold channels into config
      return (0, _extends12.default)({}, accumulator, {
        config: (0, _extends12.default)({}, accumulator.config || {}, vc)
      });
    }
  }]);
  return VisualChannelSchemaV1;
}(_schema2.default);

var layerPropsV1 = exports.layerPropsV1 = {
  id: null,
  type: null,
  config: new _schema2.default({
    version: _versions.VERSIONS.v1,
    key: 'config',
    properties: {
      dataId: null,
      label: null,
      color: null,
      columns: new ColumnSchemaV1({
        version: _versions.VERSIONS.v1,
        key: 'columns'
      }),
      isVisible: null,
      visConfig: null,
      textLabel: new TextLabelSchemaV1({
        version: _versions.VERSIONS.v1,
        key: 'textLabel'
      })
    }
  }),
  visualChannels: new VisualChannelSchemaV1({
    version: _versions.VERSIONS.v1,
    key: 'visualChannels'
  })
};

var LayerSchemaV0 = function (_Schema11) {
  (0, _inherits3.default)(LayerSchemaV0, _Schema11);

  function LayerSchemaV0() {
    var _ref15;

    var _temp8, _this11, _ret8;

    (0, _classCallCheck3.default)(this, LayerSchemaV0);

    for (var _len8 = arguments.length, args = Array(_len8), _key8 = 0; _key8 < _len8; _key8++) {
      args[_key8] = arguments[_key8];
    }

    return _ret8 = (_temp8 = (_this11 = (0, _possibleConstructorReturn3.default)(this, (_ref15 = LayerSchemaV0.__proto__ || Object.getPrototypeOf(LayerSchemaV0)).call.apply(_ref15, [this].concat(args))), _this11), _this11.key = 'layers', _temp8), (0, _possibleConstructorReturn3.default)(_this11, _ret8);
  }

  (0, _createClass3.default)(LayerSchemaV0, [{
    key: 'save',
    value: function save(layers, visState) {
      var _this12 = this;

      return (0, _defineProperty3.default)({}, this.key, visState.layerOrder.reduce(function (saved, index) {
        // save layers according to their rendering order
        var layer = layers[index];
        if (layer.isValidToSave()) {
          saved.push(_this12.savePropertiesOrApplySchema(layer).layers);
        }
        return saved;
      }, []));
    }
  }, {
    key: 'load',
    value: function load(layers, visState) {
      var _this13 = this;

      return (0, _defineProperty3.default)({}, this.key, layers.map(function (layer) {
        return _this13.loadPropertiesOrApplySchema(layer, layers).layers;
      }));
    }
  }]);
  return LayerSchemaV0;
}(_schema2.default);

var FilterSchemaV0 = function (_Schema12) {
  (0, _inherits3.default)(FilterSchemaV0, _Schema12);

  function FilterSchemaV0() {
    var _ref18;

    var _temp9, _this14, _ret9;

    (0, _classCallCheck3.default)(this, FilterSchemaV0);

    for (var _len9 = arguments.length, args = Array(_len9), _key9 = 0; _key9 < _len9; _key9++) {
      args[_key9] = arguments[_key9];
    }

    return _ret9 = (_temp9 = (_this14 = (0, _possibleConstructorReturn3.default)(this, (_ref18 = FilterSchemaV0.__proto__ || Object.getPrototypeOf(FilterSchemaV0)).call.apply(_ref18, [this].concat(args))), _this14), _this14.key = 'filters', _temp9), (0, _possibleConstructorReturn3.default)(_this14, _ret9);
  }

  (0, _createClass3.default)(FilterSchemaV0, [{
    key: 'save',
    value: function save(filters) {
      var _this15 = this;

      return {
        filters: filters.filter(_filterUtils.isValidFilterValue).map(function (filter) {
          return _this15.savePropertiesOrApplySchema(filter, _this15.properties).filters;
        })
      };
    }
  }, {
    key: 'load',
    value: function load(filters) {
      return { filters: filters };
    }
  }]);
  return FilterSchemaV0;
}(_schema2.default);

var interactionPropsV0 = ['tooltip', 'brush'];

var InteractionSchemaV0 = function (_Schema13) {
  (0, _inherits3.default)(InteractionSchemaV0, _Schema13);

  function InteractionSchemaV0() {
    var _ref19;

    var _temp10, _this16, _ret10;

    (0, _classCallCheck3.default)(this, InteractionSchemaV0);

    for (var _len10 = arguments.length, args = Array(_len10), _key10 = 0; _key10 < _len10; _key10++) {
      args[_key10] = arguments[_key10];
    }

    return _ret10 = (_temp10 = (_this16 = (0, _possibleConstructorReturn3.default)(this, (_ref19 = InteractionSchemaV0.__proto__ || Object.getPrototypeOf(InteractionSchemaV0)).call.apply(_ref19, [this].concat(args))), _this16), _this16.key = 'interactionConfig', _temp10), (0, _possibleConstructorReturn3.default)(_this16, _ret10);
  }

  (0, _createClass3.default)(InteractionSchemaV0, [{
    key: 'save',
    value: function save(interactionConfig) {
      return (0, _defineProperty3.default)({}, this.key, this.properties.reduce(function (accu, key) {
        return (0, _extends12.default)({}, accu, interactionConfig[key].enabled ? (0, _defineProperty3.default)({}, key, interactionConfig[key].config) : {});
      }, {}));
    }
  }, {
    key: 'load',
    value: function load(interactionConfig) {
      // convert v0 -> v1
      // return enabled: false if disabled,
      return (0, _defineProperty3.default)({}, this.key, this.properties.reduce(function (accu, key) {
        return (0, _extends12.default)({}, accu, (0, _defineProperty3.default)({}, key, (0, _extends12.default)({}, interactionConfig[key] || {}, {
          enabled: Boolean(interactionConfig[key])
        })));
      }, {}));
    }
  }]);
  return InteractionSchemaV0;
}(_schema2.default);

var InteractionSchemaV1 = function (_Schema14) {
  (0, _inherits3.default)(InteractionSchemaV1, _Schema14);

  function InteractionSchemaV1() {
    var _ref23;

    var _temp11, _this17, _ret11;

    (0, _classCallCheck3.default)(this, InteractionSchemaV1);

    for (var _len11 = arguments.length, args = Array(_len11), _key11 = 0; _key11 < _len11; _key11++) {
      args[_key11] = arguments[_key11];
    }

    return _ret11 = (_temp11 = (_this17 = (0, _possibleConstructorReturn3.default)(this, (_ref23 = InteractionSchemaV1.__proto__ || Object.getPrototypeOf(InteractionSchemaV1)).call.apply(_ref23, [this].concat(args))), _this17), _this17.key = 'interactionConfig', _temp11), (0, _possibleConstructorReturn3.default)(_this17, _ret11);
  }

  (0, _createClass3.default)(InteractionSchemaV1, [{
    key: 'save',
    value: function save(interactionConfig) {
      // save config even if disabled,
      return (0, _defineProperty3.default)({}, this.key, this.properties.reduce(function (accu, key) {
        return (0, _extends12.default)({}, accu, (0, _defineProperty3.default)({}, key, (0, _extends12.default)({}, interactionConfig[key].config, {
          enabled: interactionConfig[key].enabled
        })));
      }, {}));
    }
  }, {
    key: 'load',
    value: function load(interactionConfig) {
      return (0, _defineProperty3.default)({}, this.key, interactionConfig);
    }
  }]);
  return InteractionSchemaV1;
}(_schema2.default);

var filterPropsV0 = exports.filterPropsV0 = {
  dataId: null,
  id: null,
  name: null,
  type: null,
  value: null,
  enlarged: null
};

var DimensionFieldSchema = exports.DimensionFieldSchema = function (_Schema15) {
  (0, _inherits3.default)(DimensionFieldSchema, _Schema15);

  function DimensionFieldSchema() {
    (0, _classCallCheck3.default)(this, DimensionFieldSchema);
    return (0, _possibleConstructorReturn3.default)(this, (DimensionFieldSchema.__proto__ || Object.getPrototypeOf(DimensionFieldSchema)).apply(this, arguments));
  }

  (0, _createClass3.default)(DimensionFieldSchema, [{
    key: 'save',
    value: function save(field) {
      return (0, _defineProperty3.default)({}, this.key, field ? this.savePropertiesOrApplySchema(field)[this.key] : null);
    }
  }, {
    key: 'load',
    value: function load(field) {
      return (0, _defineProperty3.default)({}, this.key, field);
    }
  }]);
  return DimensionFieldSchema;
}(_schema2.default);

var filterPropsV1 = exports.filterPropsV1 = (0, _extends12.default)({}, filterPropsV0, {
  plotType: null,
  yAxis: new DimensionFieldSchema({
    version: _versions.VERSIONS.v1,
    key: 'yAxis',
    properties: {
      name: null,
      type: null
    }
  })
});

var propertiesV0 = exports.propertiesV0 = {
  filters: new FilterSchemaV0({
    version: _versions.VERSIONS.v0,
    properties: filterPropsV0
  }),
  layers: new LayerSchemaV0({
    version: _versions.VERSIONS.v0,
    properties: layerPropsV0
  }),
  interactionConfig: new InteractionSchemaV0({
    version: _versions.VERSIONS.v0,
    properties: interactionPropsV0
  }),
  layerBlending: null
};

var propertiesV1 = exports.propertiesV1 = {
  filters: new FilterSchemaV0({
    version: _versions.VERSIONS.v1,
    properties: filterPropsV1
  }),
  layers: new LayerSchemaV0({
    version: _versions.VERSIONS.v1,
    properties: layerPropsV1
  }),
  interactionConfig: new InteractionSchemaV1({
    version: _versions.VERSIONS.v1,
    properties: interactionPropsV0
  }),
  layerBlending: null,
  splitMaps: null
};

var visStateSchemaV0 = exports.visStateSchemaV0 = new _schema2.default({
  version: _versions.VERSIONS.v0,
  properties: propertiesV0,
  key: 'visState'
});

var visStateSchemaV1 = exports.visStateSchemaV1 = new _schema2.default({
  version: _versions.VERSIONS.v1,
  properties: propertiesV1,
  key: 'visState'
});

var visStateSchema = exports.visStateSchema = (_visStateSchema = {}, (0, _defineProperty3.default)(_visStateSchema, _versions.VERSIONS.v0, {
  save: function save(toSave) {
    return visStateSchemaV0.save(toSave);
  },
  load: function load(toLoad) {
    return visStateSchemaV1.load(visStateSchemaV0.load(toLoad).visState);
  }
}), (0, _defineProperty3.default)(_visStateSchema, _versions.VERSIONS.v1, visStateSchemaV1), _visStateSchema);

// test load v0
exports.default = visStateSchema;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9zY2hlbWFzL3Zpcy1zdGF0ZS1zY2hlbWEuanMiXSwibmFtZXMiOlsiZGltZW5zaW9uUHJvcHNWMCIsImdlb2pzb25TaXplRmllbGRWMFRvVjEiLCJjb25maWciLCJkZWZhdWx0UmFpdWRzIiwiZGVmYXVsdFJhZGl1c1JhbmdlIiwidmlzQ29uZmlnIiwiZXh0cnVkZWQiLCJzdHJva2VkIiwicmFkaXVzIiwicmFkaXVzUmFuZ2UiLCJzb21lIiwiZCIsImkiLCJEaW1lbnNpb25GaWVsZFNjaGVtYVYwIiwidmVyc2lvbiIsIlZFUlNJT05TIiwidjAiLCJmaWVsZCIsImtleSIsInNhdmVQcm9wZXJ0aWVzT3JBcHBseVNjaGVtYSIsImFjY3VtdWxhdGVkIiwiZmllbGROYW1lIiwidHlwZSIsInZpc3VhbENoYW5uZWxzIiwiU2NoZW1hIiwiRGltZW5zaW9uU2NhbGVTY2hlbWFWMCIsInNjYWxlIiwiTGF5ZXJDb25maWdTY2hlbWFWMCIsInNhdmVkIiwibGF5ZXIiLCJMYXllckNvbHVtbnNTY2hlbWFWMCIsImNvbHVtbnMiLCJPYmplY3QiLCJrZXlzIiwicmVkdWNlIiwiYWNjdSIsInZhbHVlIiwiTGF5ZXJDb25maWdUb1Zpc0NvbmZpZ1NjaGVtYVYwIiwiYWNjdW11bGF0ZWRDb25maWciLCJMYXllclZpc0NvbmZpZ1NjaGVtYVYwIiwiYWNjdW11bGF0b3IiLCJyZW5hbWUiLCJnZW9qc29uIiwiZWxldmF0aW9uUmFuZ2UiLCJwcm9wVG9SZW5hbWUiLCJMYXllckNvbmZpZ1NjaGVtYURlbGV0ZVYwIiwibGF5ZXJQcm9wc1YwIiwiaWQiLCJkYXRhSWQiLCJsYWJlbCIsImNvbG9yIiwiaXNWaXNpYmxlIiwiY29sb3JGaWVsZCIsInByb3BlcnRpZXMiLCJjb2xvclNjYWxlIiwic2l6ZUZpZWxkIiwic2l6ZVNjYWxlIiwiZW5hYmxlM2QiLCJjb2xvckFnZ3JlZ2F0aW9uIiwic2l6ZUFnZ3JlZ2F0aW9uIiwiaXNBZ2dyZWdhdGVkIiwiQ29sdW1uU2NoZW1hVjEiLCJzdGF0ZSIsImNrZXkiLCJUZXh0TGFiZWxTY2hlbWFWMSIsInRleHRMYWJlbCIsIlZpc3VhbENoYW5uZWxTY2hlbWFWMSIsInZjIiwibGF5ZXJQcm9wc1YxIiwidjEiLCJMYXllclNjaGVtYVYwIiwibGF5ZXJzIiwidmlzU3RhdGUiLCJsYXllck9yZGVyIiwiaW5kZXgiLCJpc1ZhbGlkVG9TYXZlIiwicHVzaCIsIm1hcCIsImxvYWRQcm9wZXJ0aWVzT3JBcHBseVNjaGVtYSIsIkZpbHRlclNjaGVtYVYwIiwiZmlsdGVycyIsImZpbHRlciIsImlzVmFsaWRGaWx0ZXJWYWx1ZSIsImludGVyYWN0aW9uUHJvcHNWMCIsIkludGVyYWN0aW9uU2NoZW1hVjAiLCJpbnRlcmFjdGlvbkNvbmZpZyIsImVuYWJsZWQiLCJCb29sZWFuIiwiSW50ZXJhY3Rpb25TY2hlbWFWMSIsImZpbHRlclByb3BzVjAiLCJuYW1lIiwiZW5sYXJnZWQiLCJEaW1lbnNpb25GaWVsZFNjaGVtYSIsImZpbHRlclByb3BzVjEiLCJwbG90VHlwZSIsInlBeGlzIiwicHJvcGVydGllc1YwIiwibGF5ZXJCbGVuZGluZyIsInByb3BlcnRpZXNWMSIsInNwbGl0TWFwcyIsInZpc1N0YXRlU2NoZW1hVjAiLCJ2aXNTdGF0ZVNjaGVtYVYxIiwidmlzU3RhdGVTY2hlbWEiLCJzYXZlIiwidG9TYXZlIiwibG9hZCIsInRvTG9hZCJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztxQkFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7OztBQUNBOztBQUNBOztBQUVBOzs7Ozs7QUFFQTs7OztBQUlPLElBQU1BLDhDQUFtQixDQUFDLE1BQUQsRUFBUyxNQUFULENBQXpCOztBQUVQOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTQyxzQkFBVCxDQUFnQ0MsTUFBaEMs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dXJjZXNDb250ZW50IjpbIi8vIENvcHlyaWdodCAoYykgMjAxOCBVYmVyIFRlY2hub2xvZ2llcywgSW5jLlxuLy9cbi8vIFBlcm1pc3Npb24gaXMgaGVyZWJ5IGdyYW50ZWQsIGZyZWUgb2YgY2hhcmdlLCB0byBhbnkgcGVyc29uIG9idGFpbmluZyBhIGNvcHlcbi8vIG9mIHRoaXMgc29mdHdhcmUgYW5kIGFzc29jaWF0ZWQgZG9jdW1lbnRhdGlvbiBmaWxlcyAodGhlIFwiU29mdHdhcmVcIiksIHRvIGRlYWxcbi8vIGluIHRoZSBTb2Z0d2FyZSB3aXRob3V0IHJlc3RyaWN0aW9uLCBpbmNsdWRpbmcgd2l0aG91dCBsaW1pdGF0aW9uIHRoZSByaWdodHNcbi8vIHRvIHVzZSwgY29weSwgbW9kaWZ5LCBtZXJnZSwgcHVibGlzaCwgZGlzdHJpYnV0ZSwgc3VibGljZW5zZSwgYW5kL29yIHNlbGxcbi8vIGNvcGllcyBvZiB0aGUgU29mdHdhcmUsIGFuZCB0byBwZXJtaXQgcGVyc29ucyB0byB3aG9tIHRoZSBTb2Z0d2FyZSBpc1xuLy8gZnVybmlzaGVkIHRvIGRvIHNvLCBzdWJqZWN0IHRvIHRoZSBmb2xsb3dpbmcgY29uZGl0aW9uczpcbi8vXG4vLyBUaGUgYWJvdmUgY29weXJpZ2h0IG5vdGljZSBhbmQgdGhpcyBwZXJtaXNzaW9uIG5vdGljZSBzaGFsbCBiZSBpbmNsdWRlZCBpblxuLy8gYWxsIGNvcGllcyBvciBzdWJzdGFudGlhbCBwb3J0aW9ucyBvZiB0aGUgU29mdHdhcmUuXG4vL1xuLy8gVEhFIFNPRlRXQVJFIElTIFBST1ZJREVEIFwiQVMgSVNcIiwgV0lUSE9VVCBXQVJSQU5UWSBPRiBBTlkgS0lORCwgRVhQUkVTUyBPUlxuLy8gSU1QTElFRCwgSU5DTFVESU5HIEJVVCBOT1QgTElNSVRFRCBUTyBUSEUgV0FSUkFOVElFUyBPRiBNRVJDSEFOVEFCSUxJVFksXG4vLyBGSVRORVNTIEZPUiBBIFBBUlRJQ1VMQVIgUFVSUE9TRSBBTkQgTk9OSU5GUklOR0VNRU5ULiBJTiBOTyBFVkVOVCBTSEFMTCBUSEVcbi8vIEFVVEhPUlMgT1IgQ09QWVJJR0hUIEhPTERFUlMgQkUgTElBQkxFIEZPUiBBTlkgQ0xBSU0sIERBTUFHRVMgT1IgT1RIRVJcbi8vIExJQUJJTElUWSwgV0hFVEhFUiBJTiBBTiBBQ1RJT04gT0YgQ09OVFJBQ1QsIFRPUlQgT1IgT1RIRVJXSVNFLCBBUklTSU5HIEZST00sXG4vLyBPVVQgT0YgT1IgSU4gQ09OTkVDVElPTiBXSVRIIFRIRSBTT0ZUV0FSRSBPUiBUSEUgVVNFIE9SIE9USEVSIERFQUxJTkdTIElOXG4vLyBUSEUgU09GVFdBUkUuXG5cbmltcG9ydCBwaWNrIGZyb20gJ2xvZGFzaC5waWNrJztcbmltcG9ydCB7VkVSU0lPTlN9IGZyb20gJy4vdmVyc2lvbnMnO1xuaW1wb3J0IHtpc1ZhbGlkRmlsdGVyVmFsdWV9IGZyb20gJ3V0aWxzL2ZpbHRlci11dGlscyc7XG5cbmltcG9ydCBTY2hlbWEgZnJvbSAnLi9zY2hlbWEnO1xuXG4vKipcbiAqIFYwIFNjaGVtYVxuICovXG5cbmV4cG9ydCBjb25zdCBkaW1lbnNpb25Qcm9wc1YwID0gWyduYW1lJywgJ3R5cGUnXTtcblxuLy8gaW4gdjAgZ2VvanNvbiB0aGVyZSBpcyBvbmx5IHNpemVGaWVsZFxuXG4vLyBpbiB2MSBnZW9qc29uXG4vLyBzdHJva2UgYmFzZSBvbiAtPiBzaXplRmllbGRcbi8vIGhlaWdodCBiYXNlZCBvbiAtPiBoZWlnaHRGaWVsZFxuLy8gcmFkaXVzIGJhc2VkIG9uIC0+IHJhZGl1c0ZpZWxkXG4vLyBoZXJlIHdlIG1ha2Ugb3VyIHdpcmVkc3QgZ3Vlc3Mgb24gd2hpY2ggY2hhbm5lbCBzaXplRmllbGQgYmVsb25ncyB0b1xuZnVuY3Rpb24gZ2VvanNvblNpemVGaWVsZFYwVG9WMShjb25maWcpIHtcbiAgY29uc3QgZGVmYXVsdFJhaXVkcyA9IDEwO1xuICBjb25zdCBkZWZhdWx0UmFkaXVzUmFuZ2UgPSBbMCwgNTBdO1xuXG4gIC8vIGlmIGV4dHJ1ZGVkLCBzaXplRmllbGQgaXMgbW9zdCBsaWtlbHkgdXNlZCBmb3IgaGVpZ2h0XG4gIGlmIChjb25maWcudmlzQ29uZmlnLmV4dHJ1ZGVkKSB7XG4gICAgcmV0dXJuICdoZWlnaHRGaWVsZCc7XG4gIH1cblxuICAvLyBpZiBzaG93IHN0cm9rZSBlbmFibGVkLCBzaXplRmllbGQgaXMgbW9zdCBsaWtlbHkgdXNlZCBmb3Igc3Ryb2tlXG4gIGlmIChjb25maWcudmlzQ29uZmlnLnN0cm9rZWQpIHtcbiAgICByZXR1cm4gJ3NpemVGaWVsZCc7XG4gIH1cblxuICAvLyBpZiByYWRpdXMgY2hhbmdlZCwgb3IgcmFkaXVzIFJhbmdlIENoYW5nZWQsIHNpemVGaWVsZCBpcyBtb3N0IGxpa2VseSB1c2VkIGZvciByYWRpdXNcbiAgLy8gdGhpcyBpcyB0aGUgbW9zdCB1bnJlbGlhYmxlIGd1ZXNzLCB0aGF0J3Mgd2h5IHdlIHB1dCBpdCBpbiB0aGUgZW5kXG4gIGlmIChcbiAgICBjb25maWcudmlzQ29uZmlnLnJhZGl1cyAhPT0gZGVmYXVsdFJhaXVkcyB8fFxuICAgIGNvbmZpZy52aXNDb25maWcucmFkaXVzUmFuZ2Uuc29tZSgoZCwgaSkgPT4gZCAhPT0gZGVmYXVsdFJhZGl1c1JhbmdlW2ldKVxuICApIHtcbiAgICByZXR1cm4gJ3JhZGl1c0ZpZWxkJztcbiAgfVxuXG4gIHJldHVybiAnc2l6ZUZpZWxkJztcbn1cblxuLy8gY29udmVydCB2MCB0byB2MSBsYXllciBjb25maWdcbmNsYXNzIERpbWVuc2lvbkZpZWxkU2NoZW1hVjAgZXh0ZW5kcyBTY2hlbWEge1xuICB2ZXJzaW9uID0gVkVSU0lPTlMudjA7XG4gIHNhdmUoZmllbGQsIGNvbmZpZykge1xuICAgIC8vIHNob3VsZCBub3QgYmUgY2FsbGVkIGFueW1vcmVcbiAgICByZXR1cm4ge1xuICAgICAgW3RoaXMua2V5XTpcbiAgICAgICAgZmllbGQgIT09IG51bGxcbiAgICAgICAgICA/IHRoaXMuc2F2ZVByb3BlcnRpZXNPckFwcGx5U2NoZW1hKGZpZWxkKVt0aGlzLmtleV1cbiAgICAgICAgICA6IG51bGxcbiAgICB9O1xuICB9XG5cbiAgbG9hZChmaWVsZCwgY29uZmlnLCBhY2N1bXVsYXRlZCkge1xuICAgIGxldCBmaWVsZE5hbWUgPSB0aGlzLmtleTtcbiAgICBpZiAoY29uZmlnLnR5cGUgPT09ICdnZW9qc29uJyAmJiB0aGlzLmtleSA9PT0gJ3NpemVGaWVsZCcgJiYgZmllbGQpIHtcbiAgICAgIGZpZWxkTmFtZSA9IGdlb2pzb25TaXplRmllbGRWMFRvVjEoY29uZmlnKTtcbiAgICB9XG4gICAgLy8gZm9sZCBpbnRvIHZpc3VhbENoYW5uZWxzIHRvIGJlIGxvYWQgYnkgVmlzdWFsQ2hhbm5lbFNjaGVtYVYxXG4gICAgcmV0dXJuIHtcbiAgICAgIHZpc3VhbENoYW5uZWxzOiB7XG4gICAgICAgIC4uLihhY2N1bXVsYXRlZC52aXN1YWxDaGFubmVscyB8fCB7fSksXG4gICAgICAgIFtmaWVsZE5hbWVdOiBmaWVsZFxuICAgICAgfVxuICAgIH07XG4gIH1cbn1cblxuY2xhc3MgRGltZW5zaW9uU2NhbGVTY2hlbWFWMCBleHRlbmRzIFNjaGVtYSB7XG4gIHZlcnNpb24gPSBWRVJTSU9OUy52MDtcbiAgc2F2ZShzY2FsZSkge1xuICAgIHJldHVybiB7W3RoaXMua2V5XTogc2NhbGV9O1xuICB9XG4gIGxvYWQoc2NhbGUsIGNvbmZpZywgYWNjdW11bGF0ZWQpIHtcbiAgICAvLyBmb2xkIGludG8gdmlzdWFsQ2hhbm5lbHMgdG8gYmUgbG9hZCBieSBWaXN1YWxDaGFubmVsU2NoZW1hVjFcbiAgICBpZiAodGhpcy5rZXkgPT09ICdzaXplU2NhbGUnICYmIGNvbmZpZy50eXBlID09PSAnZ2VvanNvbicpIHtcbiAgICAgIC8vIHNpemVTY2FsZSBub3cgc3BsaXQgaW50byByYWRpdXNTY2FsZSwgaGVpZ2h0U2NhbGVcbiAgICAgIC8vIG5vIHVzZXIgY3VzdG9taXphdGlvbiwganVzdCB1c2UgZGVmYXVsdFxuICAgICAgcmV0dXJuIHt9O1xuICAgIH1cblxuICAgIHJldHVybiB7XG4gICAgICB2aXN1YWxDaGFubmVsczoge1xuICAgICAgICAuLi4oYWNjdW11bGF0ZWQudmlzdWFsQ2hhbm5lbHMgfHwge30pLFxuICAgICAgICBbdGhpcy5rZXldOiBzY2FsZVxuICAgICAgfVxuICAgIH07XG4gIH1cbn1cblxuLy8gdXNlZCB0byBjb252ZXJ0IHYwIHRvIHYxIGxheWVyIGNvbmZpZ1xuY2xhc3MgTGF5ZXJDb25maWdTY2hlbWFWMCBleHRlbmRzIFNjaGVtYSB7XG4gIHZlcnNpb24gPSBWRVJTSU9OUy52MDtcbiAgbG9hZChzYXZlZCwgbGF5ZXIsIGFjY3VtdWxhdGVkKSB7XG4gICAgLy8gZm9sZCB2MCBsYXllciBwcm9wZXJ0eSBpbnRvIGNvbmZpZy5rZXlcbiAgICByZXR1cm4ge1xuICAgICAgY29uZmlnOiB7XG4gICAgICAgIC4uLihhY2N1bXVsYXRlZC5jb25maWcgfHwge30pLFxuICAgICAgICBbdGhpcy5rZXldOiBzYXZlZFxuICAgICAgfVxuICAgIH07XG4gIH1cbn1cblxuLy8gdXNlZCB0byBjb252ZXJ0IHYwIHRvIHYxIGxheWVyIGNvbHVtbnNcbi8vIG9ubHkgcmV0dXJuIGNvbHVtbiB2YWx1ZSBmb3IgZWFjaCBjb2x1bW5cbmNsYXNzIExheWVyQ29sdW1uc1NjaGVtYVYwIGV4dGVuZHMgU2NoZW1hIHtcbiAgdmVyc2lvbiA9IFZFUlNJT05TLnYwO1xuICBsb2FkKHNhdmVkLCBsYXllciwgYWNjdW11bGF0ZWQpIHtcbiAgICAvLyBmb2xkIHYwIGxheWVyIHByb3BlcnR5IGludG8gY29uZmlnLmtleSwgZmxhdHRlbiBjb2x1bW5zXG4gICAgcmV0dXJuIHtcbiAgICAgIGNvbmZpZzoge1xuICAgICAgICAuLi4oYWNjdW11bGF0ZWQuY29uZmlnIHx8IHt9KSxcbiAgICAgICAgY29sdW1uczogT2JqZWN0LmtleXMoc2F2ZWQpLnJlZHVjZShcbiAgICAgICAgICAoYWNjdSwga2V5KSA9PiAoe1xuICAgICAgICAgICAgLi4uYWNjdSxcbiAgICAgICAgICAgIFtrZXldOiBzYXZlZFtrZXldLnZhbHVlXG4gICAgICAgICAgfSksXG4gICAgICAgICAge31cbiAgICAgICAgKVxuICAgICAgfVxuICAgIH07XG4gIH1cbn1cblxuLy8gdXNlZCB0byBjb252ZXJ0IHYwIHRvIHYxIGxheWVyIGNvbmZpZy52aXNDb25maWdcbmNsYXNzIExheWVyQ29uZmlnVG9WaXNDb25maWdTY2hlbWFWMCBleHRlbmRzIFNjaGVtYSB7XG4gIHZlcnNpb24gPSBWRVJTSU9OUy52MDtcbiAgbG9hZChzYXZlZCwgbGF5ZXIsIGFjY3VtdWxhdGVkKSB7XG4gICAgLy8gZm9sZCB2MCBsYXllciBwcm9wZXJ0eSBpbnRvIGNvbmZpZy52aXNDb25maWdcbiAgICBjb25zdCBhY2N1bXVsYXRlZENvbmZpZyA9IGFjY3VtdWxhdGVkLmNvbmZpZyB8fCB7fTtcbiAgICByZXR1cm4ge1xuICAgICAgY29uZmlnOiB7XG4gICAgICAgIC4uLmFjY3VtdWxhdGVkQ29uZmlnLFxuICAgICAgICB2aXNDb25maWc6IHtcbiAgICAgICAgICAuLi4oYWNjdW11bGF0ZWRDb25maWcudmlzQ29uZmlnIHx8IHt9KSxcbiAgICAgICAgICBbdGhpcy5rZXldOiBzYXZlZFxuICAgICAgICB9XG4gICAgICB9XG4gICAgfTtcbiAgfVxufVxuXG5jbGFzcyBMYXllclZpc0NvbmZpZ1NjaGVtYVYwIGV4dGVuZHMgU2NoZW1hIHtcbiAgdmVyc2lvbiA9IFZFUlNJT05TLnYwO1xuICBrZXkgPSAndmlzQ29uZmlnJztcblxuICBsb2FkKHZpc0NvbmZpZywgY29uZmlnLCBhY2N1bXVsYXRvcikge1xuICAgIGNvbnN0IHJlbmFtZSA9IHtcbiAgICAgIGdlb2pzb246IHtcbiAgICAgICAgZXh0cnVkZWQ6ICdlbmFibGUzZCcsXG4gICAgICAgIGVsZXZhdGlvblJhbmdlOiAnaGVpZ2h0UmFuZ2UnXG4gICAgICB9XG4gICAgfTtcblxuICAgIGlmIChjb25maWcudHlwZSBpbiByZW5hbWUpIHtcbiAgICAgIGNvbnN0IHByb3BUb1JlbmFtZSA9IHJlbmFtZVtjb25maWcudHlwZV07XG4gICAgICByZXR1cm4ge1xuICAgICAgICBjb25maWc6IHtcbiAgICAgICAgICAuLi4oYWNjdW11bGF0b3IuY29uZmlnIHx8IHt9KSxcbiAgICAgICAgICB2aXNDb25maWc6IE9iamVjdC5rZXlzKHZpc0NvbmZpZykucmVkdWNlKFxuICAgICAgICAgICAgKGFjY3UsIGtleSkgPT4gKHtcbiAgICAgICAgICAgICAgLi4uYWNjdSxcbiAgICAgICAgICAgICAgLi4uKHByb3BUb1JlbmFtZVtrZXldXG4gICAgICAgICAgICAgICAgPyB7W3Byb3BUb1JlbmFtZVtrZXldXTogdmlzQ29uZmlnW2tleV19XG4gICAgICAgICAgICAgICAgOiB7W2tleV06IHZpc0NvbmZpZ1trZXldfSlcbiAgICAgICAgICAgIH0pLFxuICAgICAgICAgICAge31cbiAgICAgICAgICApXG4gICAgICAgIH1cbiAgICAgIH07XG4gICAgfVxuXG4gICAgcmV0dXJuIHtcbiAgICAgIGNvbmZpZzoge1xuICAgICAgICAuLi4oYWNjdW11bGF0b3IuY29uZmlnIHx8IHt9KSxcbiAgICAgICAgdmlzQ29uZmlnXG4gICAgICB9XG4gICAgfTtcbiAgfVxufVxuXG5jbGFzcyBMYXllckNvbmZpZ1NjaGVtYURlbGV0ZVYwIGV4dGVuZHMgU2NoZW1hIHtcbiAgdmVyc2lvbiA9IFZFUlNJT05TLnYwO1xuICBsb2FkKHZhbHVlKSB7XG4gICAgcmV0dXJuIHt9O1xuICB9XG59XG5cbi8qKlxuICogVjAgLT4gVjEgQ2hhbmdlc1xuICogLSBsYXllciBpcyBub3cgYSBjbGFzc1xuICogLSBjb25maWcgc2F2ZWQgaW4gYSBjb25maWcgb2JqZWN0XG4gKiAtIGlkLCB0eXBlLCBpc0FnZ3JlZ2F0ZWQgaXMgb3V0c2lkZSBsYXllci5jb25maWdcbiAqIC0gdmlzdWFsQ2hhbm5lbHMgaXMgb3V0c2lkZSBjb25maWcsIGl0IGRlZmluZXMgYXZhaWxhYmxlIHZpc3VhbCBjaGFubmVsIGFuZFxuICogICBwcm9wZXJ0eSBuYW1lcyBmb3IgZmllbGQsIHNjYWxlLCBkb21haW4gYW5kIHJhbmdlIG9mIGVhY2ggdmlzdWFsIGNoYW5lbC5cbiAqIC0gZW5hYmxlM2QsIGNvbG9yQWdncmVnYXRpb24gYW5kIHNpemVBZ2dyZWdhdGlvbiBhcmUgbW92ZWQgaW50byB2aXNDb25maWdcbiAqIC0gR2VvanNvbkxheWVyIC0gYWRkZWQgaGVpZ2h0LCByYWRpdXMgc3BlY2lmaWMgcHJvcGVydGllc1xuICovXG5cbmV4cG9ydCBjb25zdCBsYXllclByb3BzVjAgPSB7XG4gIGlkOiBudWxsLFxuICB0eXBlOiBudWxsLFxuXG4gIC8vIG1vdmUgaW50byBsYXllci5jb25maWdcbiAgZGF0YUlkOiBuZXcgTGF5ZXJDb25maWdTY2hlbWFWMCh7a2V5OiAnZGF0YUlkJ30pLFxuICBsYWJlbDogbmV3IExheWVyQ29uZmlnU2NoZW1hVjAoe2tleTogJ2xhYmVsJ30pLFxuICBjb2xvcjogbmV3IExheWVyQ29uZmlnU2NoZW1hVjAoe2tleTogJ2NvbG9yJ30pLFxuICBpc1Zpc2libGU6IG5ldyBMYXllckNvbmZpZ1NjaGVtYVYwKHtrZXk6ICdpc1Zpc2libGUnfSksXG5cbiAgLy8gY29udmVydCB2aXNDb25maWdcbiAgdmlzQ29uZmlnOiBuZXcgTGF5ZXJWaXNDb25maWdTY2hlbWFWMCh7a2V5OiAndmlzQ29uZmlnJ30pLFxuXG4gIC8vIG1vdmUgaW50byBsYXllci5jb25maWdcbiAgLy8gZmxhdHRlblxuICBjb2x1bW5zOiBuZXcgTGF5ZXJDb2x1bW5zU2NoZW1hVjAoKSxcblxuICAvLyBzYXZlIGludG8gdmlzdWFsQ2hhbm5lbHNcbiAgY29sb3JGaWVsZDogbmV3IERpbWVuc2lvbkZpZWxkU2NoZW1hVjAoe1xuICAgIHByb3BlcnRpZXM6IGRpbWVuc2lvblByb3BzVjAsXG4gICAga2V5OiAnY29sb3JGaWVsZCdcbiAgfSksXG4gIGNvbG9yU2NhbGU6IG5ldyBEaW1lbnNpb25TY2FsZVNjaGVtYVYwKHtcbiAgICBrZXk6ICdjb2xvclNjYWxlJ1xuICB9KSxcbiAgc2l6ZUZpZWxkOiBuZXcgRGltZW5zaW9uRmllbGRTY2hlbWFWMCh7XG4gICAgcHJvcGVydGllczogZGltZW5zaW9uUHJvcHNWMCxcbiAgICBrZXk6ICdzaXplRmllbGQnXG4gIH0pLFxuICBzaXplU2NhbGU6IG5ldyBEaW1lbnNpb25TY2FsZVNjaGVtYVYwKHtcbiAgICBrZXk6ICdzaXplU2NhbGUnXG4gIH0pLFxuXG4gIC8vIG1vdmUgaW50byBjb25maWcudmlzQ29uZmlnXG4gIGVuYWJsZTNkOiBuZXcgTGF5ZXJDb25maWdUb1Zpc0NvbmZpZ1NjaGVtYVYwKHtrZXk6ICdlbmFibGUzZCd9KSxcbiAgY29sb3JBZ2dyZWdhdGlvbjogbmV3IExheWVyQ29uZmlnVG9WaXNDb25maWdTY2hlbWFWMCh7XG4gICAga2V5OiAnY29sb3JBZ2dyZWdhdGlvbidcbiAgfSksXG4gIHNpemVBZ2dyZWdhdGlvbjogbmV3IExheWVyQ29uZmlnVG9WaXNDb25maWdTY2hlbWFWMCh7a2V5OiAnc2l6ZUFnZ3JlZ2F0aW9uJ30pLFxuXG4gIC8vIGRlbGV0ZVxuICBpc0FnZ3JlZ2F0ZWQ6IG5ldyBMYXllckNvbmZpZ1NjaGVtYURlbGV0ZVYwKClcbn07XG5cbi8qKlxuICogVjEgU2NoZW1hXG4gKi9cbmNsYXNzIENvbHVtblNjaGVtYVYxIGV4dGVuZHMgU2NoZW1hIHtcbiAgc2F2ZShjb2x1bW5zLCBzdGF0ZSkge1xuICAgIC8vIHN0YXJ0aW5nIGZyb20gdjEsIG9ubHkgc2F2ZSBjb2x1bW4gdmFsdWVcbiAgICAvLyBmaWVsZElkeCB3aWxsIGJlIGNhbGN1bGF0ZWQgZHVyaW5nIG1lcmdlXG4gICAgcmV0dXJuIHtcbiAgICAgIFt0aGlzLmtleV06IE9iamVjdC5rZXlzKGNvbHVtbnMpLnJlZHVjZShcbiAgICAgICAgKGFjY3UsIGNrZXkpID0+ICh7XG4gICAgICAgICAgLi4uYWNjdSxcbiAgICAgICAgICBbY2tleV06IGNvbHVtbnNbY2tleV0udmFsdWVcbiAgICAgICAgfSksXG4gICAgICAgIHt9XG4gICAgICApXG4gICAgfTtcbiAgfVxuXG4gIGxvYWQoY29sdW1ucykge1xuICAgIHJldHVybiB7Y29sdW1uc307XG4gIH1cbn1cblxuY2xhc3MgVGV4dExhYmVsU2NoZW1hVjEgZXh0ZW5kcyBTY2hlbWEge1xuICBzYXZlKHRleHRMYWJlbCkge1xuICAgIHJldHVybiB7XG4gICAgICBbdGhpcy5rZXldOiB7XG4gICAgICAgIC4uLnRleHRMYWJlbCxcbiAgICAgICAgZmllbGQ6IHRleHRMYWJlbC5maWVsZCA/IHBpY2sodGV4dExhYmVsLmZpZWxkLCBbJ25hbWUnLCAndHlwZSddKSA6IG51bGxcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBsb2FkKHRleHRMYWJlbCkge1xuICAgIHJldHVybiB7dGV4dExhYmVsfTtcbiAgfVxufVxuXG4vKipcbiAqIFYxOiBzYXZlIFtmaWVsZF06IHtuYW1lLCB0eXBlfSwgW3NjYWxlXTogJycgZm9yIGVhY2ggY2hhbm5lbFxuICovXG5jbGFzcyBWaXN1YWxDaGFubmVsU2NoZW1hVjEgZXh0ZW5kcyBTY2hlbWEge1xuICBzYXZlKHZpc3VhbENoYW5uZWxzLCBsYXllcikge1xuICAgIC8vIG9ubHkgc2F2ZSBmaWVsZCBhbmQgc2NhbGUgb2YgZWFjaCBjaGFubmVsXG4gICAgcmV0dXJuIHtcbiAgICAgIFt0aGlzLmtleV06IE9iamVjdC5rZXlzKHZpc3VhbENoYW5uZWxzKS5yZWR1Y2UoXG4gICAgICAgIC8vICBzYXZlIGNoYW5uZWwgdG8gbnVsbCBpZiBkaWRuJ3Qgc2VsZWN0IGFueSBmaWVsZFxuICAgICAgICAoYWNjdSwga2V5KSA9PiAoe1xuICAgICAgICAgIC4uLmFjY3UsXG4gICAgICAgICAgW3Zpc3VhbENoYW5uZWxzW2tleV0uZmllbGRdOiBsYXllci5jb25maWdbdmlzdWFsQ2hhbm5lbHNba2V5XS5maWVsZF1cbiAgICAgICAgICAgID8gcGljayhsYXllci5jb25maWdbdmlzdWFsQ2hhbm5lbHNba2V5XS5maWVsZF0sIFsnbmFtZScsICd0eXBlJ10pXG4gICAgICAgICAgICA6IG51bGwsXG4gICAgICAgICAgW3Zpc3VhbENoYW5uZWxzW2tleV0uc2NhbGVdOiBsYXllci5jb25maWdbdmlzdWFsQ2hhbm5lbHNba2V5XS5zY2FsZV1cbiAgICAgICAgfSksXG4gICAgICAgIHt9XG4gICAgICApXG4gICAgfTtcbiAgfVxuICBsb2FkKHZjLCBsYXllciwgYWNjdW11bGF0b3IpIHtcbiAgICAvLyBmb2xkIGNoYW5uZWxzIGludG8gY29uZmlnXG4gICAgcmV0dXJuIHtcbiAgICAgIC4uLmFjY3VtdWxhdG9yLFxuICAgICAgY29uZmlnOiB7XG4gICAgICAgIC4uLihhY2N1bXVsYXRvci5jb25maWcgfHwge30pLFxuICAgICAgICAuLi52Y1xuICAgICAgfVxuICAgIH07XG4gIH1cbn1cblxuZXhwb3J0IGNvbnN0IGxheWVyUHJvcHNWMSA9IHtcbiAgaWQ6IG51bGwsXG4gIHR5cGU6IG51bGwsXG4gIGNvbmZpZzogbmV3IFNjaGVtYSh7XG4gICAgdmVyc2lvbjogVkVSU0lPTlMudjEsXG4gICAga2V5OiAnY29uZmlnJyxcbiAgICBwcm9wZXJ0aWVzOiB7XG4gICAgICBkYXRhSWQ6IG51bGwsXG4gICAgICBsYWJlbDogbnVsbCxcbiAgICAgIGNvbG9yOiBudWxsLFxuICAgICAgY29sdW1uczogbmV3IENvbHVtblNjaGVtYVYxKHtcbiAgICAgICAgdmVyc2lvbjogVkVSU0lPTlMudjEsXG4gICAgICAgIGtleTogJ2NvbHVtbnMnXG4gICAgICB9KSxcbiAgICAgIGlzVmlzaWJsZTogbnVsbCxcbiAgICAgIHZpc0NvbmZpZzogbnVsbCxcbiAgICAgIHRleHRMYWJlbDogbmV3IFRleHRMYWJlbFNjaGVtYVYxKHtcbiAgICAgICAgdmVyc2lvbjogVkVSU0lPTlMudjEsXG4gICAgICAgIGtleTogJ3RleHRMYWJlbCdcbiAgICAgIH0pXG4gICAgfVxuICB9KSxcbiAgdmlzdWFsQ2hhbm5lbHM6IG5ldyBWaXN1YWxDaGFubmVsU2NoZW1hVjEoe1xuICAgIHZlcnNpb246IFZFUlNJT05TLnYxLFxuICAgIGtleTogJ3Zpc3VhbENoYW5uZWxzJ1xuICB9KVxufTtcblxuY2xhc3MgTGF5ZXJTY2hlbWFWMCBleHRlbmRzIFNjaGVtYSB7XG4gIGtleSA9ICdsYXllcnMnO1xuXG4gIHNhdmUobGF5ZXJzLCB2aXNTdGF0ZSkge1xuICAgIHJldHVybiB7XG4gICAgICBbdGhpcy5rZXldOiB2aXNTdGF0ZS5sYXllck9yZGVyLnJlZHVjZSgoc2F2ZWQsIGluZGV4KSA9PiB7XG4gICAgICAgIC8vIHNhdmUgbGF5ZXJzIGFjY29yZGluZyB0byB0aGVpciByZW5kZXJpbmcgb3JkZXJcbiAgICAgICAgY29uc3QgbGF5ZXIgPSBsYXllcnNbaW5kZXhdO1xuICAgICAgICBpZiAobGF5ZXIuaXNWYWxpZFRvU2F2ZSgpKSB7XG4gICAgICAgICAgc2F2ZWQucHVzaCh0aGlzLnNhdmVQcm9wZXJ0aWVzT3JBcHBseVNjaGVtYShsYXllcikubGF5ZXJzKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gc2F2ZWQ7XG4gICAgICB9LCBbXSlcbiAgICB9O1xuICB9XG5cbiAgbG9hZChsYXllcnMsIHZpc1N0YXRlKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIFt0aGlzLmtleV06IGxheWVycy5tYXAoXG4gICAgICAgIGxheWVyID0+IHRoaXMubG9hZFByb3BlcnRpZXNPckFwcGx5U2NoZW1hKGxheWVyLCBsYXllcnMpLmxheWVyc1xuICAgICAgKVxuICAgIH07XG4gIH1cbn1cblxuY2xhc3MgRmlsdGVyU2NoZW1hVjAgZXh0ZW5kcyBTY2hlbWEge1xuICBrZXkgPSAnZmlsdGVycyc7XG4gIHNhdmUoZmlsdGVycykge1xuICAgIHJldHVybiB7XG4gICAgICBmaWx0ZXJzOiBmaWx0ZXJzXG4gICAgICAgIC5maWx0ZXIoaXNWYWxpZEZpbHRlclZhbHVlKVxuICAgICAgICAubWFwKFxuICAgICAgICAgIGZpbHRlciA9PlxuICAgICAgICAgICAgdGhpcy5zYXZlUHJvcGVydGllc09yQXBwbHlTY2hlbWEoZmlsdGVyLCB0aGlzLnByb3BlcnRpZXMpLmZpbHRlcnNcbiAgICAgICAgKVxuICAgIH07XG4gIH1cbiAgbG9hZChmaWx0ZXJzKSB7XG4gICAgcmV0dXJuIHtmaWx0ZXJzfTtcbiAgfVxufVxuXG5jb25zdCBpbnRlcmFjdGlvblByb3BzVjAgPSBbJ3Rvb2x0aXAnLCAnYnJ1c2gnXTtcblxuY2xhc3MgSW50ZXJhY3Rpb25TY2hlbWFWMCBleHRlbmRzIFNjaGVtYSB7XG4gIGtleSA9ICdpbnRlcmFjdGlvbkNvbmZpZyc7XG5cbiAgc2F2ZShpbnRlcmFjdGlvbkNvbmZpZykge1xuICAgIHJldHVybiB7XG4gICAgICBbdGhpcy5rZXldOiB0aGlzLnByb3BlcnRpZXMucmVkdWNlKFxuICAgICAgICAoYWNjdSwga2V5KSA9PiAoe1xuICAgICAgICAgIC4uLmFjY3UsXG4gICAgICAgICAgLi4uKGludGVyYWN0aW9uQ29uZmlnW2tleV0uZW5hYmxlZFxuICAgICAgICAgICAgPyB7W2tleV06IGludGVyYWN0aW9uQ29uZmlnW2tleV0uY29uZmlnfVxuICAgICAgICAgICAgOiB7fSlcbiAgICAgICAgfSksXG4gICAgICAgIHt9XG4gICAgICApXG4gICAgfTtcbiAgfVxuICBsb2FkKGludGVyYWN0aW9uQ29uZmlnKSB7XG4gICAgLy8gY29udmVydCB2MCAtPiB2MVxuICAgIC8vIHJldHVybiBlbmFibGVkOiBmYWxzZSBpZiBkaXNhYmxlZCxcbiAgICByZXR1cm4ge1xuICAgICAgW3RoaXMua2V5XTogdGhpcy5wcm9wZXJ0aWVzLnJlZHVjZShcbiAgICAgICAgKGFjY3UsIGtleSkgPT4gKHtcbiAgICAgICAgICAuLi5hY2N1LFxuICAgICAgICAgIC4uLntcbiAgICAgICAgICAgIFtrZXldOiB7XG4gICAgICAgICAgICAgIC4uLihpbnRlcmFjdGlvbkNvbmZpZ1trZXldIHx8IHt9KSxcbiAgICAgICAgICAgICAgZW5hYmxlZDogQm9vbGVhbihpbnRlcmFjdGlvbkNvbmZpZ1trZXldKVxuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgfSksXG4gICAgICAgIHt9XG4gICAgICApXG4gICAgfTtcbiAgfVxufVxuXG5jbGFzcyBJbnRlcmFjdGlvblNjaGVtYVYxIGV4dGVuZHMgU2NoZW1hIHtcbiAga2V5ID0gJ2ludGVyYWN0aW9uQ29uZmlnJztcblxuICBzYXZlKGludGVyYWN0aW9uQ29uZmlnKSB7XG4gICAgLy8gc2F2ZSBjb25maWcgZXZlbiBpZiBkaXNhYmxlZCxcbiAgICByZXR1cm4ge1xuICAgICAgW3RoaXMua2V5XTogdGhpcy5wcm9wZXJ0aWVzLnJlZHVjZShcbiAgICAgICAgKGFjY3UsIGtleSkgPT4gKHtcbiAgICAgICAgICAuLi5hY2N1LFxuICAgICAgICAgIFtrZXldOiB7XG4gICAgICAgICAgICAuLi5pbnRlcmFjdGlvbkNvbmZpZ1trZXldLmNvbmZpZyxcbiAgICAgICAgICAgIGVuYWJsZWQ6IGludGVyYWN0aW9uQ29uZmlnW2tleV0uZW5hYmxlZFxuICAgICAgICAgIH1cbiAgICAgICAgfSksXG4gICAgICAgIHt9XG4gICAgICApXG4gICAgfTtcbiAgfVxuICBsb2FkKGludGVyYWN0aW9uQ29uZmlnKSB7XG4gICAgcmV0dXJuIHtbdGhpcy5rZXldOiBpbnRlcmFjdGlvbkNvbmZpZ307XG4gIH1cbn1cblxuZXhwb3J0IGNvbnN0IGZpbHRlclByb3BzVjAgPSB7XG4gIGRhdGFJZDogbnVsbCxcbiAgaWQ6IG51bGwsXG4gIG5hbWU6IG51bGwsXG4gIHR5cGU6IG51bGwsXG4gIHZhbHVlOiBudWxsLFxuICBlbmxhcmdlZDogbnVsbFxufTtcblxuZXhwb3J0IGNsYXNzIERpbWVuc2lvbkZpZWxkU2NoZW1hIGV4dGVuZHMgU2NoZW1hIHtcbiAgc2F2ZShmaWVsZCkge1xuICAgIHJldHVybiB7XG4gICAgICBbdGhpcy5rZXldOiBmaWVsZFxuICAgICAgICA/IHRoaXMuc2F2ZVByb3BlcnRpZXNPckFwcGx5U2NoZW1hKGZpZWxkKVt0aGlzLmtleV1cbiAgICAgICAgOiBudWxsXG4gICAgfTtcbiAgfVxuXG4gIGxvYWQoZmllbGQpIHtcbiAgICByZXR1cm4ge1t0aGlzLmtleV06IGZpZWxkfTtcbiAgfVxufVxuXG5leHBvcnQgY29uc3QgZmlsdGVyUHJvcHNWMSA9IHtcbiAgLi4uZmlsdGVyUHJvcHNWMCxcbiAgcGxvdFR5cGU6IG51bGwsXG4gIHlBeGlzOiBuZXcgRGltZW5zaW9uRmllbGRTY2hlbWEoe1xuICAgIHZlcnNpb246IFZFUlNJT05TLnYxLFxuICAgIGtleTogJ3lBeGlzJyxcbiAgICBwcm9wZXJ0aWVzOiB7XG4gICAgICBuYW1lOiBudWxsLFxuICAgICAgdHlwZTogbnVsbFxuICAgIH1cbiAgfSlcbn07XG5cbmV4cG9ydCBjb25zdCBwcm9wZXJ0aWVzVjAgPSB7XG4gIGZpbHRlcnM6IG5ldyBGaWx0ZXJTY2hlbWFWMCh7XG4gICAgdmVyc2lvbjogVkVSU0lPTlMudjAsXG4gICAgcHJvcGVydGllczogZmlsdGVyUHJvcHNWMFxuICB9KSxcbiAgbGF5ZXJzOiBuZXcgTGF5ZXJTY2hlbWFWMCh7XG4gICAgdmVyc2lvbjogVkVSU0lPTlMudjAsXG4gICAgcHJvcGVydGllczogbGF5ZXJQcm9wc1YwXG4gIH0pLFxuICBpbnRlcmFjdGlvbkNvbmZpZzogbmV3IEludGVyYWN0aW9uU2NoZW1hVjAoe1xuICAgIHZlcnNpb246IFZFUlNJT05TLnYwLFxuICAgIHByb3BlcnRpZXM6IGludGVyYWN0aW9uUHJvcHNWMFxuICB9KSxcbiAgbGF5ZXJCbGVuZGluZzogbnVsbFxufTtcblxuZXhwb3J0IGNvbnN0IHByb3BlcnRpZXNWMSA9IHtcbiAgZmlsdGVyczogbmV3IEZpbHRlclNjaGVtYVYwKHtcbiAgICB2ZXJzaW9uOiBWRVJTSU9OUy52MSxcbiAgICBwcm9wZXJ0aWVzOiBmaWx0ZXJQcm9wc1YxXG4gIH0pLFxuICBsYXllcnM6IG5ldyBMYXllclNjaGVtYVYwKHtcbiAgICB2ZXJzaW9uOiBWRVJTSU9OUy52MSxcbiAgICBwcm9wZXJ0aWVzOiBsYXllclByb3BzVjFcbiAgfSksXG4gIGludGVyYWN0aW9uQ29uZmlnOiBuZXcgSW50ZXJhY3Rpb25TY2hlbWFWMSh7XG4gICAgdmVyc2lvbjogVkVSU0lPTlMudjEsXG4gICAgcHJvcGVydGllczogaW50ZXJhY3Rpb25Qcm9wc1YwXG4gIH0pLFxuICBsYXllckJsZW5kaW5nOiBudWxsLFxuICBzcGxpdE1hcHM6IG51bGxcbn07XG5cbmV4cG9ydCBjb25zdCB2aXNTdGF0ZVNjaGVtYVYwID0gbmV3IFNjaGVtYSh7XG4gIHZlcnNpb246IFZFUlNJT05TLnYwLFxuICBwcm9wZXJ0aWVzOiBwcm9wZXJ0aWVzVjAsXG4gIGtleTogJ3Zpc1N0YXRlJ1xufSk7XG5cbmV4cG9ydCBjb25zdCB2aXNTdGF0ZVNjaGVtYVYxID0gbmV3IFNjaGVtYSh7XG4gIHZlcnNpb246IFZFUlNJT05TLnYxLFxuICBwcm9wZXJ0aWVzOiBwcm9wZXJ0aWVzVjEsXG4gIGtleTogJ3Zpc1N0YXRlJ1xufSk7XG5cbmV4cG9ydCBjb25zdCB2aXNTdGF0ZVNjaGVtYSA9IHtcbiAgW1ZFUlNJT05TLnYwXToge1xuICAgIHNhdmU6IHRvU2F2ZSA9PiB2aXNTdGF0ZVNjaGVtYVYwLnNhdmUodG9TYXZlKSxcbiAgICBsb2FkOiB0b0xvYWQgPT5cbiAgICAgIHZpc1N0YXRlU2NoZW1hVjEubG9hZCh2aXNTdGF0ZVNjaGVtYVYwLmxvYWQodG9Mb2FkKS52aXNTdGF0ZSlcbiAgfSxcbiAgW1ZFUlNJT05TLnYxXTogdmlzU3RhdGVTY2hlbWFWMVxufTtcblxuLy8gdGVzdCBsb2FkIHYwXG5leHBvcnQgZGVmYXVsdCB2aXNTdGF0ZVNjaGVtYTtcbiJdfQ==