angular.module('ecommerce').factory('MarcaResource', function($resource){
    var resource = $resource('rest/marcas/:MarcaId',{MarcaId:'@id'},{'queryAll':{method:'GET',isArray:true},'query':{method:'GET',isArray:false},'update':{method:'PUT'}});
    return resource;
});