angular.module('ecommerce').factory('formaPagamentoResource', function($resource){
    var resource = $resource('rest/formapagamentos/:formaPagamentoId',{formaPagamentoId:'@id'},{'queryAll':{method:'GET',isArray:true},'query':{method:'GET',isArray:false},'update':{method:'PUT'}});
    return resource;
});