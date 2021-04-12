'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _objectWithoutProperties2 = require('babel-runtime/helpers/objectWithoutProperties');

var _objectWithoutProperties3 = _interopRequireDefault(_objectWithoutProperties2);

var _defineProperty2 = require('babel-runtime/helpers/defineProperty');

var _defineProperty3 = _interopRequireDefault(_defineProperty2);

var _extends4 = require('babel-runtime/helpers/extends');

var _extends5 = _interopRequireDefault(_extends4);

var _toConsumableArray2 = require('babel-runtime/helpers/toConsumableArray');

var _toConsumableArray3 = _interopRequireDefault(_toConsumableArray2);

exports.mergeFilters = mergeFilters;
exports.mergeLayers = mergeLayers;
exports.mergeInteractions = mergeInteractions;
exports.mergeInteractionTooltipConfig = mergeInteractionTooltipConfig;
exports.mergeLayerBlending = mergeLayerBlending;
exports.validateSavedLayerColumns = validateSavedLayerColumns;
exports.validateSavedTextLabel = validateSavedTextLabel;
exports.validateSavedVisualChannels = validateSavedVisualChannels;
exports.validateLayerWithData = validateLayerWithData;
exports.validateFilterWithData = validateFilterWithData;

var _lodash = require('lodash.uniq');

var _lodash2 = _interopRequireDefault(_lodash);

var _lodash3 = require('lodash.pick');

var _lodash4 = _interopRequireDefault(_lodash3);

var _filterUtils = require('../utils/filter-utils');

var _defaultSettings = require('../constants/default-settings');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Merge loaded filters with current state, if no fields or data are loaded
 * save it for later
 *
 * @param {Object} state
 * @param {Object[]} filtersToMerge
 * @return {Object} updatedState
 */
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

function mergeFilters(state, filtersToMerge) {
  var merged = [];
  var unmerged = [];
  var datasets = state.datasets;


  if (!Array.isArray(filtersToMerge) || !filtersToMerge.length) {
    return state;
  }

  // merge filters
  filtersToMerge.forEach(function (filter) {
    // match filter.dataId with current datesets id
    // uploaded data need to have the same dataId with the filter
    if (datasets[filter.dataId]) {
      // datasets is already loaded
      var validateFilter = validateFilterWithData(datasets[filter.dataId], filter);

      if (validateFilter) {
        merged.push(validateFilter);
      }
    } else {
      // datasets not yet loaded
      unmerged.push(filter);
    }
  });

  // filter data
  var updatedFilters = [].concat((0, _toConsumableArray3.default)(state.filters || []), merged);
  var datasetToFilter = (0, _lodash2.default)(merged.map(function (d) {
    return d.dataId;
  }));

  var updatedDataset = datasetToFilter.reduce(function (accu, dataId) {
    return (0, _extends5.default)({}, accu, (0, _defineProperty3.default)({}, dataId, (0, _extends5.default)({}, datasets[dataId], (0, _filterUtils.filterData)(datasets[dataId].allData, dataId, updatedFilters))));
  }, datasets);

  return (0, _extends5.default)({}, state, {
    filters: updatedFilters,
    datasets: updatedDataset,
    filterToBeMerged: unmerged
  });
}

/**
 * Merge layers from de-serialized state, if no fields or data are loaded
 * save it for later
 *
 * @param {object} state
 * @param {Object[]} layersToMerge
 * @return {Object} state
 */
function mergeLayers(state, layersToMerge) {
  var mergedLayer = [];
  var unmerged = [];

  var datasets = state.datasets;


  if (!Array.isArray(layersToMerge) || !layersToMerge.length) {
    return state;
  }

  layersToMerge.forEach(function (layer) {
    if (datasets[layer.config.dataId]) {
      // datasets are already loaded
      var validateLayer = validateLayerWithData(datasets[layer.config.dataId], layer, state.layerClasses);

      if (validateLayer) {
        mergedLayer.push(validateLayer);
      }
    } else {
      // datasets not yet loaded
      unmerged.push(layer);
    }
  });

  var layers = [].concat((0, _toConsumableArray3.default)(state.layers), mergedLayer);
  var newLayerOrder = mergedLayer.map(function (_, i) {
    return state.layers.length + i;
  });

  // put new layers in front of current layers
  var layerOrder = [].concat((0, _toConsumableArray3.default)(newLayerOrder), (0, _toConsumableArray3.default)(state.layerOrder));

  return (0, _extends5.default)({}, state, {
    layers: layers,
    layerOrder: layerOrder,
    layerToBeMerged: unmerged
  });
}

/**
 * Merge interactions with saved config
 *
 * @param {object} state
 * @param {Object} interactionToBeMerged
 * @return {Object} mergedState
 */
function mergeInteractions(state, interactionToBeMerged) {
  var merged = {};
  var unmerged = {};

  if (interactionToBeMerged) {
    Object.keys(interactionToBeMerged).forEach(function (key) {
      if (!state.interactionConfig[key]) {
        return;
      }

      var _ref = interactionToBeMerged[key] || {},
          enabled = _ref.enabled,
          configSaved = (0, _objectWithoutProperties3.default)(_ref, ['enabled']);

      var configToMerge = configSaved;

      if (key === 'tooltip') {
        var _mergeInteractionTool = mergeInteractionTooltipConfig(state, configSaved),
            mergedTooltip = _mergeInteractionTool.mergedTooltip,
            unmergedTooltip = _mergeInteractionTool.unmergedTooltip;

        // merge new dataset tooltips with original dataset tooltips


        configToMerge = {
          fieldsToShow: (0, _extends5.default)({}, state.interactionConfig[key].config.fieldsToShow, mergedTooltip)
        };

        if (Object.keys(unmergedTooltip).length) {
          unmerged.tooltip = { fieldsToShow: unmergedTooltip, enabled: enabled };
        }
      }

      merged[key] = (0, _extends5.default)({}, state.interactionConfig[key], {
        enabled: enabled,
        config: (0, _lodash4.default)((0, _extends5.default)({}, state.interactionConfig[key].config, configToMerge), Object.keys(state.interactionConfig[key].config))
      });
    });
  }

  return (0, _extends5.default)({}, state, {
    interactionConfig: (0, _extends5.default)({}, state.interactionConfig, merged),
    interactionToBeMerged: unmerged
  });
}

/**
 * Merge interactionConfig.tooltip with saved config,
 * validate fieldsToShow
 *
 * @param {string} state
 * @param {Object} tooltipConfig
 * @return {Object} - {mergedTooltip: {}, unmergedTooltip: {}}
 */
function mergeInteractionTooltipConfig(state) {
  var tooltipConfig = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

  var unmergedTooltip = {};
  var mergedTooltip = {};

  if (!tooltipConfig.fieldsToShow || !Object.keys(tooltipConfig.fieldsToShow).length) {
    return { mergedTooltip: mergedTooltip, unmergedTooltip: unmergedTooltip };
  }

  for (var dataId in tooltipConfig.fieldsToShow) {
    if (!state.datasets[dataId]) {
      // is not yet loaded
      unmergedTooltip[dataId] = tooltipConfig.fieldsToShow[dataId];
    } else {
      (function () {
        // if dataset is loaded
        var allFields = state.datasets[dataId].fields.map(function (d) {
          return d.name;
        });
        var foundFieldsToShow = tooltipConfig.fieldsToShow[dataId].filter(function (name) {
          return allFields.includes(name);
        });

        mergedTooltip[dataId] = foundFieldsToShow;
      })();
    }
  }

  return { mergedTooltip: mergedTooltip, unmergedTooltip: unmergedTooltip };
}
/**
 * Merge layerBlending with saved
 *
 * @param {object} state
 * @param {string} layerBlending
 * @return {object} merged state
 */
