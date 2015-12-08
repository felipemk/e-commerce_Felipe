

angular.module('ecommerce').controller('EditMarcaController', function($scope, $routeParams, $location, MarcaResource , ProdutoResource) {
    var self = this;
    $scope.disabled = false;
    $scope.$location = $location;
    
    $scope.get = function() {
        var successCallback = function(data){
            self.original = data;
            $scope.marca = new MarcaResource(self.original);
            ProdutoResource.queryAll(function(items) {
                $scope.produtoSelectionList = $.map(items, function(item) {
                    var wrappedObject = {
                        id : item.id
                    };
                    var labelObject = {
                        value : item.id,
                        text : item.id
                    };
                    if($scope.marca.produto){
                        $.each($scope.marca.produto, function(idx, element) {
                            if(item.id == element.id) {
                                $scope.produtoSelection.push(labelObject);
                                $scope.marca.produto.push(wrappedObject);
                            }
                        });
                        self.original.produto = $scope.marca.produto;
                    }
                    return labelObject;
                });
            });
        };
        var errorCallback = function() {
            $location.path("/Marcas");
        };
        MarcaResource.get({MarcaId:$routeParams.MarcaId}, successCallback, errorCallback);
    };

    $scope.isClean = function() {
        return angular.equals(self.original, $scope.marca);
    };

    $scope.save = function() {
        var successCallback = function(){
            $scope.get();
            $scope.displayError = false;
        };
        var errorCallback = function() {
            $scope.displayError=true;
        };
        $scope.marca.$update(successCallback, errorCallback);
    };

    $scope.cancel = function() {
        $location.path("/Marcas");
    };

    $scope.remove = function() {
        var successCallback = function() {
            $location.path("/Marcas");
            $scope.displayError = false;
        };
        var errorCallback = function() {
            $scope.displayError=true;
        }; 
        $scope.marca.$remove(successCallback, errorCallback);
    };
    
    $scope.produtoSelection = $scope.produtoSelection || [];
    $scope.$watch("produtoSelection", function(selection) {
        if (typeof selection != 'undefined' && $scope.marca) {
            $scope.marca.produto = [];
            $.each(selection, function(idx,selectedItem) {
                var collectionItem = {};
                collectionItem.id = selectedItem.value;
                $scope.marca.produto.push(collectionItem);
            });
        }
    });
    
    $scope.get();
});