'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _typeof2 = require('babel-runtime/helpers/typeof');

var _typeof3 = _interopRequireDefault(_typeof2);

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _toArray2 = require('babel-runtime/helpers/toArray');

var _toArray3 = _interopRequireDefault(_toArray2);

exports.processCsvData = processCsvData;
exports.getSampleForTypeAnalyze = getSampleForTypeAnalyze;
exports.parseCsvDataByFieldType = parseCsvDataByFieldType;
exports.getFieldsFromData = getFieldsFromData;
exports.renameDuplicateFields = renameDuplicateFields;
exports.analyzerTypeToFieldType = analyzerTypeToFieldType;
exports.processRowObject = processRowObject;
exports.processGeojson = processGeojson;
exports.formatCsv = formatCsv;
exports.validateInputData = validateInputData;

var _d3Dsv = require('d3-dsv');

var _d3Array = require('d3-array');

var _window = require('global/window');

var _assert = require('assert');

var _assert2 = _interopRequireDefault(_assert);

var _typeAnalyzer = require('type-analyzer');

var _geojsonNormalize = require('@mapbox/geojson-normalize');

var _geojsonNormalize2 = _interopRequireDefault(_geojsonNormalize);

var _defaultSettings = require('../constants/default-settings');

var _dataUtils = require('../utils/data-utils');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// if any of these value occurs in csv, parse it to null;
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

var CSV_NULLS = ['', 'null', 'NULL', 'Null', 'NaN'];

function processCsvData(rawData) {

  // here we assume the csv file that people uploaded will have first row
  // as name of the column
  var _csvParseRows = (0, _d3Dsv.csvParseRows)(rawData),
      _csvParseRows2 = (0, _toArray3.default)(_csvParseRows),
      headerRow = _csvParseRows2[0],
      rows = _csvParseRows2.slice(1);

  if (!rows.length || !headerRow) {
    // looks like an empty file
    // resolve null, and catch them later in one place
    return null;
  }

  cleanUpFalsyCsvValue(rows);
  // No need to run type detection on every data point
  // here we get a list of none null values to run analyze on
  var sample = getSampleForTypeAnalyze({ fields: headerRow, allData: rows });

  var fields = getFieldsFromData(sample, headerRow);

  fields.forEach(parseCsvDataByFieldType.bind(null, rows));

  return { fields: fields, rows: rows };
}

/**
 * get fields from csv data
 *
 * @param {array} fields - an array of fields name
 * @param {array} allData
 * @param {array} sampleCount
 * @returns {array} formatted fields
 */
function getSampleForTypeAnalyze(_ref) {
  var fields = _ref.fields,
      allData = _ref.allData,
      _ref$sampleCount = _ref.sampleCount,
      sampleCount = _ref$sampleCount === undefined ? 50 : _ref$sampleCount;

  var total = Math.min(sampleCount, allData.length);
  // const fieldOrder = fields.map(f => f.name);
  var sample = (0, _d3Array.range)(0, total, 1).map(function (d) {
    return {};
  });

  // collect sample data for each field
  fields.forEach(function (field, fieldIdx) {
    // data counter
    var i = 0;
    // sample counter
    var j = 0;

    while (j < total) {
      if (i >= allData.length) {
        // if depleted data pool
        sample[j][field] = null;
        j++;
      } else if ((0, _dataUtils.notNullorUndefined)(allData[i][fieldIdx])) {
        sample[j][field] = allData[i][fieldIdx];
        j++;
        i++;
      } else {
        i++;
      }
    }
  });

  return sample;
}

function cleanUpFalsyCsvValue(rows) {
  for (var i = 0; i < rows.length; i++) {
    for (var j = 0; j < rows[i].length; j++) {
      // analyzer will set any fields to 'string' if there are empty values
      // which will be parsed as '' by d3.csv
      // here we parse empty data as null
      // TODO: create warning when deltect `CSV_NULLS` in the data
      if (!rows[i][j] || CSV_NULLS.includes(rows[i][j])) {
        rows[i][j] = null;
      }
    }
  }
}
/**
 * Process uploaded csv file to parse value by field type
 *
 * @param {array} rows
 * @param {object} field
 * @param {number} i
 * @returns {void}
 */
function parseCsvDataByFieldType(rows, field, i) {
  var unixFormat = ['x', 'X'];

  rows.forEach(function (row) {
    if (row[i] !== null) {
      switch (field.type) {
        case _defaultSettings.ALL_FIELD_TYPES.real:
          row[i] = parseFloat(row[i]);
          break;

        // TODO: timestamp can be either '1495827326' or '2016-03-10 11:20'
        // if it's '1495827326' we pass it to int
        case _defaultSettings.ALL_FIELD_TYPES.timestamp:
          row[i] = unixFormat.includes(field.format) ? Number(row[i]) : row[i];
          break;

        case _defaultSettings.ALL_FIELD_TYPES.integer:
          row[i] = parseInt(row[i], 10);
          break;

        case _defaultSettings.ALL_FIELD_TYPES.boolean:
          // 0 and 1 only field can also be boolean
          row[i] = row[i] === 'true' || row[i] === 'True' || row[i] === '1';
          break;

        default:
          break;
      }
    }
  });
}

/**
 * get fields from csv data
 *
 * @param {array} data
 * @param {array} fieldOrder
 * @returns {array} formatted fields
 */
function getFieldsFromData(data, fieldOrder) {
  // add a check for epoch timestamp
  var metadata = _typeAnalyzer.Analyzer.computeColMeta(data, [{ regex: /.*geojson|all_points/g, dataType: 'GEOMETRY' }]);

  var _renameDuplicateField = renameDuplicateFields(fieldOrder),
      fieldByIndex = _renameDuplicateField.fieldByIndex;

  return fieldOrder.reduce(function (orderedArray, field, index) {
    var name = fieldByIndex[index];
    var fieldMeta = metadata.find(function (m) {
      return m.key === field;
    });

    var _ref2 = fieldMeta || {},
        type = _ref2.type,
        format = _ref2.format;

    orderedArray[index] = {
      name: name,
      format: format,

      // need this for mapbuilder conversion: filter type detection
      // category,
      tableFieldIndex: index + 1,
      type: analyzerTypeToFieldType(type)
    };

    return orderedArray;
  }, []);
}

/**
 * pass in an array of field names, rename duplicated one
 * and return a map from old field index to new name
 *
 * @param {array} fieldOrder
 * @returns {Object} new field name by index
 */
function renameDuplicateFields(fieldOrder) {
  return fieldOrder.reduce(function (accu, field, i) {
    var allNames = accu.allNames;

    var fieldName = field;

    // add a counter to duplicated names
    if (allNames.includes(field)) {
      var counter = 0;
      while (allNames.includes(field + '-' + counter)) {
        counter++;
      }
      fieldName = field + '-' + counter;
    }

    accu.fieldByIndex[i] = fieldName;
    accu.allNames.push(fieldName);

    return accu;
  }, { allNames: [], fieldByIndex: {} });
}

/**
 * Map Analyzer types to local field types
 *
 * @param {string} aType
 * @returns {string} corresponding type in ALL_FIELD_TYPES
 */
