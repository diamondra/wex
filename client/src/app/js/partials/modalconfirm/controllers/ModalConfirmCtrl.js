app.controller('ModalConfirmCtrl', ['$scope', '$uibModalInstance', 'confirmClick', 'confirmMessge',function ($scope, $uibModalInstance, confirmClick, confirmMessge) {
	$scope.confirmMessage = confirmMessge;
	function closeModal() {
		$uibModalInstance.dismiss('cancel');
	}

	$scope.ok = function () {
		confirmClick();
		closeModal();
	}

	$scope.cancel = function () {
		closeModal();
	}
}]);