'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.loadFilesErrUpdater = exports.loadFilesUpdater = exports.updateVisDataUpdater = exports.toggleLayerForMapUpdater = exports.setVisibleLayersForMapUpdater = exports.toggleSplitMapUpdater = exports.mapClickUpdater = exports.layerClickUpdater = exports.layerHoverUpdater = exports.receiveMapConfigUpdater = exports.resetMapConfigVisStateUpdater = exports.showDatasetTableUpdater = exports.updateLayerBlendingUpdater = exports.removeDatasetUpdater = exports.reorderLayerUpdater = exports.removeLayerUpdater = exports.addLayerUpdater = exports.removeFilterUpdater = exports.enlargeFilterUpdater = exports.updateAnimationSpeedUpdater = exports.toggleFilterAnimationUpdater = exports.addFilterUpdater = exports.setFilterPlotUpdater = exports.INITIAL_VIS_STATE = undefined;

var _toConsumableArray2 = require('babel-runtime/helpers/toConsumableArray');

var _toConsumableArray3 = _interopRequireDefault(_toConsumableArray2);

var _defineProperty2 = require('babel-runtime/helpers/defineProperty');

var _defineProperty3 = _interopRequireDefault(_defineProperty2);

var _objectWithoutProperties2 = require('babel-runtime/helpers/objectWithoutProperties');

var _objectWithoutProperties3 = _interopRequireDefault(_objectWithoutProperties2);

var _extends13 = require('babel-runtime/helpers/extends');

var _extends14 = _interopRequireDefault(_extends13);

exports.layerConfigChangeUpdater = layerConfigChangeUpdater;
exports.layerTypeChangeUpdater = layerTypeChangeUpdater;
exports.layerVisualChannelChangeUpdater = layerVisualChannelChangeUpdater;
exports.layerVisConfigChangeUpdater = layerVisConfigChangeUpdater;
exports.interactionConfigChangeUpdater = interactionConfigChangeUpdater;
exports.setFilterUpdater = setFilterUpdater;
exports.addDefaultLayers = addDefaultLayers;
exports.addDefaultTooltips = addDefaultTooltips;
exports.updateAllLayerDomainData = updateAllLayerDomainData;

var _window = require('global/window');

var _tasks = require('react-palm/tasks');

var _tasks2 = _interopRequireDefault(_tasks);

var _tasks3 = require('../tasks/tasks');

var _visStateActions = require('../actions/vis-state-actions');

var _actions = require('../actions');

var _utils = require('../utils/utils');

var _interactionUtils = require('../utils/interaction-utils');

var _filterUtils = require('../utils/filter-utils');

var _datasetUtils = require('../utils/dataset-utils');

var _layerUtils = require('../utils/layer-utils/layer-utils');

var _fileHandler = require('../processors/file-handler');

var _visStateMerger = require('./vis-state-merger');

var _layers = require('../layers');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// react-palm
// disable capture exception for react-palm call to withTask


// Utils


// Actions
(0, _tasks.disableStackCapturing)();

// LayerClasses contain ES6 Class, do not instatiate in iso rendering
// const {LayerClasses} = isBrowser || isTesting ?
//   require('layers') : {
//     LayerClasses: {}
//   };

// Tasks
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

var INITIAL_VIS_STATE = exports.INITIAL_VIS_STATE = {
  // layers
  layers: [],
  layerData: [],
  layerToBeMerged: [],
  layerOrder: [],

  // filters
  filters: [],
  filterToBeMerged: [],

  // a collection of multiple dataset
  datasets: {},
  editingDataset: undefined,

  interactionConfig: (0, _interactionUtils.getDefaultInteraction)(),
  interactionToBeMerged: undefined,

  layerBlending: 'normal',
  hoverInfo: undefined,
  clicked: undefined,

  fileLoading: false,
  fileLoadingErr: null,

  // this is used when user split maps
  splitMaps: [
    // this will contain a list of objects to
    // describe the state of layer availability and visibility for each map
    // [
    //   {
    //     layers: {
    //       layer_id: {
    //         isAvailable: true|false # this is driven by the left hand panel
    //         isVisible: true|false
    //       }
    //     }
    //   }
    // ]
  ],

  // defaults layer classes
  layerClasses: _layers.LayerClasses
};

function updateStateWithLayerAndData(state, _ref) {
  var layerData = _ref.layerData,
      layer = _ref.layer,
      idx = _ref.idx;

  return (0, _extends14.default)({}, state, {
    layers: state.layers.map(function (lyr, i) {
      return i === idx ? layer : lyr;
    }),
    layerData: layerData ? state.layerData.map(function (d, i) {
      return i === idx ? layerData : d;
    }) : state.layerData
  });
}

/**
 * Called to update layer base config: dataId, label, column, isVisible
 *
 */
function layerConfigChangeUpdater(state, action) {
  var oldLayer = action.oldLayer;

  var idx = state.layers.findIndex(function (l) {
    return l.id === oldLayer.id;
  });
  var props = Object.keys(action.newConfig);

  var newLayer = oldLayer.updateLayerConfig(action.newConfig);
  if (newLayer.shouldCalculateLayerData(props)) {
    var oldLayerData = state.layerData[idx];

    var _calculateLayerData = (0, _layerUtils.calculateLayerData)(newLayer, state, oldLayerData, { sameData: true }),
        layerData = _calculateLayerData.layerData,
        layer = _calculateLayerData.layer;

    return updateStateWithLayerAndData(state, { layerData: layerData, layer: layer, idx: idx });
  }

  var newState = (0, _extends14.default)({}, state, {
    splitMaps: 'isVisible' in action.newConfig ? toggleLayerFromSplitMaps(state, newLayer) : state.splitMaps
  });

  return updateStateWithLayerAndData(newState, { layer: newLayer, idx: idx });
}

function layerTypeChangeUpdater(state, action) {
  var oldLayer = action.oldLayer,
      newType = action.newType;

  var oldId = oldLayer.id;
  var idx = state.layers.findIndex(function (l) {
    return l.id === oldId;
  });

  if (!state.layerClasses[newType]) {
    _window.console.error(newType + ' is not a valid layer type');
    return state;
  }

  // get a mint layer, with new id and type
  // because deck.gl uses id to match between new and old layer.
  // If type has changed but id is the same, it will break
  var newLayer = new state.layerClasses[newType]();

  newLayer.assignConfigToLayer(oldLayer.config, oldLayer.visConfigSettings);

  if (newLayer.config.dataId) {
    var dataset = state.datasets[newLayer.config.dataId];
    newLayer.updateLayerDomain(dataset);
  }

  var _calculateLayerData2 = (0, _layerUtils.calculateLayerData)(newLayer, state),
      layerData = _calculateLayerData2.layerData,
      layer = _calculateLayerData2.layer;

  var newState = state;

  // update splitMap layer id
  if (state.splitMaps) {
    newState = (0, _extends14.default)({}, state, {
      splitMaps: state.splitMaps.map(function (settings) {
        var _settings$layers = settings.layers,
            oldLayerMap = _settings$layers[oldId],
            otherLayers = (0, _objectWithoutProperties3.default)(_settings$layers, [oldId]);

        return (0, _extends14.default)({}, settings, {
          layers: (0, _extends14.default)({}, otherLayers, (0, _defineProperty3.default)({}, layer.id, oldLayerMap))
        });
      })
    });
  }

  return updateStateWithLayerAndData(newState, { layerData: layerData, layer: layer, idx: idx });
}

function layerVisualChannelChangeUpdater(state, action) {
  var oldLayer = action.oldLayer,
      newConfig = action.newConfig,
      channel = action.channel;

  var dataset = state.datasets[oldLayer.config.dataId];

  var idx = state.layers.findIndex(function (l) {
    return l.id === oldLayer.id;
  });
  var newLayer = oldLayer.updateLayerConfig(newConfig);

  newLayer.updateLayerVisualChannel(dataset, channel);

  var oldLayerData = state.layerData[idx];

  var _calculateLayerData3 = (0, _layerUtils.calculateLayerData)(newLayer, state, oldLayerData, {
    sameData: true
  }),
      layerData = _calculateLayerData3.layerData,
      layer = _calculateLayerData3.layer;

  return updateStateWithLayerAndData(state, { layerData: layerData, layer: layer, idx: idx });
}

function layerVisConfigChangeUpdater(state, action) {
  var oldLayer = action.oldLayer;

  var idx = state.layers.findIndex(function (l) {
    return l.id === oldLayer.id;
  });
  var props = Object.keys(action.newVisConfig);

  var newVisConfig = (0, _extends14.default)({}, oldLayer.config.visConfig, action.newVisConfig);

  var newLayer = oldLayer.updateLayerConfig({ visConfig: newVisConfig });

  if (newLayer.shouldCalculateLayerData(props)) {
    var oldLayerData = state.layerData[idx];

    var _calculateLayerData4 = (0, _layerUtils.calculateLayerData)(newLayer, state, oldLayerData, { sameData: true }),
        layerData = _calculateLayerData4.layerData,
        layer = _calculateLayerData4.layer;

    return updateStateWithLayerAndData(state, { layerData: layerData, layer: layer, idx: idx });
  }

  return updateStateWithLayerAndData(state, { layer: newLayer, idx: idx });
}

/* eslint-enable max-statements */

function interactionConfigChangeUpdater(state, action) {
  var config = action.config;


  var interactionConfig = (0, _extends14.default)({}, state.interactionConfig, (0, _defineProperty3.default)({}, config.id, config));

  if (config.enabled && !state.interactionConfig[config.id].enabled) {
    // only enable one interaction at a time
    Object.keys(interactionConfig).forEach(function (k) {
      if (k !== config.id) {
        interactionConfig[k] = (0, _extends14.default)({}, interactionConfig[k], { enabled: false });
      }
    });
  }

  return (0, _extends14.default)({}, state, {
    interactionConfig: interactionConfig
  });
}

function setFilterUpdater(state, action) {
  var idx = action.idx,
      prop = action.prop,
      value = action.value;

  var newState = state;
  var newFilter = (0, _extends14.default)({}, state.filters[idx], (0, _defineProperty3.default)({}, prop, value));

  var _newFilter = newFilter,
      dataId = _newFilter.dataId;

  if (!dataId) {
    return state;
  }
  var _state$datasets$dataI = state.datasets[dataId],
      fields = _state$datasets$dataI.fields,
      allData = _state$datasets$dataI.allData;


  switch (prop) {
    case 'dataId':
      // if trying to update filter dataId. create an empty new filter
      newFilter = (0, _filterUtils.getDefaultFilter)(dataId);
      break;

    case 'name':
      // find the field
      var fieldIdx = fields.findIndex(function (f) {
        return f.name === value;
      });
      var field = fields[fieldIdx];

      if (!field.filterProp) {
        // get filter domain from field
        // save filterProps: {domain, steps, value} to field, avoid recalculate
        field = (0, _extends14.default)({}, field, {
          filterProp: (0, _filterUtils.getFilterProps)(allData, field)
        });
      }

      newFilter = (0, _extends14.default)({}, newFilter, field.filterProp, {
        name: field.name,
        // can't edit dataId once name is selected
        freeze: true,
        fieldIdx: fieldIdx
      });
      var enlargedFilterIdx = state.filters.findIndex(function (f) {
        return f.enlarged;
      });
      if (enlargedFilterIdx > -1 && enlargedFilterIdx !== idx) {
        // there should be only one enlarged filter
        newFilter.enlarged = false;
      }

      newState = (0, _extends14.default)({}, state, {
        datasets: (0, _extends14.default)({}, state.datasets, (0, _defineProperty3.default)({}, dataId, (0, _extends14.default)({}, state.datasets[dataId], {
          fields: fields.map(function (d, i) {
            return i === fieldIdx ? field : d;
          })
        })))
      });
      break;
    case 'value':
    default:
      break;
  }

  // save new filters to newState
  newState = (0, _extends14.default)({}, newState, {
    filters: state.filters.map(function (f, i) {
      return i === idx ? newFilter : f;
    })
  });

  // filter data
  newState = (0, _extends14.default)({}, newState, {
    datasets: (0, _extends14.default)({}, newState.datasets, (0, _defineProperty3.default)({}, dataId, (0, _extends14.default)({}, newState.datasets[dataId], (0, _filterUtils.filterData)(allData, dataId, newState.filters))))
  });

  newState = updateAllLayerDomainData(newState, dataId, newFilter);

  return newState;
}

var setFilterPlotUpdater = exports.setFilterPlotUpdater = function setFilterPlotUpdater(state, _ref2) {
  var idx = _ref2.idx,
      newProp = _ref2.newProp;

  var newFilter = (0, _extends14.default)({}, state.filters[idx], newProp);
  var prop = Object.keys(newProp)[0];
  if (prop === 'yAxis') {
    var plotType = (0, _filterUtils.getDefaultFilterPlotType)(newFilter);

    if (plotType) {
      newFilter = (0, _extends14.default)({}, newFilter, (0, _filterUtils.getFilterPlot)((0, _extends14.default)({}, newFilter, { plotType: plotType }), state.datasets[newFilter.dataId].allData), {
        plotType: plotType
      });
    }
  }

  return (0, _extends14.default)({}, state, {
    filters: state.filters.map(function (f, i) {
      return i === idx ? newFilter : f;
    })
  });
};

var addFilterUpdater = exports.addFilterUpdater = function addFilterUpdater(state, action) {
  return !action.dataId ? state : (0, _extends14.default)({}, state, {
    filters: [].concat((0, _toConsumableArray3.default)(state.filters), [(0, _filterUtils.getDefaultFilter)(action.dataId)])
  });
};

var toggleFilterAnimationUpdater = exports.toggleFilterAnimationUpdater = function toggleFilterAnimationUpdater(state, action) {
  return (0, _extends14.default)({}, state, {
    filters: state.filters.map(function (f, i) {
      return i === action.idx ? (0, _extends14.default)({}, f, { isAnimating: !f.isAnimating }) : f;
    })
  });
};

var updateAnimationSpeedUpdater = exports.updateAnimationSpeedUpdater = function updateAnimationSpeedUpdater(state, action) {
  return (0, _extends14.default)({}, state, {
    filters: state.filters.map(function (f, i) {
      return i === action.idx ? (0, _extends14.default)({}, f, { speed: action.speed }) : f;
    })
  });
};

var enlargeFilterUpdater = exports.enlargeFilterUpdater = function enlargeFilterUpdater(state, action) {
  var isEnlarged = state.filters[action.idx].enlarged;

  return (0, _extends14.default)({}, state, {
    filters: state.filters.map(function (f, i) {
      f.enlarged = !isEnlarged && i === action.idx;
      return f;
    })
  });
};

var removeFilterUpdater = exports.removeFilterUpdater = function removeFilterUpdater(state, action) {
  var idx = action.idx;
  var dataId = state.filters[idx].dataId;


  var newFilters = [].concat((0, _toConsumableArray3.default)(state.filters.slice(0, idx)), (0, _toConsumableArray3.default)(state.filters.slice(idx + 1, state.filters.length)));

  var newState = (0, _extends14.default)({}, state, {
    datasets: (0, _extends14.default)({}, state.datasets, (0, _defineProperty3.default)({}, dataId, (0, _extends14.default)({}, state.datasets[dataId], (0, _filterUtils.filterData)(state.datasets[dataId].allData, dataId, newFilters)))),
    filters: newFilters
  });

  return updateAllLayerDomainData(newState, dataId);
};

var addLayerUpdater = exports.addLayerUpdater = function addLayerUpdater(state, action) {
  var defaultDataset = Object.keys(state.datasets)[0];
  var newLayer = new _layers.Layer((0, _extends14.default)({
    isVisible: true,
    isConfigActive: true,
    dataId: defaultDataset
  }, action.props));

  return (0, _extends14.default)({}, state, {
    layers: [].concat((0, _toConsumableArray3.default)(state.layers), [newLayer]),
    layerData: [].concat((0, _toConsumableArray3.default)(state.layerData), [{}]),
    layerOrder: [].concat((0, _toConsumableArray3.default)(state.layerOrder), [state.layerOrder.length]),
    splitMaps: addNewLayersToSplitMap(state.splitMaps, newLayer)
  });
};

var removeLayerUpdater = exports.removeLayerUpdater = function removeLayerUpdater(state, _ref3) {
  var idx = _ref3.idx;
  var layers = state.layers,
      layerData = state.layerData,
      clicked = state.clicked,
      hoverInfo = state.hoverInfo;

  var layerToRemove = state.layers[idx];
  var newMaps = removeLayerFromSplitMaps(state, layerToRemove);

  return (0, _extends14.default)({}, state, {
    layers: [].concat((0, _toConsumableArray3.default)(layers.slice(0, idx)), (0, _toConsumableArray3.default)(layers.slice(idx + 1, layers.length))),
    layerData: [].concat((0, _toConsumableArray3.default)(layerData.slice(0, idx)), (0, _toConsumableArray3.default)(layerData.slice(idx + 1, layerData.length))),
    layerOrder: state.layerOrder.filter(function (i) {
      return i !== idx;
    }).map(function (pid) {
      return pid > idx ? pid - 1 : pid;
    }),
    clicked: layerToRemove.isLayerHovered(clicked) ? undefined : clicked,
    hoverInfo: layerToRemove.isLayerHovered(hoverInfo) ? undefined : hoverInfo,
    splitMaps: newMaps
  });
};

