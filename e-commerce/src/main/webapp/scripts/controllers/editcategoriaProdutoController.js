

angular.module('ecommerce').controller('EditcategoriaProdutoController', function($scope, $routeParams, $location, categoriaProdutoResource , ProdutoResource) {
    var self = this;
    $scope.disabled = false;
    $scope.$location = $location;
    
    $scope.get = function() {
        var successCallback = function(data){
            self.original = data;
            $scope.categoriaProduto = new categoriaProdutoResource(self.original);
            ProdutoResource.queryAll(function(items) {
                $scope.produtoSelectionList = $.map(items, function(item) {
                    var wrappedObject = {
                        id : item.id
                    };
                    var labelObject = {
                        value : item.id,
                        text : item.id
                    };
                    if($scope.categoriaProduto.produto && item.id == $scope.categoriaProduto.produto.id) {
                        $scope.produtoSelection = labelObject;
                        $scope.categoriaProduto.produto = wrappedObject;
                        self.original.produto = $scope.categoriaProduto.produto;
                    }
                    return labelObject;
                });
            });
        };
        var errorCallback = function() {
            $location.path("/categoriaProdutos");
        };
        categoriaProdutoResource.get({categoriaProdutoId:$routeParams.categoriaProdutoId}, successCallback, errorCallback);
    };

    $scope.isClean = function() {
        return angular.equals(self.original, $scope.categoriaProduto);
    };

    $scope.save = function() {
        var successCallback = function(){
            $scope.get();
            $scope.displayError = false;
        };
        var errorCallback = function() {
            $scope.displayError=true;
        };
        $scope.categoriaProduto.$update(successCallback, errorCallback);
    };

    $scope.cancel = function() {
        $location.path("/categoriaProdutos");
    };

    $scope.remove = function() {
        var successCallback = function() {
            $location.path("/categoriaProdutos");
            $scope.displayError = false;
        };
        var errorCallback = function() {
            $scope.displayError=true;
        }; 
        $scope.categoriaProduto.$remove(successCallback, errorCallback);
    };
    
    $scope.$watch("produtoSelection", function(selection) {
        if (typeof selection != 'undefined') {
            $scope.categoriaProduto.produto = {};
            $scope.categoriaProduto.produto.id = selection.value;
        }
    });
    
    $scope.get();
});