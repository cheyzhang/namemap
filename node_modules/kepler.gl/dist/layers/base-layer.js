'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.OVERLAY_TYPE = undefined;

var _toConsumableArray2 = require('babel-runtime/helpers/toConsumableArray');

var _toConsumableArray3 = _interopRequireDefault(_toConsumableArray2);

var _defineProperty2 = require('babel-runtime/helpers/defineProperty');

var _defineProperty3 = _interopRequireDefault(_defineProperty2);

var _extends6 = require('babel-runtime/helpers/extends');

var _extends7 = _interopRequireDefault(_extends6);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _colorUtils = require('../utils/color-utils');

var _window = require('global/window');

var _keymirror = require('keymirror');

var _keymirror2 = _interopRequireDefault(_keymirror);

var _defaultLayerIcon = require('./default-layer-icon');

var _defaultLayerIcon2 = _interopRequireDefault(_defaultLayerIcon);

var _defaultSettings = require('../constants/default-settings');

var _customColorRanges = require('../constants/custom-color-ranges');

var _layerFactory = require('./layer-factory');

var _utils = require('../utils/utils');

var _dataUtils = require('../utils/data-utils');

var _dataScaleUtils = require('../utils/data-scale-utils');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _marked = /*#__PURE__*/_regenerator2.default.mark(generateColor); // Copyright (c) 2018 Uber Technologies, Inc.
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

/**
 * Approx. number of points to sample in a large data set
 * @type {number}
 */
var MAX_SAMPLE_SIZE = 5000;

var OVERLAY_TYPE = exports.OVERLAY_TYPE = (0, _keymirror2.default)({
  deckgl: null,
  mapboxgl: null
});

var layerColors = Object.values(_customColorRanges.DataVizColors).map(_colorUtils.hexToRgb);
function generateColor() {
  var index;
  return _regenerator2.default.wrap(function generateColor$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          index = 0;

        case 1:
          if (!(index < layerColors.length + 1)) {
            _context.next = 7;
            break;
          }

          if (index === layerColors.length) {
            index = 0;
          }
          _context.next = 5;
          return layerColors[index++];

        case 5:
          _context.next = 1;
          break;

        case 7:
        case 'end':
          return _context.stop();
      }
    }
  }, _marked, this);
}

var colorMaker = generateColor();
var defaultGetFieldValue = function defaultGetFieldValue(field, d) {
  return d[field.tableFieldIndex - 1];
};

