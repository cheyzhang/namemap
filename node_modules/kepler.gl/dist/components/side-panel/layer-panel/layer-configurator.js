'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.AggregationTypeSelector = exports.AggrColorScaleSelector = exports.ChannelByValueSelector = exports.ColorRangeConfig = exports.ArcLayerColorSelector = exports.LayerColorSelector = exports.HowToButton = exports.default = undefined;

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

var _class, _temp;

var _templateObject = (0, _taggedTemplateLiteral3.default)(['\n  position: relative;\n  margin-top: 12px;\n'], ['\n  position: relative;\n  margin-top: 12px;\n']),
    _templateObject2 = (0, _taggedTemplateLiteral3.default)(['\n  margin-top: 12px;\n'], ['\n  margin-top: 12px;\n']),
    _templateObject3 = (0, _taggedTemplateLiteral3.default)(['\n  position: absolute;\n  right: 0;\n  top: 0;\n'], ['\n  position: absolute;\n  right: 0;\n  top: 0;\n']); // Copyright (c) 2018 Uber Technologies, Inc.
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

var _styledComponents3 = require('../../common/styled-components');

var _itemSelector = require('../../common/item-selector/item-selector');

var _itemSelector2 = _interopRequireDefault(_itemSelector);

var _visConfigByFieldSelector = require('./vis-config-by-field-selector');

var _visConfigByFieldSelector2 = _interopRequireDefault(_visConfigByFieldSelector);

var _layerColumnConfig = require('./layer-column-config');

var _layerColumnConfig2 = _interopRequireDefault(_layerColumnConfig);

var _layerTypeSelector = require('./layer-type-selector');

var _layerTypeSelector2 = _interopRequireDefault(_layerTypeSelector);

var _dimensionScaleSelector = require('./dimension-scale-selector');

var _dimensionScaleSelector2 = _interopRequireDefault(_dimensionScaleSelector);

var _colorSelector = require('./color-selector');

var _colorSelector2 = _interopRequireDefault(_colorSelector);

var _sourceDataSelector = require('../source-data-selector');

var _sourceDataSelector2 = _interopRequireDefault(_sourceDataSelector);

var _visConfigSwitch = require('./vis-config-switch');

var _visConfigSwitch2 = _interopRequireDefault(_visConfigSwitch);

var _visConfigSlider = require('./vis-config-slider');

var _visConfigSlider2 = _interopRequireDefault(_visConfigSlider);

var _layerConfigGroup = require('./layer-config-group');

var _layerConfigGroup2 = _interopRequireDefault(_layerConfigGroup);

var _textLabelPanel = require('./text-label-panel');

var _textLabelPanel2 = _interopRequireDefault(_textLabelPanel);

var _layerFactory = require('../../../layers/layer-factory');

var _utils = require('../../../utils/utils');

var _defaultSettings = require('../../../constants/default-settings');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var StyledLayerConfigurator = _styledComponents2.default.div.attrs({
  className: 'layer-panel__config'
})(_templateObject);

var StyledLayerVisualConfigurator = _styledComponents2.default.div.attrs({
  className: 'layer-panel__config__visualC-config'
})(_templateObject2);

var LayerConfigurator = (_temp = _class = function (_Component) {
  (0, _inherits3.default)(LayerConfigurator, _Component);

  function LayerConfigurator() {
    (0, _classCallCheck3.default)(this, LayerConfigurator);
    return (0, _possibleConstructorReturn3.default)(this, (LayerConfigurator.__proto__ || Object.getPrototypeOf(LayerConfigurator)).apply(this, arguments));
  }

  (0, _createClass3.default)(LayerConfigurator, [{
    key: '_renderPointLayerConfig',
    value: function _renderPointLayerConfig(props) {
      return this._renderScatterplotLayerConfig(props);
    }
  }, {
    key: '_renderIconLayerConfig',
    value: function _renderIconLayerConfig(props) {
      return this._renderScatterplotLayerConfig(props);
    }
  }, {
    key: '_renderScatterplotLayerConfig',
    value: function _renderScatterplotLayerConfig(_ref) {
      var layer = _ref.layer,
          visConfiguratorProps = _ref.visConfiguratorProps,
          layerChannelConfigProps = _ref.layerChannelConfigProps,
          layerConfiguratorProps = _ref.layerConfiguratorProps;

      return _react2.default.createElement(
        StyledLayerVisualConfigurator,
        null,
        _react2.default.createElement(
          _layerConfigGroup2.default,
          { label: 'color' },
          layer.config.colorField ? _react2.default.createElement(ColorRangeConfig, visConfiguratorProps) : _react2.default.createElement(LayerColorSelector, layerConfiguratorProps),
          _react2.default.createElement(ChannelByValueSelector, (0, _extends4.default)({
            channel: layer.visualChannels.color
          }, layerChannelConfigProps)),
          _react2.default.createElement(_visConfigSlider2.default, (0, _extends4.default)({}, _layerFactory.LAYER_VIS_CONFIGS.opacity, visConfiguratorProps))
        ),
        _react2.default.createElement(
          _layerConfigGroup2.default,
          { label: 'radius' },
          !layer.config.sizeField ? _react2.default.createElement(_visConfigSlider2.default, (0, _extends4.default)({}, _layerFactory.LAYER_VIS_CONFIGS.radius, visConfiguratorProps, {
            label: false,
            disabled: Boolean(layer.config.sizeField)
          })) : _react2.default.createElement(_visConfigSlider2.default, (0, _extends4.default)({}, _layerFactory.LAYER_VIS_CONFIGS.radiusRange, visConfiguratorProps, {
            disabled: !layer.config.sizeField || layer.config.visConfig.fixedRadius
          })),
          _react2.default.createElement(ChannelByValueSelector, (0, _extends4.default)({
            channel: layer.visualChannels.size
          }, layerChannelConfigProps)),
          layer.config.sizeField ? _react2.default.createElement(_visConfigSwitch2.default, (0, _extends4.default)({}, _layerFactory.LAYER_VIS_CONFIGS.fixedRadius, visConfiguratorProps, {
            disabled: !layer.config.sizeField
          })) : null
        ),
        layer.type === _defaultSettings.LAYER_TYPES.point ? _react2.default.createElement(
          _layerConfigGroup2.default,
          (0, _extends4.default)({}, _layerFactory.LAYER_VIS_CONFIGS.outline, visConfiguratorProps),
          _react2.default.createElement(_visConfigSlider2.default, (0, _extends4.default)({}, _layerFactory.LAYER_VIS_CONFIGS.thickness, visConfiguratorProps, {
            label: false,
            disabled: !layer.config.visConfig.outline
          }))
        ) : null,
        _react2.default.createElement(_textLabelPanel2.default, {
          visConfiguratorProps: visConfiguratorProps,
          layerConfiguratorProps: layerConfiguratorProps,
          textLabel: layer.config.textLabel
        }),
        _react2.default.createElement(_layerConfigGroup2.default, (0, _extends4.default)({}, _layerFactory.LAYER_VIS_CONFIGS['hi-precision'], visConfiguratorProps))
      );
    }
  }, {
    key: '_renderClusterLayerConfig',
    value: function _renderClusterLayerConfig(_ref2) {
      var layer = _ref2.layer,
          visConfiguratorProps = _ref2.visConfiguratorProps,
          layerConfiguratorProps = _ref2.layerConfiguratorProps,
          layerChannelConfigProps = _ref2.layerChannelConfigProps;

      return _react2.default.createElement(
        StyledLayerVisualConfigurator,
        null,
        _react2.default.createElement(
          _layerConfigGroup2.default,
          { label: 'color' },
          _react2.default.createElement(ColorRangeConfig, visConfiguratorProps),
          _react2.default.createElement(AggrColorScaleSelector, layerConfiguratorProps),
          _react2.default.createElement(ChannelByValueSelector, (0, _extends4.default)({
            channel: layer.visualChannels.color
          }, layerChannelConfigProps)),
          layer.visConfigSettings.colorAggregation.condition(layer.config) ? _react2.default.createElement(AggregationTypeSelector, (0, _extends4.default)({}, layer.visConfigSettings.colorAggregation, layerChannelConfigProps, {
            channel: layer.visualChannels.color
          })) : null,
          _react2.default.createElement(_visConfigSlider2.default, (0, _extends4.default)({}, layer.visConfigSettings.opacity, visConfiguratorProps))
        ),
        _react2.default.createElement(
          _layerConfigGroup2.default,
          { label: 'radius' },
          _react2.default.createElement(_visConfigSlider2.default, (0, _extends4.default)({}, layer.visConfigSettings.clusterRadius, visConfiguratorProps)),
          _react2.default.createElement(_visConfigSlider2.default, (0, _extends4.default)({}, layer.visConfigSettings.radiusRange, visConfiguratorProps))
        )
      );
    }
  }, {
    key: '_renderHeatmapLayerConfig',
    value: function _renderHeatmapLayerConfig(_ref3) {
      var layer = _ref3.layer,
          visConfiguratorProps = _ref3.visConfiguratorProps,
          layerConfiguratorProps = _ref3.layerConfiguratorProps,
          layerChannelConfigProps = _ref3.layerChannelConfigProps;

      return _react2.default.createElement(
        StyledLayerVisualConfigurator,
        null,
        _react2.default.createElement(
          _layerConfigGroup2.default,
          { label: 'color' },
          _react2.default.createElement(ColorRangeConfig, visConfiguratorProps),
          _react2.default.createElement(_visConfigSlider2.default, (0, _extends4.default)({}, layer.visConfigSettings.opacity, visConfiguratorProps))
        ),
        _react2.default.createElement(
          _layerConfigGroup2.default,
          { label: 'radius' },
          _react2.default.createElement(_visConfigSlider2.default, (0, _extends4.default)({}, layer.visConfigSettings.radius, visConfiguratorProps, {
            label: false
          }))
        ),
        _react2.default.createElement(
          _layerConfigGroup2.default,
          { label: 'weight' },
          _react2.default.createElement(ChannelByValueSelector, (0, _extends4.default)({
            channel: layer.visualChannels.weight
          }, layerChannelConfigProps))
        )
      );
    }
  }, {
    key: '_renderGridLayerConfig',
    value: function _renderGridLayerConfig(props) {
      return this._renderAggregationLayerConfig(props);
    }
  }, {
    key: '_renderHexagonLayerConfig',
    value: function _renderHexagonLayerConfig(props) {
      return this._renderAggregationLayerConfig(props);
    }
  }, {
    key: '_renderAggregationLayerConfig',
    value: function _renderAggregationLayerConfig(_ref4) {
      var layer = _ref4.layer,
          visConfiguratorProps = _ref4.visConfiguratorProps,
          layerConfiguratorProps = _ref4.layerConfiguratorProps,
          layerChannelConfigProps = _ref4.layerChannelConfigProps;
      var config = layer.config;
      var enable3d = config.visConfig.enable3d;

      var elevationByDescription = 'When off, height is based on count of points';
      var colorByDescription = 'When off, color is based on count of points';

      return _react2.default.createElement(
        StyledLayerVisualConfigurator,
        null,
        _react2.default.createElement(
          _layerConfigGroup2.default,
          { label: 'color' },
          _react2.default.createElement(ColorRangeConfig, visConfiguratorProps),
          _react2.default.createElement(AggrColorScaleSelector, layerConfiguratorProps),
          _react2.default.createElement(ChannelByValueSelector, (0, _extends4.default)({
            channel: layer.visualChannels.color
          }, layerChannelConfigProps)),
          layer.visConfigSettings.colorAggregation.condition(layer.config) ? _react2.default.createElement(AggregationTypeSelector, (0, _extends4.default)({}, layer.visConfigSettings.colorAggregation, layerChannelConfigProps, {
            descreiption: colorByDescription,
            channel: layer.visualChannels.color
          })) : null,
          layer.visConfigSettings.percentile && layer.visConfigSettings.percentile.condition(layer.config) ? _react2.default.createElement(_visConfigSlider2.default, (0, _extends4.default)({}, layer.visConfigSettings.percentile, visConfiguratorProps)) : null,
          _react2.default.createElement(_visConfigSlider2.default, (0, _extends4.default)({}, layer.visConfigSettings.opacity, visConfiguratorProps))
        ),
        _react2.default.createElement(
          _layerConfigGroup2.default,
          { label: 'radius' },
          _react2.default.createElement(_visConfigSlider2.default, (0, _extends4.default)({}, layer.visConfigSettings.worldUnitSize, visConfiguratorProps)),
          _react2.default.createElement(_visConfigSlider2.default, (0, _extends4.default)({}, layer.visConfigSettings.coverage, visConfiguratorProps))
        ),
        layer.visConfigSettings.enable3d ? _react2.default.createElement(
          _layerConfigGroup2.default,
          (0, _extends4.default)({}, layer.visConfigSettings.enable3d, visConfiguratorProps),
          _react2.default.createElement(_visConfigSlider2.default, (0, _extends4.default)({}, layer.visConfigSettings.elevationScale, visConfiguratorProps)),
          _react2.default.createElement(ChannelByValueSelector, (0, _extends4.default)({}, layerChannelConfigProps, {
            channel: layer.visualChannels.size,
            description: elevationByDescription,
            disabled: !enable3d
          })),
          layer.visConfigSettings.sizeAggregation.condition(layer.config) ? _react2.default.createElement(AggregationTypeSelector, (0, _extends4.default)({}, layer.visConfigSettings.sizeAggregation, layerChannelConfigProps, {
            channel: layer.visualChannels.size
          })) : null,
          layer.visConfigSettings.elevationPercentile.condition(layer.config) ? _react2.default.createElement(_visConfigSlider2.default, (0, _extends4.default)({}, layer.visConfigSettings.elevationPercentile, visConfiguratorProps)) : null
        ) : null,
        _react2.default.createElement(_layerConfigGroup2.default, (0, _extends4.default)({}, layer.visConfigSettings['hi-precision'], visConfiguratorProps))
      );
    }

    // TODO: Shan move these into layer class

  }, {
    key: '_renderHexagonIdLayerConfig',
    value: function _renderHexagonIdLayerConfig(_ref5) {
      var layer = _ref5.layer,
          visConfiguratorProps = _ref5.visConfiguratorProps,
          layerConfiguratorProps = _ref5.layerConfiguratorProps,
          layerChannelConfigProps = _ref5.layerChannelConfigProps;

      return _react2.default.createElement(
        StyledLayerVisualConfigurator,
        null,
        _react2.default.createElement(
          _layerConfigGroup2.default,
          { label: 'color' },
          layer.config.colorField ? _react2.default.createElement(ColorRangeConfig, visConfiguratorProps) : _react2.default.createElement(LayerColorSelector, layerConfiguratorProps),
          _react2.default.createElement(ChannelByValueSelector, (0, _extends4.default)({
            channel: layer.visualChannels.color
          }, layerChannelConfigProps)),
          _react2.default.createElement(_visConfigSlider2.default, (0, _extends4.default)({}, _layerFactory.LAYER_VIS_CONFIGS.opacity, visConfiguratorProps))
        ),
        _react2.default.createElement(
          _layerConfigGroup2.default,
          { label: 'coverage' },
          !layer.config.coverageField ? _react2.default.createElement(_visConfigSlider2.default, (0, _extends4.default)({}, layer.visConfigSettings.coverage, visConfiguratorProps)) : _react2.default.createElement(_visConfigSlider2.default, (0, _extends4.default)({}, layer.visConfigSettings.coverageRange, visConfiguratorProps)),
          _react2.default.createElement(ChannelByValueSelector, (0, _extends4.default)({
            channel: layer.visualChannels.coverage
          }, layerChannelConfigProps))
        ),
        _react2.default.createElement(
          _layerConfigGroup2.default,
          (0, _extends4.default)({}, _layerFactory.LAYER_VIS_CONFIGS.enable3d, visConfiguratorProps),
          _react2.default.createElement(ChannelByValueSelector, (0, _extends4.default)({
            channel: layer.visualChannels.size
          }, layerChannelConfigProps)),
          _react2.default.createElement(_visConfigSlider2.default, (0, _extends4.default)({}, _layerFactory.LAYER_VIS_CONFIGS.elevationRange, visConfiguratorProps))
        ),
        _react2.default.createElement(_layerConfigGroup2.default, (0, _extends4.default)({}, _layerFactory.LAYER_VIS_CONFIGS['hi-precision'], visConfiguratorProps))
      );
    }
  }, {
    key: '_renderArcLayerConfig',
    value: function _renderArcLayerConfig(args) {
      return this._renderLineLayerConfig(args);
    }
  }, {
    key: '_renderLineLayerConfig',
    value: function _renderLineLayerConfig(_ref6) {
      var layer = _ref6.layer,
          visConfiguratorProps = _ref6.visConfiguratorProps,
          layerConfiguratorProps = _ref6.layerConfiguratorProps,
          layerChannelConfigProps = _ref6.layerChannelConfigProps;

      return _react2.default.createElement(
        StyledLayerVisualConfigurator,
        null,
        _react2.default.createElement(
          _layerConfigGroup2.default,
          { label: 'color' },
          layer.config.colorField ? _react2.default.createElement(ColorRangeConfig, visConfiguratorProps) : _react2.default.createElement(ArcLayerColorSelector, {
            layer: layer,
            onChangeConfig: layerConfiguratorProps.onChange,
            onChangeVisConfig: visConfiguratorProps.onChange
          }),
          _react2.default.createElement(ChannelByValueSelector, (0, _extends4.default)({
            channel: layer.visualChannels.color
          }, layerChannelConfigProps)),
          _react2.default.createElement(_visConfigSlider2.default, (0, _extends4.default)({}, _layerFactory.LAYER_VIS_CONFIGS.opacity, visConfiguratorProps))
        ),
        _react2.default.createElement(
          _layerConfigGroup2.default,
          { label: 'stroke' },
          layer.config.sizeField ? _react2.default.createElement(_visConfigSlider2.default, (0, _extends4.default)({}, _layerFactory.LAYER_VIS_CONFIGS.strokeWidthRange, visConfiguratorProps, {
            disabled: !layer.config.sizeField
          })) : _react2.default.createElement(_visConfigSlider2.default, (0, _extends4.default)({}, _layerFactory.LAYER_VIS_CONFIGS.thickness, visConfiguratorProps)),
          _react2.default.createElement(ChannelByValueSelector, (0, _extends4.default)({
            channel: layer.visualChannels.size
          }, layerChannelConfigProps))
        ),
        _react2.default.createElement(_layerConfigGroup2.default, (0, _extends4.default)({}, _layerFactory.LAYER_VIS_CONFIGS['hi-precision'], visConfiguratorProps))
      );
    }
  }, {
    key: '_renderGeojsonLayerConfig',
    value: function _renderGeojsonLayerConfig(_ref7) {
      var layer = _ref7.layer,
          visConfiguratorProps = _ref7.visConfiguratorProps,
          layerConfiguratorProps = _ref7.layerConfiguratorProps,
          layerChannelConfigProps = _ref7.layerChannelConfigProps;
      var _layer$meta$featureTy = layer.meta.featureTypes,
          featureTypes = _layer$meta$featureTy === undefined ? {} : _layer$meta$featureTy,
          visConfig = layer.config.visConfig;


      return _react2.default.createElement(
        StyledLayerVisualConfigurator,
        null,
        _react2.default.createElement(
          _layerConfigGroup2.default,
          { label: 'color' },
          featureTypes.polygon ? _react2.default.createElement(_visConfigSwitch2.default, (0, _extends4.default)({}, visConfiguratorProps, _layerFactory.LAYER_VIS_CONFIGS.filled)) : null,
          layer.config.colorField ? _react2.default.createElement(ColorRangeConfig, visConfiguratorProps) : _react2.default.createElement(LayerColorSelector, layerConfiguratorProps),
          _react2.default.createElement(ChannelByValueSelector, (0, _extends4.default)({
            channel: layer.visualChannels.color
          }, layerChannelConfigProps)),
          _react2.default.createElement(_visConfigSlider2.default, (0, _extends4.default)({}, _layerFactory.LAYER_VIS_CONFIGS.opacity, visConfiguratorProps))
        ),
        featureTypes.line || featureTypes.polygon ? _react2.default.createElement(
          _layerConfigGroup2.default,
          (0, _extends4.default)({
            label: 'stroke'
          }, visConfiguratorProps, featureTypes.polygon ? _layerFactory.LAYER_VIS_CONFIGS.stroked : {}),
          visConfig.stroked ? _react2.default.createElement(
            'div',
            null,
            _react2.default.createElement(_visConfigSlider2.default, (0, _extends4.default)({}, _layerFactory.LAYER_VIS_CONFIGS.thickness, visConfiguratorProps)),
            _react2.default.createElement(ChannelByValueSelector, (0, _extends4.default)({
              channel: layer.visualChannels.size
            }, layerChannelConfigProps)),
            _react2.default.createElement(_visConfigSlider2.default, (0, _extends4.default)({}, _layerFactory.LAYER_VIS_CONFIGS.strokeWidthRange, visConfiguratorProps, {
              disabled: !layer.config.sizeField
            }))
          ) : null
        ) : null,
        featureTypes.polygon && visConfig.filled ? _react2.default.createElement(
          _layerConfigGroup2.default,
          (0, _extends4.default)({}, visConfiguratorProps, _layerFactory.LAYER_VIS_CONFIGS.enable3d),
          _react2.default.createElement(_visConfigSlider2.default, (0, _extends4.default)({}, _layerFactory.LAYER_VIS_CONFIGS.elevationScale, visConfiguratorProps)),
          _react2.default.createElement(ChannelByValueSelector, (0, _extends4.default)({
            channel: layer.visualChannels.height
          }, layerChannelConfigProps)),
          _react2.default.createElement(_visConfigSwitch2.default, (0, _extends4.default)({}, visConfiguratorProps, _layerFactory.LAYER_VIS_CONFIGS.wireframe))
        ) : null,
        featureTypes.point ? _react2.default.createElement(
          'div',
          null,
          _react2.default.createElement(_visConfigSlider2.default, (0, _extends4.default)({}, _layerFactory.LAYER_VIS_CONFIGS.radius, visConfiguratorProps, {
            label: 'Point Radius',
            disabled: Boolean(layer.config.radiusField)
          })),
          _react2.default.createElement(ChannelByValueSelector, (0, _extends4.default)({
            channel: layer.visualChannels.radius
          }, layerChannelConfigProps)),
          _react2.default.createElement(_visConfigSlider2.default, (0, _extends4.default)({}, _layerFactory.LAYER_VIS_CONFIGS.radiusRange, visConfiguratorProps, {
            disabled: !layer.config.radiusField
          }))
        ) : null,
        _react2.default.createElement(_layerConfigGroup2.default, (0, _extends4.default)({}, _layerFactory.LAYER_VIS_CONFIGS['hi-precision'], visConfiguratorProps))
      );
    }
  }, {
    key: 'render',
    value: function render() {
      var _this2 = this;

      var _props = this.props,
          layer = _props.layer,
          datasets = _props.datasets,
          updateLayerConfig = _props.updateLayerConfig,
          layerTypeOptions = _props.layerTypeOptions,
          updateLayerType = _props.updateLayerType;

      var _ref8 = layer.config.dataId ? datasets[layer.config.dataId] : {},
          _ref8$fields = _ref8.fields,
          fields = _ref8$fields === undefined ? [] : _ref8$fields,
          fieldPairs = _ref8.fieldPairs;

      var config = layer.config;


      var commonConfigProp = {
        layer: layer,
        fields: fields
      };

      var visConfiguratorProps = (0, _extends4.default)({}, commonConfigProp, {
        onChange: this.props.updateLayerVisConfig
      });

      var layerConfiguratorProps = (0, _extends4.default)({}, commonConfigProp, {
        onChange: updateLayerConfig
      });

      var layerChannelConfigProps = (0, _extends4.default)({}, commonConfigProp, {
        onChange: this.props.updateLayerVisualChannelConfig
      });

      var renderTemplate = layer.type && '_render' + (0, _utils.capitalizeFirstLetter)(layer.type) + 'LayerConfig';

      return _react2.default.createElement(
        StyledLayerConfigurator,
        null,
        layer.layerInfoModal ? _react2.default.createElement(HowToButton, { onClick: function onClick() {
            return _this2.props.openModal(layer.layerInfoModal);
          } }) : null,
        _react2.default.createElement(
          _layerConfigGroup2.default,
          { label: 'basic' },
          Object.keys(datasets).length > 1 && _react2.default.createElement(_sourceDataSelector2.default, {
            datasets: datasets,
            id: layer.id,
            disabled: layer.tyep && config.columns,
            dataId: config.dataId,
            onSelect: function onSelect(value) {
              return updateLayerConfig({ dataId: value });
            }
          }),
          _react2.default.createElement(_layerTypeSelector2.default, {
            layer: layer,
            layerTypeOptions: layerTypeOptions,
            onSelect: updateLayerType
          }),
          _react2.default.createElement(_layerColumnConfig2.default, {
            layer: layer,
            fields: fields,
            fieldPairs: fieldPairs,
            updateLayerConfig: updateLayerConfig,
            updateLayerType: this.props.updateLayerType
          })
        ),
        this[renderTemplate] && this[renderTemplate]({
          layer: layer,
          visConfiguratorProps: visConfiguratorProps,
          layerChannelConfigProps: layerChannelConfigProps,
          layerConfiguratorProps: layerConfiguratorProps
        })
      );
    }
  }]);
  return LayerConfigurator;
}(_react.Component), _class.propTypes = {
  layer: _propTypes2.default.object.isRequired,
  datasets: _propTypes2.default.object.isRequired,
  layerTypeOptions: _propTypes2.default.arrayOf(_propTypes2.default.any).isRequired,
  openModal: _propTypes2.default.func.isRequired,
  updateLayerConfig: _propTypes2.default.func.isRequired,
  updateLayerType: _propTypes2.default.func.isRequired,
  updateLayerVisConfig: _propTypes2.default.func.isRequired,
  updateLayerVisualChannelConfig: _propTypes2.default.func.isRequired
}, _temp);

