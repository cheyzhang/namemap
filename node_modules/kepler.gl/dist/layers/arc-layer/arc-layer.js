'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.arctVisConfigs = exports.arcRequiredColumns = exports.arcPosResolver = exports.arcPosAccessor = undefined;

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

var _baseLayer = require('../base-layer');

var _baseLayer2 = _interopRequireDefault(_baseLayer);

var _arcBrushingLayer = require('../../deckgl-layers/arc-brushing-layer/arc-brushing-layer');

var _arcBrushingLayer2 = _interopRequireDefault(_arcBrushingLayer);

var _colorUtils = require('../../utils/color-utils');

var _arcLayerIcon = require('./arc-layer-icon');

var _arcLayerIcon2 = _interopRequireDefault(_arcLayerIcon);

var _defaultSettings = require('../../constants/default-settings');

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

var arcPosAccessor = exports.arcPosAccessor = function arcPosAccessor(_ref) {
  var lat0 = _ref.lat0,
      lng0 = _ref.lng0,
      lat1 = _ref.lat1,
      lng1 = _ref.lng1;
  return function (d) {
    return [d.data[lng0.fieldIdx], d.data[lat0.fieldIdx], 0, d.data[lng1.fieldIdx], d.data[lat1.fieldIdx], 0];
  };
};

var arcPosResolver = exports.arcPosResolver = function arcPosResolver(_ref2) {
  var lat0 = _ref2.lat0,
      lng0 = _ref2.lng0,
      lat1 = _ref2.lat1,
      lng1 = _ref2.lng1;
  return lat0.fieldIdx + '-' + lng0.fieldIdx + '-' + lat1.fieldIdx + '-' + lat1.fieldIdx + '}';
};

var arcRequiredColumns = exports.arcRequiredColumns = ['lat0', 'lng0', 'lat1', 'lng1'];

var arctVisConfigs = exports.arctVisConfigs = {
  opacity: 'opacity',
  thickness: 'thickness',
  colorRange: 'colorRange',
  sizeRange: 'strokeWidthRange',
  targetColor: 'targetColor',
  'hi-precision': 'hi-precision'
};