var reorderLayerUpdater = exports.reorderLayerUpdater = function reorderLayerUpdater(state, _ref4) {
  var order = _ref4.order;
  return (0, _extends14.default)({}, state, {
    layerOrder: order
  });
};

var removeDatasetUpdater = function removeDatasetUpdater(state, action) {
  // extract dataset key
  var datasetKey = action.key;
  var datasets = state.datasets;

  // check if dataset is present

  if (!datasets[datasetKey]) {
    return state;
  }

  /* eslint-disable no-unused-vars */
  var layers = state.layers,
      _state$datasets = state.datasets,
      dataset = _state$datasets[datasetKey],
      newDatasets = (0, _objectWithoutProperties3.default)(_state$datasets, [datasetKey]);
  /* eslint-enable no-unused-vars */

  var indexes = layers.reduce(function (listOfIndexes, layer, index) {
    if (layer.config.dataId === datasetKey) {
      listOfIndexes.push(index);
    }
    return listOfIndexes;
  }, []);

  // remove layers and datasets

  var _indexes$reduce = indexes.reduce(function (_ref5, idx) {
    var currentState = _ref5.newState,
        indexCounter = _ref5.indexCounter;

    var currentIndex = idx - indexCounter;
    currentState = removeLayerUpdater(currentState, { idx: currentIndex });
    indexCounter++;
    return { newState: currentState, indexCounter: indexCounter };
  }, { newState: (0, _extends14.default)({}, state, { datasets: newDatasets }), indexCounter: 0 }),
      newState = _indexes$reduce.newState;

  // remove filters


  var filters = state.filters.filter(function (filter) {
    return filter.dataId !== datasetKey;
  });

  // update interactionConfig
  var interactionConfig = state.interactionConfig;
  var _interactionConfig = interactionConfig,
      tooltip = _interactionConfig.tooltip;

  if (tooltip) {
    var config = tooltip.config;
    /* eslint-disable no-unused-vars */

    var _config$fieldsToShow = config.fieldsToShow,
        fields = _config$fieldsToShow[datasetKey],
        fieldsToShow = (0, _objectWithoutProperties3.default)(_config$fieldsToShow, [datasetKey]);
    /* eslint-enable no-unused-vars */

    interactionConfig = (0, _extends14.default)({}, interactionConfig, {
      tooltip: (0, _extends14.default)({}, tooltip, { config: (0, _extends14.default)({}, config, { fieldsToShow: fieldsToShow }) })
    });
  }

  return (0, _extends14.default)({}, newState, { filters: filters, interactionConfig: interactionConfig });
};

exports.removeDatasetUpdater = removeDatasetUpdater;
var updateLayerBlendingUpdater = exports.updateLayerBlendingUpdater = function updateLayerBlendingUpdater(state, action) {
  return (0, _extends14.default)({}, state, {
    layerBlending: action.mode
  });
};

var showDatasetTableUpdater = exports.showDatasetTableUpdater = function showDatasetTableUpdater(state, action) {
  return (0, _extends14.default)({}, state, {
    editingDataset: action.dataId
  });
};

var resetMapConfigVisStateUpdater = exports.resetMapConfigVisStateUpdater = function resetMapConfigVisStateUpdater(state, action) {
  return (0, _extends14.default)({}, INITIAL_VIS_STATE, state.initialState, {
    initialState: state.initialState
  });
};

/**
 * Loads custom configuration into state
 * @param state
 * @param action
 * @returns {*}
 */
var receiveMapConfigUpdater = exports.receiveMapConfigUpdater = function receiveMapConfigUpdater(state, action) {
  if (!action.payload.visState) {
    return state;
  }

  var _action$payload$visSt = action.payload.visState,
      filters = _action$payload$visSt.filters,
      layers = _action$payload$visSt.layers,
      interactionConfig = _action$payload$visSt.interactionConfig,
      layerBlending = _action$payload$visSt.layerBlending,
      splitMaps = _action$payload$visSt.splitMaps;

  // always reset config when receive a new config

  var resetState = resetMapConfigVisStateUpdater(state);
  var mergedState = (0, _extends14.default)({}, resetState, {
    splitMaps: splitMaps || [] // maps doesn't require any logic
  });

  mergedState = (0, _visStateMerger.mergeFilters)(mergedState, filters);
  mergedState = (0, _visStateMerger.mergeLayers)(mergedState, layers);
  mergedState = (0, _visStateMerger.mergeInteractions)(mergedState, interactionConfig);
  mergedState = (0, _visStateMerger.mergeLayerBlending)(mergedState, layerBlending);

  return mergedState;
};

var layerHoverUpdater = exports.layerHoverUpdater = function layerHoverUpdater(state, action) {
  return (0, _extends14.default)({}, state, {
    hoverInfo: action.info
  });
};

var layerClickUpdater = exports.layerClickUpdater = function layerClickUpdater(state, action) {
  return (0, _extends14.default)({}, state, {
    clicked: action.info && action.info.picked ? action.info : null
  });
};

var mapClickUpdater = exports.mapClickUpdater = function mapClickUpdater(state, action) {
  return (0, _extends14.default)({}, state, {
    clicked: null
  });
};

var toggleSplitMapUpdater = exports.toggleSplitMapUpdater = function toggleSplitMapUpdater(state, action) {
  return state.splitMaps && state.splitMaps.length === 0 ? (0, _extends14.default)({}, state, {
    // maybe we should use an array to store state for a single map as well
    // if current maps length is equal to 0 it means that we are about to split the view
    splitMaps: computeSplitMapLayers(state.layers)
  }) : closeSpecificMapAtIndex(state, action);
};

/**
 * This is triggered when view is split into multiple maps.
 * It will only update layers that belong to the map layer dropdown
 * the user is interacting wit
 * @param state
 * @param action
 */
var setVisibleLayersForMapUpdater = exports.setVisibleLayersForMapUpdater = function setVisibleLayersForMapUpdater(state, action) {
  var mapIndex = action.mapIndex,
      layerIds = action.layerIds;

  if (!layerIds) {
    return state;
  }

  var _state$splitMaps = state.splitMaps,
      splitMaps = _state$splitMaps === undefined ? [] : _state$splitMaps;


  if (splitMaps.length === 0) {
    // we should never get into this state
    // because this action should only be triggered
    // when map view is split
    // but something may have happened
    return state;
  }

  // need to check if maps is populated otherwise will create
  var _splitMaps$mapIndex = splitMaps[mapIndex],
      map = _splitMaps$mapIndex === undefined ? {} : _splitMaps$mapIndex;


  var layers = map.layers || [];

  // we set visibility to true for all layers included in our input list
  var newLayers = (Object.keys(layers) || []).reduce(function (currentLayers, idx) {
    return (0, _extends14.default)({}, currentLayers, (0, _defineProperty3.default)({}, idx, (0, _extends14.default)({}, layers[idx], {
      isVisible: layerIds.includes(idx)
    })));
  }, {});

  var newMaps = [].concat((0, _toConsumableArray3.default)(splitMaps));

  newMaps[mapIndex] = (0, _extends14.default)({}, splitMaps[mapIndex], {
    layers: newLayers
  });

  return (0, _extends14.default)({}, state, {
    splitMaps: newMaps
  });
};

var toggleLayerForMapUpdater = exports.toggleLayerForMapUpdater = function toggleLayerForMapUpdater(state, action) {
  if (!state.splitMaps[action.mapIndex]) {
    return state;
  }

  var mapSettings = state.splitMaps[action.mapIndex];
  var layers = mapSettings.layers;

  if (!layers || !layers[action.layerId]) {
    return state;
  }

  var layer = layers[action.layerId];

  var newLayer = (0, _extends14.default)({}, layer, {
    isVisible: !layer.isVisible
  });

  var newLayers = (0, _extends14.default)({}, layers, (0, _defineProperty3.default)({}, action.layerId, newLayer));

  // const splitMaps = state.splitMaps;
  var newSplitMaps = [].concat((0, _toConsumableArray3.default)(state.splitMaps));
  newSplitMaps[action.mapIndex] = (0, _extends14.default)({}, mapSettings, {
    layers: newLayers
  });

  return (0, _extends14.default)({}, state, {
    splitMaps: newSplitMaps
  });
};

/* eslint-disable max-statements */
var updateVisDataUpdater = exports.updateVisDataUpdater = function updateVisDataUpdater(state, action) {
  // datasets can be a single data entries or an array of multiple data entries
  var datasets = Array.isArray(action.datasets) ? action.datasets : [action.datasets];

  if (action.config) {
    // apply config if passed from action
    state = receiveMapConfigUpdater(state, {
      payload: { visState: action.config }
    });
  }

  var newDateEntries = datasets.reduce(function (accu, _ref6) {
    var _ref6$info = _ref6.info,
        info = _ref6$info === undefined ? {} : _ref6$info,
        data = _ref6.data;
    return (0, _extends14.default)({}, accu, (0, _datasetUtils.createNewDataEntry)({ info: info, data: data }, state.datasets) || {});
  }, {});

  if (!Object.keys(newDateEntries).length) {
    return state;
  }

  var stateWithNewData = (0, _extends14.default)({}, state, {
    datasets: (0, _extends14.default)({}, state.datasets, newDateEntries)
  });

  // previously saved config before data loaded
  var _stateWithNewData$fil = stateWithNewData.filterToBeMerged,
      filterToBeMerged = _stateWithNewData$fil === undefined ? [] : _stateWithNewData$fil,
      _stateWithNewData$lay = stateWithNewData.layerToBeMerged,
      layerToBeMerged = _stateWithNewData$lay === undefined ? [] : _stateWithNewData$lay,
      _stateWithNewData$int = stateWithNewData.interactionToBeMerged,
      interactionToBeMerged = _stateWithNewData$int === undefined ? {} : _stateWithNewData$int;

  // merge state with saved filters

  var mergedState = (0, _visStateMerger.mergeFilters)(stateWithNewData, filterToBeMerged);
  // merge state with saved layers
  mergedState = (0, _visStateMerger.mergeLayers)(mergedState, layerToBeMerged);

  if (mergedState.layers.length === state.layers.length) {
    // no layer merged, find defaults
    mergedState = addDefaultLayers(mergedState, newDateEntries);
  }

  if (mergedState.splitMaps.length) {
    var newLayers = mergedState.layers.filter(function (l) {
      return l.config.dataId in newDateEntries;
    });
    // if map is splited, add new layers to splitMaps
    mergedState = (0, _extends14.default)({}, mergedState, {
      splitMaps: addNewLayersToSplitMap(mergedState.splitMaps, newLayers)
    });
  }

  // merge state with saved interactions
  mergedState = (0, _visStateMerger.mergeInteractions)(mergedState, interactionToBeMerged);

  // if no tooltips merged add default tooltips
  Object.keys(newDateEntries).forEach(function (dataId) {
    var tooltipFields = mergedState.interactionConfig.tooltip.config.fieldsToShow[dataId];
    if (!Array.isArray(tooltipFields) || !tooltipFields.length) {
      mergedState = addDefaultTooltips(mergedState, newDateEntries[dataId]);
    }
  });

  return updateAllLayerDomainData(mergedState, Object.keys(newDateEntries));
};
/* eslint-enable max-statements */

function generateLayerMetaForSplitViews(layer) {
  return {
    isAvailable: layer.config.isVisible,
    isVisible: layer.config.isVisible
  };
}

/**
 * This emthod will compute the default maps custom list
 * based on the current layers status
 * @param layers
 * @returns {[*,*]}
 */
function computeSplitMapLayers(layers) {
  var mapLayers = layers.reduce(function (newLayers, currentLayer) {
    return (0, _extends14.default)({}, newLayers, (0, _defineProperty3.default)({}, currentLayer.id, generateLayerMetaForSplitViews(currentLayer)));
  }, {});
  return [{
    layers: mapLayers
  }, {
    layers: mapLayers
  }];
}

/**
 * Remove an existing layers from custom map layer objects
 * @param state
 * @param layer
 * @returns {[*,*]} Maps of custom layer objects
 */
function removeLayerFromSplitMaps(state, layer) {
  return state.splitMaps.map(function (settings) {
    var layers = settings.layers;
    /* eslint-disable no-unused-vars */

    var _ = layers[layer.id],
        newLayers = (0, _objectWithoutProperties3.default)(layers, [layer.id]);
    /* eslint-enable no-unused-vars */

    return (0, _extends14.default)({}, settings, {
      layers: newLayers
    });
  });
}

/**
 * Add new layers to both existing maps
 * @param splitMaps
 * @param layers
 * @returns {[*,*]} new splitMaps
 */
function addNewLayersToSplitMap(splitMaps, layers) {
  var newLayers = Array.isArray(layers) ? layers : [layers];

  if (!splitMaps || !splitMaps.length || !newLayers.length) {
    return splitMaps;
  }

  // add new layer to both maps,
  //  don't override, if layer.id is already in splitMaps.settings.layers
  return splitMaps.map(function (settings) {
    return (0, _extends14.default)({}, settings, {
      layers: (0, _extends14.default)({}, settings.layers, newLayers.reduce(function (accu, newLayer) {
        return newLayer.config.isVisible ? (0, _extends14.default)({}, accu, (0, _defineProperty3.default)({}, newLayer.id, settings.layers[newLayer.id] ? settings.layers[newLayer.id] : generateLayerMetaForSplitViews(newLayer))) : accu;
      }, {}))
    });
  });
}

/**
 * Hide an existing layers from custom map layer objects
 * @param state
 * @param layer
 * @returns {[*,*]} Maps of custom layer objects
 */
function toggleLayerFromSplitMaps(state, layer) {
  return state.splitMaps.map(function (settings) {
    var layers = settings.layers;

    var newLayers = (0, _extends14.default)({}, layers, (0, _defineProperty3.default)({}, layer.id, generateLayerMetaForSplitViews(layer)));

    return (0, _extends14.default)({}, settings, {
      layers: newLayers
    });
  });
}

/**
 * When a user clicks on the specific map closing icon
 * the application will close the selected map
 * and will merge the remaining one with the global state
 * TODO: i think in the future this action should be called merge map layers with global settings
 * @param state
 * @param action
 * @returns {*}
 */
function closeSpecificMapAtIndex(state, action) {
  // retrieve layers meta data from the remaining map that we need to keep
  var indexToRetrieve = 1 - action.payload;

  var metaSettings = state.splitMaps[indexToRetrieve];
  if (!metaSettings || !metaSettings.layers) {
    // if we can't find the meta settings we simply clean up splitMaps and
    // keep global state as it is
    // but why does this ever happen?
    return (0, _extends14.default)({}, state, {
      splitMaps: []
    });
  }

  var layers = state.layers;

  // update layer visibility

  var newLayers = layers.map(function (layer) {
    return layer.updateLayerConfig({
      isVisible: metaSettings.layers[layer.id] ? metaSettings.layers[layer.id].isVisible : layer.config.isVisible
    });
  });

  // delete map
  return (0, _extends14.default)({}, state, {
    layers: newLayers,
    splitMaps: []
  });
}

// TODO: redo write handler to not use tasks
var loadFilesUpdater = exports.loadFilesUpdater = function loadFilesUpdater(state, action) {
  var files = action.files;


  var filesToLoad = files.map(function (fileBlob) {
    return {
      fileBlob: fileBlob,
      info: {
        id: (0, _utils.generateHashId)(4),
        label: fileBlob.name,
        size: fileBlob.size
      },
      handler: (0, _fileHandler.getFileHandler)(fileBlob)
    };
  });

  // reader -> parser -> augment -> receiveVisData
  var loadFileTasks = [_tasks2.default.all(filesToLoad.map(_tasks3.LOAD_FILE_TASK)).bimap(function (results) {
    var data = results.reduce(function (f, c) {
      return {
        // using concat here because the current datasets could be an array or a single item
        datasets: f.datasets.concat(c.datasets),
        // we need to deep merge this thing unless we find a better solution
        // this case will only happen if we allow to load multiple keplergl json files
        config: (0, _extends14.default)({}, f.config, c.config || {})
      };
    }, { datasets: [], config: {}, options: { centerMap: true } });
    return (0, _actions.addDataToMap)(data);
  }, function (error) {
    return (0, _visStateActions.loadFilesErr)(error);
  })];

  return (0, _tasks.withTask)((0, _extends14.default)({}, state, {
    fileLoading: true
  }), loadFileTasks);
};

var loadFilesErrUpdater = exports.loadFilesErrUpdater = function loadFilesErrUpdater(state, _ref7) {
  var error = _ref7.error;
  return (0, _extends14.default)({}, state, {
    fileLoading: false,
    fileLoadingErr: error
  });
};

/**
 * helper function to update All layer domain and layer data of state
 *
 * @param {object} state
 * @param {string} datasets
 * @returns {object} state
 */
function addDefaultLayers(state, datasets) {
  var defaultLayers = Object.values(datasets).reduce(function (accu, dataset) {
    return [].concat((0, _toConsumableArray3.default)(accu), (0, _toConsumableArray3.default)((0, _layerUtils.findDefaultLayer)(dataset, state.layerClasses) || []));
  }, []);
  return (0, _extends14.default)({}, state, {
    layers: [].concat((0, _toConsumableArray3.default)(state.layers), (0, _toConsumableArray3.default)(defaultLayers)),
    layerOrder: [].concat((0, _toConsumableArray3.default)(defaultLayers.map(function (_, i) {
      return state.layers.length + i;
    })), (0, _toConsumableArray3.default)(state.layerOrder))
  });
}

