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

var _shaderUtils = require('../layer-utils/shader-utils');

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

function addBrushingVsShader(vs) {
  return (0, _shaderUtils.editShader)(vs, 'scatterplot brushing vs', 'outerRadiusPixels += outline * strokeWidth / 2.0;', 'outerRadiusPixels = brushing_getRadius(instancePositions, outerRadiusPixels + outline * strokeWidth / 2.0);');
}

var defaultProps = (0, _extends3.default)({}, _deck.ScatterplotLayer.defaultProps, {
  enableBrushing: true,
  // brush radius in meters
  brushRadius: 100000,
  mousePosition: [0, 0],
  outsideBrushRadius: 0
});

var ScatterplotBrushingLayer = function (_ScatterplotLayer) {
  (0, _inherits3.default)(ScatterplotBrushingLayer, _ScatterplotLayer);

  function ScatterplotBrushingLayer() {
    (0, _classCallCheck3.default)(this, ScatterplotBrushingLayer);
    return (0, _possibleConstructorReturn3.default)(this, (ScatterplotBrushingLayer.__proto__ || Object.getPrototypeOf(ScatterplotBrushingLayer)).apply(this, arguments));
  }

  (0, _createClass3.default)(ScatterplotBrushingLayer, [{
    key: 'getShaders',
    value: function getShaders() {
      var shaders = (0, _get3.default)(ScatterplotBrushingLayer.prototype.__proto__ || Object.getPrototypeOf(ScatterplotBrushingLayer.prototype), 'getShaders', this).call(this);
      return {
        vs: addBrushingVsShader(shaders.vs),
        fs: shaders.fs,
        modules: shaders.modules.concat(['brushing'])
      };
    }
  }, {
    key: 'draw',
    value: function draw(opts) {
      var uniforms = opts.uniforms;
      var _props = this.props,
          brushRadius = _props.brushRadius,
          enableBrushing = _props.enableBrushing,
          mousePosition = _props.mousePosition,
          outsideBrushRadius = _props.outsideBrushRadius;

      // add uniforms

      (0, _get3.default)(ScatterplotBrushingLayer.prototype.__proto__ || Object.getPrototypeOf(ScatterplotBrushingLayer.prototype), 'draw', this).call(this, (0, _extends3.default)({}, opts, {
        uniforms: (0, _extends3.default)({}, uniforms, {
          brushing_uBrushRadius: brushRadius,
          brushing_uOutsideBrushRadius: outsideBrushRadius,
          brushing_uMousePosition: mousePosition ? new Float32Array(this.unproject(mousePosition)) : defaultProps.mousePosition,
          brushing_uEnableBrushing: enableBrushing ? 1 : 0
        })
      }));
    }
  }]);
  return ScatterplotBrushingLayer;
}(_deck.ScatterplotLayer);

exports.default = ScatterplotBrushingLayer;