var Layer = function () {
  function Layer() {
    var props = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    (0, _classCallCheck3.default)(this, Layer);

    this.id = props.id || (0, _utils.generateHashId)(6);

    // meta
    this.meta = {};

    // visConfigSettings
    this.visConfigSettings = {};

    this.config = this.getDefaultLayerConfig((0, _extends7.default)({
      columns: this.getLayerColumns()
    }, props));
  }

  (0, _createClass3.default)(Layer, [{
    key: 'getDefaultLayerConfig',
    value: function getDefaultLayerConfig() {
      var props = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

      return {
        dataId: props.dataId || null,
        label: props.label || 'new layer',
        color: props.color || colorMaker.next().value,
        columns: props.columns || null,
        isVisible: props.isVisible || false,
        isConfigActive: props.isConfigActive || false,
        highlightColor: props.highlightColor || [252, 242, 26, 255],

        // TODO: refactor this into separate visual Channel config
        // color by field, domain is set by filters, field, scale type
        colorField: null,
        colorDomain: [0, 1],
        colorScale: 'quantile',

        // color by size, domain is set by filters, field, scale type
        sizeDomain: [0, 1],
        sizeScale: 'linear',
        sizeField: null,

        visConfig: {},

        textLabel: {
          field: null,
          color: [255, 255, 255],
          size: 50,
          offset: [0, 0],
          anchor: 'middle'
        }
      };
    }

    /**
     * Get the description of a visualChannel config
     * @param key
     * @returns {{label: string, measure: (string|string)}}
     */

  }, {
    key: 'getVisualChannelDescription',
    value: function getVisualChannelDescription(key) {
      // e.g. label: Color, measure: Vehicle Type
      return {
        label: this.visConfigSettings[this.visualChannels[key].range].label,
        measure: this.config[this.visualChannels[key].field] ? this.config[this.visualChannels[key].field].name : this.visualChannels[key].defaultMeasure
      };
    }

    /**
     * Assign a field to layer column, return column config
     * @param key - Column Key
     * @param field - Selected field
     * @returns {{}} - Column config
     */

  }, {
    key: 'assignColumn',
    value: function assignColumn(key, field) {
      // field value could be null for optional columns
      var update = field ? {
        value: field.name,
        fieldIdx: field.tableFieldIndex - 1
      } : { value: null, fieldIdx: -1 };

      return (0, _extends7.default)({}, this.config.columns, (0, _defineProperty3.default)({}, key, (0, _extends7.default)({}, this.config.columns[key], update)));
    }

    /**
     * Assign a field pair to column config, return column config
     * @param key - Column Key
     * @param pair - field Pair
     * @returns {{}} - Column config
     */

  }, {
    key: 'assignColumnPairs',
    value: function assignColumnPairs(key, pair) {
      var _extends3;

      if (!this.columnPairs || !this.columnPairs[key]) {
        // should not end in this state
        return this.config.columns;
      }

      var _columnPairs$key = this.columnPairs[key],
          partnerKey = _columnPairs$key.pair,
          fieldPairKey = _columnPairs$key.fieldPairKey;
      var partnerFieldPairKey = this.columnPairs[partnerKey].fieldPairKey;


      return (0, _extends7.default)({}, this.config.columns, (_extends3 = {}, (0, _defineProperty3.default)(_extends3, key, pair[fieldPairKey]), (0, _defineProperty3.default)(_extends3, partnerKey, pair[partnerFieldPairKey]), _extends3));
    }

    /**
      * Calculate a radius zoom multiplier to render points, so they are visible in all zoom level
      * @param mapState
      * @param mapState.zoom - actual zoom
      * @param mapState.zoomOffset - zoomOffset when render in the plot container for export image
      * @returns {number}
      */

  }, {
    key: 'getZoomFactor',
    value: function getZoomFactor(_ref) {
      var zoom = _ref.zoom,
          _ref$zoomOffset = _ref.zoomOffset,
          zoomOffset = _ref$zoomOffset === undefined ? 0 : _ref$zoomOffset;

      return Math.pow(2, Math.max(14 - zoom + zoomOffset, 0));
    }

    /**
      * Calculate a elevation zoom multiplier to render points, so they are visible in all zoom level
      * @param mapState
      * @param mapState.zoom - actual zoom
      * @param mapState.zoomOffset - zoomOffset when render in the plot container for export image
      * @returns {number}
      */

  }, {
    key: 'getElevationZoomFactor',
    value: function getElevationZoomFactor(_ref2) {
      var zoom = _ref2.zoom,
          _ref2$zoomOffset = _ref2.zoomOffset,
          zoomOffset = _ref2$zoomOffset === undefined ? 0 : _ref2$zoomOffset;

      return Math.pow(2, Math.max(8 - zoom + zoomOffset, 0));
    }
  }, {
    key: 'formatLayerData',
    value: function formatLayerData(data, allData, filteredIndex) {
      return {};
    }
  }, {
    key: 'renderLayer',
    value: function renderLayer() {
      return [];
    }
  }, {
    key: 'getHoverData',
    value: function getHoverData(object) {
      if (!object) {
        return null;
      }
      // by default, each entry of layerData should have a data property points
      // to the original item in the allData array
      // each layer can implement its own getHoverData method
      return object.data;
    }

    /**
     * When change layer type, try to copy over layer configs as much as possible
     * @param configToCopy - config to copy over
     * @param visConfigSettings - visConfig settings of config to copy
     */

  }, {
    key: 'assignConfigToLayer',
    value: function assignConfigToLayer(configToCopy, visConfigSettings) {
      var _this = this;

      // don't deep merge visualChannel field
      var notToDeepMerge = Object.values(this.visualChannels).map(function (v) {
        return v.field;
      });

      // don't deep merge color range, reversed: is not a key by default
      notToDeepMerge.push('colorRange');

      // don't copy over domain
      var notToCopy = Object.values(this.visualChannels).map(function (v) {
        return v.domain;
      });

      // if range is for the same property group copy it, otherwise, not to copy
      Object.values(this.visualChannels).forEach(function (v) {
        if (configToCopy.visConfig[v.range] && visConfigSettings[v.range].group !== _this.visConfigSettings[v.range].group) {
          notToCopy.push(v.range);
        }
      });

      // don't copy over visualChannel range
      var currentConfig = this.config;
      var copied = this.copyLayerConfig(currentConfig, configToCopy, { notToDeepMerge: notToDeepMerge, notToCopy: notToCopy });

      this.updateLayerConfig(copied);
      // validate visualChannel field type and scale types
      Object.keys(this.visualChannels).forEach(function (channel) {
        _this.validateVisualChannel(channel);
      });
    }

    /*
     * Recursively copy config over to an empty layer
     * when received saved config, or copy config over from a different layer type
     * make sure to only copy over value to existing keys
     * @param {object} currentConfig - existing config to be override
     * @param {object} configToCopy - new Config to copy over
     * @param {string[]} notToDeepMerge - array of properties to not to be deep copied
     * @param {string[]} notToCopy - array of properties not to copy
     * @returns {object} - copied config
     */

  }, {
    key: 'copyLayerConfig',
    value: function copyLayerConfig(currentConfig, configToCopy) {
      var _this2 = this;

      var _ref3 = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {},
          _ref3$notToDeepMerge = _ref3.notToDeepMerge,
          notToDeepMerge = _ref3$notToDeepMerge === undefined ? [] : _ref3$notToDeepMerge,
          _ref3$notToCopy = _ref3.notToCopy,
          notToCopy = _ref3$notToCopy === undefined ? [] : _ref3$notToCopy;

      var copied = {};
      Object.keys(currentConfig).forEach(function (key) {
        if ((0, _utils.isPlainObject)(currentConfig[key]) && (0, _utils.isPlainObject)(configToCopy[key]) && !notToDeepMerge.includes(key) && !notToCopy.includes(key)) {
          // recursively assign object value
          copied[key] = _this2.copyLayerConfig(currentConfig[key], configToCopy[key], { notToDeepMerge: notToDeepMerge, notToCopy: notToCopy });
        } else if ((0, _utils.notNullorUndefined)(configToCopy[key]) && !notToCopy.includes(key)) {
          // copy
          copied[key] = configToCopy[key];
        } else {
          // keep existing
          copied[key] = currentConfig[key];
        }
      });

      return copied;
    }
  }, {
    key: 'registerVisConfig',
    value: function registerVisConfig(layerVisConfigs) {
      var _this3 = this;

      Object.keys(layerVisConfigs).forEach(function (item) {
        if (typeof item === 'string' && _layerFactory.LAYER_VIS_CONFIGS[layerVisConfigs[item]]) {
          // if assigned one of default LAYER_CONFIGS
          _this3.config.visConfig[item] = _layerFactory.LAYER_VIS_CONFIGS[layerVisConfigs[item]].defaultValue;
          _this3.visConfigSettings[item] = _layerFactory.LAYER_VIS_CONFIGS[layerVisConfigs[item]];
        } else if (['type', 'defaultValue'].every(function (p) {
          return layerVisConfigs[item][p];
        })) {
          // if provided customized visConfig, and has type && defaultValue
          // TODO: further check if customized visConfig is valid
          _this3.config.visConfig[item] = layerVisConfigs[item].defaultValue;
          _this3.visConfigSettings[item] = layerVisConfigs[item];
        }
      });
    }
  }, {
    key: 'getLayerColumns',
    value: function getLayerColumns() {
      var required = this.requiredLayerColumns.reduce(function (accu, key) {
        return (0, _extends7.default)({}, accu, (0, _defineProperty3.default)({}, key, { value: null, fieldIdx: -1 }));
      }, {});
      var optional = this.optionalColumns.reduce(function (accu, key) {
        return (0, _extends7.default)({}, accu, (0, _defineProperty3.default)({}, key, { value: null, fieldIdx: -1, optional: true }));
      }, {});

      return (0, _extends7.default)({}, required, optional);
    }
  }, {
    key: 'updateLayerConfig',
    value: function updateLayerConfig(newConfig) {
      this.config = (0, _extends7.default)({}, this.config, newConfig);
      return this;
    }
  }, {
    key: 'updateLayerVisConfig',
    value: function updateLayerVisConfig(newVisConfig) {
      this.config.visConfig = (0, _extends7.default)({}, this.config.visConfig, newVisConfig);
      return this;
    }
    /**
     * Check whether layer has all columns
     *
     * @param {object} layer
     * @returns {boolean} yes or no
     */

  }, {
    key: 'hasAllColumns',
    value: function hasAllColumns() {
      var columns = this.config.columns;

      return columns && Object.values(columns).every(function (v) {
        return Boolean(v.optional || v.value && v.fieldIdx > -1);
      });
    }

    /**
     * Check whether layer has data
     *
     * @param {object} layer
     * @param {Array | Object} layerData
     * @returns {boolean} yes or no
     */

  }, {
    key: 'hasLayerData',
    value: function hasLayerData(layerData) {
      if (!layerData) {
        return false;
      }

      return Boolean(layerData.data && layerData.data.length);
    }
  }, {
    key: 'isValidToSave',
    value: function isValidToSave() {
      return this.type && this.hasAllColumns();
    }
  }, {
    key: 'shouldRenderLayer',
    value: function shouldRenderLayer(data) {
      return this.type && this.hasAllColumns() && this.config.isVisible && this.hasLayerData(data);
    }
  }, {
    key: 'getVisChannelScale',
    value: function getVisChannelScale(scale, domain, range, fixed) {
      return _defaultSettings.SCALE_FUNC[fixed ? 'linear' : scale]().domain(domain).range(fixed ? domain : range);
    }
  }, {
    key: 'getPointsBounds',
    value: function getPointsBounds(allData, getPosition) {
      // no need to loop through the entire dataset
      // get a sample of data to calculate bounds
      var sampleData = allData.length > MAX_SAMPLE_SIZE ? (0, _dataUtils.getSampleData)(allData, MAX_SAMPLE_SIZE) : allData;
      var points = sampleData.map(getPosition);

      var latBounds = (0, _dataUtils.getLatLngBounds)(points, 1, [-90, 90]);
      var lngBounds = (0, _dataUtils.getLatLngBounds)(points, 0, [-180, 180]);

      if (!latBounds || !lngBounds) {
        return null;
      }

      return [lngBounds[0], latBounds[0], lngBounds[1], latBounds[1]];
    }
  }, {
    key: 'getLightSettingsFromBounds',
    value: function getLightSettingsFromBounds(bounds) {
      return Array.isArray(bounds) && bounds.length >= 4 ? (0, _extends7.default)({}, _defaultSettings.DEFAULT_LIGHT_SETTINGS, {
        lightsPosition: [].concat((0, _toConsumableArray3.default)(bounds.slice(0, 2)), [_defaultSettings.DEFAULT_LIGHT_SETTINGS.lightsPosition[2]], (0, _toConsumableArray3.default)(bounds.slice(2, 4)), [_defaultSettings.DEFAULT_LIGHT_SETTINGS.lightsPosition[5]])
      }) : _defaultSettings.DEFAULT_LIGHT_SETTINGS;
    }
  }, {
    key: 'getEncodedChannelValue',
    value: function getEncodedChannelValue(scale, data, field) {
      var defaultValue = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : _defaultSettings.NO_VALUE_COLOR;
      var getValue = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : defaultGetFieldValue;
      var type = field.type;

      var value = getValue(field, data);
      var attributeValue = void 0;
      if (type === _defaultSettings.ALL_FIELD_TYPES.timestamp) {
        // shouldn't need to convert here
        // scale Function should take care of it
        attributeValue = scale(new Date(value));
      } else {
        attributeValue = scale(value);
      }

      if (!attributeValue) {
        attributeValue = defaultValue;
      }

      return attributeValue;
    }
  }, {
    key: 'updateMeta',
    value: function updateMeta(meta) {
      this.meta = (0, _extends7.default)({}, this.meta, meta);
    }

    /**
     * helper function to update one layer domain when state.data changed
     * if state.data change is due ot update filter, newFiler will be passed
     * called by updateAllLayerDomainData
     * @param {Object} dataset
     * @param {Object} newFilter
     * @returns {object} layer
     */

  }, {
    key: 'updateLayerDomain',
    value: function updateLayerDomain(dataset, newFilter) {
      var _this4 = this;

      Object.values(this.visualChannels).forEach(function (channel) {
        var scale = channel.scale;

        var scaleType = _this4.config[scale];
        // ordinal domain is based on allData, if only filter changed
        // no need to update ordinal domain
        if (!newFilter || scaleType !== _defaultSettings.SCALE_TYPES.ordinal) {
          var domain = channel.domain;

          var updatedDomain = _this4.calculateLayerDomain(dataset, channel);

          _this4.updateLayerConfig((0, _defineProperty3.default)({}, domain, updatedDomain));
        }
      });

      return this;
    }

    /**
     * Validate visual channel field and scales based on supported field & scale type
     * @param channel
     */

  }, {
    key: 'validateVisualChannel',
    value: function validateVisualChannel(channel) {
      this.validateFieldType(channel);
      this.validateScale(channel);
    }

    /**
     * Validate field type based on channelScaleType
     */

  }, {
    key: 'validateFieldType',
    value: function validateFieldType(channel) {
      var visualChannel = this.visualChannels[channel];
      var field = visualChannel.field,
          channelScaleType = visualChannel.channelScaleType,
          supportedFieldTypes = visualChannel.supportedFieldTypes;


      if (this.config[field]) {
        // if field is selected, check if field type is supported
        var channelSupportedFieldTypes = supportedFieldTypes || _defaultSettings.CHANNEL_SCALE_SUPPORTED_FIELDS[channelScaleType];

        if (!channelSupportedFieldTypes.includes(this.config[field].type)) {
          // field type is not supported, set it back to null
          // set scale back to default
          this.updateLayerConfig((0, _defineProperty3.default)({}, field, null));
        }
      }
    }

    /**
     * Validate scale type based on aggregation
     */

  }, {
    key: 'validateScale',
    value: function validateScale(channel) {
      var visualChannel = this.visualChannels[channel];
      var scale = visualChannel.scale;

      if (!scale) {
        // visualChannel doesn't have scale
        return;
      }
      var scaleOptions = this.getScaleOptions(channel);
      // check if current selected scale is
      // supported, if not, change to default
      if (!scaleOptions.includes(this.config[scale])) {
        this.updateLayerConfig((0, _defineProperty3.default)({}, scale, scaleOptions[0]));
      }
    }

    /**
     * Get scale options based on current field
     * @param {string} channel
     * @returns {string[]}
     */

  }, {
    key: 'getScaleOptions',
    value: function getScaleOptions(channel) {
      var visualChannel = this.visualChannels[channel];
      var field = visualChannel.field,
          scale = visualChannel.scale,
          channelScaleType = visualChannel.channelScaleType;


      return this.config[field] ? _defaultSettings.FIELD_OPTS[this.config[field].type].scale[channelScaleType] : [this.getDefaultLayerConfig()[scale]];
    }
  }, {
    key: 'updateLayerVisualChannel',
    value: function updateLayerVisualChannel(dataset, channel) {
      var visualChannel = this.visualChannels[channel];

      this.validateVisualChannel(channel);
      // calculate layer channel domain
      var updatedDomain = this.calculateLayerDomain(dataset, visualChannel);

      this.updateLayerConfig((0, _defineProperty3.default)({}, visualChannel.domain, updatedDomain));
    }
  }, {
    key: 'calculateLayerDomain',
    value: function calculateLayerDomain(dataset, visualChannel) {
      var allData = dataset.allData,
          filteredIndexForDomain = dataset.filteredIndexForDomain;

      var defaultDomain = [0, 1];
      var scale = visualChannel.scale;

      var scaleType = this.config[scale];

      var field = this.config[visualChannel.field];
      if (!field) {
        // if colorField or sizeField were set back to null
        return defaultDomain;
      }

      if (!_defaultSettings.SCALE_TYPES[scaleType]) {
        _window.console.error('scale type ' + scaleType + ' not supported');
        return defaultDomain;
      }

      // TODO: refactor to add valueAccessor to field
      var fieldIdx = field.tableFieldIndex - 1;
      var isTime = field.type === _defaultSettings.ALL_FIELD_TYPES.timestamp;
      var valueAccessor = _dataUtils.maybeToDate.bind(null, isTime, fieldIdx, field.format);
      var indexValueAccessor = function indexValueAccessor(i) {
        return valueAccessor(allData[i]);
      };

      var sortFunction = (0, _dataUtils.getSortingFunction)(field.type);

      switch (scaleType) {
        case _defaultSettings.SCALE_TYPES.ordinal:
        case _defaultSettings.SCALE_TYPES.point:
          // do not recalculate ordinal domain based on filtered data
          // don't need to update ordinal domain every time
          return (0, _dataScaleUtils.getOrdinalDomain)(allData, valueAccessor);

        case _defaultSettings.SCALE_TYPES.quantile:
          return (0, _dataScaleUtils.getQuantileDomain)(filteredIndexForDomain, indexValueAccessor, sortFunction);

        case _defaultSettings.SCALE_TYPES.quantize:
        case _defaultSettings.SCALE_TYPES.linear:
        case _defaultSettings.SCALE_TYPES.sqrt:
        default:
          return (0, _dataScaleUtils.getLinearDomain)(filteredIndexForDomain, indexValueAccessor);
      }
    }
  }, {
    key: 'isLayerHovered',
    value: function isLayerHovered(objectInfo) {
      return objectInfo && objectInfo.layer && objectInfo.picked && objectInfo.layer.props.id === this.id;
    }
  }, {
    key: 'getRadiusScaleByZoom',
    value: function getRadiusScaleByZoom(mapState, fixedRadius) {
      var radiusChannel = Object.values(this.visualChannels).find(function (vc) {
        return vc.property === 'radius';
      });

      if (!radiusChannel) {
        return 1;
      }

      var field = radiusChannel.field;
      var fixed = fixedRadius === undefined ? this.config.visConfig.fixedRadius : fixedRadius;
      var radius = this.config.visConfig.radius;


      return fixed ? 1 : (this.config[field] ? 1 : radius) * this.getZoomFactor(mapState);
    }
  }, {
    key: 'shouldCalculateLayerData',
    value: function shouldCalculateLayerData(props) {
      var _this5 = this;

      return props.some(function (p) {
        return !_this5.noneLayerDataAffectingProps.includes(p);
      });
    }
  }, {
    key: 'layerIcon',
    get: function get() {
      return _defaultLayerIcon2.default;
    }
  }, {
    key: 'overlayType',
    get: function get() {
      return OVERLAY_TYPE.deckgl;
    }
  }, {
    key: 'type',
    get: function get() {
      return null;
    }
  }, {
    key: 'name',
    get: function get() {
      return this.type;
    }
  }, {
    key: 'isAggregated',
    get: function get() {
      return false;
    }
  }, {
    key: 'requiredLayerColumns',
    get: function get() {
      return [];
    }
  }, {
    key: 'optionalColumns',
    get: function get() {
      return [];
    }
  }, {
    key: 'noneLayerDataAffectingProps',
    get: function get() {
      return ['label', 'opacity', 'thickness', 'isVisible'];
    }
  }, {
    key: 'visualChannels',
    get: function get() {
      return {
        color: {
          property: 'color',
          field: 'colorField',
          scale: 'colorScale',
          domain: 'colorDomain',
          range: 'colorRange',
          key: 'color',
          channelScaleType: _defaultSettings.CHANNEL_SCALES.color
        },
        size: {
          property: 'size',
          field: 'sizeField',
          scale: 'sizeScale',
          domain: 'sizeDomain',
          range: 'sizeRange',
          key: 'size',
          channelScaleType: _defaultSettings.CHANNEL_SCALES.size
        }
      };
    }

    /*
     * Column pairs maps layer column to a specific field pairs,
     * By default, it is set to null
     */

  }, {
    key: 'columnPairs',
    get: function get() {
      return null;
    }

    /*
     * Default point column pairs, can be used for point based layers: point, icon etc.
     */

  }, {
    key: 'defaultPointColumnPairs',
    get: function get() {
      return {
        lat: { pair: 'lng', fieldPairKey: 'lat' },
        lng: { pair: 'lat', fieldPairKey: 'lng' }
      };
    }

    /*
     * Default link column pairs, can be used for link based layers: arc, line etc
     */

  }, {
    key: 'defaultLinkColumnPairs',
    get: function get() {
      return {
        lat0: { pair: 'lng0', fieldPairKey: 'lat' },
        lng0: { pair: 'lat0', fieldPairKey: 'lng' },
        lat1: { pair: 'lng1', fieldPairKey: 'lat' },
        lng1: { pair: 'lat1', fieldPairKey: 'lng' }
      };
    }

    /**
     * Return a React component for to render layer instructions in a modal
     * @returns {object} - an object
     * @example
     *  return {
     *    id: 'iconInfo',
     *    template: IconInfoModal,
     *    modalProps: {
     *      title: 'How to draw icons'
     *   };
     * }
     */

  }, {
    key: 'layerInfoModal',
    get: function get() {
      return null;
    }
    /*
     * Given a dataset, automatically create layers based on it
     * and return the props
     * By default, no layers will be found
     */

  }], [{
    key: 'findDefaultLayerProps',
    value: function findDefaultLayerProps(fieldPairs, dataId) {
      return null;
    }

    /**
     * Given a array of preset required column names
     * found field that has the same name to set as layer column
     *
     * @param {object[]} defaultFields
     * @param {object[]} allFields
     * @returns {object[] | null} all possible required layer column pairs
     */

  }, {
    key: 'findDefaultColumnField',
    value: function findDefaultColumnField(defaultFields, allFields) {
      // find all matched fields for each required col
      var requiredColumns = Object.keys(defaultFields).reduce(function (prev, key) {
        var requiredFields = allFields.filter(function (f) {
          return f.name === defaultFields[key] || defaultFields[key].includes(f.name);
        });

        prev[key] = requiredFields.length ? requiredFields.map(function (f) {
          return {
            value: f.name,
            fieldIdx: f.tableFieldIndex - 1
          };
        }) : null;
        return prev;
      }, {});

      if (!Object.values(requiredColumns).every(Boolean)) {
        // if any field missing, return null
        return null;
      }

      return this.getAllPossibleColumnParis(requiredColumns);
    }
  }, {
    key: 'getAllPossibleColumnParis',
    value: function getAllPossibleColumnParis(requiredColumns) {
      // for multiple matched field for one required column, return multiple
      // combinations, e. g. if column a has 2 matched, column b has 3 matched
      // 6 possible column pairs will be returned
      var allKeys = Object.keys(requiredColumns);
      var pointers = allKeys.map(function (k, i) {
        return i === allKeys.length - 1 ? -1 : 0;
      });
      var countPerKey = allKeys.map(function (k) {
        return requiredColumns[k].length;
      });
      var pairs = [];

      /* eslint-disable no-loop-func */
      while (incrementPointers(pointers, countPerKey, pointers.length - 1)) {
        var newPair = pointers.reduce(function (prev, cuur, i) {
          prev[allKeys[i]] = requiredColumns[allKeys[i]][cuur];
          return prev;
        }, {});

        pairs.push(newPair);
      }
      /* eslint-enable no-loop-func */

      // recursively increment pointers
      function incrementPointers(pts, counts, index) {
        if (index === 0 && pts[0] === counts[0] - 1) {
          // nothing to increment
          return false;
        }

        if (pts[index] + 1 < counts[index]) {
          pts[index] = pts[index] + 1;
          return true;
        }

        pts[index] = 0;
        return incrementPointers(pts, counts, index - 1);
      }

      return pairs;
    }
  }, {
    key: 'hexToRgb',
    value: function hexToRgb(c) {
      return (0, _colorUtils.hexToRgb)(c);
    }
  }]);
  return Layer;
}();