/* eslint-disable complexity */
function analyzerTypeToFieldType(aType) {
  var DATE = _typeAnalyzer.DATA_TYPES.DATE,
      TIME = _typeAnalyzer.DATA_TYPES.TIME,
      DATETIME = _typeAnalyzer.DATA_TYPES.DATETIME,
      NUMBER = _typeAnalyzer.DATA_TYPES.NUMBER,
      INT = _typeAnalyzer.DATA_TYPES.INT,
      FLOAT = _typeAnalyzer.DATA_TYPES.FLOAT,
      BOOLEAN = _typeAnalyzer.DATA_TYPES.BOOLEAN,
      STRING = _typeAnalyzer.DATA_TYPES.STRING,
      CITY = _typeAnalyzer.DATA_TYPES.CITY,
      GEOMETRY = _typeAnalyzer.DATA_TYPES.GEOMETRY,
      GEOMETRY_FROM_STRING = _typeAnalyzer.DATA_TYPES.GEOMETRY_FROM_STRING,
      ZIPCODE = _typeAnalyzer.DATA_TYPES.ZIPCODE,
      PAIR_GEOMETRY_FROM_STRING = _typeAnalyzer.DATA_TYPES.PAIR_GEOMETRY_FROM_STRING;

  // TODO: un recognized types
  // CURRENCY PERCENT NONE

  switch (aType) {
    case DATE:
      return _defaultSettings.ALL_FIELD_TYPES.date;
    case TIME:
    case DATETIME:
      return _defaultSettings.ALL_FIELD_TYPES.timestamp;
    case NUMBER:
    case FLOAT:
      return _defaultSettings.ALL_FIELD_TYPES.real;
    case INT:
      return _defaultSettings.ALL_FIELD_TYPES.integer;
    case BOOLEAN:
      return _defaultSettings.ALL_FIELD_TYPES.boolean;
    case GEOMETRY:
    case GEOMETRY_FROM_STRING:
    case PAIR_GEOMETRY_FROM_STRING:
      return _defaultSettings.ALL_FIELD_TYPES.geojson;
    case STRING:
    case CITY:
    case ZIPCODE:
      return _defaultSettings.ALL_FIELD_TYPES.string;
    default:
      _window.console.warn('Unsupported analyzer type: ' + aType);
      return _defaultSettings.ALL_FIELD_TYPES.string;
  }
}
/* eslint-enable complexity */

/*
 * Process rawData where each row is an object
 */
function processRowObject(rawData) {
  if (!rawData.length) {
    return null;
  }

  var keys = Object.keys(rawData[0]);
  var rows = rawData.map(function (d) {
    return keys.map(function (key) {
      return d[key];
    });
  });
  var fields = getFieldsFromData(rawData, keys);

  return {
    fields: fields,
    rows: rows
  };
}

function processGeojson(rawData) {
  var normalizedGeojson = (0, _geojsonNormalize2.default)(rawData);

  if (!normalizedGeojson || !Array.isArray(normalizedGeojson.features)) {
    // fail to normalize geojson
    return null;
  }

  // getting all feature fields
  var allData = normalizedGeojson.features.reduce(function (accu, f, i) {
    if (f.geometry) {
      accu.push((0, _extends3.default)({
        // add feature to _geojson field
        _geojson: f
      }, f.properties || {}));
    }
    return accu;
  }, []);

  // get all the field
  var fields = allData.reduce(function (prev, curr) {
    Object.keys(curr).forEach(function (key) {
      if (!prev.includes(key)) {
        prev.push(key);
      }
    });
    return prev;
  }, []);

  // make sure each feature has exact same fields
  allData.forEach(function (d) {
    fields.forEach(function (f) {
      if (!(f in d)) {
        d[f] = null;
      }
    });
  });

  return processRowObject(allData);
}

/**
 * On export data to csv
 * @param data
 * @param fields
 */
function formatCsv(data, fields) {
  var columns = fields.map(function (f) {
    return f.name;
  });
  var formattedData = [columns];

  // parse geojson object as string
  data.forEach(function (row) {
    formattedData.push(row.map(function (d, i) {
      return d && _defaultSettings.GEOJSON_FIELDS.geojson.includes(fields[i].name) ? JSON.stringify(d) : d;
    }));
  });

  return (0, _d3Dsv.csvFormatRows)(formattedData);
}

/**
 * @param data
 * @returns {{allData: Array, fields: Array}}
 */
function validateInputData(data) {
  // TODO: add test
  /*
   * expected input data format
   * {
   *   fields: [],
   *   rows: []
   * }
   */
  var proceed = true;
  if (!data) {
    (0, _assert2.default)('receiveVisData: data cannot be null');
    proceed = false;
  } else if (!Array.isArray(data.fields)) {
    (0, _assert2.default)('receiveVisData: expect data.fields to be an array');
    proceed = false;
  } else if (!Array.isArray(data.rows)) {
    (0, _assert2.default)('receiveVisData: expect data.rows to be an array');
    proceed = false;
  }

  if (!proceed) {
    return null;
  }

  var fields = data.fields,
      rows = data.rows;

  // check if all fields has name, format and type

  var allValid = fields.every(function (f, i) {
    if ((typeof f === 'undefined' ? 'undefined' : (0, _typeof3.default)(f)) !== 'object') {
      (0, _assert2.default)('fields needs to be an array of object, but find ' + f);
      return false;
    }

    if (!f.name) {
      (0, _assert2.default)('field.name is required but missing in field ' + JSON.stringify(f));
      // assign a name
      f.name = 'column_' + i;
    }

    if (!_defaultSettings.ALL_FIELD_TYPES[f.type]) {
      (0, _assert2.default)('unknown field type ' + f.type);
      return false;
    }

    return f.type !== _defaultSettings.ALL_FIELD_TYPES.timestamp || typeof f.format === 'string';
  });

  if (allValid) {
    return { rows: rows, fields: fields };
  }

  // if any field has missing type, recalculate it for everyone
  // because we simply lost faith in humanity
  var sampleData = getSampleForTypeAnalyze({ fields: fields.map(function (f) {
      return f.name;
    }), allData: rows });
  var fieldOrder = fields.map(function (f) {
    return f.name;
  });
  var meta = getFieldsFromData(sampleData, fieldOrder);
  var updatedFields = fields.map(function (f, i) {
    return (0, _extends3.default)({}, f, {
      type: meta[i].type,
      format: meta[i].format
    });
  });

  return { fields: updatedFields, rows: rows };
}

