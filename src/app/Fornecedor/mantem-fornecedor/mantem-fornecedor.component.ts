import { Component, ViewChild, OnInit } from "@angular/core";
import { NgForm } from "@angular/forms";
import { ActivatedRoute } from "@angular/router";
import { Fornecedor } from "src/app/entities/Fornecedor";
import { BreadcrumbService } from "src/app/services/breadcrumb/breadcrumb.service";
import { FornecedorService } from "../api-fornecedor/fornecedor.service";
import { Location } from "@angular/common";

@Component({
    selector: 'app-mantem-fornecedor',
    templateUrl: './mantem-fornecedor.component.html'
})
export class MantemFornecedorComponent implements OnInit{

    fornecedor: Fornecedor;
    @ViewChild('fornecedorForm') fornecedorForm: NgForm;

    constructor(private breadcrumbService: BreadcrumbService,
                private fornecedorService: FornecedorService,
                private route: ActivatedRoute,
                private location: Location){
        this.fornecedor = new Fornecedor();
        this.breadcrumbService.setItems([
            { label: 'Início/', routerLink: 'inicio' }, 
            {label: 'Fornecedores/', routerLink: 'listaFornecedor'},
            {label: 'Cadastro de fornecedor', routerLink: 'mantemFornecedor'}
          ]);
    }

    ngOnInit() {
      if (this.route.snapshot.url[0] && this.route.snapshot.url[0].path === 'editarFornecedor') {
        this.route.params.subscribe(params => {
          this.fornecedorService.getForncedorById(params['id'])
            .then(res => this.fornecedor = res.data);
        });
      } else {
        this.inicializarFornecedor();
      }
        this.inicializarFornecedor();
    }

    inicializarFornecedor() {
        this.fornecedor = new Fornecedor();
      }

      goBack() {
        this.location.back();
    
      }

      salvar(): void {
        if (this.fornecedorForm.invalid) {
          return;
        }
    
        if (this.fornecedor.id) {
       //   this.lojaService.alterarLoja(this.loja);
        } else {
          this.fornecedorService.salvarFornecedor(this.fornecedor)
            .then(() => {
              this.fornecedorForm.reset();
              setTimeout(() => this.inicializarFornecedor(), 0);
            });
        } 
      }

}