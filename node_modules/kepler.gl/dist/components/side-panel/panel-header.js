'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SaveExportDropdown = exports.PanelAction = undefined;

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

var _templateObject = (0, _taggedTemplateLiteral3.default)(['\n  background-color: ', ';\n  padding: 12px 16px 0 16px;\n'], ['\n  background-color: ', ';\n  padding: 12px 16px 0 16px;\n']),
    _templateObject2 = (0, _taggedTemplateLiteral3.default)(['\n  display: flex;\n  justify-content: space-between;\n  margin-bottom: 16px;\n  width: 100%;\n'], ['\n  display: flex;\n  justify-content: space-between;\n  margin-bottom: 16px;\n  width: 100%;\n']),
    _templateObject3 = (0, _taggedTemplateLiteral3.default)(['\n  display: flex;\n'], ['\n  display: flex;\n']),
    _templateObject4 = (0, _taggedTemplateLiteral3.default)(['\n  align-items: center;\n  border-radius: 2px;\n  color: ', ';\n  display: flex;\n  height: 26px;\n  justify-content: space-between;\n  margin-left: 4px;\n  width: 70px;\n  padding: 5px;\n  font-weight: bold;\n  a {\n    height: 20px;\n  }\n\n  :hover {\n    cursor: pointer;\n    background-color: ', ';\n    color: ', ';\n\n    a {\n      color: ', ';\n    }\n  }\n'], ['\n  align-items: center;\n  border-radius: 2px;\n  color: ', ';\n  display: flex;\n  height: 26px;\n  justify-content: space-between;\n  margin-left: 4px;\n  width: 70px;\n  padding: 5px;\n  font-weight: bold;\n  a {\n    height: 20px;\n  }\n\n  :hover {\n    cursor: pointer;\n    background-color: ', ';\n    color: ', ';\n\n    a {\n      color: ', ';\n    }\n  }\n']),
    _templateObject5 = (0, _taggedTemplateLiteral3.default)(['\n  background-color: ', ';\n  box-shadow: ', ';\n  font-size: 11px;\n  padding: 16px 0;\n  position: absolute;\n  transition: ', ';\n  display: flex;\n  margin-top: ', ';\n  opacity: ', ';\n  transform: translateX(calc(-50% + 20px));\n  pointer-events:  ', ';\n  z-index: 1000;\n\n  .save-export-dropdown__inner {\n    box-shadow: none;\n    background-color: transparent;\n    display: flex;\n  }\n\n  .save-export-dropdown__item {\n    align-items: center;\n    border-right: 1px solid ', ';\n    color: ', ';\n    display: flex;\n    flex-direction: column;\n    padding: 0 22px;\n\n    :hover {\n      cursor: pointer;\n      color: ', ';\n    }\n\n    &:last-child {\n      border-right: 0;\n    }\n  }\n\n  .save-export-dropdown__title {\n    white-space: nowrap;\n    margin-top: 4px;\n  }\n'], ['\n  background-color: ', ';\n  box-shadow: ', ';\n  font-size: 11px;\n  padding: 16px 0;\n  position: absolute;\n  transition: ', ';\n  display: flex;\n  margin-top: ', ';\n  opacity: ', ';\n  transform: translateX(calc(-50% + 20px));\n  pointer-events:  ', ';\n  z-index: 1000;\n\n  .save-export-dropdown__inner {\n    box-shadow: none;\n    background-color: transparent;\n    display: flex;\n  }\n\n  .save-export-dropdown__item {\n    align-items: center;\n    border-right: 1px solid ', ';\n    color: ', ';\n    display: flex;\n    flex-direction: column;\n    padding: 0 22px;\n\n    :hover {\n      cursor: pointer;\n      color: ', ';\n    }\n\n    &:last-child {\n      border-right: 0;\n    }\n  }\n\n  .save-export-dropdown__title {\n    white-space: nowrap;\n    margin-top: 4px;\n  }\n']); // Copyright (c) 2018 Uber Technologies, Inc.
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

var _styledComponents = require('styled-components');

var _styledComponents2 = _interopRequireDefault(_styledComponents);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _styledComponents3 = require('../common/styled-components');

var _logo = require('../common/logo');

var _logo2 = _interopRequireDefault(_logo);

var _icons = require('../common/icons');

var _panelDropdown = require('./panel-dropdown');

var _panelDropdown2 = _interopRequireDefault(_panelDropdown);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var StyledPanelHeader = _styledComponents2.default.div.attrs({
  className: 'side-side-panel__header'
})(_templateObject, function (props) {
  return props.theme.sidePanelHeaderBg;
});

var StyledPanelHeaderTop = _styledComponents2.default.div.attrs({
  className: 'side-panel__header__top'
})(_templateObject2);

var StyledPanelTopActions = _styledComponents2.default.div.attrs({
  className: 'side-panel__header__actions'
})(_templateObject3);

var StyledPanelAction = _styledComponents2.default.div.attrs({
  className: 'side-panel__header__actions'
})(_templateObject4, function (props) {
  return props.active ? props.theme.textColorHl : props.theme.subtextColor;
}, function (props) {
  return props.theme.secondaryBtnActBgd;
}, function (props) {
  return props.theme.textColorHl;
}, function (props) {
  return props.theme.textColorHl;
});