/*
 * Componentize config component into pure functional components
 */

exports.default = LayerConfigurator;
var StyledHowToButton = _styledComponents2.default.div(_templateObject3);

var HowToButton = exports.HowToButton = function HowToButton(_ref9) {
  var onClick = _ref9.onClick;
  return _react2.default.createElement(
    StyledHowToButton,
    null,
    _react2.default.createElement(
      _styledComponents3.Button,
      { secondary: true, small: true, onClick: onClick },
      'How to'
    )
  );
};

var LayerColorSelector = exports.LayerColorSelector = function LayerColorSelector(_ref10) {
  var layer = _ref10.layer,
      onChange = _ref10.onChange,
      label = _ref10.label;
  return _react2.default.createElement(
    _styledComponents3.SidePanelSection,
    { disabled: layer.config.colorField },
    _react2.default.createElement(_colorSelector2.default, {
      colorSets: [{
        selectedColor: layer.config.color,
        setColor: function setColor(rgbValue) {
          return onChange({ color: rgbValue });
        }
      }]
    })
  );
};

var ArcLayerColorSelector = exports.ArcLayerColorSelector = function ArcLayerColorSelector(_ref11) {
  var layer = _ref11.layer,
      onChangeConfig = _ref11.onChangeConfig,
      onChangeVisConfig = _ref11.onChangeVisConfig;
  return _react2.default.createElement(
    _styledComponents3.SidePanelSection,
    null,
    _react2.default.createElement(_colorSelector2.default, {
      colorSets: [{
        selectedColor: layer.config.color,
        setColor: function setColor(rgbValue) {
          return onChangeConfig({ color: rgbValue });
        },
        label: 'Source'
      }, {
        selectedColor: layer.config.visConfig.targetColor || layer.config.color,
        setColor: function setColor(rgbValue) {
          return onChangeVisConfig({ targetColor: rgbValue });
        },
        label: 'Target'
      }]
    })
  );
};

var ColorRangeConfig = exports.ColorRangeConfig = function ColorRangeConfig(_ref12) {
  var layer = _ref12.layer,
      onChange = _ref12.onChange;
  return _react2.default.createElement(
    _styledComponents3.SidePanelSection,
    null,
    _react2.default.createElement(_colorSelector2.default, {
      colorSets: [{
        selectedColor: layer.config.visConfig.colorRange,
        isRange: true,
        setColor: function setColor(colorRange) {
          return onChange({ colorRange: colorRange });
        }
      }]
    })
  );
};

var ChannelByValueSelector = exports.ChannelByValueSelector = function ChannelByValueSelector(_ref13) {
  var layer = _ref13.layer,
      channel = _ref13.channel,
      onChange = _ref13.onChange,
      fields = _ref13.fields,
      description = _ref13.description;
  var channelScaleType = channel.channelScaleType,
      domain = channel.domain,
      field = channel.field,
      key = channel.key,
      property = channel.property,
      range = channel.range,
      scale = channel.scale,
      defaultMeasure = channel.defaultMeasure,
      supportedFieldTypes = channel.supportedFieldTypes;

  var channelSupportedFieldTypes = supportedFieldTypes || _defaultSettings.CHANNEL_SCALE_SUPPORTED_FIELDS[channelScaleType];
  var supportedFields = fields.filter(function (_ref14) {
    var type = _ref14.type;
    return channelSupportedFieldTypes.includes(type);
  });
  var scaleOptions = layer.getScaleOptions(channel.key);
  var showScale = !layer.isAggregated && layer.config[scale] && scaleOptions.length > 1;
  var defaultDescription = 'Calculate ' + property + ' based on selected field';

  return _react2.default.createElement(_visConfigByFieldSelector2.default, {
    channel: channel.key,
    description: description || defaultDescription,
    domain: layer.config[domain],
    fields: supportedFields,
    id: layer.id,
    key: key + '-channel-selector',
    property: property,
    placeholder: defaultMeasure || 'Select a field',
    range: layer.config.visConfig[range],
    scaleOptions: scaleOptions,
    scaleType: scale ? layer.config[scale] : null,
    selectedField: layer.config[field],
    showScale: showScale,
    updateField: function updateField(val) {
      return onChange((0, _defineProperty3.default)({}, field, val), key);
    },
    updateScale: function updateScale(val) {
      return onChange((0, _defineProperty3.default)({}, scale, val), key);
    }
  });
};

