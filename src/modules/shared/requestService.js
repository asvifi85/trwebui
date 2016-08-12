'use strict';

﻿angular.module('webui-sse.sse').factory('RequestService', ['$http', function ($http) {

  /* var executeRequest = function (url, data, method, callback) {
    $http({
      url: url,
      data: data,
      method: method
    }).success(function (data, status, headers, config) {
      processSuccessCallback(data, status, headers, config, callback);
    })
    .error(function (data, status, headers, config) {
      processErrorCallback(data, status, headers, config, callback);
    });
  };*/

  var get = function (url) {
    var config = { 'header': [
      {
        'key': 'Content-Type',
        'value': 'application/json',
        'description': ''
      },
      {
        'key': 'X-1P-User',
        'value': '2173be5d-e916-4881-bae2-cbb95e922556',
        'description': ''
      }
    ]
};

    return $http.get(url, config);
  };

  var post = function (url, data) {
    return $http.post(url, data);
  };

  var put = function (url, data) {
    return $http.put(url, data);
  };

  var remove = function (url) {
    return $http.delete(url);
  };

  var Request = {
    get: get,
    post: post,
    put: put,
    remove: remove
  };

  return Request;

  /* function processSuccessCallback(data, status, headers, config, callback) {
    callback(data);
  }

  function processErrorCallback(data, status, headers, config, callback) {
    alert('AJAX error');
    callback(data);
  } */

}]);