exports.default = {
  processGeojson: processGeojson,
  processCsvData: processCsvData,
  processRowObject: processRowObject,
  analyzerTypeToFieldType: analyzerTypeToFieldType,
  getFieldsFromData: getFieldsFromData,
  parseCsvDataByFieldType: parseCsvDataByFieldType
};
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9wcm9jZXNzb3JzL2RhdGEtcHJvY2Vzc29yLmpzIl0sIm5hbWVzIjpbInByb2Nlc3NDc3ZEYXRhIiwiZ2V0U2FtcGxlRm9yVHlwZUFuYWx5emUiLCJwYXJzZUNzdkRhdGFCeUZpZWxkVHlwZSIsImdldEZpZWxkc0Zyb21EYXRhIiwicmVuYW1lRHVwbGljYXRlRmllbGRzIiwiYW5hbHl6ZXJUeXBlVG9GaWVsZFR5cGUiLCJwcm9jZXNzUm93T2JqZWN0IiwicHJvY2Vzc0dlb2pzb24iLCJmb3JtYXRDc3YiLCJ2YWxpZGF0ZUlucHV0RGF0YSIsIkNTVl9OVUxMUyIsInJhd0RhdGEiLCJoZWFkZXJSb3ciLCJyb3dzIiwibGVuZ3RoIiwiY2xlYW5VcEZhbHN5Q3N2VmFsdWUiLCJzYW1wbGUiLCJmaWVsZHMiLCJhbGxEYXRhIiwiZm9yRWFjaCIsImJpbmQiLCJzYW1wbGVDb3VudCIsInRvdGFsIiwiTWF0aCIsIm1pbiIsIm1hcCIsImZpZWxkIiwiZmllbGRJZHgiLCJpIiwiaiIsImluY2x1ZGVzIiwidW5peEZvcm1hdCIsInJvdyIsInR5cGUiLCJBTExfRklFTERfVFlQRVMiLCJyZWFsIiwicGFyc2VGbG9hdCIsInRpbWVzdGFtcCIsImZvcm1hdCIsIk51bWJlciIsImludGVnZXIiLCJwYXJzZUludCIsImJvb2xlYW4iLCJkYXRhIiwiZmllbGRPcmRlciIsIm1ldGFkYXRhIiwiQW5hbHl6ZXIiLCJjb21wdXRlQ29sTWV0YSIsInJlZ2V4IiwiZGF0YVR5cGUiLCJmaWVsZEJ5SW5kZXgiLCJyZWR1Y2UiLCJvcmRlcmVkQXJyYXkiLCJpbmRleCIsIm5hbWUiLCJmaWVsZE1ldGEiLCJmaW5kIiwibSIsImtleSIsInRhYmxlRmllbGRJbmRleCIsImFjY3UiLCJhbGxOYW1lcyIsImZpZWxkTmFtZSIsImNvdW50ZXIiLCJwdXNoIiwiYVR5cGUiLCJEQVRFIiwiQW5hbHl6ZXJEQVRBX1RZUEVTIiwiVElNRSIsIkRBVEVUSU1FIiwiTlVNQkVSIiwiSU5UIiwiRkxPQVQiLCJCT09MRUFOIiwiU1RSSU5HIiwiQ0lUWSIsIkdFT01FVFJZIiwiR0VPTUVUUllfRlJPTV9TVFJJTkciLCJaSVBDT0RFIiwiUEFJUl9HRU9NRVRSWV9GUk9NX1NUUklORyIsImRhdGUiLCJnZW9qc29uIiwic3RyaW5nIiwiZ2xvYmFsQ29uc29sZSIsIndhcm4iLCJrZXlzIiwiT2JqZWN0IiwiZCIsIm5vcm1hbGl6ZWRHZW9qc29uIiwiQXJyYXkiLCJpc0FycmF5IiwiZmVhdHVyZXMiLCJmIiwiZ2VvbWV0cnkiLCJfZ2VvanNvbiIsInByb3BlcnRpZXMiLCJwcmV2IiwiY3VyciIsImNvbHVtbnMiLCJmb3JtYXR0ZWREYXRhIiwiR0VPSlNPTl9GSUVMRFMiLCJKU09OIiwic3RyaW5naWZ5IiwicHJvY2VlZCIsImFsbFZhbGlkIiwiZXZlcnkiLCJzYW1wbGVEYXRhIiwibWV0YSIsInVwZGF0ZWRGaWVsZHMiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7OztRQWdDZ0JBLGMsR0FBQUEsYztRQWlDQUMsdUIsR0FBQUEsdUI7UUFtREFDLHVCLEdBQUFBLHVCO1FBdUNBQyxpQixHQUFBQSxpQjtRQWtDQUMscUIsR0FBQUEscUI7UUErQkFDLHVCLEdBQUFBLHVCO1FBa0RBQyxnQixHQUFBQSxnQjtRQWVBQyxjLEdBQUFBLGM7UUErQ0FDLFMsR0FBQUEsUztRQXFCQUMsaUIsR0FBQUEsaUI7O0FBN1VoQjs7QUFDQTs7QUFDQTs7QUFDQTs7OztBQUNBOztBQUNBOzs7O0FBQ0E7O0FBQ0E7Ozs7QUFFQTtBQTdCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFZQSxJQUFNQyxZQUFZLENBQUMsRUFBRCxFQUFLLE1BQUwsRUFBYSxNQUFiLEVBQXFCLE1BQXJCLEVBQTZCLEtBQTdCLENBQWxCOztBQUVPLFNBQVNWLGNBQVQsQ0FBd0JXLE9BQXhCLEVBQWlDOztBQUV0QztBQUNB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TSxpQ0FBZ0IwRCxFQUFFM0QsSUFBbEIsQ0FBTCxFQUE4QjtBQUM1QixvREFBNkIyRCxFQUFFM0QsSUFBL0I7QUFDQSxhQUFPLEtBQVA7QUFDRDs7QUFFRCxXQUFPMkQsRUFBRTNELElBQUYsS0FBV0MsaUNBQWdCRyxTQUEzQixJQUF3QyxPQUFPdUQsRUFBRXRELE1BQVQsS0FBb0IsUUFBbkU7QUFDRCxHQXBCZ0IsQ0FBakI7O0FBc0JBLE1BQUlrRSxRQUFKLEVBQWM7QUFDWixXQUFPLEVBQUMzRixVQUFELEVBQU9JLGNBQVAsRUFBUDtBQUNEOztBQUVEO0FBQ0E7QUFDQSxNQUFNeUYsYUFBYXpHLHdCQUF3QixFQUFDZ0IsUUFBUUEsT0FBT1EsR0FBUCxDQUFXO0FBQUEsYUFBS21FLEVBQUV0QyxJQUFQO0FBQUEsS0FBWCxDQUFULEVBQWtDcEMsU0FBU0wsSUFBM0MsRUFBeEIsQ0FBbkI7QUFDQSxNQUFNK0IsYUFBYTNCLE9BQU9RLEdBQVAsQ0FBVztBQUFBLFdBQUttRSxFQUFFdEMsSUFBUDtBQUFBLEdBQVgsQ0FBbkI7QUFDQSxNQUFNcUQsT0FBT3hHLGtCQUFrQnVHLFVBQWxCLEVBQThCOUQsVUFBOUIsQ0FBYjtBQUNBLE1BQU1nRSxnQkFBZ0IzRixPQUFPUSxHQUFQLENBQVcsVUFBQ21FLENBQUQsRUFBSWhFLENBQUo7QUFBQSxzQ0FDNUJnRSxDQUQ0QjtBQUUvQjNELFlBQU0wRSxLQUFLL0UsQ0FBTCxFQUFRSyxJQUZpQjtBQUcvQkssY0FBUXFFLEtBQUsvRSxDQUFMLEVBQVFVO0FBSGU7QUFBQSxHQUFYLENBQXRCOztBQU1BLFNBQU8sRUFBQ3JCLFFBQVEyRixhQUFULEVBQXdCL0YsVUFBeEIsRUFBUDtBQUNEOztrQkFFYztBQUNiTixnQ0FEYTtBQUViUCxnQ0FGYTtBQUdiTSxvQ0FIYTtBQUliRCxrREFKYTtBQUtiRixzQ0FMYTtBQU1iRDtBQU5hLEMiLCJmaWxlIjoiZGF0YS1wcm9jZXNzb3IuanMiLCJzb3VyY2VzQ29udGVudCI6WyIvLyBDb3B5cmlnaHQgKGMpIDIwMTggVWJlciBUZWNobm9sb2dpZXMsIEluYy5cbi8vXG4vLyBQZXJtaXNzaW9uIGlzIGhlcmVieSBncmFudGVkLCBmcmVlIG9mIGNoYXJnZSwgdG8gYW55IHBlcnNvbiBvYnRhaW5pbmcgYSBjb3B5XG4vLyBvZiB0aGlzIHNvZnR3YXJlIGFuZCBhc3NvY2lhdGVkIGRvY3VtZW50YXRpb24gZmlsZXMgKHRoZSBcIlNvZnR3YXJlXCIpLCB0byBkZWFsXG4vLyBpbiB0aGUgU29mdHdhcmUgd2l0aG91dCByZXN0cmljdGlvbiwgaW5jbHVkaW5nIHdpdGhvdXQgbGltaXRhdGlvbiB0aGUgcmlnaHRzXG4vLyB0byB1c2UsIGNvcHksIG1vZGlmeSwgbWVyZ2UsIHB1Ymxpc2gsIGRpc3RyaWJ1dGUsIHN1YmxpY2Vuc2UsIGFuZC9vciBzZWxsXG4vLyBjb3BpZXMgb2YgdGhlIFNvZnR3YXJlLCBhbmQgdG8gcGVybWl0IHBlcnNvbnMgdG8gd2hvbSB0aGUgU29mdHdhcmUgaXNcbi8vIGZ1cm5pc2hlZCB0byBkbyBzbywgc3ViamVjdCB0byB0aGUgZm9sbG93aW5nIGNvbmRpdGlvbnM6XG4vL1xuLy8gVGhlIGFib3ZlIGNvcHlyaWdodCBub3RpY2UgYW5kIHRoaXMgcGVybWlzc2lvbiBub3RpY2Ugc2hhbGwgYmUgaW5jbHVkZWQgaW5cbi8vIGFsbCBjb3BpZXMgb3Igc3Vic3RhbnRpYWwgcG9ydGlvbnMgb2YgdGhlIFNvZnR3YXJlLlxuLy9cbi8vIFRIRSBTT0ZUV0FSRSBJUyBQUk9WSURFRCBcIkFTIElTXCIsIFdJVEhPVVQgV0FSUkFOVFkgT0YgQU5ZIEtJTkQsIEVYUFJFU1MgT1Jcbi8vIElNUExJRUQsIElOQ0xVRElORyBCVVQgTk9UIExJTUlURUQgVE8gVEhFIFdBUlJBTlRJRVMgT0YgTUVSQ0hBTlRBQklMSVRZLFxuLy8gRklUTkVTUyBGT1IgQSBQQVJUSUNVTEFSIFBVUlBPU0UgQU5EIE5PTklORlJJTkdFTUVOVC4gSU4gTk8gRVZFTlQgU0hBTEwgVEhFXG4vLyBBVVRIT1JTIE9SIENPUFlSSUdIVCBIT0xERVJTIEJFIExJQUJMRSBGT1IgQU5ZIENMQUlNLCBEQU1BR0VTIE9SIE9USEVSXG4vLyBMSUFCSUxJVFksIFdIRVRIRVIgSU4gQU4gQUNUSU9OIE9GIENPTlRSQUNULCBUT1JUIE9SIE9USEVSV0lTRSwgQVJJU0lORyBGUk9NLFxuLy8gT1VUIE9GIE9SIElOIENPTk5FQ1RJT04gV0lUSCBUSEUgU09GVFdBUkUgT1IgVEhFIFVTRSBPUiBPVEhFUiBERUFMSU5HUyBJTlxuLy8gVEhFIFNPRlRXQVJFLlxuXG5pbXBvcnQge2NzdlBhcnNlUm93cywgY3N2Rm9ybWF0Um93c30gZnJvbSAnZDMtZHN2JztcbmltcG9ydCB7cmFuZ2V9IGZyb20gJ2QzLWFycmF5JztcbmltcG9ydCB7Y29uc29sZSBhcyBnbG9iYWxDb25zb2xlfSBmcm9tICdnbG9iYWwvd2luZG93JztcbmltcG9ydCBhc3NlcnQgZnJvbSAnYXNzZXJ0JztcbmltcG9ydCB7QW5hbHl6ZXIsIERBVEFfVFlQRVMgYXMgQW5hbHl6ZXJEQVRBX1RZUEVTfSBmcm9tICd0eXBlLWFuYWx5emVyJztcbmltcG9ydCBub3JtYWxpemUgZnJvbSAnQG1hcGJveC9nZW9qc29uLW5vcm1hbGl6ZSc7XG5pbXBvcnQge0FMTF9GSUVMRF9UWVBFUywgR0VPSlNPTl9GSUVMRFN9IGZyb20gJ2NvbnN0YW50cy9kZWZhdWx0LXNldHRpbmdzJztcbmltcG9ydCB7bm90TnVsbG9yVW5kZWZpbmVkfSBmcm9tICd1dGlscy9kYXRhLXV0aWxzJztcblxuLy8gaWYgYW55IG9mIHRoZXNlIHZhbHVlIG9jY3VycyBpbiBjc3YsIHBhcnNlIGl0IHRvIG51bGw7XG5jb25zdCBDU1ZfTlVMTFMgPSBbJycsICdudWxsJywgJ05VTEwnLCAnTnVsbCcsICdOYU4nXTtcblxuZXhwb3J0IGZ1bmN0aW9uIHByb2Nlc3NDc3ZEYXRhKHJhd0RhdGEpIHtcblxuICAvLyBoZXJlIHdlIGFzc3VtZSB0aGUgY3N2IGZpbGUgdGhhdCBwZW9wbGUgdXBsb2FkZWQgd2lsbCBoYXZlIGZpcnN0IHJvd1xuICAvLyBhcyBuYW1lIG9mIHRoZSBjb2x1bW5cbiAgLy9UT0RPOiBhZGQgYSBhbGVydCBhdCB1cGxvYWQgY3N2IHRvIHJlbWluZCBkZWZpbmUgZmlyc3Qgcm93XG4gIGNvbnN0IFtoZWFkZXJSb3csIC4uLnJvd3NdID0gY3N2UGFyc2VSb3dzKHJhd0RhdGEpO1xuXG4gIGlmICghcm93cy5sZW5ndGggfHwgIWhlYWRlclJvdykge1xuICAgIC8vIGxvb2tzIGxpa2UgYW4gZW1wdHkgZmlsZVxuICAgIC8vIHJlc29sdmUgbnVsbCwgYW5kIGNhdGNoIHRoZW0gbGF0ZXIgaW4gb25lIHBsYWNlXG4gICAgcmV0dXJuIG51bGw7XG4gIH1cblxuICBjbGVhblVwRmFsc3lDc3ZWYWx1ZShyb3dzKTtcbiAgLy8gTm8gbmVlZCB0byBydW4gdHlwZSBkZXRlY3Rpb24gb24gZXZlcnkgZGF0YSBwb2ludFxuICAvLyBoZXJlIHdlIGdldCBhIGxpc3Qgb2Ygbm9uZSBudWxsIHZhbHVlcyB0byBydW4gYW5hbHl6ZSBvblxuICBjb25zdCBzYW1wbGUgPSBnZXRTYW1wbGVGb3JUeXBlQW5hbHl6ZSh7ZmllbGRzOiBoZWFkZXJSb3csIGFsbERhdGE6IHJvd3N9KTtcblxuICBjb25zdCBmaWVsZHMgPSBnZXRGaWVsZHNGcm9tRGF0YShzYW1wbGUsIGhlYWRlclJvdyk7XG5cbiAgZmllbGRzLmZvckVhY2gocGFyc2VDc3ZEYXRhQnlGaWVsZFR5cGUuYmluZChudWxsLCByb3dzKSk7XG5cbiAgcmV0dXJuIHtmaWVsZHMsIHJvd3N9O1xufVxuXG4vKipcbiAqIGdldCBmaWVsZHMgZnJvbSBjc3YgZGF0YVxuICpcbiAqIEBwYXJhbSB7YXJyYXl9IGZpZWxkcyAtIGFuIGFycmF5IG9mIGZpZWxkcyBuYW1lXG4gKiBAcGFyYW0ge2FycmF5fSBhbGxEYXRhXG4gKiBAcGFyYW0ge2FycmF5fSBzYW1wbGVDb3VudFxuICogQHJldHVybnMge2FycmF5fSBmb3JtYXR0ZWQgZmllbGRzXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBnZXRTYW1wbGVGb3JUeXBlQW5hbHl6ZSh7ZmllbGRzLCBhbGxEYXRhLCBzYW1wbGVDb3VudCA9IDUwfSkge1xuICBjb25zdCB0b3RhbCA9IE1hdGgubWluKHNhbXBsZUNvdW50LCBhbGxEYXRhLmxlbmd0aCk7XG4gIC8vIGNvbnN0IGZpZWxkT3JkZXIgPSBmaWVsZHMubWFwKGYgPT4gZi5uYW1lKTtcbiAgY29uc3Qgc2FtcGxlID0gcmFuZ2UoMCwgdG90YWwsIDEpLm1hcChkID0+ICh7fSkpO1xuXG4gIC8vIGNvbGxlY3Qgc2FtcGxlIGRhdGEgZm9yIGVhY2ggZmllbGRcbiAgZmllbGRzLmZvckVhY2goKGZpZWxkLCBmaWVsZElkeCkgPT4ge1xuICAgIC8vIGRhdGEgY291bnRlclxuICAgIGxldCBpID0gMDtcbiAgICAvLyBzYW1wbGUgY291bnRlclxuICAgIGxldCBqID0gMDtcblxuICAgIHdoaWxlIChqIDwgdG90YWwpIHtcbiAgICAgIGlmIChpID49IGFsbERhdGEubGVuZ3RoKSB7XG4gICAgICAgIC8vIGlmIGRlcGxldGVkIGRhdGEgcG9vbFxuICAgICAgICBzYW1wbGVbal1bZmllbGRdID0gbnVsbDtcbiAgICAgICAgaisrO1xuICAgICAgfSBlbHNlIGlmIChub3ROdWxsb3JVbmRlZmluZWQoYWxsRGF0YVtpXVtmaWVsZElkeF0pKSB7XG4gICAgICAgIHNhbXBsZVtqXVtmaWVsZF0gPSBhbGxEYXRhW2ldW2ZpZWxkSWR4XTtcbiAgICAgICAgaisrO1xuICAgICAgICBpKys7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBpKys7XG4gICAgICB9XG4gICAgfVxuICB9KTtcblxuICByZXR1cm4gc2FtcGxlO1xufVxuXG5mdW5jdGlvbiBjbGVhblVwRmFsc3lDc3ZWYWx1ZShyb3dzKSB7XG4gIGZvciAobGV0IGkgPSAwOyBpIDwgcm93cy5sZW5ndGg7IGkrKykge1xuICAgIGZvciAobGV0IGogPSAwOyBqIDwgcm93c1tpXS5sZW5ndGg7IGorKykge1xuICAgICAgLy8gYW5hbHl6ZXIgd2lsbCBzZXQgYW55IGZpZWxkcyB0byAnc3RyaW5nJyBpZiB0aGVyZSBhcmUgZW1wdHkgdmFsdWVzXG4gICAgICAvLyB3aGljaCB3aWxsIGJlIHBhcnNlZCBhcyAnJyBieSBkMy5jc3ZcbiAgICAgIC8vIGhlcmUgd2UgcGFyc2UgZW1wdHkgZGF0YSBhcyBudWxsXG4gICAgICAvLyBUT0RPOiBjcmVhdGUgd2FybmluZyB3aGVuIGRlbHRlY3QgYENTVl9OVUxMU2AgaW4gdGhlIGRhdGFcbiAgICAgIGlmICghcm93c1tpXVtqXSB8fCBDU1ZfTlVMTFMuaW5jbHVkZXMocm93c1tpXVtqXSkpIHtcbiAgICAgICAgcm93c1tpXVtqXSA9IG51bGw7XG4gICAgICB9XG4gICAgfVxuICB9XG59XG4vKipcbiAqIFByb2Nlc3MgdXBsb2FkZWQgY3N2IGZpbGUgdG8gcGFyc2UgdmFsdWUgYnkgZmllbGQgdHlwZVxuICpcbiAqIEBwYXJhbSB7YXJyYXl9IHJvd3NcbiAqIEBwYXJhbSB7b2JqZWN0fSBmaWVsZFxuICogQHBhcmFtIHtudW1iZXJ9IGlcbiAqIEByZXR1cm5zIHt2b2lkfVxuICovXG5leHBvcnQgZnVuY3Rpb24gcGFyc2VDc3ZEYXRhQnlGaWVsZFR5cGUocm93cywgZmllbGQsIGkpIHtcbiAgY29uc3QgdW5peEZvcm1hdCA9IFsneCcsICdYJ107XG5cbiAgcm93cy5mb3JFYWNoKHJvdyA9PiB7XG4gICAgaWYgKHJvd1tpXSAhPT0gbnVsbCkge1xuICAgICAgc3dpdGNoIChmaWVsZC50eXBlKSB7XG4gICAgICAgIGNhc2UgQUxMX0ZJRUxEX1RZUEVTLnJlYWw6XG4gICAgICAgICAgcm93W2ldID0gcGFyc2VGbG9hdChyb3dbaV0pO1xuICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgIC8vIFRPRE86IHRpbWVzdGFtcCBjYW4gYmUgZWl0aGVyICcxNDk1ODI3MzI2JyBvciAnMjAxNi0wMy0xMCAxMToyMCdcbiAgICAgICAgLy8gaWYgaXQncyAnMTQ5NTgyNzMyNicgd2UgcGFzcyBpdCB0byBpbnRcbiAgICAgICAgY2FzZSBBTExfRklFTERfVFlQRVMudGltZXN0YW1wOlxuICAgICAgICAgIHJvd1tpXSA9IHVuaXhGb3JtYXQuaW5jbHVkZXMoZmllbGQuZm9ybWF0KSA/IE51bWJlcihyb3dbaV0pIDogcm93W2ldO1xuICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgIGNhc2UgQUxMX0ZJRUxEX1RZUEVTLmludGVnZXI6XG4gICAgICAgICAgcm93W2ldID0gcGFyc2VJbnQocm93W2ldLCAxMCk7XG4gICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgY2FzZSBBTExfRklFTERfVFlQRVMuYm9vbGVhbjpcbiAgICAgICAgICAvLyAwIGFuZCAxIG9ubHkgZmllbGQgY2FuIGFsc28gYmUgYm9vbGVhblxuICAgICAgICAgIHJvd1tpXSA9IHJvd1tpXSA9PT0gJ3RydWUnIHx8IHJvd1tpXSA9PT0gJ1RydWUnIHx8IHJvd1tpXSA9PT0gJzEnO1xuICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgYnJlYWs7XG4gICAgICB9XG4gICAgfVxuICB9KTtcbn1cblxuLyoqXG4gKiBnZXQgZmllbGRzIGZyb20gY3N2IGRhdGFcbiAqXG4gKiBAcGFyYW0ge2FycmF5fSBkYXRhXG4gKiBAcGFyYW0ge2FycmF5fSBmaWVsZE9yZGVyXG4gKiBAcmV0dXJucyB7YXJyYXl9IGZvcm1hdHRlZCBmaWVsZHNcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGdldEZpZWxkc0Zyb21EYXRhKGRhdGEsIGZpZWxkT3JkZXIpIHtcbiAgLy8gYWRkIGEgY2hlY2sgZm9yIGVwb2NoIHRpbWVzdGFtcFxuICBjb25zdCBtZXRhZGF0YSA9IEFuYWx5emVyLmNvbXB1dGVDb2xNZXRhKGRhdGEsIFtcbiAgICB7cmVnZXg6IC8uKmdlb2pzb258YWxsX3BvaW50cy9nLCBkYXRhVHlwZTogJ0dFT01FVFJZJ31cbiAgXSk7XG5cbiAgY29uc3Qge2ZpZWxkQnlJbmRleH0gPSByZW5hbWVEdXBsaWNhdGVGaWVsZHMoZmllbGRPcmRlcik7XG5cbiAgcmV0dXJuIGZpZWxkT3JkZXIucmVkdWNlKChvcmRlcmVkQXJyYXksIGZpZWxkLCBpbmRleCkgPT4ge1xuICAgIGNvbnN0IG5hbWUgPSBmaWVsZEJ5SW5kZXhbaW5kZXhdO1xuICAgIGNvbnN0IGZpZWxkTWV0YSA9IG1ldGFkYXRhLmZpbmQobSA9PiBtLmtleSA9PT0gZmllbGQpO1xuICAgIGNvbnN0IHt0eXBlLCBmb3JtYXR9ID0gZmllbGRNZXRhIHx8IHt9O1xuXG4gICAgb3JkZXJlZEFycmF5W2luZGV4XSA9IHtcbiAgICAgIG5hbWUsXG4gICAgICBmb3JtYXQsXG5cbiAgICAgIC8vIG5lZWQgdGhpcyBmb3IgbWFwYnVpbGRlciBjb252ZXJzaW9uOiBmaWx0ZXIgdHlwZSBkZXRlY3Rpb25cbiAgICAgIC8vIGNhdGVnb3J5LFxuICAgICAgdGFibGVGaWVsZEluZGV4OiBpbmRleCArIDEsXG4gICAgICB0eXBlOiBhbmFseXplclR5cGVUb0ZpZWxkVHlwZSh0eXBlKVxuICAgIH07XG5cbiAgICByZXR1cm4gb3JkZXJlZEFycmF5O1xuICB9LCBbXSk7XG59XG5cbi8qKlxuICogcGFzcyBpbiBhbiBhcnJheSBvZiBmaWVsZCBuYW1lcywgcmVuYW1lIGR1cGxpY2F0ZWQgb25lXG4gKiBhbmQgcmV0dXJuIGEgbWFwIGZyb20gb2xkIGZpZWxkIGluZGV4IHRvIG5ldyBuYW1lXG4gKlxuICogQHBhcmFtIHthcnJheX0gZmllbGRPcmRlclxuICogQHJldHVybnMge09iamVjdH0gbmV3IGZpZWxkIG5hbWUgYnkgaW5kZXhcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIHJlbmFtZUR1cGxpY2F0ZUZpZWxkcyhmaWVsZE9yZGVyKSB7XG4gIHJldHVybiBmaWVsZE9yZGVyLnJlZHVjZShcbiAgICAoYWNjdSwgZmllbGQsIGkpID0+IHtcbiAgICAgIGNvbnN0IHthbGxOYW1lc30gPSBhY2N1O1xuICAgICAgbGV0IGZpZWxkTmFtZSA9IGZpZWxkO1xuXG4gICAgICAvLyBhZGQgYSBjb3VudGVyIHRvIGR1cGxpY2F0ZWQgbmFtZXNcbiAgICAgIGlmIChhbGxOYW1lcy5pbmNsdWRlcyhmaWVsZCkpIHtcbiAgICAgICAgbGV0IGNvdW50ZXIgPSAwO1xuICAgICAgICB3aGlsZSAoYWxsTmFtZXMuaW5jbHVkZXMoYCR7ZmllbGR9LSR7Y291bnRlcn1gKSkge1xuICAgICAgICAgIGNvdW50ZXIrKztcbiAgICAgICAgfVxuICAgICAgICBmaWVsZE5hbWUgPSBgJHtmaWVsZH0tJHtjb3VudGVyfWA7XG4gICAgICB9XG5cbiAgICAgIGFjY3UuZmllbGRCeUluZGV4W2ldID0gZmllbGROYW1lO1xuICAgICAgYWNjdS5hbGxOYW1lcy5wdXNoKGZpZWxkTmFtZSk7XG5cbiAgICAgIHJldHVybiBhY2N1O1xuICAgIH0sXG4gICAge2FsbE5hbWVzOiBbXSwgZmllbGRCeUluZGV4OiB7fX1cbiAgKTtcbn1cblxuLyoqXG4gKiBNYXAgQW5hbHl6ZXIgdHlwZXMgdG8gbG9jYWwgZmllbGQgdHlwZXNcbiAqXG4gKiBAcGFyYW0ge3N0cmluZ30gYVR5cGVcbiAqIEByZXR1cm5zIHtzdHJpbmd9IGNvcnJlc3BvbmRpbmcgdHlwZSBpbiBBTExfRklFTERfVFlQRVNcbiAqL1xuLyogZXNsaW50LWRpc2FibGUgY29tcGxleGl0eSAqL1xuZXhwb3J0IGZ1bmN0aW9uIGFuYWx5emVyVHlwZVRvRmllbGRUeXBlKGFUeXBlKSB7XG4gIGNvbnN0IHtcbiAgICBEQVRFLFxuICAgIFRJTUUsXG4gICAgREFURVRJTUUsXG4gICAgTlVNQkVSLFxuICAgIElOVCxcbiAgICBGTE9BVCxcbiAgICBCT09MRUFOLFxuICAgIFNUUklORyxcbiAgICBDSVRZLFxuICAgIEdFT01FVFJZLFxuICAgIEdFT01FVFJZX0ZST01fU1RSSU5HLFxuICAgIFpJUENPREUsXG4gICAgUEFJUl9HRU9NRVRSWV9GUk9NX1NUUklOR1xuICB9ID0gQW5hbHl6ZXJEQVRBX1RZUEVTO1xuXG4gIC8vIFRPRE86IHVuIHJlY29nbml6ZWQgdHlwZXNcbiAgLy8gQ1VSUkVOQ1kgUEVSQ0VOVCBOT05FXG4gIHN3aXRjaCAoYVR5cGUpIHtcbiAgICBjYXNlIERBVEU6XG4gICAgICByZXR1cm4gQUxMX0ZJRUxEX1RZUEVTLmRhdGU7XG4gICAgY2FzZSBUSU1FOlxuICAgIGNhc2UgREFURVRJTUU6XG4gICAgICByZXR1cm4gQUxMX0ZJRUxEX1RZUEVTLnRpbWVzdGFtcDtcbiAgICBjYXNlIE5VTUJFUjpcbiAgICBjYXNlIEZMT0FUOlxuICAgICAgcmV0dXJuIEFMTF9GSUVMRF9UWVBFUy5yZWFsO1xuICAgIGNhc2UgSU5UOlxuICAgICAgcmV0dXJuIEFMTF9GSUVMRF9UWVBFUy5pbnRlZ2VyO1xuICAgIGNhc2UgQk9PTEVBTjpcbiAgICAgIHJldHVybiBBTExfRklFTERfVFlQRVMuYm9vbGVhbjtcbiAgICBjYXNlIEdFT01FVFJZOlxuICAgIGNhc2UgR0VPTUVUUllfRlJPTV9TVFJJTkc6XG4gICAgY2FzZSBQQUlSX0dFT01FVFJZX0ZST01fU1RSSU5HOlxuICAgICAgcmV0dXJuIEFMTF9GSUVMRF9UWVBFUy5nZW9qc29uO1xuICAgIGNhc2UgU1RSSU5HOlxuICAgIGNhc2UgQ0lUWTpcbiAgICBjYXNlIFpJUENPREU6XG4gICAgICByZXR1cm4gQUxMX0ZJRUxEX1RZUEVTLnN0cmluZztcbiAgICBkZWZhdWx0OlxuICAgICAgZ2xvYmFsQ29uc29sZS53YXJuKGBVbnN1cHBvcnRlZCBhbmFseXplciB0eXBlOiAke2FUeXBlfWApO1xuICAgICAgcmV0dXJuIEFMTF9GSUVMRF9UWVBFUy5zdHJpbmc7XG4gIH1cbn1cbi8qIGVzbGludC1lbmFibGUgY29tcGxleGl0eSAqL1xuXG4vKlxuICogUHJvY2VzcyByYXdEYXRhIHdoZXJlIGVhY2ggcm93IGlzIGFuIG9iamVjdFxuICovXG5leHBvcnQgZnVuY3Rpb24gcHJvY2Vzc1Jvd09iamVjdChyYXdEYXRhKSB7XG4gIGlmICghcmF3RGF0YS5sZW5ndGgpIHtcbiAgICByZXR1cm4gbnVsbDtcbiAgfVxuXG4gIGNvbnN0IGtleXMgPSBPYmplY3Qua2V5cyhyYXdEYXRhWzBdKTtcbiAgY29uc3Qgcm93cyA9IHJhd0RhdGEubWFwKGQgPT4ga2V5cy5tYXAoa2V5ID0+IGRba2V5XSkpO1xuICBjb25zdCBmaWVsZHMgPSBnZXRGaWVsZHNGcm9tRGF0YShyYXdEYXRhLCBrZXlzKTtcblxuICByZXR1cm4ge1xuICAgIGZpZWxkcyxcbiAgICByb3dzXG4gIH07XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBwcm9jZXNzR2VvanNvbihyYXdEYXRhKSB7XG4gIGNvbnN0IG5vcm1hbGl6ZWRHZW9qc29uID0gbm9ybWFsaXplKHJhd0RhdGEpO1xuXG4gIGlmICghbm9ybWFsaXplZEdlb2pzb24gfHwgIUFycmF5LmlzQXJyYXkobm9ybWFsaXplZEdlb2pzb24uZmVhdHVyZXMpKSB7XG4gICAgLy8gZmFpbCB0byBub3JtYWxpemUgZ2VvanNvblxuICAgIHJldHVybiBudWxsO1xuICB9XG5cbiAgLy8gZ2V0dGluZyBhbGwgZmVhdHVyZSBmaWVsZHNcbiAgY29uc3QgYWxsRGF0YSA9IG5vcm1hbGl6ZWRHZW9qc29uLmZlYXR1cmVzLnJlZHVjZSgoYWNjdSwgZiwgaSkgPT4ge1xuICAgIGlmIChmLmdlb21ldHJ5KSB7XG4gICAgICBhY2N1LnB1c2goe1xuICAgICAgICAvLyBhZGQgZmVhdHVyZSB0byBfZ2VvanNvbiBmaWVsZFxuICAgICAgICBfZ2VvanNvbjogZixcbiAgICAgICAgLi4uKGYucHJvcGVydGllcyB8fCB7fSlcbiAgICAgIH0pO1xuICAgIH1cbiAgICByZXR1cm4gYWNjdTtcbiAgfSwgW10pO1xuXG4gIC8vIGdldCBhbGwgdGhlIGZpZWxkXG4gIGNvbnN0IGZpZWxkcyA9IGFsbERhdGEucmVkdWNlKChwcmV2LCBjdXJyKSA9PiB7XG4gICAgT2JqZWN0LmtleXMoY3VycikuZm9yRWFjaChrZXkgPT4ge1xuICAgICAgaWYgKCFwcmV2LmluY2x1ZGVzKGtleSkpIHtcbiAgICAgICAgcHJldi5wdXNoKGtleSk7XG4gICAgICB9XG4gICAgfSk7XG4gICAgcmV0dXJuIHByZXY7XG4gIH0sIFtdKTtcblxuICAvLyBtYWtlIHN1cmUgZWFjaCBmZWF0dXJlIGhhcyBleGFjdCBzYW1lIGZpZWxkc1xuICBhbGxEYXRhLmZvckVhY2goZCA9PiB7XG4gICAgZmllbGRzLmZvckVhY2goZiA9PiB7XG4gICAgICBpZiAoIShmIGluIGQpKSB7XG4gICAgICAgIGRbZl0gPSBudWxsO1xuICAgICAgfVxuICAgIH0pO1xuICB9KTtcblxuICByZXR1cm4gcHJvY2Vzc1Jvd09iamVjdChhbGxEYXRhKTtcbn1cblxuLyoqXG4gKiBPbiBleHBvcnQgZGF0YSB0byBjc3ZcbiAqIEBwYXJhbSBkYXRhXG4gKiBAcGFyYW0gZmllbGRzXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBmb3JtYXRDc3YoZGF0YSwgZmllbGRzKSB7XG4gIGNvbnN0IGNvbHVtbnMgPSBmaWVsZHMubWFwKGYgPT4gZi5uYW1lKTtcbiAgY29uc3QgZm9ybWF0dGVkRGF0YSA9IFtjb2x1bW5zXTtcblxuICAvLyBwYXJzZSBnZW9qc29uIG9iamVjdCBhcyBzdHJpbmdcbiAgZGF0YS5mb3JFYWNoKHJvdyA9PiB7XG4gICAgZm9ybWF0dGVkRGF0YS5wdXNoKFxuICAgICAgcm93Lm1hcChcbiAgICAgICAgKGQsIGkpID0+IGQgJiYgR0VPSlNPTl9GSUVMRFMuZ2VvanNvbi5pbmNsdWRlcyhmaWVsZHNbaV0ubmFtZSkgP1xuICAgICAgICAgIEpTT04uc3RyaW5naWZ5KGQpIDogZFxuICAgICAgKVxuICAgIClcbiAgfSk7XG5cbiAgcmV0dXJuIGNzdkZvcm1hdFJvd3MoZm9ybWF0dGVkRGF0YSk7XG59XG5cbi8qKlxuICogQHBhcmFtIGRhdGFcbiAqIEByZXR1cm5zIHt7YWxsRGF0YTogQXJyYXksIGZpZWxkczogQXJyYXl9fVxuICovXG5leHBvcnQgZnVuY3Rpb24gdmFsaWRhdGVJbnB1dERhdGEoZGF0YSkge1xuICAvLyBUT0RPOiBhZGQgdGVzdFxuICAvKlxuICAgKiBleHBlY3RlZCBpbnB1dCBkYXRhIGZvcm1hdFxuICAgKiB7XG4gICAqICAgZmllbGRzOiBbXSxcbiAgICogICByb3dzOiBbXVxuICAgKiB9XG4gICAqL1xuICBsZXQgcHJvY2VlZCA9IHRydWU7XG4gIGlmICghZGF0YSkge1xuICAgIGFzc2VydCgncmVjZWl2ZVZpc0RhdGE6IGRhdGEgY2Fubm90IGJlIG51bGwnKTtcbiAgICBwcm9jZWVkID0gZmFsc2U7XG4gIH0gZWxzZSBpZiAoIUFycmF5LmlzQXJyYXkoZGF0YS5maWVsZHMpKSB7XG4gICAgYXNzZXJ0KCdyZWNlaXZlVmlzRGF0YTogZXhwZWN0IGRhdGEuZmllbGRzIHRvIGJlIGFuIGFycmF5Jyk7XG4gICAgcHJvY2VlZCA9IGZhbHNlO1xuICB9IGVsc2UgaWYgKCFBcnJheS5pc0FycmF5KGRhdGEucm93cykpIHtcbiAgICBhc3NlcnQoJ3JlY2VpdmVWaXNEYXRhOiBleHBlY3QgZGF0YS5yb3dzIHRvIGJlIGFuIGFycmF5Jyk7XG4gICAgcHJvY2VlZCA9IGZhbHNlO1xuICB9XG5cbiAgaWYgKCFwcm9jZWVkKSB7XG4gICAgcmV0dXJuIG51bGw7XG4gIH1cblxuICBjb25zdCB7ZmllbGRzLCByb3dzfSA9IGRhdGE7XG5cbiAgLy8gY2hlY2sgaWYgYWxsIGZpZWxkcyBoYXMgbmFtZSwgZm9ybWF0IGFuZCB0eXBlXG4gIGNvbnN0IGFsbFZhbGlkID0gZmllbGRzLmV2ZXJ5KChmLCBpKSA9PiB7XG4gICAgaWYgKHR5cGVvZiBmICE9PSAnb2JqZWN0Jykge1xuICAgICAgYXNzZXJ0KGBmaWVsZHMgbmVlZHMgdG8gYmUgYW4gYXJyYXkgb2Ygb2JqZWN0LCBidXQgZmluZCAke2Z9YCk7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuXG4gICAgaWYgKCFmLm5hbWUpIHtcbiAgICAgIGFzc2VydChcbiAgICAgICAgYGZpZWxkLm5hbWUgaXMgcmVxdWlyZWQgYnV0IG1pc3NpbmcgaW4gZmllbGQgJHtKU09OLnN0cmluZ2lmeShmKX1gXG4gICAgICApO1xuICAgICAgLy8gYXNzaWduIGEgbmFtZVxuICAgICAgZi5uYW1lID0gYGNvbHVtbl8ke2l9YDtcbiAgICB9XG5cbiAgICBpZiAoIUFMTF9GSUVMRF9UWVBFU1tmLnR5cGVdKSB7XG4gICAgICBhc3NlcnQoYHVua25vd24gZmllbGQgdHlwZSAke2YudHlwZX1gKTtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG5cbiAgICByZXR1cm4gZi50eXBlICE9PSBBTExfRklFTERfVFlQRVMudGltZXN0YW1wIHx8IHR5cGVvZiBmLmZvcm1hdCA9PT0gJ3N0cmluZyc7XG4gIH0pO1xuXG4gIGlmIChhbGxWYWxpZCkge1xuICAgIHJldHVybiB7cm93cywgZmllbGRzfTtcbiAgfVxuXG4gIC8vIGlmIGFueSBmaWVsZCBoYXMgbWlzc2luZyB0eXBlLCByZWNhbGN1bGF0ZSBpdCBmb3IgZXZlcnlvbmVcbiAgLy8gYmVjYXVzZSB3ZSBzaW1wbHkgbG9zdCBmYWl0aCBpbiBodW1hbml0eVxuICBjb25zdCBzYW1wbGVEYXRhID0gZ2V0U2FtcGxlRm9yVHlwZUFuYWx5emUoe2ZpZWxkczogZmllbGRzLm1hcChmID0+IGYubmFtZSksIGFsbERhdGE6IHJvd3N9KTtcbiAgY29uc3QgZmllbGRPcmRlciA9IGZpZWxkcy5tYXAoZiA9PiBmLm5hbWUpO1xuICBjb25zdCBtZXRhID0gZ2V0RmllbGRzRnJvbURhdGEoc2FtcGxlRGF0YSwgZmllbGRPcmRlcik7XG4gIGNvbnN0IHVwZGF0ZWRGaWVsZHMgPSBmaWVsZHMubWFwKChmLCBpKSA9PiAoe1xuICAgIC4uLmYsXG4gICAgdHlwZTogbWV0YVtpXS50eXBlLFxuICAgIGZvcm1hdDogbWV0YVtpXS5mb3JtYXRcbiAgfSkpO1xuXG4gIHJldHVybiB7ZmllbGRzOiB1cGRhdGVkRmllbGRzLCByb3dzfTtcbn1cblxuZXhwb3J0IGRlZmF1bHQge1xuICBwcm9jZXNzR2VvanNvbixcbiAgcHJvY2Vzc0NzdkRhdGEsXG4gIHByb2Nlc3NSb3dPYmplY3QsXG4gIGFuYWx5emVyVHlwZVRvRmllbGRUeXBlLFxuICBnZXRGaWVsZHNGcm9tRGF0YSxcbiAgcGFyc2VDc3ZEYXRhQnlGaWVsZFR5cGVcbn07XG4iXX0=