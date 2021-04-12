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

var _luma = require('luma.gl');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var ScatterplotIconLayer = function (_ScatterplotLayer) {
  (0, _inherits3.default)(ScatterplotIconLayer, _ScatterplotLayer);

  function ScatterplotIconLayer() {
    (0, _classCallCheck3.default)(this, ScatterplotIconLayer);
    return (0, _possibleConstructorReturn3.default)(this, (ScatterplotIconLayer.__proto__ || Object.getPrototypeOf(ScatterplotIconLayer)).apply(this, arguments));
  }

  (0, _createClass3.default)(ScatterplotIconLayer, [{
    key: '_getModel',
    value: function _getModel(gl) {
      // use default scatterplot shaders
      var shaders = this.getShaders();
      var defaultPos = [-1, -1, 0, -1, 1, 0, 1, 1, 0, 1, -1, 0];
      var iconGeometry = this.props.iconGeometry;


      var geometry = iconGeometry ? new _luma.Geometry({
        drawMode: _luma.GL.TRIANGLES,
        attributes: {
          positions: new Float32Array(iconGeometry)
        }
      }) : new _luma.Geometry({
        drawMode: _luma.GL.TRIANGLE_FAN,
        attributes: {
          positions: new Float32Array(defaultPos)
        }
      });

      return new _luma.Model(gl, (0, _extends3.default)({}, shaders, {
        id: this.props.id,
        geometry: geometry,
        isInstanced: true,
        shaderCache: this.context.shaderCache
      }));
    }
  }]);
  return ScatterplotIconLayer;
}(_deck.ScatterplotLayer); // Copyright (c) 2018 Uber Technologies, Inc.
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

exports.default = ScatterplotIconLayer;


