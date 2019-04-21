import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AppComponent } from '../../app.component';

@Component({
    selector: 'app-topbar',
    templateUrl: './app.topbar.component.html',
    styleUrls: ['./app.topbar.component.scss']
})
export class AppTopBarComponent implements OnInit {

    nomeUsuarioLogado;
    nomePessoaJuridica;

    ngOnInit(){
       this.carregarTela();
    }

    carregarTela(){
        this.nomePessoaJuridica = "Usuario";
        this.nomeUsuarioLogado = "Usuario"
    }

    constructor(public app: AppComponent,
         private router: Router) { }

    logout(): void {
      
    }
}
