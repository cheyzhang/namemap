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

var _arcLayer = require('../arc-layer/arc-layer');

var _arcLayer2 = _interopRequireDefault(_arcLayer);

var _lineLayer = require('../../deckgl-layers/line-layer/line-layer');

var _lineLayer2 = _interopRequireDefault(_lineLayer);

var _lineLayerIcon = require('./line-layer-icon');

var _lineLayerIcon2 = _interopRequireDefault(_lineLayerIcon);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var LineLayer = function (_ArcLayer) {
  (0, _inherits3.default)(LineLayer, _ArcLayer);

  function LineLayer() {
    (0, _classCallCheck3.default)(this, LineLayer);
    return (0, _possibleConstructorReturn3.default)(this, (LineLayer.__proto__ || Object.getPrototypeOf(LineLayer)).apply(this, arguments));
  }

  (0, _createClass3.default)(LineLayer, [{
    key: 'renderLayer',
    value: function renderLayer(_ref) {
      var data = _ref.data,
          idx = _ref.idx,
          layerInteraction = _ref.layerInteraction,
          objectHovered = _ref.objectHovered,
          mapState = _ref.mapState,
          interactionConfig = _ref.interactionConfig;
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

      return [
      // base layer
      new _lineLayer2.default((0, _extends3.default)({}, layerInteraction, data, interaction, {
        getColor: data.getSourceColor,
        id: this.id,
        idx: idx,
        fp64: this.config.visConfig['hi-precision'],
        opacity: this.config.visConfig.opacity,
        strokeScale: this.config.visConfig.thickness,
        // parameters
        parameters: { depthTest: mapState.dragRotate },
        updateTriggers: {
          getStrokeWidth: {
            sizeField: this.config.sizeField,
            sizeRange: this.config.visConfig.sizeRange
          },
          getColor: colorUpdateTriggers,
          getTargetColor: colorUpdateTriggers
        }
      }))];
    }
  }, {
    key: 'type',
    get: function get() {
      return 'line';
    }
  }, {
    key: 'layerIcon',
    get: function get() {
      return _lineLayerIcon2.default;
    }
  }], [{
    key: 'findDefaultLayerProps',
    value: function findDefaultLayerProps(_ref2) {
      var fieldPairs = _ref2.fieldPairs;

      if (fieldPairs.length < 2) {
        return [];
      }
      var props = {};

      // connect the first two point layer with arc
      props.columns = {
        lat0: fieldPairs[0].pair.lat,
        lng0: fieldPairs[0].pair.lng,
        lat1: fieldPairs[1].pair.lat,
        lng1: fieldPairs[1].pair.lng
      };
      props.label = fieldPairs[0].defaultName + ' -> ' + fieldPairs[1].defaultName + ' line';

      return props;
    }
  }]);
  return LineLayer;
}(_arcLayer2.default); // Copyright (c) 2018 Uber Technologies, Inc.
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

