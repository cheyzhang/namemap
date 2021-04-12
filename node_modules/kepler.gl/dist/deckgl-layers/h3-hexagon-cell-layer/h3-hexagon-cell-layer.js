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

var _get2 = require('babel-runtime/helpers/get');

var _get3 = _interopRequireDefault(_get2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

var _deck = require('deck.gl');

var _luma = require('luma.gl');

var _h3Utils = require('../../layers/h3-hexagon-layer/h3-utils');

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

function addInstanceCoverage(vs) {
  var addDecl = (0, _shaderUtils.editShader)(vs, 'hexagon cell vs add instance', 'attribute vec3 instancePickingColors;', 'attribute vec3 instancePickingColors;\n     attribute float instanceCoverage;');

  return (0, _shaderUtils.editShader)(addDecl, 'hexagon cell vs add instance', 'float dotRadius = project_scale(radius) * mix(coverage, 0.0, noRender);', 'float dotRadius = project_scale(radius) * mix(coverage * instanceCoverage, 0.0, noRender);');
}

// TODO: export all dekc.gl layers from kepler.gl

var H3HexagonCellLayer = function (_HexagonCellLayer) {
  (0, _inherits3.default)(H3HexagonCellLayer, _HexagonCellLayer);

  function H3HexagonCellLayer() {
    (0, _classCallCheck3.default)(this, H3HexagonCellLayer);
    return (0, _possibleConstructorReturn3.default)(this, (H3HexagonCellLayer.__proto__ || Object.getPrototypeOf(H3HexagonCellLayer)).apply(this, arguments));
  }

  (0, _createClass3.default)(H3HexagonCellLayer, [{
    key: 'getShaders',
    value: function getShaders() {
      var shaders = (0, _get3.default)(H3HexagonCellLayer.prototype.__proto__ || Object.getPrototypeOf(H3HexagonCellLayer.prototype), 'getShaders', this).call(this);

      return (0, _extends3.default)({}, shaders, {
        vs: addInstanceCoverage(shaders.vs)
      });
    }
  }, {
    key: 'getCylinderGeometry',
    value: function getCylinderGeometry(radius) {
      var distortion = this.getDistortion();

      var cylinderGeometry = new _luma.CylinderGeometry({
        radius: radius,
        topRadius: radius,
        bottomRadius: radius,
        topCap: true,
        bottomCap: true,
        height: 1,
        verticalAxis: 'z',
        nradial: 6,
        nvertical: 1
      });

      if (distortion) {
        var pos = cylinderGeometry.attributes.positions.value;
        var adjusted = (0, _h3Utils.distortCylinderPositions)(pos, distortion);
        cylinderGeometry.attributes.positions.value = adjusted;
      }

      return cylinderGeometry;
    }
  }, {
    key: 'getDistortion',
    value: function getDistortion() {
      var _this2 = this;

      var _props = this.props,
          hexagonVertices = _props.hexagonVertices,
          hexagonCenter = _props.hexagonCenter;


      if (Array.isArray(hexagonVertices) && hexagonVertices.length >= 6 && Array.isArray(hexagonCenter)) {
        var screenVertices = hexagonVertices.map(function (d) {
          return _this2.projectFlat(d);
        });
        var screenCentroid = this.projectFlat(hexagonCenter);
        return (0, _h3Utils.getH3VerticeTransform)(screenVertices, screenCentroid);
      }

      return null;
    }
  }, {
    key: 'updateRadiusAngle',
    value: function updateRadiusAngle() {
      var _props2 = this.props,
          angle = _props2.angle,
          radius = _props2.radius;
      var hexagonVertices = this.props.hexagonVertices;


      if (Array.isArray(hexagonVertices) && hexagonVertices.length >= 6) {
        var viewport = this.context.viewport;
        // calculate angle and vertices from hexagonVertices if provided

        var vertices = this.props.hexagonVertices;

        var vertex0 = vertices[0];
        var vertex3 = vertices[3];

        // project to space coordinates

        var _viewport$getDistance = viewport.getDistanceScales(),
            pixelsPerMeter = _viewport$getDistance.pixelsPerMeter;

        var spaceCoord0 = this.projectFlat(vertex0);
        var spaceCoord3 = this.projectFlat(vertex3);

        angle = (0, _h3Utils.getAngle)(spaceCoord0, spaceCoord3);
        radius = (0, _h3Utils.getRadius)(spaceCoord0, spaceCoord3) / pixelsPerMeter[0];
      }

      this.setState({ angle: angle, radius: radius });
    }
  }, {
    key: 'draw',
    value: function draw(opts) {
      var uniforms = opts.uniforms;


      (0, _get3.default)(H3HexagonCellLayer.prototype.__proto__ || Object.getPrototypeOf(H3HexagonCellLayer.prototype), 'draw', this).call(this, (0, _extends3.default)({}, opts, {
        uniforms: (0, _extends3.default)({}, uniforms, {
          picking_uHighlightScale: this.props.extruded ? 1.4 : 0.0
        })
      }));
    }
  }, {
    key: 'initializeState',
    value: function initializeState() {
      (0, _get3.default)(H3HexagonCellLayer.prototype.__proto__ || Object.getPrototypeOf(H3HexagonCellLayer.prototype), 'initializeState', this).call(this);

      this.getAttributeManager().addInstanced({
        instanceCoverage: { size: 1, accessor: 'getCoverage' }
      });
    }
  }]);
  return H3HexagonCellLayer;
}(_deck.HexagonCellLayer);

exports.default = H3HexagonCellLayer;


H3HexagonCellLayer.layerName = 'H3HexagonCellLayer';
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9kZWNrZ2wtbGF5ZXJzL2gzLWhleGFnb24tY2VsbC1sYXllci9oMy1oZXhhZ29uLWNlbGwtbGF5ZXIuanMiXSwibmFtZXMiOlsiYWRkSW5zdGFuY2VDb3ZlcmFnZSIsInZzIiwiYWRkRGVjbCIsIkgzSGV4YWdvbkNlbGxMYXllciIsInNoYWRlcnMiLCJyYWRpdXMiLCJkaXN0b3J0aW9uIiwiZ2V0RGlzdG9ydGlvbiIsImN5bGluZGVyR2VvbWV0cnkiLCJDeWxpbmRlckdlb21ldHJ5IiwidG9wUmFkaXVzIiwiYm90dG9tUmFkaXVzIiwidG9wQ2FwIiwiYm90dG9tQ2FwIiwiaGVpZ2h0IiwidmVydGljYWxBeGlzIiwibnJhZGlhbCIsIm52ZXJ0aWNhbCIsInBvcyIsImF0dHJpYnV0ZXMiLCJwb3NpdGlvbnMiLCJ2YWx1ZSIsImFkanVzdGVkIiwicHJvcHMiLCJoZXhhZ29uVmVydGljZXMiLCJoZXhhZ29uQ2VudGVyIiwiQXJyYXkiLCJpc0FycmF5IiwibGVuZ3RoIiwic2NyZWVuVmVydGljZXMiLCJtYXAiLCJwcm9qZWN0RmxhdCIsImQiLCJzY3JlZW5DZW50cm9pZCIsImFuZ2xlIiwidmlld3BvcnQiLCJjb250ZXh0IiwidmVydGljZXMiLCJ2ZXJ0ZXgwIiwidmVydGV4MyIsImdldERpc3RhbmNlU2NhbGVzIiwicGl4ZWxzUGVyTWV0ZXIiLCJzcGFjZUNvb3JkMCIsInNwYWNlQ29vcmQzIiwic2V0U3RhdGUiLCJvcHRzIiwidW5pZm9ybXMiLCJwaWNraW5nX3VIaWdobGlnaHRTY2FsZSIsImV4dHJ1ZGVkIiwiZ2V0QXR0cmlidXRlTWFuYWdlciIsImFkZEluc3RhbmNlZCIsImluc3RhbmNlQ292ZXJhZ2UiLCJzaXplIiwiYWNjZXNzb3IiLCJIZXhhZ29uQ2VsbExheWVyIiwibGF5ZXJOYW1lIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBb0JBOztBQUNBOztBQUNBOztBQUNBOzs7O0FBdkJBO0FB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QUFTUSxXQUFULEVBQXNCQyxXQUF0QixDQUFSO0FBQ0F0QyxpQkFBUyx3QkFBVXFDLFdBQVYsRUFBdUJDLFdBQXZCLElBQXFDRixlQUFlLENBQWYsQ0FBOUM7QUFDRDs7QUFFRCxXQUFLRyxRQUFMLENBQWMsRUFBQ1YsWUFBRCxFQUFRN0IsY0FBUixFQUFkO0FBQ0Q7Ozt5QkFFSXdDLEksRUFBTTtBQUFBLFVBQ0ZDLFFBREUsR0FDVUQsSUFEVixDQUNGQyxRQURFOzs7QUFHVCw0S0FDS0QsSUFETDtBQUVFQyw2Q0FDS0EsUUFETDtBQUVFQyxtQ0FBeUIsS0FBS3hCLEtBQUwsQ0FBV3lCLFFBQVgsR0FBc0IsR0FBdEIsR0FBNEI7QUFGdkQ7QUFGRjtBQU9EOzs7c0NBRWlCO0FBQ2hCOztBQUVBLFdBQUtDLG1CQUFMLEdBQTJCQyxZQUEzQixDQUF3QztBQUN0Q0MsMEJBQWtCLEVBQUNDLE1BQU0sQ0FBUCxFQUFVQyxVQUFVLGFBQXBCO0FBRG9CLE9BQXhDO0FBR0Q7OztFQTNGNkNDLHNCOztrQkFBM0JuRCxrQjs7O0FBOEZyQkEsbUJBQW1Cb0QsU0FBbkIsR0FBK0Isb0JBQS9CIiwiZmlsZSI6ImgzLWhleGFnb24tY2VsbC1sYXllci5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8vIENvcHlyaWdodCAoYykgMjAxOCBVYmVyIFRlY2hub2xvZ2llcywgSW5jLlxuLy9cbi8vIFBlcm1pc3Npb24gaXMgaGVyZWJ5IGdyYW50ZWQsIGZyZWUgb2YgY2hhcmdlLCB0byBhbnkgcGVyc29uIG9idGFpbmluZyBhIGNvcHlcbi8vIG9mIHRoaXMgc29mdHdhcmUgYW5kIGFzc29jaWF0ZWQgZG9jdW1lbnRhdGlvbiBmaWxlcyAodGhlIFwiU29mdHdhcmVcIiksIHRvIGRlYWxcbi8vIGluIHRoZSBTb2Z0d2FyZSB3aXRob3V0IHJlc3RyaWN0aW9uLCBpbmNsdWRpbmcgd2l0aG91dCBsaW1pdGF0aW9uIHRoZSByaWdodHNcbi8vIHRvIHVzZSwgY29weSwgbW9kaWZ5LCBtZXJnZSwgcHVibGlzaCwgZGlzdHJpYnV0ZSwgc3VibGljZW5zZSwgYW5kL29yIHNlbGxcbi8vIGNvcGllcyBvZiB0aGUgU29mdHdhcmUsIGFuZCB0byBwZXJtaXQgcGVyc29ucyB0byB3aG9tIHRoZSBTb2Z0d2FyZSBpc1xuLy8gZnVybmlzaGVkIHRvIGRvIHNvLCBzdWJqZWN0IHRvIHRoZSBmb2xsb3dpbmcgY29uZGl0aW9uczpcbi8vXG4vLyBUaGUgYWJvdmUgY29weXJpZ2h0IG5vdGljZSBhbmQgdGhpcyBwZXJtaXNzaW9uIG5vdGljZSBzaGFsbCBiZSBpbmNsdWRlZCBpblxuLy8gYWxsIGNvcGllcyBvciBzdWJzdGFudGlhbCBwb3J0aW9ucyBvZiB0aGUgU29mdHdhcmUuXG4vL1xuLy8gVEhFIFNPRlRXQVJFIElTIFBST1ZJREVEIFwiQVMgSVNcIiwgV0lUSE9VVCBXQVJSQU5UWSBPRiBBTlkgS0lORCwgRVhQUkVTUyBPUlxuLy8gSU1QTElFRCwgSU5DTFVESU5HIEJVVCBOT1QgTElNSVRFRCBUTyBUSEUgV0FSUkFOVElFUyBPRiBNRVJDSEFOVEFCSUxJVFksXG4vLyBGSVRORVNTIEZPUiBBIFBBUlRJQ1VMQVIgUFVSUE9TRSBBTkQgTk9OSU5GUklOR0VNRU5ULiBJTiBOTyBFVkVOVCBTSEFMTCBUSEVcbi8vIEFVVEhPUlMgT1IgQ09QWVJJR0hUIEhPTERFUlMgQkUgTElBQkxFIEZPUiBBTlkgQ0xBSU0sIERBTUFHRVMgT1IgT1RIRVJcbi8vIExJQUJJTElUWSwgV0hFVEhFUiBJTiBBTiBBQ1RJT04gT0YgQ09OVFJBQ1QsIFRPUlQgT1IgT1RIRVJXSVNFLCBBUklTSU5HIEZST00sXG4vLyBPVVQgT0YgT1IgSU4gQ09OTkVDVElPTiBXSVRIIFRIRSBTT0ZUV0FSRSBPUiBUSEUgVVNFIE9SIE9USEVSIERFQUxJTkdTIElOXG4vLyBUSEUgU09GVFdBUkUuXG5cbmltcG9ydCB7SGV4YWdvbkNlbGxMYXllcn0gZnJvbSAnZGVjay5nbCc7XG5pbXBvcnQge0N5bGluZGVyR2VvbWV0cnl9IGZyb20gJ2x1bWEuZ2wnO1xuaW1wb3J0IHtnZXRBbmdsZSwgZ2V0UmFkaXVzLCBnZXRIM1ZlcnRpY2VUcmFuc2Zvcm0sIGRpc3RvcnRDeWxpbmRlclBvc2l0aW9uc30gZnJvbSAnbGF5ZXJzL2gzLWhleGFnb24tbGF5ZXIvaDMtdXRpbHMnO1xuaW1wb3J0IHtlZGl0U2hhZGVyfSBmcm9tICdkZWNrZ2wtbGF5ZXJzL2xheWVyLXV0aWxzL3NoYWRlci11dGlscyc7XG5cbmZ1bmN0aW9uIGFkZEluc3RhbmNlQ292ZXJhZ2UodnMpIHtcbiAgY29uc3QgYWRkRGVjbCA9IGVkaXRTaGFkZXIoXG4gICAgdnMsXG4gICAgJ2hleGFnb24gY2VsbCB2cyBhZGQgaW5zdGFuY2UnLFxuICAgICdhdHRyaWJ1dGUgdmVjMyBpbnN0YW5jZVBpY2tpbmdDb2xvcnM7JyxcbiAgICBgYXR0cmlidXRlIHZlYzMgaW5zdGFuY2VQaWNraW5nQ29sb3JzO1xuICAgICBhdHRyaWJ1dGUgZmxvYXQgaW5zdGFuY2VDb3ZlcmFnZTtgXG4gICk7XG5cbiAgcmV0dXJuIGVkaXRTaGFkZXIoXG4gICAgYWRkRGVjbCxcbiAgICAnaGV4YWdvbiBjZWxsIHZzIGFkZCBpbnN0YW5jZScsXG4gICAgJ2Zsb2F0IGRvdFJhZGl1cyA9IHByb2plY3Rfc2NhbGUocmFkaXVzKSAqIG1peChjb3ZlcmFnZSwgMC4wLCBub1JlbmRlcik7JyxcbiAgICAnZmxvYXQgZG90UmFkaXVzID0gcHJvamVjdF9zY2FsZShyYWRpdXMpICogbWl4KGNvdmVyYWdlICogaW5zdGFuY2VDb3ZlcmFnZSwgMC4wLCBub1JlbmRlcik7J1xuICApO1xufVxuXG4vLyBUT0RPOiBleHBvcnQgYWxsIGRla2MuZ2wgbGF5ZXJzIGZyb20ga2VwbGVyLmdsXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBIM0hleGFnb25DZWxsTGF5ZXIgZXh0ZW5kcyBIZXhhZ29uQ2VsbExheWVyIHtcblxuICBnZXRTaGFkZXJzKCkge1xuICAgIGNvbnN0IHNoYWRlcnMgPSBzdXBlci5nZXRTaGFkZXJzKCk7XG5cbiAgICByZXR1cm4ge1xuICAgICAgLi4uc2hhZGVycyxcbiAgICAgIHZzOiBhZGRJbnN0YW5jZUNvdmVyYWdlKHNoYWRlcnMudnMpXG4gICAgfTtcbiAgfVxuXG4gIGdldEN5bGluZGVyR2VvbWV0cnkocmFkaXVzKSB7XG4gICAgY29uc3QgZGlzdG9ydGlvbiA9IHRoaXMuZ2V0RGlzdG9ydGlvbigpO1xuXG4gICAgY29uc3QgY3lsaW5kZXJHZW9tZXRyeSA9IG5ldyBDeWxpbmRlckdlb21ldHJ5KHtcbiAgICAgIHJhZGl1cyxcbiAgICAgIHRvcFJhZGl1czogcmFkaXVzLFxuICAgICAgYm90dG9tUmFkaXVzOiByYWRpdXMsXG4gICAgICB0b3BDYXA6IHRydWUsXG4gICAgICBib3R0b21DYXA6IHRydWUsXG4gICAgICBoZWlnaHQ6IDEsXG4gICAgICB2ZXJ0aWNhbEF4aXM6ICd6JyxcbiAgICAgIG5yYWRpYWw6IDYsXG4gICAgICBudmVydGljYWw6IDFcbiAgICB9KTtcblxuICAgIGlmIChkaXN0b3J0aW9uKSB7XG4gICAgICBjb25zdCBwb3MgPSBjeWxpbmRlckdlb21ldHJ5LmF0dHJpYnV0ZXMucG9zaXRpb25zLnZhbHVlO1xuICAgICAgY29uc3QgYWRqdXN0ZWQgPSBkaXN0b3J0Q3lsaW5kZXJQb3NpdGlvbnMocG9zLCBkaXN0b3J0aW9uKTtcbiAgICAgIGN5bGluZGVyR2VvbWV0cnkuYXR0cmlidXRlcy5wb3NpdGlvbnMudmFsdWUgPSBhZGp1c3RlZDtcbiAgICB9XG5cbiAgICByZXR1cm4gY3lsaW5kZXJHZW9tZXRyeTtcbiAgfVxuXG4gIGdldERpc3RvcnRpb24oKSB7XG4gICAgY29uc3Qge2hleGFnb25WZXJ0aWNlcywgaGV4YWdvbkNlbnRlcn0gPSB0aGlzLnByb3BzO1xuXG4gICAgaWYgKEFycmF5LmlzQXJyYXkoaGV4YWdvblZlcnRpY2VzKSAmJlxuICAgICAgaGV4YWdvblZlcnRpY2VzLmxlbmd0aCA+PSA2ICYmXG4gICAgICBBcnJheS5pc0FycmF5KGhleGFnb25DZW50ZXIpKSB7XG4gICAgICAgIGNvbnN0IHNjcmVlblZlcnRpY2VzID0gaGV4YWdvblZlcnRpY2VzLm1hcChkID0+IHRoaXMucHJvamVjdEZsYXQoZCkpO1xuICAgICAgICBjb25zdCBzY3JlZW5DZW50cm9pZCA9IHRoaXMucHJvamVjdEZsYXQoaGV4YWdvbkNlbnRlcik7XG4gICAgICAgIHJldHVybiBnZXRIM1ZlcnRpY2VUcmFuc2Zvcm0oc2NyZWVuVmVydGljZXMsIHNjcmVlbkNlbnRyb2lkKTtcbiAgICB9XG5cbiAgICByZXR1cm4gbnVsbDtcbiAgfVxuXG4gIHVwZGF0ZVJhZGl1c0FuZ2xlKCkge1xuICAgIGxldCB7YW5nbGUsIHJhZGl1c30gPSB0aGlzLnByb3BzO1xuICAgIGNvbnN0IHtoZXhhZ29uVmVydGljZXN9ID0gdGhpcy5wcm9wcztcblxuICAgIGlmIChBcnJheS5pc0FycmF5KGhleGFnb25WZXJ0aWNlcykgJiYgaGV4YWdvblZlcnRpY2VzLmxlbmd0aCA+PSA2KSB7XG4gICAgICBjb25zdCB7dmlld3BvcnR9ID0gdGhpcy5jb250ZXh0O1xuICAgICAgLy8gY2FsY3VsYXRlIGFuZ2xlIGFuZCB2ZXJ0aWNlcyBmcm9tIGhleGFnb25WZXJ0aWNlcyBpZiBwcm92aWRlZFxuICAgICAgY29uc3QgdmVydGljZXMgPSB0aGlzLnByb3BzLmhleGFnb25WZXJ0aWNlcztcblxuICAgICAgY29uc3QgdmVydGV4MCA9IHZlcnRpY2VzWzBdO1xuICAgICAgY29uc3QgdmVydGV4MyA9IHZlcnRpY2VzWzNdO1xuXG4gICAgICAvLyBwcm9qZWN0IHRvIHNwYWNlIGNvb3JkaW5hdGVzXG4gICAgICBjb25zdCB7cGl4ZWxzUGVyTWV0ZXJ9ID0gdmlld3BvcnQuZ2V0RGlzdGFuY2VTY2FsZXMoKTtcbiAgICAgIGNvbnN0IHNwYWNlQ29vcmQwID0gdGhpcy5wcm9qZWN0RmxhdCh2ZXJ0ZXgwKTtcbiAgICAgIGNvbnN0IHNwYWNlQ29vcmQzID0gdGhpcy5wcm9qZWN0RmxhdCh2ZXJ0ZXgzKTtcblxuICAgICAgYW5nbGUgPSBnZXRBbmdsZShzcGFjZUNvb3JkMCwgc3BhY2VDb29yZDMpO1xuICAgICAgcmFkaXVzID0gZ2V0UmFkaXVzKHNwYWNlQ29vcmQwLCBzcGFjZUNvb3JkMykgL3BpeGVsc1Blck1ldGVyWzBdO1xuICAgIH1cblxuICAgIHRoaXMuc2V0U3RhdGUoe2FuZ2xlLCByYWRpdXN9KTtcbiAgfVxuXG4gIGRyYXcob3B0cykge1xuICAgIGNvbnN0IHt1bmlmb3Jtc30gPSBvcHRzO1xuXG4gICAgc3VwZXIuZHJhdyh7XG4gICAgICAuLi5vcHRzLFxuICAgICAgdW5pZm9ybXM6IHtcbiAgICAgICAgLi4udW5pZm9ybXMsXG4gICAgICAgIHBpY2tpbmdfdUhpZ2hsaWdodFNjYWxlOiB0aGlzLnByb3BzLmV4dHJ1ZGVkID8gMS40IDogMC4wXG4gICAgICB9XG4gICAgfSlcbiAgfVxuXG4gIGluaXRpYWxpemVTdGF0ZSgpIHtcbiAgICBzdXBlci5pbml0aWFsaXplU3RhdGUoKTtcblxuICAgIHRoaXMuZ2V0QXR0cmlidXRlTWFuYWdlcigpLmFkZEluc3RhbmNlZCh7XG4gICAgICBpbnN0YW5jZUNvdmVyYWdlOiB7c2l6ZTogMSwgYWNjZXNzb3I6ICdnZXRDb3ZlcmFnZSd9XG4gICAgfSk7XG4gIH1cbn1cblxuSDNIZXhhZ29uQ2VsbExheWVyLmxheWVyTmFtZSA9ICdIM0hleGFnb25DZWxsTGF5ZXInO1xuIl19