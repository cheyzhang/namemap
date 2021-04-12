'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = undefined;

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

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _deck = require('deck.gl');

var _luma = require('luma.gl');

var _shaderUtils = require('../layer-utils/shader-utils');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var defaultProps = (0, _extends3.default)({}, _deck.LineLayer.defaultProps, {
  // show arc if source is in brush
  brushSource: true,
  // show arc if target is in brush
  brushTarget: true,
  enableBrushing: true,
  getStrokeWidth: function getStrokeWidth(d) {
    return d.strokeWidth;
  },
  getTargetColor: function getTargetColor(x) {
    return x.color || [0, 0, 0, 255];
  },
  strokeScale: 1,

  // brush radius in meters
  brushRadius: 100000,
  mousePosition: [0, 0]
}); // Copyright (c) 2018 Uber Technologies, Inc.
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

function addBrushingVsShader(vs) {
  var targetColorVs = (0, _shaderUtils.editShader)(vs, 'line target color vs', 'attribute vec4 instanceColors;', 'attribute vec4 instanceColors; attribute vec4 instanceTargetColors;');

  var brushingVs = (0, _shaderUtils.editShader)(targetColorVs, 'line brushing vs', 'vec2 offset = getExtrusionOffset(target.xy - source.xy, positions.y);', 'vec2 offset = brushing_getExtrusionOffset(target.xy - source.xy, positions.y, project_uViewportSize, vec4(instanceSourcePositions.xy, instanceTargetPositions.xy), instanceWidths);');

  return (0, _shaderUtils.editShader)(brushingVs, 'line color vs', 'vColor = vec4(instanceColors.rgb, instanceColors.a * opacity) / 255.;', 'vec4 color = mix(instanceColors, instanceTargetColors, positions.x) / 255.;' + 'vColor = vec4(color.rgb, color.a * opacity);');
}

var LineBrushingLayer = function (_LineLayer) {
  (0, _inherits3.default)(LineBrushingLayer, _LineLayer);

  function LineBrushingLayer() {
    (0, _classCallCheck3.default)(this, LineBrushingLayer);
    return (0, _possibleConstructorReturn3.default)(this, (LineBrushingLayer.__proto__ || Object.getPrototypeOf(LineBrushingLayer)).apply(this, arguments));
  }

  (0, _createClass3.default)(LineBrushingLayer, [{
    key: 'getShaders',
    value: function getShaders() {
      var shaders = (0, _get3.default)(LineBrushingLayer.prototype.__proto__ || Object.getPrototypeOf(LineBrushingLayer.prototype), 'getShaders', this).call(this);
      // const addons = getExtrusion + isPicked + isPtInRange;

      return {
        // ...shaders,
        vs: addBrushingVsShader(shaders.vs),
        fs: shaders.fs,
        // vs: this.props.fp64 ? addons + vs64 : addons + vs,
        modules: shaders.modules.concat(['brushing'])
      };
    }
  }, {
    key: 'initializeState',
    value: function initializeState() {
      (0, _get3.default)(LineBrushingLayer.prototype.__proto__ || Object.getPrototypeOf(LineBrushingLayer.prototype), 'initializeState', this).call(this);
      var attributeManager = this.state.attributeManager;

      attributeManager.addInstanced({
        instanceTargetColors: {
          size: 4,
          type: _luma.GL.UNSIGNED_BYTE,
          accessor: 'getTargetColor',
          update: this.calculateInstanceTargetColors
        }
      });
    }
  }, {
    key: 'draw',
    value: function draw(_ref) {
      var uniforms = _ref.uniforms;
      var _props = this.props,
          brushSource = _props.brushSource,
          brushTarget = _props.brushTarget,
          brushRadius = _props.brushRadius,
          enableBrushing = _props.enableBrushing,
          mousePosition = _props.mousePosition,
          strokeScale = _props.strokeScale;


      (0, _get3.default)(LineBrushingLayer.prototype.__proto__ || Object.getPrototypeOf(LineBrushingLayer.prototype), 'draw', this).call(this, {
        uniforms: (0, _extends3.default)({}, uniforms, {
          brushing_uBrushSource: brushSource ? 1 : 0,
          brushing_uBrushTarget: brushTarget ? 1 : 0,
          brushing_uBrushRadius: brushRadius,
          brushing_uEnableBrushing: enableBrushing ? 1 : 0,
          brushing_uStrokeScale: strokeScale,
          brushing_uMousePosition: mousePosition ? new Float32Array(this.unproject(mousePosition)) : defaultProps.mousePosition
        })
      });
    }
  }, {
    key: 'calculateInstanceTargetColors',
    value: function calculateInstanceTargetColors(attribute) {
      var _props2 = this.props,
          data = _props2.data,
          getTargetColor = _props2.getTargetColor;
      var value = attribute.value,
          size = attribute.size;

      var i = 0;
      var _iteratorNormalCompletion = true;
      var _didIteratorError = false;
      var _iteratorError = undefined;

      try {
        for (var _iterator = data[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
          var object = _step.value;

          var color = getTargetColor(object);
          value[i + 0] = color[0];
          value[i + 1] = color[1];
          value[i + 2] = color[2];
          value[i + 3] = isNaN(color[3]) ? 255 : color[3];
          i += size;
        }
      } catch (err) {
        _didIteratorError = true;
        _iteratorError = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion && _iterator.return) {
            _iterator.return();
          }
        } finally {
          if (_didIteratorError) {
            throw _iteratorError;
          }
        }
      }
    }
  }]);
  return LineBrushingLayer;
}(_deck.LineLayer);

