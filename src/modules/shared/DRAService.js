'use strict';

angular.module('webui-sse.sse').factory('DRAService', ['RequestService', function (RequestService) {
  return {
    getContainerMetadataByName: getContainerMetadataByName,
    getContainerMetadata: getContainerMetadata,
    getContainerMetadataBySort: getContainerMetadataBySort,
    getItem: getItem,
    addItemToContainer: addItemToContainer,
    updateItem: updateItem,
    removeItems: removeItems
  };
  function getContainerMetadataByName(hostName, containerName, callback) {
 /*    RequestService.get('http://ec2-52-42-214-135.us-west-2.compute.amazonaws.com:7001/container/type/Gets container Metadata by Name', function(data) {
      callback(data);
    }); */
	   RequestService.get('./data/data.json', function(data) {
      callback(data);
    });
  }

  function getContainerMetadata(hostName, callback) {
    RequestService.get('http://ec2-52-26-238-26.us-west-2.compute.amazonaws.com:7001/container/72bfba40-5e6e-11e6-b5cf-97a2a2a20d50/items?itemType=dra_ss&sortoption=lastviewed', function(data) {
      callback(data);
    });
  }

  function getContainerMetadataBySort(hostName,callback) {
    console.log("hostName");
    console.log(hostName)
    console.log(arguments);
    return RequestService.get('http://ec2-52-26-238-26.us-west-2.compute.amazonaws.com:7001/container/c5d317f0-5f35-11e6-8143-ffb7d126c69a/items?itemType=dra_ss&sortoption=datesaved');
  }

  function getItem(hostName, itemId, callback) {
    RequestService.get('http://' + hostName + ':7001/container/2245c700-5813-11e6-9ec9-3d0080870fca/' + itemId, function(data) {
      callback(data);
    });
  }

  function addItemToContainer(hostName, itemData, callback) {
    RequestService.post('http://' + hostName + ':7001/container/f394b090-581e-11e6-a5f8-3d0080870fca/items?type=dra_ss', itemData, function(data) {
      callback(data);
    });
  }

  function updateItem(hostName, itemId, itemData, callback) {
    RequestService.post('http://' + hostName + ':7001/container/2245c700-5813-11e6-9ec9-3d0080870fca/' + itemId, itemData, function(data) {
      callback(data);
    });
  }

  function removeItems(hostName, itemIds, callback) {
    RequestService.remove('http://' + hostName + ':7001/container/2245c700-5813-11e6-9ec9-3d0080870fca/items/' + itemIds, function(data) {
      callback(data);
    });
  }
}]);
