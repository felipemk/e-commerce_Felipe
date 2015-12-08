angular.module('ecommerce').factory('categoriaProdutoResource', function($resource){
    var resource = $resource('rest/categoriaprodutos/:categoriaProdutoId',{categoriaProdutoId:'@id'},{'queryAll':{method:'GET',isArray:true},'query':{method:'GET',isArray:false},'update':{method:'PUT'}});
    return resource;
});