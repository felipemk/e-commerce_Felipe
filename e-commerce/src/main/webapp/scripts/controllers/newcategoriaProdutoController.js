
angular.module('ecommerce').controller('NewcategoriaProdutoController', function ($scope, $location, locationParser, categoriaProdutoResource , ProdutoResource) {
    $scope.disabled = false;
    $scope.$location = $location;
    $scope.categoriaProduto = $scope.categoriaProduto || {};
    
    $scope.produtoList = ProdutoResource.queryAll(function(items){
        $scope.produtoSelectionList = $.map(items, function(item) {
            return ( {
                value : item.id,
                text : item.id
            });
        });
    });
    $scope.$watch("produtoSelection", function(selection) {
        if ( typeof selection != 'undefined') {
            $scope.categoriaProduto.produto = {};
            $scope.categoriaProduto.produto.id = selection.value;
        }
    });
    

    $scope.save = function() {
        var successCallback = function(data,responseHeaders){
            var id = locationParser(responseHeaders);
            $location.path('/categoriaProdutos/edit/' + id);
            $scope.displayError = false;
        };
        var errorCallback = function() {
            $scope.displayError = true;
        };
        categoriaProdutoResource.save($scope.categoriaProduto, successCallback, errorCallback);
    };
    
    $scope.cancel = function() {
        $location.path("/categoriaProdutos");
    };
});