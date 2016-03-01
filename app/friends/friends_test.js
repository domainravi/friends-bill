'use strict';

describe('myApp.friends module', function() {

  beforeEach(module('myApp.friends'));

  describe('friends controller', function(){

    it('should ....', inject(function($controller) {
      //spec body
      var friendsCtrl = $controller('friendsCtrl');
      expect(friendsCtrl).toBeDefined();
    }));

  });
});