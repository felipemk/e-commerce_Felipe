
angular.module('ecommerce').controller('NewProdutoController', function ($scope, $location, locationParser, ProdutoResource , categoriaProdutoResource, MarcaResource) {
    $scope.disabled = false;
    $scope.$location = $location;
    $scope.produto = $scope.produto || {};
    
    $scope.categoriaProdutoList = categoriaProdutoResource.queryAll(function(items){
        $scope.categoriaProdutoSelectionList = $.map(items, function(item) {
            return ( {
                value : item.id,
                text : item.id
            });
        });
    });
    $scope.$watch("categoriaProdutoSelection", function(selection) {
        if ( typeof selection != 'undefined') {
            $scope.produto.categoriaProduto = {};
            $scope.produto.categoriaProduto.id = selection.value;
        }
    });
    
    $scope.marcaList = MarcaResource.queryAll(function(items){
        $scope.marcaSelectionList = $.map(items, function(item) {
            return ( {
                value : item.id,
                text : item.id
            });
        });
    });
    $scope.$watch("marcaSelection", function(selection) {
        if ( typeof selection != 'undefined') {
            $scope.produto.marca = {};
            $scope.produto.marca.id = selection.value;
        }
    });
    

    $scope.save = function() {
        var successCallback = function(data,responseHeaders){
            var id = locationParser(responseHeaders);
            $location.path('/Produtos/edit/' + id);
            $scope.displayError = false;
        };
        var errorCallback = function() {
            $scope.displayError = true;
        };
        ProdutoResource.save($scope.produto, successCallback, errorCallback);
    };
    
    $scope.cancel = function() {
        $location.path("/Produtos");
    };
});