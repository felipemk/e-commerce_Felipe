package br.univel.controller;

import java.util.HashMap;

import javax.inject.Inject;

import br.univel.model.Produto;
import br.univel.model.Venda;
import br.univel.rest.ProdutoEndpoint;
import br.univel.rest.VendaEndpoint;

public class CarrinhoController {

	@Inject
	private Carrinho carrinho;

	@Inject
	private ProdutoEndpoint pe;

	@Inject
	private VendaEndpoint vendaEp;

	public void addProduto(Produto produto) {
		Object produtos;
		ProdutoPedido pp = ((Object) produtos).get(produto.getId());

		if (pp == null) {
			pp = new ProdutoPedido();
			pp.setProduto(produto);
			pp.setPreco(produto.getPreco());
			pp.addProduto();
		} else {
			pp.addProduto();
		}

		produtos.put(produto.getId(), pp);
	}

	public void finalizarPedido() {

		Pedido pedido = new Pedido();
		entityManager.persist(pedido);

		for (ProdutoPedido produtoPedido : this.produtos.values()) {
			produtoPedido.setProduto(entityManager.merge(produtoPedido
					.getProduto()));
			produtoPedido.setPedido(pedido);
			entityManager.persist(produtoPedido);
		}

		limpaCarrinho();
	}

	public void removeProduto(Long id) {
		produtos.remove(id);
	}

	public void limpaCarrinho() {
		produtos = new HashMap<Long, ProdutoPedido>();
	}

	public void limpar() {
		carrinho.limpar();
	}

	public void finalizar() {

		Venda venda = new Venda();
		venda.setProduto(carrinho.getProduto());
	}
}