exports.default = LineBrushingLayer;


LineBrushingLayer.layerName = 'LineBrushingLayer';
LineBrushingLayer.defaultProps = defaultProps;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9kZWNrZ2wtbGF5ZXJzL2xpbmUtbGF5ZXIvbGluZS1sYXllci5qcyJdLCJuYW1lcyI6WyJkZWZhdWx0UHJvcHMiLCJMaW5lTGF5ZXIiLCJicnVzaFNvdXJjZSIsImJydXNoVGFyZ2V0IiwiZW5hYmxlQnJ1c2hpbmciLCJnZXRTdHJva2VXaWR0aCIsImQiLCJzdHJva2VXaWR0aCIsImdldFRhcmdldENvbG9yIiwieCIsImNvbG9yIiwic3Ryb2tlU2NhbGUiLCJicnVzaFJhZGl1cyIsIm1vdXNlUG9zaXRpb24iLCJhZGRCcnVzaGluZ1ZzU2hhZGVyIiwidnMiLCJ0YXJnZXRDb2xvclZzIiwiYnJ1c2hpbmdWcyIsIkxpbmVCcnVzaGluZ0xheWVyIiwic2hhZGVycyIsImZzIiwibW9kdWxlcyIsImNvbmNhdCIsImF0dHJpYnV0ZU1hbmFnZXIiLCJzdGF0ZSIsImFkZEluc3RhbmNlZCIsImluc3RhbmNlVGFyZ2V0Q29sb3JzIiwic2l6ZSIsInR5cGUiLCJHTCIsIlVOU0lHTkVEX0JZVEUiLCJhY2Nlc3NvciIsInVwZGF0ZSIsImNhbGN1bGF0ZUluc3RhbmNlVGFyZ2V0Q29sb3JzIiwidW5pZm9ybXMiLCJwcm9wcyIsImJydXNoaW5nX3VCcnVzaFNvdXJjZSIsImJydXNoaW5nX3VCcnVzaFRhcmdldCIsImJydXNoaW5nX3VCcnVzaFJhZGl1cyIsImJydXNoaW5nX3VFbmFibGVCcnVzaGluZyIsImJydXNoaW5nX3VTdHJva2VTY2FsZSIsImJydXNoaW5nX3VNb3VzZVBvc2l0aW9uIiwiRmxvYXQzMkFycmF5IiwidW5wcm9qZWN0IiwiYXR0cmlidXRlIiwiZGF0YSIsInZhbHVlIiwiaSIsIm9iamVjdCIsImlzTmFOIiwibGF5ZXJOYW1lIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBb0JBOztBQUNBOztBQUNBOzs7O0FBRUEsSUFBTUEsMENBQ0RDLGdCQUFVRCxZQURUO0FBRUo7QUFDQUUsZUFBYSxJQUhU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QkYsSUFBckIsOEhBQTJCO0FBQUEsY0FBaEJHLE1BQWdCOztBQUN6QixjQUFNdEMsUUFBUUYsZUFBZXdDLE1BQWYsQ0FBZDtBQUNBRixnQkFBTUMsSUFBSSxDQUFWLElBQWVyQyxNQUFNLENBQU4sQ0FBZjtBQUNBb0MsZ0JBQU1DLElBQUksQ0FBVixJQUFlckMsTUFBTSxDQUFOLENBQWY7QUFDQW9DLGdCQUFNQyxJQUFJLENBQVYsSUFBZXJDLE1BQU0sQ0FBTixDQUFmO0FBQ0FvQyxnQkFBTUMsSUFBSSxDQUFWLElBQWVFLE1BQU12QyxNQUFNLENBQU4sQ0FBTixJQUFrQixHQUFsQixHQUF3QkEsTUFBTSxDQUFOLENBQXZDO0FBQ0FxQyxlQUFLcEIsSUFBTDtBQUNEO0FBWHNDO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFZeEM7OztFQWhFNEMxQixlOztrQkFBMUJpQixpQjs7O0FBbUVyQkEsa0JBQWtCZ0MsU0FBbEIsR0FBOEIsbUJBQTlCO0FBQ0FoQyxrQkFBa0JsQixZQUFsQixHQUFpQ0EsWUFBakMiLCJmaWxlIjoibGluZS1sYXllci5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8vIENvcHlyaWdodCAoYykgMjAxOCBVYmVyIFRlY2hub2xvZ2llcywgSW5jLlxuLy9cbi8vIFBlcm1pc3Npb24gaXMgaGVyZWJ5IGdyYW50ZWQsIGZyZWUgb2YgY2hhcmdlLCB0byBhbnkgcGVyc29uIG9idGFpbmluZyBhIGNvcHlcbi8vIG9mIHRoaXMgc29mdHdhcmUgYW5kIGFzc29jaWF0ZWQgZG9jdW1lbnRhdGlvbiBmaWxlcyAodGhlIFwiU29mdHdhcmVcIiksIHRvIGRlYWxcbi8vIGluIHRoZSBTb2Z0d2FyZSB3aXRob3V0IHJlc3RyaWN0aW9uLCBpbmNsdWRpbmcgd2l0aG91dCBsaW1pdGF0aW9uIHRoZSByaWdodHNcbi8vIHRvIHVzZSwgY29weSwgbW9kaWZ5LCBtZXJnZSwgcHVibGlzaCwgZGlzdHJpYnV0ZSwgc3VibGljZW5zZSwgYW5kL29yIHNlbGxcbi8vIGNvcGllcyBvZiB0aGUgU29mdHdhcmUsIGFuZCB0byBwZXJtaXQgcGVyc29ucyB0byB3aG9tIHRoZSBTb2Z0d2FyZSBpc1xuLy8gZnVybmlzaGVkIHRvIGRvIHNvLCBzdWJqZWN0IHRvIHRoZSBmb2xsb3dpbmcgY29uZGl0aW9uczpcbi8vXG4vLyBUaGUgYWJvdmUgY29weXJpZ2h0IG5vdGljZSBhbmQgdGhpcyBwZXJtaXNzaW9uIG5vdGljZSBzaGFsbCBiZSBpbmNsdWRlZCBpblxuLy8gYWxsIGNvcGllcyBvciBzdWJzdGFudGlhbCBwb3J0aW9ucyBvZiB0aGUgU29mdHdhcmUuXG4vL1xuLy8gVEhFIFNPRlRXQVJFIElTIFBST1ZJREVEIFwiQVMgSVNcIiwgV0lUSE9VVCBXQVJSQU5UWSBPRiBBTlkgS0lORCwgRVhQUkVTUyBPUlxuLy8gSU1QTElFRCwgSU5DTFVESU5HIEJVVCBOT1QgTElNSVRFRCBUTyBUSEUgV0FSUkFOVElFUyBPRiBNRVJDSEFOVEFCSUxJVFksXG4vLyBGSVRORVNTIEZPUiBBIFBBUlRJQ1VMQVIgUFVSUE9TRSBBTkQgTk9OSU5GUklOR0VNRU5ULiBJTiBOTyBFVkVOVCBTSEFMTCBUSEVcbi8vIEFVVEhPUlMgT1IgQ09QWVJJR0hUIEhPTERFUlMgQkUgTElBQkxFIEZPUiBBTlkgQ0xBSU0sIERBTUFHRVMgT1IgT1RIRVJcbi8vIExJQUJJTElUWSwgV0hFVEhFUiBJTiBBTiBBQ1RJT04gT0YgQ09OVFJBQ1QsIFRPUlQgT1IgT1RIRVJXSVNFLCBBUklTSU5HIEZST00sXG4vLyBPVVQgT0YgT1IgSU4gQ09OTkVDVElPTiBXSVRIIFRIRSBTT0ZUV0FSRSBPUiBUSEUgVVNFIE9SIE9USEVSIERFQUxJTkdTIElOXG4vLyBUSEUgU09GVFdBUkUuXG5cbmltcG9ydCB7TGluZUxheWVyfSBmcm9tICdkZWNrLmdsJztcbmltcG9ydCB7R0x9IGZyb20gJ2x1bWEuZ2wnO1xuaW1wb3J0IHtlZGl0U2hhZGVyfSBmcm9tICdkZWNrZ2wtbGF5ZXJzL2xheWVyLXV0aWxzL3NoYWRlci11dGlscyc7XG5cbmNvbnN0IGRlZmF1bHRQcm9wcyA9IHtcbiAgLi4uTGluZUxheWVyLmRlZmF1bHRQcm9wcyxcbiAgLy8gc2hvdyBhcmMgaWYgc291cmNlIGlzIGluIGJydXNoXG4gIGJydXNoU291cmNlOiB0cnVlLFxuICAvLyBzaG93IGFyYyBpZiB0YXJnZXQgaXMgaW4gYnJ1c2hcbiAgYnJ1c2hUYXJnZXQ6IHRydWUsXG4gIGVuYWJsZUJydXNoaW5nOiB0cnVlLFxuICBnZXRTdHJva2VXaWR0aDogZCA9PiBkLnN0cm9rZVdpZHRoLFxuICBnZXRUYXJnZXRDb2xvcjogeCA9PiB4LmNvbG9yIHx8IFswLCAwLCAwLCAyNTVdLFxuICBzdHJva2VTY2FsZTogMSxcblxuICAvLyBicnVzaCByYWRpdXMgaW4gbWV0ZXJzXG4gIGJydXNoUmFkaXVzOiAxMDAwMDAsXG4gIG1vdXNlUG9zaXRpb246IFswLCAwXVxufTtcblxuZnVuY3Rpb24gYWRkQnJ1c2hpbmdWc1NoYWRlcih2cykge1xuICBjb25zdCB0YXJnZXRDb2xvclZzID0gZWRpdFNoYWRlcihcbiAgICB2cyxcbiAgICAnbGluZSB0YXJnZXQgY29sb3IgdnMnLFxuICAgICdhdHRyaWJ1dGUgdmVjNCBpbnN0YW5jZUNvbG9yczsnLFxuICAgICdhdHRyaWJ1dGUgdmVjNCBpbnN0YW5jZUNvbG9yczsgYXR0cmlidXRlIHZlYzQgaW5zdGFuY2VUYXJnZXRDb2xvcnM7J1xuICApO1xuXG4gIGNvbnN0IGJydXNoaW5nVnMgPSBlZGl0U2hhZGVyKFxuICAgIHRhcmdldENvbG9yVnMsXG4gICAgJ2xpbmUgYnJ1c2hpbmcgdnMnLFxuICAgICd2ZWMyIG9mZnNldCA9IGdldEV4dHJ1c2lvbk9mZnNldCh0YXJnZXQueHkgLSBzb3VyY2UueHksIHBvc2l0aW9ucy55KTsnLFxuICAgICd2ZWMyIG9mZnNldCA9IGJydXNoaW5nX2dldEV4dHJ1c2lvbk9mZnNldCh0YXJnZXQueHkgLSBzb3VyY2UueHksIHBvc2l0aW9ucy55LCBwcm9qZWN0X3VWaWV3cG9ydFNpemUsIHZlYzQoaW5zdGFuY2VTb3VyY2VQb3NpdGlvbnMueHksIGluc3RhbmNlVGFyZ2V0UG9zaXRpb25zLnh5KSwgaW5zdGFuY2VXaWR0aHMpOydcbiAgKTtcblxuICByZXR1cm4gZWRpdFNoYWRlcihcbiAgICBicnVzaGluZ1ZzLFxuICAgICdsaW5lIGNvbG9yIHZzJyxcbiAgICAndkNvbG9yID0gdmVjNChpbnN0YW5jZUNvbG9ycy5yZ2IsIGluc3RhbmNlQ29sb3JzLmEgKiBvcGFjaXR5KSAvIDI1NS47JyxcbiAgICBgdmVjNCBjb2xvciA9IG1peChpbnN0YW5jZUNvbG9ycywgaW5zdGFuY2VUYXJnZXRDb2xvcnMsIHBvc2l0aW9ucy54KSAvIDI1NS47YCArXG4gICAgYHZDb2xvciA9IHZlYzQoY29sb3IucmdiLCBjb2xvci5hICogb3BhY2l0eSk7YFxuICApXG59XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIExpbmVCcnVzaGluZ0xheWVyIGV4dGVuZHMgTGluZUxheWVyIHtcbiAgZ2V0U2hhZGVycygpIHtcbiAgICBjb25zdCBzaGFkZXJzID0gc3VwZXIuZ2V0U2hhZGVycygpO1xuICAgIC8vIGNvbnN0IGFkZG9ucyA9IGdldEV4dHJ1c2lvbiArIGlzUGlja2VkICsgaXNQdEluUmFuZ2U7XG5cbiAgICByZXR1cm4ge1xuICAgICAgLy8gLi4uc2hhZGVycyxcbiAgICAgIHZzOiBhZGRCcnVzaGluZ1ZzU2hhZGVyKHNoYWRlcnMudnMpLFxuICAgICAgZnM6IHNoYWRlcnMuZnMsXG4gICAgICAvLyB2czogdGhpcy5wcm9wcy5mcDY0ID8gYWRkb25zICsgdnM2NCA6IGFkZG9ucyArIHZzLFxuICAgICAgbW9kdWxlczogc2hhZGVycy5tb2R1bGVzLmNvbmNhdChbJ2JydXNoaW5nJ10pXG4gICAgfTtcbiAgfVxuXG4gIGluaXRpYWxpemVTdGF0ZSgpIHtcbiAgICBzdXBlci5pbml0aWFsaXplU3RhdGUoKTtcbiAgICBjb25zdCB7YXR0cmlidXRlTWFuYWdlcn0gPSB0aGlzLnN0YXRlO1xuICAgIGF0dHJpYnV0ZU1hbmFnZXIuYWRkSW5zdGFuY2VkKHtcbiAgICAgIGluc3RhbmNlVGFyZ2V0Q29sb3JzOiB7XG4gICAgICAgIHNpemU6IDQsXG4gICAgICAgIHR5cGU6IEdMLlVOU0lHTkVEX0JZVEUsXG4gICAgICAgIGFjY2Vzc29yOiAnZ2V0VGFyZ2V0Q29sb3InLFxuICAgICAgICB1cGRhdGU6IHRoaXMuY2FsY3VsYXRlSW5zdGFuY2VUYXJnZXRDb2xvcnNcbiAgICAgIH1cbiAgICB9KTtcbiAgfVxuXG4gIGRyYXcoe3VuaWZvcm1zfSkge1xuICAgIGNvbnN0IHtcbiAgICAgIGJydXNoU291cmNlLFxuICAgICAgYnJ1c2hUYXJnZXQsXG4gICAgICBicnVzaFJhZGl1cyxcbiAgICAgIGVuYWJsZUJydXNoaW5nLFxuICAgICAgbW91c2VQb3NpdGlvbixcbiAgICAgIHN0cm9rZVNjYWxlXG4gICAgfSA9IHRoaXMucHJvcHM7XG5cbiAgICBzdXBlci5kcmF3KHtcbiAgICAgIHVuaWZvcm1zOiB7XG4gICAgICAgIC4uLnVuaWZvcm1zLFxuICAgICAgICBicnVzaGluZ191QnJ1c2hTb3VyY2U6IGJydXNoU291cmNlID8gMSA6IDAsXG4gICAgICAgIGJydXNoaW5nX3VCcnVzaFRhcmdldDogYnJ1c2hUYXJnZXQgPyAxIDogMCxcbiAgICAgICAgYnJ1c2hpbmdfdUJydXNoUmFkaXVzOiBicnVzaFJhZGl1cyxcbiAgICAgICAgYnJ1c2hpbmdfdUVuYWJsZUJydXNoaW5nOiBlbmFibGVCcnVzaGluZyA/IDEgOiAwLFxuICAgICAgICBicnVzaGluZ191U3Ryb2tlU2NhbGU6IHN0cm9rZVNjYWxlLFxuICAgICAgICBicnVzaGluZ191TW91c2VQb3NpdGlvbjogbW91c2VQb3NpdGlvblxuICAgICAgICAgID8gbmV3IEZsb2F0MzJBcnJheSh0aGlzLnVucHJvamVjdChtb3VzZVBvc2l0aW9uKSlcbiAgICAgICAgICA6IGRlZmF1bHRQcm9wcy5tb3VzZVBvc2l0aW9uXG4gICAgICB9XG4gICAgfSk7XG4gIH1cblxuICBjYWxjdWxhdGVJbnN0YW5jZVRhcmdldENvbG9ycyhhdHRyaWJ1dGUpIHtcbiAgICBjb25zdCB7ZGF0YSwgZ2V0VGFyZ2V0Q29sb3J9ID0gdGhpcy5wcm9wcztcbiAgICBjb25zdCB7dmFsdWUsIHNpemV9ID0gYXR0cmlidXRlO1xuICAgIGxldCBpID0gMDtcbiAgICBmb3IgKGNvbnN0IG9iamVjdCBvZiBkYXRhKSB7XG4gICAgICBjb25zdCBjb2xvciA9IGdldFRhcmdldENvbG9yKG9iamVjdCk7XG4gICAgICB2YWx1ZVtpICsgMF0gPSBjb2xvclswXTtcbiAgICAgIHZhbHVlW2kgKyAxXSA9IGNvbG9yWzFdO1xuICAgICAgdmFsdWVbaSArIDJdID0gY29sb3JbMl07XG4gICAgICB2YWx1ZVtpICsgM10gPSBpc05hTihjb2xvclszXSkgPyAyNTUgOiBjb2xvclszXTtcbiAgICAgIGkgKz0gc2l6ZTtcbiAgICB9XG4gIH1cbn1cblxuTGluZUJydXNoaW5nTGF5ZXIubGF5ZXJOYW1lID0gJ0xpbmVCcnVzaGluZ0xheWVyJztcbkxpbmVCcnVzaGluZ0xheWVyLmRlZmF1bHRQcm9wcyA9IGRlZmF1bHRQcm9wcztcbiJdfQ==