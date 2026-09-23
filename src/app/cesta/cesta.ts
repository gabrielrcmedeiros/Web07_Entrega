import { Component, OnInit } from '@angular/core';
import { ItemCesta } from '../model/item-cesta';
import { CommonModule } from '@angular/common';

@Component({
  imports: [CommonModule],
  selector: 'app-cesta',
  styleUrl: './cesta.css',
  templateUrl: './cesta.html',
})
export class Cesta implements OnInit {
  mensagem: string = "";
  valorCesta: number = 0;

  /* Inicialização da lista vazia para posterior preenchimento dinâmico */
  itens: ItemCesta[] = [];

  ngOnInit() {
    /* Verifica se a execução está ocorrendo no ambiente do navegador antes de acessar o localStorage */
    if (typeof window !== 'undefined' && window.localStorage) {
      let cestaStorage = localStorage.getItem('cesta');
      
      if (cestaStorage) {
        this.itens = JSON.parse(cestaStorage);
      }
    }
    
    /* Atribuição de mensagem informativa caso a lista resultante esteja vazia */
    if (this.itens.length === 0) {
      this.mensagem = "Sua cesta de compras está vazia.";
    }

    /* Invocação da rotina de cálculo do valor agregado */
    this.calculaTotal();
  }

  calculaTotal() {
    this.valorCesta = 0;
    for (let obj of this.itens) {
      this.valorCesta += obj.valorTotal;
    }
  }
}