

angular.module('ecommerce').controller('EditProdutoController', function($scope, $routeParams, $location, ProdutoResource , categoriaProdutoResource, MarcaResource) {
    var self = this;
    $scope.disabled = false;
    $scope.$location = $location;
    
    $scope.get = function() {
        var successCallback = function(data){
            self.original = data;
            $scope.produto = new ProdutoResource(self.original);
            categoriaProdutoResource.queryAll(function(items) {
                $scope.categoriaProdutoSelectionList = $.map(items, function(item) {
                    var wrappedObject = {
                        id : item.id
                    };
                    var labelObject = {
                        value : item.id,
                        text : item.id
                    };
                    if($scope.produto.categoriaProduto && item.id == $scope.produto.categoriaProduto.id) {
                        $scope.categoriaProdutoSelection = labelObject;
                        $scope.produto.categoriaProduto = wrappedObject;
                        self.original.categoriaProduto = $scope.produto.categoriaProduto;
                    }
                    return labelObject;
                });
            });
            MarcaResource.queryAll(function(items) {
                $scope.marcaSelectionList = $.map(items, function(item) {
                    var wrappedObject = {
                        id : item.id
                    };
                    var labelObject = {
                        value : item.id,
                        text : item.id
                    };
                    if($scope.produto.marca && item.id == $scope.produto.marca.id) {
                        $scope.marcaSelection = labelObject;
                        $scope.produto.marca = wrappedObject;
                        self.original.marca = $scope.produto.marca;
                    }
                    return labelObject;
                });
            });
        };
        var errorCallback = function() {
            $location.path("/Produtos");
        };
        ProdutoResource.get({ProdutoId:$routeParams.ProdutoId}, successCallback, errorCallback);
    };

    $scope.isClean = function() {
        return angular.equals(self.original, $scope.produto);
    };

    $scope.save = function() {
        var successCallback = function(){
            $scope.get();
            $scope.displayError = false;
        };
        var errorCallback = function() {
            $scope.displayError=true;
        };
        $scope.produto.$update(successCallback, errorCallback);
    };

    $scope.cancel = function() {
        $location.path("/Produtos");
    };

    $scope.remove = function() {
        var successCallback = function() {
            $location.path("/Produtos");
            $scope.displayError = false;
        };
        var errorCallback = function() {
            $scope.displayError=true;
        }; 
        $scope.produto.$remove(successCallback, errorCallback);
    };
    
    $scope.$watch("categoriaProdutoSelection", function(selection) {
        if (typeof selection != 'undefined') {
            $scope.produto.categoriaProduto = {};
            $scope.produto.categoriaProduto.id = selection.value;
        }
    });
    $scope.$watch("marcaSelection", function(selection) {
        if (typeof selection != 'undefined') {
            $scope.produto.marca = {};
            $scope.produto.marca.id = selection.value;
        }
    });
    
    $scope.get();
});