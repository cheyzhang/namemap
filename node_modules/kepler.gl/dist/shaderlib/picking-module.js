'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _luma = require('luma.gl');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// add picking_uHighlightScale to fs uniform
var fs = 'uniform bool picking_uActive; // true during rendering to offscreen picking buffer\nuniform vec3 picking_uSelectedColor;\nuniform vec4 picking_uHighlightColor;\nuniform float picking_uHighlightScale;\n\nvarying vec4 picking_vRGBcolor_Aselected;\n\nconst float COLOR_SCALE = 1. / 255.;\n\n/*\n * Returns highlight color if this item is selected.\n */\nvec4 picking_filterHighlightColor(vec4 color) {\n  bool selected = bool(picking_vRGBcolor_Aselected.a);\n  // return selected ? (picking_uHighlightColor * COLOR_SCALE) : color;\n  return selected ? (\n   (bool(picking_uHighlightScale > 0.0) ? color * picking_uHighlightScale : picking_uHighlightColor * COLOR_SCALE)\n  ) : color;\n}\n\n/*\n * Returns picking color if picking enabled else unmodified argument.\n */\nvec4 picking_filterPickingColor(vec4 color) {\n  vec3 pickingColor = picking_vRGBcolor_Aselected.rgb;\n  if (picking_uActive && length(pickingColor) < 0.001) {\n    discard;\n  }\n  return picking_uActive ? vec4(pickingColor, 1.0) : color;\n}\n\n/*\n * Returns picking color if picking is enabled if not\n * highlight color if this item is selected, otherwise unmodified argument.\n */\nvec4 picking_filterColor(vec4 color) {\n  vec4 highightColor = picking_filterHighlightColor(color);\n  return picking_filterPickingColor(highightColor);\n}\n'; // Copyright (c) 2018 Uber Technologies, Inc.
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