ScatterplotBrushingLayer.layerName = 'ScatterplotBrushingLayer';
ScatterplotBrushingLayer.defaultProps = defaultProps;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9kZWNrZ2wtbGF5ZXJzL3NjYXR0ZXJwbG90LWJydXNoaW5nLWxheWVyL3NjYXR0ZXJwbG90LWJydXNoaW5nLWxheWVyLmpzIl0sIm5hbWVzIjpbImFkZEJydXNoaW5nVnNTaGFkZXIiLCJ2cyIsImRlZmF1bHRQcm9wcyIsIlNjYXR0ZXJwbG90TGF5ZXIiLCJlbmFibGVCcnVzaGluZyIsImJydXNoUmFkaXVzIiwibW91c2VQb3NpdGlvbiIsIm91dHNpZGVCcnVzaFJhZGl1cyIsIlNjYXR0ZXJwbG90QnJ1c2hpbmdMYXllciIsInNoYWRlcnMiLCJmcyIsIm1vZHVsZXMiLCJjb25jYXQiLCJvcHRzIiwidW5pZm9ybXMiLCJwcm9wcyIsImJydXNoaW5nX3VCcnVzaFJhZGl1cyIsImJydXNoaW5nX3VPdXRzaWRlQnJ1c2hSYWRpdXMiLCJicnVzaGluZ191TW91c2VQb3NpdGlvbiIsIkZsb2F0MzJBcnJheSIsInVucHJvamVjdCIsImJydXNoaW5nX3VFbmFibGVCcnVzaGluZyIsImxheWVyTmFtZSJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQW9CQTs7QUFDQTs7OztBQXJCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFLQSxTQUFTQSxtQkFBVCxDQUE2QkMsRUFBN0IsRUFBaUM7QUFDL0IsU0FBTyw2QkFDTEEsRUFESyxFQUVMLHlCQUZLLEVBR0wsbURBSEssRUFJTCw2R0FKSyxDQUFQO0FBTUQ7O0FBRUQsSUFBTUMsMENBQ0RDLHVCQUFpQkQsWUFEaEI7QUFFSkUsa0JBQWdCLElBRlo7QUFHSjtBQUNBQyxlQUFhLE1BSlQ7QUFLSkMsaUJBQWUsQ0FBQyxDQUFELEVBQUksQ0FBSixDQUxYO0FBTUpDLHNCQUFvQjtBQU5oQixFQUFOOztJQVNxQkMsd0I7Ozs7Ozs7Ozs7aUNBRU47QUFDWCxVQUFNQyxzS0FBTjtBQUNBLGFBQU87QUFDTFIsWUFBSUQsb0JBQW9CUyxRQUFRUixFQUE1QixDQURDO0FBRUxTLFlBQUlELFFBQVFDLEVBRlA7QUFHTEMsaUJBQVNGLFFBQVFFLE9BQVIsQ0FBZ0JDLE1BQWhCLENBQXVCLENBQUMsVUFBRCxDQUF2QjtBQUhKLE9BQVA7QUFLRDs7O3lCQUNJQyxJLEVBQU07QUFBQSxVQUNGQyxRQURFLEdBQ1VELElBRFYsQ0FDRkMsUUFERTtBQUFBLG1CQU9MLEtBQUtDLEtBUEE7QUFBQSxVQUdQVixXQUhPLFVBR1BBLFdBSE87QUFBQSxVQUlQRCxjQUpPLFVBSVBBLGNBSk87QUFBQSxVQUtQRSxhQUxPLFVBS1BBLGFBTE87QUFBQSxVQU1QQyxrQkFOTyxVQU1QQSxrQkFOTzs7QUFTVDs7QUFDQSx3TEFDS00sSUFETDtBQUVFQyw2Q0FDS0EsUUFETDtBQUVFRSxpQ0FBdUJYLFdBRnpCO0FBR0VZLHdDQUE4QlYsa0JBSGhDO0FBSUVXLG1DQUF5QlosZ0JBQ3JCLElBQUlhLFlBQUosQ0FBaUIsS0FBS0MsU0FBTCxDQUFlZCxhQUFmLENBQWpCLENBRHFCLEdBRXJCSixhQUFhSSxhQU5uQjtBQU9FZSxvQ0FBMEJqQixpQkFBaUIsQ0FBakIsR0FBcUI7QUFQakQ7QUFGRjtBQVlEOzs7RUFoQ21ERCxzQjs7a0JBQWpDSyx3Qjs7O0FBbUNyQkEseUJBQXlCYyxTQUF6QixHQUFxQywwQkFBckM7QUFDQWQseUJBQXlCTixZQUF6QixHQUF3Q0EsWUFBeEMiLCJmaWxlIjoic2NhdHRlcnBsb3QtYnJ1c2hpbmctbGF5ZXIuanMiLCJzb3VyY2VzQ29udGVudCI6WyIvLyBDb3B5cmlnaHQgKGMpIDIwMTggVWJlciBUZWNobm9sb2dpZXMsIEluYy5cbi8vXG4vLyBQZXJtaXNzaW9uIGlzIGhlcmVieSBncmFudGVkLCBmcmVlIG9mIGNoYXJnZSwgdG8gYW55IHBlcnNvbiBvYnRhaW5pbmcgYSBjb3B5XG4vLyBvZiB0aGlzIHNvZnR3YXJlIGFuZCBhc3NvY2lhdGVkIGRvY3VtZW50YXRpb24gZmlsZXMgKHRoZSBcIlNvZnR3YXJlXCIpLCB0byBkZWFsXG4vLyBpbiB0aGUgU29mdHdhcmUgd2l0aG91dCByZXN0cmljdGlvbiwgaW5jbHVkaW5nIHdpdGhvdXQgbGltaXRhdGlvbiB0aGUgcmlnaHRzXG4vLyB0byB1c2UsIGNvcHksIG1vZGlmeSwgbWVyZ2UsIHB1Ymxpc2gsIGRpc3RyaWJ1dGUsIHN1YmxpY2Vuc2UsIGFuZC9vciBzZWxsXG4vLyBjb3BpZXMgb2YgdGhlIFNvZnR3YXJlLCBhbmQgdG8gcGVybWl0IHBlcnNvbnMgdG8gd2hvbSB0aGUgU29mdHdhcmUgaXNcbi8vIGZ1cm5pc2hlZCB0byBkbyBzbywgc3ViamVjdCB0byB0aGUgZm9sbG93aW5nIGNvbmRpdGlvbnM6XG4vL1xuLy8gVGhlIGFib3ZlIGNvcHlyaWdodCBub3RpY2UgYW5kIHRoaXMgcGVybWlzc2lvbiBub3RpY2Ugc2hhbGwgYmUgaW5jbHVkZWQgaW5cbi8vIGFsbCBjb3BpZXMgb3Igc3Vic3RhbnRpYWwgcG9ydGlvbnMgb2YgdGhlIFNvZnR3YXJlLlxuLy9cbi8vIFRIRSBTT0ZUV0FSRSBJUyBQUk9WSURFRCBcIkFTIElTXCIsIFdJVEhPVVQgV0FSUkFOVFkgT0YgQU5ZIEtJTkQsIEVYUFJFU1MgT1Jcbi8vIElNUExJRUQsIElOQ0xVRElORyBCVVQgTk9UIExJTUlURUQgVE8gVEhFIFdBUlJBTlRJRVMgT0YgTUVSQ0hBTlRBQklMSVRZLFxuLy8gRklUTkVTUyBGT1IgQSBQQVJUSUNVTEFSIFBVUlBPU0UgQU5EIE5PTklORlJJTkdFTUVOVC4gSU4gTk8gRVZFTlQgU0hBTEwgVEhFXG4vLyBBVVRIT1JTIE9SIENPUFlSSUdIVCBIT0xERVJTIEJFIExJQUJMRSBGT1IgQU5ZIENMQUlNLCBEQU1BR0VTIE9SIE9USEVSXG4vLyBMSUFCSUxJVFksIFdIRVRIRVIgSU4gQU4gQUNUSU9OIE9GIENPTlRSQUNULCBUT1JUIE9SIE9USEVSV0lTRSwgQVJJU0lORyBGUk9NLFxuLy8gT1VUIE9GIE9SIElOIENPTk5FQ1RJT04gV0lUSCBUSEUgU09GVFdBUkUgT1IgVEhFIFVTRSBPUiBPVEhFUiBERUFMSU5HUyBJTlxuLy8gVEhFIFNPRlRXQVJFLlxuXG5pbXBvcnQge1NjYXR0ZXJwbG90TGF5ZXJ9IGZyb20gJ2RlY2suZ2wnO1xuaW1wb3J0IHtlZGl0U2hhZGVyfSBmcm9tICdkZWNrZ2wtbGF5ZXJzL2xheWVyLXV0aWxzL3NoYWRlci11dGlscyc7XG5cbmZ1bmN0aW9uIGFkZEJydXNoaW5nVnNTaGFkZXIodnMpIHtcbiAgcmV0dXJuIGVkaXRTaGFkZXIoXG4gICAgdnMsXG4gICAgJ3NjYXR0ZXJwbG90IGJydXNoaW5nIHZzJyxcbiAgICAnb3V0ZXJSYWRpdXNQaXhlbHMgKz0gb3V0bGluZSAqIHN0cm9rZVdpZHRoIC8gMi4wOycsXG4gICAgJ291dGVyUmFkaXVzUGl4ZWxzID0gYnJ1c2hpbmdfZ2V0UmFkaXVzKGluc3RhbmNlUG9zaXRpb25zLCBvdXRlclJhZGl1c1BpeGVscyArIG91dGxpbmUgKiBzdHJva2VXaWR0aCAvIDIuMCk7J1xuICApO1xufVxuXG5jb25zdCBkZWZhdWx0UHJvcHMgPSB7XG4gIC4uLlNjYXR0ZXJwbG90TGF5ZXIuZGVmYXVsdFByb3BzLFxuICBlbmFibGVCcnVzaGluZzogdHJ1ZSxcbiAgLy8gYnJ1c2ggcmFkaXVzIGluIG1ldGVyc1xuICBicnVzaFJhZGl1czogMTAwMDAwLFxuICBtb3VzZVBvc2l0aW9uOiBbMCwgMF0sXG4gIG91dHNpZGVCcnVzaFJhZGl1czogMFxufTtcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgU2NhdHRlcnBsb3RCcnVzaGluZ0xheWVyIGV4dGVuZHMgU2NhdHRlcnBsb3RMYXllciB7XG5cbiAgZ2V0U2hhZGVycygpIHtcbiAgICBjb25zdCBzaGFkZXJzID0gc3VwZXIuZ2V0U2hhZGVycygpO1xuICAgIHJldHVybiB7XG4gICAgICB2czogYWRkQnJ1c2hpbmdWc1NoYWRlcihzaGFkZXJzLnZzKSxcbiAgICAgIGZzOiBzaGFkZXJzLmZzLFxuICAgICAgbW9kdWxlczogc2hhZGVycy5tb2R1bGVzLmNvbmNhdChbJ2JydXNoaW5nJ10pXG4gICAgfTtcbiAgfVxuICBkcmF3KG9wdHMpIHtcbiAgICBjb25zdCB7dW5pZm9ybXN9ID0gb3B0cztcbiAgICBjb25zdCB7XG4gICAgICBicnVzaFJhZGl1cyxcbiAgICAgIGVuYWJsZUJydXNoaW5nLFxuICAgICAgbW91c2VQb3NpdGlvbixcbiAgICAgIG91dHNpZGVCcnVzaFJhZGl1c1xuICAgIH0gPSB0aGlzLnByb3BzO1xuXG4gICAgLy8gYWRkIHVuaWZvcm1zXG4gICAgc3VwZXIuZHJhdyh7XG4gICAgICAuLi5vcHRzLFxuICAgICAgdW5pZm9ybXM6IHtcbiAgICAgICAgLi4udW5pZm9ybXMsXG4gICAgICAgIGJydXNoaW5nX3VCcnVzaFJhZGl1czogYnJ1c2hSYWRpdXMsXG4gICAgICAgIGJydXNoaW5nX3VPdXRzaWRlQnJ1c2hSYWRpdXM6IG91dHNpZGVCcnVzaFJhZGl1cyxcbiAgICAgICAgYnJ1c2hpbmdfdU1vdXNlUG9zaXRpb246IG1vdXNlUG9zaXRpb25cbiAgICAgICAgICA/IG5ldyBGbG9hdDMyQXJyYXkodGhpcy51bnByb2plY3QobW91c2VQb3NpdGlvbikpXG4gICAgICAgICAgOiBkZWZhdWx0UHJvcHMubW91c2VQb3NpdGlvbixcbiAgICAgICAgYnJ1c2hpbmdfdUVuYWJsZUJydXNoaW5nOiBlbmFibGVCcnVzaGluZyA/IDEgOiAwXG4gICAgICB9XG4gICAgfSk7XG4gIH1cbn1cblxuU2NhdHRlcnBsb3RCcnVzaGluZ0xheWVyLmxheWVyTmFtZSA9ICdTY2F0dGVycGxvdEJydXNoaW5nTGF5ZXInO1xuU2NhdHRlcnBsb3RCcnVzaGluZ0xheWVyLmRlZmF1bHRQcm9wcyA9IGRlZmF1bHRQcm9wcztcbiJdfQ==