function mergeLayerBlending(state, layerBlending) {
  if (layerBlending && _defaultSettings.LAYER_BLENDINGS[layerBlending]) {
    return (0, _extends5.default)({}, state, {
      layerBlending: layerBlending
    });
  }

  return state;
}

/**
 * Validate saved layer columns with new data,
 * update fieldIdx based on new fields
 *
 * @param {Object[]} fields
 * @param {Object} savedCols
 * @param {Object} emptyCols
 * @return {null | Object} - validated columns or null
 */

function validateSavedLayerColumns(fields, savedCols, emptyCols) {
  var colFound = {};
  // find actual column fieldIdx, in case it has changed
  var allColFound = Object.keys(emptyCols).every(function (key) {
    var saved = savedCols[key];
    colFound[key] = (0, _extends5.default)({}, emptyCols[key]);

    var fieldIdx = fields.findIndex(function (_ref2) {
      var name = _ref2.name;
      return name === saved;
    });

    if (fieldIdx > -1) {
      // update found columns
      colFound[key].fieldIdx = fieldIdx;
      colFound[key].value = saved;
      return true;
    }

    // if col is optional, allow null value
    return emptyCols[key].optional || false;
  });

  return allColFound && colFound;
}

/**
 * Validate saved text label config with new data
 * refer to vis-state-schema.js TextLabelSchemaV1
 *
 * @param {Object[]} fields
 * @param {Object} savedTextLabel
 * @return {Object} - validated textlabel
 */
function validateSavedTextLabel(fields, layerTextLabel, savedTextLabel) {

  // validate field
  var field = savedTextLabel.field ? fields.find(function (fd) {
    return Object.keys(savedTextLabel.field).every(function (key) {
      return savedTextLabel.field[key] === fd[key];
    });
  }) : null;

  return Object.keys(layerTextLabel).reduce(function (accu, key) {
    return (0, _extends5.default)({}, accu, (0, _defineProperty3.default)({}, key, key === 'field' ? field : savedTextLabel[key] || layerTextLabel[key]));
  }, {});
}

/**
 * Validate saved visual channels config with new data,
 * refer to vis-state-schema.js VisualChannelSchemaV1
 *
 * @param {Object[]} fields
 * @param {Object} visualChannels
 * @param {Object} savedLayer
 * @return {Object} - validated visual channel in config or {}
 */
function validateSavedVisualChannels(fields, visualChannels, savedLayer) {
  return Object.values(visualChannels).reduce(function (found, _ref3) {
    var field = _ref3.field,
        scale = _ref3.scale;

    var foundField = void 0;
    if (savedLayer.config[field]) {
      foundField = fields.find(function (fd) {
        return Object.keys(savedLayer.config[field]).every(function (key) {
          return savedLayer.config[field][key] === fd[key];
        });
      });
    }

    return (0, _extends5.default)({}, found, foundField ? (0, _defineProperty3.default)({}, field, foundField) : {}, savedLayer.config[scale] ? (0, _defineProperty3.default)({}, scale, savedLayer.config[scale]) : {});
  }, {});
}

/**
 * Validate saved layer config with new data,
 * update fieldIdx based on new fields
 *
 * @param {Object[]} fields
 * @param {String} dataId
 * @param {Object} savedLayer
 * @param {Object} layerClasses
 * @return {null | Object} - validated layer or null
 */
function validateLayerWithData(_ref6, savedLayer, layerClasses) {
  var fields = _ref6.fields,
      dataId = _ref6.id;
  var type = savedLayer.type;
  // layer doesnt have a valid type

  if (!layerClasses.hasOwnProperty(type) || !savedLayer.config || !savedLayer.config.columns) {
    return null;
  }

  var newLayer = new layerClasses[type]({
    id: savedLayer.id,
    dataId: dataId,
    label: savedLayer.config.label,
    color: savedLayer.config.color,
    isVisible: savedLayer.config.isVisible
  });

  // find column fieldIdx
  var columns = validateSavedLayerColumns(fields, savedLayer.config.columns, newLayer.getLayerColumns());

  if (!columns) {
    return null;
  }

  // visual channel field is saved to be {name, type}
  // find visual channel field by matching both name and type
  // refer to vis-state-schema.js VisualChannelSchemaV1
  var foundVisualChannelConfigs = validateSavedVisualChannels(fields, newLayer.visualChannels, savedLayer);

  var textLabel = savedLayer.config.textLabel && newLayer.config.textLabel ? validateSavedTextLabel(fields, newLayer.config.textLabel, savedLayer.config.textLabel) : newLayer.config.textLabel;

  // copy visConfig over to emptyLayer to make sure it has all the props
  var visConfig = newLayer.copyLayerConfig(newLayer.config.visConfig, savedLayer.config.visConfig || {}, { notToDeepMerge: 'colorRange' });

  newLayer.updateLayerConfig((0, _extends5.default)({
    columns: columns,
    visConfig: visConfig,
    textLabel: textLabel
  }, foundVisualChannelConfigs));

  return newLayer;
}

/**
 * Validate saved filter config with new data,
 * calculate domain and fieldIdx based new fields and data
 *
 * @param {Object[]} dataset.fields
 * @param {Object[]} dataset.allData
 * @param {Object} filter - filter to be validate
 * @return {Object | null} - validated filter
 */
