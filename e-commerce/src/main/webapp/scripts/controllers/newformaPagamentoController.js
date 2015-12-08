
angular.module('ecommerce').controller('NewformaPagamentoController', function ($scope, $location, locationParser, formaPagamentoResource ) {
    $scope.disabled = false;
    $scope.$location = $location;
    $scope.formaPagamento = $scope.formaPagamento || {};
    

    $scope.save = function() {
        var successCallback = function(data,responseHeaders){
            var id = locationParser(responseHeaders);
            $location.path('/formaPagamentos/edit/' + id);
            $scope.displayError = false;
        };
        var errorCallback = function() {
            $scope.displayError = true;
        };
        formaPagamentoResource.save($scope.formaPagamento, successCallback, errorCallback);
    };
    
    $scope.cancel = function() {
        $location.path("/formaPagamentos");
    };
});