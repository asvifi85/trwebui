'use strict';

describe('ListController Spec', function () {

  var vm;
  var $controller;

  beforeEach(module('webui-sse.dra'));

  beforeEach(inject(function (_$controller_) {
    $controller = _$controller_;

    vm = $controller('ListController', {});
  }));

  it('should exist', function () {
    expect(vm).to.exist();
  });

});
