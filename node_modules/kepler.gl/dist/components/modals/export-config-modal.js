'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _taggedTemplateLiteral2 = require('babel-runtime/helpers/taggedTemplateLiteral');

var _taggedTemplateLiteral3 = _interopRequireDefault(_taggedTemplateLiteral2);

var _templateObject = (0, _taggedTemplateLiteral3.default)(['\n  display: flex;\n  flex-direction: row;\n  margin: 35px 0;\n  width: 100%;\n  justify-content: space-between;\n\n  .description {\n    width: 185px;\n\n    .title {\n      font-weight: 500;\n      color: ', ';\n      font-size: 12px;\n    }\n    .subtitle {\n      color: ', ';\n      font-size: 11px;\n    }\n\n    .note {\n      color: ', ';\n      font-size: 11px;\n    }\n  }\n\n  .selection {\n    padding-left: 50px;\n    flex-grow: 1;\n\n    .viewer {\n      border: 1px solid ', ';\n      background-color: white;\n      border-radius: 2px;\n      display: inline-block;\n      font: inherit;\n      line-height: 1.5em;\n      padding: 0.5em 3.5em 0.5em 1em;\n      margin: 0;\n      box-sizing: border-box;\n      appearance: none;\n      height: 300px;\n      width: 100%;\n      overflow-y: scroll;\n    }\n  }\n'], ['\n  display: flex;\n  flex-direction: row;\n  margin: 35px 0;\n  width: 100%;\n  justify-content: space-between;\n\n  .description {\n    width: 185px;\n\n    .title {\n      font-weight: 500;\n      color: ', ';\n      font-size: 12px;\n    }\n    .subtitle {\n      color: ', ';\n      font-size: 11px;\n    }\n\n    .note {\n      color: ', ';\n      font-size: 11px;\n    }\n  }\n\n  .selection {\n    padding-left: 50px;\n    flex-grow: 1;\n\n    .viewer {\n      border: 1px solid ', ';\n      background-color: white;\n      border-radius: 2px;\n      display: inline-block;\n      font: inherit;\n      line-height: 1.5em;\n      padding: 0.5em 3.5em 0.5em 1em;\n      margin: 0;\n      box-sizing: border-box;\n      appearance: none;\n      height: 300px;\n      width: 100%;\n      overflow-y: scroll;\n    }\n  }\n']),
    _templateObject2 = (0, _taggedTemplateLiteral3.default)(['\n  width: 100%;\n'], ['\n  width: 100%;\n']); // Copyright (c) 2018 Uber Technologies, Inc.
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

var _switch = require('../common/switch');

var _switch2 = _interopRequireDefault(_switch);

var _reactJsonPretty = require('react-json-pretty');

var _reactJsonPretty2 = _interopRequireDefault(_reactJsonPretty);

var _styledComponents3 = require('../common/styled-components');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var propTypes = {
  config: _propTypes2.default.object.required
};

var StyledExportConfigSection = _styledComponents2.default.div(_templateObject, function (props) {
  return props.theme.textColorLT;
}, function (props) {
  return props.theme.textColor;
}, function (props) {
  return props.theme.errorColor;
}, function (props) {
  return props.theme.selectBorderColorLT;
});

var StyledModalContentInner = _styledComponents2.default.div(_templateObject2);