exports.default = LineLayer;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9sYXllcnMvbGluZS1sYXllci9saW5lLWxheWVyLmpzIl0sIm5hbWVzIjpbIkxpbmVMYXllciIsImRhdGEiLCJpZHgiLCJsYXllckludGVyYWN0aW9uIiwib2JqZWN0SG92ZXJlZCIsIm1hcFN0YXRlIiwiaW50ZXJhY3Rpb25Db25maWciLCJicnVzaCIsImNvbG9yVXBkYXRlVHJpZ2dlcnMiLCJjb2xvciIsImNvbmZpZyIsImNvbG9yRmllbGQiLCJjb2xvclJhbmdlIiwidmlzQ29uZmlnIiwiY29sb3JTY2FsZSIsInRhcmdldENvbG9yIiwiaW50ZXJhY3Rpb24iLCJwaWNrYWJsZSIsImF1dG9IaWdobGlnaHQiLCJlbmFibGVkIiwiaGlnaGxpZ2h0Q29sb3IiLCJicnVzaFJhZGl1cyIsInNpemUiLCJicnVzaFNvdXJjZSIsImJydXNoVGFyZ2V0IiwiZW5hYmxlQnJ1c2hpbmciLCJEZWNrR0xMaW5lTGF5ZXIiLCJnZXRDb2xvciIsImdldFNvdXJjZUNvbG9yIiwiaWQiLCJmcDY0Iiwib3BhY2l0eSIsInN0cm9rZVNjYWxlIiwidGhpY2tuZXNzIiwicGFyYW1ldGVycyIsImRlcHRoVGVzdCIsImRyYWdSb3RhdGUiLCJ1cGRhdGVUcmlnZ2VycyIsImdldFN0cm9rZVdpZHRoIiwic2l6ZUZpZWxkIiwic2l6ZVJhbmdlIiwiZ2V0VGFyZ2V0Q29sb3IiLCJMaW5lTGF5ZXJJY29uIiwiZmllbGRQYWlycyIsImxlbmd0aCIsInByb3BzIiwiY29sdW1ucyIsImxhdDAiLCJwYWlyIiwibGF0IiwibG5nMCIsImxuZyIsImxhdDEiLCJsbmcxIiwibGFiZWwiLCJkZWZhdWx0TmFtZSIsIkFyY0xheWVyIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFvQkE7Ozs7QUFDQTs7OztBQUNBOzs7Ozs7SUFFcUJBLFM7Ozs7Ozs7Ozs7c0NBb0NoQjtBQUFBLFVBTkRDLElBTUMsUUFOREEsSUFNQztBQUFBLFVBTERDLEdBS0MsUUFM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ZXIgVGVjaG5vbG9naWVzLCBJbmMuXG4vL1xuLy8gUGVybWlzc2lvbiBpcyBoZXJlYnkgZ3JhbnRlZCwgZnJlZSBvZiBjaGFyZ2UsIHRvIGFueSBwZXJzb24gb2J0YWluaW5nIGEgY29weVxuLy8gb2YgdGhpcyBzb2Z0d2FyZSBhbmQgYXNzb2NpYXRlZCBkb2N1bWVudGF0aW9uIGZpbGVzICh0aGUgXCJTb2Z0d2FyZVwiKSwgdG8gZGVhbFxuLy8gaW4gdGhlIFNvZnR3YXJlIHdpdGhvdXQgcmVzdHJpY3Rpb24sIGluY2x1ZGluZyB3aXRob3V0IGxpbWl0YXRpb24gdGhlIHJpZ2h0c1xuLy8gdG8gdXNlLCBjb3B5LCBtb2RpZnksIG1lcmdlLCBwdWJsaXNoLCBkaXN0cmlidXRlLCBzdWJsaWNlbnNlLCBhbmQvb3Igc2VsbFxuLy8gY29waWVzIG9mIHRoZSBTb2Z0d2FyZSwgYW5kIHRvIHBlcm1pdCBwZXJzb25zIHRvIHdob20gdGhlIFNvZnR3YXJlIGlzXG4vLyBmdXJuaXNoZWQgdG8gZG8gc28sIHN1YmplY3QgdG8gdGhlIGZvbGxvd2luZyBjb25kaXRpb25zOlxuLy9cbi8vIFRoZSBhYm92ZSBjb3B5cmlnaHQgbm90aWNlIGFuZCB0aGlzIHBlcm1pc3Npb24gbm90aWNlIHNoYWxsIGJlIGluY2x1ZGVkIGluXG4vLyBhbGwgY29waWVzIG9yIHN1YnN0YW50aWFsIHBvcnRpb25zIG9mIHRoZSBTb2Z0d2FyZS5cbi8vXG4vLyBUSEUgU09GVFdBUkUgSVMgUFJPVklERUQgXCJBUyBJU1wiLCBXSVRIT1VUIFdBUlJBTlRZIE9GIEFOWSBLSU5ELCBFWFBSRVNTIE9SXG4vLyBJTVBMSUVELCBJTkNMVURJTkcgQlVUIE5PVCBMSU1JVEVEIFRPIFRIRSBXQVJSQU5USUVTIE9GIE1FUkNIQU5UQUJJTElUWSxcbi8vIEZJVE5FU1MgRk9SIEEgUEFSVElDVUxBUiBQVVJQT1NFIEFORCBOT05JTkZSSU5HRU1FTlQuIElOIE5PIEVWRU5UIFNIQUxMIFRIRVxuLy8gQVVUSE9SUyBPUiBDT1BZUklHSFQgSE9MREVSUyBCRSBMSUFCTEUgRk9SIEFOWSBDTEFJTSwgREFNQUdFUyBPUiBPVEhFUlxuLy8gTElBQklMSVRZLCBXSEVUSEVSIElOIEFOIEFDVElPTiBPRiBDT05UUkFDVCwgVE9SVCBPUiBPVEhFUldJU0UsIEFSSVNJTkcgRlJPTSxcbi8vIE9VVCBPRiBPUiBJTiBDT05ORUNUSU9OIFdJVEggVEhFIFNPRlRXQVJFIE9SIFRIRSBVU0UgT1IgT1RIRVIgREVBTElOR1MgSU5cbi8vIFRIRSBTT0ZUV0FSRS5cblxuaW1wb3J0IEFyY0xheWVyIGZyb20gJy4uL2FyYy1sYXllci9hcmMtbGF5ZXInO1xuaW1wb3J0IERlY2tHTExpbmVMYXllciBmcm9tICdkZWNrZ2wtbGF5ZXJzL2xpbmUtbGF5ZXIvbGluZS1sYXllcic7XG5pbXBvcnQgTGluZUxheWVySWNvbiBmcm9tICcuL2xpbmUtbGF5ZXItaWNvbic7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIExpbmVMYXllciBleHRlbmRzIEFyY0xheWVyIHtcbiAgZ2V0IHR5cGUoKSB7XG4gICAgcmV0dXJuICdsaW5lJztcbiAgfVxuXG4gIGdldCBsYXllckljb24oKSB7XG4gICAgcmV0dXJuIExpbmVMYXllckljb247XG4gIH1cblxuICBzdGF0aWMgZmluZERlZmF1bHRMYXllclByb3BzKHtmaWVsZFBhaXJzfSkge1xuICAgIGlmIChmaWVsZFBhaXJzLmxlbmd0aCA8IDIpIHtcbiAgICAgIHJldHVybiBbXTtcbiAgICB9XG4gICAgY29uc3QgcHJvcHMgPSB7fTtcblxuICAgIC8vIGNvbm5lY3QgdGhlIGZpcnN0IHR3byBwb2ludCBsYXllciB3aXRoIGFyY1xuICAgIHByb3BzLmNvbHVtbnMgPSB7XG4gICAgICBsYXQwOiBmaWVsZFBhaXJzWzBdLnBhaXIubGF0LFxuICAgICAgbG5nMDogZmllbGRQYWlyc1swXS5wYWlyLmxuZyxcbiAgICAgIGxhdDE6IGZpZWxkUGFpcnNbMV0ucGFpci5sYXQsXG4gICAgICBsbmcxOiBmaWVsZFBhaXJzWzFdLnBhaXIubG5nXG4gICAgfTtcbiAgICBwcm9wcy5sYWJlbCA9IGAke2ZpZWxkUGFpcnNbMF0uZGVmYXVsdE5hbWV9IC0+ICR7XG4gICAgICBmaWVsZFBhaXJzWzFdLmRlZmF1bHROYW1lXG4gICAgICB9IGxpbmVgO1xuXG4gICAgcmV0dXJuIHByb3BzO1xuICB9XG5cbiAgcmVuZGVyTGF5ZXIoe1xuICAgIGRhdGEsXG4gICAgaWR4LFxuICAgIGxheWVySW50ZXJhY3Rpb24sXG4gICAgb2JqZWN0SG92ZXJlZCxcbiAgICBtYXBTdGF0ZSxcbiAgICBpbnRlcmFjdGlvbkNvbmZpZ1xuICB9KSB7XG4gICAgY29uc3Qge2JydXNofSA9IGludGVyYWN0aW9uQ29uZmlnO1xuXG4gICAgY29uc3QgY29sb3JVcGRhdGVUcmlnZ2VycyA9IHtcbiAgICAgIGNvbG9yOiB0aGlzLmNvbmZpZy5jb2xvcixcbiAgICAgIGNvbG9yRmllbGQ6IHRoaXMuY29uZmlnLmNvbG9yRmllbGQsXG4gICAgICBjb2xvclJhbmdlOiB0aGlzLmNvbmZpZy52aXNDb25maWcuY29sb3JSYW5nZSxcbiAgICAgIGNvbG9yU2NhbGU6IHRoaXMuY29uZmlnLmNvbG9yU2NhbGUsXG4gICAgICB0YXJnZXRDb2xvcjogdGhpcy5jb25maWcudmlzQ29uZmlnLnRhcmdldENvbG9yXG4gICAgfTtcblxuICAgIGNvbnN0IGludGVyYWN0aW9uID0ge1xuICAgICAgLy8gYXV0byBoaWdobGlnaHRpbmdcbiAgICAgIHBpY2thYmxlOiB0cnVlLFxuICAgICAgYXV0b0hpZ2hsaWdodDogIWJydXNoLmVuYWJsZWQsXG4gICAgICBoaWdobGlnaHRDb2xvcjogdGhpcy5jb25maWcuaGlnaGxpZ2h0Q29sb3IsXG5cbiAgICAgIC8vIGJydXNoaW5nXG4gICAgICBicnVzaFJhZGl1czogYnJ1c2guY29uZmlnLnNpemUgKiAxMDAwLFxuICAgICAgYnJ1c2hTb3VyY2U6IHRydWUsXG4gICAgICBicnVzaFRhcmdldDogdHJ1ZSxcbiAgICAgIGVuYWJsZUJydXNoaW5nOiBicnVzaC5lbmFibGVkXG4gICAgfTtcblxuICAgIHJldHVybiBbXG4gICAgICAvLyBiYXNlIGxheWVyXG4gICAgICBuZXcgRGVja0dMTGluZUxheWVyKHtcbiAgICAgICAgLi4ubGF5ZXJJbnRlcmFjdGlvbixcbiAgICAgICAgLi4uZGF0YSxcbiAgICAgICAgLi4uaW50ZXJhY3Rpb24sXG4gICAgICAgIGdldENvbG9yOiBkYXRhLmdldFNvdXJjZUNvbG9yLFxuICAgICAgICBpZDogdGhpcy5pZCxcbiAgICAgICAgaWR4LFxuICAgICAgICBmcDY0OiB0aGlzLmNvbmZpZy52aXNDb25maWdbJ2hpLXByZWNpc2lvbiddLFxuICAgICAgICBvcGFjaXR5OiB0aGlzLmNvbmZpZy52aXNDb25maWcub3BhY2l0eSxcbiAgICAgICAgc3Ryb2tlU2NhbGU6IHRoaXMuY29uZmlnLnZpc0NvbmZpZy50aGlja25lc3MsXG4gICAgICAgIC8vIHBhcmFtZXRlcnNcbiAgICAgICAgcGFyYW1ldGVyczoge2RlcHRoVGVzdDogbWFwU3RhdGUuZHJhZ1JvdGF0ZX0sXG4gICAgICAgIHVwZGF0ZVRyaWdnZXJzOiB7XG4gICAgICAgICAgZ2V0U3Ryb2tlV2lkdGg6IHtcbiAgICAgICAgICAgIHNpemVGaWVsZDogdGhpcy5jb25maWcuc2l6ZUZpZWxkLFxuICAgICAgICAgICAgc2l6ZVJhbmdlOiB0aGlzLmNvbmZpZy52aXNDb25maWcuc2l6ZVJhbmdlXG4gICAgICAgICAgfSxcbiAgICAgICAgICBnZXRDb2xvcjogY29sb3JVcGRhdGVUcmlnZ2VycyxcbiAgICAgICAgICBnZXRUYXJnZXRDb2xvcjogY29sb3JVcGRhdGVUcmlnZ2Vyc1xuICAgICAgICB9XG4gICAgICB9KVxuICAgIF07XG4gIH1cbn1cbiJdfQ==