exports.default = Layer;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9sYXllcnMvYmFzZS1sYXllci5qcyJdLCJuYW1lcyI6WyJnZW5lcmF0ZUNvbG9yIiwiTUFYX1NBTVBMRV9TSVpFIiwiT1ZFUkxBWV9UWVBFIiwiZGVja2dsIiwibWFwYm94Z2wiLCJsYXllckNvbG9ycyIsIk9iamVjdCIsInZhbHVlcyIsIkRhdGFWaXpDb2xvcnMiLCJtYXAiLCJoZXhUb1JnYiIsImluZGV4IiwibGVuZ3RoIiwiY29sb3JNYWtlciIsImRlZmF1bHRHZXRGaWVsZFZhbHVlIiwiZmllbGQiLCJkIiwidGFibGVGaWVsZEluZGV4IiwiTGF5ZXIiLCJwcm9wcyIsImlkIiwibWV0YSIsInZpc0NvbmZpZ1NldHRpbmdzIiwiY29uZmlnIiwiZ2V0RGVmYXVsdExheWVyQ29uZmlnIiwiY29sdW1ucyIsImdldExheWVyQ29sdW1ucyIsImRhdGFJZCIsImxhYmVsIiwiY29sb3IiLCJuZXh0IiwidmFsdWUiLCJpc1Zpc2libGUiLCJpc0NvbmZpZ0FjdGl2ZSIsImhpZ2hsaWdodENvbG9yIiwiY29sb3JGaWVsZCIsImNvbG9yRG9tYWluIiwiY29sb3JTY2FsZSIsInNpemVEb21haW4iLCJzaXplU2NhbGUiLCJzaXplRmllbGQiLCJ2aXNDb25maWciLCJ0ZXh0TGFiZWwiLCJzaXplIiwib2Zmc2V0IiwiYW5jaG9yIiwia2V5IiwidmlzdWFsQ2hhbm5lbHMiLCJyYW5nZSIsIm1lYXN1cmUiLCJuYW1lIiwiZGVmYXVsdE1lYXN1cmUiLCJ1cGRhdGUiLCJmaWVsZElkeCIsInBhaXIiLCJjb2x1bW5QYWlycyIsInBhcnRuZXJLZXkiLCJmaWVsZFBhaXJLZXkiLCJwYXJ0bmVyRmllbGRQYWlyS2V5Iiwiem9vbSIsInpvb21PZmZzZXQiLCJNYXRoIiwicG93IiwibWF4IiwiZGF0YSIsImFsbERhdGEiLCJmaWx0ZXJlZEluZGV4Iiwib2JqZWN0IiwiY29uZmlnVG9Db3B5Iiwibm90VG9EZWVwTWVyZ2UiLCJ2IiwicHVzaCIsIm5vdFRvQ29weSIsImRvbWFpbiIsImZvckVhY2giLCJncm91cCIsImN1cnJlbnRDb25maWciLCJjb3BpZWQiLCJjb3B5TGF5ZXJDb25maWciLCJ1cGRhdGVMYXllckNvbmZpZyIsImtleXMiLCJ2YWxpZGF0ZVZpc3VhbENoYW5uZWwiLCJjaGFubmVsIiwiaW5jbHVkZXMiLCJsYXllclZpc0NvbmZpZ3MiLCJpdGVtIiwiTEFZRVJfVklTX0NPTkZJR1MiLCJkZWZhdWx0VmFsdWUiLCJldmVyeSIsInAiLCJyZXF1aXJlZCIsInJlcXVpcmVkTGF5ZXJDb2x1bW5zIiwicmVkdWNlIiwiYWNjdSIsIm9wdGlvbmFsIiwib3B0aW9uYWxDb2x1bW5zIiwibmV3Q29uZmlnIiwibmV3VmlzQ29uZmlnIiwiQm9vbGVhbiIsImxheWVyRGF0YSIsInR5cGUiLCJoYXNBbGxDb2x1bW5zIiwiaGFzTGF5ZXJEYXRhIiwic2NhbGUiLCJmaXhlZCIsIlNDQUxFX0ZVTkMiLCJnZXRQb3NpdGlvbiIsInNhbXBsZURhdGEiLCJwb2ludHMiLCJsYXRCb3VuZHMiLCJsbmdCb3VuZHMiLCJib3VuZHMiLCJBcnJheSIsImlzQXJyYXkiLCJERUZBVUxUX0xJR0hUX1NFVFRJTkdTIiwibGlnaHRzUG9zaXRpb24iLCJzbGljZSIsIk5PX1ZBTFVFX0NPTE9SIiwiZ2V0VmFsdWUiLCJhdHRyaWJ1dGVWYWx1ZSIsIkFMTF9GSUVMRF9UWVBFUyIsInRpbWVzdGFtcCIsIkRhdGUiLCJkYXRhc2V0IiwibmV3RmlsdGVyIiwic2NhbGVUeXBlIiwiU0NBTEVfVFlQRVMiLCJvcmRpbmFsIiwidXBkYXRlZERvbWFpbiIsImNhbGN1bGF0ZUxheWVyRG9tYWluIiwidmFsaWRhdGVGaWVsZFR5cGUiLCJ2YWxpZGF0ZVNjYWxlIiwidmlzdWFsQ2hhbm5lbCIsImNoYW5uZWxTY2FsZVR5cGUiLCJzdXBwb3J0ZWRGaWVsZFR5cGVzIiwiY2hhbm5lbFN1cHBvcnRlZEZpZWxkVHlwZXMiLCJDSEFOTkVMX1NDQUxFX1NVUFBPUlRFRF9GSUVMRFMiLCJzY2FsZU9wdGlvbnMiLCJnZXRTY2FsZU9wdGlvbnMiLCJGSUVMRF9PUFRTIiwiZmlsdGVyZWRJbmRleEZvckRvbWFpbiIsImRlZmF1bHREb21haW4iLCJDb25zb2xlIiwiZXJyb3IiLCJpc1RpbWUiLCJ2YWx1ZUFjY2Vzc29yIiwibWF5YmVUb0RhdGUiLCJiaW5kIiwiZm9ybWF0IiwiaW5kZXhWYWx1ZUFjY2Vzc29yIiwiaSIsInNvcnRGdW5jdGlvbiIsInBvaW50IiwicXVhbnRpbGUiLCJxdWFudGl6ZSIsImxpbmVhciIsInNxcnQiLCJvYmplY3RJbmZvIiwibGF5ZXIiLCJwaWNrZWQiLCJtYXBTdGF0ZSIsImZpeGVkUmFkaXVzIiwicmFkaXVzQ2hhbm5lbCIsImZpbmQiLCJ2YyIsInByb3BlcnR5IiwidW5kZWZpbmVkIiwicmFkaXVzIiwiZ2V0Wm9vbUZhY3RvciIsInNvbWUiLCJub25lTGF5ZXJEYXRhQWZmZWN0aW5nUHJvcHMiLCJEZWZhdWx0TGF5ZXJJY29uIiwiQ0hBTk5FTF9TQ0FMRVMiLCJsYXQiLCJsbmciLCJsYXQwIiwibG5nMCIsImxhdDEiLCJsbmcxIiwiZmllbGRQYWlycyIsImRlZmF1bHRGaWVsZHMiLCJhbGxGaWVsZHMiLCJyZXF1aXJlZENvbHVtbnMiLCJwcmV2IiwicmVxdWlyZWRGaWVsZHMiLCJmaWx0ZXIiLCJmIiwiZ2V0QWxsUG9zc2libGVDb2x1bW5QYXJpcyIsImFsbEtleXMiLCJwb2ludGVycyIsImsiLCJjb3VudFBlcktleSIsInBhaXJzIiwiaW5jcmVtZW50UG9pbnRlcnMiLCJuZXdQYWlyIiwiY3V1ciIsInB0cyIsImNvdW50cyIsImMiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFvQkE7O0FBQ0E7O0FBQ0E7Ozs7QUFDQTs7OztBQUVBOztBQVVBOztBQUNBOztBQUVBOztBQUVBOztBQU9BOzs7O3NEQWtCVUEsYSxHQWpFVjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNB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QUMyRixJQUFELEVBQU9ZLElBQVAsRUFBYTdDLENBQWIsRUFBbUI7QUFDakRpQyxlQUFLSyxRQUFRdEMsQ0FBUixDQUFMLElBQW1CZ0MsZ0JBQWdCTSxRQUFRdEMsQ0FBUixDQUFoQixFQUE0QjZDLElBQTVCLENBQW5CO0FBQ0EsaUJBQU9aLElBQVA7QUFDRCxTQUhlLEVBR2IsRUFIYSxDQUFoQjs7QUFLQVMsY0FBTXpILElBQU4sQ0FBVzJILE9BQVg7QUFDRDtBQUNEOztBQUVBO0FBQ0EsZUFBU0QsaUJBQVQsQ0FBMkJHLEdBQTNCLEVBQWdDQyxNQUFoQyxFQUF3QzFMLEtBQXhDLEVBQStDO0FBQzdDLFlBQUlBLFVBQVUsQ0FBVixJQUFleUwsSUFBSSxDQUFKLE1BQVdDLE9BQU8sQ0FBUCxJQUFZLENBQTFDLEVBQTZDO0FBQzNDO0FBQ0EsaUJBQU8sS0FBUDtBQUNEOztBQUVELFlBQUlELElBQUl6TCxLQUFKLElBQWEsQ0FBYixHQUFpQjBMLE9BQU8xTCxLQUFQLENBQXJCLEVBQW9DO0FBQ2xDeUwsY0FBSXpMLEtBQUosSUFBYXlMLElBQUl6TCxLQUFKLElBQWEsQ0FBMUI7QUFDQSxpQkFBTyxJQUFQO0FBQ0Q7O0FBRUR5TCxZQUFJekwsS0FBSixJQUFhLENBQWI7QUFDQSxlQUFPc0wsa0JBQWtCRyxHQUFsQixFQUF1QkMsTUFBdkIsRUFBK0IxTCxRQUFRLENBQXZDLENBQVA7QUFDRDs7QUFFRCxhQUFPcUwsS0FBUDtBQUNEOzs7NkJBRWVNLEMsRUFBRztBQUNqQixhQUFPLDBCQUFTQSxDQUFULENBQVA7QUFDRDs7Ozs7a0JBdE1rQnBMLEsiLCJmaWxlIjoiYmFzZS1sYXllci5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8vIENvcHlyaWdodCAoYykgMjAxOCBVYmVyIFRlY2hub2xvZ2llcywgSW5jLlxuLy9cbi8vIFBlcm1pc3Npb24gaXMgaGVyZWJ5IGdyYW50ZWQsIGZyZWUgb2YgY2hhcmdlLCB0byBhbnkgcGVyc29uIG9idGFpbmluZyBhIGNvcHlcbi8vIG9mIHRoaXMgc29mdHdhcmUgYW5kIGFzc29jaWF0ZWQgZG9jdW1lbnRhdGlvbiBmaWxlcyAodGhlIFwiU29mdHdhcmVcIiksIHRvIGRlYWxcbi8vIGluIHRoZSBTb2Z0d2FyZSB3aXRob3V0IHJlc3RyaWN0aW9uLCBpbmNsdWRpbmcgd2l0aG91dCBsaW1pdGF0aW9uIHRoZSByaWdodHNcbi8vIHRvIHVzZSwgY29weSwgbW9kaWZ5LCBtZXJnZSwgcHVibGlzaCwgZGlzdHJpYnV0ZSwgc3VibGljZW5zZSwgYW5kL29yIHNlbGxcbi8vIGNvcGllcyBvZiB0aGUgU29mdHdhcmUsIGFuZCB0byBwZXJtaXQgcGVyc29ucyB0byB3aG9tIHRoZSBTb2Z0d2FyZSBpc1xuLy8gZnVybmlzaGVkIHRvIGRvIHNvLCBzdWJqZWN0IHRvIHRoZSBmb2xsb3dpbmcgY29uZGl0aW9uczpcbi8vXG4vLyBUaGUgYWJvdmUgY29weXJpZ2h0IG5vdGljZSBhbmQgdGhpcyBwZXJtaXNzaW9uIG5vdGljZSBzaGFsbCBiZSBpbmNsdWRlZCBpblxuLy8gYWxsIGNvcGllcyBvciBzdWJzdGFudGlhbCBwb3J0aW9ucyBvZiB0aGUgU29mdHdhcmUuXG4vL1xuLy8gVEhFIFNPRlRXQVJFIElTIFBST1ZJREVEIFwiQVMgSVNcIiwgV0lUSE9VVCBXQVJSQU5UWSBPRiBBTlkgS0lORCwgRVhQUkVTUyBPUlxuLy8gSU1QTElFRCwgSU5DTFVESU5HIEJVVCBOT1QgTElNSVRFRCBUTyBUSEUgV0FSUkFOVElFUyBPRiBNRVJDSEFOVEFCSUxJVFksXG4vLyBGSVRORVNTIEZPUiBBIFBBUlRJQ1VMQVIgUFVSUE9TRSBBTkQgTk9OSU5GUklOR0VNRU5ULiBJTiBOTyBFVkVOVCBTSEFMTCBUSEVcbi8vIEFVVEhPUlMgT1IgQ09QWVJJR0hUIEhPTERFUlMgQkUgTElBQkxFIEZPUiBBTlkgQ0xBSU0sIERBTUFHRVMgT1IgT1RIRVJcbi8vIExJQUJJTElUWSwgV0hFVEhFUiBJTiBBTiBBQ1RJT04gT0YgQ09OVFJBQ1QsIFRPUlQgT1IgT1RIRVJXSVNFLCBBUklTSU5HIEZST00sXG4vLyBPVVQgT0YgT1IgSU4gQ09OTkVDVElPTiBXSVRIIFRIRSBTT0ZUV0FSRSBPUiBUSEUgVVNFIE9SIE9USEVSIERFQUxJTkdTIElOXG4vLyBUSEUgU09GVFdBUkUuXG5cbmltcG9ydCB7aGV4VG9SZ2J9IGZyb20gJ3V0aWxzL2NvbG9yLXV0aWxzJztcbmltcG9ydCB7Y29uc29sZSBhcyBDb25zb2xlfSBmcm9tICdnbG9iYWwvd2luZG93JztcbmltcG9ydCBrZXltaXJyb3IgZnJvbSAna2V5bWlycm9yJztcbmltcG9ydCBEZWZhdWx0TGF5ZXJJY29uIGZyb20gJy4vZGVmYXVsdC1sYXllci1pY29uJztcblxuaW1wb3J0IHtcbiAgQUxMX0ZJRUxEX1RZUEVTLFxuICBERUZBVUxUX0xJR0hUX1NFVFRJTkdTLFxuICBOT19WQUxVRV9DT0xPUixcbiAgU0NBTEVfVFlQRVMsXG4gIENIQU5ORUxfU0NBTEVTLFxuICBGSUVMRF9PUFRTLFxuICBTQ0FMRV9GVU5DLFxuICBDSEFOTkVMX1NDQUxFX1NVUFBPUlRFRF9GSUVMRFNcbn0gZnJvbSAnY29uc3RhbnRzL2RlZmF1bHQtc2V0dGluZ3MnO1xuaW1wb3J0IHtEYXRhVml6Q29sb3JzfSBmcm9tICdjb25zdGFudHMvY3VzdG9tLWNvbG9yLXJhbmdlcyc7XG5pbXBvcnQge0xBWUVSX1ZJU19DT05GSUdTfSBmcm9tICcuL2xheWVyLWZhY3RvcnknO1xuXG5pbXBvcnQge2dlbmVyYXRlSGFzaElkLCBub3ROdWxsb3JVbmRlZmluZWQsIGlzUGxhaW5PYmplY3R9IGZyb20gJ3V0aWxzL3V0aWxzJztcblxuaW1wb3J0IHtcbiAgZ2V0U2FtcGxlRGF0YSxcbiAgZ2V0TGF0TG5nQm91bmRzLFxuICBtYXliZVRvRGF0ZSxcbiAgZ2V0U29ydGluZ0Z1bmN0aW9uXG59IGZyb20gJ3V0aWxzL2RhdGEtdXRpbHMnO1xuXG5pbXBvcnQge1xuICBnZXRRdWFudGlsZURvbWFpbixcbiAgZ2V0T3JkaW5hbERvbWFpbixcbiAgZ2V0TGluZWFyRG9tYWluXG59IGZyb20gJ3V0aWxzL2RhdGEtc2NhbGUtdXRpbHMnO1xuXG4vKipcbiAqIEFwcHJveC4gbnVtYmVyIG9mIHBvaW50cyB0byBzYW1wbGUgaW4gYSBsYXJnZSBkYXRhIHNldFxuICogQHR5cGUge251bWJlcn1cbiAqL1xuY29uc3QgTUFYX1NBTVBMRV9TSVpFID0gNTAwMDtcblxuZXhwb3J0IGNvbnN0IE9WRVJMQVlfVFlQRSA9IGtleW1pcnJvcih7XG4gIGRlY2tnbDogbnVsbCxcbiAgbWFwYm94Z2w6IG51bGxcbn0pO1xuXG5jb25zdCBsYXllckNvbG9ycyA9IE9iamVjdC52YWx1ZXMoRGF0YVZpekNvbG9ycykubWFwKGhleFRvUmdiKTtcbmZ1bmN0aW9uKiBnZW5lcmF0ZUNvbG9yKCkge1xuICBsZXQgaW5kZXggPSAwO1xuICB3aGlsZSAoaW5kZXggPCBsYXllckNvbG9ycy5sZW5ndGggKyAxKSB7XG4gICAgaWYgKGluZGV4ID09PSBsYXllckNvbG9ycy5sZW5ndGgpIHtcbiAgICAgIGluZGV4ID0gMDtcbiAgICB9XG4gICAgeWllbGQgbGF5ZXJDb2xvcnNbaW5kZXgrK107XG4gIH1cbn1cblxuY29uc3QgY29sb3JNYWtlciA9IGdlbmVyYXRlQ29sb3IoKTtcbmNvbnN0IGRlZmF1bHRHZXRGaWVsZFZhbHVlID0gKGZpZWxkLCBkKSA9PiBkW2ZpZWxkLnRhYmxlRmllbGRJbmRleCAtIDFdO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBMYXllciB7XG4gIGNvbnN0cnVjdG9yKHByb3BzID0ge30pIHtcbiAgICB0aGlzLmlkID0gcHJvcHMuaWQgfHwgZ2VuZXJhdGVIYXNoSWQoNik7XG5cbiAgICAvLyBtZXRhXG4gICAgdGhpcy5tZXRhID0ge307XG5cbiAgICAvLyB2aXNDb25maWdTZXR0aW5nc1xuICAgIHRoaXMudmlzQ29uZmlnU2V0dGluZ3MgPSB7fTtcblxuICAgIHRoaXMuY29uZmlnID0gdGhpcy5nZXREZWZhdWx0TGF5ZXJDb25maWcoe1xuICAgICAgY29sdW1uczogdGhpcy5nZXRMYXllckNvbHVtbnMoKSxcbiAgICAgIC4uLnByb3BzXG4gICAgfSk7XG4gIH1cblxuICBnZXQgbGF5ZXJJY29uKCkge1xuICAgIHJldHVybiBEZWZhdWx0TGF5ZXJJY29uO1xuICB9XG5cbiAgZ2V0IG92ZXJsYXlUeXBlKCkge1xuICAgIHJldHVybiBPVkVSTEFZX1RZUEUuZGVja2dsO1xuICB9XG5cbiAgZ2V0IHR5cGUoKSB7XG4gICAgcmV0dXJuIG51bGw7XG4gIH1cblxuICBnZXQgbmFtZSgpIHtcbiAgICByZXR1cm4gdGhpcy50eXBlO1xuICB9XG5cbiAgZ2V0IGlzQWdncmVnYXRlZCgpIHtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cblxuICBnZXQgcmVxdWlyZWRMYXllckNvbHVtbnMoKSB7XG4gICAgcmV0dXJuIFtdO1xuICB9XG5cbiAgZ2V0IG9wdGlvbmFsQ29sdW1ucygpIHtcbiAgICByZXR1cm4gW107XG4gIH1cblxuICBnZXQgbm9uZUxheWVyRGF0YUFmZmVjdGluZ1Byb3BzKCkge1xuICAgIHJldHVybiBbJ2xhYmVsJywgJ29wYWNpdHknLCAndGhpY2tuZXNzJywgJ2lzVmlzaWJsZSddO1xuICB9XG5cbiAgZ2V0IHZpc3VhbENoYW5uZWxzKCkge1xuICAgIHJldHVybiB7XG4gICAgICBjb2xvcjoge1xuICAgICAgICBwcm9wZXJ0eTogJ2NvbG9yJyxcbiAgICAgICAgZmllbGQ6ICdjb2xvckZpZWxkJyxcbiAgICAgICAgc2NhbGU6ICdjb2xvclNjYWxlJyxcbiAgICAgICAgZG9tYWluOiAnY29sb3JEb21haW4nLFxuICAgICAgICByYW5nZTogJ2NvbG9yUmFuZ2UnLFxuICAgICAgICBrZXk6ICdjb2xvcicsXG4gICAgICAgIGNoYW5uZWxTY2FsZVR5cGU6IENIQU5ORUxfU0NBTEVTLmNvbG9yXG4gICAgICB9LFxuICAgICAgc2l6ZToge1xuICAgICAgICBwcm9wZXJ0eTogJ3NpemUnLFxuICAgICAgICBmaWVsZDogJ3NpemVGaWVsZCcsXG4gICAgICAgIHNjYWxlOiAnc2l6ZVNjYWxlJyxcbiAgICAgICAgZG9tYWluOiAnc2l6ZURvbWFpbicsXG4gICAgICAgIHJhbmdlOiAnc2l6ZVJhbmdlJyxcbiAgICAgICAga2V5OiAnc2l6ZScsXG4gICAgICAgIGNoYW5uZWxTY2FsZVR5cGU6IENIQU5ORUxfU0NBTEVTLnNpemVcbiAgICAgIH1cbiAgICB9O1xuICB9XG5cbiAgLypcbiAgICogQ29sdW1uIHBhaXJzIG1hcHMgbGF5ZXIgY29sdW1uIHRvIGEgc3BlY2lmaWMgZmllbGQgcGFpcnMsXG4gICAqIEJ5IGRlZmF1bHQsIGl0IGlzIHNldCB0byBudWxsXG4gICAqL1xuICBnZXQgY29sdW1uUGFpcnMoKSB7XG4gICAgcmV0dXJuIG51bGw7XG4gIH1cblxuICAvKlxuICAgKiBEZWZhdWx0IHBvaW50IGNvbHVtbiBwYWlycywgY2FuIGJlIHVzZWQgZm9yIHBvaW50IGJhc2VkIGxheWVyczogcG9pbnQsIGljb24gZXRjLlxuICAgKi9cbiAgZ2V0IGRlZmF1bHRQb2ludENvbHVtblBhaXJzKCkge1xuICAgIHJldHVybiB7XG4gICAgICBsYXQ6IHtwYWlyOiAnbG5nJywgZmllbGRQYWlyS2V5OiAnbGF0J30sXG4gICAgICBsbmc6IHtwYWlyOiAnbGF0JywgZmllbGRQYWlyS2V5OiAnbG5nJ31cbiAgICB9O1xuICB9XG5cbiAgLypcbiAgICogRGVmYXVsdCBsaW5rIGNvbHVtbiBwYWlycywgY2FuIGJlIHVzZWQgZm9yIGxpbmsgYmFzZWQgbGF5ZXJzOiBhcmMsIGxpbmUgZXRjXG4gICAqL1xuICBnZXQgZGVmYXVsdExpbmtDb2x1bW5QYWlycygpIHtcbiAgICByZXR1cm4ge1xuICAgICAgbGF0MDoge3BhaXI6ICdsbmcwJywgZmllbGRQYWlyS2V5OiAnbGF0J30sXG4gICAgICBsbmcwOiB7cGFpcjogJ2xhdDAnLCBmaWVsZFBhaXJLZXk6ICdsbmcnfSxcbiAgICAgIGxhdDE6IHtwYWlyOiAnbG5nMScsIGZpZWxkUGFpcktleTogJ2xhdCd9LFxuICAgICAgbG5nMToge3BhaXI6ICdsYXQxJywgZmllbGRQYWlyS2V5OiAnbG5nJ31cbiAgICB9O1xuICB9XG5cbiAgLyoqXG4gICAqIFJldHVybiBhIFJlYWN0IGNvbXBvbmVudCBmb3IgdG8gcmVuZGVyIGxheWVyIGluc3RydWN0aW9ucyBpbiBhIG1vZGFsXG4gICAqIEByZXR1cm5zIHtvYmplY3R9IC0gYW4gb2JqZWN0XG4gICAqIEBleGFtcGxlXG4gICAqICByZXR1cm4ge1xuICAgKiAgICBpZDogJ2ljb25JbmZvJyxcbiAgICogICAgdGVtcGxhdGU6IEljb25JbmZvTW9kYWwsXG4gICAqICAgIG1vZGFsUHJvcHM6IHtcbiAgICogICAgICB0aXRsZTogJ0hvdyB0byBkcmF3IGljb25zJ1xuICAgKiAgIH07XG4gICAqIH1cbiAgICovXG4gIGdldCBsYXllckluZm9Nb2RhbCgpIHtcbiAgICByZXR1cm4gbnVsbDtcbiAgfVxuICAvKlxuICAgKiBHaXZlbiBhIGRhdGFzZXQsIGF1dG9tYXRpY2FsbHkgY3JlYXRlIGxheWVycyBiYXNlZCBvbiBpdFxuICAgKiBhbmQgcmV0dXJuIHRoZSBwcm9wc1xuICAgKiBCeSBkZWZhdWx0LCBubyBsYXllcnMgd2lsbCBiZSBmb3VuZFxuICAgKi9cbiAgc3RhdGljIGZpbmREZWZhdWx0TGF5ZXJQcm9wcyhmaWVsZFBhaXJzLCBkYXRhSWQpIHtcbiAgICByZXR1cm4gbnVsbDtcbiAgfVxuXG4gIC8qKlxuICAgKiBHaXZlbiBhIGFycmF5IG9mIHByZXNldCByZXF1aXJlZCBjb2x1bW4gbmFtZXNcbiAgICogZm91bmQgZmllbGQgdGhhdCBoYXMgdGhlIHNhbWUgbmFtZSB0byBzZXQgYXMgbGF5ZXIgY29sdW1uXG4gICAqXG4gICAqIEBwYXJhbSB7b2JqZWN0W119IGRlZmF1bHRGaWVsZHNcbiAgICogQHBhcmFtIHtvYmplY3RbXX0gYWxsRmllbGRzXG4gICAqIEByZXR1cm5zIHtvYmplY3RbXSB8IG51bGx9IGFsbCBwb3NzaWJsZSByZXF1aXJlZCBsYXllciBjb2x1bW4gcGFpcnNcbiAgICovXG4gIHN0YXRpYyBmaW5kRGVmYXVsdENvbHVtbkZpZWxkKGRlZmF1bHRGaWVsZHMsIGFsbEZpZWxkcykge1xuICAgIC8vIGZpbmQgYWxsIG1hdGNoZWQgZmllbGRzIGZvciBlYWNoIHJlcXVpcmVkIGNvbFxuICAgIGNvbnN0IHJlcXVpcmVkQ29sdW1ucyA9IE9iamVjdC5rZXlzKGRlZmF1bHRGaWVsZHMpLnJlZHVjZSgocHJldiwga2V5KSA9PiB7XG4gICAgICBjb25zdCByZXF1aXJlZEZpZWxkcyA9IGFsbEZpZWxkcy5maWx0ZXIoXG4gICAgICAgIGYgPT4gZi5uYW1lID09PSBkZWZhdWx0RmllbGRzW2tleV0gfHwgZGVmYXVsdEZpZWxkc1trZXldLmluY2x1ZGVzKGYubmFtZSlcbiAgICAgICk7XG5cbiAgICAgIHByZXZba2V5XSA9IHJlcXVpcmVkRmllbGRzLmxlbmd0aFxuICAgICAgICA/IHJlcXVpcmVkRmllbGRzLm1hcChmID0+ICh7XG4gICAgICAgICAgdmFsdWU6IGYubmFtZSxcbiAgICAgICAgICBmaWVsZElkeDogZi50YWJsZUZpZWxkSW5kZXggLSAxXG4gICAgICAgIH0pKVxuICAgICAgICA6IG51bGw7XG4gICAgICByZXR1cm4gcHJldjtcbiAgICB9LCB7fSk7XG5cbiAgICBpZiAoIU9iamVjdC52YWx1ZXMocmVxdWlyZWRDb2x1bW5zKS5ldmVyeShCb29sZWFuKSkge1xuICAgICAgLy8gaWYgYW55IGZpZWxkIG1pc3NpbmcsIHJldHVybiBudWxsXG4gICAgICByZXR1cm4gbnVsbDtcbiAgICB9XG5cbiAgICByZXR1cm4gdGhpcy5nZXRBbGxQb3NzaWJsZUNvbHVtblBhcmlzKHJlcXVpcmVkQ29sdW1ucyk7XG4gIH1cblxuICBzdGF0aWMgZ2V0QWxsUG9zc2libGVDb2x1bW5QYXJpcyhyZXF1aXJlZENvbHVtbnMpIHtcbiAgICAvLyBmb3IgbXVsdGlwbGUgbWF0Y2hlZCBmaWVsZCBmb3Igb25lIHJlcXVpcmVkIGNvbHVtbiwgcmV0dXJuIG11bHRpcGxlXG4gICAgLy8gY29tYmluYXRpb25zLCBlLiBnLiBpZiBjb2x1bW4gYSBoYXMgMiBtYXRjaGVkLCBjb2x1bW4gYiBoYXMgMyBtYXRjaGVkXG4gICAgLy8gNiBwb3NzaWJsZSBjb2x1bW4gcGFpcnMgd2lsbCBiZSByZXR1cm5lZFxuICAgIGNvbnN0IGFsbEtleXMgPSBPYmplY3Qua2V5cyhyZXF1aXJlZENvbHVtbnMpO1xuICAgIGNvbnN0IHBvaW50ZXJzID0gYWxsS2V5cy5tYXAoKGssIGkpID0+IChpID09PSBhbGxLZXlzLmxlbmd0aCAtIDEgPyAtMSA6IDApKTtcbiAgICBjb25zdCBjb3VudFBlcktleSA9IGFsbEtleXMubWFwKGsgPT4gcmVxdWlyZWRDb2x1bW5zW2tdLmxlbmd0aCk7XG4gICAgY29uc3QgcGFpcnMgPSBbXTtcblxuICAgIC8qIGVzbGludC1kaXNhYmxlIG5vLWxvb3AtZnVuYyAqL1xuICAgIHdoaWxlIChpbmNyZW1lbnRQb2ludGVycyhwb2ludGVycywgY291bnRQZXJLZXksIHBvaW50ZXJzLmxlbmd0aCAtIDEpKSB7XG4gICAgICBjb25zdCBuZXdQYWlyID0gcG9pbnRlcnMucmVkdWNlKChwcmV2LCBjdXVyLCBpKSA9PiB7XG4gICAgICAgIHByZXZbYWxsS2V5c1tpXV0gPSByZXF1aXJlZENvbHVtbnNbYWxsS2V5c1tpXV1bY3V1cl07XG4gICAgICAgIHJldHVybiBwcmV2O1xuICAgICAgfSwge30pO1xuXG4gICAgICBwYWlycy5wdXNoKG5ld1BhaXIpO1xuICAgIH1cbiAgICAvKiBlc2xpbnQtZW5hYmxlIG5vLWxvb3AtZnVuYyAqL1xuXG4gICAgLy8gcmVjdXJzaXZlbHkgaW5jcmVtZW50IHBvaW50ZXJzXG4gICAgZnVuY3Rpb24gaW5jcmVtZW50UG9pbnRlcnMocHRzLCBjb3VudHMsIGluZGV4KSB7XG4gICAgICBpZiAoaW5kZXggPT09IDAgJiYgcHRzWzBdID09PSBjb3VudHNbMF0gLSAxKSB7XG4gICAgICAgIC8vIG5vdGhpbmcgdG8gaW5jcmVtZW50XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgIH1cblxuICAgICAgaWYgKHB0c1tpbmRleF0gKyAxIDwgY291bnRzW2luZGV4XSkge1xuICAgICAgICBwdHNbaW5kZXhdID0gcHRzW2luZGV4XSArIDE7XG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgfVxuXG4gICAgICBwdHNbaW5kZXhdID0gMDtcbiAgICAgIHJldHVybiBpbmNyZW1lbnRQb2ludGVycyhwdHMsIGNvdW50cywgaW5kZXggLSAxKTtcbiAgICB9XG5cbiAgICByZXR1cm4gcGFpcnM7XG4gIH1cblxuICBzdGF0aWMgaGV4VG9SZ2IoYykge1xuICAgIHJldHVybiBoZXhUb1JnYihjKTtcbiAgfVxuXG4gIGdldERlZmF1bHRMYXllckNvbmZpZyhwcm9wcyA9IHt9KSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIGRhdGFJZDogcHJvcHMuZGF0YUlkIHx8IG51bGwsXG4gICAgICBsYWJlbDogcHJvcHMubGFiZWwgfHwgJ25ldyBsYXllcicsXG4gICAgICBjb2xvcjogcHJvcHMuY29sb3IgfHwgY29sb3JNYWtlci5uZXh0KCkudmFsdWUsXG4gICAgICBjb2x1bW5zOiBwcm9wcy5jb2x1bW5zIHx8IG51bGwsXG4gICAgICBpc1Zpc2libGU6IHByb3BzLmlzVmlzaWJsZSB8fCBmYWxzZSxcbiAgICAgIGlzQ29uZmlnQWN0aXZlOiBwcm9wcy5pc0NvbmZpZ0FjdGl2ZSB8fCBmYWxzZSxcbiAgICAgIGhpZ2hsaWdodENvbG9yOiBwcm9wcy5oaWdobGlnaHRDb2xvciB8fCBbMjUyLCAyNDIsIDI2LCAyNTVdLFxuXG4gICAgICAvLyBUT0RPOiByZWZhY3RvciB0aGlzIGludG8gc2VwYXJhdGUgdmlzdWFsIENoYW5uZWwgY29uZmlnXG4gICAgICAvLyBjb2xvciBieSBmaWVsZCwgZG9tYWluIGlzIHNldCBieSBmaWx0ZXJzLCBmaWVsZCwgc2NhbGUgdHlwZVxuICAgICAgY29sb3JGaWVsZDogbnVsbCxcbiAgICAgIGNvbG9yRG9tYWluOiBbMCwgMV0sXG4gICAgICBjb2xvclNjYWxlOiAncXVhbnRpbGUnLFxuXG4gICAgICAvLyBjb2xvciBieSBzaXplLCBkb21haW4gaXMgc2V0IGJ5IGZpbHRlcnMsIGZpZWxkLCBzY2FsZSB0eXBlXG4gICAgICBzaXplRG9tYWluOiBbMCwgMV0sXG4gICAgICBzaXplU2NhbGU6ICdsaW5lYXInLFxuICAgICAgc2l6ZUZpZWxkOiBudWxsLFxuXG4gICAgICB2aXNDb25maWc6IHt9LFxuXG4gICAgICB0ZXh0TGFiZWw6IHtcbiAgICAgICAgZmllbGQ6IG51bGwsXG4gICAgICAgIGNvbG9yOiBbMjU1LCAyNTUsIDI1NV0sXG4gICAgICAgIHNpemU6IDUwLFxuICAgICAgICBvZmZzZXQ6IFswLCAwXSxcbiAgICAgICAgYW5jaG9yOiAnbWlkZGxlJ1xuICAgICAgfVxuICAgIH07XG4gIH1cblxuICAvKipcbiAgICogR2V0IHRoZSBkZXNjcmlwdGlvbiBvZiBhIHZpc3VhbENoYW5uZWwgY29uZmlnXG4gICAqIEBwYXJhbSBrZXlcbiAgICogQHJldHVybnMge3tsYWJlbDogc3RyaW5nLCBtZWFzdXJlOiAoc3RyaW5nfHN0cmluZyl9fVxuICAgKi9cbiAgZ2V0VmlzdWFsQ2hhbm5lbERlc2NyaXB0aW9uKGtleSkge1xuICAgIC8vIGUuZy4gbGFiZWw6IENvbG9yLCBtZWFzdXJlOiBWZWhpY2xlIFR5cGVcbiAgICByZXR1cm4ge1xuICAgICAgbGFiZWw6IHRoaXMudmlzQ29uZmlnU2V0dGluZ3NbdGhpcy52aXN1YWxDaGFubmVsc1trZXldLnJhbmdlXS5sYWJlbCxcbiAgICAgIG1lYXN1cmU6IHRoaXMuY29uZmlnW3RoaXMudmlzdWFsQ2hhbm5lbHNba2V5XS5maWVsZF1cbiAgICAgICAgPyB0aGlzLmNvbmZpZ1t0aGlzLnZpc3VhbENoYW5uZWxzW2tleV0uZmllbGRdLm5hbWVcbiAgICAgICAgOiB0aGlzLnZpc3VhbENoYW5uZWxzW2tleV0uZGVmYXVsdE1lYXN1cmVcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogQXNzaWduIGEgZmllbGQgdG8gbGF5ZXIgY29sdW1uLCByZXR1cm4gY29sdW1uIGNvbmZpZ1xuICAgKiBAcGFyYW0ga2V5IC0gQ29sdW1uIEtleVxuICAgKiBAcGFyYW0gZmllbGQgLSBTZWxlY3RlZCBmaWVsZFxuICAgKiBAcmV0dXJucyB7e319IC0gQ29sdW1uIGNvbmZpZ1xuICAgKi9cbiAgYXNzaWduQ29sdW1uKGtleSwgZmllbGQpIHtcbiAgICAvLyBmaWVsZCB2YWx1ZSBjb3VsZCBiZSBudWxsIGZvciBvcHRpb25hbCBjb2x1bW5zXG4gICAgY29uc3QgdXBkYXRlID0gZmllbGRcbiAgICAgID8ge1xuICAgICAgICAgIHZhbHVlOiBmaWVsZC5uYW1lLFxuICAgICAgICAgIGZpZWxkSWR4OiBmaWVsZC50YWJsZUZpZWxkSW5kZXggLSAxXG4gICAgICAgIH1cbiAgICAgIDoge3ZhbHVlOiBudWxsLCBmaWVsZElkeDogLTF9O1xuXG4gICAgcmV0dXJuIHtcbiAgICAgIC4uLnRoaXMuY29uZmlnLmNvbHVtbnMsXG4gICAgICBba2V5XToge1xuICAgICAgICAuLi50aGlzLmNvbmZpZy5jb2x1bW5zW2tleV0sXG4gICAgICAgIC4uLnVwZGF0ZVxuICAgICAgfVxuICAgIH07XG4gIH1cblxuICAvKipcbiAgICogQXNzaWduIGEgZmllbGQgcGFpciB0byBjb2x1bW4gY29uZmlnLCByZXR1cm4gY29sdW1uIGNvbmZpZ1xuICAgKiBAcGFyYW0ga2V5IC0gQ29sdW1uIEtleVxuICAgKiBAcGFyYW0gcGFpciAtIGZpZWxkIFBhaXJcbiAgICogQHJldHVybnMge3t9fSAtIENvbHVtbiBjb25maWdcbiAgICovXG4gIGFzc2lnbkNvbHVtblBhaXJzKGtleSwgcGFpcikge1xuICAgIGlmICghdGhpcy5jb2x1bW5QYWlycyB8fCAhdGhpcy5jb2x1bW5QYWlyc1trZXldKSB7XG4gICAgICAvLyBzaG91bGQgbm90IGVuZCBpbiB0aGlzIHN0YXRlXG4gICAgICByZXR1cm4gdGhpcy5jb25maWcuY29sdW1ucztcbiAgICB9XG5cbiAgICBjb25zdCB7cGFpcjogcGFydG5lcktleSwgZmllbGRQYWlyS2V5fSA9IHRoaXMuY29sdW1uUGFpcnNba2V5XTtcbiAgICBjb25zdCB7ZmllbGRQYWlyS2V5OiBwYXJ0bmVyRmllbGRQYWlyS2V5fSA9IHRoaXMuY29sdW1uUGFpcnNbcGFydG5lcktleV07XG5cbiAgICByZXR1cm4ge1xuICAgICAgLi4udGhpcy5jb25maWcuY29sdW1ucyxcbiAgICAgIFtrZXldOiBwYWlyW2ZpZWxkUGFpcktleV0sXG4gICAgICBbcGFydG5lcktleV06IHBhaXJbcGFydG5lckZpZWxkUGFpcktleV1cbiAgICB9O1xuICB9XG5cblx0LyoqXG4gICAqIENhbGN1bGF0ZSBhIHJhZGl1cyB6b29tIG11bHRpcGxpZXIgdG8gcmVuZGVyIHBvaW50cywgc28gdGhleSBhcmUgdmlzaWJsZSBpbiBhbGwgem9vbSBsZXZlbFxuICAgKiBAcGFyYW0gbWFwU3RhdGVcbiAgICogQHBhcmFtIG1hcFN0YXRlLnpvb20gLSBhY3R1YWwgem9vbVxuICAgKiBAcGFyYW0gbWFwU3RhdGUuem9vbU9mZnNldCAtIHpvb21PZmZzZXQgd2hlbiByZW5kZXIgaW4gdGhlIHBsb3QgY29udGFpbmVyIGZvciBleHBvcnQgaW1hZ2VcbiAgICogQHJldHVybnMge251bWJlcn1cbiAgICovXG4gIGdldFpvb21GYWN0b3Ioe3pvb20sIHpvb21PZmZzZXQgPSAwfSkge1xuICAgIHJldHVybiBNYXRoLnBvdygyLCBNYXRoLm1heCgxNCAtIHpvb20gKyB6b29tT2Zmc2V0LCAwKSk7XG4gIH1cblxuXHQvKipcbiAgICogQ2FsY3VsYXRlIGEgZWxldmF0aW9uIHpvb20gbXVsdGlwbGllciB0byByZW5kZXIgcG9pbnRzLCBzbyB0aGV5IGFyZSB2aXNpYmxlIGluIGFsbCB6b29tIGxldmVsXG4gICAqIEBwYXJhbSBtYXBTdGF0ZVxuICAgKiBAcGFyYW0gbWFwU3RhdGUuem9vbSAtIGFjdHVhbCB6b29tXG4gICAqIEBwYXJhbSBtYXBTdGF0ZS56b29tT2Zmc2V0IC0gem9vbU9mZnNldCB3aGVuIHJlbmRlciBpbiB0aGUgcGxvdCBjb250YWluZXIgZm9yIGV4cG9ydCBpbWFnZVxuICAgKiBAcmV0dXJucyB7bnVtYmVyfVxuICAgKi9cbiAgZ2V0RWxldmF0aW9uWm9vbUZhY3Rvcih7em9vbSwgem9vbU9mZnNldCA9IDB9KSB7XG4gICAgcmV0dXJuIE1hdGgucG93KDIsIE1hdGgubWF4KDggLSB6b29tICsgem9vbU9mZnNldCwgMCkpO1xuICB9XG5cbiAgZm9ybWF0TGF5ZXJEYXRhKGRhdGEsIGFsbERhdGEsIGZpbHRlcmVkSW5kZXgpIHtcbiAgICByZXR1cm4ge307XG4gIH1cblxuICByZW5kZXJMYXllcigpIHtcbiAgICByZXR1cm4gW107XG4gIH1cblxuICBnZXRIb3ZlckRhdGEob2JqZWN0KSB7XG4gICAgaWYgKCFvYmplY3QpIHtcbiAgICAgIHJldHVybiBudWxsO1xuICAgIH1cbiAgICAvLyBieSBkZWZhdWx0LCBlYWNoIGVudHJ5IG9mIGxheWVyRGF0YSBzaG91bGQgaGF2ZSBhIGRhdGEgcHJvcGVydHkgcG9pbnRzXG4gICAgLy8gdG8gdGhlIG9yaWdpbmFsIGl0ZW0gaW4gdGhlIGFsbERhdGEgYXJyYXlcbiAgICAvLyBlYWNoIGxheWVyIGNhbiBpbXBsZW1lbnQgaXRzIG93biBnZXRIb3ZlckRhdGEgbWV0aG9kXG4gICAgcmV0dXJuIG9iamVjdC5kYXRhO1xuICB9XG5cbiAgLyoqXG4gICAqIFdoZW4gY2hhbmdlIGxheWVyIHR5cGUsIHRyeSB0byBjb3B5IG92ZXIgbGF5ZXIgY29uZmlncyBhcyBtdWNoIGFzIHBvc3NpYmxlXG4gICAqIEBwYXJhbSBjb25maWdUb0NvcHkgLSBjb25maWcgdG8gY29weSBvdmVyXG4gICAqIEBwYXJhbSB2aXNDb25maWdTZXR0aW5ncyAtIHZpc0NvbmZpZyBzZXR0aW5ncyBvZiBjb25maWcgdG8gY29weVxuICAgKi9cbiAgYXNzaWduQ29uZmlnVG9MYXllcihjb25maWdUb0NvcHksIHZpc0NvbmZpZ1NldHRpbmdzKSB7XG4gICAgLy8gZG9uJ3QgZGVlcCBtZXJnZSB2aXN1YWxDaGFubmVsIGZpZWxkXG4gICAgY29uc3Qgbm90VG9EZWVwTWVyZ2UgPSBPYmplY3QudmFsdWVzKHRoaXMudmlzdWFsQ2hhbm5lbHMpLm1hcCh2ID0+IHYuZmllbGQpO1xuXG4gICAgLy8gZG9uJ3QgZGVlcCBtZXJnZSBjb2xvciByYW5nZSwgcmV2ZXJzZWQ6IGlzIG5vdCBhIGtleSBieSBkZWZhdWx0XG4gICAgbm90VG9EZWVwTWVyZ2UucHVzaCgnY29sb3JSYW5nZScpO1xuXG4gICAgLy8gZG9uJ3QgY29weSBvdmVyIGRvbWFpblxuICAgIGNvbnN0IG5vdFRvQ29weSA9IE9iamVjdC52YWx1ZXModGhpcy52aXN1YWxDaGFubmVscykubWFwKHYgPT4gdi5kb21haW4pO1xuXG4gICAgLy8gaWYgcmFuZ2UgaXMgZm9yIHRoZSBzYW1lIHByb3BlcnR5IGdyb3VwIGNvcHkgaXQsIG90aGVyd2lzZSwgbm90IHRvIGNvcHlcbiAgICBPYmplY3QudmFsdWVzKHRoaXMudmlzdWFsQ2hhbm5lbHMpLmZvckVhY2godiA9PiB7XG4gICAgICBpZiAoY29uZmlnVG9Db3B5LnZpc0NvbmZpZ1t2LnJhbmdlXSAmJiB2aXNDb25maWdTZXR0aW5nc1t2LnJhbmdlXS5ncm91cCAhPT0gdGhpcy52aXNDb25maWdTZXR0aW5nc1t2LnJhbmdlXS5ncm91cCkge1xuICAgICAgICBub3RUb0NvcHkucHVzaCh2LnJhbmdlKTtcbiAgICAgIH1cbiAgICB9KTtcblxuICAgIC8vIGRvbid0IGNvcHkgb3ZlciB2aXN1YWxDaGFubmVsIHJhbmdlXG4gICAgY29uc3QgY3VycmVudENvbmZpZyA9IHRoaXMuY29uZmlnO1xuICAgIGNvbnN0IGNvcGllZCA9IHRoaXMuY29weUxheWVyQ29uZmlnKGN1cnJlbnRDb25maWcsIGNvbmZpZ1RvQ29weSwge25vdFRvRGVlcE1lcmdlLCBub3RUb0NvcHl9KTtcblxuICAgIHRoaXMudXBkYXRlTGF5ZXJDb25maWcoY29waWVkKTtcbiAgICAvLyB2YWxpZGF0ZSB2aXN1YWxDaGFubmVsIGZpZWxkIHR5cGUgYW5kIHNjYWxlIHR5cGVzXG4gICAgT2JqZWN0LmtleXModGhpcy52aXN1YWxDaGFubmVscykuZm9yRWFjaChjaGFubmVsID0+IHtcbiAgICAgIHRoaXMudmFsaWRhdGVWaXN1YWxDaGFubmVsKGNoYW5uZWwpO1xuICAgIH0pO1xuICB9XG5cbiAgLypcbiAgICogUmVjdXJzaXZlbHkgY29weSBjb25maWcgb3ZlciB0byBhbiBlbXB0eSBsYXllclxuICAgKiB3aGVuIHJlY2VpdmVkIHNhdmVkIGNvbmZpZywgb3IgY29weSBjb25maWcgb3ZlciBmcm9tIGEgZGlmZmVyZW50IGxheWVyIHR5cGVcbiAgICogbWFrZSBzdXJlIHRvIG9ubHkgY29weSBvdmVyIHZhbHVlIHRvIGV4aXN0aW5nIGtleXNcbiAgICogQHBhcmFtIHtvYmplY3R9IGN1cnJlbnRDb25maWcgLSBleGlzdGluZyBjb25maWcgdG8gYmUgb3ZlcnJpZGVcbiAgICogQHBhcmFtIHtvYmplY3R9IGNvbmZpZ1RvQ29weSAtIG5ldyBDb25maWcgdG8gY29weSBvdmVyXG4gICAqIEBwYXJhbSB7c3RyaW5nW119IG5vdFRvRGVlcE1lcmdlIC0gYXJyYXkgb2YgcHJvcGVydGllcyB0byBub3QgdG8gYmUgZGVlcCBjb3BpZWRcbiAgICogQHBhcmFtIHtzdHJpbmdbXX0gbm90VG9Db3B5IC0gYXJyYXkgb2YgcHJvcGVydGllcyBub3QgdG8gY29weVxuICAgKiBAcmV0dXJucyB7b2JqZWN0fSAtIGNvcGllZCBjb25maWdcbiAgICovXG4gIGNvcHlMYXllckNvbmZpZyhjdXJyZW50Q29uZmlnLCBjb25maWdUb0NvcHksIHtub3RUb0RlZXBNZXJnZSA9IFtdLCBub3RUb0NvcHkgPSBbXX0gPSB7fSkge1xuICAgIGNvbnN0IGNvcGllZCA9IHt9O1xuICAgIE9iamVjdC5rZXlzKGN1cnJlbnRDb25maWcpLmZvckVhY2goa2V5ID0+IHtcbiAgICAgIGlmIChcbiAgICAgICAgaXNQbGFpbk9iamVjdChjdXJyZW50Q29uZmlnW2tleV0pICYmXG4gICAgICAgIGlzUGxhaW5PYmplY3QoY29uZmlnVG9Db3B5W2tleV0pICYmXG4gICAgICAgICFub3RUb0RlZXBNZXJnZS5pbmNsdWRlcyhrZXkpICYmXG4gICAgICAgICFub3RUb0NvcHkuaW5jbHVkZXMoa2V5KVxuICAgICAgKSB7XG4gICAgICAgIC8vIHJlY3Vyc2l2ZWx5IGFzc2lnbiBvYmplY3QgdmFsdWVcbiAgICAgICAgY29waWVkW2tleV0gPSB0aGlzLmNvcHlMYXllckNvbmZpZyhjdXJyZW50Q29uZmlnW2tleV0sIGNvbmZpZ1RvQ29weVtrZXldLCB7bm90VG9EZWVwTWVyZ2UsIG5vdFRvQ29weX0pO1xuICAgICAgfSBlbHNlIGlmIChcbiAgICAgICAgbm90TnVsbG9yVW5kZWZpbmVkKGNvbmZpZ1RvQ29weVtrZXldKSAmJlxuICAgICAgICAhbm90VG9Db3B5LmluY2x1ZGVzKGtleSlcbiAgICAgICkge1xuICAgICAgICAvLyBjb3B5XG4gICAgICAgIGNvcGllZFtrZXldID0gY29uZmlnVG9Db3B5W2tleV07XG4gICAgICB9IGVsc2Uge1xuICAgICAgICAvLyBrZWVwIGV4aXN0aW5nXG4gICAgICAgIGNvcGllZFtrZXldID0gY3VycmVudENvbmZpZ1trZXldO1xuICAgICAgfVxuICAgIH0pO1xuXG4gICAgcmV0dXJuIGNvcGllZDtcbiAgfVxuXG4gIHJlZ2lzdGVyVmlzQ29uZmlnKGxheWVyVmlzQ29uZmlncykge1xuICAgIE9iamVjdC5rZXlzKGxheWVyVmlzQ29uZmlncykuZm9yRWFjaChpdGVtID0+IHtcbiAgICAgIGlmIChcbiAgICAgICAgdHlwZW9mIGl0ZW0gPT09ICdzdHJpbmcnICYmXG4gICAgICAgIExBWUVSX1ZJU19DT05GSUdTW2xheWVyVmlzQ29uZmlnc1tpdGVtXV1cbiAgICAgICkge1xuICAgICAgICAvLyBpZiBhc3NpZ25lZCBvbmUgb2YgZGVmYXVsdCBMQVlFUl9DT05GSUdTXG4gICAgICAgIHRoaXMuY29uZmlnLnZpc0NvbmZpZ1tpdGVtXSA9XG4gICAgICAgICAgTEFZRVJfVklTX0NPTkZJR1NbbGF5ZXJWaXNDb25maWdzW2l0ZW1dXS5kZWZhdWx0VmFsdWU7XG4gICAgICAgIHRoaXMudmlzQ29uZmlnU2V0dGluZ3NbaXRlbV0gPSBMQVlFUl9WSVNfQ09ORklHU1tsYXllclZpc0NvbmZpZ3NbaXRlbV1dO1xuICAgICAgfSBlbHNlIGlmIChcbiAgICAgICAgWyd0eXBlJywgJ2RlZmF1bHRWYWx1ZSddLmV2ZXJ5KHAgPT4gbGF5ZXJWaXNDb25maWdzW2l0ZW1dW3BdKVxuICAgICAgKSB7XG4gICAgICAgIC8vIGlmIHByb3ZpZGVkIGN1c3RvbWl6ZWQgdmlzQ29uZmlnLCBhbmQgaGFzIHR5cGUgJiYgZGVmYXVsdFZhbHVlXG4gICAgICAgIC8vIFRPRE86IGZ1cnRoZXIgY2hlY2sgaWYgY3VzdG9taXplZCB2aXNDb25maWcgaXMgdmFsaWRcbiAgICAgICAgdGhpcy5jb25maWcudmlzQ29uZmlnW2l0ZW1dID0gbGF5ZXJWaXNDb25maWdzW2l0ZW1dLmRlZmF1bHRWYWx1ZTtcbiAgICAgICAgdGhpcy52aXNDb25maWdTZXR0aW5nc1tpdGVtXSA9IGxheWVyVmlzQ29uZmlnc1tpdGVtXTtcbiAgICAgIH1cbiAgICB9KTtcbiAgfVxuXG4gIGdldExheWVyQ29sdW1ucygpIHtcbiAgICBjb25zdCByZXF1aXJlZCA9IHRoaXMucmVxdWlyZWRMYXllckNvbHVtbnMucmVkdWNlKFxuICAgICAgKGFjY3UsIGtleSkgPT4gKHtcbiAgICAgICAgLi4uYWNjdSxcbiAgICAgICAgW2tleV06IHt2YWx1ZTogbnVsbCwgZmllbGRJZHg6IC0xfVxuICAgICAgfSksXG4gICAgICB7fVxuICAgICk7XG4gICAgY29uc3Qgb3B0aW9uYWwgPSB0aGlzLm9wdGlvbmFsQ29sdW1ucy5yZWR1Y2UoXG4gICAgICAoYWNjdSwga2V5KSA9PiAoe1xuICAgICAgICAuLi5hY2N1LFxuICAgICAgICBba2V5XToge3ZhbHVlOiBudWxsLCBmaWVsZElkeDogLTEsIG9wdGlvbmFsOiB0cnVlfVxuICAgICAgfSksXG4gICAgICB7fVxuICAgICk7XG5cbiAgICByZXR1cm4gey4uLnJlcXVpcmVkLCAuLi5vcHRpb25hbH07XG4gIH1cblxuICB1cGRhdGVMYXllckNvbmZpZyhuZXdDb25maWcpIHtcbiAgICB0aGlzLmNvbmZpZyA9IHsuLi50aGlzLmNvbmZpZywgLi4ubmV3Q29uZmlnfTtcbiAgICByZXR1cm4gdGhpcztcbiAgfVxuXG4gIHVwZGF0ZUxheWVyVmlzQ29uZmlnKG5ld1Zpc0NvbmZpZykge1xuICAgIHRoaXMuY29uZmlnLnZpc0NvbmZpZyA9IHsuLi50aGlzLmNvbmZpZy52aXNDb25maWcsIC4uLm5ld1Zpc0NvbmZpZ307XG4gICAgcmV0dXJuIHRoaXM7XG4gIH1cbiAgLyoqXG4gICAqIENoZWNrIHdoZXRoZXIgbGF5ZXIgaGFzIGFsbCBjb2x1bW5zXG4gICAqXG4gICAqIEBwYXJhbSB7b2JqZWN0fSBsYXllclxuICAgKiBAcmV0dXJucyB7Ym9vbGVhbn0geWVzIG9yIG5vXG4gICAqL1xuICBoYXNBbGxDb2x1bW5zKCkge1xuICAgIGNvbnN0IHtjb2x1bW5zfSA9IHRoaXMuY29uZmlnO1xuICAgIHJldHVybiAoXG4gICAgICBjb2x1bW5zICYmXG4gICAgICBPYmplY3QudmFsdWVzKGNvbHVtbnMpLmV2ZXJ5KHYgPT4ge1xuICAgICAgICByZXR1cm4gQm9vbGVhbih2Lm9wdGlvbmFsIHx8ICh2LnZhbHVlICYmIHYuZmllbGRJZHggPiAtMSkpO1xuICAgICAgfSlcbiAgICApO1xuICB9XG5cbiAgLyoqXG4gICAqIENoZWNrIHdoZXRoZXIgbGF5ZXIgaGFzIGRhdGFcbiAgICpcbiAgICogQHBhcmFtIHtvYmplY3R9IGxheWVyXG4gICAqIEBwYXJhbSB7QXJyYXkgfCBPYmplY3R9IGxheWVyRGF0YVxuICAgKiBAcmV0dXJucyB7Ym9vbGVhbn0geWVzIG9yIG5vXG4gICAqL1xuICBoYXNMYXllckRhdGEobGF5ZXJEYXRhKSB7XG4gICAgaWYgKCFsYXllckRhdGEpIHtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG5cbiAgICByZXR1cm4gQm9vbGVhbihsYXllckRhdGEuZGF0YSAmJiBsYXllckRhdGEuZGF0YS5sZW5ndGgpO1xuICB9XG5cbiAgaXNWYWxpZFRvU2F2ZSgpIHtcbiAgICByZXR1cm4gdGhpcy50eXBlICYmIHRoaXMuaGFzQWxsQ29sdW1ucygpO1xuICB9XG5cbiAgc2hvdWxkUmVuZGVyTGF5ZXIoZGF0YSkge1xuICAgIHJldHVybiAoXG4gICAgICB0aGlzLnR5cGUgJiZcbiAgICAgIHRoaXMuaGFzQWxsQ29sdW1ucygpICYmXG4gICAgICB0aGlzLmNvbmZpZy5pc1Zpc2libGUgJiZcbiAgICAgIHRoaXMuaGFzTGF5ZXJEYXRhKGRhdGEpXG4gICAgKTtcbiAgfVxuXG4gIGdldFZpc0NoYW5uZWxTY2FsZShzY2FsZSwgZG9tYWluLCByYW5nZSwgZml4ZWQpIHtcbiAgICByZXR1cm4gU0NBTEVfRlVOQ1tmaXhlZCA/ICdsaW5lYXInIDogc2NhbGVdKClcbiAgICAgIC5kb21haW4oZG9tYWluKVxuICAgICAgLnJhbmdlKGZpeGVkID8gZG9tYWluIDogcmFuZ2UpO1xuICB9XG5cbiAgZ2V0UG9pbnRzQm91bmRzKGFsbERhdGEsIGdldFBvc2l0aW9uKSB7XG4gICAgLy8gbm8gbmVlZCB0byBsb29wIHRocm91Z2ggdGhlIGVudGlyZSBkYXRhc2V0XG4gICAgLy8gZ2V0IGEgc2FtcGxlIG9mIGRhdGEgdG8gY2FsY3VsYXRlIGJvdW5kc1xuICAgIGNvbnN0IHNhbXBsZURhdGEgPVxuICAgICAgYWxsRGF0YS5sZW5ndGggPiBNQVhfU0FNUExFX1NJWkVcbiAgICAgICAgPyBnZXRTYW1wbGVEYXRhKGFsbERhdGEsIE1BWF9TQU1QTEVfU0laRSlcbiAgICAgICAgOiBhbGxEYXRhO1xuICAgIGNvbnN0IHBvaW50cyA9IHNhbXBsZURhdGEubWFwKGdldFBvc2l0aW9uKTtcblxuICAgIGNvbnN0IGxhdEJvdW5kcyA9IGdldExhdExuZ0JvdW5kcyhwb2ludHMsIDEsIFstOTAsIDkwXSk7XG4gICAgY29uc3QgbG5nQm91bmRzID0gZ2V0TGF0TG5nQm91bmRzKHBvaW50cywgMCwgWy0xODAsIDE4MF0pO1xuXG4gICAgaWYgKCFsYXRCb3VuZHMgfHwgIWxuZ0JvdW5kcykge1xuICAgICAgcmV0dXJuIG51bGw7XG4gICAgfVxuXG4gICAgcmV0dXJuIFtsbmdCb3VuZHNbMF0sIGxhdEJvdW5kc1swXSwgbG5nQm91bmRzWzFdLCBsYXRCb3VuZHNbMV1dO1xuICB9XG5cbiAgZ2V0TGlnaHRTZXR0aW5nc0Zyb21Cb3VuZHMoYm91bmRzKSB7XG4gICAgcmV0dXJuIEFycmF5LmlzQXJyYXkoYm91bmRzKSAmJiBib3VuZHMubGVuZ3RoID49IDRcbiAgICAgID8ge1xuICAgICAgICAgIC4uLkRFRkFVTFRfTElHSFRfU0VUVElOR1MsXG4gICAgICAgICAgbGlnaHRzUG9zaXRpb246IFtcbiAgICAgICAgICAgIC4uLmJvdW5kcy5zbGljZSgwLCAyKSxcbiAgICAgICAgICAgIERFRkFVTFRfTElHSFRfU0VUVElOR1MubGlnaHRzUG9zaXRpb25bMl0sXG4gICAgICAgICAgICAuLi5ib3VuZHMuc2xpY2UoMiwgNCksXG4gICAgICAgICAgICBERUZBVUxUX0xJR0hUX1NFVFRJTkdTLmxpZ2h0c1Bvc2l0aW9uWzVdXG4gICAgICAgICAgXVxuICAgICAgICB9XG4gICAgICA6IERFRkFVTFRfTElHSFRfU0VUVElOR1M7XG4gIH1cblxuICBnZXRFbmNvZGVkQ2hhbm5lbFZhbHVlKFxuICAgIHNjYWxlLFxuICAgIGRhdGEsXG4gICAgZmllbGQsXG4gICAgZGVmYXVsdFZhbHVlID0gTk9fVkFMVUVfQ09MT1IsXG4gICAgZ2V0VmFsdWUgPSBkZWZhdWx0R2V0RmllbGRWYWx1ZVxuICApIHtcbiAgICBjb25zdCB7dHlwZX0gPSBmaWVsZDtcbiAgICBjb25zdCB2YWx1ZSA9IGdldFZhbHVlKGZpZWxkLCBkYXRhKTtcbiAgICBsZXQgYXR0cmlidXRlVmFsdWU7XG4gICAgaWYgKHR5cGUgPT09IEFMTF9GSUVMRF9UWVBFUy50aW1lc3RhbXApIHtcbiAgICAgIC8vIHNob3VsZG4ndCBuZWVkIHRvIGNvbnZlcnQgaGVyZVxuICAgICAgLy8gc2NhbGUgRnVuY3Rpb24gc2hvdWxkIHRha2UgY2FyZSBvZiBpdFxuICAgICAgYXR0cmlidXRlVmFsdWUgPSBzY2FsZShuZXcgRGF0ZSh2YWx1ZSkpO1xuICAgIH0gZWxzZSB7XG4gICAgICBhdHRyaWJ1dGVWYWx1ZSA9IHNjYWxlKHZhbHVlKTtcbiAgICB9XG5cbiAgICBpZiAoIWF0dHJpYnV0ZVZhbHVlKSB7XG4gICAgICBhdHRyaWJ1dGVWYWx1ZSA9IGRlZmF1bHRWYWx1ZTtcbiAgICB9XG5cbiAgICByZXR1cm4gYXR0cmlidXRlVmFsdWU7XG4gIH1cblxuICB1cGRhdGVNZXRhKG1ldGEpIHtcbiAgICB0aGlzLm1ldGEgPSB7Li4udGhpcy5tZXRhLCAuLi5tZXRhfTtcbiAgfVxuXG4gIC8qKlxuICAgKiBoZWxwZXIgZnVuY3Rpb24gdG8gdXBkYXRlIG9uZSBsYXllciBkb21haW4gd2hlbiBzdGF0ZS5kYXRhIGNoYW5nZWRcbiAgICogaWYgc3RhdGUuZGF0YSBjaGFuZ2UgaXMgZHVlIG90IHVwZGF0ZSBmaWx0ZXIsIG5ld0ZpbGVyIHdpbGwgYmUgcGFzc2VkXG4gICAqIGNhbGxlZCBieSB1cGRhdGVBbGxMYXllckRvbWFpbkRhdGFcbiAgICogQHBhcmFtIHtPYmplY3R9IGRhdGFzZXRcbiAgICogQHBhcmFtIHtPYmplY3R9IG5ld0ZpbHRlclxuICAgKiBAcmV0dXJucyB7b2JqZWN0fSBsYXllclxuICAgKi9cbiAgdXBkYXRlTGF5ZXJEb21haW4oZGF0YXNldCwgbmV3RmlsdGVyKSB7XG4gICAgT2JqZWN0LnZhbHVlcyh0aGlzLnZpc3VhbENoYW5uZWxzKS5mb3JFYWNoKGNoYW5uZWwgPT4ge1xuICAgICAgY29uc3Qge3NjYWxlfSA9IGNoYW5uZWw7XG4gICAgICBjb25zdCBzY2FsZVR5cGUgPSB0aGlzLmNvbmZpZ1tzY2FsZV07XG4gICAgICAvLyBvcmRpbmFsIGRvbWFpbiBpcyBiYXNlZCBvbiBhbGxEYXRhLCBpZiBvbmx5IGZpbHRlciBjaGFuZ2VkXG4gICAgICAvLyBubyBuZWVkIHRvIHVwZGF0ZSBvcmRpbmFsIGRvbWFpblxuICAgICAgaWYgKCFuZXdGaWx0ZXIgfHwgc2NhbGVUeXBlICE9PSBTQ0FMRV9UWVBFUy5vcmRpbmFsKSB7XG4gICAgICAgIGNvbnN0IHtkb21haW59ID0gY2hhbm5lbDtcbiAgICAgICAgY29uc3QgdXBkYXRlZERvbWFpbiA9IHRoaXMuY2FsY3VsYXRlTGF5ZXJEb21haW4oZGF0YXNldCwgY2hhbm5lbCk7XG5cbiAgICAgICAgdGhpcy51cGRhdGVMYXllckNvbmZpZyh7W2RvbWFpbl06IHVwZGF0ZWREb21haW59KTtcbiAgICAgIH1cbiAgICB9KTtcblxuICAgIHJldHVybiB0aGlzO1xuICB9XG5cbiAgLyoqXG4gICAqIFZhbGlkYXRlIHZpc3VhbCBjaGFubmVsIGZpZWxkIGFuZCBzY2FsZXMgYmFzZWQgb24gc3VwcG9ydGVkIGZpZWxkICYgc2NhbGUgdHlwZVxuICAgKiBAcGFyYW0gY2hhbm5lbFxuICAgKi9cbiAgdmFsaWRhdGVWaXN1YWxDaGFubmVsKGNoYW5uZWwpIHtcbiAgICB0aGlzLnZhbGlkYXRlRmllbGRUeXBlKGNoYW5uZWwpO1xuICAgIHRoaXMudmFsaWRhdGVTY2FsZShjaGFubmVsKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBWYWxpZGF0ZSBmaWVsZCB0eXBlIGJhc2VkIG9uIGNoYW5uZWxTY2FsZVR5cGVcbiAgICovXG4gIHZhbGlkYXRlRmllbGRUeXBlKGNoYW5uZWwpIHtcbiAgICBjb25zdCB2aXN1YWxDaGFubmVsID0gdGhpcy52aXN1YWxDaGFubmVsc1tjaGFubmVsXTtcbiAgICBjb25zdCB7ZmllbGQsIGNoYW5uZWxTY2FsZVR5cGUsIHN1cHBvcnRlZEZpZWxkVHlwZXN9ID0gdmlzdWFsQ2hhbm5lbDtcblxuICAgIGlmICh0aGlzLmNvbmZpZ1tmaWVsZF0pIHtcbiAgICAgIC8vIGlmIGZpZWxkIGlzIHNlbGVjdGVkLCBjaGVjayBpZiBmaWVsZCB0eXBlIGlzIHN1cHBvcnRlZFxuICAgICAgY29uc3QgY2hhbm5lbFN1cHBvcnRlZEZpZWxkVHlwZXMgPSBzdXBwb3J0ZWRGaWVsZFR5cGVzIHx8IENIQU5ORUxfU0NBTEVfU1VQUE9SVEVEX0ZJRUxEU1tjaGFubmVsU2NhbGVUeXBlXTtcblxuICAgICAgaWYgKCFjaGFubmVsU3VwcG9ydGVkRmllbGRUeXBlcy5pbmNsdWRlcyh0aGlzLmNvbmZpZ1tmaWVsZF0udHlwZSkpIHtcbiAgICAgICAgLy8gZmllbGQgdHlwZSBpcyBub3Qgc3VwcG9ydGVkLCBzZXQgaXQgYmFjayB0byBudWxsXG4gICAgICAgIC8vIHNldCBzY2FsZSBiYWNrIHRvIGRlZmF1bHRcbiAgICAgICAgdGhpcy51cGRhdGVMYXllckNvbmZpZyh7W2ZpZWxkXTogbnVsbH0pO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBWYWxpZGF0ZSBzY2FsZSB0eXBlIGJhc2VkIG9uIGFnZ3JlZ2F0aW9uXG4gICAqL1xuICB2YWxpZGF0ZVNjYWxlKGNoYW5uZWwpIHtcbiAgICBjb25zdCB2aXN1YWxDaGFubmVsID0gdGhpcy52aXN1YWxDaGFubmVsc1tjaGFubmVsXTtcbiAgICBjb25zdCB7c2NhbGV9ID0gdmlzdWFsQ2hhbm5lbDtcbiAgICBpZiAoIXNjYWxlKSB7XG4gICAgICAvLyB2aXN1YWxDaGFubmVsIGRvZXNuJ3QgaGF2ZSBzY2FsZVxuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBjb25zdCBzY2FsZU9wdGlvbnMgPSB0aGlzLmdldFNjYWxlT3B0aW9ucyhjaGFubmVsKTtcbiAgICAvLyBjaGVjayBpZiBjdXJyZW50IHNlbGVjdGVkIHNjYWxlIGlzXG4gICAgLy8gc3VwcG9ydGVkLCBpZiBub3QsIGNoYW5nZSB0byBkZWZhdWx0XG4gICAgaWYgKCFzY2FsZU9wdGlvbnMuaW5jbHVkZXModGhpcy5jb25maWdbc2NhbGVdKSkge1xuICAgICAgdGhpcy51cGRhdGVMYXllckNvbmZpZyh7W3NjYWxlXTogc2NhbGVPcHRpb25zWzBdfSk7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIEdldCBzY2FsZSBvcHRpb25zIGJhc2VkIG9uIGN1cnJlbnQgZmllbGRcbiAgICogQHBhcmFtIHtzdHJpbmd9IGNoYW5uZWxcbiAgICogQHJldHVybnMge3N0cmluZ1tdfVxuICAgKi9cbiAgZ2V0U2NhbGVPcHRpb25zKGNoYW5uZWwpIHtcbiAgICBjb25zdCB2aXN1YWxDaGFubmVsID0gdGhpcy52aXN1YWxDaGFubmVsc1tjaGFubmVsXTtcbiAgICBjb25zdCB7ZmllbGQsIHNjYWxlLCBjaGFubmVsU2NhbGVUeXBlfSA9IHZpc3VhbENoYW5uZWw7XG5cbiAgICByZXR1cm4gdGhpcy5jb25maWdbZmllbGRdID9cbiAgICAgIEZJRUxEX09QVFNbdGhpcy5jb25maWdbZmllbGRdLnR5cGVdLnNjYWxlW2NoYW5uZWxTY2FsZVR5cGVdIDpcbiAgICAgIFt0aGlzLmdldERlZmF1bHRMYXllckNvbmZpZygpW3NjYWxlXV07XG4gIH1cblxuICB1cGRhdGVMYXllclZpc3VhbENoYW5uZWwoZGF0YXNldCwgY2hhbm5lbCkge1xuICAgIGNvbnN0IHZpc3VhbENoYW5uZWwgPSB0aGlzLnZpc3VhbENoYW5uZWxzW2NoYW5uZWxdO1xuXG4gICAgdGhpcy52YWxpZGF0ZVZpc3VhbENoYW5uZWwoY2hhbm5lbCk7XG4gICAgICAvLyBjYWxjdWxhdGUgbGF5ZXIgY2hhbm5lbCBkb21haW5cbiAgICBjb25zdCB1cGRhdGVkRG9tYWluID0gdGhpcy5jYWxjdWxhdGVMYXllckRvbWFpbihkYXRhc2V0LCB2aXN1YWxDaGFubmVsKTtcblxuICAgIHRoaXMudXBkYXRlTGF5ZXJDb25maWcoe1t2aXN1YWxDaGFubmVsLmRvbWFpbl06IHVwZGF0ZWREb21haW59KTtcbiAgfVxuXG4gIGNhbGN1bGF0ZUxheWVyRG9tYWluKGRhdGFzZXQsIHZpc3VhbENoYW5uZWwpIHtcbiAgICBjb25zdCB7YWxsRGF0YSwgZmlsdGVyZWRJbmRleEZvckRvbWFpbn0gPSBkYXRhc2V0O1xuICAgIGNvbnN0IGRlZmF1bHREb21haW4gPSBbMCwgMV07XG4gICAgY29uc3Qge3NjYWxlfSA9IHZpc3VhbENoYW5uZWw7XG4gICAgY29uc3Qgc2NhbGVUeXBlID0gdGhpcy5jb25maWdbc2NhbGVdO1xuXG4gICAgY29uc3QgZmllbGQgPSB0aGlzLmNvbmZpZ1t2aXN1YWxDaGFubmVsLmZpZWxkXTtcbiAgICBpZiAoIWZpZWxkKSB7XG4gICAgICAvLyBpZiBjb2xvckZpZWxkIG9yIHNpemVGaWVsZCB3ZXJlIHNldCBiYWNrIHRvIG51bGxcbiAgICAgIHJldHVybiBkZWZhdWx0RG9tYWluO1xuICAgIH1cblxuICAgIGlmICghU0NBTEVfVFlQRVNbc2NhbGVUeXBlXSkge1xuICAgICAgQ29uc29sZS5lcnJvcihgc2NhbGUgdHlwZSAke3NjYWxlVHlwZX0gbm90IHN1cHBvcnRlZGApO1xuICAgICAgcmV0dXJuIGRlZmF1bHREb21haW47XG4gICAgfVxuXG4gICAgLy8gVE9ETzogcmVmYWN0b3IgdG8gYWRkIHZhbHVlQWNjZXNzb3IgdG8gZmllbGRcbiAgICBjb25zdCBmaWVsZElkeCA9IGZpZWxkLnRhYmxlRmllbGRJbmRleCAtIDE7XG4gICAgY29uc3QgaXNUaW1lID0gZmllbGQudHlwZSA9PT0gQUxMX0ZJRUxEX1RZUEVTLnRpbWVzdGFtcDtcbiAgICBjb25zdCB2YWx1ZUFjY2Vzc29yID0gbWF5YmVUb0RhdGUuYmluZChcbiAgICAgIG51bGwsXG4gICAgICBpc1RpbWUsXG4gICAgICBmaWVsZElkeCxcbiAgICAgIGZpZWxkLmZvcm1hdFxuICAgICk7XG4gICAgY29uc3QgaW5kZXhWYWx1ZUFjY2Vzc29yID0gaSA9PiB2YWx1ZUFjY2Vzc29yKGFsbERhdGFbaV0pO1xuXG4gICAgY29uc3Qgc29ydEZ1bmN0aW9uID0gZ2V0U29ydGluZ0Z1bmN0aW9uKGZpZWxkLnR5cGUpO1xuXG4gICAgc3dpdGNoIChzY2FsZVR5cGUpIHtcbiAgICAgIGNhc2UgU0NBTEVfVFlQRVMub3JkaW5hbDpcbiAgICAgIGNhc2UgU0NBTEVfVFlQRVMucG9pbnQ6XG4gICAgICAgIC8vIGRvIG5vdCByZWNhbGN1bGF0ZSBvcmRpbmFsIGRvbWFpbiBiYXNlZCBvbiBmaWx0ZXJlZCBkYXRhXG4gICAgICAgIC8vIGRvbid0IG5lZWQgdG8gdXBkYXRlIG9yZGluYWwgZG9tYWluIGV2ZXJ5IHRpbWVcbiAgICAgICAgcmV0dXJuIGdldE9yZGluYWxEb21haW4oYWxsRGF0YSwgdmFsdWVBY2Nlc3Nvcik7XG5cbiAgICAgIGNhc2UgU0NBTEVfVFlQRVMucXVhbnRpbGU6XG4gICAgICAgIHJldHVybiBnZXRRdWFudGlsZURvbWFpbihmaWx0ZXJlZEluZGV4Rm9yRG9tYWluLCBpbmRleFZhbHVlQWNjZXNzb3IsIHNvcnRGdW5jdGlvbik7XG5cbiAgICAgIGNhc2UgU0NBTEVfVFlQRVMucXVhbnRpemU6XG4gICAgICBjYXNlIFNDQUxFX1RZUEVTLmxpbmVhcjpcbiAgICAgIGNhc2UgU0NBTEVfVFlQRVMuc3FydDpcbiAgICAgIGRlZmF1bHQ6XG4gICAgICAgIHJldHVybiBnZXRMaW5lYXJEb21haW4oZmlsdGVyZWRJbmRleEZvckRvbWFpbiwgaW5kZXhWYWx1ZUFjY2Vzc29yKTtcbiAgICB9XG4gIH1cblxuICBpc0xheWVySG92ZXJlZChvYmplY3RJbmZvKSB7XG4gICAgcmV0dXJuIChcbiAgICAgIG9iamVjdEluZm8gJiZcbiAgICAgIG9iamVjdEluZm8ubGF5ZXIgJiZcbiAgICAgIG9iamVjdEluZm8ucGlja2VkICYmXG4gICAgICBvYmplY3RJbmZvLmxheWVyLnByb3BzLmlkID09PSB0aGlzLmlkXG4gICAgKTtcbiAgfVxuXG4gIGdldFJhZGl1c1NjYWxlQnlab29tKG1hcFN0YXRlLCBmaXhlZFJhZGl1cykge1xuICAgIGNvbnN0IHJhZGl1c0NoYW5uZWwgPSBPYmplY3QudmFsdWVzKHRoaXMudmlzdWFsQ2hhbm5lbHMpLmZpbmQoXG4gICAgICB2YyA9PiB2Yy5wcm9wZXJ0eSA9PT0gJ3JhZGl1cydcbiAgICApO1xuXG4gICAgaWYgKCFyYWRpdXNDaGFubmVsKSB7XG4gICAgICByZXR1cm4gMTtcbiAgICB9XG5cbiAgICBjb25zdCBmaWVsZCA9IHJhZGl1c0NoYW5uZWwuZmllbGQ7XG4gICAgY29uc3QgZml4ZWQgPVxuICAgICAgZml4ZWRSYWRpdXMgPT09IHVuZGVmaW5lZFxuICAgICAgICA/IHRoaXMuY29uZmlnLnZpc0NvbmZpZy5maXhlZFJhZGl1c1xuICAgICAgICA6IGZpeGVkUmFkaXVzO1xuICAgIGNvbnN0IHtyYWRpdXN9ID0gdGhpcy5jb25maWcudmlzQ29uZmlnO1xuXG4gICAgcmV0dXJuIGZpeGVkXG4gICAgICA/IDFcbiAgICAgIDogKHRoaXMuY29uZmlnW2ZpZWxkXSA/IDEgOiByYWRpdXMpICogdGhpcy5nZXRab29tRmFjdG9yKG1hcFN0YXRlKTtcbiAgfVxuXG4gIHNob3VsZENhbGN1bGF0ZUxheWVyRGF0YShwcm9wcykge1xuICAgIHJldHVybiBwcm9wcy5zb21lKHAgPT4gIXRoaXMubm9uZUxheWVyRGF0YUFmZmVjdGluZ1Byb3BzLmluY2x1ZGVzKHApKTtcbiAgfVxufVxuIl19