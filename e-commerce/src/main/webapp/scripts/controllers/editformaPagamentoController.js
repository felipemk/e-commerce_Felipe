

angular.module('ecommerce').controller('EditformaPagamentoController', function($scope, $routeParams, $location, formaPagamentoResource ) {
    var self = this;
    $scope.disabled = false;
    $scope.$location = $location;
    
    $scope.get = function() {
        var successCallback = function(data){
            self.original = data;
            $scope.formaPagamento = new formaPagamentoResource(self.original);
        };
        var errorCallback = function() {
            $location.path("/formaPagamentos");
        };
        formaPagamentoResource.get({formaPagamentoId:$routeParams.formaPagamentoId}, successCallback, errorCallback);
    };

    $scope.isClean = function() {
        return angular.equals(self.original, $scope.formaPagamento);
    };

    $scope.save = function() {
        var successCallback = function(){
            $scope.get();
            $scope.displayError = false;
        };
        var errorCallback = function() {
            $scope.displayError=true;
        };
        $scope.formaPagamento.$update(successCallback, errorCallback);
    };

    $scope.cancel = function() {
        $location.path("/formaPagamentos");
    };

    $scope.remove = function() {
        var successCallback = function() {
            $location.path("/formaPagamentos");
            $scope.displayError = false;
        };
        var errorCallback = function() {
            $scope.displayError=true;
        }; 
        $scope.formaPagamento.$remove(successCallback, errorCallback);
    };
    
    
    $scope.get();
});