var StyledPanelDropdown = _styledComponents2.default.div(_templateObject5, function (props) {
  return props.theme.dropdownListBgd;
}, function (props) {
  return props.theme.dropdownListShadow;
}, function (props) {
  return props.theme.transitionSlow;
}, function (props) {
  return props.show ? '6px' : '20px';
}, function (props) {
  return props.show ? 1 : 0;
}, function (props) {
  return props.show ? 'all' : 'none';
}, function (props) {
  return props.theme.panelHeaderIcon;
}, function (props) {
  return props.theme.textColor;
}, function (props) {
  return props.theme.textColorHl;
});

var PanelAction = exports.PanelAction = function PanelAction(_ref) {
  var item = _ref.item,
      onClick = _ref.onClick;
  return _react2.default.createElement(
    StyledPanelAction,
    { className: 'side-panel__panel-header__action',
      'data-tip': true, 'data-for': item.id + '-action', onClick: onClick },
    item.label ? _react2.default.createElement(
      'p',
      null,
      item.label
    ) : null,
    _react2.default.createElement(
      'a',
      { target: item.blank ? '_blank' : '', href: item.href },
      _react2.default.createElement(item.iconComponent, { height: '20px' })
    ),
    item.tooltip ? _react2.default.createElement(
      _styledComponents3.Tooltip,
      {
        id: item.id + '-action',
        place: 'bottom',
        delayShow: 500,
        effect: 'solid'
      },
      _react2.default.createElement(
        'span',
        null,
        item.tooltip
      )
    ) : null
  );
};

var PanelItem = function PanelItem(_ref2) {
  var onClose = _ref2.onClose,
      onClickHandler = _ref2.onClickHandler,
      label = _ref2.label,
      icon = _ref2.icon;
  return _react2.default.createElement(
    'div',
    { className: 'save-export-dropdown__item', onClick: function onClick(e) {
        e.stopPropagation();
        onClose();
        onClickHandler();
      } },
    icon,
    _react2.default.createElement(
      'div',
      { className: 'save-export-dropdown__title' },
      label
    )
  );
};

var SaveExportDropdown = exports.SaveExportDropdown = function SaveExportDropdown(_ref3) {
  var onExportImage = _ref3.onExportImage,
      onExportData = _ref3.onExportData,
      onExportConfig = _ref3.onExportConfig,
      onSaveMap = _ref3.onSaveMap,
      show = _ref3.show,
      onClose = _ref3.onClose;

  return _react2.default.createElement(
    StyledPanelDropdown,
    { show: show, className: 'save-export-dropdown' },
    _react2.default.createElement(
      _panelDropdown2.default,
      { className: 'save-export-dropdown__inner',
        show: show,
        onClose: onClose },
      _react2.default.createElement(PanelItem, {
        label: 'Export Image',
        onClickHandler: onExportImage,
        onClose: onClose,
        icon: _react2.default.createElement(_icons.Picture, { height: '16px' })
      }),
      _react2.default.createElement(PanelItem, {
        label: 'Export Data',
        onClickHandler: onExportData,
        onClose: onClose,
        icon: _react2.default.createElement(_icons.Files, { height: '16px' })
      }),
      _react2.default.createElement(PanelItem, {
        label: 'Export Config',
        onClickHandler: onExportConfig,
        onClose: onClose,
        icon: _react2.default.createElement(_icons.CodeAlt, { height: '16px' })
      }),
      onSaveMap ? _react2.default.createElement(PanelItem, {
        label: 'Save Map Url',
        onClickHandler: onSaveMap,
        onClose: onClose,
        icon: _react2.default.createElement(_icons.Share, { height: '16px' })
      }) : null
    )
  );
};

var defaultActionItems = [{
  id: 'save',
  iconComponent: _icons.Save,
  onClick: function onClick() {},
  label: 'Share',
  dropdownComponent: SaveExportDropdown
}];

function PanelHeaderFactory() {
  var _class, _temp;

  return _temp = _class = function (_Component) {
    (0, _inherits3.default)(PanelHeader, _Component);

    function PanelHeader() {
      (0, _classCallCheck3.default)(this, PanelHeader);
      return (0, _possibleConstructorReturn3.default)(this, (PanelHeader.__proto__ || Object.getPrototypeOf(PanelHeader)).apply(this, arguments));
    }

    (0, _createClass3.default)(PanelHeader, [{
      key: 'render',
      value: function render() {
        var _props = this.props,
            appName = _props.appName,
            version = _props.version,
            actionItems = _props.actionItems,
            onSaveMap = _props.onSaveMap,
            onExportImage = _props.onExportImage,
            onExportData = _props.onExportData,
            onExportConfig = _props.onExportConfig,
            visibleDropdown = _props.visibleDropdown,
            showExportDropdown = _props.showExportDropdown,
            hideExportDropdown = _props.hideExportDropdown;


        return _react2.default.createElement(
          StyledPanelHeader,
          { className: 'side-panel__panel-header' },
          _react2.default.createElement(
            StyledPanelHeaderTop,
            { className: 'side-panel__panel-header__top' },
            _react2.default.createElement(this.props.logoComponent, { appName: appName, version: version }),
            _react2.default.createElement(
              StyledPanelTopActions,
              null,
              actionItems.map(function (item) {
                return _react2.default.createElement(
                  'div',
                  { className: 'side-panel__panel-header__right',
                    key: item.id, style: { position: 'relative' } },
                  _react2.default.createElement(PanelAction, {
                    item: item,
                    onClick: function onClick() {
                      if (item.dropdownComponent) {
                        showExportDropdown(item.id);
                      }
                      item.onClick();
                    }
                  }),
                  item.dropdownComponent ? _react2.default.createElement(item.dropdownComponent, {
                    onClose: hideExportDropdown,
                    show: visibleDropdown === item.id,
                    onSaveMap: onSaveMap,
                    onExportData: onExportData,
                    onExportImage: onExportImage,
                    onExportConfig: onExportConfig
                  }) : null
                );
              })
            )
          )
        );
      }
    }]);
    return PanelHeader;
  }(_react.Component), _class.propTypes = {
    appName: _propTypes2.default.string,
    version: _propTypes2.default.string,
    uiState: _propTypes2.default.object,
    uiStateActions: _propTypes2.default.object,
    logoComponent: _propTypes2.default.oneOfType([_propTypes2.default.element, _propTypes2.default.func]),
    actionItems: _propTypes2.default.arrayOf(_propTypes2.default.any)
  }, _class.defaultProps = {
    logoComponent: _logo2.default,
    actionItems: defaultActionItems
  }, _temp;
}

