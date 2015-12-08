'use strict';

angular.module('ecommerce',['ngRoute','ngResource'])
  .config(['$routeProvider', function($routeProvider) {
    $routeProvider
      .when('/',{templateUrl:'views/landing.html',controller:'LandingPageController'})
      .when('/Clientes',{templateUrl:'views/Cliente/search.html',controller:'SearchClienteController'})
      .when('/Clientes/new',{templateUrl:'views/Cliente/detail.html',controller:'NewClienteController'})
      .when('/Clientes/edit/:ClienteId',{templateUrl:'views/Cliente/detail.html',controller:'EditClienteController'})
      .when('/Enderecos',{templateUrl:'views/Endereco/search.html',controller:'SearchEnderecoController'})
      .when('/Enderecos/new',{templateUrl:'views/Endereco/detail.html',controller:'NewEnderecoController'})
      .when('/Enderecos/edit/:EnderecoId',{templateUrl:'views/Endereco/detail.html',controller:'EditEnderecoController'})
      .when('/Marcas',{templateUrl:'views/Marca/search.html',controller:'SearchMarcaController'})
      .when('/Marcas/new',{templateUrl:'views/Marca/detail.html',controller:'NewMarcaController'})
      .when('/Marcas/edit/:MarcaId',{templateUrl:'views/Marca/detail.html',controller:'EditMarcaController'})
      .when('/Produtos',{templateUrl:'views/Produto/search.html',controller:'SearchProdutoController'})
      .when('/Produtos/new',{templateUrl:'views/Produto/detail.html',controller:'NewProdutoController'})
      .when('/Produtos/edit/:ProdutoId',{templateUrl:'views/Produto/detail.html',controller:'EditProdutoController'})
      .when('/Vendas',{templateUrl:'views/Venda/search.html',controller:'SearchVendaController'})
      .when('/Vendas/new',{templateUrl:'views/Venda/detail.html',controller:'NewVendaController'})
      .when('/Vendas/edit/:VendaId',{templateUrl:'views/Venda/detail.html',controller:'EditVendaController'})
      .when('/categoriaProdutos',{templateUrl:'views/categoriaProduto/search.html',controller:'SearchcategoriaProdutoController'})
      .when('/categoriaProdutos/new',{templateUrl:'views/categoriaProduto/detail.html',controller:'NewcategoriaProdutoController'})
      .when('/categoriaProdutos/edit/:categoriaProdutoId',{templateUrl:'views/categoriaProduto/detail.html',controller:'EditcategoriaProdutoController'})
      .when('/formaPagamentos',{templateUrl:'views/formaPagamento/search.html',controller:'SearchformaPagamentoController'})
      .when('/formaPagamentos/new',{templateUrl:'views/formaPagamento/detail.html',controller:'NewformaPagamentoController'})
      .when('/formaPagamentos/edit/:formaPagamentoId',{templateUrl:'views/formaPagamento/detail.html',controller:'EditformaPagamentoController'})
      .otherwise({
        redirectTo: '/'
      });
  }])
  .controller('LandingPageController', function LandingPageController() {
  })
  .controller('NavController', function NavController($scope, $location) {
    $scope.matchesRoute = function(route) {
        var path = $location.path();
        return (path === ("/" + route) || path.indexOf("/" + route + "/") == 0);
    };
  });