var ExportConfigModal = function ExportConfigModal(_ref) {
  var data = _ref.data,
      config = _ref.config,
      onChangeExportData = _ref.onChangeExportData;
  return _react2.default.createElement(
    'div',
    { className: 'export-config-modal' },
    _react2.default.createElement(
      _styledComponents3.StyledModalContent,
      null,
      _react2.default.createElement(
        StyledModalContentInner,
        { className: 'export-config-modal__inner' },
        _react2.default.createElement(
          StyledExportConfigSection,
          null,
          _react2.default.createElement(
            'div',
            { className: 'description' },
            _react2.default.createElement(
              'div',
              { className: 'title' },
              'Current Config'
            ),
            _react2.default.createElement(
              'div',
              { className: 'subtitle' },
              'You can copy or export the current Kepler.gl configuration.'
            ),
            _react2.default.createElement(
              'div',
              { className: 'note' },
              '* kepler.gl map config is coupled with loaded datasets. dataId key is used to bind layers and filters to a specific dataset. If you try to upload a configuration with a specific dataId you also need to make sure you existing dataset id match the dataId/s in the config.'
            )
          ),
          _react2.default.createElement(
            'div',
            { className: 'selection' },
            _react2.default.createElement(
              'div',
              { className: 'viewer' },
              _react2.default.createElement(_reactJsonPretty2.default, { id: 'json-pretty', json: config })
            )
          )
        ),
        _react2.default.createElement(
          StyledExportConfigSection,
          null,
          _react2.default.createElement(
            'div',
            { className: 'description' },
            _react2.default.createElement(
              'div',
              { className: 'title' },
              'Export Current Map'
            ),
            _react2.default.createElement(
              'div',
              { className: 'subtitle' },
              'Export current map, including data and config. You can later load the same map by loading this file to kepler.gl.'
            )
          ),
          _react2.default.createElement(
            'div',
            { className: 'selection' },
            _react2.default.createElement(_switch2.default, { type: 'checkbox',
              id: 'export-map-config',
              checked: data,
              onChange: onChangeExportData })
          )
        )
      )
    )
  );
};

ExportConfigModal.propTypes = propTypes;

