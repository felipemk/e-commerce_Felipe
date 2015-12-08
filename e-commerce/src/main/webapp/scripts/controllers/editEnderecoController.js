

angular.module('ecommerce').controller('EditEnderecoController', function($scope, $routeParams, $location, EnderecoResource ) {
    var self = this;
    $scope.disabled = false;
    $scope.$location = $location;
    
    $scope.get = function() {
        var successCallback = function(data){
            self.original = data;
            $scope.endereco = new EnderecoResource(self.original);
        };
        var errorCallback = function() {
            $location.path("/Enderecos");
        };
        EnderecoResource.get({EnderecoId:$routeParams.EnderecoId}, successCallback, errorCallback);
    };

    $scope.isClean = function() {
        return angular.equals(self.original, $scope.endereco);
    };

    $scope.save = function() {
        var successCallback = function(){
            $scope.get();
            $scope.displayError = false;
        };
        var errorCallback = function() {
            $scope.displayError=true;
        };
        $scope.endereco.$update(successCallback, errorCallback);
    };

    $scope.cancel = function() {
        $location.path("/Enderecos");
    };

    $scope.remove = function() {
        var successCallback = function() {
            $location.path("/Enderecos");
            $scope.displayError = false;
        };
        var errorCallback = function() {
            $scope.displayError=true;
        }; 
        $scope.endereco.$remove(successCallback, errorCallback);
    };
    
    
    $scope.get();
});