function validateFilterWithData(_ref7, filter) {
  var fields = _ref7.fields,
      allData = _ref7.allData;

  // match filter.name to field.name
  var fieldIdx = fields.findIndex(function (_ref8) {
    var name = _ref8.name;
    return name === filter.name;
  });

  if (fieldIdx < 0) {
    // if can't find field with same name, discharge filter
    return null;
  }

  var field = fields[fieldIdx];
  var value = filter.value;

  // return filter type, default value, fieldType and fieldDomain from field
  var filterPropsFromField = (0, _filterUtils.getFilterProps)(allData, field);

  var matchedFilter = (0, _extends5.default)({}, (0, _filterUtils.getDefaultFilter)(filter.dataId), filter, filterPropsFromField, {
    freeze: true,
    fieldIdx: fieldIdx
  });

  var _matchedFilter = matchedFilter,
      yAxis = _matchedFilter.yAxis;

  if (yAxis) {
    var matcheAxis = fields.find(function (_ref9) {
      var name = _ref9.name,
          type = _ref9.type;
      return name === yAxis.name && type === yAxis.type;
    });

    matchedFilter = matcheAxis ? (0, _extends5.default)({}, matchedFilter, {
      yAxis: matcheAxis
    }, (0, _filterUtils.getFilterPlot)((0, _extends5.default)({}, matchedFilter, { yAxis: matcheAxis }), allData)) : matchedFilter;
  }

  matchedFilter.value = (0, _filterUtils.adjustValueToFilterDomain)(value, matchedFilter);

  if (matchedFilter.value === null) {
    // cannt adjust saved value to filter
    return null;
  }

  return matchedFilter;
}
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9yZWR1Y2Vycy92aXMtc3RhdGUtbWVyZ2VyLmpzIl0sIm5hbWVzIjpbIm1lcmdlRmlsdGVycyIsIm1lcmdlTGF5ZXJzIiwibWVyZ2VJbnRlcmFjdGlvbnMiLCJtZXJnZUludGVyYWN0aW9uVG9vbHRpcENvbmZpZyIsIm1lcmdlTGF5ZXJCbGVuZGluZyIsInZhbGlkYXRlU2F2ZWRMYXllckNvbHVtbnMiLCJ2YWxpZGF0ZVNhdmVkVGV4dExhYmVsIiwidmFsaWRhdGVTYXZlZFZpc3VhbENoYW5uZWxzIiwidmFsaWRhdGVMYXllcldpdGhEYXRhIiwidmFsaWRhdGVGaWx0ZXJXaXRoRGF0YSIsInN0YXRlIiwiZmlsdGVyc1RvTWVyZ2UiLCJtZXJnZWQiLCJ1bm1lcmdlZCIsImRhdGFzZXRzIiwiQXJyYXkiLCJpc0FycmF5IiwibGVuZ3RoIiwiZm9yRWFjaCIsImZpbHRlciIsImRhdGFJZCIsInZhbGlkYXRlRmlsdGVyIiwicHVzaCIsInVwZGF0ZWRGaWx0ZXJzIiwiZmlsdGVycyIsImRhdGFzZXRUb0ZpbHRlciIsIm1hcCIsImQiLCJ1cGRhdGVkRGF0YXNldCIsInJlZHVjZSIsImFjY3UiLCJhbGxEYXRhIiwiZmlsdGVyVG9CZU1lcmdlZCIsImxheWVyc1RvTWVyZ2UiLCJtZXJnZWRMYXllciIsImxheWVyIiwiY29uZmlnIiwidmFsaWRhdGVMYXllciIsImxheWVyQ2xhc3NlcyIsImxheWVycyIsIm5ld0xheWVyT3JkZXIiLCJfIiwiaSIsImxheWVyT3JkZXIiLCJsYXllclRvQmVNZXJnZWQiLCJpbnRlcmFjdGlvblRvQmVNZXJnZWQiLCJPYmplY3QiLCJrZXlzIiwiaW50ZXJhY3Rpb25Db25maWciLCJrZXkiLCJlbmFibGVkIiwiY29uZmlnU2F2ZWQiLCJjb25maWdUb01lcmdlIiwibWVyZ2VkVG9vbHRpcCIsInVubWVyZ2VkVG9vbHRpcCIsImZpZWxkc1RvU2hvdyIsInRvb2x0aXAiLCJ0b29sdGlwQ29uZmlnIiwiYWxsRmllbGRzIiwiZmllbGRzIiwibmFtZSIsImZvdW5kRmllbGRzVG9TaG93IiwiaW5jbHVkZXMiLCJsYXllckJsZW5kaW5nIiwiTEFZRVJfQkxFTkRJTkdTIiwic2F2ZWRDb2xzIiwiZW1wdHlDb2xzIiwiY29sRm91bmQiLCJhbGxDb2xGb3VuZCIsImV2ZXJ5Iiwic2F2ZWQiLCJmaWVsZElkeCIsImZpbmRJbmRleCIsInZhbHVlIiwib3B0aW9uYWwiLCJsYXllclRleHRMYWJlbCIsInNhdmVkVGV4dExhYmVsIiwiZmllbGQiLCJmaW5kIiwiZmQiLCJ2aXN1YWxDaGFubmVscyIsInNhdmVkTGF5ZXIiLCJ2YWx1ZXMiLCJmb3VuZCIsInNjYWxlIiwiZm91bmRGaWVsZCIsImlkIiwidHlwZSIsImhhc093blByb3BlcnR5IiwiY29sdW1ucyIsIm5ld0xheWVyIiwibGFiZWwiLCJjb2xvciIsImlzVmlzaWJsZSIsImdldExheWVyQ29sdW1ucyIsImZvdW5kVmlzdWFsQ2hhbm5lbENvbmZpZ3MiLCJ0ZXh0TGFiZWwiLCJ2aXNDb25maWciLCJjb3B5TGF5ZXJDb25maWciLCJub3RUb0RlZXBNZXJnZSIsInVwZGF0ZUxheWVyQ29uZmlnIiwiZmlsdGVyUHJvcHNGcm9tRmllbGQiLCJtYXRjaGVkRmlsdGVyIiwiZnJlZXplIiwieUF4aXMiLCJtYXRjaGVBeGlzIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O1FBeUNnQkEsWSxHQUFBQSxZO1FBNERBQyxXLEdBQUFBLFc7UUFpREFDLGlCLEdBQUFBLGlCO1FBZ0VBQyw2QixHQUFBQSw2QjtRQW1DQUMsa0IsR0FBQUEsa0I7UUFxQkFDLHlCLEdBQUFBLHlCO1FBK0JBQyxzQixHQUFBQSxzQjtRQXdCQUMsMkIsR0FBQUEsMkI7UUFpQ0FDLHFCLEdBQUFBLHFCO1FBdUVBQyxzQixHQUFBQSxzQjs7QUF6WmhCOzs7O0FBQ0E7Ozs7QUFFQTs7QUFRQTs7OztBQUVBOzs7Ozs7OztBQWpDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNB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Q0Q7O0FBRUQsTUFBTU0sUUFBUWxCLE9BQU9ZLFFBQVAsQ0FBZDtBQUNBLE1BQU1FLFFBQVF0RCxPQUFPc0QsS0FBckI7O0FBRUE7QUFDQSxNQUFNNEIsdUJBQXVCLGlDQUFldEUsT0FBZixFQUF3QjhDLEtBQXhCLENBQTdCOztBQUVBLE1BQUl5QiwyQ0FDQyxtQ0FBaUJuRixPQUFPQyxNQUF4QixDQURELEVBRUNELE1BRkQsRUFHQ2tGLG9CQUhEO0FBSUZFLFlBQVEsSUFKTjtBQUtGaEM7QUFMRSxJQUFKOztBQWZnRSx1QkF1QmhEK0IsYUF2QmdEO0FBQUEsTUF1QnpERSxLQXZCeUQsa0JBdUJ6REEsS0F2QnlEOztBQXdCaEUsTUFBSUEsS0FBSixFQUFXO0FBQ1QsUUFBTUMsYUFBYTlDLE9BQU9tQixJQUFQLENBQ2pCO0FBQUEsVUFBRWxCLElBQUYsU0FBRUEsSUFBRjtBQUFBLFVBQVEyQixJQUFSLFNBQVFBLElBQVI7QUFBQSxhQUFrQjNCLFNBQVM0QyxNQUFNNUMsSUFBZixJQUF1QjJCLFNBQVNpQixNQUFNakIsSUFBeEQ7QUFBQSxLQURpQixDQUFuQjs7QUFJQWUsb0JBQWdCRyx3Q0FFUEgsYUFGTztBQUdWRSxhQUFPQztBQUhHLE9BSVAsMkRBQWtCSCxhQUFsQixJQUFpQ0UsT0FBT0MsVUFBeEMsS0FBcUQxRSxPQUFyRCxDQUpPLElBTVp1RSxhQU5KO0FBT0Q7O0FBRURBLGdCQUFjN0IsS0FBZCxHQUFzQiw0Q0FBMEJBLEtBQTFCLEVBQWlDNkIsYUFBakMsQ0FBdEI7O0FBRUEsTUFBSUEsY0FBYzdCLEtBQWQsS0FBd0IsSUFBNUIsRUFBa0M7QUFDaEM7QUFDQSxXQUFPLElBQVA7QUFDRDs7QUFFRCxTQUFPNkIsYUFBUDtBQUNEIiwiZmlsZSI6InZpcy1zdGF0ZS1tZXJnZXIuanMiLCJzb3VyY2VzQ29udGVudCI6WyIvLyBDb3B5cmlnaHQgKGMpIDIwMTggVWJlciBUZWNobm9sb2dpZXMsIEluYy5cbi8vXG4vLyBQZXJtaXNzaW9uIGlzIGhlcmVieSBncmFudGVkLCBmcmVlIG9mIGNoYXJnZSwgdG8gYW55IHBlcnNvbiBvYnRhaW5pbmcgYSBjb3B5XG4vLyBvZiB0aGlzIHNvZnR3YXJlIGFuZCBhc3NvY2lhdGVkIGRvY3VtZW50YXRpb24gZmlsZXMgKHRoZSBcIlNvZnR3YXJlXCIpLCB0byBkZWFsXG4vLyBpbiB0aGUgU29mdHdhcmUgd2l0aG91dCByZXN0cmljdGlvbiwgaW5jbHVkaW5nIHdpdGhvdXQgbGltaXRhdGlvbiB0aGUgcmlnaHRzXG4vLyB0byB1c2UsIGNvcHksIG1vZGlmeSwgbWVyZ2UsIHB1Ymxpc2gsIGRpc3RyaWJ1dGUsIHN1YmxpY2Vuc2UsIGFuZC9vciBzZWxsXG4vLyBjb3BpZXMgb2YgdGhlIFNvZnR3YXJlLCBhbmQgdG8gcGVybWl0IHBlcnNvbnMgdG8gd2hvbSB0aGUgU29mdHdhcmUgaXNcbi8vIGZ1cm5pc2hlZCB0byBkbyBzbywgc3ViamVjdCB0byB0aGUgZm9sbG93aW5nIGNvbmRpdGlvbnM6XG4vL1xuLy8gVGhlIGFib3ZlIGNvcHlyaWdodCBub3RpY2UgYW5kIHRoaXMgcGVybWlzc2lvbiBub3RpY2Ugc2hhbGwgYmUgaW5jbHVkZWQgaW5cbi8vIGFsbCBjb3BpZXMgb3Igc3Vic3RhbnRpYWwgcG9ydGlvbnMgb2YgdGhlIFNvZnR3YXJlLlxuLy9cbi8vIFRIRSBTT0ZUV0FSRSBJUyBQUk9WSURFRCBcIkFTIElTXCIsIFdJVEhPVVQgV0FSUkFOVFkgT0YgQU5ZIEtJTkQsIEVYUFJFU1MgT1Jcbi8vIElNUExJRUQsIElOQ0xVRElORyBCVVQgTk9UIExJTUlURUQgVE8gVEhFIFdBUlJBTlRJRVMgT0YgTUVSQ0hBTlRBQklMSVRZLFxuLy8gRklUTkVTUyBGT1IgQSBQQVJUSUNVTEFSIFBVUlBPU0UgQU5EIE5PTklORlJJTkdFTUVOVC4gSU4gTk8gRVZFTlQgU0hBTEwgVEhFXG4vLyBBVVRIT1JTIE9SIENPUFlSSUdIVCBIT0xERVJTIEJFIExJQUJMRSBGT1IgQU5ZIENMQUlNLCBEQU1BR0VTIE9SIE9USEVSXG4vLyBMSUFCSUxJVFksIFdIRVRIRVIgSU4gQU4gQUNUSU9OIE9GIENPTlRSQUNULCBUT1JUIE9SIE9USEVSV0lTRSwgQVJJU0lORyBGUk9NLFxuLy8gT1VUIE9GIE9SIElOIENPTk5FQ1RJT04gV0lUSCBUSEUgU09GVFdBUkUgT1IgVEhFIFVTRSBPUiBPVEhFUiBERUFMSU5HUyBJTlxuLy8gVEhFIFNPRlRXQVJFLlxuXG5pbXBvcnQgdW5pcSBmcm9tICdsb2Rhc2gudW5pcSc7XG5pbXBvcnQgcGljayBmcm9tICdsb2Rhc2gucGljayc7XG5cbmltcG9ydCB7XG4gIGdldERlZmF1bHRGaWx0ZXIsXG4gIGdldEZpbHRlclByb3BzLFxuICBnZXRGaWx0ZXJQbG90LFxuICBmaWx0ZXJEYXRhLFxuICBhZGp1c3RWYWx1ZVRvRmlsdGVyRG9tYWluXG59IGZyb20gJ3V0aWxzL2ZpbHRlci11dGlscyc7XG5cbmltcG9ydCB7TEFZRVJfQkxFTkRJTkdTfSBmcm9tICdjb25zdGFudHMvZGVmYXVsdC1zZXR0aW5ncyc7XG5cbi8qKlxuICogTWVyZ2UgbG9hZGVkIGZpbHRlcnMgd2l0aCBjdXJyZW50IHN0YXRlLCBpZiBubyBmaWVsZHMgb3IgZGF0YSBhcmUgbG9hZGVkXG4gKiBzYXZlIGl0IGZvciBsYXRlclxuICpcbiAqIEBwYXJhbSB7T2JqZWN0fSBzdGF0ZVxuICogQHBhcmFtIHtPYmplY3RbXX0gZmlsdGVyc1RvTWVyZ2VcbiAqIEByZXR1cm4ge09iamVjdH0gdXBkYXRlZFN0YXRlXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBtZXJnZUZpbHRlcnMoc3RhdGUsIGZpbHRlcnNUb01lcmdlKSB7XG4gIGNvbnN0IG1lcmdlZCA9IFtdO1xuICBjb25zdCB1bm1lcmdlZCA9IFtdO1xuICBjb25zdCB7ZGF0YXNldHN9ID0gc3RhdGU7XG5cbiAgaWYgKCFBcnJheS5pc0FycmF5KGZpbHRlcnNUb01lcmdlKSB8fCAhZmlsdGVyc1RvTWVyZ2UubGVuZ3RoKSB7XG4gICAgcmV0dXJuIHN0YXRlO1xuICB9XG5cbiAgLy8gbWVyZ2UgZmlsdGVyc1xuICBmaWx0ZXJzVG9NZXJnZS5mb3JFYWNoKGZpbHRlciA9PiB7XG4gICAgLy8gbWF0Y2ggZmlsdGVyLmRhdGFJZCB3aXRoIGN1cnJlbnQgZGF0ZXNldHMgaWRcbiAgICAvLyB1cGxvYWRlZCBkYXRhIG5lZWQgdG8gaGF2ZSB0aGUgc2FtZSBkYXRhSWQgd2l0aCB0aGUgZmlsdGVyXG4gICAgaWYgKGRhdGFzZXRzW2ZpbHRlci5kYXRhSWRdKSB7XG4gICAgICAvLyBkYXRhc2V0cyBpcyBhbHJlYWR5IGxvYWRlZFxuICAgICAgY29uc3QgdmFsaWRhdGVGaWx0ZXIgPSB2YWxpZGF0ZUZpbHRlcldpdGhEYXRhKFxuICAgICAgICBkYXRhc2V0c1tmaWx0ZXIuZGF0YUlkXSxcbiAgICAgICAgZmlsdGVyXG4gICAgICApO1xuXG4gICAgICBpZiAodmFsaWRhdGVGaWx0ZXIpIHtcbiAgICAgICAgbWVyZ2VkLnB1c2godmFsaWRhdGVGaWx0ZXIpO1xuICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICAvLyBkYXRhc2V0cyBub3QgeWV0IGxvYWRlZFxuICAgICAgdW5tZXJnZWQucHVzaChmaWx0ZXIpO1xuICAgIH1cbiAgfSk7XG5cbiAgLy8gZmlsdGVyIGRhdGFcbiAgY29uc3QgdXBkYXRlZEZpbHRlcnMgPSBbLi4uKHN0YXRlLmZpbHRlcnMgfHwgW10pLCAuLi5tZXJnZWRdO1xuICBjb25zdCBkYXRhc2V0VG9GaWx0ZXIgPSB1bmlxKG1lcmdlZC5tYXAoZCA9PiBkLmRhdGFJZCkpO1xuXG4gIGNvbnN0IHVwZGF0ZWREYXRhc2V0ID0gZGF0YXNldFRvRmlsdGVyLnJlZHVjZShcbiAgICAoYWNjdSwgZGF0YUlkKSA9PiAoe1xuICAgICAgLi4uYWNjdSxcbiAgICAgIFtkYXRhSWRdOiB7XG4gICAgICAgIC4uLmRhdGFzZXRzW2RhdGFJZF0sXG4gICAgICAgIC4uLmZpbHRlckRhdGEoZGF0YXNldHNbZGF0YUlkXS5hbGxEYXRhLCBkYXRhSWQsIHVwZGF0ZWRGaWx0ZXJzKVxuICAgICAgfVxuICAgIH0pLFxuICAgIGRhdGFzZXRzXG4gICk7XG5cbiAgcmV0dXJuIHtcbiAgICAuLi5zdGF0ZSxcbiAgICBmaWx0ZXJzOiB1cGRhdGVkRmlsdGVycyxcbiAgICBkYXRhc2V0czogdXBkYXRlZERhdGFzZXQsXG4gICAgZmlsdGVyVG9CZU1lcmdlZDogdW5tZXJnZWRcbiAgfTtcbn1cblxuLyoqXG4gKiBNZXJnZSBsYXllcnMgZnJvbSBkZS1zZXJpYWxpemVkIHN0YXRlLCBpZiBubyBmaWVsZHMgb3IgZGF0YSBhcmUgbG9hZGVkXG4gKiBzYXZlIGl0IGZvciBsYXRlclxuICpcbiAqIEBwYXJhbSB7b2JqZWN0fSBzdGF0ZVxuICogQHBhcmFtIHtPYmplY3RbXX0gbGF5ZXJzVG9NZXJnZVxuICogQHJldHVybiB7T2JqZWN0fSBzdGF0ZVxuICovXG5leHBvcnQgZnVuY3Rpb24gbWVyZ2VMYXllcnMoc3RhdGUsIGxheWVyc1RvTWVyZ2UpIHtcbiAgY29uc3QgbWVyZ2VkTGF5ZXIgPSBbXTtcbiAgY29uc3QgdW5tZXJnZWQgPSBbXTtcblxuICBjb25zdCB7ZGF0YXNldHN9ID0gc3RhdGU7XG5cbiAgaWYgKCFBcnJheS5pc0FycmF5KGxheWVyc1RvTWVyZ2UpIHx8ICFsYXllcnNUb01lcmdlLmxlbmd0aCkge1xuICAgIHJldHVybiBzdGF0ZTtcbiAgfVxuXG4gIGxheWVyc1RvTWVyZ2UuZm9yRWFjaChsYXllciA9PiB7XG4gICAgaWYgKGRhdGFzZXRzW2xheWVyLmNvbmZpZy5kYXRhSWRdKSB7XG4gICAgICAvLyBkYXRhc2V0cyBhcmUgYWxyZWFkeSBsb2FkZWRcbiAgICAgIGNvbnN0IHZhbGlkYXRlTGF5ZXIgPSB2YWxpZGF0ZUxheWVyV2l0aERhdGEoXG4gICAgICAgIGRhdGFzZXRzW2xheWVyLmNvbmZpZy5kYXRhSWRdLFxuICAgICAgICBsYXllcixcbiAgICAgICAgc3RhdGUubGF5ZXJDbGFzc2VzXG4gICAgICApO1xuXG4gICAgICBpZiAodmFsaWRhdGVMYXllcikge1xuICAgICAgICBtZXJnZWRMYXllci5wdXNoKHZhbGlkYXRlTGF5ZXIpO1xuICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICAvLyBkYXRhc2V0cyBub3QgeWV0IGxvYWRlZFxuICAgICAgdW5tZXJnZWQucHVzaChsYXllcik7XG4gICAgfVxuICB9KTtcblxuICBjb25zdCBsYXllcnMgPSBbLi4uc3RhdGUubGF5ZXJzLCAuLi5tZXJnZWRMYXllcl07XG4gIGNvbnN0IG5ld0xheWVyT3JkZXIgPSBtZXJnZWRMYXllci5tYXAoKF8sIGkpID0+IHN0YXRlLmxheWVycy5sZW5ndGggKyBpKTtcblxuICAvLyBwdXQgbmV3IGxheWVycyBpbiBmcm9udCBvZiBjdXJyZW50IGxheWVyc1xuICBjb25zdCBsYXllck9yZGVyID0gWy4uLm5ld0xheWVyT3JkZXIsIC4uLnN0YXRlLmxheWVyT3JkZXJdO1xuXG4gIHJldHVybiB7XG4gICAgLi4uc3RhdGUsXG4gICAgbGF5ZXJzLFxuICAgIGxheWVyT3JkZXIsXG4gICAgbGF5ZXJUb0JlTWVyZ2VkOiB1bm1lcmdlZFxuICB9O1xufVxuXG4vKipcbiAqIE1lcmdlIGludGVyYWN0aW9ucyB3aXRoIHNhdmVkIGNvbmZpZ1xuICpcbiAqIEBwYXJhbSB7b2JqZWN0fSBzdGF0ZVxuICogQHBhcmFtIHtPYmplY3R9IGludGVyYWN0aW9uVG9CZU1lcmdlZFxuICogQHJldHVybiB7T2JqZWN0fSBtZXJnZWRTdGF0ZVxuICovXG5leHBvcnQgZnVuY3Rpb24gbWVyZ2VJbnRlcmFjdGlvbnMoc3RhdGUsIGludGVyYWN0aW9uVG9CZU1lcmdlZCkge1xuICBjb25zdCBtZXJnZWQgPSB7fTtcbiAgY29uc3QgdW5tZXJnZWQgPSB7fTtcblxuICBpZiAoaW50ZXJhY3Rpb25Ub0JlTWVyZ2VkKSB7XG4gICAgT2JqZWN0LmtleXMoaW50ZXJhY3Rpb25Ub0JlTWVyZ2VkKS5mb3JFYWNoKGtleSA9PiB7XG4gICAgICBpZiAoIXN0YXRlLmludGVyYWN0aW9uQ29uZmlnW2tleV0pIHtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuXG4gICAgICBjb25zdCB7ZW5hYmxlZCwgLi4uY29uZmlnU2F2ZWR9ID0gaW50ZXJhY3Rpb25Ub0JlTWVyZ2VkW2tleV0gfHwge307XG4gICAgICBsZXQgY29uZmlnVG9NZXJnZSA9IGNvbmZpZ1NhdmVkO1xuXG4gICAgICBpZiAoa2V5ID09PSAndG9vbHRpcCcpIHtcbiAgICAgICAgY29uc3Qge21lcmdlZFRvb2x0aXAsIHVubWVyZ2VkVG9vbHRpcH0gPSBtZXJnZUludGVyYWN0aW9uVG9vbHRpcENvbmZpZyhcbiAgICAgICAgICBzdGF0ZSxcbiAgICAgICAgICBjb25maWdTYXZlZFxuICAgICAgICApO1xuXG4gICAgICAgIC8vIG1lcmdlIG5ldyBkYXRhc2V0IHRvb2x0aXBzIHdpdGggb3JpZ2luYWwgZGF0YXNldCB0b29sdGlwc1xuICAgICAgICBjb25maWdUb01lcmdlID0ge1xuICAgICAgICAgIGZpZWxkc1RvU2hvdzoge1xuICAgICAgICAgICAgLi4uc3RhdGUuaW50ZXJhY3Rpb25Db25maWdba2V5XS5jb25maWcuZmllbGRzVG9TaG93LFxuICAgICAgICAgICAgLi4ubWVyZ2VkVG9vbHRpcFxuICAgICAgICAgIH1cbiAgICAgICAgfTtcblxuICAgICAgICBpZiAoT2JqZWN0LmtleXModW5tZXJnZWRUb29sdGlwKS5sZW5ndGgpIHtcbiAgICAgICAgICB1bm1lcmdlZC50b29sdGlwID0ge2ZpZWxkc1RvU2hvdzogdW5tZXJnZWRUb29sdGlwLCBlbmFibGVkfTtcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICBtZXJnZWRba2V5XSA9IHtcbiAgICAgICAgLi4uc3RhdGUuaW50ZXJhY3Rpb25Db25maWdba2V5XSxcbiAgICAgICAgZW5hYmxlZCxcbiAgICAgICAgY29uZmlnOiBwaWNrKFxuICAgICAgICAgIHtcbiAgICAgICAgICAgIC4uLnN0YXRlLmludGVyYWN0aW9uQ29uZmlnW2tleV0uY29uZmlnLFxuICAgICAgICAgICAgLi4uY29uZmlnVG9NZXJnZVxuICAgICAgICAgIH0sXG4gICAgICAgICAgT2JqZWN0LmtleXMoc3RhdGUuaW50ZXJhY3Rpb25Db25maWdba2V5XS5jb25maWcpXG4gICAgICAgIClcbiAgICAgIH07XG4gICAgfSk7XG4gIH1cblxuICByZXR1cm4ge1xuICAgIC4uLnN0YXRlLFxuICAgIGludGVyYWN0aW9uQ29uZmlnOiB7XG4gICAgICAuLi5zdGF0ZS5pbnRlcmFjdGlvbkNvbmZpZyxcbiAgICAgIC4uLm1lcmdlZFxuICAgIH0sXG4gICAgaW50ZXJhY3Rpb25Ub0JlTWVyZ2VkOiB1bm1lcmdlZFxuICB9O1xufVxuXG4vKipcbiAqIE1lcmdlIGludGVyYWN0aW9uQ29uZmlnLnRvb2x0aXAgd2l0aCBzYXZlZCBjb25maWcsXG4gKiB2YWxpZGF0ZSBmaWVsZHNUb1Nob3dcbiAqXG4gKiBAcGFyYW0ge3N0cmluZ30gc3RhdGVcbiAqIEBwYXJhbSB7T2JqZWN0fSB0b29sdGlwQ29uZmlnXG4gKiBAcmV0dXJuIHtPYmplY3R9IC0ge21lcmdlZFRvb2x0aXA6IHt9LCB1bm1lcmdlZFRvb2x0aXA6IHt9fVxuICovXG5leHBvcnQgZnVuY3Rpb24gbWVyZ2VJbnRlcmFjdGlvblRvb2x0aXBDb25maWcoc3RhdGUsIHRvb2x0aXBDb25maWcgPSB7fSkge1xuICBjb25zdCB1bm1lcmdlZFRvb2x0aXAgPSB7fTtcbiAgY29uc3QgbWVyZ2VkVG9vbHRpcCA9IHt9O1xuXG4gIGlmIChcbiAgICAhdG9vbHRpcENvbmZpZy5maWVsZHNUb1Nob3cgfHxcbiAgICAhT2JqZWN0LmtleXModG9vbHRpcENvbmZpZy5maWVsZHNUb1Nob3cpLmxlbmd0aFxuICApIHtcbiAgICByZXR1cm4ge21lcmdlZFRvb2x0aXAsIHVubWVyZ2VkVG9vbHRpcH07XG4gIH1cblxuICBmb3IgKGNvbnN0IGRhdGFJZCBpbiB0b29sdGlwQ29uZmlnLmZpZWxkc1RvU2hvdykge1xuICAgIGlmICghc3RhdGUuZGF0YXNldHNbZGF0YUlkXSkge1xuICAgICAgLy8gaXMgbm90IHlldCBsb2FkZWRcbiAgICAgIHVubWVyZ2VkVG9vbHRpcFtkYXRhSWRdID0gdG9vbHRpcENvbmZpZy5maWVsZHNUb1Nob3dbZGF0YUlkXTtcbiAgICB9IGVsc2Uge1xuICAgICAgLy8gaWYgZGF0YXNldCBpcyBsb2FkZWRcbiAgICAgIGNvbnN0IGFsbEZpZWxkcyA9IHN0YXRlLmRhdGFzZXRzW2RhdGFJZF0uZmllbGRzLm1hcChkID0+IGQubmFtZSk7XG4gICAgICBjb25zdCBmb3VuZEZpZWxkc1RvU2hvdyA9IHRvb2x0aXBDb25maWcuZmllbGRzVG9TaG93W2RhdGFJZF0uZmlsdGVyKFxuICAgICAgICBuYW1lID0+IGFsbEZpZWxkcy5pbmNsdWRlcyhuYW1lKVxuICAgICAgKTtcblxuICAgICAgbWVyZ2VkVG9vbHRpcFtkYXRhSWRdID0gZm91bmRGaWVsZHNUb1Nob3c7XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIHttZXJnZWRUb29sdGlwLCB1bm1lcmdlZFRvb2x0aXB9O1xufVxuLyoqXG4gKiBNZXJnZSBsYXllckJsZW5kaW5nIHdpdGggc2F2ZWRcbiAqXG4gKiBAcGFyYW0ge29iamVjdH0gc3RhdGVcbiAqIEBwYXJhbSB7c3RyaW5nfSBsYXllckJsZW5kaW5nXG4gKiBAcmV0dXJuIHtvYmplY3R9IG1lcmdlZCBzdGF0ZVxuICovXG5leHBvcnQgZnVuY3Rpb24gbWVyZ2VMYXllckJsZW5kaW5nKHN0YXRlLCBsYXllckJsZW5kaW5nKSB7XG4gIGlmIChsYXllckJsZW5kaW5nICYmIExBWUVSX0JMRU5ESU5HU1tsYXllckJsZW5kaW5nXSkge1xuICAgIHJldHVybiB7XG4gICAgICAuLi5zdGF0ZSxcbiAgICAgIGxheWVyQmxlbmRpbmdcbiAgICB9O1xuICB9XG5cbiAgcmV0dXJuIHN0YXRlO1xufVxuXG4vKipcbiAqIFZhbGlkYXRlIHNhdmVkIGxheWVyIGNvbHVtbnMgd2l0aCBuZXcgZGF0YSxcbiAqIHVwZGF0ZSBmaWVsZElkeCBiYXNlZCBvbiBuZXcgZmllbGRzXG4gKlxuICogQHBhcmFtIHtPYmplY3RbXX0gZmllbGRzXG4gKiBAcGFyYW0ge09iamVjdH0gc2F2ZWRDb2xzXG4gKiBAcGFyYW0ge09iamVjdH0gZW1wdHlDb2xzXG4gKiBAcmV0dXJuIHtudWxsIHwgT2JqZWN0fSAtIHZhbGlkYXRlZCBjb2x1bW5zIG9yIG51bGxcbiAqL1xuXG5leHBvcnQgZnVuY3Rpb24gdmFsaWRhdGVTYXZlZExheWVyQ29sdW1ucyhmaWVsZHMsIHNhdmVkQ29scywgZW1wdHlDb2xzKSB7XG4gIGNvbnN0IGNvbEZvdW5kID0ge307XG4gIC8vIGZpbmQgYWN0dWFsIGNvbHVtbiBmaWVsZElkeCwgaW4gY2FzZSBpdCBoYXMgY2hhbmdlZFxuICBjb25zdCBhbGxDb2xGb3VuZCA9IE9iamVjdC5rZXlzKGVtcHR5Q29scykuZXZlcnkoa2V5ID0+IHtcbiAgICBjb25zdCBzYXZlZCA9IHNhdmVkQ29sc1trZXldO1xuICAgIGNvbEZvdW5kW2tleV0gPSB7Li4uZW1wdHlDb2xzW2tleV19O1xuXG4gICAgY29uc3QgZmllbGRJZHggPSBmaWVsZHMuZmluZEluZGV4KCh7bmFtZX0pID0+IG5hbWUgPT09IHNhdmVkKTtcblxuICAgIGlmIChmaWVsZElkeCA+IC0xKSB7XG4gICAgICAvLyB1cGRhdGUgZm91bmQgY29sdW1uc1xuICAgICAgY29sRm91bmRba2V5XS5maWVsZElkeCA9IGZpZWxkSWR4O1xuICAgICAgY29sRm91bmRba2V5XS52YWx1ZSA9IHNhdmVkO1xuICAgICAgcmV0dXJuIHRydWU7XG4gICAgfVxuXG4gICAgLy8gaWYgY29sIGlzIG9wdGlvbmFsLCBhbGxvdyBudWxsIHZhbHVlXG4gICAgcmV0dXJuIGVtcHR5Q29sc1trZXldLm9wdGlvbmFsIHx8IGZhbHNlO1xuICB9KTtcblxuICByZXR1cm4gYWxsQ29sRm91bmQgJiYgY29sRm91bmQ7XG59XG5cbi8qKlxuICogVmFsaWRhdGUgc2F2ZWQgdGV4dCBsYWJlbCBjb25maWcgd2l0aCBuZXcgZGF0YVxuICogcmVmZXIgdG8gdmlzLXN0YXRlLXNjaGVtYS5qcyBUZXh0TGFiZWxTY2hlbWFWMVxuICpcbiAqIEBwYXJhbSB7T2JqZWN0W119IGZpZWxkc1xuICogQHBhcmFtIHtPYmplY3R9IHNhdmVkVGV4dExhYmVsXG4gKiBAcmV0dXJuIHtPYmplY3R9IC0gdmFsaWRhdGVkIHRleHRsYWJlbFxuICovXG5leHBvcnQgZnVuY3Rpb24gdmFsaWRhdGVTYXZlZFRleHRMYWJlbChmaWVsZHMsIGxheWVyVGV4dExhYmVsLCBzYXZlZFRleHRMYWJlbCkge1xuXG4gIC8vIHZhbGlkYXRlIGZpZWxkXG4gIGNvbnN0IGZpZWxkID0gc2F2ZWRUZXh0TGFiZWwuZmllbGQgPyBmaWVsZHMuZmluZChmZCA9PlxuICAgIE9iamVjdC5rZXlzKHNhdmVkVGV4dExhYmVsLmZpZWxkKS5ldmVyeShcbiAgICAgIGtleSA9PiBzYXZlZFRleHRMYWJlbC5maWVsZFtrZXldID09PSBmZFtrZXldXG4gICAgKVxuICApIDogbnVsbDtcblxuICByZXR1cm4gT2JqZWN0LmtleXMobGF5ZXJUZXh0TGFiZWwpLnJlZHVjZSgoYWNjdSwga2V5KSA9PiAoe1xuICAgIC4uLmFjY3UsXG4gICAgW2tleV06IGtleSA9PT0gJ2ZpZWxkJyA/IGZpZWxkIDogKHNhdmVkVGV4dExhYmVsW2tleV0gfHwgbGF5ZXJUZXh0TGFiZWxba2V5XSlcbiAgfSksIHt9KTtcbn1cblxuLyoqXG4gKiBWYWxpZGF0ZSBzYXZlZCB2aXN1YWwgY2hhbm5lbHMgY29uZmlnIHdpdGggbmV3IGRhdGEsXG4gKiByZWZlciB0byB2aXMtc3RhdGUtc2NoZW1hLmpzIFZpc3VhbENoYW5uZWxTY2hlbWFWMVxuICpcbiAqIEBwYXJhbSB7T2JqZWN0W119IGZpZWxkc1xuICogQHBhcmFtIHtPYmplY3R9IHZpc3VhbENoYW5uZWxzXG4gKiBAcGFyYW0ge09iamVjdH0gc2F2ZWRMYXllclxuICogQHJldHVybiB7T2JqZWN0fSAtIHZhbGlkYXRlZCB2aXN1YWwgY2hhbm5lbCBpbiBjb25maWcgb3Ige31cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIHZhbGlkYXRlU2F2ZWRWaXN1YWxDaGFubmVscyhcbiAgZmllbGRzLFxuICB2aXN1YWxDaGFubmVscyxcbiAgc2F2ZWRMYXllclxuKSB7XG4gIHJldHVybiBPYmplY3QudmFsdWVzKHZpc3VhbENoYW5uZWxzKS5yZWR1Y2UoKGZvdW5kLCB7ZmllbGQsIHNjYWxlfSkgPT4ge1xuICAgIGxldCBmb3VuZEZpZWxkO1xuICAgIGlmIChzYXZlZExheWVyLmNvbmZpZ1tmaWVsZF0pIHtcbiAgICAgIGZvdW5kRmllbGQgPSBmaWVsZHMuZmluZChmZCA9PlxuICAgICAgICBPYmplY3Qua2V5cyhzYXZlZExheWVyLmNvbmZpZ1tmaWVsZF0pLmV2ZXJ5KFxuICAgICAgICAgIGtleSA9PiBzYXZlZExheWVyLmNvbmZpZ1tmaWVsZF1ba2V5XSA9PT0gZmRba2V5XVxuICAgICAgICApXG4gICAgICApO1xuICAgIH1cblxuICAgIHJldHVybiB7XG4gICAgICAuLi5mb3VuZCxcbiAgICAgIC4uLihmb3VuZEZpZWxkID8ge1tmaWVsZF06IGZvdW5kRmllbGR9IDoge30pLFxuICAgICAgLi4uKHNhdmVkTGF5ZXIuY29uZmlnW3NjYWxlXSA/IHtbc2NhbGVdOiBzYXZlZExheWVyLmNvbmZpZ1tzY2FsZV19IDoge30pXG4gICAgfTtcbiAgfSwge30pO1xufVxuXG4vKipcbiAqIFZhbGlkYXRlIHNhdmVkIGxheWVyIGNvbmZpZyB3aXRoIG5ldyBkYXRhLFxuICogdXBkYXRlIGZpZWxkSWR4IGJhc2VkIG9uIG5ldyBmaWVsZHNcbiAqXG4gKiBAcGFyYW0ge09iamVjdFtdfSBmaWVsZHNcbiAqIEBwYXJhbSB7U3RyaW5nfSBkYXRhSWRcbiAqIEBwYXJhbSB7T2JqZWN0fSBzYXZlZExheWVyXG4gKiBAcGFyYW0ge09iamVjdH0gbGF5ZXJDbGFzc2VzXG4gKiBAcmV0dXJuIHtudWxsIHwgT2JqZWN0fSAtIHZhbGlkYXRlZCBsYXllciBvciBudWxsXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiB2YWxpZGF0ZUxheWVyV2l0aERhdGEoe2ZpZWxkcywgaWQ6IGRhdGFJZH0sIHNhdmVkTGF5ZXIsIGxheWVyQ2xhc3Nlcykge1xuICBjb25zdCB7dHlwZX0gPSBzYXZlZExheWVyO1xuICAvLyBsYXllciBkb2VzbnQgaGF2ZSBhIHZhbGlkIHR5cGVcbiAgaWYgKFxuICAgICFsYXllckNsYXNzZXMuaGFzT3duUHJvcGVydHkodHlwZSkgfHxcbiAgICAhc2F2ZWRMYXllci5jb25maWcgfHxcbiAgICAhc2F2ZWRMYXllci5jb25maWcuY29sdW1uc1xuICApIHtcbiAgICByZXR1cm4gbnVsbDtcbiAgfVxuXG4gIGNvbnN0IG5ld0xheWVyID0gbmV3IGxheWVyQ2xhc3Nlc1t0eXBlXSh7XG4gICAgaWQ6IHNhdmVkTGF5ZXIuaWQsXG4gICAgZGF0YUlkLFxuICAgIGxhYmVsOiBzYXZlZExheWVyLmNvbmZpZy5sYWJlbCxcbiAgICBjb2xvcjogc2F2ZWRMYXllci5jb25maWcuY29sb3IsXG4gICAgaXNWaXNpYmxlOiBzYXZlZExheWVyLmNvbmZpZy5pc1Zpc2libGVcbiAgfSk7XG5cbiAgLy8gZmluZCBjb2x1bW4gZmllbGRJZHhcbiAgY29uc3QgY29sdW1ucyA9IHZhbGlkYXRlU2F2ZWRMYXllckNvbHVtbnMoXG4gICAgZmllbGRzLFxuICAgIHNhdmVkTGF5ZXIuY29uZmlnLmNvbHVtbnMsXG4gICAgbmV3TGF5ZXIuZ2V0TGF5ZXJDb2x1bW5zKClcbiAgKTtcblxuICBpZiAoIWNvbHVtbnMpIHtcbiAgICByZXR1cm4gbnVsbDtcbiAgfVxuXG4gIC8vIHZpc3VhbCBjaGFubmVsIGZpZWxkIGlzIHNhdmVkIHRvIGJlIHtuYW1lLCB0eXBlfVxuICAvLyBmaW5kIHZpc3VhbCBjaGFubmVsIGZpZWxkIGJ5IG1hdGNoaW5nIGJvdGggbmFtZSBhbmQgdHlwZVxuICAvLyByZWZlciB0byB2aXMtc3RhdGUtc2NoZW1hLmpzIFZpc3VhbENoYW5uZWxTY2hlbWFWMVxuICBjb25zdCBmb3VuZFZpc3VhbENoYW5uZWxDb25maWdzID0gdmFsaWRhdGVTYXZlZFZpc3VhbENoYW5uZWxzKFxuICAgIGZpZWxkcyxcbiAgICBuZXdMYXllci52aXN1YWxDaGFubmVscyxcbiAgICBzYXZlZExheWVyXG4gICk7XG5cbiAgY29uc3QgdGV4dExhYmVsID0gc2F2ZWRMYXllci5jb25maWcudGV4dExhYmVsICYmIG5ld0xheWVyLmNvbmZpZy50ZXh0TGFiZWwgPyB2YWxpZGF0ZVNhdmVkVGV4dExhYmVsKFxuICAgIGZpZWxkcyxcbiAgICBuZXdMYXllci5jb25maWcudGV4dExhYmVsLFxuICAgIHNhdmVkTGF5ZXIuY29uZmlnLnRleHRMYWJlbFxuICApIDogbmV3TGF5ZXIuY29uZmlnLnRleHRMYWJlbDtcblxuICAvLyBjb3B5IHZpc0NvbmZpZyBvdmVyIHRvIGVtcHR5TGF5ZXIgdG8gbWFrZSBzdXJlIGl0IGhhcyBhbGwgdGhlIHByb3BzXG4gIGNvbnN0IHZpc0NvbmZpZyA9IG5ld0xheWVyLmNvcHlMYXllckNvbmZpZyhcbiAgICBuZXdMYXllci5jb25maWcudmlzQ29uZmlnLFxuICAgIHNhdmVkTGF5ZXIuY29uZmlnLnZpc0NvbmZpZyB8fCB7fSxcbiAgICB7bm90VG9EZWVwTWVyZ2U6ICdjb2xvclJhbmdlJ31cbiAgKTtcblxuICBuZXdMYXllci51cGRhdGVMYXllckNvbmZpZyh7XG4gICAgY29sdW1ucyxcbiAgICB2aXNDb25maWcsXG4gICAgdGV4dExhYmVsLFxuICAgIC4uLmZvdW5kVmlzdWFsQ2hhbm5lbENvbmZpZ3NcbiAgfSk7XG5cbiAgcmV0dXJuIG5ld0xheWVyO1xufVxuXG4vKipcbiAqIFZhbGlkYXRlIHNhdmVkIGZpbHRlciBjb25maWcgd2l0aCBuZXcgZGF0YSxcbiAqIGNhbGN1bGF0ZSBkb21haW4gYW5kIGZpZWxkSWR4IGJhc2VkIG5ldyBmaWVsZHMgYW5kIGRhdGFcbiAqXG4gKiBAcGFyYW0ge09iamVjdFtdfSBkYXRhc2V0LmZpZWxkc1xuICogQHBhcmFtIHtPYmplY3RbXX0gZGF0YXNldC5hbGxEYXRhXG4gKiBAcGFyYW0ge09iamVjdH0gZmlsdGVyIC0gZmlsdGVyIHRvIGJlIHZhbGlkYXRlXG4gKiBAcmV0dXJuIHtPYmplY3QgfCBudWxsfSAtIHZhbGlkYXRlZCBmaWx0ZXJcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIHZhbGlkYXRlRmlsdGVyV2l0aERhdGEoe2ZpZWxkcywgYWxsRGF0YX0sIGZpbHRlcikge1xuICAvLyBtYXRjaCBmaWx0ZXIubmFtZSB0byBmaWVsZC5uYW1lXG4gIGNvbnN0IGZpZWxkSWR4ID0gZmllbGRzLmZpbmRJbmRleCgoe25hbWV9KSA9PiBuYW1lID09PSBmaWx0ZXIubmFtZSk7XG5cbiAgaWYgKGZpZWxkSWR4IDwgMCkge1xuICAgIC8vIGlmIGNhbid0IGZpbmQgZmllbGQgd2l0aCBzYW1lIG5hbWUsIGRpc2NoYXJnZSBmaWx0ZXJcbiAgICByZXR1cm4gbnVsbDtcbiAgfVxuXG4gIGNvbnN0IGZpZWxkID0gZmllbGRzW2ZpZWxkSWR4XTtcbiAgY29uc3QgdmFsdWUgPSBmaWx0ZXIudmFsdWU7XG5cbiAgLy8gcmV0dXJuIGZpbHRlciB0eXBlLCBkZWZhdWx0IHZhbHVlLCBmaWVsZFR5cGUgYW5kIGZpZWxkRG9tYWluIGZyb20gZmllbGRcbiAgY29uc3QgZmlsdGVyUHJvcHNGcm9tRmllbGQgPSBnZXRGaWx0ZXJQcm9wcyhhbGxEYXRhLCBmaWVsZCk7XG5cbiAgbGV0IG1hdGNoZWRGaWx0ZXIgPSB7XG4gICAgLi4uZ2V0RGVmYXVsdEZpbHRlcihmaWx0ZXIuZGF0YUlkKSxcbiAgICAuLi5maWx0ZXIsXG4gICAgLi4uZmlsdGVyUHJvcHNGcm9tRmllbGQsXG4gICAgZnJlZXplOiB0cnVlLFxuICAgIGZpZWxkSWR4XG4gIH07XG5cbiAgY29uc3Qge3lBeGlzfSA9IG1hdGNoZWRGaWx0ZXI7XG4gIGlmICh5QXhpcykge1xuICAgIGNvbnN0IG1hdGNoZUF4aXMgPSBmaWVsZHMuZmluZChcbiAgICAgICh7bmFtZSwgdHlwZX0pID0+IG5hbWUgPT09IHlBeGlzLm5hbWUgJiYgdHlwZSA9PT0geUF4aXMudHlwZVxuICAgICk7XG5cbiAgICBtYXRjaGVkRmlsdGVyID0gbWF0Y2hlQXhpc1xuICAgICAgPyB7XG4gICAgICAgICAgLi4ubWF0Y2hlZEZpbHRlcixcbiAgICAgICAgICB5QXhpczogbWF0Y2hlQXhpcyxcbiAgICAgICAgICAuLi5nZXRGaWx0ZXJQbG90KHsuLi5tYXRjaGVkRmlsdGVyLCB5QXhpczogbWF0Y2hlQXhpc30sIGFsbERhdGEpXG4gICAgICAgIH1cbiAgICAgIDogbWF0Y2hlZEZpbHRlcjtcbiAgfVxuXG4gIG1hdGNoZWRGaWx0ZXIudmFsdWUgPSBhZGp1c3RWYWx1ZVRvRmlsdGVyRG9tYWluKHZhbHVlLCBtYXRjaGVkRmlsdGVyKTtcblxuICBpZiAobWF0Y2hlZEZpbHRlci52YWx1ZSA9PT0gbnVsbCkge1xuICAgIC8vIGNhbm50IGFkanVzdCBzYXZlZCB2YWx1ZSB0byBmaWx0ZXJcbiAgICByZXR1cm4gbnVsbDtcbiAgfVxuXG4gIHJldHVybiBtYXRjaGVkRmlsdGVyO1xufVxuIl19