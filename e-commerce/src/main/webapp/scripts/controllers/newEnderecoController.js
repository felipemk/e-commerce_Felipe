
angular.module('ecommerce').controller('NewEnderecoController', function ($scope, $location, locationParser, EnderecoResource ) {
    $scope.disabled = false;
    $scope.$location = $location;
    $scope.endereco = $scope.endereco || {};
    

    $scope.save = function() {
        var successCallback = function(data,responseHeaders){
            var id = locationParser(responseHeaders);
            $location.path('/Enderecos/edit/' + id);
            $scope.displayError = false;
        };
        var errorCallback = function() {
            $scope.displayError = true;
        };
        EnderecoResource.save($scope.endereco, successCallback, errorCallback);
    };
    
    $scope.cancel = function() {
        $location.path("/Enderecos");
    };
});