var ArcLayer = function (_Layer) {
  (0, _inherits3.default)(ArcLayer, _Layer);

  function ArcLayer(props) {
    (0, _classCallCheck3.default)(this, ArcLayer);

    var _this = (0, _possibleConstructorReturn3.default)(this, (ArcLayer.__proto__ || Object.getPrototypeOf(ArcLayer)).call(this, props));

    _this.registerVisConfig(arctVisConfigs);
    _this.getPosition = (0, _lodash2.default)(arcPosAccessor, arcPosResolver);
    return _this;
  }

  (0, _createClass3.default)(ArcLayer, [{
    key: 'formatLayerData',
    value: function formatLayerData(_, allData, filteredIndex, oldLayerData) {
      var _this2 = this;

      var opt = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : {};
      var _config = this.config,
          colorScale = _config.colorScale,
          colorDomain = _config.colorDomain,
          colorField = _config.colorField,
          color = _config.color,
          columns = _config.columns,
          sizeField = _config.sizeField,
          sizeScale = _config.sizeScale,
          sizeDomain = _config.sizeDomain,
          _config$visConfig = _config.visConfig,
          sizeRange = _config$visConfig.sizeRange,
          colorRange = _config$visConfig.colorRange,
          targetColor = _config$visConfig.targetColor;

      // arc color

      var cScale = colorField && this.getVisChannelScale(colorScale, colorDomain, colorRange.colors.map(_colorUtils.hexToRgb));

      // arc thickness
      var sScale = sizeField && this.getVisChannelScale(sizeScale, sizeDomain, sizeRange);

      var getPosition = this.getPosition(columns);

      if (!oldLayerData || oldLayerData.getPosition !== getPosition) {
        this.updateLayerMeta(allData, getPosition);
      }

      var data = void 0;
      if (oldLayerData && oldLayerData.data && opt.sameData && oldLayerData.getPosition === getPosition) {
        data = oldLayerData.data;
      } else {
        data = filteredIndex.reduce(function (accu, index) {
          var pos = getPosition({ data: allData[index] });

          // if doesn't have point lat or lng, do not add the arc
          // deck.gl can't handle position == null
          if (!pos.every(Number.isFinite)) {
            return accu;
          }

          accu.push({
            index: index,
            sourcePosition: [pos[0], pos[1], pos[2]],
            targetPosition: [pos[3], pos[4], pos[5]],
            data: allData[index]
          });

          return accu;
        }, []);
      }

      var getStrokeWidth = sScale ? function (d) {
        return _this2.getEncodedChannelValue(sScale, d.data, sizeField, 0);
      } : 1;

      var getColor = cScale ? function (d) {
        return _this2.getEncodedChannelValue(cScale, d.data, colorField);
      } : color;

      var getTargetColor = cScale ? function (d) {
        return _this2.getEncodedChannelValue(cScale, d.data, colorField);
      } : targetColor || color;

      return {
        data: data,
        getColor: getColor,
        getSourceColor: getColor,
        getTargetColor: getTargetColor,
        getStrokeWidth: getStrokeWidth
      };
    }
  }, {
    key: 'updateLayerMeta',
    value: function updateLayerMeta(allData, getPosition) {
      // get bounds from arcs
      var sBounds = this.getPointsBounds(allData, function (d) {
        var pos = getPosition({ data: d });
        return [pos[0], pos[1]];
      });

      var tBounds = this.getPointsBounds(allData, function (d) {
        var pos = getPosition({ data: d });
        return [pos[3], pos[4]];
      });

      var bounds = tBounds && sBounds ? [Math.min(sBounds[0], tBounds[0]), Math.min(sBounds[1], tBounds[1]), Math.max(sBounds[2], tBounds[2]), Math.max(sBounds[3], tBounds[3])] : sBounds || tBounds;

      this.updateMeta({ bounds: bounds });
    }
  }, {
    key: 'renderLayer',
    value: function renderLayer(_ref3) {
      var data = _ref3.data,
          idx = _ref3.idx,
          objectHovered = _ref3.objectHovered,
          layerInteraction = _ref3.layerInteraction,
          mapState = _ref3.mapState,
          interactionConfig = _ref3.interactionConfig;
      var brush = interactionConfig.brush;


      var colorUpdateTriggers = {
        color: this.config.color,
        colorField: this.config.colorField,
        colorRange: this.config.visConfig.colorRange,
        colorScale: this.config.colorScale,
        targetColor: this.config.visConfig.targetColor
      };

      var interaction = {
        // auto highlighting
        pickable: true,
        autoHighlight: !brush.enabled,
        highlightColor: this.config.highlightColor,

        // brushing
        brushRadius: brush.config.size * 1000,
        brushSource: true,
        brushTarget: true,
        enableBrushing: brush.enabled
      };

      return [new _arcBrushingLayer2.default((0, _extends3.default)({}, data, interaction, layerInteraction, {
        id: this.id,
        idx: idx,
        fp64: this.config.visConfig['hi-precision'],
        opacity: this.config.visConfig.opacity,
        pickedColor: this.config.highlightColor,
        strokeScale: this.config.visConfig.thickness,

        // parameters
        parameters: { depthTest: mapState.dragRotate },

        updateTriggers: {
          getStrokeWidth: {
            sizeField: this.config.sizeField,
            sizeRange: this.config.visConfig.sizeRange
          },
          getSourceColor: colorUpdateTriggers,
          getTargetColor: colorUpdateTriggers
        }
      }))];
    }
  }, {
    key: 'type',
    get: function get() {
      return 'arc';
    }
  }, {
    key: 'isAggregated',
    get: function get() {
      return false;
    }
  }, {
    key: 'layerIcon',
    get: function get() {
      return _arcLayerIcon2.default;
    }
  }, {
    key: 'requiredLayerColumns',
    get: function get() {
      return arcRequiredColumns;
    }
  }, {
    key: 'columnPairs',
    get: function get() {
      return this.defaultLinkColumnPairs;
    }
  }, {
    key: 'visualChannels',
    get: function get() {
      return (0, _extends3.default)({}, (0, _get3.default)(ArcLayer.prototype.__proto__ || Object.getPrototypeOf(ArcLayer.prototype), 'visualChannels', this), {
        size: (0, _extends3.default)({}, (0, _get3.default)(ArcLayer.prototype.__proto__ || Object.getPrototypeOf(ArcLayer.prototype), 'visualChannels', this).size, {
          property: 'stroke'
        })
      });
    }
  }], [{
    key: 'findDefaultLayerProps',
    value: function findDefaultLayerProps(_ref4) {
      var _ref4$fieldPairs = _ref4.fieldPairs,
          fieldPairs = _ref4$fieldPairs === undefined ? [] : _ref4$fieldPairs;

      if (fieldPairs.length < 2) {
        return [];
      }
      var props = {
        color: (0, _colorUtils.hexToRgb)(_defaultSettings.DEFAULT_LAYER_COLOR.tripArc)
      };

      // connect the first two point layer with arc
      props.columns = {
        lat0: fieldPairs[0].pair.lat,
        lng0: fieldPairs[0].pair.lng,
        lat1: fieldPairs[1].pair.lat,
        lng1: fieldPairs[1].pair.lng
      };
      props.label = fieldPairs[0].defaultName + ' -> ' + fieldPairs[1].defaultName + ' arc';

      return props;
    }
  }]);
  return ArcLayer;
}(_baseLayer2.default);

