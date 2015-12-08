package br.univel.model;

import javax.persistence.Entity;
import java.io.Serializable;
import javax.persistence.Table;
import javax.persistence.Id;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Column;
import javax.persistence.Version;
import java.lang.Override;
import javax.persistence.OneToOne;
import br.univel.model.Marca;
import javax.persistence.ManyToOne;
import javax.xml.bind.annotation.XmlRootElement;

@Entity
@Table(name = "Produto")
@XmlRootElement
public class Produto implements Serializable
{

   @Id
   @GeneratedValue(strategy = GenerationType.SEQUENCE)
   @Column(name = "id", updatable = false, nullable = false)
   private Long id;
   @Version
   @Column(name = "version")
   private int version;

   @OneToOne(mappedBy = "produto")
   private categoriaProduto categoriaProduto;

   @ManyToOne
   private Marca marca;

   @Column(nullable = false)
   private String nome;

   @Column(nullable = false)
   private String descricao;

   public Long getId()
   {
      return this.id;
   }

   public void setId(final Long id)
   {
      this.id = id;
   }

   public int getVersion()
   {
      return this.version;
   }

   public void setVersion(final int version)
   {
      this.version = version;
   }

   @Override
   public boolean equals(Object obj)
   {
      if (this == obj)
      {
         return true;
      }
      if (!(obj instanceof Produto))
      {
         return false;
      }
      Produto other = (Produto) obj;
      if (id != null)
      {
         if (!id.equals(other.id))
         {
            return false;
         }
      }
      return true;
   }

   @Override
   public int hashCode()
   {
      final int prime = 31;
      int result = 1;
      result = prime * result + ((id == null) ? 0 : id.hashCode());
      return result;
   }

   public categoriaProduto getCategoriaProduto()
   {
      return categoriaProduto;
   }

   public void setCategoriaProduto(categoriaProduto categoriaProduto)
   {
      this.categoriaProduto = categoriaProduto;
   }

   public Marca getMarca()
   {
      return this.marca;
   }

   public void setMarca(final Marca marca)
   {
      this.marca = marca;
   }

   public String getNome()
   {
      return nome;
   }

   public void setNome(String nome)
   {
      this.nome = nome;
   }

   public String getDescricao()
   {
      return descricao;
   }

   public void setDescricao(String descricao)
   {
      this.descricao = descricao;
   }

   @Override
   public String toString()
   {
      String result = getClass().getSimpleName() + " ";
      if (nome != null && !nome.trim().isEmpty())
         result += "nome: " + nome;
      if (descricao != null && !descricao.trim().isEmpty())
         result += ", descricao: " + descricao;
      return result;
   }
}