var AggrColorScaleSelector = exports.AggrColorScaleSelector = function AggrColorScaleSelector(_ref15) {
  var layer = _ref15.layer,
      onChange = _ref15.onChange;

  var scaleOptions = layer.getScaleOptions('color');
  return Array.isArray(scaleOptions) && scaleOptions.length > 1 ? _react2.default.createElement(_dimensionScaleSelector2.default, {
    label: 'Color Scale',
    options: scaleOptions,
    scaleType: layer.config.colorScale,
    onSelect: function onSelect(val) {
      return onChange({ colorScale: val }, 'color');
    }
  }) : null;
};

var AggregationTypeSelector = exports.AggregationTypeSelector = function AggregationTypeSelector(_ref16) {
  var layer = _ref16.layer,
      channel = _ref16.channel,
      _onChange3 = _ref16.onChange;
  var field = channel.field,
      aggregation = channel.aggregation,
      key = channel.key;

  var selectedField = layer.config[field];
  var visConfig = layer.config.visConfig;

  // aggregation should only be selectable when field is selected

  var aggregationOptions = layer.getAggregationOptions(key);

  return _react2.default.createElement(
    _styledComponents3.SidePanelSection,
    null,
    _react2.default.createElement(
      _styledComponents3.PanelLabel,
      null,
      'Aggregate ' + selectedField.name + ' by'
    ),
    _react2.default.createElement(_itemSelector2.default, {
      selectedItems: visConfig[aggregation],
      options: aggregationOptions,
      multiSelect: false,
      searchable: false,
      onChange: function onChange(value) {
        return _onChange3({
          visConfig: (0, _extends4.default)({}, layer.config.visConfig, (0, _defineProperty3.default)({}, aggregation, value))
        }, channel.key);
      }
    })
  );
};
/* eslint-enable max-params */
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9jb21wb25lbnRzL3NpZGUtcGFuZWwvbGF5ZXItcGFuZWwvbGF5ZXItY29uZmlndXJhdG9yLmpzIl0sIm5hbWVzIjpbIlN0eWxlZExheWVyQ29uZmlndXJhdG9yIiwic3R5bGVkIiwiZGl2IiwiYXR0cnMiLCJjbGFzc05hbWUiLCJTdHlsZWRMYXllclZpc3VhbENvbmZpZ3VyYXRvciIsIkxheWVyQ29uZmlndXJhdG9yIiwicHJvcHMiLCJfcmVuZGVyU2NhdHRlcnBsb3RMYXllckNvbmZpZyIsImxheWVyIiwidmlzQ29uZmlndXJhdG9yUHJvcHMiLCJsYXllckNoYW5uZWxDb25maWdQcm9wcyIsImxheWVyQ29uZmlndXJhdG9yUHJvcHMiLCJjb25maWciLCJjb2xvckZpZWxkIiwidmlzdWFsQ2hhbm5lbHMiLCJjb2xvciIsIkxBWUVSX1ZJU19DT05GSUdTIiwib3BhY2l0eSIsInNpemVGaWVsZCIsInJhZGl1cyIsIkJvb2xlYW4iLCJyYWRpdXNSYW5nZSIsInZpc0NvbmZpZyIsImZpeGVkUmFkaXVzIiwic2l6ZSIsInR5cGUiLCJMQVlFUl9UWVBFUyIsInBvaW50Iiwib3V0bGluZSIsInRoaWNrbmVzcyIsInRleHRMYWJlbCIsInZpc0NvbmZpZ1NldHRpbmdzIiwiY29sb3JBZ2dyZWdhdGlvbiIsImNvbmRpdGlvbiIsImNsdXN0ZXJSYWRpdXMiLCJ3ZWlnaHQiLCJfcmVuZGVyQWdncmVnYXRpb25MYXllckNvbmZpZyIsImVuYWJsZTNkIiwiZWxldmF0aW9uQnlEZXNjcmlwdGlvbiIsImNvbG9yQnlEZXNjcmlwdGlvbiIsInBlcmNlbnRpbGUiLCJ3b3JsZFVuaXRTaXplIiwiY292ZXJhZ2UiLCJlbGV2YXRpb25TY2FsZSIsInNpemVBZ2dyZWdhdGlvbiIsImVsZXZhdGlvblBlcmNlbnRpbGUiLCJjb3ZlcmFnZUZpZWxkIiwiY292ZXJhZ2VSYW5nZSIsImVsZXZhdGlvblJhbmdlIiwiYXJncyIsIl9yZW5kZXJMaW5lTGF5ZXJDb25maWciLCJvbkNoYW5nZSIsInN0cm9rZVdpZHRoUmFuZ2UiLCJtZXRhIiwiZmVhdHVyZVR5cGVzIiwicG9seWdvbiIsImZpbGxlZCIsImxpbmUiLCJzdHJva2VkIiwiaGVpZ2h0Iiwid2lyZWZyYW1lIiwicmFkaXVzRmllbGQiLCJkYXRhc2V0cyIsInVwZGF0ZUxheWVyQ29uZmlnIiwibGF5ZXJUeXBlT3B0aW9ucyIsInVwZGF0ZUxheWVyVHlwZSIsImRhdGFJZCIsImZpZWxkcyIsImZpZWxkUGFpcnMiLCJjb21tb25Db25maWdQcm9wIiwidXBkYXRlTGF5ZXJWaXNDb25maWciLCJ1cGRhdGVMYXllclZpc3VhbENoYW5uZWxDb25maWciLCJyZW5kZXJUZW1wbGF0ZSIsImxheWVySW5mb01vZGFsIiwib3Blbk1vZGFsIiwiT2JqZWN0Iiwia2V5cyIsImxlbmd0aCIsImlkIiwidHllcCIsImNvbHVtbnMiLCJ2YWx1ZSIsIkNvbXBvbmVudCIsInByb3BUeXBlcyIsIlByb3BUeXBlcyIsIm9iamVjdCIsImlzUmVxdWlyZWQiLCJhcnJheU9mIiwiYW55IiwiZnVuYyIsIlN0eWxlZEhvd1RvQnV0dG9uIiwiSG93VG9CdXR0b24iLCJvbkNsaWNrIiwiTGF5ZXJDb2xvclNlbGVjdG9yIiwibGFiZWwiLCJzZWxlY3RlZENvbG9yIiwic2V0Q29sb3IiLCJyZ2JWYWx1ZSIsIkFyY0xheWVyQ29sb3JTZWxlY3RvciIsIm9uQ2hhbmdlQ29uZmlnIiwib25DaGFuZ2VWaXNDb25maWciLCJ0YXJnZXRDb2xvciIsIkNvbG9yUmFuZ2VDb25maWciLCJjb2xvclJhbmdlIiwiaXNSYW5nZSIsIkNoYW5uZWxCeVZhbHVlU2VsZWN0b3IiLCJjaGFubmVsIiwiZGVzY3JpcHRpb24iLCJjaGFubmVsU2NhbGVUeXBlIiwiZG9tYWluIiwiZmllbGQiLCJrZXkiLCJwcm9wZXJ0eSIsInJhbmdlIiwic2NhbGUiLCJkZWZhdWx0TWVhc3VyZSIsInN1cHBvcnRlZEZpZWxkVHlwZXMiLCJjaGFubmVsU3VwcG9ydGVkRmllbGRUeXBlcyIsIkNIQU5ORUxfU0NBTEVfU1VQUE9SVEVEX0ZJRUxEUyIsInN1cHBvcnRlZEZpZWxkcyIsImZpbHRlciIsImluY2x1ZGVzIiwic2NhbGVPcHRpb25zIiwiZ2V0U2NhbGVPcHRpb25zIiwic2hvd1NjYWxlIiwiaXNBZ2dyZWdhdGVkIiwiZGVmYXVsdERlc2NyaXB0aW9uIiwidmFsIiwiQWdnckNvbG9yU2NhbGVTZWxlY3RvciIsIkFycmF5IiwiaXNBcnJheSIsImNvbG9yU2NhbGUiLCJBZ2dyZWdhdGlvblR5cGVTZWxlY3RvciIsImFnZ3JlZ2F0aW9uIiwic2VsZWN0ZWRGaWVsZCIsImFnZ3JlZ2F0aW9uT3B0aW9ucyIsImdldEFnZ3JlZ2F0aW9uT3B0aW9ucyIsIm5hbWUiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OzsyS0FBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFFQTs7QUFLQTs7OztBQUVBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7O0FBRUE7O0FBRUE7O0FBRUE7Ozs7QUFLQSxJQUFNQSwwQkFBMEJDLDJCQUFPQyxHQUFQLENBQVdDLEtBQVgsQ0FBaUI7QUFDL0NDLGFBQVc7QUFEb0MsQ0FBakIsQ0FBMUIsaUJBQU47O0FBT0EsSUFBTUMsZ0NBQWdDSiwyQkFBT0MsR0FBUCxDQUFXQyxLQUFYLENBQWlCO0FBQ3JEQyxhQUFXO0FBRDBDLENBQWpCLENBQWhDLGtCQUFOOztJQU1xQkUsaUI7Ozs7Ozs7Ozs7NENBWUtDLEssRUFBTztBQUM3QixhQUFPLEtBQUtDLDZCQUFMLENBQW1DRCxLQUFuQyxDQUFQO0FBQ0Q7OzsyQ0FFc0JBLEssRUFBTztBQUM1QixhQUFPLEtBQUtDLDZCQUFMLENBQW1D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QU1LLDREQUEwQixTQUExQkEsdUJBQTBCLFNBQWdDO0FBQUEsTUFBOUI1SCxLQUE4QixVQUE5QkEsS0FBOEI7QUFBQSxNQUF2QmtHLE9BQXVCLFVBQXZCQSxPQUF1QjtBQUFBLE1BQWR2RCxVQUFjLFVBQWRBLFFBQWM7QUFBQSxNQUM5RDJELEtBRDhELEdBQ25DSixPQURtQyxDQUM5REksS0FEOEQ7QUFBQSxNQUN2RHVCLFdBRHVELEdBQ25DM0IsT0FEbUMsQ0FDdkQyQixXQUR1RDtBQUFBLE1BQzFDdEIsR0FEMEMsR0FDbkNMLE9BRG1DLENBQzFDSyxHQUQwQzs7QUFFckUsTUFBTXVCLGdCQUFnQjlILE1BQU1JLE1BQU4sQ0FBYWtHLEtBQWIsQ0FBdEI7QUFGcUUsTUFHOUR4RixTQUg4RCxHQUdqRGQsTUFBTUksTUFIMkMsQ0FHOURVLFNBSDhEOztBQUtyRTs7QUFDQSxNQUFNaUgscUJBQXFCL0gsTUFBTWdJLHFCQUFOLENBQTRCekIsR0FBNUIsQ0FBM0I7O0FBRUEsU0FDRTtBQUFDLHVDQUFEO0FBQUE7QUFDRTtBQUFDLG1DQUFEO0FBQUE7QUFBQSxxQkFBMEJ1QixjQUFjRyxJQUF4QztBQUFBLEtBREY7QUFFRSxrQ0FBQyxzQkFBRDtBQUNFLHFCQUFlbkgsVUFBVStHLFdBQVYsQ0FEakI7QUFFRSxlQUFTRSxrQkFGWDtBQUdFLG1CQUFhLEtBSGY7QUFJRSxrQkFBWSxLQUpkO0FBS0UsZ0JBQVU7QUFBQSxlQUNScEYsV0FDRTtBQUNFN0IsZ0RBQ0tkLE1BQU1JLE1BQU4sQ0FBYVUsU0FEbEIsb0NBRUcrRyxXQUZILEVBRWlCcEQsS0FGakI7QUFERixTQURGLEVBT0V5QixRQUFRSyxHQVBWLENBRFE7QUFBQTtBQUxaO0FBRkYsR0FERjtBQXNCRCxDQTlCTTtBQStCUCIsImZpbGUiOiJsYXllci1jb25maWd1cmF0b3IuanMiLCJzb3VyY2VzQ29udGVudCI6WyIvLyBDb3B5cmlnaHQgKGMpIDIwMTggVWJlciBUZWNobm9sb2dpZXMsIEluYy5cbi8vXG4vLyBQZXJtaXNzaW9uIGlzIGhlcmVieSBncmFudGVkLCBmcmVlIG9mIGNoYXJnZSwgdG8gYW55IHBlcnNvbiBvYnRhaW5pbmcgYSBjb3B5XG4vLyBvZiB0aGlzIHNvZnR3YXJlIGFuZCBhc3NvY2lhdGVkIGRvY3VtZW50YXRpb24gZmlsZXMgKHRoZSBcIlNvZnR3YXJlXCIpLCB0byBkZWFsXG4vLyBpbiB0aGUgU29mdHdhcmUgd2l0aG91dCByZXN0cmljdGlvbiwgaW5jbHVkaW5nIHdpdGhvdXQgbGltaXRhdGlvbiB0aGUgcmlnaHRzXG4vLyB0byB1c2UsIGNvcHksIG1vZGlmeSwgbWVyZ2UsIHB1Ymxpc2gsIGRpc3RyaWJ1dGUsIHN1YmxpY2Vuc2UsIGFuZC9vciBzZWxsXG4vLyBjb3BpZXMgb2YgdGhlIFNvZnR3YXJlLCBhbmQgdG8gcGVybWl0IHBlcnNvbnMgdG8gd2hvbSB0aGUgU29mdHdhcmUgaXNcbi8vIGZ1cm5pc2hlZCB0byBkbyBzbywgc3ViamVjdCB0byB0aGUgZm9sbG93aW5nIGNvbmRpdGlvbnM6XG4vL1xuLy8gVGhlIGFib3ZlIGNvcHlyaWdodCBub3RpY2UgYW5kIHRoaXMgcGVybWlzc2lvbiBub3RpY2Ugc2hhbGwgYmUgaW5jbHVkZWQgaW5cbi8vIGFsbCBjb3BpZXMgb3Igc3Vic3RhbnRpYWwgcG9ydGlvbnMgb2YgdGhlIFNvZnR3YXJlLlxuLy9cbi8vIFRIRSBTT0ZUV0FSRSBJUyBQUk9WSURFRCBcIkFTIElTXCIsIFdJVEhPVVQgV0FSUkFOVFkgT0YgQU5ZIEtJTkQsIEVYUFJFU1MgT1Jcbi8vIElNUExJRUQsIElOQ0xVRElORyBCVVQgTk9UIExJTUlURUQgVE8gVEhFIFdBUlJBTlRJRVMgT0YgTUVSQ0hBTlRBQklMSVRZLFxuLy8gRklUTkVTUyBGT1IgQSBQQVJUSUNVTEFSIFBVUlBPU0UgQU5EIE5PTklORlJJTkdFTUVOVC4gSU4gTk8gRVZFTlQgU0hBTEwgVEhFXG4vLyBBVVRIT1JTIE9SIENPUFlSSUdIVCBIT0xERVJTIEJFIExJQUJMRSBGT1IgQU5ZIENMQUlNLCBEQU1BR0VTIE9SIE9USEVSXG4vLyBMSUFCSUxJVFksIFdIRVRIRVIgSU4gQU4gQUNUSU9OIE9GIENPTlRSQUNULCBUT1JUIE9SIE9USEVSV0lTRSwgQVJJU0lORyBGUk9NLFxuLy8gT1VUIE9GIE9SIElOIENPTk5FQ1RJT04gV0lUSCBUSEUgU09GVFdBUkUgT1IgVEhFIFVTRSBPUiBPVEhFUiBERUFMSU5HUyBJTlxuLy8gVEhFIFNPRlRXQVJFLlxuXG5pbXBvcnQgUmVhY3QsIHtDb21wb25lbnR9IGZyb20gJ3JlYWN0JztcbmltcG9ydCBQcm9wVHlwZXMgZnJvbSAncHJvcC10eXBlcyc7XG5pbXBvcnQgc3R5bGVkIGZyb20gJ3N0eWxlZC1jb21wb25lbnRzJztcblxuaW1wb3J0IHtcbiAgQnV0dG9uLFxuICBQYW5lbExhYmVsLFxuICBTaWRlUGFuZWxTZWN0aW9uXG59IGZyb20gJ2NvbXBvbmVudHMvY29tbW9uL3N0eWxlZC1jb21wb25lbnRzJztcbmltcG9ydCBJdGVtU2VsZWN0b3IgZnJvbSAnY29tcG9uZW50cy9jb21tb24vaXRlbS1zZWxlY3Rvci9pdGVtLXNlbGVjdG9yJztcblxuaW1wb3J0IFZpc0NvbmZpZ0J5RmllbGRTZWxlY3RvciBmcm9tICcuL3Zpcy1jb25maWctYnktZmllbGQtc2VsZWN0b3InO1xuaW1wb3J0IExheWVyQ29sdW1uQ29uZmlnIGZyb20gJy4vbGF5ZXItY29sdW1uLWNvbmZpZyc7XG5pbXBvcnQgTGF5ZXJUeXBlU2VsZWN0b3IgZnJvbSAnLi9sYXllci10eXBlLXNlbGVjdG9yJztcbmltcG9ydCBEaW1lbnNpb25TY2FsZVNlbGVjdG9yIGZyb20gJy4vZGltZW5zaW9uLXNjYWxlLXNlbGVjdG9yJztcbmltcG9ydCBDb2xvclNlbGVjdG9yIGZyb20gJy4vY29sb3Itc2VsZWN0b3InO1xuaW1wb3J0IFNvdXJjZURhdGFTZWxlY3RvciBmcm9tICcuLi9zb3VyY2UtZGF0YS1zZWxlY3Rvcic7XG5pbXBvcnQgVmlzQ29uZmlnU3dpdGNoIGZyb20gJy4vdmlzLWNvbmZpZy1zd2l0Y2gnO1xuaW1wb3J0IFZpc0NvbmZpZ1NsaWRlciBmcm9tICcuL3Zpcy1jb25maWctc2xpZGVyJztcbmltcG9ydCBMYXllckNvbmZpZ0dyb3VwIGZyb20gJy4vbGF5ZXItY29uZmlnLWdyb3VwJztcbmltcG9ydCBUZXh0TGFiZWxQYW5lbCBmcm9tICcuL3RleHQtbGFiZWwtcGFuZWwnO1xuXG5pbXBvcnQge0xBWUVSX1ZJU19DT05GSUdTfSBmcm9tICdsYXllcnMvbGF5ZXItZmFjdG9yeSc7XG5cbmltcG9ydCB7Y2FwaXRhbGl6ZUZpcnN0TGV0dGVyfSBmcm9tICd1dGlscy91dGlscyc7XG5cbmltcG9ydCB7XG4gIExBWUVSX1RZUEVTLFxuICBDSEFOTkVMX1NDQUxFX1NVUFBPUlRFRF9GSUVMRFNcbn0gZnJvbSAnY29uc3RhbnRzL2RlZmF1bHQtc2V0dGluZ3MnO1xuXG5jb25zdCBTdHlsZWRMYXllckNvbmZpZ3VyYXRvciA9IHN0eWxlZC5kaXYuYXR0cnMoe1xuICBjbGFzc05hbWU6ICdsYXllci1wYW5lbF9fY29uZmlnJ1xufSlgXG4gIHBvc2l0aW9uOiByZWxhdGl2ZTtcbiAgbWFyZ2luLXRvcDogMTJweDtcbmA7XG5cbmNvbnN0IFN0eWxlZExheWVyVmlzdWFsQ29uZmlndXJhdG9yID0gc3R5bGVkLmRpdi5hdHRycyh7XG4gIGNsYXNzTmFtZTogJ2xheWVyLXBhbmVsX19jb25maWdfX3Zpc3VhbEMtY29uZmlnJ1xufSlgXG4gIG1hcmdpbi10b3A6IDEycHg7XG5gO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBMYXllckNvbmZpZ3VyYXRvciBleHRlbmRzIENvbXBvbmVudCB7XG4gIHN0YXRpYyBwcm9wVHlwZXMgPSB7XG4gICAgbGF5ZXI6IFByb3BUeXBlcy5vYmplY3QuaXNSZXF1aXJlZCxcbiAgICBkYXRhc2V0czogUHJvcFR5cGVzLm9iamVjdC5pc1JlcXVpcmVkLFxuICAgIGxheWVyVHlwZU9wdGlvbnM6IFByb3BUeXBlcy5hcnJheU9mKFByb3BUeXBlcy5hbnkpLmlzUmVxdWlyZWQsXG4gICAgb3Blbk1vZGFsOiBQcm9wVHlwZXMuZnVuYy5pc1JlcXVpcmVkLFxuICAgIHVwZGF0ZUxheWVyQ29uZmlnOiBQcm9wVHlwZXMuZnVuYy5pc1JlcXVpcmVkLFxuICAgIHVwZGF0ZUxheWVyVHlwZTogUHJvcFR5cGVzLmZ1bmMuaXNSZXF1aXJlZCxcbiAgICB1cGRhdGVMYXllclZpc0NvbmZpZzogUHJvcFR5cGVzLmZ1bmMuaXNSZXF1aXJlZCxcbiAgICB1cGRhdGVMYXllclZpc3VhbENoYW5uZWxDb25maWc6IFByb3BUeXBlcy5mdW5jLmlzUmVxdWlyZWRcbiAgfTtcblxuICBfcmVuZGVyUG9pbnRMYXllckNvbmZpZyhwcm9wcykge1xuICAgIHJldHVybiB0aGlzLl9yZW5kZXJTY2F0dGVycGxvdExheWVyQ29uZmlnKHByb3BzKTtcbiAgfVxuXG4gIF9yZW5kZXJJY29uTGF5ZXJDb25maWcocHJvcHMpIHtcbiAgICByZXR1cm4gdGhpcy5fcmVuZGVyU2NhdHRlcnBsb3RMYXllckNvbmZpZyhwcm9wcyk7XG4gIH1cblxuICBfcmVuZGVyU2NhdHRlcnBsb3RMYXllckNvbmZpZyh7XG4gICAgbGF5ZXIsXG4gICAgdmlzQ29uZmlndXJhdG9yUHJvcHMsXG4gICAgbGF5ZXJDaGFubmVsQ29uZmlnUHJvcHMsXG4gICAgbGF5ZXJDb25maWd1cmF0b3JQcm9wc1xuICB9KSB7XG4gICAgcmV0dXJuIChcbiAgICAgIDxTdHlsZWRMYXllclZpc3VhbENvbmZpZ3VyYXRvcj5cbiAgICAgICAgey8qIENvbG9yICovfVxuICAgICAgICA8TGF5ZXJDb25maWdHcm91cCBsYWJlbD17J2NvbG9yJ30+XG4gICAgICAgICAge2xheWVyLmNvbmZpZy5jb2xvckZpZWxkID8gKFxuICAgICAgICAgICAgPENvbG9yUmFuZ2VDb25maWcgey4uLnZpc0NvbmZpZ3VyYXRvclByb3BzfSAvPlxuICAgICAgICAgICkgOiAoXG4gICAgICAgICAgICA8TGF5ZXJDb2xvclNlbGVjdG9yIHsuLi5sYXllckNvbmZpZ3VyYXRvclByb3BzfSAvPlxuICAgICAgICAgICl9XG4gICAgICAgICAgPENoYW5uZWxCeVZhbHVlU2VsZWN0b3JcbiAgICAgICAgICAgIGNoYW5uZWw9e2xheWVyLnZpc3VhbENoYW5uZWxzLmNvbG9yfVxuICAgICAgICAgICAgey4uLmxheWVyQ2hhbm5lbENvbmZpZ1Byb3BzfVxuICAgICAgICAgIC8+XG4gICAgICAgICAgPFZpc0NvbmZpZ1NsaWRlclxuICAgICAgICAgICAgey4uLkxBWUVSX1ZJU19DT05GSUdTLm9wYWNpdHl9XG4gICAgICAgICAgICB7Li4udmlzQ29uZmlndXJhdG9yUHJvcHN9XG4gICAgICAgICAgLz5cbiAgICAgICAgPC9MYXllckNvbmZpZ0dyb3VwPlxuXG4gICAgICAgIHsvKiBSYWRpdXMgKi99XG4gICAgICAgIDxMYXllckNvbmZpZ0dyb3VwIGxhYmVsPXsncmFkaXVzJ30+XG4gICAgICAgICAgeyFsYXllci5jb25maWcuc2l6ZUZpZWxkID8gKFxuICAgICAgICAgICAgPFZpc0NvbmZpZ1NsaWRlclxuICAgICAgICAgICAgICB7Li4uTEFZRVJfVklTX0NPTkZJR1MucmFkaXVzfVxuICAgICAgICAgICAgICB7Li4udmlzQ29uZmlndXJhdG9yUHJvcHN9XG4gICAgICAgICAgICAgIGxhYmVsPXtmYWxzZX1cbiAgICAgICAgICAgICAgZGlzYWJsZWQ9e0Jvb2xlYW4obGF5ZXIuY29uZmlnLnNpemVGaWVsZCl9XG4gICAgICAgICAgICAvPlxuICAgICAgICAgICkgOiAoXG4gICAgICAgICAgICA8VmlzQ29uZmlnU2xpZGVyXG4gICAgICAgICAgICAgIHsuLi5MQVlFUl9WSVNfQ09ORklHUy5yYWRpdXNSYW5nZX1cbiAgICAgICAgICAgICAgey4uLnZpc0NvbmZpZ3VyYXRvclByb3BzfVxuICAgICAgICAgICAgICBkaXNhYmxlZD17XG4gICAgICAgICAgICAgICAgIWxheWVyLmNvbmZpZy5zaXplRmllbGQgfHwgbGF5ZXIuY29uZmlnLnZpc0NvbmZpZy5maXhlZFJhZGl1c1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAvPlxuICAgICAgICAgICl9XG4gICAgICAgICAgPENoYW5uZWxCeVZhbHVlU2VsZWN0b3JcbiAgICAgICAgICAgIGNoYW5uZWw9e2xheWVyLnZpc3VhbENoYW5uZWxzLnNpemV9XG4gICAgICAgICAgICB7Li4ubGF5ZXJDaGFubmVsQ29uZmlnUHJvcHN9XG4gICAgICAgICAgLz5cbiAgICAgICAgICB7bGF5ZXIuY29uZmlnLnNpemVGaWVsZCA/IChcbiAgICAgICAgICAgIDxWaXNDb25maWdTd2l0Y2hcbiAgICAgICAgICAgICAgey4uLkxBWUVSX1ZJU19DT05GSUdTLmZpeGVkUmFkaXVzfVxuICAgICAgICAgICAgICB7Li4udmlzQ29uZmlndXJhdG9yUHJvcHN9XG4gICAgICAgICAgICAgIGRpc2FibGVkPXshbGF5ZXIuY29uZmlnLnNpemVGaWVsZH1cbiAgICAgICAgICAgIC8+XG4gICAgICAgICAgKSA6IG51bGx9XG4gICAgICAgIDwvTGF5ZXJDb25maWdHcm91cD5cblxuICAgICAgICB7Lyogb3V0bGluZSAqL31cbiAgICAgICAge2xheWVyLnR5cGUgPT09IExBWUVSX1RZUEVTLnBvaW50ID8gKFxuICAgICAgICAgIDxMYXllckNvbmZpZ0dyb3VwXG4gICAgICAgICAgICB7Li4uTEFZRVJfVklTX0NPTkZJR1Mub3V0bGluZX1cbiAgICAgICAgICAgIHsuLi52aXNDb25maWd1cmF0b3JQcm9wc31cbiAgICAgICAgICA+XG4gICAgICAgICAgICA8VmlzQ29uZmlnU2xpZGVyXG4gICAgICAgICAgICAgIHsuLi5MQVlFUl9WSVNfQ09ORklHUy50aGlja25lc3N9XG4gICAgICAgICAgICAgIHsuLi52aXNDb25maWd1cmF0b3JQcm9wc31cbiAgICAgICAgICAgICAgbGFiZWw9e2ZhbHNlfVxuICAgICAgICAgICAgICBkaXNhYmxlZD17IWxheWVyLmNvbmZpZy52aXNDb25maWcub3V0bGluZX1cbiAgICAgICAgICAgIC8+XG4gICAgICAgICAgPC9MYXllckNvbmZpZ0dyb3VwPlxuICAgICAgICApIDogbnVsbH1cblxuICAgICAgICB7LyogdGV4dCBsYWJlbCAqL31cbiAgICAgICAgPFRleHRMYWJlbFBhbmVsXG4gICAgICAgICAgdmlzQ29uZmlndXJhdG9yUHJvcHM9e3Zpc0NvbmZpZ3VyYXRvclByb3BzfVxuICAgICAgICAgIGxheWVyQ29uZmlndXJhdG9yUHJvcHM9e2xheWVyQ29uZmlndXJhdG9yUHJvcHN9XG4gICAgICAgICAgdGV4dExhYmVsPXtsYXllci5jb25maWcudGV4dExhYmVsfVxuICAgICAgICAvPlxuICAgICAgICB7LyogaGlnaCBwcmVjaXNpb24gKi99XG4gICAgICAgIDxMYXllckNvbmZpZ0dyb3VwXG4gICAgICAgICAgey4uLkxBWUVSX1ZJU19DT05GSUdTWydoaS1wcmVjaXNpb24nXX1cbiAgICAgICAgICB7Li4udmlzQ29uZmlndXJhdG9yUHJvcHN9XG4gICAgICAgIC8+XG4gICAgICA8L1N0eWxlZExheWVyVmlzdWFsQ29uZmlndXJhdG9yPlxuICAgICk7XG4gIH1cblxuICBfcmVuZGVyQ2x1c3RlckxheWVyQ29uZmlnKHtcbiAgICBsYXllcixcbiAgICB2aXNDb25maWd1cmF0b3JQcm9wcyxcbiAgICBsYXllckNvbmZpZ3VyYXRvclByb3BzLFxuICAgIGxheWVyQ2hhbm5lbENvbmZpZ1Byb3BzXG4gIH0pIHtcbiAgICByZXR1cm4gKFxuICAgICAgPFN0eWxlZExheWVyVmlzdWFsQ29uZmlndXJhdG9yPlxuICAgICAgICB7LyogQ29sb3IgKi99XG4gICAgICAgIDxMYXllckNvbmZpZ0dyb3VwIGxhYmVsPXsnY29sb3InfT5cbiAgICAgICAgICA8Q29sb3JSYW5nZUNvbmZpZyB7Li4udmlzQ29uZmlndXJhdG9yUHJvcHN9IC8+XG4gICAgICAgICAgPEFnZ3JDb2xvclNjYWxlU2VsZWN0b3Igey4uLmxheWVyQ29uZmlndXJhdG9yUHJvcHN9IC8+XG4gICAgICAgICAgPENoYW5uZWxCeVZhbHVlU2VsZWN0b3JcbiAgICAgICAgICAgIGNoYW5uZWw9e2xheWVyLnZpc3VhbENoYW5uZWxzLmNvbG9yfVxuICAgICAgICAgICAgey4uLmxheWVyQ2hhbm5lbENvbmZpZ1Byb3BzfVxuICAgICAgICAgIC8+XG4gICAgICAgICAge2xheWVyLnZpc0NvbmZpZ1NldHRpbmdzLmNvbG9yQWdncmVnYXRpb24uY29uZGl0aW9uKGxheWVyLmNvbmZpZykgP1xuICAgICAgICAgICAgPEFnZ3JlZ2F0aW9uVHlwZVNlbGVjdG9yXG4gICAgICAgICAgICAgIHsuLi5sYXllci52aXNDb25maWdTZXR0aW5ncy5jb2xvckFnZ3JlZ2F0aW9ufVxuICAgICAgICAgICAgICB7Li4ubGF5ZXJDaGFubmVsQ29uZmlnUHJvcHN9XG4gICAgICAgICAgICAgIGNoYW5uZWw9e2xheWVyLnZpc3VhbENoYW5uZWxzLmNvbG9yfVxuICAgICAgICAgICAgLz5cbiAgICAgICAgICAgIDogbnVsbH1cbiAgICAgICAgICA8VmlzQ29uZmlnU2xpZGVyXG4gICAgICAgICAgICB7Li4ubGF5ZXIudmlzQ29uZmlnU2V0dGluZ3Mub3BhY2l0eX1cbiAgICAgICAgICAgIHsuLi52aXNDb25maWd1cmF0b3JQcm9wc31cbiAgICAgICAgICAvPlxuICAgICAgICA8L0xheWVyQ29uZmlnR3JvdXA+XG5cbiAgICAgICAgey8qIENsdXN0ZXIgUmFkaXVzICovfVxuICAgICAgICA8TGF5ZXJDb25maWdHcm91cCBsYWJlbD17J3JhZGl1cyd9PlxuICAgICAgICAgIDxWaXNDb25maWdTbGlkZXJcbiAgICAgICAgICAgIHsuLi5sYXllci52aXNDb25maWdTZXR0aW5ncy5jbHVzdGVyUmFkaXVzfVxuICAgICAgICAgICAgey4uLnZpc0NvbmZpZ3VyYXRvclByb3BzfVxuICAgICAgICAgIC8+XG4gICAgICAgICAgPFZpc0NvbmZpZ1NsaWRlclxuICAgICAgICAgICAgey4uLmxheWVyLnZpc0NvbmZpZ1NldHRpbmdzLnJhZGl1c1JhbmdlfVxuICAgICAgICAgICAgey4uLnZpc0NvbmZpZ3VyYXRvclByb3BzfVxuICAgICAgICAgIC8+XG4gICAgICAgIDwvTGF5ZXJDb25maWdHcm91cD5cbiAgICAgIDwvU3R5bGVkTGF5ZXJWaXN1YWxDb25maWd1cmF0b3I+XG4gICAgKTtcbiAgfVxuXG4gIF9yZW5kZXJIZWF0bWFwTGF5ZXJDb25maWcoe1xuICAgIGxheWVyLFxuICAgIHZpc0NvbmZpZ3VyYXRvclByb3BzLFxuICAgIGxheWVyQ29uZmlndXJhdG9yUHJvcHMsXG4gICAgbGF5ZXJDaGFubmVsQ29uZmlnUHJvcHNcbiAgfSkge1xuICAgIHJldHVybiAoXG4gICAgICA8U3R5bGVkTGF5ZXJWaXN1YWxDb25maWd1cmF0b3I+XG4gICAgICAgIHsvKiBDb2xvciAqL31cbiAgICAgICAgPExheWVyQ29uZmlnR3JvdXAgbGFiZWw9eydjb2xvcid9PlxuICAgICAgICAgIDxDb2xvclJhbmdlQ29uZmlnIHsuLi52aXNDb25maWd1cmF0b3JQcm9wc30gLz5cbiAgICAgICAgICA8VmlzQ29uZmlnU2xpZGVyXG4gICAgICAgICAgICB7Li4ubGF5ZXIudmlzQ29uZmlnU2V0dGluZ3Mub3BhY2l0eX1cbiAgICAgICAgICAgIHsuLi52aXNDb25maWd1cmF0b3JQcm9wc31cbiAgICAgICAgICAvPlxuICAgICAgICA8L0xheWVyQ29uZmlnR3JvdXA+XG4gICAgICAgIHsvKiBSYWRpdXMgKi99XG4gICAgICAgIDxMYXllckNvbmZpZ0dyb3VwIGxhYmVsPXsncmFkaXVzJ30+XG4gICAgICAgICAgPFZpc0NvbmZpZ1NsaWRlclxuICAgICAgICAgICAgey4uLmxheWVyLnZpc0NvbmZpZ1NldHRpbmdzLnJhZGl1c31cbiAgICAgICAgICAgIHsuLi52aXNDb25maWd1cmF0b3JQcm9wc31cbiAgICAgICAgICAgIGxhYmVsPXtmYWxzZX1cbiAgICAgICAgICAvPlxuICAgICAgICA8L0xheWVyQ29uZmlnR3JvdXA+XG4gICAgICAgIHsvKiBXZWlnaHQgKi99XG4gICAgICAgIDxMYXllckNvbmZpZ0dyb3VwIGxhYmVsPXsnd2VpZ2h0J30+XG4gICAgICAgICAgPENoYW5uZWxCeVZhbHVlU2VsZWN0b3JcbiAgICAgICAgICAgIGNoYW5uZWw9e2xheWVyLnZpc3VhbENoYW5uZWxzLndlaWdodH1cbiAgICAgICAgICAgIHsuLi5sYXllckNoYW5uZWxDb25maWdQcm9wc31cbiAgICAgICAgICAvPlxuICAgICAgICA8L0xheWVyQ29uZmlnR3JvdXA+XG4gICAgICA8L1N0eWxlZExheWVyVmlzdWFsQ29uZmlndXJhdG9yPlxuICAgICk7XG4gIH1cblxuICBfcmVuZGVyR3JpZExheWVyQ29uZmlnKHByb3BzKSB7XG4gICAgcmV0dXJuIHRoaXMuX3JlbmRlckFnZ3JlZ2F0aW9uTGF5ZXJDb25maWcocHJvcHMpO1xuICB9XG5cbiAgX3JlbmRlckhleGFnb25MYXllckNvbmZpZyhwcm9wcykge1xuICAgIHJldHVybiB0aGlzLl9yZW5kZXJBZ2dyZWdhdGlvbkxheWVyQ29uZmlnKHByb3BzKTtcbiAgfVxuXG4gIF9yZW5kZXJBZ2dyZWdhdGlvbkxheWVyQ29uZmlnKHtcbiAgICBsYXllcixcbiAgICB2aXNDb25maWd1cmF0b3JQcm9wcyxcbiAgICBsYXllckNvbmZpZ3VyYXRvclByb3BzLFxuICAgIGxheWVyQ2hhbm5lbENvbmZpZ1Byb3BzXG4gIH0pIHtcbiAgICBjb25zdCB7Y29uZmlnfSA9IGxheWVyO1xuICAgIGNvbnN0IHtcbiAgICAgIHZpc0NvbmZpZzoge2VuYWJsZTNkfVxuICAgIH0gPSBjb25maWc7XG4gICAgY29uc3QgZWxldmF0aW9uQnlEZXNjcmlwdGlvbiA9XG4gICAgICAnV2hlbiBvZmYsIGhlaWdodCBpcyBiYXNlZCBvbiBjb3VudCBvZiBwb2ludHMnO1xuICAgIGNvbnN0IGNvbG9yQnlEZXNjcmlwdGlvbiA9ICdXaGVuIG9mZiwgY29sb3IgaXMgYmFzZWQgb24gY291bnQgb2YgcG9pbnRzJztcblxuICAgIHJldHVybiAoXG4gICAgICA8U3R5bGVkTGF5ZXJWaXN1YWxDb25maWd1cmF0b3I+XG4gICAgICAgIHsvKiBDb2xvciAqL31cbiAgICAgICAgPExheWVyQ29uZmlnR3JvdXAgbGFiZWw9eydjb2xvcid9PlxuICAgICAgICAgIDxDb2xvclJhbmdlQ29uZmlnIHsuLi52aXNDb25maWd1cmF0b3JQcm9wc30gLz5cbiAgICAgICAgICA8QWdnckNvbG9yU2NhbGVTZWxlY3RvciB7Li4ubGF5ZXJDb25maWd1cmF0b3JQcm9wc30gLz5cbiAgICAgICAgICA8Q2hhbm5lbEJ5VmFsdWVTZWxlY3RvclxuICAgICAgICAgICAgY2hhbm5lbD17bGF5ZXIudmlzdWFsQ2hhbm5lbHMuY29sb3J9XG4gICAgICAgICAgICB7Li4ubGF5ZXJDaGFubmVsQ29uZmlnUHJvcHN9XG4gICAgICAgICAgLz5cbiAgICAgICAgICB7bGF5ZXIudmlzQ29uZmlnU2V0dGluZ3MuY29sb3JBZ2dyZWdhdGlvbi5jb25kaXRpb24obGF5ZXIuY29uZmlnKSA/IChcbiAgICAgICAgICAgIDxBZ2dyZWdhdGlvblR5cGVTZWxlY3RvclxuICAgICAgICAgICAgICB7Li4ubGF5ZXIudmlzQ29uZmlnU2V0dGluZ3MuY29sb3JBZ2dyZWdhdGlvbn1cbiAgICAgICAgICAgICAgey4uLmxheWVyQ2hhbm5lbENvbmZpZ1Byb3BzfVxuICAgICAgICAgICAgICBkZXNjcmVpcHRpb249e2NvbG9yQnlEZXNjcmlwdGlvbn1cbiAgICAgICAgICAgICAgY2hhbm5lbD17bGF5ZXIudmlzdWFsQ2hhbm5lbHMuY29sb3J9XG4gICAgICAgICAgICAvPlxuICAgICAgICAgICkgOiBudWxsfVxuICAgICAgICAgIHtsYXllci52aXNDb25maWdTZXR0aW5ncy5wZXJjZW50aWxlICYmIGxheWVyLnZpc0NvbmZpZ1NldHRpbmdzLnBlcmNlbnRpbGUuY29uZGl0aW9uKGxheWVyLmNvbmZpZykgPyAoXG4gICAgICAgICAgICA8VmlzQ29uZmlnU2xpZGVyXG4gICAgICAgICAgICAgIHsuLi5sYXllci52aXNDb25maWdTZXR0aW5ncy5wZXJjZW50aWxlfVxuICAgICAgICAgICAgICB7Li4udmlzQ29uZmlndXJhdG9yUHJvcHN9XG4gICAgICAgICAgICAvPlxuICAgICAgICAgICkgOiBudWxsfVxuICAgICAgICAgIDxWaXNDb25maWdTbGlkZXJcbiAgICAgICAgICAgIHsuLi5sYXllci52aXNDb25maWdTZXR0aW5ncy5vcGFjaXR5fVxuICAgICAgICAgICAgey4uLnZpc0NvbmZpZ3VyYXRvclByb3BzfVxuICAgICAgICAgIC8+XG4gICAgICAgIDwvTGF5ZXJDb25maWdHcm91cD5cblxuICAgICAgICB7LyogQ2VsbCBzaXplICovfVxuICAgICAgICA8TGF5ZXJDb25maWdHcm91cCBsYWJlbD17J3JhZGl1cyd9PlxuICAgICAgICAgIDxWaXNDb25maWdTbGlkZXJcbiAgICAgICAgICAgIHsuLi5sYXllci52aXNDb25maWdTZXR0aW5ncy53b3JsZFVuaXRTaXplfVxuICAgICAgICAgICAgey4uLnZpc0NvbmZpZ3VyYXRvclByb3BzfVxuICAgICAgICAgIC8+XG4gICAgICAgICAgPFZpc0NvbmZpZ1NsaWRlclxuICAgICAgICAgICAgey4uLmxheWVyLnZpc0NvbmZpZ1NldHRpbmdzLmNvdmVyYWdlfVxuICAgICAgICAgICAgey4uLnZpc0NvbmZpZ3VyYXRvclByb3BzfVxuICAgICAgICAgIC8+XG4gICAgICAgIDwvTGF5ZXJDb25maWdHcm91cD5cblxuICAgICAgICB7LyogRWxldmF0aW9uICovfVxuICAgICAgICB7bGF5ZXIudmlzQ29uZmlnU2V0dGluZ3MuZW5hYmxlM2QgP1xuICAgICAgICAgIDxMYXllckNvbmZpZ0dyb3VwXG4gICAgICAgICAgICB7Li4ubGF5ZXIudmlzQ29uZmlnU2V0dGluZ3MuZW5hYmxlM2R9XG4gICAgICAgICAgICB7Li4udmlzQ29uZmlndXJhdG9yUHJvcHN9XG4gICAgICAgICAgPlxuICAgICAgICAgICAgPFZpc0NvbmZpZ1NsaWRlclxuICAgICAgICAgICAgICB7Li4ubGF5ZXIudmlzQ29uZmlnU2V0dGluZ3MuZWxldmF0aW9uU2NhbGV9XG4gICAgICAgICAgICAgIHsuLi52aXNDb25maWd1cmF0b3JQcm9wc31cbiAgICAgICAgICAgIC8+XG4gICAgICAgICAgICA8Q2hhbm5lbEJ5VmFsdWVTZWxlY3RvclxuICAgICAgICAgICAgICB7Li4ubGF5ZXJDaGFubmVsQ29uZmlnUHJvcHN9XG4gICAgICAgICAgICAgIGNoYW5uZWw9e2xheWVyLnZpc3VhbENoYW5uZWxzLnNpemV9XG4gICAgICAgICAgICAgIGRlc2NyaXB0aW9uPXtlbGV2YXRpb25CeURlc2NyaXB0aW9ufVxuICAgICAgICAgICAgICBkaXNhYmxlZD17IWVuYWJsZTNkfVxuICAgICAgICAgICAgLz5cbiAgICAgICAgICAgIHtsYXllci52aXNDb25maWdTZXR0aW5ncy5zaXplQWdncmVnYXRpb24uY29uZGl0aW9uKGxheWVyLmNvbmZpZykgPyAoXG4gICAgICAgICAgICAgIDxBZ2dyZWdhdGlvblR5cGVTZWxlY3RvclxuICAgICAgICAgICAgICAgIHsuLi5sYXllci52aXNDb25maWdTZXR0aW5ncy5zaXplQWdncmVnYXRpb259XG4gICAgICAgICAgICAgICAgey4uLmxheWVyQ2hhbm5lbENvbmZpZ1Byb3BzfVxuICAgICAgICAgICAgICAgIGNoYW5uZWw9e2xheWVyLnZpc3VhbENoYW5uZWxzLnNpemV9XG4gICAgICAgICAgICAgIC8+XG4gICAgICAgICAgICApIDogbnVsbH1cbiAgICAgICAgICAgIHtsYXllci52aXNDb25maWdTZXR0aW5ncy5lbGV2YXRpb25QZXJjZW50aWxlLmNvbmRpdGlvbihcbiAgICAgICAgICAgICAgbGF5ZXIuY29uZmlnXG4gICAgICAgICAgICApID8gKFxuICAgICAgICAgICAgICA8VmlzQ29uZmlnU2xpZGVyXG4gICAgICAgICAgICAgICAgey4uLmxheWVyLnZpc0NvbmZpZ1NldHRpbmdzLmVsZXZhdGlvblBlcmNlbnRpbGV9XG4gICAgICAgICAgICAgICAgey4uLnZpc0NvbmZpZ3VyYXRvclByb3BzfVxuICAgICAgICAgICAgICAvPlxuICAgICAgICAgICAgKSA6IG51bGx9XG4gICAgICAgICAgPC9MYXllckNvbmZpZ0dyb3VwPiA6IG51bGx9XG5cbiAgICAgICAgey8qIEhpZ2ggUHJlY2lzaW9uICovfVxuICAgICAgICA8TGF5ZXJDb25maWdHcm91cFxuICAgICAgICAgIHsuLi5sYXllci52aXNDb25maWdTZXR0aW5nc1snaGktcHJlY2lzaW9uJ119XG4gICAgICAgICAgey4uLnZpc0NvbmZpZ3VyYXRvclByb3BzfVxuICAgICAgICAvPlxuICAgICAgPC9TdHlsZWRMYXllclZpc3VhbENvbmZpZ3VyYXRvcj5cbiAgICApO1xuICB9XG5cbiAgLy8gVE9ETzogU2hhbiBtb3ZlIHRoZXNlIGludG8gbGF5ZXIgY2xhc3NcbiAgX3JlbmRlckhleGFnb25JZExheWVyQ29uZmlnKHtcbiAgICBsYXllcixcbiAgICB2aXNDb25maWd1cmF0b3JQcm9wcyxcbiAgICBsYXllckNvbmZpZ3VyYXRvclByb3BzLFxuICAgIGxheWVyQ2hhbm5lbENvbmZpZ1Byb3BzXG4gIH0pIHtcbiAgICByZXR1cm4gKFxuICAgICAgPFN0eWxlZExheWVyVmlzdWFsQ29uZmlndXJhdG9yPlxuICAgICAgICB7LyogQ29sb3IgKi99XG4gICAgICAgIDxMYXllckNvbmZpZ0dyb3VwIGxhYmVsPXsnY29sb3InfT5cbiAgICAgICAgICB7bGF5ZXIuY29uZmlnLmNvbG9yRmllbGQgPyAoXG4gICAgICAgICAgICA8Q29sb3JSYW5nZUNvbmZpZyB7Li4udmlzQ29uZmlndXJhdG9yUHJvcHN9IC8+XG4gICAgICAgICAgKSA6IChcbiAgICAgICAgICAgIDxMYXllckNvbG9yU2VsZWN0b3Igey4uLmxheWVyQ29uZmlndXJhdG9yUHJvcHN9IC8+XG4gICAgICAgICAgKX1cbiAgICAgICAgICA8Q2hhbm5lbEJ5VmFsdWVTZWxlY3RvclxuICAgICAgICAgICAgY2hhbm5lbD17bGF5ZXIudmlzdWFsQ2hhbm5lbHMuY29sb3J9XG4gICAgICAgICAgICB7Li4ubGF5ZXJDaGFubmVsQ29uZmlnUHJvcHN9XG4gICAgICAgICAgLz5cbiAgICAgICAgICA8VmlzQ29uZmlnU2xpZGVyXG4gICAgICAgICAgICB7Li4uTEFZRVJfVklTX0NPTkZJR1Mub3BhY2l0eX1cbiAgICAgICAgICAgIHsuLi52aXNDb25maWd1cmF0b3JQcm9wc31cbiAgICAgICAgICAvPlxuICAgICAgICA8L0xheWVyQ29uZmlnR3JvdXA+XG5cbiAgICAgICAgey8qIENvdmVyYWdlICovfVxuICAgICAgICA8TGF5ZXJDb25maWdHcm91cCBsYWJlbD17J2NvdmVyYWdlJ30+XG4gICAgICAgICAgeyFsYXllci5jb25maWcuY292ZXJhZ2VGaWVsZCA/IChcbiAgICAgICAgICAgIDxWaXNDb25maWdTbGlkZXJcbiAgICAgICAgICAgICAgey4uLmxheWVyLnZpc0NvbmZpZ1NldHRpbmdzLmNvdmVyYWdlfVxuICAgICAgICAgICAgICB7Li4udmlzQ29uZmlndXJhdG9yUHJvcHN9XG4gICAgICAgICAgICAvPlxuICAgICAgICAgICkgOiAoXG4gICAgICAgICAgICA8VmlzQ29uZmlnU2xpZGVyXG4gICAgICAgICAgICAgIHsuLi5sYXllci52aXNDb25maWdTZXR0aW5ncy5jb3ZlcmFnZVJhbmdlfVxuICAgICAgICAgICAgICB7Li4udmlzQ29uZmlndXJhdG9yUHJvcHN9XG4gICAgICAgICAgICAvPlxuICAgICAgICAgICl9XG4gICAgICAgICAgPENoYW5uZWxCeVZhbHVlU2VsZWN0b3JcbiAgICAgICAgICAgIGNoYW5uZWw9e2xheWVyLnZpc3VhbENoYW5uZWxzLmNvdmVyYWdlfVxuICAgICAgICAgICAgey4uLmxheWVyQ2hhbm5lbENvbmZpZ1Byb3BzfVxuICAgICAgICAgIC8+XG4gICAgICAgIDwvTGF5ZXJDb25maWdHcm91cD5cblxuICAgICAgICB7LyogaGVpZ2h0ICovfVxuICAgICAgICA8TGF5ZXJDb25maWdHcm91cFxuICAgICAgICAgIHsuLi5MQVlFUl9WSVNfQ09ORklHUy5lbmFibGUzZH1cbiAgICAgICAgICB7Li4udmlzQ29uZmlndXJhdG9yUHJvcHN9XG4gICAgICAgID5cbiAgICAgICAgICA8Q2hhbm5lbEJ5VmFsdWVTZWxlY3RvclxuICAgICAgICAgICAgY2hhbm5lbD17bGF5ZXIudmlzdWFsQ2hhbm5lbHMuc2l6ZX1cbiAgICAgICAgICAgIHsuLi5sYXllckNoYW5uZWxDb25maWdQcm9wc31cbiAgICAgICAgICAvPlxuICAgICAgICAgIDxWaXNDb25maWdTbGlkZXJcbiAgICAgICAgICAgIHsuLi5MQVlFUl9WSVNfQ09ORklHUy5lbGV2YXRpb25SYW5nZX1cbiAgICAgICAgICAgIHsuLi52aXNDb25maWd1cmF0b3JQcm9wc31cbiAgICAgICAgICAvPlxuICAgICAgICA8L0xheWVyQ29uZmlnR3JvdXA+XG4gICAgICAgIHsvKiBoaWdoIHByZWNpc2lvbiAqL31cbiAgICAgICAgPExheWVyQ29uZmlnR3JvdXBcbiAgICAgICAgICB7Li4uTEFZRVJfVklTX0NPTkZJR1NbJ2hpLXByZWNpc2lvbiddfVxuICAgICAgICAgIHsuLi52aXNDb25maWd1cmF0b3JQcm9wc31cbiAgICAgICAgLz5cbiAgICAgIDwvU3R5bGVkTGF5ZXJWaXN1YWxDb25maWd1cmF0b3I+XG4gICAgKTtcbiAgfVxuXG4gIF9yZW5kZXJBcmNMYXllckNvbmZpZyhhcmdzKSB7XG4gICAgcmV0dXJuIHRoaXMuX3JlbmRlckxpbmVMYXllckNvbmZpZyhhcmdzKTtcbiAgfVxuXG4gIF9yZW5kZXJMaW5lTGF5ZXJDb25maWcoe1xuICAgIGxheWVyLFxuICAgIHZpc0NvbmZpZ3VyYXRvclByb3BzLFxuICAgIGxheWVyQ29uZmlndXJhdG9yUHJvcHMsXG4gICAgbGF5ZXJDaGFubmVsQ29uZmlnUHJvcHNcbiAgfSkge1xuICAgIHJldHVybiAoXG4gICAgICA8U3R5bGVkTGF5ZXJWaXN1YWxDb25maWd1cmF0b3I+XG4gICAgICAgIHsvKiBDb2xvciAqL31cbiAgICAgICAgPExheWVyQ29uZmlnR3JvdXAgbGFiZWw9eydjb2xvcid9PlxuICAgICAgICAgIHtsYXllci5jb25maWcuY29sb3JGaWVsZCA/IChcbiAgICAgICAgICAgIDxDb2xvclJhbmdlQ29uZmlnIHsuLi52aXNDb25maWd1cmF0b3JQcm9wc30gLz5cbiAgICAgICAgICApIDogKFxuICAgICAgICAgICAgPEFyY0xheWVyQ29sb3JTZWxlY3RvclxuICAgICAgICAgICAgICBsYXllcj17bGF5ZXJ9XG4gICAgICAgICAgICAgIG9uQ2hhbmdlQ29uZmlnPXtsYXllckNvbmZpZ3VyYXRvclByb3BzLm9uQ2hhbmdlfVxuICAgICAgICAgICAgICBvbkNoYW5nZVZpc0NvbmZpZz17dmlzQ29uZmlndXJhdG9yUHJvcHMub25DaGFuZ2V9XG4gICAgICAgICAgICAvPlxuICAgICAgICAgICl9XG4gICAgICAgICAgPENoYW5uZWxCeVZhbHVlU2VsZWN0b3JcbiAgICAgICAgICAgIGNoYW5uZWw9e2xheWVyLnZpc3VhbENoYW5uZWxzLmNvbG9yfVxuICAgICAgICAgICAgey4uLmxheWVyQ2hhbm5lbENvbmZpZ1Byb3BzfVxuICAgICAgICAgIC8+XG4gICAgICAgICAgPFZpc0NvbmZpZ1NsaWRlclxuICAgICAgICAgICAgey4uLkxBWUVSX1ZJU19DT05GSUdTLm9wYWNpdHl9XG4gICAgICAgICAgICB7Li4udmlzQ29uZmlndXJhdG9yUHJvcHN9XG4gICAgICAgICAgLz5cbiAgICAgICAgPC9MYXllckNvbmZpZ0dyb3VwPlxuXG4gICAgICAgIHsvKiB0aGlja25lc3MgKi99XG4gICAgICAgIDxMYXllckNvbmZpZ0dyb3VwIGxhYmVsPXsnc3Ryb2tlJ30+XG4gICAgICAgICAge2xheWVyLmNvbmZpZy5zaXplRmllbGQgPyAoXG4gICAgICAgICAgICA8VmlzQ29uZmlnU2xpZGVyXG4gICAgICAgICAgICAgIHsuLi5MQVlFUl9WSVNfQ09ORklHUy5zdHJva2VXaWR0aFJhbmdlfVxuICAgICAgICAgICAgICB7Li4udmlzQ29uZmlndXJhdG9yUHJvcHN9XG4gICAgICAgICAgICAgIGRpc2FibGVkPXshbGF5ZXIuY29uZmlnLnNpemVGaWVsZH1cbiAgICAgICAgICAgIC8+XG4gICAgICAgICAgKSA6IChcbiAgICAgICAgICAgIDxWaXNDb25maWdTbGlkZXJcbiAgICAgICAgICAgICAgey4uLkxBWUVSX1ZJU19DT05GSUdTLnRoaWNrbmVzc31cbiAgICAgICAgICAgICAgey4uLnZpc0NvbmZpZ3VyYXRvclByb3BzfVxuICAgICAgICAgICAgLz5cbiAgICAgICAgICApfVxuICAgICAgICAgIDxDaGFubmVsQnlWYWx1ZVNlbGVjdG9yXG4gICAgICAgICAgICBjaGFubmVsPXtsYXllci52aXN1YWxDaGFubmVscy5zaXplfVxuICAgICAgICAgICAgey4uLmxheWVyQ2hhbm5lbENvbmZpZ1Byb3BzfVxuICAgICAgICAgIC8+XG4gICAgICAgIDwvTGF5ZXJDb25maWdHcm91cD5cblxuICAgICAgICB7LyogaGlnaCBwcmVjaXNpb24gKi99XG4gICAgICAgIDxMYXllckNvbmZpZ0dyb3VwXG4gICAgICAgICAgey4uLkxBWUVSX1ZJU19DT05GSUdTWydoaS1wcmVjaXNpb24nXX1cbiAgICAgICAgICB7Li4udmlzQ29uZmlndXJhdG9yUHJvcHN9XG4gICAgICAgIC8+XG4gICAgICA8L1N0eWxlZExheWVyVmlzdWFsQ29uZmlndXJhdG9yPlxuICAgICk7XG4gIH1cblxuICBfcmVuZGVyR2VvanNvbkxheWVyQ29uZmlnKHtcbiAgICBsYXllcixcbiAgICB2aXNDb25maWd1cmF0b3JQcm9wcyxcbiAgICBsYXllckNvbmZpZ3VyYXRvclByb3BzLFxuICAgIGxheWVyQ2hhbm5lbENvbmZpZ1Byb3BzXG4gIH0pIHtcbiAgICBjb25zdCB7XG4gICAgICBtZXRhOiB7ZmVhdHVyZVR5cGVzID0ge319LFxuICAgICAgY29uZmlnOiB7dmlzQ29uZmlnfVxuICAgIH0gPSBsYXllcjtcblxuICAgIHJldHVybiAoXG4gICAgICA8U3R5bGVkTGF5ZXJWaXN1YWxDb25maWd1cmF0b3I+XG4gICAgICAgIHsvKiBDb2xvciBCeSAqL31cbiAgICAgICAgPExheWVyQ29uZmlnR3JvdXAgbGFiZWw9eydjb2xvcid9PlxuICAgICAgICAgIHtmZWF0dXJlVHlwZXMucG9seWdvbiA/IChcbiAgICAgICAgICAgIDxWaXNDb25maWdTd2l0Y2hcbiAgICAgICAgICAgICAgey4uLnZpc0NvbmZpZ3VyYXRvclByb3BzfVxuICAgICAgICAgICAgICB7Li4uTEFZRVJfVklTX0NPTkZJR1MuZmlsbGVkfVxuICAgICAgICAgICAgLz5cbiAgICAgICAgICApIDogbnVsbH1cblxuICAgICAgICAgIHtsYXllci5jb25maWcuY29sb3JGaWVsZCA/IChcbiAgICAgICAgICAgIDxDb2xvclJhbmdlQ29uZmlnIHsuLi52aXNDb25maWd1cmF0b3JQcm9wc30gLz5cbiAgICAgICAgICApIDogKFxuICAgICAgICAgICAgPExheWVyQ29sb3JTZWxlY3RvciB7Li4ubGF5ZXJDb25maWd1cmF0b3JQcm9wc30gLz5cbiAgICAgICAgICApfVxuXG4gICAgICAgICAgPENoYW5uZWxCeVZhbHVlU2VsZWN0b3JcbiAgICAgICAgICAgIGNoYW5uZWw9e2xheWVyLnZpc3VhbENoYW5uZWxzLmNvbG9yfVxuICAgICAgICAgICAgey4uLmxheWVyQ2hhbm5lbENvbmZpZ1Byb3BzfVxuICAgICAgICAgIC8+XG5cbiAgICAgICAgICA8VmlzQ29uZmlnU2xpZGVyXG4gICAgICAgICAgICB7Li4uTEFZRVJfVklTX0NPTkZJR1Mub3BhY2l0eX1cbiAgICAgICAgICAgIHsuLi52aXNDb25maWd1cmF0b3JQcm9wc31cbiAgICAgICAgICAvPlxuICAgICAgICA8L0xheWVyQ29uZmlnR3JvdXA+XG5cbiAgICAgICAgey8qIFN0cm9rZSBXaWR0aCAqL31cbiAgICAgICAge2ZlYXR1cmVUeXBlcy5saW5lIHx8IGZlYXR1cmVUeXBlcy5wb2x5Z29uID8gKFxuICAgICAgICAgIDxMYXllckNvbmZpZ0dyb3VwXG4gICAgICAgICAgICBsYWJlbD1cInN0cm9rZVwiXG4gICAgICAgICAgICB7Li4udmlzQ29uZmlndXJhdG9yUHJvcHN9XG4gICAgICAgICAgICB7Li4uKGZlYXR1cmVUeXBlcy5wb2x5Z29uID8gTEFZRVJfVklTX0NPTkZJR1Muc3Ryb2tlZCA6IHt9KX1cbiAgICAgICAgICA+XG4gICAgICAgICAgICB7dmlzQ29uZmlnLnN0cm9rZWQgP1xuICAgICAgICAgICAgICA8ZGl2PlxuICAgICAgICAgICAgICAgIDxWaXNDb25maWdTbGlkZXJcbiAgICAgICAgICAgICAgICAgIHsuLi5MQVlFUl9WSVNfQ09ORklHUy50aGlja25lc3N9XG4gICAgICAgICAgICAgICAgICB7Li4udmlzQ29uZmlndXJhdG9yUHJvcHN9XG4gICAgICAgICAgICAgICAgLz5cbiAgICAgICAgICAgICAgICA8Q2hhbm5lbEJ5VmFsdWVTZWxlY3RvclxuICAgICAgICAgICAgICAgICAgY2hhbm5lbD17bGF5ZXIudmlzdWFsQ2hhbm5lbHMuc2l6ZX1cbiAgICAgICAgICAgICAgICAgIHsuLi5sYXllckNoYW5uZWxDb25maWdQcm9wc31cbiAgICAgICAgICAgICAgICAvPlxuICAgICAgICAgICAgICAgIDxWaXNDb25maWdTbGlkZXJcbiAgICAgICAgICAgICAgICAgIHsuLi5MQVlFUl9WSVNfQ09ORklHUy5zdHJva2VXaWR0aFJhbmdlfVxuICAgICAgICAgICAgICAgICAgey4uLnZpc0NvbmZpZ3VyYXRvclByb3BzfVxuICAgICAgICAgICAgICAgICAgZGlzYWJsZWQ9eyFsYXllci5jb25maWcuc2l6ZUZpZWxkfVxuICAgICAgICAgICAgICAgIC8+XG4gICAgICAgICAgICAgIDwvZGl2PiA6IG51bGx9XG4gICAgICAgICAgPC9MYXllckNvbmZpZ0dyb3VwPlxuICAgICAgICApIDogbnVsbH1cblxuICAgICAgICB7LyogRWxldmF0aW9uICovfVxuICAgICAgICB7ZmVhdHVyZVR5cGVzLnBvbHlnb24gJiYgdmlzQ29uZmlnLmZpbGxlZCA/IChcbiAgICAgICAgICA8TGF5ZXJDb25maWdHcm91cFxuICAgICAgICAgICAgey4uLnZpc0NvbmZpZ3VyYXRvclByb3BzfVxuICAgICAgICAgICAgey4uLkxBWUVSX1ZJU19DT05GSUdTLmVuYWJsZTNkfVxuICAgICAgICAgID5cbiAgICAgICAgICAgIDxWaXNDb25maWdTbGlkZXJcbiAgICAgICAgICAgICAgey4uLkxBWUVSX1ZJU19DT05GSUdTLmVsZXZhdGlvblNjYWxlfVxuICAgICAgICAgICAgICB7Li4udmlzQ29uZmlndXJhdG9yUHJvcHN9XG4gICAgICAgICAgICAvPlxuICAgICAgICAgICAgPENoYW5uZWxCeVZhbHVlU2VsZWN0b3JcbiAgICAgICAgICAgICAgY2hhbm5lbD17bGF5ZXIudmlzdWFsQ2hhbm5lbHMuaGVpZ2h0fVxuICAgICAgICAgICAgICB7Li4ubGF5ZXJDaGFubmVsQ29uZmlnUHJvcHN9XG4gICAgICAgICAgICAvPlxuICAgICAgICAgICAgPFZpc0NvbmZpZ1N3aXRjaFxuICAgICAgICAgICAgICB7Li4udmlzQ29uZmlndXJhdG9yUHJvcHN9XG4gICAgICAgICAgICAgIHsuLi5MQVlFUl9WSVNfQ09ORklHUy53aXJlZnJhbWV9XG4gICAgICAgICAgICAvPlxuICAgICAgICAgIDwvTGF5ZXJDb25maWdHcm91cD5cbiAgICAgICAgKSA6IG51bGx9XG5cbiAgICAgICAgey8qIFJhZGl1cyAqL31cbiAgICAgICAge2ZlYXR1cmVUeXBlcy5wb2ludCA/IChcbiAgICAgICAgICA8ZGl2PlxuICAgICAgICAgICAgPFZpc0NvbmZpZ1NsaWRlclxuICAgICAgICAgICAgICB7Li4uTEFZRVJfVklTX0NPTkZJR1MucmFkaXVzfVxuICAgICAgICAgICAgICB7Li4udmlzQ29uZmlndXJhdG9yUHJvcHN9XG4gICAgICAgICAgICAgIGxhYmVsPVwiUG9pbnQgUmFkaXVzXCJcbiAgICAgICAgICAgICAgZGlzYWJsZWQ9e0Jvb2xlYW4obGF5ZXIuY29uZmlnLnJhZGl1c0ZpZWxkKX1cbiAgICAgICAgICAgIC8+XG4gICAgICAgICAgICA8Q2hhbm5lbEJ5VmFsdWVTZWxlY3RvclxuICAgICAgICAgICAgICBjaGFubmVsPXtsYXllci52aXN1YWxDaGFubmVscy5yYWRpdXN9XG4gICAgICAgICAgICAgIHsuLi5sYXllckNoYW5uZWxDb25maWdQcm9wc31cbiAgICAgICAgICAgIC8+XG4gICAgICAgICAgICA8VmlzQ29uZmlnU2xpZGVyXG4gICAgICAgICAgICAgIHsuLi5MQVlFUl9WSVNfQ09ORklHUy5yYWRpdXNSYW5nZX1cbiAgICAgICAgICAgICAgey4uLnZpc0NvbmZpZ3VyYXRvclByb3BzfVxuICAgICAgICAgICAgICBkaXNhYmxlZD17IWxheWVyLmNvbmZpZy5yYWRpdXNGaWVsZH1cbiAgICAgICAgICAgIC8+XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgICkgOiBudWxsfVxuXG4gICAgICAgIHsvKiBoaWdoIHByZWNpc2lvbiAqL31cbiAgICAgICAgPExheWVyQ29uZmlnR3JvdXBcbiAgICAgICAgICB7Li4uTEFZRVJfVklTX0NPTkZJR1NbJ2hpLXByZWNpc2lvbiddfVxuICAgICAgICAgIHsuLi52aXNDb25maWd1cmF0b3JQcm9wc31cbiAgICAgICAgLz5cbiAgICAgIDwvU3R5bGVkTGF5ZXJWaXN1YWxDb25maWd1cmF0b3I+XG4gICAgKTtcbiAgfVxuXG4gIHJlbmRlcigpIHtcbiAgICBjb25zdCB7XG4gICAgICBsYXllcixcbiAgICAgIGRhdGFzZXRzLFxuICAgICAgdXBkYXRlTGF5ZXJDb25maWcsXG4gICAgICBsYXllclR5cGVPcHRpb25zLFxuICAgICAgdXBkYXRlTGF5ZXJUeXBlXG4gICAgfSA9IHRoaXMucHJvcHM7XG4gICAgY29uc3Qge2ZpZWxkcyA9IFtdLCBmaWVsZFBhaXJzfSA9IGxheWVyLmNvbmZpZy5kYXRhSWRcbiAgICAgID8gZGF0YXNldHNbbGF5ZXIuY29uZmlnLmRhdGFJZF1cbiAgICAgIDoge307XG4gICAgY29uc3Qge2NvbmZpZ30gPSBsYXllcjtcblxuICAgIGNvbnN0IGNvbW1vbkNvbmZpZ1Byb3AgPSB7XG4gICAgICBsYXllcixcbiAgICAgIGZpZWxkc1xuICAgIH07XG5cbiAgICBjb25zdCB2aXNDb25maWd1cmF0b3JQcm9wcyA9IHtcbiAgICAgIC4uLmNvbW1vbkNvbmZpZ1Byb3AsXG4gICAgICBvbkNoYW5nZTogdGhpcy5wcm9wcy51cGRhdGVMYXllclZpc0NvbmZpZ1xuICAgIH07XG5cbiAgICBjb25zdCBsYXllckNvbmZpZ3VyYXRvclByb3BzID0ge1xuICAgICAgLi4uY29tbW9uQ29uZmlnUHJvcCxcbiAgICAgIG9uQ2hhbmdlOiB1cGRhdGVMYXllckNvbmZpZ1xuICAgIH07XG5cbiAgICBjb25zdCBsYXllckNoYW5uZWxDb25maWdQcm9wcyA9IHtcbiAgICAgIC4uLmNvbW1vbkNvbmZpZ1Byb3AsXG4gICAgICBvbkNoYW5nZTogdGhpcy5wcm9wcy51cGRhdGVMYXllclZpc3VhbENoYW5uZWxDb25maWdcbiAgICB9O1xuXG4gICAgY29uc3QgcmVuZGVyVGVtcGxhdGUgPVxuICAgICAgbGF5ZXIudHlwZSAmJiBgX3JlbmRlciR7Y2FwaXRhbGl6ZUZpcnN0TGV0dGVyKGxheWVyLnR5cGUpfUxheWVyQ29uZmlnYDtcblxuICAgIHJldHVybiAoXG4gICAgICA8U3R5bGVkTGF5ZXJDb25maWd1cmF0b3I+XG4gICAgICAgIHtsYXllci5sYXllckluZm9Nb2RhbCA/IDxIb3dUb0J1dHRvbiBvbkNsaWNrPXsoKSA9PiB0aGlzLnByb3BzLm9wZW5Nb2RhbChsYXllci5sYXllckluZm9Nb2RhbCl9Lz4gOiBudWxsfVxuICAgICAgICA8TGF5ZXJDb25maWdHcm91cCBsYWJlbD17J2Jhc2ljJ30+XG4gICAgICAgICAge09iamVjdC5rZXlzKGRhdGFzZXRzKS5sZW5ndGggPiAxICYmIChcbiAgICAgICAgICAgIDxTb3VyY2VEYXRhU2VsZWN0b3JcbiAgICAgICAgICAgICAgZGF0YXNldHM9e2RhdGFzZXRzfVxuICAgICAgICAgICAgICBpZD17bGF5ZXIuaWR9XG4gICAgICAgICAgICAgIGRpc2FibGVkPXtsYXllci50eWVwICYmIGNvbmZpZy5jb2x1bW5zfVxuICAgICAgICAgICAgICBkYXRhSWQ9e2NvbmZpZy5kYXRhSWR9XG4gICAgICAgICAgICAgIG9uU2VsZWN0PXt2YWx1ZSA9PiB1cGRhdGVMYXllckNvbmZpZyh7ZGF0YUlkOiB2YWx1ZX0pfVxuICAgICAgICAgICAgLz5cbiAgICAgICAgICApfVxuICAgICAgICAgIDxMYXllclR5cGVTZWxlY3RvclxuICAgICAgICAgICAgbGF5ZXI9e2xheWVyfVxuICAgICAgICAgICAgbGF5ZXJUeXBlT3B0aW9ucz17bGF5ZXJUeXBlT3B0aW9uc31cbiAgICAgICAgICAgIG9uU2VsZWN0PXt1cGRhdGVMYXllclR5cGV9XG4gICAgICAgICAgLz5cbiAgICAgICAgICA8TGF5ZXJDb2x1bW5Db25maWdcbiAgICAgICAgICAgIGxheWVyPXtsYXllcn1cbiAgICAgICAgICAgIGZpZWxkcz17ZmllbGRzfVxuICAgICAgICAgICAgZmllbGRQYWlycz17ZmllbGRQYWlyc31cbiAgICAgICAgICAgIHVwZGF0ZUxheWVyQ29uZmlnPXt1cGRhdGVMYXllckNvbmZpZ31cbiAgICAgICAgICAgIHVwZGF0ZUxheWVyVHlwZT17dGhpcy5wcm9wcy51cGRhdGVMYXllclR5cGV9XG4gICAgICAgICAgLz5cbiAgICAgICAgPC9MYXllckNvbmZpZ0dyb3VwPlxuICAgICAgICB7dGhpc1tyZW5kZXJUZW1wbGF0ZV0gJiZcbiAgICAgICAgICB0aGlzW3JlbmRlclRlbXBsYXRlXSh7XG4gICAgICAgICAgICBsYXllcixcbiAgICAgICAgICAgIHZpc0NvbmZpZ3VyYXRvclByb3BzLFxuICAgICAgICAgICAgbGF5ZXJDaGFubmVsQ29uZmlnUHJvcHMsXG4gICAgICAgICAgICBsYXllckNvbmZpZ3VyYXRvclByb3BzXG4gICAgICAgICAgfSl9XG4gICAgICA8L1N0eWxlZExheWVyQ29uZmlndXJhdG9yPlxuICAgICk7XG4gIH1cbn1cblxuLypcbiAqIENvbXBvbmVudGl6ZSBjb25maWcgY29tcG9uZW50IGludG8gcHVyZSBmdW5jdGlvbmFsIGNvbXBvbmVudHNcbiAqL1xuXG5jb25zdCBTdHlsZWRIb3dUb0J1dHRvbiA9IHN0eWxlZC5kaXZgXG4gIHBvc2l0aW9uOiBhYnNvbHV0ZTtcbiAgcmlnaHQ6IDA7XG4gIHRvcDogMDtcbmA7XG5cbmV4cG9ydCBjb25zdCBIb3dUb0J1dHRvbiA9ICh7b25DbGlja30pID0+IChcbiAgPFN0eWxlZEhvd1RvQnV0dG9uPlxuICAgIDxCdXR0b24gc2Vjb25kYXJ5IHNtYWxsIG9uQ2xpY2s9e29uQ2xpY2t9PkhvdyB0bzwvQnV0dG9uPlxuICA8L1N0eWxlZEhvd1RvQnV0dG9uPlxuKTtcblxuZXhwb3J0IGNvbnN0IExheWVyQ29sb3JTZWxlY3RvciA9ICh7bGF5ZXIsIG9uQ2hhbmdlLCBsYWJlbH0pID0+IChcbiAgPFNpZGVQYW5lbFNlY3Rpb24gZGlzYWJsZWQ9e2xheWVyLmNvbmZpZy5jb2xvckZpZWxkfT5cbiAgICA8Q29sb3JTZWxlY3RvclxuICAgICAgY29sb3JTZXRzPXtbXG4gICAgICAgIHtcbiAgICAgICAgICBzZWxlY3RlZENvbG9yOiBsYXllci5jb25maWcuY29sb3IsXG4gICAgICAgICAgc2V0Q29sb3I6IHJnYlZhbHVlID0+IG9uQ2hhbmdlKHtjb2xvcjogcmdiVmFsdWV9KVxuICAgICAgICB9XG4gICAgICBdfVxuICAgIC8+XG4gIDwvU2lkZVBhbmVsU2VjdGlvbj5cbik7XG5cbmV4cG9ydCBjb25zdCBBcmNMYXllckNvbG9yU2VsZWN0b3IgPSAoe1xuICBsYXllcixcbiAgb25DaGFuZ2VDb25maWcsXG4gIG9uQ2hhbmdlVmlzQ29uZmlnXG59KSA9PiAoXG4gIDxTaWRlUGFuZWxTZWN0aW9uPlxuICAgIDxDb2xvclNlbGVjdG9yXG4gICAgICBjb2xvclNldHM9e1tcbiAgICAgICAge1xuICAgICAgICAgIHNlbGVjdGVkQ29sb3I6IGxheWVyLmNvbmZpZy5jb2xvcixcbiAgICAgICAgICBzZXRDb2xvcjogcmdiVmFsdWUgPT4gb25DaGFuZ2VDb25maWcoe2NvbG9yOiByZ2JWYWx1ZX0pLFxuICAgICAgICAgIGxhYmVsOiAnU291cmNlJ1xuICAgICAgICB9LFxuICAgICAgICB7XG4gICAgICAgICAgc2VsZWN0ZWRDb2xvcjpcbiAgICAgICAgICAgIGxheWVyLmNvbmZpZy52aXNDb25maWcudGFyZ2V0Q29sb3IgfHwgbGF5ZXIuY29uZmlnLmNvbG9yLFxuICAgICAgICAgIHNldENvbG9yOiByZ2JWYWx1ZSA9PiBvbkNoYW5nZVZpc0NvbmZpZyh7dGFyZ2V0Q29sb3I6IHJnYlZhbHVlfSksXG4gICAgICAgICAgbGFiZWw6ICdUYXJnZXQnXG4gICAgICAgIH1cbiAgICAgIF19XG4gICAgLz5cbiAgPC9TaWRlUGFuZWxTZWN0aW9uPlxuKTtcblxuZXhwb3J0IGNvbnN0IENvbG9yUmFuZ2VDb25maWcgPSAoe2xheWVyLCBvbkNoYW5nZX0pID0+IChcbiAgPFNpZGVQYW5lbFNlY3Rpb24+XG4gICAgPENvbG9yU2VsZWN0b3JcbiAgICAgIGNvbG9yU2V0cz17W1xuICAgICAgICB7XG4gICAgICAgICAgc2VsZWN0ZWRDb2xvcjogbGF5ZXIuY29uZmlnLnZpc0NvbmZpZy5jb2xvclJhbmdlLFxuICAgICAgICAgIGlzUmFuZ2U6IHRydWUsXG4gICAgICAgICAgc2V0Q29sb3I6IGNvbG9yUmFuZ2UgPT4gb25DaGFuZ2Uoe2NvbG9yUmFuZ2V9KVxuICAgICAgICB9XG4gICAgICBdfVxuICAgIC8+XG4gIDwvU2lkZVBhbmVsU2VjdGlvbj5cbik7XG5cbmV4cG9ydCBjb25zdCBDaGFubmVsQnlWYWx1ZVNlbGVjdG9yID0gKHtcbiAgbGF5ZXIsXG4gIGNoYW5uZWwsXG4gIG9uQ2hhbmdlLFxuICBmaWVsZHMsXG4gIGRlc2NyaXB0aW9uXG59KSA9PiB7XG4gIGNvbnN0IHtcbiAgICBjaGFubmVsU2NhbGVUeXBlLFxuICAgIGRvbWFpbixcbiAgICBmaWVsZCxcbiAgICBrZXksXG4gICAgcHJvcGVydHksXG4gICAgcmFuZ2UsXG4gICAgc2NhbGUsXG4gICAgZGVmYXVsdE1lYXN1cmUsXG4gICAgc3VwcG9ydGVkRmllbGRUeXBlc1xuICB9ID0gY2hhbm5lbDtcbiAgY29uc3QgY2hhbm5lbFN1cHBvcnRlZEZpZWxkVHlwZXMgPSBzdXBwb3J0ZWRGaWVsZFR5cGVzIHx8IENIQU5ORUxfU0NBTEVfU1VQUE9SVEVEX0ZJRUxEU1tjaGFubmVsU2NhbGVUeXBlXTtcbiAgY29uc3Qgc3VwcG9ydGVkRmllbGRzID0gZmllbGRzLmZpbHRlcigoe3R5cGV9KSA9PlxuICAgIGNoYW5uZWxTdXBwb3J0ZWRGaWVsZFR5cGVzLmluY2x1ZGVzKHR5cGUpXG4gICk7XG4gIGNvbnN0IHNjYWxlT3B0aW9ucyA9IGxheWVyLmdldFNjYWxlT3B0aW9ucyhjaGFubmVsLmtleSk7XG4gIGNvbnN0IHNob3dTY2FsZSA9ICFsYXllci5pc0FnZ3JlZ2F0ZWQgJiYgbGF5ZXIuY29uZmlnW3NjYWxlXSAmJiBzY2FsZU9wdGlvbnMubGVuZ3RoID4gMTtcbiAgY29uc3QgZGVmYXVsdERlc2NyaXB0aW9uID0gYENhbGN1bGF0ZSAke3Byb3BlcnR5fSBiYXNlZCBvbiBzZWxlY3RlZCBmaWVsZGA7XG5cbiAgcmV0dXJuIChcbiAgICA8VmlzQ29uZmlnQnlGaWVsZFNlbGVjdG9yXG4gICAgICBjaGFubmVsPXtjaGFubmVsLmtleX1cbiAgICAgIGRlc2NyaXB0aW9uPXtkZXNjcmlwdGlvbiB8fCBkZWZhdWx0RGVzY3JpcHRpb259XG4gICAgICBkb21haW49e2xheWVyLmNvbmZpZ1tkb21haW5dfVxuICAgICAgZmllbGRzPXtzdXBwb3J0ZWRGaWVsZHN9XG4gICAgICBpZD17bGF5ZXIuaWR9XG4gICAgICBrZXk9e2Ake2tleX0tY2hhbm5lbC1zZWxlY3RvcmB9XG4gICAgICBwcm9wZXJ0eT17cHJvcGVydHl9XG4gICAgICBwbGFjZWhvbGRlcj17ZGVmYXVsdE1lYXN1cmUgfHwgJ1NlbGVjdCBhIGZpZWxkJ31cbiAgICAgIHJhbmdlPXtsYXllci5jb25maWcudmlzQ29uZmlnW3JhbmdlXX1cbiAgICAgIHNjYWxlT3B0aW9ucz17c2NhbGVPcHRpb25zfVxuICAgICAgc2NhbGVUeXBlPXtzY2FsZSA/IGxheWVyLmNvbmZpZ1tzY2FsZV0gOiBudWxsfVxuICAgICAgc2VsZWN0ZWRGaWVsZD17bGF5ZXIuY29uZmlnW2ZpZWxkXX1cbiAgICAgIHNob3dTY2FsZT17c2hvd1NjYWxlfVxuICAgICAgdXBkYXRlRmllbGQ9e3ZhbCA9PiBvbkNoYW5nZSh7W2ZpZWxkXTogdmFsfSwga2V5KX1cbiAgICAgIHVwZGF0ZVNjYWxlPXt2YWwgPT4gb25DaGFuZ2Uoe1tzY2FsZV06IHZhbH0sIGtleSl9XG4gICAgLz5cbiAgKTtcbn07XG5cbmV4cG9ydCBjb25zdCBBZ2dyQ29sb3JTY2FsZVNlbGVjdG9yID0gKHtsYXllciwgb25DaGFuZ2V9KSA9PiB7XG4gIGNvbnN0IHNjYWxlT3B0aW9ucyA9IGxheWVyLmdldFNjYWxlT3B0aW9ucygnY29sb3InKTtcbiAgcmV0dXJuIChcbiAgICBBcnJheS5pc0FycmF5KHNjYWxlT3B0aW9ucykgJiYgc2NhbGVPcHRpb25zLmxlbmd0aCA+IDEgP1xuICAgICAgPERpbWVuc2lvblNjYWxlU2VsZWN0b3JcbiAgICAgICAgbGFiZWw9XCJDb2xvciBTY2FsZVwiXG4gICAgICAgIG9wdGlvbnM9e3NjYWxlT3B0aW9uc31cbiAgICAgICAgc2NhbGVUeXBlPXtsYXllci5jb25maWcuY29sb3JTY2FsZX1cbiAgICAgICAgb25TZWxlY3Q9e3ZhbCA9PiBvbkNoYW5nZSh7Y29sb3JTY2FsZTogdmFsfSwgJ2NvbG9yJyl9XG4gICAgICAvPiA6IG51bGxcbiAgKTtcbn07XG5cbmV4cG9ydCBjb25zdCBBZ2dyZWdhdGlvblR5cGVTZWxlY3RvciA9ICh7bGF5ZXIsIGNoYW5uZWwsIG9uQ2hhbmdlfSkgPT4ge1xuICBjb25zdCB7ZmllbGQsIGFnZ3JlZ2F0aW9uLCBrZXl9ID0gY2hhbm5lbDtcbiAgY29uc3Qgc2VsZWN0ZWRGaWVsZCA9IGxheWVyLmNvbmZpZ1tmaWVsZF07XG4gIGNvbnN0IHt2aXNDb25maWd9ID0gbGF5ZXIuY29uZmlnO1xuXG4gIC8vIGFnZ3JlZ2F0aW9uIHNob3VsZCBvbmx5IGJlIHNlbGVjdGFibGUgd2hlbiBmaWVsZCBpcyBzZWxlY3RlZFxuICBjb25zdCBhZ2dyZWdhdGlvbk9wdGlvbnMgPSBsYXllci5nZXRBZ2dyZWdhdGlvbk9wdGlvbnMoa2V5KTtcblxuICByZXR1cm4gKFxuICAgIDxTaWRlUGFuZWxTZWN0aW9uPlxuICAgICAgPFBhbmVsTGFiZWw+e2BBZ2dyZWdhdGUgJHtzZWxlY3RlZEZpZWxkLm5hbWV9IGJ5YH08L1BhbmVsTGFiZWw+XG4gICAgICA8SXRlbVNlbGVjdG9yXG4gICAgICAgIHNlbGVjdGVkSXRlbXM9e3Zpc0NvbmZpZ1thZ2dyZWdhdGlvbl19XG4gICAgICAgIG9wdGlvbnM9e2FnZ3JlZ2F0aW9uT3B0aW9uc31cbiAgICAgICAgbXVsdGlTZWxlY3Q9e2ZhbHNlfVxuICAgICAgICBzZWFyY2hhYmxlPXtmYWxzZX1cbiAgICAgICAgb25DaGFuZ2U9e3ZhbHVlID0+XG4gICAgICAgICAgb25DaGFuZ2UoXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgIHZpc0NvbmZpZzoge1xuICAgICAgICAgICAgICAgIC4uLmxheWVyLmNvbmZpZy52aXNDb25maWcsXG4gICAgICAgICAgICAgICAgW2FnZ3JlZ2F0aW9uXTogdmFsdWVcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGNoYW5uZWwua2V5XG4gICAgICAgICAgKVxuICAgICAgICB9XG4gICAgICAvPlxuICAgIDwvU2lkZVBhbmVsU2VjdGlvbj5cbiAgKTtcbn07XG4vKiBlc2xpbnQtZW5hYmxlIG1heC1wYXJhbXMgKi9cbiJdfQ==