exports.default = PanelHeaderFactory;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9jb21wb25lbnRzL3NpZGUtcGFuZWwvcGFuZWwtaGVhZGVyLmpzIl0sIm5hbWVzIjpbIlN0eWxlZFBhbmVsSGVhZGVyIiwic3R5bGVkIiwiZGl2IiwiYXR0cnMiLCJjbGFzc05hbWUiLCJwcm9wcyIsInRoZW1lIiwic2lkZVBhbmVsSGVhZGVyQmciLCJTdHlsZWRQYW5lbEhlYWRlclRvcCIsIlN0eWxlZFBhbmVsVG9wQWN0aW9ucyIsIlN0eWxlZFBhbmVsQWN0aW9uIiwiYWN0aXZlIiwidGV4dENvbG9ySGwiLCJzdWJ0ZXh0Q29sb3IiLCJzZWNvbmRhcnlCdG5BY3RCZ2QiLCJTdHlsZWRQYW5lbERyb3Bkb3duIiwiZHJvcGRvd25MaXN0QmdkIiwiZHJvcGRvd25MaXN0U2hhZG93IiwidHJhbnNpdGlvblNsb3ciLCJzaG93IiwicGFuZWxIZWFkZXJJY29uIiwidGV4dENvbG9yIiwiUGFuZWxBY3Rpb24iLCJpdGVtIiwib25DbGljayIsImlkIiwibGFiZWwiLCJibGFuayIsImhyZWYiLCJ0b29sdGlwIiwiUGFuZWxJdGVtIiwib25DbG9zZSIsIm9uQ2xpY2tIYW5kbGVyIiwiaWNvbiIsImUiLCJzdG9wUHJvcGFnYXRpb24iLCJTYXZlRXhwb3J0RHJvcGRvd24iLCJvbkV4cG9ydEltYWdlIiwib25FeHBvcnREYXRhIiwib25FeHBvcnRDb25maWciLCJvblNhdmVNYXAiLCJkZWZhdWx0QWN0aW9uSXRlbXMiLCJpY29uQ29tcG9uZW50IiwiU2F2ZSIsImRyb3Bkb3duQ29tcG9uZW50IiwiUGFuZWxIZWFkZXJGYWN0b3J5IiwiYXBwTmFtZSIsInZlcnNpb24iLCJhY3Rpb25JdGVtcyIsInZpc2libGVEcm9wZG93biIsInNob3dFeHBvcnREcm9wZG93biIsImhpZGVFeHBvcnREcm9wZG93biIsIm1hcCIsInBvc2l0aW9uIiwiQ29tcG9uZW50IiwicHJvcFR5cGVzIiwiUHJvcFR5cGVzIiwic3RyaW5nIiwidWlTdGF0ZSIsIm9iamVjdCIsInVpU3RhdGVBY3Rpb25zIiwibG9nb0NvbXBvbmVudCIsIm9uZU9mVHlwZSIsImVsZW1lbnQiLCJmdW5jIiwiYXJyYXlPZiIsImFueSIsImRlZmF1bHRQcm9wcyIsIktlcGxlckdsTG9nbyJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozt1b0RBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7O0FBQ0E7Ozs7QUFDQTs7QUFDQTs7Ozs7O0FBRUEsSUFBTUEsb0JBQW9CQywyQkFBT0MsR0FBUCxDQUFXQyxLQUFYLENBQWlCO0FBQ3pDQyxhQUFXO0FBRDhCLENBQWpCLENBQXBCLGtCQUdnQjtBQUFBLFNBQVNDLE1BQU1DLEtBQU4sQ0FBWUMsaUJBQXJCO0FBQUEsQ0FIaEIsQ0FBTjs7QUFPQSxJQUFNQyx1QkFBdUJQLDJCQUFPQyxHQUFQLENBQVdDLEtBQVgsQ0FBaUI7QUFDNUNDLGFBQVc7QUFEaUMsQ0FBakIsQ0FBdkIsa0JBQU47O0FBU0EsSUFBTUssd0JBQXdCUiwyQkFBT0MsR0FBUCxDQUFXQyxLQUFYLENBQWlCO0FBQzdDQyxhQUFXO0FBRGtDLENBQWpCLENBQXhCLGtCQUFOOztBQU1BLElBQU1NLG9CQUFvQlQsMkJBQU9DLEdBQVAsQ0FBV0MsS0FBWCxDQUFpQjtBQUN6Q0MsYUFBVztBQUQ4QixDQUFqQixDQUFwQixtQkFLSztBQUFBLFNBQ1BDLE1BQU1NLE1BQU4sR0FBZU4sTUFBTUMsS0FBTixDQUFZTSxXQUEzQixHQUF5Q1AsTUFBTUMsS0FBTixDQUFZTyxZQUQ5QztBQUFBLENBTEwsRUFvQmtCO0FBQUEsU0FBU1IsTUFBTUMsS0FBTixDQUFZUSxrQkFBckI7QUFBQSxDQXBCbEIsRUFxQk87QUFBQSxTQUFTVCxNQUFNQyxLQUFOLENBQVlNLFdBQXJCO0FBQUEsQ0FyQlAsRUF3QlM7QUFBQSxT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QUFTRixvQkFBVUcsTUFIRjtBQUlqQkMsb0JBQWdCSixvQkFBVUcsTUFKVDtBQUtqQkUsbUJBQWVMLG9CQUFVTSxTQUFWLENBQW9CLENBQUNOLG9CQUFVTyxPQUFYLEVBQW9CUCxvQkFBVVEsSUFBOUIsQ0FBcEIsQ0FMRTtBQU1qQmhCLGlCQUFhUSxvQkFBVVMsT0FBVixDQUFrQlQsb0JBQVVVLEdBQTVCO0FBTkksR0FEckIsU0FVU0MsWUFWVCxHQVV3QjtBQUNwQk4sbUJBQWVPLGNBREs7QUFFcEJwQixpQkFBYVA7QUFGTyxHQVZ4QjtBQWdFRDs7a0JBRWNJLGtCIiwiZmlsZSI6InBhbmVsLWhlYWRlci5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8vIENvcHlyaWdodCAoYykgMjAxOCBVYmVyIFRlY2hub2xvZ2llcywgSW5jLlxuLy9cbi8vIFBlcm1pc3Npb24gaXMgaGVyZWJ5IGdyYW50ZWQsIGZyZWUgb2YgY2hhcmdlLCB0byBhbnkgcGVyc29uIG9idGFpbmluZyBhIGNvcHlcbi8vIG9mIHRoaXMgc29mdHdhcmUgYW5kIGFzc29jaWF0ZWQgZG9jdW1lbnRhdGlvbiBmaWxlcyAodGhlIFwiU29mdHdhcmVcIiksIHRvIGRlYWxcbi8vIGluIHRoZSBTb2Z0d2FyZSB3aXRob3V0IHJlc3RyaWN0aW9uLCBpbmNsdWRpbmcgd2l0aG91dCBsaW1pdGF0aW9uIHRoZSByaWdodHNcbi8vIHRvIHVzZSwgY29weSwgbW9kaWZ5LCBtZXJnZSwgcHVibGlzaCwgZGlzdHJpYnV0ZSwgc3VibGljZW5zZSwgYW5kL29yIHNlbGxcbi8vIGNvcGllcyBvZiB0aGUgU29mdHdhcmUsIGFuZCB0byBwZXJtaXQgcGVyc29ucyB0byB3aG9tIHRoZSBTb2Z0d2FyZSBpc1xuLy8gZnVybmlzaGVkIHRvIGRvIHNvLCBzdWJqZWN0IHRvIHRoZSBmb2xsb3dpbmcgY29uZGl0aW9uczpcbi8vXG4vLyBUaGUgYWJvdmUgY29weXJpZ2h0IG5vdGljZSBhbmQgdGhpcyBwZXJtaXNzaW9uIG5vdGljZSBzaGFsbCBiZSBpbmNsdWRlZCBpblxuLy8gYWxsIGNvcGllcyBvciBzdWJzdGFudGlhbCBwb3J0aW9ucyBvZiB0aGUgU29mdHdhcmUuXG4vL1xuLy8gVEhFIFNPRlRXQVJFIElTIFBST1ZJREVEIFwiQVMgSVNcIiwgV0lUSE9VVCBXQVJSQU5UWSBPRiBBTlkgS0lORCwgRVhQUkVTUyBPUlxuLy8gSU1QTElFRCwgSU5DTFVESU5HIEJVVCBOT1QgTElNSVRFRCBUTyBUSEUgV0FSUkFOVElFUyBPRiBNRVJDSEFOVEFCSUxJVFksXG4vLyBGSVRORVNTIEZPUiBBIFBBUlRJQ1VMQVIgUFVSUE9TRSBBTkQgTk9OSU5GUklOR0VNRU5ULiBJTiBOTyBFVkVOVCBTSEFMTCBUSEVcbi8vIEFVVEhPUlMgT1IgQ09QWVJJR0hUIEhPTERFUlMgQkUgTElBQkxFIEZPUiBBTlkgQ0xBSU0sIERBTUFHRVMgT1IgT1RIRVJcbi8vIExJQUJJTElUWSwgV0hFVEhFUiBJTiBBTiBBQ1RJT04gT0YgQ09OVFJBQ1QsIFRPUlQgT1IgT1RIRVJXSVNFLCBBUklTSU5HIEZST00sXG4vLyBPVVQgT0YgT1IgSU4gQ09OTkVDVElPTiBXSVRIIFRIRSBTT0ZUV0FSRSBPUiBUSEUgVVNFIE9SIE9USEVSIERFQUxJTkdTIElOXG4vLyBUSEUgU09GVFdBUkUuXG5cbmltcG9ydCBSZWFjdCwge0NvbXBvbmVudH0gZnJvbSAncmVhY3QnO1xuaW1wb3J0IHN0eWxlZCBmcm9tICdzdHlsZWQtY29tcG9uZW50cyc7XG5pbXBvcnQgUHJvcFR5cGVzIGZyb20gJ3Byb3AtdHlwZXMnO1xuaW1wb3J0IHtUb29sdGlwfSBmcm9tICdjb21wb25lbnRzL2NvbW1vbi9zdHlsZWQtY29tcG9uZW50cyc7XG5pbXBvcnQgS2VwbGVyR2xMb2dvIGZyb20gJ2NvbXBvbmVudHMvY29tbW9uL2xvZ28nO1xuaW1wb3J0IHtDb2RlQWx0LCBTYXZlLCBGaWxlcywgU2hhcmUsIFBpY3R1cmV9IGZyb20gJ2NvbXBvbmVudHMvY29tbW9uL2ljb25zJztcbmltcG9ydCBDbGlja091dHNpZGVDbG9zZURyb3Bkb3duIGZyb20gJ2NvbXBvbmVudHMvc2lkZS1wYW5lbC9wYW5lbC1kcm9wZG93bic7XG5cbmNvbnN0IFN0eWxlZFBhbmVsSGVhZGVyID0gc3R5bGVkLmRpdi5hdHRycyh7XG4gIGNsYXNzTmFtZTogJ3NpZGUtc2lkZS1wYW5lbF9faGVhZGVyJ1xufSlgXG4gIGJhY2tncm91bmQtY29sb3I6ICR7cHJvcHMgPT4gcHJvcHMudGhlbWUuc2lkZVBhbmVsSGVhZGVyQmd9O1xuICBwYWRkaW5nOiAxMnB4IDE2cHggMCAxNnB4O1xuYDtcblxuY29uc3QgU3R5bGVkUGFuZWxIZWFkZXJUb3AgPSBzdHlsZWQuZGl2LmF0dHJzKHtcbiAgY2xhc3NOYW1lOiAnc2lkZS1wYW5lbF9faGVhZGVyX190b3AnXG59KWBcbiAgZGlzcGxheTogZmxleDtcbiAganVzdGlmeS1jb250ZW50OiBzcGFjZS1iZXR3ZWVuO1xuICBtYXJnaW4tYm90dG9tOiAxNnB4O1xuICB3aWR0aDogMTAwJTtcbmA7XG5cbmNvbnN0IFN0eWxlZFBhbmVsVG9wQWN0aW9ucyA9IHN0eWxlZC5kaXYuYXR0cnMoe1xuICBjbGFzc05hbWU6ICdzaWRlLXBhbmVsX19oZWFkZXJfX2FjdGlvbnMnXG59KWBcbiAgZGlzcGxheTogZmxleDtcbmA7XG5cbmNvbnN0IFN0eWxlZFBhbmVsQWN0aW9uID0gc3R5bGVkLmRpdi5hdHRycyh7XG4gIGNsYXNzTmFtZTogJ3NpZGUtcGFuZWxfX2hlYWRlcl9fYWN0aW9ucydcbn0pYFxuICBhbGlnbi1pdGVtczogY2VudGVyO1xuICBib3JkZXItcmFkaXVzOiAycHg7XG4gIGNvbG9yOiAke3Byb3BzID0+XG4gICAgcHJvcHMuYWN0aXZlID8gcHJvcHMudGhlbWUudGV4dENvbG9ySGwgOiBwcm9wcy50aGVtZS5zdWJ0ZXh0Q29sb3J9O1xuICBkaXNwbGF5OiBmbGV4O1xuICBoZWlnaHQ6IDI2cHg7XG4gIGp1c3RpZnktY29udGVudDogc3BhY2UtYmV0d2VlbjtcbiAgbWFyZ2luLWxlZnQ6IDRweDtcbiAgd2lkdGg6IDcwcHg7XG4gIHBhZGRpbmc6IDVweDtcbiAgZm9udC13ZWlnaHQ6IGJvbGQ7XG4gIGEge1xuICAgIGhlaWdodDogMjBweDtcbiAgfVxuXG4gIDpob3ZlciB7XG4gICAgY3Vyc29yOiBwb2ludGVyO1xuICAgIGJhY2tncm91bmQtY29sb3I6ICR7cHJvcHMgPT4gcHJvcHMudGhlbWUuc2Vjb25kYXJ5QnRuQWN0QmdkfTtcbiAgICBjb2xvcjogJHtwcm9wcyA9PiBwcm9wcy50aGVtZS50ZXh0Q29sb3JIbH07XG5cbiAgICBhIHtcbiAgICAgIGNvbG9yOiAke3Byb3BzID0+IHByb3BzLnRoZW1lLnRleHRDb2xvckhsfTtcbiAgICB9XG4gIH1cbmA7XG5cbmNvbnN0IFN0eWxlZFBhbmVsRHJvcGRvd24gPSBzdHlsZWQuZGl2YFxuICBiYWNrZ3JvdW5kLWNvbG9yOiAke3Byb3BzID0+IHByb3BzLnRoZW1lLmRyb3Bkb3duTGlzdEJnZH07XG4gIGJveC1zaGFkb3c6ICR7cHJvcHMgPT4gcHJvcHMudGhlbWUuZHJvcGRvd25MaXN0U2hhZG93fTtcbiAgZm9udC1zaXplOiAxMXB4O1xuICBwYWRkaW5nOiAxNnB4IDA7XG4gIHBvc2l0aW9uOiBhYnNvbHV0ZTtcbiAgdHJhbnNpdGlvbjogJHtwcm9wcyA9PiBwcm9wcy50aGVtZS50cmFuc2l0aW9uU2xvd307XG4gIGRpc3BsYXk6IGZsZXg7XG4gIG1hcmdpbi10b3A6ICR7cHJvcHMgPT4gcHJvcHMuc2hvdyA/ICc2cHgnIDogJzIwcHgnfTtcbiAgb3BhY2l0eTogJHtwcm9wcyA9PiBwcm9wcy5zaG93ID8gMSA6IDB9O1xuICB0cmFuc2Zvcm06IHRyYW5zbGF0ZVgoY2FsYygtNTAlICsgMjBweCkpO1xuICBwb2ludGVyLWV2ZW50czogICR7cHJvcHMgPT4gcHJvcHMuc2hvdyA/ICdhbGwnIDogJ25vbmUnfTtcbiAgei1pbmRleDogMTAwMDtcblxuICAuc2F2ZS1leHBvcnQtZHJvcGRvd25fX2lubmVyIHtcbiAgICBib3gtc2hhZG93OiBub25lO1xuICAgIGJhY2tncm91bmQtY29sb3I6IHRyYW5zcGFyZW50O1xuICAgIGRpc3BsYXk6IGZsZXg7XG4gIH1cblxuICAuc2F2ZS1leHBvcnQtZHJvcGRvd25fX2l0ZW0ge1xuICAgIGFsaWduLWl0ZW1zOiBjZW50ZXI7XG4gICAgYm9yZGVyLXJpZ2h0OiAxcHggc29saWQgJHtwcm9wcyA9PiBwcm9wcy50aGVtZS5wYW5lbEhlYWRlckljb259O1xuICAgIGNvbG9yOiAke3Byb3BzID0+IHByb3BzLnRoZW1lLnRleHRDb2xvcn07XG4gICAgZGlzcGxheTogZmxleDtcbiAgICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xuICAgIHBhZGRpbmc6IDAgMjJweDtcblxuICAgIDpob3ZlciB7XG4gICAgICBjdXJzb3I6IHBvaW50ZXI7XG4gICAgICBjb2xvcjogJHtwcm9wcyA9PiBwcm9wcy50aGVtZS50ZXh0Q29sb3JIbH07XG4gICAgfVxuXG4gICAgJjpsYXN0LWNoaWxkIHtcbiAgICAgIGJvcmRlci1yaWdodDogMDtcbiAgICB9XG4gIH1cblxuICAuc2F2ZS1leHBvcnQtZHJvcGRvd25fX3RpdGxlIHtcbiAgICB3aGl0ZS1zcGFjZTogbm93cmFwO1xuICAgIG1hcmdpbi10b3A6IDRweDtcbiAgfVxuYDtcblxuZXhwb3J0IGNvbnN0IFBhbmVsQWN0aW9uID0gKHtpdGVtLCBvbkNsaWNrfSkgPT4gKFxuICA8U3R5bGVkUGFuZWxBY3Rpb24gY2xhc3NOYW1lPVwic2lkZS1wYW5lbF9fcGFuZWwtaGVhZGVyX19hY3Rpb25cIlxuICAgIGRhdGEtdGlwIGRhdGEtZm9yPXtgJHtpdGVtLmlkfS1hY3Rpb25gfSBvbkNsaWNrPXtvbkNsaWNrfT5cbiAgICB7aXRlbS5sYWJlbCA/IDxwPntpdGVtLmxhYmVsfTwvcD4gOiBudWxsfVxuICAgIDxhIHRhcmdldD17aXRlbS5ibGFuayA/ICdfYmxhbmsnIDogJyd9IGhyZWY9e2l0ZW0uaHJlZn0+XG4gICAgICA8aXRlbS5pY29uQ29tcG9uZW50IGhlaWdodD1cIjIwcHhcIiAvPlxuICAgIDwvYT5cbiAgICB7aXRlbS50b29sdGlwID8gKDxUb29sdGlwXG4gICAgICBpZD17YCR7aXRlbS5pZH0tYWN0aW9uYH1cbiAgICAgIHBsYWNlPVwiYm90dG9tXCJcbiAgICAgIGRlbGF5U2hvdz17NTAwfVxuICAgICAgZWZmZWN0PVwic29saWRcIlxuICAgID5cbiAgICAgIDxzcGFuPntpdGVtLnRvb2x0aXB9PC9zcGFuPlxuICAgIDwvVG9vbHRpcD4pIDogbnVsbCB9XG4gIDwvU3R5bGVkUGFuZWxBY3Rpb24+XG4pO1xuXG5jb25zdCBQYW5lbEl0ZW0gPSAoe29uQ2xvc2UsIG9uQ2xpY2tIYW5kbGVyLCBsYWJlbCwgaWNvbn0pID0+IChcbiAgPGRpdiBjbGFzc05hbWU9XCJzYXZlLWV4cG9ydC1kcm9wZG93bl9faXRlbVwiIG9uQ2xpY2s9eyhlKSA9PiB7XG4gICAgZS5zdG9wUHJvcGFnYXRpb24oKTtcbiAgICBvbkNsb3NlKCk7XG4gICAgb25DbGlja0hhbmRsZXIoKTtcbiAgfX0+XG4gICAge2ljb259XG4gICAgPGRpdiBjbGFzc05hbWU9XCJzYXZlLWV4cG9ydC1kcm9wZG93bl9fdGl0bGVcIj57bGFiZWx9PC9kaXY+XG4gIDwvZGl2PlxuKTtcblxuZXhwb3J0IGNvbnN0IFNhdmVFeHBvcnREcm9wZG93biA9ICh7XG4gIG9uRXhwb3J0SW1hZ2UsXG4gIG9uRXhwb3J0RGF0YSxcbiAgb25FeHBvcnRDb25maWcsXG4gIG9uU2F2ZU1hcCxcbiAgc2hvdyxcbiAgb25DbG9zZVxufSkgPT4ge1xuICByZXR1cm4gKFxuICAgIDxTdHlsZWRQYW5lbERyb3Bkb3duIHNob3c9e3Nob3d9IGNsYXNzTmFtZT1cInNhdmUtZXhwb3J0LWRyb3Bkb3duXCI+XG4gICAgICA8Q2xpY2tPdXRzaWRlQ2xvc2VEcm9wZG93biBjbGFzc05hbWU9XCJzYXZlLWV4cG9ydC1kcm9wZG93bl9faW5uZXJcIlxuICAgICAgICBzaG93PXtzaG93fVxuICAgICAgICBvbkNsb3NlPXtvbkNsb3NlfT5cbiAgICAgICAgPFBhbmVsSXRlbVxuICAgICAgICAgIGxhYmVsPVwiRXhwb3J0IEltYWdlXCJcbiAgICAgICAgICBvbkNsaWNrSGFuZGxlcj17b25FeHBvcnRJbWFnZX1cbiAgICAgICAgICBvbkNsb3NlPXtvbkNsb3NlfVxuICAgICAgICAgIGljb249eyg8UGljdHVyZSBoZWlnaHQ9XCIxNnB4XCIgLz4pfVxuICAgICAgICAvPlxuXG4gICAgICAgIDxQYW5lbEl0ZW1cbiAgICAgICAgICBsYWJlbD1cIkV4cG9ydCBEYXRhXCJcbiAgICAgICAgICBvbkNsaWNrSGFuZGxlcj17b25FeHBvcnREYXRhfVxuICAgICAgICAgIG9uQ2xvc2U9e29uQ2xvc2V9XG4gICAgICAgICAgaWNvbj17KDxGaWxlcyBoZWlnaHQ9XCIxNnB4XCIgLz4pfVxuICAgICAgICAvPlxuXG4gICAgICAgIDxQYW5lbEl0ZW1cbiAgICAgICAgICBsYWJlbD1cIkV4cG9ydCBDb25maWdcIlxuICAgICAgICAgIG9uQ2xpY2tIYW5kbGVyPXtvbkV4cG9ydENvbmZpZ31cbiAgICAgICAgICBvbkNsb3NlPXtvbkNsb3NlfVxuICAgICAgICAgIGljb249eyg8Q29kZUFsdCBoZWlnaHQ9XCIxNnB4XCIgLz4pfVxuICAgICAgICAvPlxuXG4gICAgICAgIHtvblNhdmVNYXAgPyAoXG4gICAgICAgICAgPFBhbmVsSXRlbVxuICAgICAgICAgICAgbGFiZWw9XCJTYXZlIE1hcCBVcmxcIlxuICAgICAgICAgICAgb25DbGlja0hhbmRsZXI9e29uU2F2ZU1hcH1cbiAgICAgICAgICAgIG9uQ2xvc2U9e29uQ2xvc2V9XG4gICAgICAgICAgICBpY29uPXsoPFNoYXJlIGhlaWdodD1cIjE2cHhcIiAvPil9XG4gICAgICAgICAgLz5cbiAgICAgICAgKSA6IG51bGx9XG4gICAgICA8L0NsaWNrT3V0c2lkZUNsb3NlRHJvcGRvd24+XG4gICAgPC9TdHlsZWRQYW5lbERyb3Bkb3duPlxuICApO1xufTtcblxuY29uc3QgZGVmYXVsdEFjdGlvbkl0ZW1zID0gW1xuICB7XG4gICAgaWQ6ICdzYXZlJyxcbiAgICBpY29uQ29tcG9uZW50OiBTYXZlLFxuICAgIG9uQ2xpY2s6ICgpID0+IHt9LFxuICAgIGxhYmVsOiAnU2hhcmUnLFxuICAgIGRyb3Bkb3duQ29tcG9uZW50OiBTYXZlRXhwb3J0RHJvcGRvd25cbiAgfVxuXTtcblxuZnVuY3Rpb24gUGFuZWxIZWFkZXJGYWN0b3J5KCkge1xuICByZXR1cm4gY2xhc3MgUGFuZWxIZWFkZXIgZXh0ZW5kcyBDb21wb25lbnQge1xuICAgIHN0YXRpYyBwcm9wVHlwZXMgPSB7XG4gICAgICBhcHBOYW1lOiBQcm9wVHlwZXMuc3RyaW5nLFxuICAgICAgdmVyc2lvbjogUHJvcFR5cGVzLnN0cmluZyxcbiAgICAgIHVpU3RhdGU6IFByb3BUeXBlcy5vYmplY3QsXG4gICAgICB1aVN0YXRlQWN0aW9uczogUHJvcFR5cGVzLm9iamVjdCxcbiAgICAgIGxvZ29Db21wb25lbnQ6IFByb3BUeXBlcy5vbmVPZlR5cGUoW1Byb3BUeXBlcy5lbGVtZW50LCBQcm9wVHlwZXMuZnVuY10pLFxuICAgICAgYWN0aW9uSXRlbXM6IFByb3BUeXBlcy5hcnJheU9mKFByb3BUeXBlcy5hbnkpXG4gICAgfTtcblxuICAgIHN0YXRpYyBkZWZhdWx0UHJvcHMgPSB7XG4gICAgICBsb2dvQ29tcG9uZW50OiBLZXBsZXJHbExvZ28sXG4gICAgICBhY3Rpb25JdGVtczogZGVmYXVsdEFjdGlvbkl0ZW1zXG4gICAgfTtcblxuICAgIHJlbmRlcigpIHtcbiAgICAgIGNvbnN0IHtcbiAgICAgICAgYXBwTmFtZSxcbiAgICAgICAgdmVyc2lvbixcbiAgICAgICAgYWN0aW9uSXRlbXMsXG4gICAgICAgIG9uU2F2ZU1hcCxcbiAgICAgICAgb25FeHBvcnRJbWFnZSxcbiAgICAgICAgb25FeHBvcnREYXRhLFxuICAgICAgICBvbkV4cG9ydENvbmZpZyxcbiAgICAgICAgdmlzaWJsZURyb3Bkb3duLFxuICAgICAgICBzaG93RXhwb3J0RHJvcGRvd24sXG4gICAgICAgIGhpZGVFeHBvcnREcm9wZG93blxuICAgICAgfSA9IHRoaXMucHJvcHM7XG5cbiAgICAgIHJldHVybiAoXG4gICAgICAgIDxTdHlsZWRQYW5lbEhlYWRlciBjbGFzc05hbWU9XCJzaWRlLXBhbmVsX19wYW5lbC1oZWFkZXJcIj5cbiAgICAgICAgICA8U3R5bGVkUGFuZWxIZWFkZXJUb3AgY2xhc3NOYW1lPVwic2lkZS1wYW5lbF9fcGFuZWwtaGVhZGVyX190b3BcIj5cbiAgICAgICAgICAgIDx0aGlzLnByb3BzLmxvZ29Db21wb25lbnQgYXBwTmFtZT17YXBwTmFtZX0gdmVyc2lvbj17dmVyc2lvbn0vPlxuICAgICAgICAgICAgPFN0eWxlZFBhbmVsVG9wQWN0aW9ucz5cbiAgICAgICAgICAgICAge2FjdGlvbkl0ZW1zLm1hcChpdGVtID0+IChcbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInNpZGUtcGFuZWxfX3BhbmVsLWhlYWRlcl9fcmlnaHRcIlxuICAgICAgICAgICAgICAgICAgICAga2V5PXtpdGVtLmlkfSBzdHlsZT17e3Bvc2l0aW9uOiAncmVsYXRpdmUnfX0+XG4gICAgICAgICAgICAgICAgICA8UGFuZWxBY3Rpb25cbiAgICAgICAgICAgICAgICAgICAgaXRlbT17aXRlbX1cbiAgICAgICAgICAgICAgICAgICAgb25DbGljaz17KCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgIGlmIChpdGVtLmRyb3Bkb3duQ29tcG9uZW50KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBzaG93RXhwb3J0RHJvcGRvd24oaXRlbS5pZCk7XG4gICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgIGl0ZW0ub25DbGljaygpO1xuICAgICAgICAgICAgICAgICAgICB9fVxuICAgICAgICAgICAgICAgICAgLz5cbiAgICAgICAgICAgICAgICAgIHtpdGVtLmRyb3Bkb3duQ29tcG9uZW50ID8gKFxuICAgICAgICAgICAgICAgICAgICA8aXRlbS5kcm9wZG93bkNvbXBvbmVudFxuICAgICAgICAgICAgICAgICAgICAgIG9uQ2xvc2U9e2hpZGVFeHBvcnREcm9wZG93bn1cbiAgICAgICAgICAgICAgICAgICAgICBzaG93PXt2aXNpYmxlRHJvcGRvd24gPT09IGl0ZW0uaWR9XG4gICAgICAgICAgICAgICAgICAgICAgb25TYXZlTWFwPXtvblNhdmVNYXB9XG4gICAgICAgICAgICAgICAgICAgICAgb25FeHBvcnREYXRhPXtvbkV4cG9ydERhdGF9XG4gICAgICAgICAgICAgICAgICAgICAgb25FeHBvcnRJbWFnZT17b25FeHBvcnRJbWFnZX1cbiAgICAgICAgICAgICAgICAgICAgICBvbkV4cG9ydENvbmZpZz17b25FeHBvcnRDb25maWd9XG4gICAgICAgICAgICAgICAgICAgIC8+XG4gICAgICAgICAgICAgICAgICApIDogbnVsbH1cbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgKSl9XG4gICAgICAgICAgICA8L1N0eWxlZFBhbmVsVG9wQWN0aW9ucz5cbiAgICAgICAgICA8L1N0eWxlZFBhbmVsSGVhZGVyVG9wPlxuICAgICAgICA8L1N0eWxlZFBhbmVsSGVhZGVyPlxuICAgICAgKTtcbiAgICB9XG4gIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgUGFuZWxIZWFkZXJGYWN0b3J5O1xuIl19