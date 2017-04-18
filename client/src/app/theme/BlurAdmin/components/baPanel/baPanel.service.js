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
			if (attrs.baPanelRightLink || attrs.baPanelRightLink2) {
				titleTpl += 'style="display:flex;align-items:center;justify-content: space-between;">';
				titleTpl += '<div><h3 class="panel-title">' + attrs.baPanelTitle + '</h3></div>';
				titleTpl += '<div style="flex:1;" class="text-right">';
				if (attrs.baPanelRightLink){
					titleTpl += '<a href="'+attrs.baPanelRightLink+'" class="btn btn-mm '+attrs.baPanelButtonClass+'" style="margin-right:5px;"><i class="ion '+attrs.baPanelRightIcon+'"></i></a>';
				}
				if (attrs.baPanelRightLink2){
					titleTpl += '<a href="'+attrs.baPanelRightLink2+'" class="btn btn-mm '+attrs.baPanelButtonClass2+'"><i class="ion '+attrs.baPanelRightIcon2+'"></i></a>';
				}				
				titleTpl += '</div>';
				titleTpl += '</div>';
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