exports.default = ArcLayer;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9sYXllcnMvYXJjLWxheWVyL2FyYy1sYXllci5qcyJdLCJuYW1lcyI6WyJhcmNQb3NBY2Nlc3NvciIsImxhdDAiLCJsbmcwIiwibGF0MSIsImxuZzEiLCJkIiwiZGF0YSIsImZpZWxkSWR4IiwiYXJjUG9zUmVzb2x2ZXIiLCJhcmNSZXF1aXJlZENvbHVtbnMiLCJhcmN0VmlzQ29uZmlncyIsIm9wYWNpdHkiLCJ0aGlja25lc3MiLCJjb2xvclJhbmdlIiwic2l6ZVJhbmdlIiwidGFyZ2V0Q29sb3IiLCJBcmNMYXllciIsInByb3BzIiwicmVnaXN0ZXJWaXNDb25maWciLCJnZXRQb3NpdGlvbiIsIl8iLCJhbGxEYXRhIiwiZmlsdGVyZWRJbmRleCIsIm9sZExheWVyRGF0YSIsIm9wdCIsImNvbmZpZyIsImNvbG9yU2NhbGUiLCJjb2xvckRvbWFpbiIsImNvbG9yRmllbGQiLCJjb2xvciIsImNvbHVtbnMiLCJzaXplRmllbGQiLCJzaXplU2NhbGUiLCJzaXplRG9tYWluIiwidmlzQ29uZmlnIiwiY1NjYWxlIiwiZ2V0VmlzQ2hhbm5lbFNjYWxlIiwiY29sb3JzIiwibWFwIiwiaGV4VG9SZ2IiLCJzU2NhbGUiLCJ1cGRhdGVMYXllck1ldGEiLCJzYW1lRGF0YSIsInJlZHVjZSIsImFjY3UiLCJpbmRleCIsInBvcyIsImV2ZXJ5IiwiTnVtYmVyIiwiaXNGaW5pdGUiLCJwdXNoIiwic291cmNlUG9zaXRpb24iLCJ0YXJnZXRQb3NpdGlvbiIsImdldFN0cm9rZVdpZHRoIiwiZ2V0RW5jb2RlZENoYW5uZWxWYWx1ZSIsImdldENvbG9yIiwiZ2V0VGFyZ2V0Q29sb3IiLCJnZXRTb3VyY2VDb2xvciIsInNCb3VuZHMiLCJnZXRQb2ludHNCb3VuZHMiLCJ0Qm91bmRzIiwiYm91bmRzIiwiTWF0aCIsIm1pbiIsIm1heCIsInVwZGF0ZU1ldGEiLCJpZHgiLCJvYmplY3RIb3ZlcmVkIiwibGF5ZXJJbnRlcmFjdGlvbiIsIm1hcFN0YXRlIiwiaW50ZXJhY3Rpb25Db25maWciLCJicnVzaCIsImNvbG9yVXBkYXRlVHJpZ2dlcnMiLCJpbnRlcmFjdGlvbiIsInBpY2thYmxlIiwiYXV0b0hpZ2hsaWdodCIsImVuYWJsZWQiLCJoaWdobGlnaHRDb2xvciIsImJydXNoUmFkaXVzIiwic2l6ZSIsImJydXNoU291cmNlIiwiYnJ1c2hUYXJnZXQiLCJlbmFibGVCcnVzaGluZyIsIkFyY0JydXNoaW5nTGF5ZXIiLCJpZCIsImZwNjQiLCJwaWNrZWRDb2xvciIsInN0cm9rZVNjYWxlIiwicGFyYW1ldGVycyIsImRlcHRoVGVzdCIsImRyYWdSb3RhdGUiLCJ1cGRhdGVUcmlnZ2VycyIsIkFyY0xheWVySWNvbiIsImRlZmF1bHRMaW5rQ29sdW1uUGFpcnMiLCJwcm9wZXJ0eSIsImZpZWxkUGFpcnMiLCJsZW5ndGgiLCJERUZBVUxUX0xBWUVSX0NPTE9SIiwidHJpcEFyYyIsInBhaXIiLCJsYXQiLCJsbmciLCJsYWJlbCIsImRlZmF1bHROYW1lIiwiTGF5ZXIiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFvQkE7Ozs7QUFFQTs7OztBQUNBOzs7O0FBQ0E7O0FBQ0E7Ozs7QUFDQTs7OztBQTFCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFVTyxJQUFNQSwwQ0FBaUIsU0FBakJBLGNBQWlCO0FBQUEsTUFBRUMsSUFBRixRQUFFQSxJQUFGO0FBQUEsTUFBUUMsSUFBUixRQUFRQSxJQUFSO0FBQUEsTUFBY0MsSUFBZCxRQUFjQSxJQUFkO0FBQUEsTUFBb0JDLElBQXBCLFFBQW9CQSxJQUFwQjtBQUFBLFNBQThCO0FBQUEsV0FBSyxDQUMvREMsRUFBRUMsSUFBRixDQUFPSixLQUFLSyxRQUFaLENBRCtELEVBRS9ERixFQUFFQyxJQUFGLENBQU9MLEtBQUtNLFFBQVosQ0FGK0QsRUFHL0QsQ0FIK0QsRUFJL0RGLEVB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dCI6WyIvLyBDb3B5cmlnaHQgKGMpIDIwMTggVWJlciBUZWNobm9sb2dpZXMsIEluYy5cbi8vXG4vLyBQZXJtaXNzaW9uIGlzIGhlcmVieSBncmFudGVkLCBmcmVlIG9mIGNoYXJnZSwgdG8gYW55IHBlcnNvbiBvYnRhaW5pbmcgYSBjb3B5XG4vLyBvZiB0aGlzIHNvZnR3YXJlIGFuZCBhc3NvY2lhdGVkIGRvY3VtZW50YXRpb24gZmlsZXMgKHRoZSBcIlNvZnR3YXJlXCIpLCB0byBkZWFsXG4vLyBpbiB0aGUgU29mdHdhcmUgd2l0aG91dCByZXN0cmljdGlvbiwgaW5jbHVkaW5nIHdpdGhvdXQgbGltaXRhdGlvbiB0aGUgcmlnaHRzXG4vLyB0byB1c2UsIGNvcHksIG1vZGlmeSwgbWVyZ2UsIHB1Ymxpc2gsIGRpc3RyaWJ1dGUsIHN1YmxpY2Vuc2UsIGFuZC9vciBzZWxsXG4vLyBjb3BpZXMgb2YgdGhlIFNvZnR3YXJlLCBhbmQgdG8gcGVybWl0IHBlcnNvbnMgdG8gd2hvbSB0aGUgU29mdHdhcmUgaXNcbi8vIGZ1cm5pc2hlZCB0byBkbyBzbywgc3ViamVjdCB0byB0aGUgZm9sbG93aW5nIGNvbmRpdGlvbnM6XG4vL1xuLy8gVGhlIGFib3ZlIGNvcHlyaWdodCBub3RpY2UgYW5kIHRoaXMgcGVybWlzc2lvbiBub3RpY2Ugc2hhbGwgYmUgaW5jbHVkZWQgaW5cbi8vIGFsbCBjb3BpZXMgb3Igc3Vic3RhbnRpYWwgcG9ydGlvbnMgb2YgdGhlIFNvZnR3YXJlLlxuLy9cbi8vIFRIRSBTT0ZUV0FSRSBJUyBQUk9WSURFRCBcIkFTIElTXCIsIFdJVEhPVVQgV0FSUkFOVFkgT0YgQU5ZIEtJTkQsIEVYUFJFU1MgT1Jcbi8vIElNUExJRUQsIElOQ0xVRElORyBCVVQgTk9UIExJTUlURUQgVE8gVEhFIFdBUlJBTlRJRVMgT0YgTUVSQ0hBTlRBQklMSVRZLFxuLy8gRklUTkVTUyBGT1IgQSBQQVJUSUNVTEFSIFBVUlBPU0UgQU5EIE5PTklORlJJTkdFTUVOVC4gSU4gTk8gRVZFTlQgU0hBTEwgVEhFXG4vLyBBVVRIT1JTIE9SIENPUFlSSUdIVCBIT0xERVJTIEJFIExJQUJMRSBGT1IgQU5ZIENMQUlNLCBEQU1BR0VTIE9SIE9USEVSXG4vLyBMSUFCSUxJVFksIFdIRVRIRVIgSU4gQU4gQUNUSU9OIE9GIENPTlRSQUNULCBUT1JUIE9SIE9USEVSV0lTRSwgQVJJU0lORyBGUk9NLFxuLy8gT1VUIE9GIE9SIElOIENPTk5FQ1RJT04gV0lUSCBUSEUgU09GVFdBUkUgT1IgVEhFIFVTRSBPUiBPVEhFUiBERUFMSU5HUyBJTlxuLy8gVEhFIFNPRlRXQVJFLlxuXG5pbXBvcnQgbWVtb2l6ZSBmcm9tICdsb2Rhc2gubWVtb2l6ZSc7XG5cbmltcG9ydCBMYXllciBmcm9tICcuLi9iYXNlLWxheWVyJztcbmltcG9ydCBBcmNCcnVzaGluZ0xheWVyIGZyb20gJ2RlY2tnbC1sYXllcnMvYXJjLWJydXNoaW5nLWxheWVyL2FyYy1icnVzaGluZy1sYXllcic7XG5pbXBvcnQge2hleFRvUmdifSBmcm9tICd1dGlscy9jb2xvci11dGlscyc7XG5pbXBvcnQgQXJjTGF5ZXJJY29uIGZyb20gJy4vYXJjLWxheWVyLWljb24nO1xuaW1wb3J0IHtERUZBVUxUX0xBWUVSX0NPTE9SfSBmcm9tICdjb25zdGFudHMvZGVmYXVsdC1zZXR0aW5ncyc7XG5cbmV4cG9ydCBjb25zdCBhcmNQb3NBY2Nlc3NvciA9ICh7bGF0MCwgbG5nMCwgbGF0MSwgbG5nMX0pID0+IGQgPT4gW1xuICBkLmRhdGFbbG5nMC5maWVsZElkeF0sXG4gIGQuZGF0YVtsYXQwLmZpZWxkSWR4XSxcbiAgMCxcbiAgZC5kYXRhW2xuZzEuZmllbGRJZHhdLFxuICBkLmRhdGFbbGF0MS5maWVsZElkeF0sXG4gIDBcbl07XG5cbmV4cG9ydCBjb25zdCBhcmNQb3NSZXNvbHZlciA9ICh7bGF0MCwgbG5nMCwgbGF0MSwgbG5nMX0pID0+XG4gIGAke2xhdDAuZmllbGRJZHh9LSR7bG5nMC5maWVsZElkeH0tJHtsYXQxLmZpZWxkSWR4fS0ke2xhdDEuZmllbGRJZHh9fWA7XG5cbmV4cG9ydCBjb25zdCBhcmNSZXF1aXJlZENvbHVtbnMgPSBbJ2xhdDAnLCAnbG5nMCcsICdsYXQxJywgJ2xuZzEnXTtcblxuZXhwb3J0IGNvbnN0IGFyY3RWaXNDb25maWdzID0ge1xuICBvcGFjaXR5OiAnb3BhY2l0eScsXG4gIHRoaWNrbmVzczogJ3RoaWNrbmVzcycsXG4gIGNvbG9yUmFuZ2U6ICdjb2xvclJhbmdlJyxcbiAgc2l6ZVJhbmdlOiAnc3Ryb2tlV2lkdGhSYW5nZScsXG4gIHRhcmdldENvbG9yOiAndGFyZ2V0Q29sb3InLFxuICAnaGktcHJlY2lzaW9uJzogJ2hpLXByZWNpc2lvbidcbn07XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEFyY0xheWVyIGV4dGVuZHMgTGF5ZXIge1xuICBjb25zdHJ1Y3Rvcihwcm9wcykge1xuICAgIHN1cGVyKHByb3BzKTtcbiAgICB0aGlzLnJlZ2lzdGVyVmlzQ29uZmlnKGFyY3RWaXNDb25maWdzKTtcbiAgICB0aGlzLmdldFBvc2l0aW9uID0gbWVtb2l6ZShhcmNQb3NBY2Nlc3NvciwgYXJjUG9zUmVzb2x2ZXIpO1xuICB9XG5cbiAgZ2V0IHR5cGUoKSB7XG4gICAgcmV0dXJuICdhcmMnO1xuICB9XG5cbiAgZ2V0IGlzQWdncmVnYXRlZCgpIHtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cblxuICBnZXQgbGF5ZXJJY29uKCkge1xuICAgIHJldHVybiBBcmNMYXllckljb247XG4gIH1cblxuICBnZXQgcmVxdWlyZWRMYXllckNvbHVtbnMoKSB7XG4gICAgcmV0dXJuIGFyY1JlcXVpcmVkQ29sdW1ucztcbiAgfVxuXG4gIGdldCBjb2x1bW5QYWlycygpIHtcbiAgICByZXR1cm4gdGhpcy5kZWZhdWx0TGlua0NvbHVtblBhaXJzO1xuICB9XG5cbiAgZ2V0IHZpc3VhbENoYW5uZWxzKCkge1xuICAgIHJldHVybiB7XG4gICAgICAuLi5zdXBlci52aXN1YWxDaGFubmVscyxcbiAgICAgIHNpemU6IHtcbiAgICAgICAgLi4uc3VwZXIudmlzdWFsQ2hhbm5lbHMuc2l6ZSxcbiAgICAgICAgcHJvcGVydHk6ICdzdHJva2UnXG4gICAgICB9XG4gICAgfTtcbiAgfVxuXG4gIHN0YXRpYyBmaW5kRGVmYXVsdExheWVyUHJvcHMoe2ZpZWxkUGFpcnMgPSBbXX0pIHtcbiAgICBpZiAoZmllbGRQYWlycy5sZW5ndGggPCAyKSB7XG4gICAgICByZXR1cm4gW107XG4gICAgfVxuICAgIGNvbnN0IHByb3BzID0ge1xuICAgICAgY29sb3I6IGhleFRvUmdiKERFRkFVTFRfTEFZRVJfQ09MT1IudHJpcEFyYylcbiAgICB9O1xuXG4gICAgLy8gY29ubmVjdCB0aGUgZmlyc3QgdHdvIHBvaW50IGxheWVyIHdpdGggYXJjXG4gICAgcHJvcHMuY29sdW1ucyA9IHtcbiAgICAgIGxhdDA6IGZpZWxkUGFpcnNbMF0ucGFpci5sYXQsXG4gICAgICBsbmcwOiBmaWVsZFBhaXJzWzBdLnBhaXIubG5nLFxuICAgICAgbGF0MTogZmllbGRQYWlyc1sxXS5wYWlyLmxhdCxcbiAgICAgIGxuZzE6IGZpZWxkUGFpcnNbMV0ucGFpci5sbmdcbiAgICB9O1xuICAgIHByb3BzLmxhYmVsID0gYCR7ZmllbGRQYWlyc1swXS5kZWZhdWx0TmFtZX0gLT4gJHtcbiAgICAgIGZpZWxkUGFpcnNbMV0uZGVmYXVsdE5hbWVcbiAgICB9IGFyY2A7XG5cbiAgICByZXR1cm4gcHJvcHM7XG4gIH1cblxuICBmb3JtYXRMYXllckRhdGEoXywgYWxsRGF0YSwgZmlsdGVyZWRJbmRleCwgb2xkTGF5ZXJEYXRhLCBvcHQgPSB7fSkge1xuICAgIGNvbnN0IHtcbiAgICAgIGNvbG9yU2NhbGUsXG4gICAgICBjb2xvckRvbWFpbixcbiAgICAgIGNvbG9yRmllbGQsXG4gICAgICBjb2xvcixcbiAgICAgIGNvbHVtbnMsXG4gICAgICBzaXplRmllbGQsXG4gICAgICBzaXplU2NhbGUsXG4gICAgICBzaXplRG9tYWluLFxuICAgICAgdmlzQ29uZmlnOiB7c2l6ZVJhbmdlLCBjb2xvclJhbmdlLCB0YXJnZXRDb2xvcn1cbiAgICB9ID0gdGhpcy5jb25maWc7XG5cbiAgICAvLyBhcmMgY29sb3JcbiAgICBjb25zdCBjU2NhbGUgPVxuICAgICAgY29sb3JGaWVsZCAmJlxuICAgICAgdGhpcy5nZXRWaXNDaGFubmVsU2NhbGUoXG4gICAgICAgIGNvbG9yU2NhbGUsXG4gICAgICAgIGNvbG9yRG9tYWluLFxuICAgICAgICBjb2xvclJhbmdlLmNvbG9ycy5tYXAoaGV4VG9SZ2IpXG4gICAgICApO1xuXG4gICAgLy8gYXJjIHRoaWNrbmVzc1xuICAgIGNvbnN0IHNTY2FsZSA9XG4gICAgICBzaXplRmllbGQgJiYgdGhpcy5nZXRWaXNDaGFubmVsU2NhbGUoc2l6ZVNjYWxlLCBzaXplRG9tYWluLCBzaXplUmFuZ2UpO1xuXG4gICAgY29uc3QgZ2V0UG9zaXRpb24gPSB0aGlzLmdldFBvc2l0aW9uKGNvbHVtbnMpO1xuXG4gICAgaWYgKCFvbGRMYXllckRhdGEgfHwgb2xkTGF5ZXJEYXRhLmdldFBvc2l0aW9uICE9PSBnZXRQb3NpdGlvbikge1xuICAgICAgdGhpcy51cGRhdGVMYXllck1ldGEoYWxsRGF0YSwgZ2V0UG9zaXRpb24pO1xuICAgIH1cblxuICAgIGxldCBkYXRhO1xuICAgIGlmIChcbiAgICAgIG9sZExheWVyRGF0YSAmJlxuICAgICAgb2xkTGF5ZXJEYXRhLmRhdGEgJiZcbiAgICAgIG9wdC5zYW1lRGF0YSAmJlxuICAgICAgb2xkTGF5ZXJEYXRhLmdldFBvc2l0aW9uID09PSBnZXRQb3NpdGlvblxuICAgICkge1xuICAgICAgZGF0YSA9IG9sZExheWVyRGF0YS5kYXRhO1xuICAgIH0gZWxzZSB7XG4gICAgICBkYXRhID0gZmlsdGVyZWRJbmRleC5yZWR1Y2UoKGFjY3UsIGluZGV4KSA9PiB7XG4gICAgICAgIGNvbnN0IHBvcyA9IGdldFBvc2l0aW9uKHtkYXRhOiBhbGxEYXRhW2luZGV4XX0pO1xuXG4gICAgICAgIC8vIGlmIGRvZXNuJ3QgaGF2ZSBwb2ludCBsYXQgb3IgbG5nLCBkbyBub3QgYWRkIHRoZSBhcmNcbiAgICAgICAgLy8gZGVjay5nbCBjYW4ndCBoYW5kbGUgcG9zaXRpb24gPT0gbnVsbFxuICAgICAgICBpZiAoIXBvcy5ldmVyeShOdW1iZXIuaXNGaW5pdGUpKSB7XG4gICAgICAgICAgcmV0dXJuIGFjY3U7XG4gICAgICAgIH1cblxuICAgICAgICBhY2N1LnB1c2goe1xuICAgICAgICAgIGluZGV4LFxuICAgICAgICAgIHNvdXJjZVBvc2l0aW9uOiBbcG9zWzBdLCBwb3NbMV0sIHBvc1syXV0sXG4gICAgICAgICAgdGFyZ2V0UG9zaXRpb246IFtwb3NbM10sIHBvc1s0XSwgcG9zWzVdXSxcbiAgICAgICAgICBkYXRhOiBhbGxEYXRhW2luZGV4XVxuICAgICAgICB9KTtcblxuICAgICAgICByZXR1cm4gYWNjdTtcbiAgICAgIH0sIFtdKTtcbiAgICB9XG5cbiAgICBjb25zdCBnZXRTdHJva2VXaWR0aCA9IHNTY2FsZSA/IGQgPT5cbiAgICAgICB0aGlzLmdldEVuY29kZWRDaGFubmVsVmFsdWUoc1NjYWxlLCBkLmRhdGEsIHNpemVGaWVsZCwgMCkgOiAxO1xuXG4gICAgY29uc3QgZ2V0Q29sb3IgPSBjU2NhbGUgPyBkID0+XG4gICAgICAgdGhpcy5nZXRFbmNvZGVkQ2hhbm5lbFZhbHVlKGNTY2FsZSwgZC5kYXRhLCBjb2xvckZpZWxkKSA6IGNvbG9yO1xuXG4gICAgY29uc3QgZ2V0VGFyZ2V0Q29sb3IgPSBjU2NhbGUgPyBkID0+XG4gICAgICAgdGhpcy5nZXRFbmNvZGVkQ2hhbm5lbFZhbHVlKGNTY2FsZSwgZC5kYXRhLCBjb2xvckZpZWxkKVxuICAgICAgICA6IHRhcmdldENvbG9yIHx8IGNvbG9yO1xuXG4gICAgcmV0dXJuIHtcbiAgICAgIGRhdGEsXG4gICAgICBnZXRDb2xvcixcbiAgICAgIGdldFNvdXJjZUNvbG9yOiBnZXRDb2xvcixcbiAgICAgIGdldFRhcmdldENvbG9yLFxuICAgICAgZ2V0U3Ryb2tlV2lkdGhcbiAgICB9O1xuICB9XG5cbiAgdXBkYXRlTGF5ZXJNZXRhKGFsbERhdGEsIGdldFBvc2l0aW9uKSB7XG4gICAgLy8gZ2V0IGJvdW5kcyBmcm9tIGFyY3NcbiAgICBjb25zdCBzQm91bmRzID0gdGhpcy5nZXRQb2ludHNCb3VuZHMoYWxsRGF0YSwgZCA9PiB7XG4gICAgICBjb25zdCBwb3MgPSBnZXRQb3NpdGlvbih7ZGF0YTogZH0pO1xuICAgICAgcmV0dXJuIFtwb3NbMF0sIHBvc1sxXV07XG4gICAgfSk7XG5cbiAgICBjb25zdCB0Qm91bmRzID0gdGhpcy5nZXRQb2ludHNCb3VuZHMoYWxsRGF0YSwgZCA9PiB7XG4gICAgICBjb25zdCBwb3MgPSBnZXRQb3NpdGlvbih7ZGF0YTogZH0pO1xuICAgICAgcmV0dXJuIFtwb3NbM10sIHBvc1s0XV07XG4gICAgfSk7XG5cbiAgICBjb25zdCBib3VuZHMgPVxuICAgICAgdEJvdW5kcyAmJiBzQm91bmRzXG4gICAgICAgID8gW1xuICAgICAgICAgICAgTWF0aC5taW4oc0JvdW5kc1swXSwgdEJvdW5kc1swXSksXG4gICAgICAgICAgICBNYXRoLm1pbihzQm91bmRzWzFdLCB0Qm91bmRzWzFdKSxcbiAgICAgICAgICAgIE1hdGgubWF4KHNCb3VuZHNbMl0sIHRCb3VuZHNbMl0pLFxuICAgICAgICAgICAgTWF0aC5tYXgoc0JvdW5kc1szXSwgdEJvdW5kc1szXSlcbiAgICAgICAgICBdXG4gICAgICAgIDogc0JvdW5kcyB8fCB0Qm91bmRzO1xuXG4gICAgdGhpcy51cGRhdGVNZXRhKHtib3VuZHN9KTtcbiAgfVxuXG4gIHJlbmRlckxheWVyKHtcbiAgICBkYXRhLFxuICAgIGlkeCxcbiAgICBvYmplY3RIb3ZlcmVkLFxuICAgIGxheWVySW50ZXJhY3Rpb24sXG4gICAgbWFwU3RhdGUsXG4gICAgaW50ZXJhY3Rpb25Db25maWdcbiAgfSkge1xuICAgIGNvbnN0IHticnVzaH0gPSBpbnRlcmFjdGlvbkNvbmZpZztcblxuICAgIGNvbnN0IGNvbG9yVXBkYXRlVHJpZ2dlcnMgPSB7XG4gICAgICBjb2xvcjogdGhpcy5jb25maWcuY29sb3IsXG4gICAgICBjb2xvckZpZWxkOiB0aGlzLmNvbmZpZy5jb2xvckZpZWxkLFxuICAgICAgY29sb3JSYW5nZTogdGhpcy5jb25maWcudmlzQ29uZmlnLmNvbG9yUmFuZ2UsXG4gICAgICBjb2xvclNjYWxlOiB0aGlzLmNvbmZpZy5jb2xvclNjYWxlLFxuICAgICAgdGFyZ2V0Q29sb3I6IHRoaXMuY29uZmlnLnZpc0NvbmZpZy50YXJnZXRDb2xvclxuICAgIH07XG5cbiAgICBjb25zdCBpbnRlcmFjdGlvbiA9IHtcbiAgICAgIC8vIGF1dG8gaGlnaGxpZ2h0aW5nXG4gICAgICBwaWNrYWJsZTogdHJ1ZSxcbiAgICAgIGF1dG9IaWdobGlnaHQ6ICFicnVzaC5lbmFibGVkLFxuICAgICAgaGlnaGxpZ2h0Q29sb3I6IHRoaXMuY29uZmlnLmhpZ2hsaWdodENvbG9yLFxuXG4gICAgICAvLyBicnVzaGluZ1xuICAgICAgYnJ1c2hSYWRpdXM6IGJydXNoLmNvbmZpZy5zaXplICogMTAwMCxcbiAgICAgIGJydXNoU291cmNlOiB0cnVlLFxuICAgICAgYnJ1c2hUYXJnZXQ6IHRydWUsXG4gICAgICBlbmFibGVCcnVzaGluZzogYnJ1c2guZW5hYmxlZFxuICAgIH07XG5cbiAgICByZXR1cm4gW1xuICAgICAgbmV3IEFyY0JydXNoaW5nTGF5ZXIoe1xuICAgICAgICAuLi5kYXRhLFxuICAgICAgICAuLi5pbnRlcmFjdGlvbixcbiAgICAgICAgLi4ubGF5ZXJJbnRlcmFjdGlvbixcbiAgICAgICAgaWQ6IHRoaXMuaWQsXG4gICAgICAgIGlkeCxcbiAgICAgICAgZnA2NDogdGhpcy5jb25maWcudmlzQ29uZmlnWydoaS1wcmVjaXNpb24nXSxcbiAgICAgICAgb3BhY2l0eTogdGhpcy5jb25maWcudmlzQ29uZmlnLm9wYWNpdHksXG4gICAgICAgIHBpY2tlZENvbG9yOiB0aGlzLmNvbmZpZy5oaWdobGlnaHRDb2xvcixcbiAgICAgICAgc3Ryb2tlU2NhbGU6IHRoaXMuY29uZmlnLnZpc0NvbmZpZy50aGlja25lc3MsXG5cbiAgICAgICAgLy8gcGFyYW1ldGVyc1xuICAgICAgICBwYXJhbWV0ZXJzOiB7ZGVwdGhUZXN0OiBtYXBTdGF0ZS5kcmFnUm90YXRlfSxcblxuICAgICAgICB1cGRhdGVUcmlnZ2Vyczoge1xuICAgICAgICAgIGdldFN0cm9rZVdpZHRoOiB7XG4gICAgICAgICAgICBzaXplRmllbGQ6IHRoaXMuY29uZmlnLnNpemVGaWVsZCxcbiAgICAgICAgICAgIHNpemVSYW5nZTogdGhpcy5jb25maWcudmlzQ29uZmlnLnNpemVSYW5nZVxuICAgICAgICAgIH0sXG4gICAgICAgICAgZ2V0U291cmNlQ29sb3I6IGNvbG9yVXBkYXRlVHJpZ2dlcnMsXG4gICAgICAgICAgZ2V0VGFyZ2V0Q29sb3I6IGNvbG9yVXBkYXRlVHJpZ2dlcnNcbiAgICAgICAgfVxuICAgICAgfSlcbiAgICBdO1xuICB9XG59XG4iXX0=