ScatterplotIconLayer.layerName = 'ScatterplotIconLayer';
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9kZWNrZ2wtbGF5ZXJzL3N2Zy1pY29uLWxheWVyL3NjYXR0ZXJwbG90LWljb24tbGF5ZXIuanMiXSwibmFtZXMiOlsiU2NhdHRlcnBsb3RJY29uTGF5ZXIiLCJnbCIsInNoYWRlcnMiLCJnZXRTaGFkZXJzIiwiZGVmYXVsdFBvcyIsImljb25HZW9tZXRyeSIsInByb3BzIiwiZ2VvbWV0cnkiLCJHZW9tZXRyeSIsImRyYXdNb2RlIiwiR0wiLCJUUklBTkdMRVMiLCJhdHRyaWJ1dGVzIiwicG9zaXRpb25zIiwiRmxvYXQzMkFycmF5IiwiVFJJQU5HTEVfRkFOIiwiTW9kZWwiLCJpZCIsImlzSW5zdGFuY2VkIiwic2hhZGVyQ2FjaGUiLCJjb250ZXh0IiwiU2NhdHRlcnBsb3RMYXllciIsImxheWVyTmFtZSJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBb0JBOztBQUNBOzs7O0lBR3FCQSxvQjs7Ozs7Ozs7Ozs4QkFDVEMsRSxFQUFJO0FBQ1o7QUFDQSxVQUFNQyxVQUFVLEtBQUtDLFVBQUwsRUFBaEI7QUFDQSxVQUFNQyxhQUFhLENBQUMsQ0FBQyxDQUFGLEVBQUssQ0FBQyxDQUFOLEVBQVMsQ0FBVCxFQUFZLENBQUMsQ0FBYixFQUFnQixDQUFoQixFQUFtQixDQUFuQixFQUFzQixDQUF0QixFQUF5QixDQUF6QixFQUE0QixDQUE1QixFQUErQixDQUEvQixFQUFrQyxDQUFDLENBQW5DLEVBQXNDLENBQXRDLENBQW5CO0FBSFksVUFJTEMsWUFKSyxHQUlXLEtBQUtDLEtBSmhCLENBSUxELFlBSks7OztBQU1aLFVBQU1FLFdBQVdGLGVBQ2IsSUFBSUcsY0FBSixDQUFhO0FBQ1hDLGtCQUFVQyxTQUFHQyxTQURGO0FBRVhDLG9CQUFZO0FBQ1ZDLHFCQUFXLElBQUlDLFlBQUosQ0FBaUJULFlBQWpCO0FBREQ7QUFGRCxPQUFiLENBRGEsR0FPYixJQUFJRyxjQUFKLENBQWE7QUFDWEMsa0JBQVVDLFNBQUdLLFlBREY7QUFFWEgsb0JBQVk7QUFDVkMscUJBQVcsSUFBSUMsWUFBSixDQUFpQlYsVUFBakI7QUFERDtBQUZELE9BQWIsQ0FQSjs7QUFjQSxhQUFPLElBQUlZLFdBQUosQ0FBVWYsRUFBViw2QkFDRkMsT0FERTtBQUVMZSxZQUFJLEtBQUtYLEtBQUwsQ0FBV1csRUFGVjtBQUdMViwwQkFISztBQUlMVyxxQkFBYSxJQUpSO0FBS0xDLHFCQUFhLEtBQUtDLE9BQUwsQ0FBYUQ7QUFMckIsU0FBUDtBQU9EOzs7RUE1QitDRSxzQixHQXhCbEQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O2tCQU1xQnJCLG9COzs7QUErQnJCQSxxQkFBcUJzQixTQUFyQixHQUFpQyxzQkFBakMiLCJmaWxlIjoic2NhdHRlcnBsb3QtaWNvbi1sYXllci5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8vIENvcHlyaWdodCAoYykgMjAxOCBVYmVyIFRlY2hub2xvZ2llcywgSW5jLlxuLy9cbi8vIFBlcm1pc3Npb24gaXMgaGVyZWJ5IGdyYW50ZWQsIGZyZWUgb2YgY2hhcmdlLCB0byBhbnkgcGVyc29uIG9idGFpbmluZyBhIGNvcHlcbi8vIG9mIHRoaXMgc29mdHdhcmUgYW5kIGFzc29jaWF0ZWQgZG9jdW1lbnRhdGlvbiBmaWxlcyAodGhlIFwiU29mdHdhcmVcIiksIHRvIGRlYWxcbi8vIGluIHRoZSBTb2Z0d2FyZSB3aXRob3V0IHJlc3RyaWN0aW9uLCBpbmNsdWRpbmcgd2l0aG91dCBsaW1pdGF0aW9uIHRoZSByaWdodHNcbi8vIHRvIHVzZSwgY29weSwgbW9kaWZ5LCBtZXJnZSwgcHVibGlzaCwgZGlzdHJpYnV0ZSwgc3VibGljZW5zZSwgYW5kL29yIHNlbGxcbi8vIGNvcGllcyBvZiB0aGUgU29mdHdhcmUsIGFuZCB0byBwZXJtaXQgcGVyc29ucyB0byB3aG9tIHRoZSBTb2Z0d2FyZSBpc1xuLy8gZnVybmlzaGVkIHRvIGRvIHNvLCBzdWJqZWN0IHRvIHRoZSBmb2xsb3dpbmcgY29uZGl0aW9uczpcbi8vXG4vLyBUaGUgYWJvdmUgY29weXJpZ2h0IG5vdGljZSBhbmQgdGhpcyBwZXJtaXNzaW9uIG5vdGljZSBzaGFsbCBiZSBpbmNsdWRlZCBpblxuLy8gYWxsIGNvcGllcyBvciBzdWJzdGFudGlhbCBwb3J0aW9ucyBvZiB0aGUgU29mdHdhcmUuXG4vL1xuLy8gVEhFIFNPRlRXQVJFIElTIFBST1ZJREVEIFwiQVMgSVNcIiwgV0lUSE9VVCBXQVJSQU5UWSBPRiBBTlkgS0lORCwgRVhQUkVTUyBPUlxuLy8gSU1QTElFRCwgSU5DTFVESU5HIEJVVCBOT1QgTElNSVRFRCBUTyBUSEUgV0FSUkFOVElFUyBPRiBNRVJDSEFOVEFCSUxJVFksXG4vLyBGSVRORVNTIEZPUiBBIFBBUlRJQ1VMQVIgUFVSUE9TRSBBTkQgTk9OSU5GUklOR0VNRU5ULiBJTiBOTyBFVkVOVCBTSEFMTCBUSEVcbi8vIEFVVEhPUlMgT1IgQ09QWVJJR0hUIEhPTERFUlMgQkUgTElBQkxFIEZPUiBBTlkgQ0xBSU0sIERBTUFHRVMgT1IgT1RIRVJcbi8vIExJQUJJTElUWSwgV0hFVEhFUiBJTiBBTiBBQ1RJT04gT0YgQ09OVFJBQ1QsIFRPUlQgT1IgT1RIRVJXSVNFLCBBUklTSU5HIEZST00sXG4vLyBPVVQgT0YgT1IgSU4gQ09OTkVDVElPTiBXSVRIIFRIRSBTT0ZUV0FSRSBPUiBUSEUgVVNFIE9SIE9USEVSIERFQUxJTkdTIElOXG4vLyBUSEUgU09GVFdBUkUuXG5cbmltcG9ydCB7U2NhdHRlcnBsb3RMYXllcn0gZnJvbSAnZGVjay5nbCc7XG5pbXBvcnQge0dlb21ldHJ5LCBNb2RlbH0gZnJvbSAnbHVtYS5nbCc7XG5pbXBvcnQge0dMfSBmcm9tICdsdW1hLmdsJztcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgU2NhdHRlcnBsb3RJY29uTGF5ZXIgZXh0ZW5kcyBTY2F0dGVycGxvdExheWVyIHtcbiAgX2dldE1vZGVsKGdsKSB7XG4gICAgLy8gdXNlIGRlZmF1bHQgc2NhdHRlcnBsb3Qgc2hhZGVyc1xuICAgIGNvbnN0IHNoYWRlcnMgPSB0aGlzLmdldFNoYWRlcnMoKTtcbiAgICBjb25zdCBkZWZhdWx0UG9zID0gWy0xLCAtMSwgMCwgLTEsIDEsIDAsIDEsIDEsIDAsIDEsIC0xLCAwXTtcbiAgICBjb25zdCB7aWNvbkdlb21ldHJ5fSA9IHRoaXMucHJvcHM7XG5cbiAgICBjb25zdCBnZW9tZXRyeSA9IGljb25HZW9tZXRyeVxuICAgICAgPyBuZXcgR2VvbWV0cnkoe1xuICAgICAgICAgIGRyYXdNb2RlOiBHTC5UUklBTkdMRVMsXG4gICAgICAgICAgYXR0cmlidXRlczoge1xuICAgICAgICAgICAgcG9zaXRpb25zOiBuZXcgRmxvYXQzMkFycmF5KGljb25HZW9tZXRyeSlcbiAgICAgICAgICB9XG4gICAgICAgIH0pXG4gICAgICA6IG5ldyBHZW9tZXRyeSh7XG4gICAgICAgICAgZHJhd01vZGU6IEdMLlRSSUFOR0xFX0ZBTixcbiAgICAgICAgICBhdHRyaWJ1dGVzOiB7XG4gICAgICAgICAgICBwb3NpdGlvbnM6IG5ldyBGbG9hdDMyQXJyYXkoZGVmYXVsdFBvcylcbiAgICAgICAgICB9XG4gICAgICAgIH0pO1xuXG4gICAgcmV0dXJuIG5ldyBNb2RlbChnbCwge1xuICAgICAgLi4uc2hhZGVycyxcbiAgICAgIGlkOiB0aGlzLnByb3BzLmlkLFxuICAgICAgZ2VvbWV0cnksXG4gICAgICBpc0luc3RhbmNlZDogdHJ1ZSxcbiAgICAgIHNoYWRlckNhY2hlOiB0aGlzLmNvbnRleHQuc2hhZGVyQ2FjaGVcbiAgICB9KTtcbiAgfVxufVxuXG5TY2F0dGVycGxvdEljb25MYXllci5sYXllck5hbWUgPSAnU2NhdHRlcnBsb3RJY29uTGF5ZXInO1xuIl19