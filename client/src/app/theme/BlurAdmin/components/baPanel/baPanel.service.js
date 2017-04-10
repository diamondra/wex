/**
 * @author v.lugovsky
 * created on 23.12.2015
 */
(function () {
  'use strict';

  angular.module('BlurAdmin.theme')
      .factory('baPanel', baPanel);

  /** @ngInject */
  function baPanel() {

    /** Base baPanel directive */
    return {
      restrict: 'A',
      transclude: true,
      template: function(elem, attrs) {
        var res = '<div class="panel-body" ng-transclude></div>';
        if (attrs.baPanelTitle) {
			var titleTpl = '<div class="panel-heading clearfix" ';
			if (attrs.baPanelRightLink) {
				titleTpl += 'style="display:flex;align-items:center;justify-content: space-between;"><div style="flex:1"><h3 class="panel-title">' + attrs.baPanelTitle + '</h3></div><div style="flex:1" class="text-right"><a href="'+attrs.baPanelRightLink+'" class="btn btn-mm btn-success"><i class="ion '+attrs.baPanelRightIcon+'"></i></a></div></div>';
			}
			else {
				titleTpl += '><h3 class="panel-title">' + attrs.baPanelTitle + '</h3></div>';
			}
          res = titleTpl + res; // title should be before
        }

        return res;
      }
    };
  }

})();