/**
 * helper function to find default tooltips
 *
 * @param {object} state
 * @param {object} dataset
 * @returns {object} state
 */
function addDefaultTooltips(state, dataset) {
  var tooltipFields = (0, _interactionUtils.findFieldsToShow)(dataset);

  return (0, _extends14.default)({}, state, {
    interactionConfig: (0, _extends14.default)({}, state.interactionConfig, {
      tooltip: (0, _extends14.default)({}, state.interactionConfig.tooltip, {
        config: {
          // find default fields to show in tooltip
          fieldsToShow: (0, _extends14.default)({}, state.interactionConfig.tooltip.config.fieldsToShow, tooltipFields)
        }
      })
    })
  });
}

/**
 * helper function to update layer domains for an array of datsets
 *
 * @param {object} state
 * @param {array | string} dataId
 * @param {object} newFilter - if is called by setFilter, the filter that has changed
 * @returns {object} state
 */
function updateAllLayerDomainData(state, dataId, newFilter) {
  var dataIds = typeof dataId === 'string' ? [dataId] : dataId;
  var newLayers = [];
  var newLayerDatas = [];

  state.layers.forEach(function (oldLayer, i) {
    if (oldLayer.config.dataId && dataIds.includes(oldLayer.config.dataId)) {
      // No need to recalculate layer domain if filter has fixed domain
      var newLayer = newFilter && newFilter.fixedDomain ? oldLayer : oldLayer.updateLayerDomain(state.datasets[oldLayer.config.dataId], newFilter);

      var _calculateLayerData5 = (0, _layerUtils.calculateLayerData)(newLayer, state, state.layerData[i]),
          layerData = _calculateLayerData5.layerData,
          layer = _calculateLayerData5.layer;

      newLayers.push(layer);
      newLayerDatas.push(layerData);
    } else {
      newLayers.push(oldLayer);
      newLayerDatas.push(state.layerData[i]);
    }
  });

  return (0, _extends14.default)({}, state, {
    layers: newLayers,
    layerData: newLayerDatas
  });
}
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9yZWR1Y2Vycy92aXMtc3RhdGUtdXBkYXRlcnMuanMiXSwibmFtZXMiOlsibGF5ZXJDb25maWdDaGFuZ2VVcGRhdGVyIiwibGF5ZXJUeXBlQ2hhbmdlVXBkYXRlciIsImxheWVyVmlzdWFsQ2hhbm5lbENoYW5nZVVwZGF0ZXIiLCJsYXllclZpc0NvbmZpZ0NoYW5nZVVwZGF0ZXIiLCJpbnRlcmFjdGlvbkNvbmZpZ0NoYW5nZVVwZGF0ZXIiLCJzZXRGaWx0ZXJVcGRhdGVyIiwiYWRkRGVmYXVsdExheWVycyIsImFkZERlZmF1bHRUb29sdGlwcyIsInVwZGF0ZUFsbExheWVyRG9tYWluRGF0YSIsIklOSVRJQUxfVklTX1NUQVRFIiwibGF5ZXJzIiwibGF5ZXJEYXRhIiwibGF5ZXJUb0JlTWVyZ2VkIiwibGF5ZXJPcmRlciIsImZpbHRlcnMiLCJmaWx0ZXJUb0JlTWVyZ2VkIiwiZGF0YXNldHMiLCJlZGl0aW5nRGF0YXNldCIsInVuZGVmaW5lZCIsImludGVyYWN0aW9uQ29uZmlnIiwiaW50ZXJhY3Rpb25Ub0JlTWVyZ2VkIiwibGF5ZXJCbGVuZGluZyIsImhvdmVySW5mbyIsImNsaWNrZWQiLCJmaWxlTG9hZGluZyIsImZpbGVMb2FkaW5nRXJyIiwic3BsaXRNYXBzIiwibGF5ZXJDbGFzc2VzIiwiTGF5ZXJDbGFzc2VzIiwidXBkYXRlU3RhdGVXaXRoTGF5ZXJBbmREYXRhIiwic3RhdGUiLCJsYXllciIsImlkeCIsIm1hcCIsImx5ciIsImkiLCJkIiwiYWN0aW9uIiwib2xkTGF5ZXIiLCJmaW5kSW5kZXgiLCJsIiwiaWQiLCJwcm9wcyIsIk9iamVjdCIsImtleXMiLCJuZXdDb25maWciLCJuZXdMYXllciIsInVwZGF0ZUxheWVyQ29uZmlnIiwic2hvdWxkQ2FsY3VsYXRlTGF5ZXJEYXRhIiwib2xkTGF5ZXJEYXRhIiwic2FtZURhdGEiLCJuZXdTdGF0ZSIsInRvZ2dsZUxheWVyRnJvbVNwbGl0TWFwcyIsIm5ld1R5cGUiLCJvbGRJZCIsIkNvbnNvbGUiLCJlcnJvciIsImFzc2lnbkNvbmZpZ1RvTGF5ZXIiLCJjb25maWciLCJ2aXNDb25maWdTZXR0aW5ncyIsImRhdGFJZCIsImRhdGFzZXQiLCJ1cGRhdGVMYXllckRvbWFpbiIsInNldHRpbmdzIiwib2xkTGF5ZXJNYXAiLCJvdGhlckxheWVycyIsImNoYW5uZWwiLCJ1cGRhdGVMYXllclZpc3VhbENoYW5uZWwiLCJuZXdWaXNDb25maWciLCJ2aXNDb25maWciLCJlbmFibGVkIiwiZm9yRWFjaCIsImsiLCJwcm9wIiwidmFsdWUiLCJuZXdGaWx0ZXIiLCJmaWVsZHMiLCJhbGxEYXRhIiwiZmllbGRJZHgiLCJmIiwibmFtZSIsImZpZWxkIiwiZmlsdGVyUHJvcCIsImZyZWV6ZSIsImVubGFyZ2VkRmlsdGVySWR4IiwiZW5sYXJnZWQiLCJzZXRGaWx0ZXJQbG90VXBkYXRlciIsIm5ld1Byb3AiLCJwbG90VHlwZSIsImFkZEZpbHRlclVwZGF0ZXIiLCJ0b2dnbGVGaWx0ZXJBbmltYXRpb25VcGRhdGVyIiwiaXNBbmltYXRpbmciLCJ1cGRhdGVBbmltYXRpb25TcGVlZFVwZGF0ZXIiLCJzcGVlZCIsImVubGFyZ2VGaWx0ZXJVcGRhdGVyIiwiaXNFbmxhcmdlZCIsInJlbW92ZUZpbHRlclVwZGF0ZXIiLCJuZXdGaWx0ZXJzIiwic2xpY2UiLCJsZW5ndGgiLCJhZGRMYXllclVwZGF0ZXIiLCJkZWZhdWx0RGF0YXNldCIsIkxheWVyIiwiaXNWaXNpYmxlIiwiaXNDb25maWdBY3RpdmUiLCJhZGROZXdMYXllcnNUb1NwbGl0TWFwIiwicmVtb3ZlTGF5ZXJVcGRhdGVyIiwibGF5ZXJUb1JlbW92ZSIsIm5ld01hcHMiLCJyZW1vdmVMYXllckZyb21TcGxpdE1hcHMiLCJmaWx0ZXIiLCJwaWQiLCJpc0xheWVySG92ZXJlZCIsInJlb3JkZXJMYXllclVwZGF0ZXIiLCJvcmRlciIsInJlbW92ZURhdGFzZXRVcGRhdGVyIiwiZGF0YXNldEtleSIsImtleSIsIm5ld0RhdGFzZXRzIiwiaW5kZXhlcyIsInJlZHVjZSIsImxpc3RPZkluZGV4ZXMiLCJpbmRleCIsInB1c2giLCJjdXJyZW50U3RhdGUiLCJpbmRleENvdW50ZXIiLCJjdXJyZW50SW5kZXgiLCJ0b29sdGlwIiwiZmllbGRzVG9TaG93IiwidXBkYXRlTGF5ZXJCbGVuZGluZ1VwZGF0ZXIiLCJtb2RlIiwic2hvd0RhdGFzZXRUYWJsZVVwZGF0ZXIiLCJyZXNldE1hcENvbmZpZ1Zpc1N0YXRlVXBkYXRlciIsImluaXRpYWxTdGF0ZSIsInJlY2VpdmVNYXBDb25maWdVcGRhdGVyIiwicGF5bG9hZCIsInZpc1N0YXRlIiwicmVzZXRTdGF0ZSIsIm1lcmdlZFN0YXRlIiwibGF5ZXJIb3ZlclVwZGF0ZXIiLCJpbmZvIiwibGF5ZXJDbGlja1VwZGF0ZXIiLCJwaWNrZWQiLCJtYXBDbGlja1VwZGF0ZXIiLCJ0b2dnbGVTcGxpdE1hcFVwZGF0ZXIiLCJjb21wdXRlU3BsaXRNYXBMYXllcnMiLCJjbG9zZVNwZWNpZmljTWFwQXRJbmRleCIsInNldFZpc2libGVMYXllcnNGb3JNYXBVcGRhdGVyIiwibWFwSW5kZXgiLCJsYXllcklkcyIsIm5ld0xheWVycyIsImN1cnJlbnRMYXllcnMiLCJpbmNsdWRlcyIsInRvZ2dsZUxheWVyRm9yTWFwVXBkYXRlciIsIm1hcFNldHRpbmdzIiwibGF5ZXJJZCIsIm5ld1NwbGl0TWFwcyIsInVwZGF0ZVZpc0RhdGFVcGRhdGVyIiwiQXJyYXkiLCJpc0FycmF5IiwibmV3RGF0ZUVudHJpZXMiLCJhY2N1IiwiZGF0YSIsInN0YXRlV2l0aE5ld0RhdGEiLCJ0b29sdGlwRmllbGRzIiwiZ2VuZXJhdGVMYXllck1ldGFGb3JTcGxpdFZpZXdzIiwiaXNBdmFpbGFibGUiLCJtYXBMYXllcnMiLCJjdXJyZW50TGF5ZXIiLCJfIiwiaW5kZXhUb1JldHJpZXZlIiwibWV0YVNldHRpbmdzIiwibG9hZEZpbGVzVXBkYXRlciIsImZpbGVzIiwiZmlsZXNUb0xvYWQiLCJmaWxlQmxvYiIsImxhYmVsIiwic2l6ZSIsImhhbmRsZXIiLCJsb2FkRmlsZVRhc2tzIiwiVGFzayIsImFsbCIsIkxPQURfRklMRV9UQVNLIiwiYmltYXAiLCJyZXN1bHRzIiwiYyIsImNvbmNhdCIsIm9wdGlvbnMiLCJjZW50ZXJNYXAiLCJsb2FkRmlsZXNFcnJVcGRhdGVyIiwiZGVmYXVsdExheWVycyIsInZhbHVlcyIsImRhdGFJZHMiLCJuZXdMYXllckRhdGFzIiwiZml4ZWREb21haW4iXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O1FBa0lnQkEsd0IsR0FBQUEsd0I7UUE0QkFDLHNCLEdBQUFBLHNCO1FBOENBQywrQixHQUFBQSwrQjtRQWlCQUMsMkIsR0FBQUEsMkI7UUE0QkFDLDhCLEdBQUFBLDhCO1FBdUJBQyxnQixHQUFBQSxnQjtRQTRzQkFDLGdCLEdBQUFBLGdCO1FBMEJBQyxrQixHQUFBQSxrQjtRQTZCQUMsd0IsR0FBQUEsd0I7O0FBLy9CaEI7O0FBQ0E7Ozs7QUFHQTs7QUFHQTs7QUFDQTs7QUFHQTs7QUFDQTs7QUFJQTs7QUFPQTs7QUFFQTs7QUFLQTs7QUFFQTs7QUFhQTs7OztBQUVBO0FBQ0E7OztBQXRDQTs7O0FBSkE7QUEyQ0E7O0FBVkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUF4Q0E7QUF2QkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBcURPLElBQU1DLGdEQUFvQjtBQUMvQjtBQUNBQyxVQUFRLEVBRnVCO0FBRy9CQyxhQUFXLEVBSG9CO0FBSS9CQyxtQkFBaUIsRUFKYztBQUsvQkMsY0FBWSxFQUxtQjs7QUFPL0I7QUFDQUMsV0FBUyxFQVJzQjtBQVMvQkMsb0JBQWtCLEVBVGE7O0FBVy9CO0FBQ0FDLFlBQVUsRUFacUI7QUFhL0JDLGtCQUFnQkMsU0FiZTs7QUFlL0JDLHFCQUFtQiw4Q0FmWTtBQWdCL0JDLHlCQUF1QkYsU0FoQlE7O0FBa0IvQkcsaUJBQWUsUUFsQmdCO0FBbUIvQkMsYUFBV0osU0FuQm9C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Q3pCN0IsUUFEeUIsRUFFekJoQixLQUZ5QixFQUd6QkEsTUFBTW5CLFNBQU4sQ0FBZ0J3QixDQUFoQixDQUh5QixDQVYyQztBQUFBLFVBVS9EeEIsU0FWK0Qsd0JBVS9EQSxTQVYrRDtBQUFBLFVBVXBEb0IsS0FWb0Qsd0JBVXBEQSxLQVZvRDs7QUFnQnRFdUgsZ0JBQVUzQixJQUFWLENBQWU1RixLQUFmO0FBQ0FrSyxvQkFBY3RFLElBQWQsQ0FBbUJoSCxTQUFuQjtBQUNELEtBbEJELE1Ba0JPO0FBQ0wySSxnQkFBVTNCLElBQVYsQ0FBZXJGLFFBQWY7QUFDQTJKLG9CQUFjdEUsSUFBZCxDQUFtQjdGLE1BQU1uQixTQUFOLENBQWdCd0IsQ0FBaEIsQ0FBbkI7QUFDRDtBQUNGLEdBdkJEOztBQXlCQSxxQ0FDS0wsS0FETDtBQUVFcEIsWUFBUTRJLFNBRlY7QUFHRTNJLGVBQVdzTDtBQUhiO0FBS0QiLCJmaWxlIjoidmlzLXN0YXRlLXVwZGF0ZXJzLmpzIiwic291cmNlc0NvbnRlbnQiOlsiLy8gQ29weXJpZ2h0IChjKSAyMDE4IFViZXIgVGVjaG5vbG9naWVzLCBJbmMuXG4vL1xuLy8gUGVybWlzc2lvbiBpcyBoZXJlYnkgZ3JhbnRlZCwgZnJlZSBvZiBjaGFyZ2UsIHRvIGFueSBwZXJzb24gb2J0YWluaW5nIGEgY29weVxuLy8gb2YgdGhpcyBzb2Z0d2FyZSBhbmQgYXNzb2NpYXRlZCBkb2N1bWVudGF0aW9uIGZpbGVzICh0aGUgXCJTb2Z0d2FyZVwiKSwgdG8gZGVhbFxuLy8gaW4gdGhlIFNvZnR3YXJlIHdpdGhvdXQgcmVzdHJpY3Rpb24sIGluY2x1ZGluZyB3aXRob3V0IGxpbWl0YXRpb24gdGhlIHJpZ2h0c1xuLy8gdG8gdXNlLCBjb3B5LCBtb2RpZnksIG1lcmdlLCBwdWJsaXNoLCBkaXN0cmlidXRlLCBzdWJsaWNlbnNlLCBhbmQvb3Igc2VsbFxuLy8gY29waWVzIG9mIHRoZSBTb2Z0d2FyZSwgYW5kIHRvIHBlcm1pdCBwZXJzb25zIHRvIHdob20gdGhlIFNvZnR3YXJlIGlzXG4vLyBmdXJuaXNoZWQgdG8gZG8gc28sIHN1YmplY3QgdG8gdGhlIGZvbGxvd2luZyBjb25kaXRpb25zOlxuLy9cbi8vIFRoZSBhYm92ZSBjb3B5cmlnaHQgbm90aWNlIGFuZCB0aGlzIHBlcm1pc3Npb24gbm90aWNlIHNoYWxsIGJlIGluY2x1ZGVkIGluXG4vLyBhbGwgY29waWVzIG9yIHN1YnN0YW50aWFsIHBvcnRpb25zIG9mIHRoZSBTb2Z0d2FyZS5cbi8vXG4vLyBUSEUgU09GVFdBUkUgSVMgUFJPVklERUQgXCJBUyBJU1wiLCBXSVRIT1VUIFdBUlJBTlRZIE9GIEFOWSBLSU5ELCBFWFBSRVNTIE9SXG4vLyBJTVBMSUVELCBJTkNMVURJTkcgQlVUIE5PVCBMSU1JVEVEIFRPIFRIRSBXQVJSQU5USUVTIE9GIE1FUkNIQU5UQUJJTElUWSxcbi8vIEZJVE5FU1MgRk9SIEEgUEFSVElDVUxBUiBQVVJQT1NFIEFORCBOT05JTkZSSU5HRU1FTlQuIElOIE5PIEVWRU5UIFNIQUxMIFRIRVxuLy8gQVVUSE9SUyBPUiBDT1BZUklHSFQgSE9MREVSUyBCRSBMSUFCTEUgRk9SIEFOWSBDTEFJTSwgREFNQUdFUyBPUiBPVEhFUlxuLy8gTElBQklMSVRZLCBXSEVUSEVSIElOIEFOIEFDVElPTiBPRiBDT05UUkFDVCwgVE9SVCBPUiBPVEhFUldJU0UsIEFSSVNJTkcgRlJPTSxcbi8vIE9VVCBPRiBPUiBJTiBDT05ORUNUSU9OIFdJVEggVEhFIFNPRlRXQVJFIE9SIFRIRSBVU0UgT1IgT1RIRVIgREVBTElOR1MgSU5cbi8vIFRIRSBTT0ZUV0FSRS5cblxuaW1wb3J0IHtjb25zb2xlIGFzIENvbnNvbGV9IGZyb20gJ2dsb2JhbC93aW5kb3cnO1xuaW1wb3J0IFRhc2ssIHtkaXNhYmxlU3RhY2tDYXB0dXJpbmcsIHdpdGhUYXNrfSBmcm9tICdyZWFjdC1wYWxtL3Rhc2tzJztcblxuLy8gVGFza3NcbmltcG9ydCB7TE9BRF9GSUxFX1RBU0t9IGZyb20gJ3Rhc2tzL3Rhc2tzJztcblxuLy8gQWN0aW9uc1xuaW1wb3J0IHtsb2FkRmlsZXNFcnJ9IGZyb20gJ2FjdGlvbnMvdmlzLXN0YXRlLWFjdGlvbnMnO1xuaW1wb3J0IHthZGREYXRhVG9NYXB9IGZyb20gJ2FjdGlvbnMnO1xuXG4vLyBVdGlsc1xuaW1wb3J0IHtnZW5lcmF0ZUhhc2hJZH0gZnJvbSAndXRpbHMvdXRpbHMnO1xuaW1wb3J0IHtcbiAgZ2V0RGVmYXVsdEludGVyYWN0aW9uLFxuICBmaW5kRmllbGRzVG9TaG93XG59IGZyb20gJ3V0aWxzL2ludGVyYWN0aW9uLXV0aWxzJztcbmltcG9ydCB7XG4gIGdldERlZmF1bHRGaWx0ZXIsXG4gIGdldEZpbHRlclByb3BzLFxuICBnZXRGaWx0ZXJQbG90LFxuICBnZXREZWZhdWx0RmlsdGVyUGxvdFR5cGUsXG4gIGZpbHRlckRhdGFcbn0gZnJvbSAndXRpbHMvZmlsdGVyLXV0aWxzJztcbmltcG9ydCB7Y3JlYXRlTmV3RGF0YUVudHJ5fSBmcm9tICd1dGlscy9kYXRhc2V0LXV0aWxzJztcblxuaW1wb3J0IHtcbiAgZmluZERlZmF1bHRMYXllcixcbiAgY2FsY3VsYXRlTGF5ZXJEYXRhXG59IGZyb20gJ3V0aWxzL2xheWVyLXV0aWxzL2xheWVyLXV0aWxzJztcblxuaW1wb3J0IHtnZXRGaWxlSGFuZGxlcn0gZnJvbSAncHJvY2Vzc29ycy9maWxlLWhhbmRsZXInO1xuXG5pbXBvcnQge1xuICBtZXJnZUZpbHRlcnMsXG4gIG1lcmdlTGF5ZXJzLFxuICBtZXJnZUludGVyYWN0aW9ucyxcbiAgbWVyZ2VMYXllckJsZW5kaW5nXG59IGZyb20gJy4vdmlzLXN0YXRlLW1lcmdlcic7XG5cbi8vIExheWVyQ2xhc3NlcyBjb250YWluIEVTNiBDbGFzcywgZG8gbm90IGluc3RhdGlhdGUgaW4gaXNvIHJlbmRlcmluZ1xuLy8gY29uc3Qge0xheWVyQ2xhc3Nlc30gPSBpc0Jyb3dzZXIgfHwgaXNUZXN0aW5nID9cbi8vICAgcmVxdWlyZSgnbGF5ZXJzJykgOiB7XG4vLyAgICAgTGF5ZXJDbGFzc2VzOiB7fVxuLy8gICB9O1xuXG5pbXBvcnQge0xheWVyLCBMYXllckNsYXNzZXN9IGZyb20gJ2xheWVycyc7XG5cbi8vIHJlYWN0LXBhbG1cbi8vIGRpc2FibGUgY2FwdHVyZSBleGNlcHRpb24gZm9yIHJlYWN0LXBhbG0gY2FsbCB0byB3aXRoVGFza1xuZGlzYWJsZVN0YWNrQ2FwdHVyaW5nKCk7XG5cbmV4cG9ydCBjb25zdCBJTklUSUFMX1ZJU19TVEFURSA9IHtcbiAgLy8gbGF5ZXJzXG4gIGxheWVyczogW10sXG4gIGxheWVyRGF0YTogW10sXG4gIGxheWVyVG9CZU1lcmdlZDogW10sXG4gIGxheWVyT3JkZXI6IFtdLFxuXG4gIC8vIGZpbHRlcnNcbiAgZmlsdGVyczogW10sXG4gIGZpbHRlclRvQmVNZXJnZWQ6IFtdLFxuXG4gIC8vIGEgY29sbGVjdGlvbiBvZiBtdWx0aXBsZSBkYXRhc2V0XG4gIGRhdGFzZXRzOiB7fSxcbiAgZWRpdGluZ0RhdGFzZXQ6IHVuZGVmaW5lZCxcblxuICBpbnRlcmFjdGlvbkNvbmZpZzogZ2V0RGVmYXVsdEludGVyYWN0aW9uKCksXG4gIGludGVyYWN0aW9uVG9CZU1lcmdlZDogdW5kZWZpbmVkLFxuXG4gIGxheWVyQmxlbmRpbmc6ICdub3JtYWwnLFxuICBob3ZlckluZm86IHVuZGVmaW5lZCxcbiAgY2xpY2tlZDogdW5kZWZpbmVkLFxuXG4gIGZpbGVMb2FkaW5nOiBmYWxzZSxcbiAgZmlsZUxvYWRpbmdFcnI6IG51bGwsXG5cbiAgLy8gdGhpcyBpcyB1c2VkIHdoZW4gdXNlciBzcGxpdCBtYXBzXG4gIHNwbGl0TWFwczogW1xuICAgIC8vIHRoaXMgd2lsbCBjb250YWluIGEgbGlzdCBvZiBvYmplY3RzIHRvXG4gICAgLy8gZGVzY3JpYmUgdGhlIHN0YXRlIG9mIGxheWVyIGF2YWlsYWJpbGl0eSBhbmQgdmlzaWJpbGl0eSBmb3IgZWFjaCBtYXBcbiAgICAvLyBbXG4gICAgLy8gICB7XG4gICAgLy8gICAgIGxheWVyczoge1xuICAgIC8vICAgICAgIGxheWVyX2lkOiB7XG4gICAgLy8gICAgICAgICBpc0F2YWlsYWJsZTogdHJ1ZXxmYWxzZSAjIHRoaXMgaXMgZHJpdmVuIGJ5IHRoZSBsZWZ0IGhhbmQgcGFuZWxcbiAgICAvLyAgICAgICAgIGlzVmlzaWJsZTogdHJ1ZXxmYWxzZVxuICAgIC8vICAgICAgIH1cbiAgICAvLyAgICAgfVxuICAgIC8vICAgfVxuICAgIC8vIF1cbiAgXSxcblxuICAvLyBkZWZhdWx0cyBsYXllciBjbGFzc2VzXG4gIGxheWVyQ2xhc3NlczogTGF5ZXJDbGFzc2VzXG59O1xuXG5mdW5jdGlvbiB1cGRhdGVTdGF0ZVdpdGhMYXllckFuZERhdGEoc3RhdGUsIHtsYXllckRhdGEsIGxheWVyLCBpZHh9KSB7XG4gIHJldHVybiB7XG4gICAgLi4uc3RhdGUsXG4gICAgbGF5ZXJzOiBzdGF0ZS5sYXllcnMubWFwKChseXIsIGkpID0+IChpID09PSBpZHggPyBsYXllciA6IGx5cikpLFxuICAgIGxheWVyRGF0YTogbGF5ZXJEYXRhXG4gICAgICA/IHN0YXRlLmxheWVyRGF0YS5tYXAoKGQsIGkpID0+IChpID09PSBpZHggPyBsYXllckRhdGEgOiBkKSlcbiAgICAgIDogc3RhdGUubGF5ZXJEYXRhXG4gIH07XG59XG5cbi8qKlxuICogQ2FsbGVkIHRvIHVwZGF0ZSBsYXllciBiYXNlIGNvbmZpZzogZGF0YUlkLCBsYWJlbCwgY29sdW1uLCBpc1Zpc2libGVcbiAqXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBsYXllckNvbmZpZ0NoYW5nZVVwZGF0ZXIoc3RhdGUsIGFjdGlvbikge1xuICBjb25zdCB7b2xkTGF5ZXJ9ID0gYWN0aW9uO1xuICBjb25zdCBpZHggPSBzdGF0ZS5sYXllcnMuZmluZEluZGV4KGwgPT4gbC5pZCA9PT0gb2xkTGF5ZXIuaWQpO1xuICBjb25zdCBwcm9wcyA9IE9iamVjdC5rZXlzKGFjdGlvbi5uZXdDb25maWcpO1xuXG4gIGNvbnN0IG5ld0xheWVyID0gb2xkTGF5ZXIudXBkYXRlTGF5ZXJDb25maWcoYWN0aW9uLm5ld0NvbmZpZyk7XG4gIGlmIChuZXdMYXllci5zaG91bGRDYWxjdWxhdGVMYXllckRhdGEocHJvcHMpKSB7XG4gICAgY29uc3Qgb2xkTGF5ZXJEYXRhID0gc3RhdGUubGF5ZXJEYXRhW2lkeF07XG4gICAgY29uc3Qge2xheWVyRGF0YSwgbGF5ZXJ9ID0gY2FsY3VsYXRlTGF5ZXJEYXRhKFxuICAgICAgbmV3TGF5ZXIsXG4gICAgICBzdGF0ZSxcbiAgICAgIG9sZExheWVyRGF0YSxcbiAgICAgIHtzYW1lRGF0YTogdHJ1ZX1cbiAgICApO1xuICAgIHJldHVybiB1cGRhdGVTdGF0ZVdpdGhMYXllckFuZERhdGEoc3RhdGUsIHtsYXllckRhdGEsIGxheWVyLCBpZHh9KTtcbiAgfVxuXG4gIGNvbnN0IG5ld1N0YXRlID0ge1xuICAgIC4uLnN0YXRlLFxuICAgIHNwbGl0TWFwczpcbiAgICAgICdpc1Zpc2libGUnIGluIGFjdGlvbi5uZXdDb25maWdcbiAgICAgICAgPyB0b2dnbGVMYXllckZyb21TcGxpdE1hcHMoc3RhdGUsIG5ld0xheWVyKVxuICAgICAgICA6IHN0YXRlLnNwbGl0TWFwc1xuICB9O1xuXG4gIHJldHVybiB1cGRhdGVTdGF0ZVdpdGhMYXllckFuZERhdGEobmV3U3RhdGUsIHtsYXllcjogbmV3TGF5ZXIsIGlkeH0pO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gbGF5ZXJUeXBlQ2hhbmdlVXBkYXRlcihzdGF0ZSwgYWN0aW9uKSB7XG4gIGNvbnN0IHtvbGRMYXllciwgbmV3VHlwZX0gPSBhY3Rpb247XG4gIGNvbnN0IG9sZElkID0gb2xkTGF5ZXIuaWQ7XG4gIGNvbnN0IGlkeCA9IHN0YXRlLmxheWVycy5maW5kSW5kZXgobCA9PiBsLmlkID09PSBvbGRJZCk7XG5cbiAgaWYgKCFzdGF0ZS5sYXllckNsYXNzZXNbbmV3VHlwZV0pIHtcbiAgICBDb25zb2xlLmVycm9yKGAke25ld1R5cGV9IGlzIG5vdCBhIHZhbGlkIGxheWVyIHR5cGVgKTtcbiAgICByZXR1cm4gc3RhdGU7XG4gIH1cblxuICAvLyBnZXQgYSBtaW50IGxheWVyLCB3aXRoIG5ldyBpZCBhbmQgdHlwZVxuICAvLyBiZWNhdXNlIGRlY2suZ2wgdXNlcyBpZCB0byBtYXRjaCBiZXR3ZWVuIG5ldyBhbmQgb2xkIGxheWVyLlxuICAvLyBJZiB0eXBlIGhhcyBjaGFuZ2VkIGJ1dCBpZCBpcyB0aGUgc2FtZSwgaXQgd2lsbCBicmVha1xuICBjb25zdCBuZXdMYXllciA9IG5ldyBzdGF0ZS5sYXllckNsYXNzZXNbbmV3VHlwZV0oKTtcblxuICBuZXdMYXllci5hc3NpZ25Db25maWdUb0xheWVyKG9sZExheWVyLmNvbmZpZywgb2xkTGF5ZXIudmlzQ29uZmlnU2V0dGluZ3MpO1xuXG4gIGlmIChuZXdMYXllci5jb25maWcuZGF0YUlkKSB7XG4gICAgY29uc3QgZGF0YXNldCA9IHN0YXRlLmRhdGFzZXRzW25ld0xheWVyLmNvbmZpZy5kYXRhSWRdO1xuICAgIG5ld0xheWVyLnVwZGF0ZUxheWVyRG9tYWluKGRhdGFzZXQpO1xuICB9XG5cbiAgY29uc3Qge2xheWVyRGF0YSwgbGF5ZXJ9ID0gY2FsY3VsYXRlTGF5ZXJEYXRhKG5ld0xheWVyLCBzdGF0ZSk7XG5cbiAgbGV0IG5ld1N0YXRlID0gc3RhdGU7XG5cbiAgLy8gdXBkYXRlIHNwbGl0TWFwIGxheWVyIGlkXG4gIGlmIChzdGF0ZS5zcGxpdE1hcHMpIHtcbiAgICBuZXdTdGF0ZSA9IHtcbiAgICAgIC4uLnN0YXRlLFxuICAgICAgc3BsaXRNYXBzOiBzdGF0ZS5zcGxpdE1hcHMubWFwKHNldHRpbmdzID0+IHtcbiAgICAgICAgY29uc3Qge1tvbGRJZF06IG9sZExheWVyTWFwLCAuLi5vdGhlckxheWVyc30gPSBzZXR0aW5ncy5sYXllcnM7XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgLi4uc2V0dGluZ3MsXG4gICAgICAgICAgbGF5ZXJzOiB7XG4gICAgICAgICAgICAuLi5vdGhlckxheWVycyxcbiAgICAgICAgICAgIFtsYXllci5pZF06IG9sZExheWVyTWFwXG4gICAgICAgICAgfVxuICAgICAgICB9O1xuICAgICAgfSlcbiAgICB9O1xuICB9XG5cbiAgcmV0dXJuIHVwZGF0ZVN0YXRlV2l0aExheWVyQW5kRGF0YShuZXdTdGF0ZSwge2xheWVyRGF0YSwgbGF5ZXIsIGlkeH0pO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gbGF5ZXJWaXN1YWxDaGFubmVsQ2hhbmdlVXBkYXRlcihzdGF0ZSwgYWN0aW9uKSB7XG4gIGNvbnN0IHtvbGRMYXllciwgbmV3Q29uZmlnLCBjaGFubmVsfSA9IGFjdGlvbjtcbiAgY29uc3QgZGF0YXNldCA9IHN0YXRlLmRhdGFzZXRzW29sZExheWVyLmNvbmZpZy5kYXRhSWRdO1xuXG4gIGNvbnN0IGlkeCA9IHN0YXRlLmxheWVycy5maW5kSW5kZXgobCA9PiBsLmlkID09PSBvbGRMYXllci5pZCk7XG4gIGNvbnN0IG5ld0xheWVyID0gb2xkTGF5ZXIudXBkYXRlTGF5ZXJDb25maWcobmV3Q29uZmlnKTtcblxuICBuZXdMYXllci51cGRhdGVMYXllclZpc3VhbENoYW5uZWwoZGF0YXNldCwgY2hhbm5lbCk7XG5cbiAgY29uc3Qgb2xkTGF5ZXJEYXRhID0gc3RhdGUubGF5ZXJEYXRhW2lkeF07XG4gIGNvbnN0IHtsYXllckRhdGEsIGxheWVyfSA9IGNhbGN1bGF0ZUxheWVyRGF0YShuZXdMYXllciwgc3RhdGUsIG9sZExheWVyRGF0YSwge1xuICAgIHNhbWVEYXRhOiB0cnVlXG4gIH0pO1xuXG4gIHJldHVybiB1cGRhdGVTdGF0ZVdpdGhMYXllckFuZERhdGEoc3RhdGUsIHtsYXllckRhdGEsIGxheWVyLCBpZHh9KTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGxheWVyVmlzQ29uZmlnQ2hhbmdlVXBkYXRlcihzdGF0ZSwgYWN0aW9uKSB7XG4gIGNvbnN0IHtvbGRMYXllcn0gPSBhY3Rpb247XG4gIGNvbnN0IGlkeCA9IHN0YXRlLmxheWVycy5maW5kSW5kZXgobCA9PiBsLmlkID09PSBvbGRMYXllci5pZCk7XG4gIGNvbnN0IHByb3BzID0gT2JqZWN0LmtleXMoYWN0aW9uLm5ld1Zpc0NvbmZpZyk7XG5cbiAgY29uc3QgbmV3VmlzQ29uZmlnID0ge1xuICAgIC4uLm9sZExheWVyLmNvbmZpZy52aXNDb25maWcsXG4gICAgLi4uYWN0aW9uLm5ld1Zpc0NvbmZpZ1xuICB9O1xuXG4gIGNvbnN0IG5ld0xheWVyID0gb2xkTGF5ZXIudXBkYXRlTGF5ZXJDb25maWcoe3Zpc0NvbmZpZzogbmV3VmlzQ29uZmlnfSk7XG5cbiAgaWYgKG5ld0xheWVyLnNob3VsZENhbGN1bGF0ZUxheWVyRGF0YShwcm9wcykpIHtcbiAgICBjb25zdCBvbGRMYXllckRhdGEgPSBzdGF0ZS5sYXllckRhdGFbaWR4XTtcbiAgICBjb25zdCB7bGF5ZXJEYXRhLCBsYXllcn0gPSBjYWxjdWxhdGVMYXllckRhdGEoXG4gICAgICBuZXdMYXllcixcbiAgICAgIHN0YXRlLFxuICAgICAgb2xkTGF5ZXJEYXRhLFxuICAgICAge3NhbWVEYXRhOiB0cnVlfVxuICAgICk7XG4gICAgcmV0dXJuIHVwZGF0ZVN0YXRlV2l0aExheWVyQW5kRGF0YShzdGF0ZSwge2xheWVyRGF0YSwgbGF5ZXIsIGlkeH0pO1xuICB9XG5cbiAgcmV0dXJuIHVwZGF0ZVN0YXRlV2l0aExheWVyQW5kRGF0YShzdGF0ZSwge2xheWVyOiBuZXdMYXllciwgaWR4fSk7XG59XG5cbi8qIGVzbGludC1lbmFibGUgbWF4LXN0YXRlbWVudHMgKi9cblxuZXhwb3J0IGZ1bmN0aW9uIGludGVyYWN0aW9uQ29uZmlnQ2hhbmdlVXBkYXRlcihzdGF0ZSwgYWN0aW9uKSB7XG4gIGNvbnN0IHtjb25maWd9ID0gYWN0aW9uO1xuXG4gIGNvbnN0IGludGVyYWN0aW9uQ29uZmlnID0ge1xuICAgIC4uLnN0YXRlLmludGVyYWN0aW9uQ29uZmlnLFxuICAgIC4uLntbY29uZmlnLmlkXTogY29uZmlnfVxuICB9O1xuXG4gIGlmIChjb25maWcuZW5hYmxlZCAmJiAhc3RhdGUuaW50ZXJhY3Rpb25Db25maWdbY29uZmlnLmlkXS5lbmFibGVkKSB7XG4gICAgLy8gb25seSBlbmFibGUgb25lIGludGVyYWN0aW9uIGF0IGEgdGltZVxuICAgIE9iamVjdC5rZXlzKGludGVyYWN0aW9uQ29uZmlnKS5mb3JFYWNoKGsgPT4ge1xuICAgICAgaWYgKGsgIT09IGNvbmZpZy5pZCkge1xuICAgICAgICBpbnRlcmFjdGlvbkNvbmZpZ1trXSA9IHsuLi5pbnRlcmFjdGlvbkNvbmZpZ1trXSwgZW5hYmxlZDogZmFsc2V9O1xuICAgICAgfVxuICAgIH0pO1xuICB9XG5cbiAgcmV0dXJuIHtcbiAgICAuLi5zdGF0ZSxcbiAgICBpbnRlcmFjdGlvbkNvbmZpZ1xuICB9O1xufVxuXG5leHBvcnQgZnVuY3Rpb24gc2V0RmlsdGVyVXBkYXRlcihzdGF0ZSwgYWN0aW9uKSB7XG4gIGNvbnN0IHtpZHgsIHByb3AsIHZhbHVlfSA9IGFjdGlvbjtcbiAgbGV0IG5ld1N0YXRlID0gc3RhdGU7XG4gIGxldCBuZXdGaWx0ZXIgPSB7XG4gICAgLi4uc3RhdGUuZmlsdGVyc1tpZHhdLFxuICAgIFtwcm9wXTogdmFsdWVcbiAgfTtcblxuICBjb25zdCB7ZGF0YUlkfSA9IG5ld0ZpbHRlcjtcbiAgaWYgKCFkYXRhSWQpIHtcbiAgICByZXR1cm4gc3RhdGU7XG4gIH1cbiAgY29uc3Qge2ZpZWxkcywgYWxsRGF0YX0gPSBzdGF0ZS5kYXRhc2V0c1tkYXRhSWRdO1xuXG4gIHN3aXRjaCAocHJvcCkge1xuICAgIGNhc2UgJ2RhdGFJZCc6XG4gICAgICAvLyBpZiB0cnlpbmcgdG8gdXBkYXRlIGZpbHRlciBkYXRhSWQuIGNyZWF0ZSBhbiBlbXB0eSBuZXcgZmlsdGVyXG4gICAgICBuZXdGaWx0ZXIgPSBnZXREZWZhdWx0RmlsdGVyKGRhdGFJZCk7XG4gICAgICBicmVhaztcblxuICAgIGNhc2UgJ25hbWUnOlxuICAgICAgLy8gZmluZCB0aGUgZmllbGRcbiAgICAgIGNvbnN0IGZpZWxkSWR4ID0gZmllbGRzLmZpbmRJbmRleChmID0+IGYubmFtZSA9PT0gdmFsdWUpO1xuICAgICAgbGV0IGZpZWxkID0gZmllbGRzW2ZpZWxkSWR4XTtcblxuICAgICAgaWYgKCFmaWVsZC5maWx0ZXJQcm9wKSB7XG4gICAgICAgIC8vIGdldCBmaWx0ZXIgZG9tYWluIGZyb20gZmllbGRcbiAgICAgICAgLy8gc2F2ZSBmaWx0ZXJQcm9wczoge2RvbWFpbiwgc3RlcHMsIHZhbHVlfSB0byBmaWVsZCwgYXZvaWQgcmVjYWxjdWxhdGVcbiAgICAgICAgZmllbGQgPSB7XG4gICAgICAgICAgLi4uZmllbGQsXG4gICAgICAgICAgZmlsdGVyUHJvcDogZ2V0RmlsdGVyUHJvcHMoYWxsRGF0YSwgZmllbGQpXG4gICAgICAgIH07XG4gICAgICB9XG5cbiAgICAgIG5ld0ZpbHRlciA9IHtcbiAgICAgICAgLi4ubmV3RmlsdGVyLFxuICAgICAgICAuLi5maWVsZC5maWx0ZXJQcm9wLFxuICAgICAgICBuYW1lOiBmaWVsZC5uYW1lLFxuICAgICAgICAvLyBjYW4ndCBlZGl0IGRhdGFJZCBvbmNlIG5hbWUgaXMgc2VsZWN0ZWRcbiAgICAgICAgZnJlZXplOiB0cnVlLFxuICAgICAgICBmaWVsZElkeFxuICAgICAgfTtcbiAgICAgIGNvbnN0IGVubGFyZ2VkRmlsdGVySWR4ID0gc3RhdGUuZmlsdGVycy5maW5kSW5kZXgoZiA9PiBmLmVubGFyZ2VkKTtcbiAgICAgIGlmIChlbmxhcmdlZEZpbHRlcklkeCA+IC0xICYmIGVubGFyZ2VkRmlsdGVySWR4ICE9PSBpZHgpIHtcbiAgICAgICAgLy8gdGhlcmUgc2hvdWxkIGJlIG9ubHkgb25lIGVubGFyZ2VkIGZpbHRlclxuICAgICAgICBuZXdGaWx0ZXIuZW5sYXJnZWQgPSBmYWxzZTtcbiAgICAgIH1cblxuICAgICAgbmV3U3RhdGUgPSB7XG4gICAgICAgIC4uLnN0YXRlLFxuICAgICAgICBkYXRhc2V0czoge1xuICAgICAgICAgIC4uLnN0YXRlLmRhdGFzZXRzLFxuICAgICAgICAgIFtkYXRhSWRdOiB7XG4gICAgICAgICAgICAuLi5zdGF0ZS5kYXRhc2V0c1tkYXRhSWRdLFxuICAgICAgICAgICAgZmllbGRzOiBmaWVsZHMubWFwKChkLCBpKSA9PiAoaSA9PT0gZmllbGRJZHggPyBmaWVsZCA6IGQpKVxuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfTtcbiAgICAgIGJyZWFrO1xuICAgIGNhc2UgJ3ZhbHVlJzpcbiAgICBkZWZhdWx0OlxuICAgICAgYnJlYWs7XG4gIH1cblxuICAvLyBzYXZlIG5ldyBmaWx0ZXJzIHRvIG5ld1N0YXRlXG4gIG5ld1N0YXRlID0ge1xuICAgIC4uLm5ld1N0YXRlLFxuICAgIGZpbHRlcnM6IHN0YXRlLmZpbHRlcnMubWFwKChmLCBpKSA9PiAoaSA9PT0gaWR4ID8gbmV3RmlsdGVyIDogZikpXG4gIH07XG5cbiAgLy8gZmlsdGVyIGRhdGFcbiAgbmV3U3RhdGUgPSB7XG4gICAgLi4ubmV3U3RhdGUsXG4gICAgZGF0YXNldHM6IHtcbiAgICAgIC4uLm5ld1N0YXRlLmRhdGFzZXRzLFxuICAgICAgW2RhdGFJZF06IHtcbiAgICAgICAgLi4ubmV3U3RhdGUuZGF0YXNldHNbZGF0YUlkXSxcbiAgICAgICAgLi4uZmlsdGVyRGF0YShhbGxEYXRhLCBkYXRhSWQsIG5ld1N0YXRlLmZpbHRlcnMpXG4gICAgICB9XG4gICAgfVxuICB9O1xuXG4gIG5ld1N0YXRlID0gdXBkYXRlQWxsTGF5ZXJEb21haW5EYXRhKG5ld1N0YXRlLCBkYXRhSWQsIG5ld0ZpbHRlcik7XG5cbiAgcmV0dXJuIG5ld1N0YXRlO1xufVxuXG5leHBvcnQgY29uc3Qgc2V0RmlsdGVyUGxvdFVwZGF0ZXIgPSAoc3RhdGUsIHtpZHgsIG5ld1Byb3B9KSA9PiB7XG4gIGxldCBuZXdGaWx0ZXIgPSB7Li4uc3RhdGUuZmlsdGVyc1tpZHhdLCAuLi5uZXdQcm9wfTtcbiAgY29uc3QgcHJvcCA9IE9iamVjdC5rZXlzKG5ld1Byb3ApWzBdO1xuICBpZiAocHJvcCA9PT0gJ3lBeGlzJykge1xuICAgIGNvbnN0IHBsb3RUeXBlID0gZ2V0RGVmYXVsdEZpbHRlclBsb3RUeXBlKG5ld0ZpbHRlcik7XG5cbiAgICBpZiAocGxvdFR5cGUpIHtcbiAgICAgIG5ld0ZpbHRlciA9IHtcbiAgICAgICAgLi4ubmV3RmlsdGVyLFxuICAgICAgICAuLi5nZXRGaWx0ZXJQbG90KFxuICAgICAgICAgIHsuLi5uZXdGaWx0ZXIsIHBsb3RUeXBlfSxcbiAgICAgICAgICBzdGF0ZS5kYXRhc2V0c1tuZXdGaWx0ZXIuZGF0YUlkXS5hbGxEYXRhXG4gICAgICAgICksXG4gICAgICAgIHBsb3RUeXBlXG4gICAgICB9O1xuICAgIH1cbiAgfVxuXG4gIHJldHVybiB7XG4gICAgLi4uc3RhdGUsXG4gICAgZmlsdGVyczogc3RhdGUuZmlsdGVycy5tYXAoKGYsIGkpID0+IChpID09PSBpZHggPyBuZXdGaWx0ZXIgOiBmKSlcbiAgfTtcbn07XG5cbmV4cG9ydCBjb25zdCBhZGRGaWx0ZXJVcGRhdGVyID0gKHN0YXRlLCBhY3Rpb24pID0+XG4gICFhY3Rpb24uZGF0YUlkXG4gICAgPyBzdGF0ZVxuICAgIDoge1xuICAgICAgICAuLi5zdGF0ZSxcbiAgICAgICAgZmlsdGVyczogWy4uLnN0YXRlLmZpbHRlcnMsIGdldERlZmF1bHRGaWx0ZXIoYWN0aW9uLmRhdGFJZCldXG4gICAgICB9O1xuXG5leHBvcnQgY29uc3QgdG9nZ2xlRmlsdGVyQW5pbWF0aW9uVXBkYXRlciA9IChzdGF0ZSwgYWN0aW9uKSA9PiAoe1xuICAuLi5zdGF0ZSxcbiAgZmlsdGVyczogc3RhdGUuZmlsdGVycy5tYXAoXG4gICAgKGYsIGkpID0+IChpID09PSBhY3Rpb24uaWR4ID8gey4uLmYsIGlzQW5pbWF0aW5nOiAhZi5pc0FuaW1hdGluZ30gOiBmKVxuICApXG59KTtcblxuZXhwb3J0IGNvbnN0IHVwZGF0ZUFuaW1hdGlvblNwZWVkVXBkYXRlciA9IChzdGF0ZSwgYWN0aW9uKSA9PiAoe1xuICAuLi5zdGF0ZSxcbiAgZmlsdGVyczogc3RhdGUuZmlsdGVycy5tYXAoXG4gICAgKGYsIGkpID0+IChpID09PSBhY3Rpb24uaWR4ID8gey4uLmYsIHNwZWVkOiBhY3Rpb24uc3BlZWR9IDogZilcbiAgKVxufSk7XG5cbmV4cG9ydCBjb25zdCBlbmxhcmdlRmlsdGVyVXBkYXRlciA9IChzdGF0ZSwgYWN0aW9uKSA9PiB7XG4gIGNvbnN0IGlzRW5sYXJnZWQgPSBzdGF0ZS5maWx0ZXJzW2FjdGlvbi5pZHhdLmVubGFyZ2VkO1xuXG4gIHJldHVybiB7XG4gICAgLi4uc3RhdGUsXG4gICAgZmlsdGVyczogc3RhdGUuZmlsdGVycy5tYXAoKGYsIGkpID0+IHtcbiAgICAgIGYuZW5sYXJnZWQgPSAhaXNFbmxhcmdlZCAmJiBpID09PSBhY3Rpb24uaWR4O1xuICAgICAgcmV0dXJuIGY7XG4gICAgfSlcbiAgfTtcbn07XG5cbmV4cG9ydCBjb25zdCByZW1vdmVGaWx0ZXJVcGRhdGVyID0gKHN0YXRlLCBhY3Rpb24pID0+IHtcbiAgY29uc3Qge2lkeH0gPSBhY3Rpb247XG4gIGNvbnN0IHtkYXRhSWR9ID0gc3RhdGUuZmlsdGVyc1tpZHhdO1xuXG4gIGNvbnN0IG5ld0ZpbHRlcnMgPSBbXG4gICAgLi4uc3RhdGUuZmlsdGVycy5zbGljZSgwLCBpZHgpLFxuICAgIC4uLnN0YXRlLmZpbHRlcnMuc2xpY2UoaWR4ICsgMSwgc3RhdGUuZmlsdGVycy5sZW5ndGgpXG4gIF07XG5cbiAgY29uc3QgbmV3U3RhdGUgPSB7XG4gICAgLi4uc3RhdGUsXG4gICAgZGF0YXNldHM6IHtcbiAgICAgIC4uLnN0YXRlLmRhdGFzZXRzLFxuICAgICAgW2RhdGFJZF06IHtcbiAgICAgICAgLi4uc3RhdGUuZGF0YXNldHNbZGF0YUlkXSxcbiAgICAgICAgLi4uZmlsdGVyRGF0YShzdGF0ZS5kYXRhc2V0c1tkYXRhSWRdLmFsbERhdGEsIGRhdGFJZCwgbmV3RmlsdGVycylcbiAgICAgIH1cbiAgICB9LFxuICAgIGZpbHRlcnM6IG5ld0ZpbHRlcnNcbiAgfTtcblxuICByZXR1cm4gdXBkYXRlQWxsTGF5ZXJEb21haW5EYXRhKG5ld1N0YXRlLCBkYXRhSWQpO1xufTtcblxuZXhwb3J0IGNvbnN0IGFkZExheWVyVXBkYXRlciA9IChzdGF0ZSwgYWN0aW9uKSA9PiB7XG4gIGNvbnN0IGRlZmF1bHREYXRhc2V0ID0gT2JqZWN0LmtleXMoc3RhdGUuZGF0YXNldHMpWzBdO1xuICBjb25zdCBuZXdMYXllciA9IG5ldyBMYXllcih7XG4gICAgaXNWaXNpYmxlOiB0cnVlLFxuICAgIGlzQ29uZmlnQWN0aXZlOiB0cnVlLFxuICAgIGRhdGFJZDogZGVmYXVsdERhdGFzZXQsXG4gICAgLi4uYWN0aW9uLnByb3BzXG4gIH0pO1xuXG4gIHJldHVybiB7XG4gICAgLi4uc3RhdGUsXG4gICAgbGF5ZXJzOiBbLi4uc3RhdGUubGF5ZXJzLCBuZXdMYXllcl0sXG4gICAgbGF5ZXJEYXRhOiBbLi4uc3RhdGUubGF5ZXJEYXRhLCB7fV0sXG4gICAgbGF5ZXJPcmRlcjogWy4uLnN0YXRlLmxheWVyT3JkZXIsIHN0YXRlLmxheWVyT3JkZXIubGVuZ3RoXSxcbiAgICBzcGxpdE1hcHM6IGFkZE5ld0xheWVyc1RvU3BsaXRNYXAoc3RhdGUuc3BsaXRNYXBzLCBuZXdMYXllcilcbiAgfTtcbn07XG5cbmV4cG9ydCBjb25zdCByZW1vdmVMYXllclVwZGF0ZXIgPSAoc3RhdGUsIHtpZHh9KSA9PiB7XG4gIGNvbnN0IHtsYXllcnMsIGxheWVyRGF0YSwgY2xpY2tlZCwgaG92ZXJJbmZvfSA9IHN0YXRlO1xuICBjb25zdCBsYXllclRvUmVtb3ZlID0gc3RhdGUubGF5ZXJzW2lkeF07XG4gIGNvbnN0IG5ld01hcHMgPSByZW1vdmVMYXllckZyb21TcGxpdE1hcHMoc3RhdGUsIGxheWVyVG9SZW1vdmUpO1xuXG4gIHJldHVybiB7XG4gICAgLi4uc3RhdGUsXG4gICAgbGF5ZXJzOiBbLi4ubGF5ZXJzLnNsaWNlKDAsIGlkeCksIC4uLmxheWVycy5zbGljZShpZHggKyAxLCBsYXllcnMubGVuZ3RoKV0sXG4gICAgbGF5ZXJEYXRhOiBbXG4gICAgICAuLi5sYXllckRhdGEuc2xpY2UoMCwgaWR4KSxcbiAgICAgIC4uLmxheWVyRGF0YS5zbGljZShpZHggKyAxLCBsYXllckRhdGEubGVuZ3RoKVxuICAgIF0sXG4gICAgbGF5ZXJPcmRlcjogc3RhdGUubGF5ZXJPcmRlclxuICAgICAgLmZpbHRlcihpID0+IGkgIT09IGlkeClcbiAgICAgIC5tYXAocGlkID0+IChwaWQgPiBpZHggPyBwaWQgLSAxIDogcGlkKSksXG4gICAgY2xpY2tlZDogbGF5ZXJUb1JlbW92ZS5pc0xheWVySG92ZXJlZChjbGlja2VkKSA/IHVuZGVmaW5lZCA6IGNsaWNrZWQsXG4gICAgaG92ZXJJbmZvOiBsYXllclRvUmVtb3ZlLmlzTGF5ZXJIb3ZlcmVkKGhvdmVySW5mbykgPyB1bmRlZmluZWQgOiBob3ZlckluZm8sXG4gICAgc3BsaXRNYXBzOiBuZXdNYXBzXG4gIH07XG59O1xuXG5leHBvcnQgY29uc3QgcmVvcmRlckxheWVyVXBkYXRlciA9IChzdGF0ZSwge29yZGVyfSkgPT4gKHtcbiAgLi4uc3RhdGUsXG4gIGxheWVyT3JkZXI6IG9yZGVyXG59KTtcblxuZXhwb3J0IGNvbnN0IHJlbW92ZURhdGFzZXRVcGRhdGVyID0gKHN0YXRlLCBhY3Rpb24pID0+IHtcbiAgLy8gZXh0cmFjdCBkYXRhc2V0IGtleVxuICBjb25zdCB7a2V5OiBkYXRhc2V0S2V5fSA9IGFjdGlvbjtcbiAgY29uc3Qge2RhdGFzZXRzfSA9IHN0YXRlO1xuXG4gIC8vIGNoZWNrIGlmIGRhdGFzZXQgaXMgcHJlc2VudFxuICBpZiAoIWRhdGFzZXRzW2RhdGFzZXRLZXldKSB7XG4gICAgcmV0dXJuIHN0YXRlO1xuICB9XG5cbiAgLyogZXNsaW50LWRpc2FibGUgbm8tdW51c2VkLXZhcnMgKi9cbiAgY29uc3Qge1xuICAgIGxheWVycyxcbiAgICBkYXRhc2V0czoge1tkYXRhc2V0S2V5XTogZGF0YXNldCwgLi4ubmV3RGF0YXNldHN9XG4gIH0gPSBzdGF0ZTtcbiAgLyogZXNsaW50LWVuYWJsZSBuby11bnVzZWQtdmFycyAqL1xuXG4gIGNvbnN0IGluZGV4ZXMgPSBsYXllcnMucmVkdWNlKChsaXN0T2ZJbmRleGVzLCBsYXllciwgaW5kZXgpID0+IHtcbiAgICBpZiAobGF5ZXIuY29uZmlnLmRhdGFJZCA9PT0gZGF0YXNldEtleSkge1xuICAgICAgbGlzdE9mSW5kZXhlcy5wdXNoKGluZGV4KTtcbiAgICB9XG4gICAgcmV0dXJuIGxpc3RPZkluZGV4ZXM7XG4gIH0sIFtdKTtcblxuICAvLyByZW1vdmUgbGF5ZXJzIGFuZCBkYXRhc2V0c1xuICBjb25zdCB7bmV3U3RhdGV9ID0gaW5kZXhlcy5yZWR1Y2UoXG4gICAgKHtuZXdTdGF0ZTogY3VycmVudFN0YXRlLCBpbmRleENvdW50ZXJ9LCBpZHgpID0+IHtcbiAgICAgIGNvbnN0IGN1cnJlbnRJbmRleCA9IGlkeCAtIGluZGV4Q291bnRlcjtcbiAgICAgIGN1cnJlbnRTdGF0ZSA9IHJlbW92ZUxheWVyVXBkYXRlcihjdXJyZW50U3RhdGUsIHtpZHg6IGN1cnJlbnRJbmRleH0pO1xuICAgICAgaW5kZXhDb3VudGVyKys7XG4gICAgICByZXR1cm4ge25ld1N0YXRlOiBjdXJyZW50U3RhdGUsIGluZGV4Q291bnRlcn07XG4gICAgfSxcbiAgICB7bmV3U3RhdGU6IHsuLi5zdGF0ZSwgZGF0YXNldHM6IG5ld0RhdGFzZXRzfSwgaW5kZXhDb3VudGVyOiAwfVxuICApO1xuXG4gIC8vIHJlbW92ZSBmaWx0ZXJzXG4gIGNvbnN0IGZpbHRlcnMgPSBzdGF0ZS5maWx0ZXJzLmZpbHRlcihmaWx0ZXIgPT4gZmlsdGVyLmRhdGFJZCAhPT0gZGF0YXNldEtleSk7XG5cbiAgLy8gdXBkYXRlIGludGVyYWN0aW9uQ29uZmlnXG4gIGxldCB7aW50ZXJhY3Rpb25Db25maWd9ID0gc3RhdGU7XG4gIGNvbnN0IHt0b29sdGlwfSA9IGludGVyYWN0aW9uQ29uZmlnO1xuICBpZiAodG9vbHRpcCkge1xuICAgIGNvbnN0IHtjb25maWd9ID0gdG9vbHRpcDtcbiAgICAvKiBlc2xpbnQtZGlzYWJsZSBuby11bnVzZWQtdmFycyAqL1xuICAgIGNvbnN0IHtbZGF0YXNldEtleV06IGZpZWxkcywgLi4uZmllbGRzVG9TaG93fSA9IGNvbmZpZy5maWVsZHNUb1Nob3c7XG4gICAgLyogZXNsaW50LWVuYWJsZSBuby11bnVzZWQtdmFycyAqL1xuICAgIGludGVyYWN0aW9uQ29uZmlnID0ge1xuICAgICAgLi4uaW50ZXJhY3Rpb25Db25maWcsXG4gICAgICB0b29sdGlwOiB7Li4udG9vbHRpcCwgY29uZmlnOiB7Li4uY29uZmlnLCBmaWVsZHNUb1Nob3d9fVxuICAgIH07XG4gIH1cblxuICByZXR1cm4gey4uLm5ld1N0YXRlLCBmaWx0ZXJzLCBpbnRlcmFjdGlvbkNvbmZpZ307XG59O1xuXG5leHBvcnQgY29uc3QgdXBkYXRlTGF5ZXJCbGVuZGluZ1VwZGF0ZXIgPSAoc3RhdGUsIGFjdGlvbikgPT4gKHtcbiAgLi4uc3RhdGUsXG4gIGxheWVyQmxlbmRpbmc6IGFjdGlvbi5tb2RlXG59KTtcblxuZXhwb3J0IGNvbnN0IHNob3dEYXRhc2V0VGFibGVVcGRhdGVyID0gKHN0YXRlLCBhY3Rpb24pID0+IHtcbiAgcmV0dXJuIHtcbiAgICAuLi5zdGF0ZSxcbiAgICBlZGl0aW5nRGF0YXNldDogYWN0aW9uLmRhdGFJZFxuICB9O1xufTtcblxuZXhwb3J0IGNvbnN0IHJlc2V0TWFwQ29uZmlnVmlzU3RhdGVVcGRhdGVyID0gKHN0YXRlLCBhY3Rpb24pID0+ICh7XG4gIC4uLklOSVRJQUxfVklTX1NUQVRFLFxuICAuLi5zdGF0ZS5pbml0aWFsU3RhdGUsXG4gIGluaXRpYWxTdGF0ZTogc3RhdGUuaW5pdGlhbFN0YXRlXG59KTtcblxuLyoqXG4gKiBMb2FkcyBjdXN0b20gY29uZmlndXJhdGlvbiBpbnRvIHN0YXRlXG4gKiBAcGFyYW0gc3RhdGVcbiAqIEBwYXJhbSBhY3Rpb25cbiAqIEByZXR1cm5zIHsqfVxuICovXG5leHBvcnQgY29uc3QgcmVjZWl2ZU1hcENvbmZpZ1VwZGF0ZXIgPSAoc3RhdGUsIGFjdGlvbikgPT4ge1xuICBpZiAoIWFjdGlvbi5wYXlsb2FkLnZpc1N0YXRlKSB7XG4gICAgcmV0dXJuIHN0YXRlO1xuICB9XG5cbiAgY29uc3Qge1xuICAgIGZpbHRlcnMsXG4gICAgbGF5ZXJzLFxuICAgIGludGVyYWN0aW9uQ29uZmlnLFxuICAgIGxheWVyQmxlbmRpbmcsXG4gICAgc3BsaXRNYXBzXG4gIH0gPSBhY3Rpb24ucGF5bG9hZC52aXNTdGF0ZTtcblxuICAvLyBhbHdheXMgcmVzZXQgY29uZmlnIHdoZW4gcmVjZWl2ZSBhIG5ldyBjb25maWdcbiAgY29uc3QgcmVzZXRTdGF0ZSA9IHJlc2V0TWFwQ29uZmlnVmlzU3RhdGVVcGRhdGVyKHN0YXRlKTtcbiAgbGV0IG1lcmdlZFN0YXRlID0ge1xuICAgIC4uLnJlc2V0U3RhdGUsXG4gICAgc3BsaXRNYXBzOiBzcGxpdE1hcHMgfHwgW10gLy8gbWFwcyBkb2Vzbid0IHJlcXVpcmUgYW55IGxvZ2ljXG4gIH07XG5cbiAgbWVyZ2VkU3RhdGUgPSBtZXJnZUZpbHRlcnMobWVyZ2VkU3RhdGUsIGZpbHRlcnMpO1xuICBtZXJnZWRTdGF0ZSA9IG1lcmdlTGF5ZXJzKG1lcmdlZFN0YXRlLCBsYXllcnMpO1xuICBtZXJnZWRTdGF0ZSA9IG1lcmdlSW50ZXJhY3Rpb25zKG1lcmdlZFN0YXRlLCBpbnRlcmFjdGlvbkNvbmZpZyk7XG4gIG1lcmdlZFN0YXRlID0gbWVyZ2VMYXllckJsZW5kaW5nKG1lcmdlZFN0YXRlLCBsYXllckJsZW5kaW5nKTtcblxuICByZXR1cm4gbWVyZ2VkU3RhdGU7XG59O1xuXG5leHBvcnQgY29uc3QgbGF5ZXJIb3ZlclVwZGF0ZXIgPSAoc3RhdGUsIGFjdGlvbikgPT4gKHtcbiAgLi4uc3RhdGUsXG4gIGhvdmVySW5mbzogYWN0aW9uLmluZm9cbn0pO1xuXG5leHBvcnQgY29uc3QgbGF5ZXJDbGlja1VwZGF0ZXIgPSAoc3RhdGUsIGFjdGlvbikgPT4gKHtcbiAgLi4uc3RhdGUsXG4gIGNsaWNrZWQ6IGFjdGlvbi5pbmZvICYmIGFjdGlvbi5pbmZvLnBpY2tlZCA/IGFjdGlvbi5pbmZvIDogbnVsbFxufSk7XG5cbmV4cG9ydCBjb25zdCBtYXBDbGlja1VwZGF0ZXIgPSAoc3RhdGUsIGFjdGlvbikgPT4gKHtcbiAgLi4uc3RhdGUsXG4gIGNsaWNrZWQ6IG51bGxcbn0pO1xuXG5leHBvcnQgY29uc3QgdG9nZ2xlU3BsaXRNYXBVcGRhdGVyID0gKHN0YXRlLCBhY3Rpb24pID0+XG4gIHN0YXRlLnNwbGl0TWFwcyAmJiBzdGF0ZS5zcGxpdE1hcHMubGVuZ3RoID09PSAwXG4gICAgPyB7XG4gICAgICAgIC4uLnN0YXRlLFxuICAgICAgICAvLyBtYXliZSB3ZSBzaG91bGQgdXNlIGFuIGFycmF5IHRvIHN0b3JlIHN0YXRlIGZvciBhIHNpbmdsZSBtYXAgYXMgd2VsbFxuICAgICAgICAvLyBpZiBjdXJyZW50IG1hcHMgbGVuZ3RoIGlzIGVxdWFsIHRvIDAgaXQgbWVhbnMgdGhhdCB3ZSBhcmUgYWJvdXQgdG8gc3BsaXQgdGhlIHZpZXdcbiAgICAgICAgc3BsaXRNYXBzOiBjb21wdXRlU3BsaXRNYXBMYXllcnMoc3RhdGUubGF5ZXJzKVxuICAgICAgfVxuICAgIDogY2xvc2VTcGVjaWZpY01hcEF0SW5kZXgoc3RhdGUsIGFjdGlvbik7XG5cbi8qKlxuICogVGhpcyBpcyB0cmlnZ2VyZWQgd2hlbiB2aWV3IGlzIHNwbGl0IGludG8gbXVsdGlwbGUgbWFwcy5cbiAqIEl0IHdpbGwgb25seSB1cGRhdGUgbGF5ZXJzIHRoYXQgYmVsb25nIHRvIHRoZSBtYXAgbGF5ZXIgZHJvcGRvd25cbiAqIHRoZSB1c2VyIGlzIGludGVyYWN0aW5nIHdpdFxuICogQHBhcmFtIHN0YXRlXG4gKiBAcGFyYW0gYWN0aW9uXG4gKi9cbmV4cG9ydCBjb25zdCBzZXRWaXNpYmxlTGF5ZXJzRm9yTWFwVXBkYXRlciA9IChzdGF0ZSwgYWN0aW9uKSA9PiB7XG4gIGNvbnN0IHttYXBJbmRleCwgbGF5ZXJJZHN9ID0gYWN0aW9uO1xuICBpZiAoIWxheWVySWRzKSB7XG4gICAgcmV0dXJuIHN0YXRlO1xuICB9XG5cbiAgY29uc3Qge3NwbGl0TWFwcyA9IFtdfSA9IHN0YXRlO1xuXG4gIGlmIChzcGxpdE1hcHMubGVuZ3RoID09PSAwKSB7XG4gICAgLy8gd2Ugc2hvdWxkIG5ldmVyIGdldCBpbnRvIHRoaXMgc3RhdGVcbiAgICAvLyBiZWNhdXNlIHRoaXMgYWN0aW9uIHNob3VsZCBvbmx5IGJlIHRyaWdnZXJlZFxuICAgIC8vIHdoZW4gbWFwIHZpZXcgaXMgc3BsaXRcbiAgICAvLyBidXQgc29tZXRoaW5nIG1heSBoYXZlIGhhcHBlbmVkXG4gICAgcmV0dXJuIHN0YXRlO1xuICB9XG5cbiAgLy8gbmVlZCB0byBjaGVjayBpZiBtYXBzIGlzIHBvcHVsYXRlZCBvdGhlcndpc2Ugd2lsbCBjcmVhdGVcbiAgY29uc3Qge1ttYXBJbmRleF06IG1hcCA9IHt9fSA9IHNwbGl0TWFwcztcblxuICBjb25zdCBsYXllcnMgPSBtYXAubGF5ZXJzIHx8IFtdO1xuXG4gIC8vIHdlIHNldCB2aXNpYmlsaXR5IHRvIHRydWUgZm9yIGFsbCBsYXllcnMgaW5jbHVkZWQgaW4gb3VyIGlucHV0IGxpc3RcbiAgY29uc3QgbmV3TGF5ZXJzID0gKE9iamVjdC5rZXlzKGxheWVycykgfHwgW10pLnJlZHVjZSgoY3VycmVudExheWVycywgaWR4KSA9PiB7XG4gICAgcmV0dXJuIHtcbiAgICAgIC4uLmN1cnJlbnRMYXllcnMsXG4gICAgICBbaWR4XToge1xuICAgICAgICAuLi5sYXllcnNbaWR4XSxcbiAgICAgICAgaXNWaXNpYmxlOiBsYXllcklkcy5pbmNsdWRlcyhpZHgpXG4gICAgICB9XG4gICAgfTtcbiAgfSwge30pO1xuXG4gIGNvbnN0IG5ld01hcHMgPSBbLi4uc3BsaXRNYXBzXTtcblxuICBuZXdNYXBzW21hcEluZGV4XSA9IHtcbiAgICAuLi5zcGxpdE1hcHNbbWFwSW5kZXhdLFxuICAgIGxheWVyczogbmV3TGF5ZXJzXG4gIH07XG5cbiAgcmV0dXJuIHtcbiAgICAuLi5zdGF0ZSxcbiAgICBzcGxpdE1hcHM6IG5ld01hcHNcbiAgfTtcbn07XG5cbmV4cG9ydCBjb25zdCB0b2dnbGVMYXllckZvck1hcFVwZGF0ZXIgPSAoc3RhdGUsIGFjdGlvbikgPT4ge1xuICBpZiAoIXN0YXRlLnNwbGl0TWFwc1thY3Rpb24ubWFwSW5kZXhdKSB7XG4gICAgcmV0dXJuIHN0YXRlO1xuICB9XG5cbiAgY29uc3QgbWFwU2V0dGluZ3MgPSBzdGF0ZS5zcGxpdE1hcHNbYWN0aW9uLm1hcEluZGV4XTtcbiAgY29uc3Qge2xheWVyc30gPSBtYXBTZXR0aW5ncztcbiAgaWYgKCFsYXllcnMgfHwgIWxheWVyc1thY3Rpb24ubGF5ZXJJZF0pIHtcbiAgICByZXR1cm4gc3RhdGU7XG4gIH1cblxuICBjb25zdCBsYXllciA9IGxheWVyc1thY3Rpb24ubGF5ZXJJZF07XG5cbiAgY29uc3QgbmV3TGF5ZXIgPSB7XG4gICAgLi4ubGF5ZXIsXG4gICAgaXNWaXNpYmxlOiAhbGF5ZXIuaXNWaXNpYmxlXG4gIH07XG5cbiAgY29uc3QgbmV3TGF5ZXJzID0ge1xuICAgIC4uLmxheWVycyxcbiAgICBbYWN0aW9uLmxheWVySWRdOiBuZXdMYXllclxuICB9O1xuXG4gIC8vIGNvbnN0IHNwbGl0TWFwcyA9IHN0YXRlLnNwbGl0TWFwcztcbiAgY29uc3QgbmV3U3BsaXRNYXBzID0gWy4uLnN0YXRlLnNwbGl0TWFwc107XG4gIG5ld1NwbGl0TWFwc1thY3Rpb24ubWFwSW5kZXhdID0ge1xuICAgIC4uLm1hcFNldHRpbmdzLFxuICAgIGxheWVyczogbmV3TGF5ZXJzXG4gIH07XG5cbiAgcmV0dXJuIHtcbiAgICAuLi5zdGF0ZSxcbiAgICBzcGxpdE1hcHM6IG5ld1NwbGl0TWFwc1xuICB9O1xufTtcblxuLyogZXNsaW50LWRpc2FibGUgbWF4LXN0YXRlbWVudHMgKi9cbmV4cG9ydCBjb25zdCB1cGRhdGVWaXNEYXRhVXBkYXRlciA9IChzdGF0ZSwgYWN0aW9uKSA9PiB7XG4gIC8vIGRhdGFzZXRzIGNhbiBiZSBhIHNpbmdsZSBkYXRhIGVudHJpZXMgb3IgYW4gYXJyYXkgb2YgbXVsdGlwbGUgZGF0YSBlbnRyaWVzXG4gIGNvbnN0IGRhdGFzZXRzID0gQXJyYXkuaXNBcnJheShhY3Rpb24uZGF0YXNldHMpXG4gICAgPyBhY3Rpb24uZGF0YXNldHNcbiAgICA6IFthY3Rpb24uZGF0YXNldHNdO1xuXG4gIGlmIChhY3Rpb24uY29uZmlnKSB7XG4gICAgLy8gYXBwbHkgY29uZmlnIGlmIHBhc3NlZCBmcm9tIGFjdGlvblxuICAgIHN0YXRlID0gcmVjZWl2ZU1hcENvbmZpZ1VwZGF0ZXIoc3RhdGUsIHtcbiAgICAgIHBheWxvYWQ6IHt2aXNTdGF0ZTogYWN0aW9uLmNvbmZpZ31cbiAgICB9KTtcbiAgfVxuXG4gIGNvbnN0IG5ld0RhdGVFbnRyaWVzID0gZGF0YXNldHMucmVkdWNlKFxuICAgIChhY2N1LCB7aW5mbyA9IHt9LCBkYXRhfSkgPT4gKHtcbiAgICAgIC4uLmFjY3UsXG4gICAgICAuLi4oY3JlYXRlTmV3RGF0YUVudHJ5KHtpbmZvLCBkYXRhfSwgc3RhdGUuZGF0YXNldHMpIHx8IHt9KVxuICAgIH0pLFxuICAgIHt9XG4gICk7XG5cbiAgaWYgKCFPYmplY3Qua2V5cyhuZXdEYXRlRW50cmllcykubGVuZ3RoKSB7XG4gICAgcmV0dXJuIHN0YXRlO1xuICB9XG5cbiAgY29uc3Qgc3RhdGVXaXRoTmV3RGF0YSA9IHtcbiAgICAuLi5zdGF0ZSxcbiAgICBkYXRhc2V0czoge1xuICAgICAgLi4uc3RhdGUuZGF0YXNldHMsXG4gICAgICAuLi5uZXdEYXRlRW50cmllc1xuICAgIH1cbiAgfTtcblxuICAvLyBwcmV2aW91c2x5IHNhdmVkIGNvbmZpZyBiZWZvcmUgZGF0YSBsb2FkZWRcbiAgY29uc3Qge1xuICAgIGZpbHRlclRvQmVNZXJnZWQgPSBbXSxcbiAgICBsYXllclRvQmVNZXJnZWQgPSBbXSxcbiAgICBpbnRlcmFjdGlvblRvQmVNZXJnZWQgPSB7fVxuICB9ID0gc3RhdGVXaXRoTmV3RGF0YTtcblxuICAvLyBtZXJnZSBzdGF0ZSB3aXRoIHNhdmVkIGZpbHRlcnNcbiAgbGV0IG1lcmdlZFN0YXRlID0gbWVyZ2VGaWx0ZXJzKHN0YXRlV2l0aE5ld0RhdGEsIGZpbHRlclRvQmVNZXJnZWQpO1xuICAvLyBtZXJnZSBzdGF0ZSB3aXRoIHNhdmVkIGxheWVyc1xuICBtZXJnZWRTdGF0ZSA9IG1lcmdlTGF5ZXJzKG1lcmdlZFN0YXRlLCBsYXllclRvQmVNZXJnZWQpO1xuXG4gIGlmIChtZXJnZWRTdGF0ZS5sYXllcnMubGVuZ3RoID09PSBzdGF0ZS5sYXllcnMubGVuZ3RoKSB7XG4gICAgLy8gbm8gbGF5ZXIgbWVyZ2VkLCBmaW5kIGRlZmF1bHRzXG4gICAgbWVyZ2VkU3RhdGUgPSBhZGREZWZhdWx0TGF5ZXJzKG1lcmdlZFN0YXRlLCBuZXdEYXRlRW50cmllcyk7XG4gIH1cblxuICBpZiAobWVyZ2VkU3RhdGUuc3BsaXRNYXBzLmxlbmd0aCkge1xuICAgIGNvbnN0IG5ld0xheWVycyA9IG1lcmdlZFN0YXRlLmxheWVycy5maWx0ZXIoXG4gICAgICBsID0+IGwuY29uZmlnLmRhdGFJZCBpbiBuZXdEYXRlRW50cmllc1xuICAgICk7XG4gICAgLy8gaWYgbWFwIGlzIHNwbGl0ZWQsIGFkZCBuZXcgbGF5ZXJzIHRvIHNwbGl0TWFwc1xuICAgIG1lcmdlZFN0YXRlID0ge1xuICAgICAgLi4ubWVyZ2VkU3RhdGUsXG4gICAgICBzcGxpdE1hcHM6IGFkZE5ld0xheWVyc1RvU3BsaXRNYXAobWVyZ2VkU3RhdGUuc3BsaXRNYXBzLCBuZXdMYXllcnMpXG4gICAgfTtcbiAgfVxuXG4gIC8vIG1lcmdlIHN0YXRlIHdpdGggc2F2ZWQgaW50ZXJhY3Rpb25zXG4gIG1lcmdlZFN0YXRlID0gbWVyZ2VJbnRlcmFjdGlvbnMobWVyZ2VkU3RhdGUsIGludGVyYWN0aW9uVG9CZU1lcmdlZCk7XG5cbiAgLy8gaWYgbm8gdG9vbHRpcHMgbWVyZ2VkIGFkZCBkZWZhdWx0IHRvb2x0aXBzXG4gIE9iamVjdC5rZXlzKG5ld0RhdGVFbnRyaWVzKS5mb3JFYWNoKGRhdGFJZCA9PiB7XG4gICAgY29uc3QgdG9vbHRpcEZpZWxkcyA9XG4gICAgICBtZXJnZWRTdGF0ZS5pbnRlcmFjdGlvbkNvbmZpZy50b29sdGlwLmNvbmZpZy5maWVsZHNUb1Nob3dbZGF0YUlkXTtcbiAgICBpZiAoIUFycmF5LmlzQXJyYXkodG9vbHRpcEZpZWxkcykgfHwgIXRvb2x0aXBGaWVsZHMubGVuZ3RoKSB7XG4gICAgICBtZXJnZWRTdGF0ZSA9IGFkZERlZmF1bHRUb29sdGlwcyhtZXJnZWRTdGF0ZSwgbmV3RGF0ZUVudHJpZXNbZGF0YUlkXSk7XG4gICAgfVxuICB9KTtcblxuICByZXR1cm4gdXBkYXRlQWxsTGF5ZXJEb21haW5EYXRhKG1lcmdlZFN0YXRlLCBPYmplY3Qua2V5cyhuZXdEYXRlRW50cmllcykpO1xufTtcbi8qIGVzbGludC1lbmFibGUgbWF4LXN0YXRlbWVudHMgKi9cblxuZnVuY3Rpb24gZ2VuZXJhdGVMYXllck1ldGFGb3JTcGxpdFZpZXdzKGxheWVyKSB7XG4gIHJldHVybiB7XG4gICAgaXNBdmFpbGFibGU6IGxheWVyLmNvbmZpZy5pc1Zpc2libGUsXG4gICAgaXNWaXNpYmxlOiBsYXllci5jb25maWcuaXNWaXNpYmxlXG4gIH07XG59XG5cbi8qKlxuICogVGhpcyBlbXRob2Qgd2lsbCBjb21wdXRlIHRoZSBkZWZhdWx0IG1hcHMgY3VzdG9tIGxpc3RcbiAqIGJhc2VkIG9uIHRoZSBjdXJyZW50IGxheWVycyBzdGF0dXNcbiAqIEBwYXJhbSBsYXllcnNcbiAqIEByZXR1cm5zIHtbKiwqXX1cbiAqL1xuZnVuY3Rpb24gY29tcHV0ZVNwbGl0TWFwTGF5ZXJzKGxheWVycykge1xuICBjb25zdCBtYXBMYXllcnMgPSBsYXllcnMucmVkdWNlKFxuICAgIChuZXdMYXllcnMsIGN1cnJlbnRMYXllcikgPT4gKHtcbiAgICAgIC4uLm5ld0xheWVycyxcbiAgICAgIFtjdXJyZW50TGF5ZXIuaWRdOiBnZW5lcmF0ZUxheWVyTWV0YUZvclNwbGl0Vmlld3MoY3VycmVudExheWVyKVxuICAgIH0pLFxuICAgIHt9XG4gICk7XG4gIHJldHVybiBbXG4gICAge1xuICAgICAgbGF5ZXJzOiBtYXBMYXllcnNcbiAgICB9LFxuICAgIHtcbiAgICAgIGxheWVyczogbWFwTGF5ZXJzXG4gICAgfVxuICBdO1xufVxuXG4vKipcbiAqIFJlbW92ZSBhbiBleGlzdGluZyBsYXllcnMgZnJvbSBjdXN0b20gbWFwIGxheWVyIG9iamVjdHNcbiAqIEBwYXJhbSBzdGF0ZVxuICogQHBhcmFtIGxheWVyXG4gKiBAcmV0dXJucyB7WyosKl19IE1hcHMgb2YgY3VzdG9tIGxheWVyIG9iamVjdHNcbiAqL1xuZnVuY3Rpb24gcmVtb3ZlTGF5ZXJGcm9tU3BsaXRNYXBzKHN0YXRlLCBsYXllcikge1xuICByZXR1cm4gc3RhdGUuc3BsaXRNYXBzLm1hcChzZXR0aW5ncyA9PiB7XG4gICAgY29uc3Qge2xheWVyc30gPSBzZXR0aW5ncztcbiAgICAvKiBlc2xpbnQtZGlzYWJsZSBuby11bnVzZWQtdmFycyAqL1xuICAgIGNvbnN0IHtbbGF5ZXIuaWRdOiBfLCAuLi5uZXdMYXllcnN9ID0gbGF5ZXJzO1xuICAgIC8qIGVzbGludC1lbmFibGUgbm8tdW51c2VkLXZhcnMgKi9cbiAgICByZXR1cm4ge1xuICAgICAgLi4uc2V0dGluZ3MsXG4gICAgICBsYXllcnM6IG5ld0xheWVyc1xuICAgIH07XG4gIH0pO1xufVxuXG4vKipcbiAqIEFkZCBuZXcgbGF5ZXJzIHRvIGJvdGggZXhpc3RpbmcgbWFwc1xuICogQHBhcmFtIHNwbGl0TWFwc1xuICogQHBhcmFtIGxheWVyc1xuICogQHJldHVybnMge1sqLCpdfSBuZXcgc3BsaXRNYXBzXG4gKi9cbmZ1bmN0aW9uIGFkZE5ld0xheWVyc1RvU3BsaXRNYXAoc3BsaXRNYXBzLCBsYXllcnMpIHtcbiAgY29uc3QgbmV3TGF5ZXJzID0gQXJyYXkuaXNBcnJheShsYXllcnMpID8gbGF5ZXJzIDogW2xheWVyc107XG5cbiAgaWYgKCFzcGxpdE1hcHMgfHwgIXNwbGl0TWFwcy5sZW5ndGggfHwgIW5ld0xheWVycy5sZW5ndGgpIHtcbiAgICByZXR1cm4gc3BsaXRNYXBzO1xuICB9XG5cbiAgLy8gYWRkIG5ldyBsYXllciB0byBib3RoIG1hcHMsXG4gIC8vICBkb24ndCBvdmVycmlkZSwgaWYgbGF5ZXIuaWQgaXMgYWxyZWFkeSBpbiBzcGxpdE1hcHMuc2V0dGluZ3MubGF5ZXJzXG4gIHJldHVybiBzcGxpdE1hcHMubWFwKHNldHRpbmdzID0+ICh7XG4gICAgLi4uc2V0dGluZ3MsXG4gICAgbGF5ZXJzOiB7XG4gICAgICAuLi5zZXR0aW5ncy5sYXllcnMsXG4gICAgICAuLi5uZXdMYXllcnMucmVkdWNlKFxuICAgICAgICAoYWNjdSwgbmV3TGF5ZXIpID0+XG4gICAgICAgICAgbmV3TGF5ZXIuY29uZmlnLmlzVmlzaWJsZVxuICAgICAgICAgICAgPyB7XG4gICAgICAgICAgICAgICAgLi4uYWNjdSxcbiAgICAgICAgICAgICAgICBbbmV3TGF5ZXIuaWRdOiBzZXR0aW5ncy5sYXllcnNbbmV3TGF5ZXIuaWRdXG4gICAgICAgICAgICAgICAgICA/IHNldHRpbmdzLmxheWVyc1tuZXdMYXllci5pZF1cbiAgICAgICAgICAgICAgICAgIDogZ2VuZXJhdGVMYXllck1ldGFGb3JTcGxpdFZpZXdzKG5ld0xheWVyKVxuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICA6IGFjY3UsXG4gICAgICAgIHt9XG4gICAgICApXG4gICAgfVxuICB9KSk7XG59XG5cbi8qKlxuICogSGlkZSBhbiBleGlzdGluZyBsYXllcnMgZnJvbSBjdXN0b20gbWFwIGxheWVyIG9iamVjdHNcbiAqIEBwYXJhbSBzdGF0ZVxuICogQHBhcmFtIGxheWVyXG4gKiBAcmV0dXJucyB7WyosKl19IE1hcHMgb2YgY3VzdG9tIGxheWVyIG9iamVjdHNcbiAqL1xuZnVuY3Rpb24gdG9nZ2xlTGF5ZXJGcm9tU3BsaXRNYXBzKHN0YXRlLCBsYXllcikge1xuICByZXR1cm4gc3RhdGUuc3BsaXRNYXBzLm1hcChzZXR0aW5ncyA9PiB7XG4gICAgY29uc3Qge2xheWVyc30gPSBzZXR0aW5ncztcbiAgICBjb25zdCBuZXdMYXllcnMgPSB7XG4gICAgICAuLi5sYXllcnMsXG4gICAgICBbbGF5ZXIuaWRdOiBnZW5lcmF0ZUxheWVyTWV0YUZvclNwbGl0Vmlld3MobGF5ZXIpXG4gICAgfTtcblxuICAgIHJldHVybiB7XG4gICAgICAuLi5zZXR0aW5ncyxcbiAgICAgIGxheWVyczogbmV3TGF5ZXJzXG4gICAgfTtcbiAgfSk7XG59XG5cbi8qKlxuICogV2hlbiBhIHVzZXIgY2xpY2tzIG9uIHRoZSBzcGVjaWZpYyBtYXAgY2xvc2luZyBpY29uXG4gKiB0aGUgYXBwbGljYXRpb24gd2lsbCBjbG9zZSB0aGUgc2VsZWN0ZWQgbWFwXG4gKiBhbmQgd2lsbCBtZXJnZSB0aGUgcmVtYWluaW5nIG9uZSB3aXRoIHRoZSBnbG9iYWwgc3RhdGVcbiAqIFRPRE86IGkgdGhpbmsgaW4gdGhlIGZ1dHVyZSB0aGlzIGFjdGlvbiBzaG91bGQgYmUgY2FsbGVkIG1lcmdlIG1hcCBsYXllcnMgd2l0aCBnbG9iYWwgc2V0dGluZ3NcbiAqIEBwYXJhbSBzdGF0ZVxuICogQHBhcmFtIGFjdGlvblxuICogQHJldHVybnMgeyp9XG4gKi9cbmZ1bmN0aW9uIGNsb3NlU3BlY2lmaWNNYXBBdEluZGV4KHN0YXRlLCBhY3Rpb24pIHtcbiAgLy8gcmV0cmlldmUgbGF5ZXJzIG1ldGEgZGF0YSBmcm9tIHRoZSByZW1haW5pbmcgbWFwIHRoYXQgd2UgbmVlZCB0byBrZWVwXG4gIGNvbnN0IGluZGV4VG9SZXRyaWV2ZSA9IDEgLSBhY3Rpb24ucGF5bG9hZDtcblxuICBjb25zdCBtZXRhU2V0dGluZ3MgPSBzdGF0ZS5zcGxpdE1hcHNbaW5kZXhUb1JldHJpZXZlXTtcbiAgaWYgKCFtZXRhU2V0dGluZ3MgfHwgIW1ldGFTZXR0aW5ncy5sYXllcnMpIHtcbiAgICAvLyBpZiB3ZSBjYW4ndCBmaW5kIHRoZSBtZXRhIHNldHRpbmdzIHdlIHNpbXBseSBjbGVhbiB1cCBzcGxpdE1hcHMgYW5kXG4gICAgLy8ga2VlcCBnbG9iYWwgc3RhdGUgYXMgaXQgaXNcbiAgICAvLyBidXQgd2h5IGRvZXMgdGhpcyBldmVyIGhhcHBlbj9cbiAgICByZXR1cm4ge1xuICAgICAgLi4uc3RhdGUsXG4gICAgICBzcGxpdE1hcHM6IFtdXG4gICAgfTtcbiAgfVxuXG4gIGNvbnN0IHtsYXllcnN9ID0gc3RhdGU7XG5cbiAgLy8gdXBkYXRlIGxheWVyIHZpc2liaWxpdHlcbiAgY29uc3QgbmV3TGF5ZXJzID0gbGF5ZXJzLm1hcChsYXllciA9PlxuICAgIGxheWVyLnVwZGF0ZUxheWVyQ29uZmlnKHtcbiAgICAgIGlzVmlzaWJsZTogbWV0YVNldHRpbmdzLmxheWVyc1tsYXllci5pZF1cbiAgICAgICAgPyBtZXRhU2V0dGluZ3MubGF5ZXJzW2xheWVyLmlkXS5pc1Zpc2libGVcbiAgICAgICAgOiBsYXllci5jb25maWcuaXNWaXNpYmxlXG4gICAgfSlcbiAgKTtcblxuICAvLyBkZWxldGUgbWFwXG4gIHJldHVybiB7XG4gICAgLi4uc3RhdGUsXG4gICAgbGF5ZXJzOiBuZXdMYXllcnMsXG4gICAgc3BsaXRNYXBzOiBbXVxuICB9O1xufVxuXG4vLyBUT0RPOiByZWRvIHdyaXRlIGhhbmRsZXIgdG8gbm90IHVzZSB0YXNrc1xuZXhwb3J0IGNvbnN0IGxvYWRGaWxlc1VwZGF0ZXIgPSAoc3RhdGUsIGFjdGlvbikgPT4ge1xuICBjb25zdCB7ZmlsZXN9ID0gYWN0aW9uO1xuXG4gIGNvbnN0IGZpbGVzVG9Mb2FkID0gZmlsZXMubWFwKGZpbGVCbG9iID0+ICh7XG4gICAgZmlsZUJsb2IsXG4gICAgaW5mbzoge1xuICAgICAgaWQ6IGdlbmVyYXRlSGFzaElkKDQpLFxuICAgICAgbGFiZWw6IGZpbGVCbG9iLm5hbWUsXG4gICAgICBzaXplOiBmaWxlQmxvYi5zaXplXG4gICAgfSxcbiAgICBoYW5kbGVyOiBnZXRGaWxlSGFuZGxlcihmaWxlQmxvYilcbiAgfSkpO1xuXG4gIC8vIHJlYWRlciAtPiBwYXJzZXIgLT4gYXVnbWVudCAtPiByZWNlaXZlVmlzRGF0YVxuICBjb25zdCBsb2FkRmlsZVRhc2tzID0gW1xuICAgIFRhc2suYWxsKGZpbGVzVG9Mb2FkLm1hcChMT0FEX0ZJTEVfVEFTSykpLmJpbWFwKFxuICAgICAgcmVzdWx0cyA9PiB7XG4gICAgICAgIGNvbnN0IGRhdGEgPSByZXN1bHRzLnJlZHVjZSgoZiwgYykgPT4gKHtcbiAgICAgICAgICAvLyB1c2luZyBjb25jYXQgaGVyZSBiZWNhdXNlIHRoZSBjdXJyZW50IGRhdGFzZXRzIGNvdWxkIGJlIGFuIGFycmF5IG9yIGEgc2luZ2xlIGl0ZW1cbiAgICAgICAgICBkYXRhc2V0czogZi5kYXRhc2V0cy5jb25jYXQoYy5kYXRhc2V0cyksXG4gICAgICAgICAgLy8gd2UgbmVlZCB0byBkZWVwIG1lcmdlIHRoaXMgdGhpbmcgdW5sZXNzIHdlIGZpbmQgYSBiZXR0ZXIgc29sdXRpb25cbiAgICAgICAgICAvLyB0aGlzIGNhc2Ugd2lsbCBvbmx5IGhhcHBlbiBpZiB3ZSBhbGxvdyB0byBsb2FkIG11bHRpcGxlIGtlcGxlcmdsIGpzb24gZmlsZXNcbiAgICAgICAgICBjb25maWc6IHtcbiAgICAgICAgICAgIC4uLmYuY29uZmlnLFxuICAgICAgICAgICAgLi4uKGMuY29uZmlnIHx8IHt9KVxuICAgICAgICAgIH1cbiAgICAgICAgfSksIHtkYXRhc2V0czogW10sIGNvbmZpZzoge30sIG9wdGlvbnM6IHtjZW50ZXJNYXA6IHRydWV9fSk7XG4gICAgICAgIHJldHVybiBhZGREYXRhVG9NYXAoZGF0YSk7XG4gICAgICB9LFxuICAgICAgZXJyb3IgPT4gbG9hZEZpbGVzRXJyKGVycm9yKVxuICAgIClcbiAgXTtcblxuICByZXR1cm4gd2l0aFRhc2soXG4gICAge1xuICAgICAgLi4uc3RhdGUsXG4gICAgICBmaWxlTG9hZGluZzogdHJ1ZVxuICAgIH0sXG4gICAgbG9hZEZpbGVUYXNrc1xuICApO1xufTtcblxuZXhwb3J0IGNvbnN0IGxvYWRGaWxlc0VyclVwZGF0ZXIgPSAoc3RhdGUsIHtlcnJvcn0pID0+ICh7XG4gIC4uLnN0YXRlLFxuICBmaWxlTG9hZGluZzogZmFsc2UsXG4gIGZpbGVMb2FkaW5nRXJyOiBlcnJvclxufSk7XG5cbi8qKlxuICogaGVscGVyIGZ1bmN0aW9uIHRvIHVwZGF0ZSBBbGwgbGF5ZXIgZG9tYWluIGFuZCBsYXllciBkYXRhIG9mIHN0YXRlXG4gKlxuICogQHBhcmFtIHtvYmplY3R9IHN0YXRlXG4gKiBAcGFyYW0ge3N0cmluZ30gZGF0YXNldHNcbiAqIEByZXR1cm5zIHtvYmplY3R9IHN0YXRlXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBhZGREZWZhdWx0TGF5ZXJzKHN0YXRlLCBkYXRhc2V0cykge1xuICBjb25zdCBkZWZhdWx0TGF5ZXJzID0gT2JqZWN0LnZhbHVlcyhkYXRhc2V0cykucmVkdWNlKFxuICAgIChhY2N1LCBkYXRhc2V0KSA9PiBbXG4gICAgICAuLi5hY2N1LFxuICAgICAgLi4uKGZpbmREZWZhdWx0TGF5ZXIoZGF0YXNldCwgc3RhdGUubGF5ZXJDbGFzc2VzKSB8fCBbXSlcbiAgICBdLFxuICAgIFtdXG4gICk7XG4gIHJldHVybiB7XG4gICAgLi4uc3RhdGUsXG4gICAgbGF5ZXJzOiBbLi4uc3RhdGUubGF5ZXJzLCAuLi5kZWZhdWx0TGF5ZXJzXSxcbiAgICBsYXllck9yZGVyOiBbXG4gICAgICAvLyBwdXQgbmV3IGxheWVycyBvbiB0b3Agb2Ygb2xkIG9uZXNcbiAgICAgIC4uLmRlZmF1bHRMYXllcnMubWFwKChfLCBpKSA9PiBzdGF0ZS5sYXllcnMubGVuZ3RoICsgaSksXG4gICAgICAuLi5zdGF0ZS5sYXllck9yZGVyXG4gICAgXVxuICB9O1xufVxuXG4vKipcbiAqIGhlbHBlciBmdW5jdGlvbiB0byBmaW5kIGRlZmF1bHQgdG9vbHRpcHNcbiAqXG4gKiBAcGFyYW0ge29iamVjdH0gc3RhdGVcbiAqIEBwYXJhbSB7b2JqZWN0fSBkYXRhc2V0XG4gKiBAcmV0dXJucyB7b2JqZWN0fSBzdGF0ZVxuICovXG5leHBvcnQgZnVuY3Rpb24gYWRkRGVmYXVsdFRvb2x0aXBzKHN0YXRlLCBkYXRhc2V0KSB7XG4gIGNvbnN0IHRvb2x0aXBGaWVsZHMgPSBmaW5kRmllbGRzVG9TaG93KGRhdGFzZXQpO1xuXG4gIHJldHVybiB7XG4gICAgLi4uc3RhdGUsXG4gICAgaW50ZXJhY3Rpb25Db25maWc6IHtcbiAgICAgIC4uLnN0YXRlLmludGVyYWN0aW9uQ29uZmlnLFxuICAgICAgdG9vbHRpcDoge1xuICAgICAgICAuLi5zdGF0ZS5pbnRlcmFjdGlvbkNvbmZpZy50b29sdGlwLFxuICAgICAgICBjb25maWc6IHtcbiAgICAgICAgICAvLyBmaW5kIGRlZmF1bHQgZmllbGRzIHRvIHNob3cgaW4gdG9vbHRpcFxuICAgICAgICAgIGZpZWxkc1RvU2hvdzoge1xuICAgICAgICAgICAgLi4uc3RhdGUuaW50ZXJhY3Rpb25Db25maWcudG9vbHRpcC5jb25maWcuZmllbGRzVG9TaG93LFxuICAgICAgICAgICAgLi4udG9vbHRpcEZpZWxkc1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgfTtcbn1cblxuLyoqXG4gKiBoZWxwZXIgZnVuY3Rpb24gdG8gdXBkYXRlIGxheWVyIGRvbWFpbnMgZm9yIGFuIGFycmF5IG9mIGRhdHNldHNcbiAqXG4gKiBAcGFyYW0ge29iamVjdH0gc3RhdGVcbiAqIEBwYXJhbSB7YXJyYXkgfCBzdHJpbmd9IGRhdGFJZFxuICogQHBhcmFtIHtvYmplY3R9IG5ld0ZpbHRlciAtIGlmIGlzIGNhbGxlZCBieSBzZXRGaWx0ZXIsIHRoZSBmaWx0ZXIgdGhhdCBoYXMgY2hhbmdlZFxuICogQHJldHVybnMge29iamVjdH0gc3RhdGVcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIHVwZGF0ZUFsbExheWVyRG9tYWluRGF0YShzdGF0ZSwgZGF0YUlkLCBuZXdGaWx0ZXIpIHtcbiAgY29uc3QgZGF0YUlkcyA9IHR5cGVvZiBkYXRhSWQgPT09ICdzdHJpbmcnID8gW2RhdGFJZF0gOiBkYXRhSWQ7XG4gIGNvbnN0IG5ld0xheWVycyA9IFtdO1xuICBjb25zdCBuZXdMYXllckRhdGFzID0gW107XG5cbiAgc3RhdGUubGF5ZXJzLmZvckVhY2goKG9sZExheWVyLCBpKSA9PiB7XG4gICAgaWYgKG9sZExheWVyLmNvbmZpZy5kYXRhSWQgJiYgZGF0YUlkcy5pbmNsdWRlcyhvbGRMYXllci5jb25maWcuZGF0YUlkKSkge1xuICAgICAgLy8gTm8gbmVlZCB0byByZWNhbGN1bGF0ZSBsYXllciBkb21haW4gaWYgZmlsdGVyIGhhcyBmaXhlZCBkb21haW5cbiAgICAgIGNvbnN0IG5ld0xheWVyID1cbiAgICAgICAgbmV3RmlsdGVyICYmIG5ld0ZpbHRlci5maXhlZERvbWFpblxuICAgICAgICAgID8gb2xkTGF5ZXJcbiAgICAgICAgICA6IG9sZExheWVyLnVwZGF0ZUxheWVyRG9tYWluKFxuICAgICAgICAgICAgICBzdGF0ZS5kYXRhc2V0c1tvbGRMYXllci5jb25maWcuZGF0YUlkXSxcbiAgICAgICAgICAgICAgbmV3RmlsdGVyXG4gICAgICAgICAgICApO1xuXG4gICAgICBjb25zdCB7bGF5ZXJEYXRhLCBsYXllcn0gPSBjYWxjdWxhdGVMYXllckRhdGEoXG4gICAgICAgIG5ld0xheWVyLFxuICAgICAgICBzdGF0ZSxcbiAgICAgICAgc3RhdGUubGF5ZXJEYXRhW2ldXG4gICAgICApO1xuXG4gICAgICBuZXdMYXllcnMucHVzaChsYXllcik7XG4gICAgICBuZXdMYXllckRhdGFzLnB1c2gobGF5ZXJEYXRhKTtcbiAgICB9IGVsc2Uge1xuICAgICAgbmV3TGF5ZXJzLnB1c2gob2xkTGF5ZXIpO1xuICAgICAgbmV3TGF5ZXJEYXRhcy5wdXNoKHN0YXRlLmxheWVyRGF0YVtpXSk7XG4gICAgfVxuICB9KTtcblxuICByZXR1cm4ge1xuICAgIC4uLnN0YXRlLFxuICAgIGxheWVyczogbmV3TGF5ZXJzLFxuICAgIGxheWVyRGF0YTogbmV3TGF5ZXJEYXRhc1xuICB9O1xufVxuIl19