exports.default = (0, _extends3.default)({}, _luma.picking, {
  fs: fs
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9zaGFkZXJsaWIvcGlja2luZy1tb2R1bGUuanMiXSwibmFtZXMiOlsiZnMiLCJwaWNraW5nIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O0FBb0JBOzs7O0FBRUE7QUFDQSxJQUFNQSxzeUNBQU4sQyxDQXZCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7NkNBZ0RLQyxhO0FBQ0hEIiwiZmlsZSI6InBpY2tpbmctbW9kdWxlLmpzIiwic291cmNlc0NvbnRlbnQiOlsiLy8gQ29weXJpZ2h0IChjKSAyMDE4IFViZXIgVGVjaG5vbG9naWVzLCBJbmMuXG4vL1xuLy8gUGVybWlzc2lvbiBpcyBoZXJlYnkgZ3JhbnRlZCwgZnJlZSBvZiBjaGFyZ2UsIHRvIGFueSBwZXJzb24gb2J0YWluaW5nIGEgY29weVxuLy8gb2YgdGhpcyBzb2Z0d2FyZSBhbmQgYXNzb2NpYXRlZCBkb2N1bWVudGF0aW9uIGZpbGVzICh0aGUgXCJTb2Z0d2FyZVwiKSwgdG8gZGVhbFxuLy8gaW4gdGhlIFNvZnR3YXJlIHdpdGhvdXQgcmVzdHJpY3Rpb24sIGluY2x1ZGluZyB3aXRob3V0IGxpbWl0YXRpb24gdGhlIHJpZ2h0c1xuLy8gdG8gdXNlLCBjb3B5LCBtb2RpZnksIG1lcmdlLCBwdWJsaXNoLCBkaXN0cmlidXRlLCBzdWJsaWNlbnNlLCBhbmQvb3Igc2VsbFxuLy8gY29waWVzIG9mIHRoZSBTb2Z0d2FyZSwgYW5kIHRvIHBlcm1pdCBwZXJzb25zIHRvIHdob20gdGhlIFNvZnR3YXJlIGlzXG4vLyBmdXJuaXNoZWQgdG8gZG8gc28sIHN1YmplY3QgdG8gdGhlIGZvbGxvd2luZyBjb25kaXRpb25zOlxuLy9cbi8vIFRoZSBhYm92ZSBjb3B5cmlnaHQgbm90aWNlIGFuZCB0aGlzIHBlcm1pc3Npb24gbm90aWNlIHNoYWxsIGJlIGluY2x1ZGVkIGluXG4vLyBhbGwgY29waWVzIG9yIHN1YnN0YW50aWFsIHBvcnRpb25zIG9mIHRoZSBTb2Z0d2FyZS5cbi8vXG4vLyBUSEUgU09GVFdBUkUgSVMgUFJPVklERUQgXCJBUyBJU1wiLCBXSVRIT1VUIFdBUlJBTlRZIE9GIEFOWSBLSU5ELCBFWFBSRVNTIE9SXG4vLyBJTVBMSUVELCBJTkNMVURJTkcgQlVUIE5PVCBMSU1JVEVEIFRPIFRIRSBXQVJSQU5USUVTIE9GIE1FUkNIQU5UQUJJTElUWSxcbi8vIEZJVE5FU1MgRk9SIEEgUEFSVElDVUxBUiBQVVJQT1NFIEFORCBOT05JTkZSSU5HRU1FTlQuIElOIE5PIEVWRU5UIFNIQUxMIFRIRVxuLy8gQVVUSE9SUyBPUiBDT1BZUklHSFQgSE9MREVSUyBCRSBMSUFCTEUgRk9SIEFOWSBDTEFJTSwgREFNQUdFUyBPUiBPVEhFUlxuLy8gTElBQklMSVRZLCBXSEVUSEVSIElOIEFOIEFDVElPTiBPRiBDT05UUkFDVCwgVE9SVCBPUiBPVEhFUldJU0UsIEFSSVNJTkcgRlJPTSxcbi8vIE9VVCBPRiBPUiBJTiBDT05ORUNUSU9OIFdJVEggVEhFIFNPRlRXQVJFIE9SIFRIRSBVU0UgT1IgT1RIRVIgREVBTElOR1MgSU5cbi8vIFRIRSBTT0ZUV0FSRS5cblxuaW1wb3J0IHtwaWNraW5nfSBmcm9tICdsdW1hLmdsJztcblxuLy8gYWRkIHBpY2tpbmdfdUhpZ2hsaWdodFNjYWxlIHRvIGZzIHVuaWZvcm1cbmNvbnN0IGZzID0gYFxcXG51bmlmb3JtIGJvb2wgcGlja2luZ191QWN0aXZlOyAvLyB0cnVlIGR1cmluZyByZW5kZXJpbmcgdG8gb2Zmc2NyZWVuIHBpY2tpbmcgYnVmZmVyXG51bmlmb3JtIHZlYzMgcGlja2luZ191U2VsZWN0ZWRDb2xvcjtcbnVuaWZvcm0gdmVjNCBwaWNraW5nX3VIaWdobGlnaHRDb2xvcjtcbnVuaWZvcm0gZmxvYXQgcGlja2luZ191SGlnaGxpZ2h0U2NhbGU7XG5cbnZhcnlpbmcgdmVjNCBwaWNraW5nX3ZSR0Jjb2xvcl9Bc2VsZWN0ZWQ7XG5cbmNvbnN0IGZsb2F0IENPTE9SX1NDQUxFID0gMS4gLyAyNTUuO1xuXG4vKlxuICogUmV0dXJucyBoaWdobGlnaHQgY29sb3IgaWYgdGhpcyBpdGVtIGlzIHNlbGVjdGVkLlxuICovXG52ZWM0IHBpY2tpbmdfZmlsdGVySGlnaGxpZ2h0Q29sb3IodmVjNCBjb2xvcikge1xuICBib29sIHNlbGVjdGVkID0gYm9vbChwaWNraW5nX3ZSR0Jjb2xvcl9Bc2VsZWN0ZWQuYSk7XG4gIC8vIHJldHVybiBzZWxlY3RlZCA/IChwaWNraW5nX3VIaWdobGlnaHRDb2xvciAqIENPTE9SX1NDQUxFKSA6IGNvbG9yO1xuICByZXR1cm4gc2VsZWN0ZWQgPyAoXG4gICAoYm9vbChwaWNraW5nX3VIaWdobGlnaHRTY2FsZSA+IDAuMCkgPyBjb2xvciAqIHBpY2tpbmdfdUhpZ2hsaWdodFNjYWxlIDogcGlja2luZ191SGlnaGxpZ2h0Q29sb3IgKiBDT0xPUl9TQ0FMRSlcbiAgKSA6IGNvbG9yO1xufVxuXG4vKlxuICogUmV0dXJucyBwaWNraW5nIGNvbG9yIGlmIHBpY2tpbmcgZW5hYmxlZCBlbHNlIHVubW9kaWZpZWQgYXJndW1lbnQuXG4gKi9cbnZlYzQgcGlja2luZ19maWx0ZXJQaWNraW5nQ29sb3IodmVjNCBjb2xvcikge1xuICB2ZWMzIHBpY2tpbmdDb2xvciA9IHBpY2tpbmdfdlJHQmNvbG9yX0FzZWxlY3RlZC5yZ2I7XG4gIGlmIChwaWNraW5nX3VBY3RpdmUgJiYgbGVuZ3RoKHBpY2tpbmdDb2xvcikgPCAwLjAwMSkge1xuICAgIGRpc2NhcmQ7XG4gIH1cbiAgcmV0dXJuIHBpY2tpbmdfdUFjdGl2ZSA/IHZlYzQocGlja2luZ0NvbG9yLCAxLjApIDogY29sb3I7XG59XG5cbi8qXG4gKiBSZXR1cm5zIHBpY2tpbmcgY29sb3IgaWYgcGlja2luZyBpcyBlbmFibGVkIGlmIG5vdFxuICogaGlnaGxpZ2h0IGNvbG9yIGlmIHRoaXMgaXRlbSBpcyBzZWxlY3RlZCwgb3RoZXJ3aXNlIHVubW9kaWZpZWQgYXJndW1lbnQuXG4gKi9cbnZlYzQgcGlja2luZ19maWx0ZXJDb2xvcih2ZWM0IGNvbG9yKSB7XG4gIHZlYzQgaGlnaGlnaHRDb2xvciA9IHBpY2tpbmdfZmlsdGVySGlnaGxpZ2h0Q29sb3IoY29sb3IpO1xuICByZXR1cm4gcGlja2luZ19maWx0ZXJQaWNraW5nQ29sb3IoaGlnaGlnaHRDb2xvcik7XG59XG5gO1xuXG5leHBvcnQgZGVmYXVsdCB7XG4gIC4uLnBpY2tpbmcsXG4gIGZzXG59O1xuIl19