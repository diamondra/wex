app.directive('wexModalConfirm',['$uibModal', function ($uibModal) {
        return {
            restrict: 'A',
            scope: {
                wexModalConfirmMessage: '@',
                wexModalConfirm: '&'
            },
            link: function (scope, element) {
                element.bind('click', function () {
					var modalInstance = $uibModal.open({
						templateUrl: '/app/js/partials/modalconfirm/views/modalconfirm.html',
						controller: 'ModalConfirmCtrl',
						size: 'sm',
						windowClass: 'confirm-window',
						resolve: {
							confirmClick: function () {
								return scope.wexModalConfirm;
							},
							confirmMessge: function () {
								return scope.wexModalConfirmMessage;
							}
						}
					});
                });
            }
        }
    }]);