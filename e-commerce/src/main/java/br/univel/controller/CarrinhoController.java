package br.univel.controller;

import javax.inject.Inject;
import javax.ws.rs.PathParam;

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

	public void adicionarProduto(@PathParam("id") long id) {
		Produto p = pe.findById(id).readEntity(Produto.class);
	}

	public void limpar() {
		carrinho.limpar();
	}

	public void finalizar() {

		Venda venda = new Venda();
		venda.setProduto(carrinho.getProduto());
	}
}
