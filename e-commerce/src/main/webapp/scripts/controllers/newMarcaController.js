
angular.module('ecommerce').controller('NewMarcaController', function ($scope, $location, locationParser, MarcaResource , ProdutoResource) {
    $scope.disabled = false;
    $scope.$location = $location;
    $scope.marca = $scope.marca || {};
    
    $scope.produtoList = ProdutoResource.queryAll(function(items){
        $scope.produtoSelectionList = $.map(items, function(item) {
            return ( {
                value : item.id,
                text : item.id
            });
        });
    });
    $scope.$watch("produtoSelection", function(selection) {
        if (typeof selection != 'undefined') {
            $scope.marca.produto = [];
            $.each(selection, function(idx,selectedItem) {
                var collectionItem = {};
                collectionItem.id = selectedItem.value;
                $scope.marca.produto.push(collectionItem);
            });
        }
    });
    

    $scope.save = function() {
        var successCallback = function(data,responseHeaders){
            var id = locationParser(responseHeaders);
            $location.path('/Marcas/edit/' + id);
            $scope.displayError = false;
        };
        var errorCallback = function() {
            $scope.displayError = true;
        };
        MarcaResource.save($scope.marca, successCallback, errorCallback);
    };
    
    $scope.cancel = function() {
        $location.path("/Marcas");
    };
});