var ExportConfigModalFactory = function ExportConfigModalFactory() {
  return ExportConfigModal;
};
exports.default = ExportConfigModalFactory;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9jb21wb25lbnRzL21vZGFscy9leHBvcnQtY29uZmlnLW1vZGFsLmpzIl0sIm5hbWVzIjpbInByb3BUeXBlcyIsImNvbmZpZyIsIlByb3BUeXBlcyIsIm9iamVjdCIsInJlcXVpcmVkIiwiU3R5bGVkRXhwb3J0Q29uZmlnU2VjdGlvbiIsInN0eWxlZCIsImRpdiIsInByb3BzIiwidGhlbWUiLCJ0ZXh0Q29sb3JMVCIsInRleHRDb2xvciIsImVycm9yQ29sb3IiLCJzZWxlY3RCb3JkZXJDb2xvckxUIiwiU3R5bGVkTW9kYWxDb250ZW50SW5uZXIiLCJFeHBvcnRDb25maWdNb2RhbCIsImRhdGEiLCJvbkNoYW5nZUV4cG9ydERhdGEiLCJFeHBvcnRDb25maWdNb2RhbEZhY3RvcnkiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7OzZHQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFFQTs7OztBQUVBLElBQU1BLFlBQVk7QUFDaEJDLFVBQVFDLG9CQUFVQyxNQUFWLENBQWlCQztBQURULENBQWxCOztBQUlBLElBQU1DLDRCQUE0QkMsMkJBQU9DLEdBQW5DLGtCQVlTO0FBQUEsU0FBU0MsTUFBTUMsS0FBTixDQUFZQyxXQUFyQjtBQUFBLENBWlQsRUFnQlM7QUFBQSxTQUFTRixNQUFNQyxLQUFOLENBQVlFLFNBQXJCO0FBQUEsQ0FoQlQsRUFxQlM7QUFBQSxTQUFTSCxNQUFNQyxLQUFOLENBQVlHLFVBQXJCO0FBQUEsQ0FyQlQsRUErQm9CO0FBQUEsU0FBU0osTUFBTUMsS0FBTixDQUFZSSxtQkFBckI7QUFBQSxDQS9CcEIsQ0FBTjs7QUFnREEsSUFBTUMsMEJBQTBCUiwyQkFBT0MsR0FBakMsa0JBQU47O0FBSUEsSUFBTVEsb0JBQW9CLFNBQXBCQSxpQkFBb0I7QUFBQSxNQUN4QkMsSUFEd0IsUUFDeEJBLElBRHdCO0FBQUEsTUFFeEJmLE1BRndCLFFBRXhCQSxNQUZ3QjtBQUFBLE1BSXhCZ0Isa0JBSndCLFFBSXhCQSxrQkFKd0I7QUFBQSxTQU14QjtBQUFBO0FBQUEsTUFBSyxXQUFVLHFCQUFmO0FBQ0U7QUFBQywyQ0FBRDtBQUFBO0FBQ0U7QUFBQywrQkFBRDtBQUFBLFVBQXlCLFdBQVUsNEJBQW5DO0FBQ0U7QUFBQyxtQ0FBRDtBQUFBO0FBQ0U7QUFBQTtBQUFBLGNBQUssV0FBVSxhQUFmO0FBQ0U7QUFBQTtBQUFBLGdCQUFLLFdBQVUsT0FBZjtBQUFBO0FBQUEsYUFERjtBQUlFO0FBQUE7QUFBQSxnQkFBSyxXQUFVLFVBQWY7QUFBQTtBQUFBLGFBSkY7QUFPRTtBQUFBO0FBQUEsZ0JBQUssV0FBVSxNQUFmO0FBQUE7QUFBQTtBQVBGLFdBREY7QUFlRTtBQUFBO0FBQUEsY0FBSyxXQUFVLFdBQWY7QUFDRTtBQUFBO0FBQUEsZ0JBQUssV0FBVSxRQUFmO0FBQ0ksNENBQUMseUJBQUQsSUFBWSxJQUFHLGFBQWYsRUFBNkIsTUFBTWhCLE1BQW5DO0FBREo7QUFERjtBQWZGLFNBREY7QUFzQkU7QUFBQyxtQ0FBRDtBQUFBO0FBQ0U7QUFBQTtBQUFBLGNBQUssV0FBVSxhQUFmO0FBQ0U7QUFBQTtBQUFBLGdCQUFLLFdBQVUsT0FBZjtBQUFBO0FBQUEsYUFERjtBQUlFO0FBQUE7QUFBQSxnQkFBSyxXQUFVLFVBQWY7QUFBQTtBQUFBO0FBSkYsV0FERjtBQVNFO0FBQUE7QUFBQSxjQUFLLFdBQVUsV0FBZjtBQUNFLDBDQUFDLGdCQUFELElBQVEsTUFBSyxVQUFiO0FBQ1Esa0JBQUcsbUJBRFg7QUFFUSx1QkFBU2UsSUFGakI7QUFHUSx3QkFBVUMsa0JBSGxCO0FBREY7QUFURjtBQXRCRjtBQURGO0FBREYsR0FOd0I7QUFBQSxDQUExQjs7QUFtREFGLGtCQUFrQmYsU0FBbEIsR0FBOEJBLFNBQTlCOztBQUVBLElBQU1rQiwyQkFBMkIsU0FBM0JBLHdCQUEyQjtBQUFBLFNBQU1ILGlCQUFOO0FBQUEsQ0FBakM7a0JBQ2VHLHdCIiwiZmlsZSI6ImV4cG9ydC1jb25maWctbW9kYWwuanMiLCJzb3VyY2VzQ29udGVudCI6WyIvLyBDb3B5cmlnaHQgKGMpIDIwMTggVWJlciBUZWNobm9sb2dpZXMsIEluYy5cbi8vXG4vLyBQZXJtaXNzaW9uIGlzIGhlcmVieSBncmFudGVkLCBmcmVlIG9mIGNoYXJnZSwgdG8gYW55IHBlcnNvbiBvYnRhaW5pbmcgYSBjb3B5XG4vLyBvZiB0aGlzIHNvZnR3YXJlIGFuZCBhc3NvY2lhdGVkIGRvY3VtZW50YXRpb24gZmlsZXMgKHRoZSBcIlNvZnR3YXJlXCIpLCB0byBkZWFsXG4vLyBpbiB0aGUgU29mdHdhcmUgd2l0aG91dCByZXN0cmljdGlvbiwgaW5jbHVkaW5nIHdpdGhvdXQgbGltaXRhdGlvbiB0aGUgcmlnaHRzXG4vLyB0byB1c2UsIGNvcHksIG1vZGlmeSwgbWVyZ2UsIHB1Ymxpc2gsIGRpc3RyaWJ1dGUsIHN1YmxpY2Vuc2UsIGFuZC9vciBzZWxsXG4vLyBjb3BpZXMgb2YgdGhlIFNvZnR3YXJlLCBhbmQgdG8gcGVybWl0IHBlcnNvbnMgdG8gd2hvbSB0aGUgU29mdHdhcmUgaXNcbi8vIGZ1cm5pc2hlZCB0byBkbyBzbywgc3ViamVjdCB0byB0aGUgZm9sbG93aW5nIGNvbmRpdGlvbnM6XG4vL1xuLy8gVGhlIGFib3ZlIGNvcHlyaWdodCBub3RpY2UgYW5kIHRoaXMgcGVybWlzc2lvbiBub3RpY2Ugc2hhbGwgYmUgaW5jbHVkZWQgaW5cbi8vIGFsbCBjb3BpZXMgb3Igc3Vic3RhbnRpYWwgcG9ydGlvbnMgb2YgdGhlIFNvZnR3YXJlLlxuLy9cbi8vIFRIRSBTT0ZUV0FSRSBJUyBQUk9WSURFRCBcIkFTIElTXCIsIFdJVEhPVVQgV0FSUkFOVFkgT0YgQU5ZIEtJTkQsIEVYUFJFU1MgT1Jcbi8vIElNUExJRUQsIElOQ0xVRElORyBCVVQgTk9UIExJTUlURUQgVE8gVEhFIFdBUlJBTlRJRVMgT0YgTUVSQ0hBTlRBQklMSVRZLFxuLy8gRklUTkVTUyBGT1IgQSBQQVJUSUNVTEFSIFBVUlBPU0UgQU5EIE5PTklORlJJTkdFTUVOVC4gSU4gTk8gRVZFTlQgU0hBTEwgVEhFXG4vLyBBVVRIT1JTIE9SIENPUFlSSUdIVCBIT0xERVJTIEJFIExJQUJMRSBGT1IgQU5ZIENMQUlNLCBEQU1BR0VTIE9SIE9USEVSXG4vLyBMSUFCSUxJVFksIFdIRVRIRVIgSU4gQU4gQUNUSU9OIE9GIENPTlRSQUNULCBUT1JUIE9SIE9USEVSV0lTRSwgQVJJU0lORyBGUk9NLFxuLy8gT1VUIE9GIE9SIElOIENPTk5FQ1RJT04gV0lUSCBUSEUgU09GVFdBUkUgT1IgVEhFIFVTRSBPUiBPVEhFUiBERUFMSU5HUyBJTlxuLy8gVEhFIFNPRlRXQVJFLlxuXG5pbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xuaW1wb3J0IFByb3BUeXBlcyBmcm9tICdwcm9wLXR5cGVzJztcbmltcG9ydCBzdHlsZWQgZnJvbSAnc3R5bGVkLWNvbXBvbmVudHMnO1xuaW1wb3J0IFN3aXRjaCBmcm9tICdjb21wb25lbnRzL2NvbW1vbi9zd2l0Y2gnO1xuaW1wb3J0IEpTT05QcmV0dHkgZnJvbSAncmVhY3QtanNvbi1wcmV0dHknO1xuXG5pbXBvcnQge1N0eWxlZE1vZGFsQ29udGVudH0gZnJvbSAnY29tcG9uZW50cy9jb21tb24vc3R5bGVkLWNvbXBvbmVudHMnO1xuXG5jb25zdCBwcm9wVHlwZXMgPSB7XG4gIGNvbmZpZzogUHJvcFR5cGVzLm9iamVjdC5yZXF1aXJlZFxufTtcblxuY29uc3QgU3R5bGVkRXhwb3J0Q29uZmlnU2VjdGlvbiA9IHN0eWxlZC5kaXZgXG4gIGRpc3BsYXk6IGZsZXg7XG4gIGZsZXgtZGlyZWN0aW9uOiByb3c7XG4gIG1hcmdpbjogMzVweCAwO1xuICB3aWR0aDogMTAwJTtcbiAganVzdGlmeS1jb250ZW50OiBzcGFjZS1iZXR3ZWVuO1xuXG4gIC5kZXNjcmlwdGlvbiB7XG4gICAgd2lkdGg6IDE4NXB4O1xuXG4gICAgLnRpdGxlIHtcbiAgICAgIGZvbnQtd2VpZ2h0OiA1MDA7XG4gICAgICBjb2xvcjogJHtwcm9wcyA9PiBwcm9wcy50aGVtZS50ZXh0Q29sb3JMVH07XG4gICAgICBmb250LXNpemU6IDEycHg7XG4gICAgfVxuICAgIC5zdWJ0aXRsZSB7XG4gICAgICBjb2xvcjogJHtwcm9wcyA9PiBwcm9wcy50aGVtZS50ZXh0Q29sb3J9O1xuICAgICAgZm9udC1zaXplOiAxMXB4O1xuICAgIH1cblxuICAgIC5ub3RlIHtcbiAgICAgIGNvbG9yOiAke3Byb3BzID0+IHByb3BzLnRoZW1lLmVycm9yQ29sb3J9O1xuICAgICAgZm9udC1zaXplOiAxMXB4O1xuICAgIH1cbiAgfVxuXG4gIC5zZWxlY3Rpb24ge1xuICAgIHBhZGRpbmctbGVmdDogNTBweDtcbiAgICBmbGV4LWdyb3c6IDE7XG5cbiAgICAudmlld2VyIHtcbiAgICAgIGJvcmRlcjogMXB4IHNvbGlkICR7cHJvcHMgPT4gcHJvcHMudGhlbWUuc2VsZWN0Qm9yZGVyQ29sb3JMVH07XG4gICAgICBiYWNrZ3JvdW5kLWNvbG9yOiB3aGl0ZTtcbiAgICAgIGJvcmRlci1yYWRpdXM6IDJweDtcbiAgICAgIGRpc3BsYXk6IGlubGluZS1ibG9jaztcbiAgICAgIGZvbnQ6IGluaGVyaXQ7XG4gICAgICBsaW5lLWhlaWdodDogMS41ZW07XG4gICAgICBwYWRkaW5nOiAwLjVlbSAzLjVlbSAwLjVlbSAxZW07XG4gICAgICBtYXJnaW46IDA7XG4gICAgICBib3gtc2l6aW5nOiBib3JkZXItYm94O1xuICAgICAgYXBwZWFyYW5jZTogbm9uZTtcbiAgICAgIGhlaWdodDogMzAwcHg7XG4gICAgICB3aWR0aDogMTAwJTtcbiAgICAgIG92ZXJmbG93LXk6IHNjcm9sbDtcbiAgICB9XG4gIH1cbmA7XG5cbmNvbnN0IFN0eWxlZE1vZGFsQ29udGVudElubmVyID0gc3R5bGVkLmRpdmBcbiAgd2lkdGg6IDEwMCU7XG5gO1xuXG5jb25zdCBFeHBvcnRDb25maWdNb2RhbCA9ICh7XG4gIGRhdGEsXG4gIGNvbmZpZyxcbiAgLy8gYWN0aW9uc1xuICBvbkNoYW5nZUV4cG9ydERhdGFcbn0pID0+IChcbiAgPGRpdiBjbGFzc05hbWU9XCJleHBvcnQtY29uZmlnLW1vZGFsXCI+XG4gICAgPFN0eWxlZE1vZGFsQ29udGVudD5cbiAgICAgIDxTdHlsZWRNb2RhbENvbnRlbnRJbm5lciBjbGFzc05hbWU9XCJleHBvcnQtY29uZmlnLW1vZGFsX19pbm5lclwiPlxuICAgICAgICA8U3R5bGVkRXhwb3J0Q29uZmlnU2VjdGlvbj5cbiAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImRlc2NyaXB0aW9uXCI+XG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInRpdGxlXCI+XG4gICAgICAgICAgICAgIEN1cnJlbnQgQ29uZmlnXG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwic3VidGl0bGVcIj5cbiAgICAgICAgICAgICAgWW91IGNhbiBjb3B5IG9yIGV4cG9ydCB0aGUgY3VycmVudCBLZXBsZXIuZ2wgY29uZmlndXJhdGlvbi5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJub3RlXCI+XG4gICAgICAgICAgICAgICoga2VwbGVyLmdsIG1hcCBjb25maWcgaXMgY291cGxlZCB3aXRoIGxvYWRlZCBkYXRhc2V0cy5cbiAgICAgICAgICAgICAgZGF0YUlkIGtleSBpcyB1c2VkIHRvIGJpbmQgbGF5ZXJzIGFuZCBmaWx0ZXJzIHRvIGEgc3BlY2lmaWMgZGF0YXNldC5cbiAgICAgICAgICAgICAgSWYgeW91IHRyeSB0byB1cGxvYWQgYSBjb25maWd1cmF0aW9uIHdpdGggYSBzcGVjaWZpYyBkYXRhSWQgeW91IGFsc28gbmVlZCB0byBtYWtlIHN1cmVcbiAgICAgICAgICAgICAgeW91IGV4aXN0aW5nIGRhdGFzZXQgaWQgbWF0Y2ggdGhlIGRhdGFJZC9zIGluIHRoZSBjb25maWcuXG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInNlbGVjdGlvblwiPlxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJ2aWV3ZXJcIj5cbiAgICAgICAgICAgICAgICA8SlNPTlByZXR0eSBpZD1cImpzb24tcHJldHR5XCIganNvbj17Y29uZmlnfS8+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgPC9TdHlsZWRFeHBvcnRDb25maWdTZWN0aW9uPlxuICAgICAgICA8U3R5bGVkRXhwb3J0Q29uZmlnU2VjdGlvbj5cbiAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImRlc2NyaXB0aW9uXCI+XG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInRpdGxlXCI+XG4gICAgICAgICAgICAgIEV4cG9ydCBDdXJyZW50IE1hcFxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInN1YnRpdGxlXCI+XG4gICAgICAgICAgICAgIEV4cG9ydCBjdXJyZW50IG1hcCwgaW5jbHVkaW5nIGRhdGEgYW5kIGNvbmZpZy4gWW91IGNhbiBsYXRlciBsb2FkIHRoZSBzYW1lIG1hcCBieSBsb2FkaW5nIHRoaXMgZmlsZSB0byBrZXBsZXIuZ2wuXG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInNlbGVjdGlvblwiPlxuICAgICAgICAgICAgPFN3aXRjaCB0eXBlPVwiY2hlY2tib3hcIlxuICAgICAgICAgICAgICAgICAgICBpZD1cImV4cG9ydC1tYXAtY29uZmlnXCJcbiAgICAgICAgICAgICAgICAgICAgY2hlY2tlZD17ZGF0YX1cbiAgICAgICAgICAgICAgICAgICAgb25DaGFuZ2U9e29uQ2hhbmdlRXhwb3J0RGF0YX0vPlxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICA8L1N0eWxlZEV4cG9ydENvbmZpZ1NlY3Rpb24+XG4gICAgICA8L1N0eWxlZE1vZGFsQ29udGVudElubmVyPlxuICAgIDwvU3R5bGVkTW9kYWxDb250ZW50PlxuICA8L2Rpdj5cbik7XG5cbkV4cG9ydENvbmZpZ01vZGFsLnByb3BUeXBlcyA9IHByb3BUeXBlcztcblxuY29uc3QgRXhwb3J0Q29uZmlnTW9kYWxGYWN0b3J5ID0gKCkgPT4gRXhwb3J0Q29uZmlnTW9kYWw7XG5leHBvcnQgZGVmYXVsdCBFeHBvcnRDb25maWdNb2RhbEZhY3Rvcnk7XG4iXX0=