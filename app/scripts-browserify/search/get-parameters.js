const config = require('collections-online/shared/config');

/**
 * This module generates search parameters that will lead to a specific
 * filtering and sorting being activated, based on the querystring.
 * This is the inverse of generate-querystring.
 */

var querystring = require('querystring');
const DEFAULT_SORTING = require('./default-sorting');

module.exports = function() {
  var urlParams = window.location.search.substring(1);
  var parameters = querystring.parse(urlParams);

  // Extract the sorting query parameter
  var sorting = parameters.sort || DEFAULT_SORTING;
  delete parameters.sort;

  var filters = {};

  // The rest are filters
  Object.keys(parameters).forEach(function(field) {
    // TODO: Look for the skipSplit config parameter
    var filter = config.search.filters[field];
    if(filter) {
      var value = parameters[field];
      if(!filter.skipSplit) {
        value = value.split(',');
      }
      filters[field] = value;
    } else {
      console.warn('Skipping an unexpected search parameter:', field);
    }
  });

  return {
    filters: filters,
    sorting: sorting
  };
};
