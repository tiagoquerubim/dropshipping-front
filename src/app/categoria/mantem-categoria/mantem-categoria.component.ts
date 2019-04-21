import { Component, OnInit, ViewChild } from "@angular/core";
import { NgForm } from "@angular/forms";
import { ActivatedRoute } from "@angular/router";
import { Categoria } from "src/app/entities/Categoria";
import { BreadcrumbService } from "src/app/services/breadcrumb/breadcrumb.service";
import { CategoriaService } from "../api-categoria/categoria.service";
import { Location } from "@angular/common";

@Component({
    selector: 'app-mantem-categoria',
    templateUrl: './mantem-categoria.component.html'
})
export class MantemCategoriaComponent implements OnInit {

    categoria: Categoria;
    @ViewChild('categoriaForm') categoriaForm: NgForm;

    constructor(private breadcrumbService: BreadcrumbService,
                private categoriaService: CategoriaService,
                private route: ActivatedRoute,
                private location: Location){
        this.categoria = new Categoria();
        this.breadcrumbService.setItems([
            { label: 'Início/', routerLink: 'inicio' }, 
            {label: 'Categorias/', routerLink: 'listaCategoria'},
            {label: 'Cadastro de Categoria', routerLink: 'mantemCategorias'}
        ]);
    }
    ngOnInit(){
        if (this.route.snapshot.url[0] && this.route.snapshot.url[0].path === 'editarCategorias') {
            this.route.params.subscribe(params => {
              this.categoriaService.getCategoriaById(params['id'])
                .then(res => this.categoria = res.data);
            });
          } else {
            this.inicializarCategoria();
          }
    }

    inicializarCategoria() {
        this.categoria = new Categoria();
      }

      goBack() {
        this.location.back();
    
      }
    salvar(): void {
        if (this.categoriaForm.invalid) {
          return;
        }
    
        if (this.categoria.id) {
          this.categoriaService.alterarCategoria(this.categoria);
        } else {
          this.categoriaService.salvarCategoria(this.categoria)
            .then(() => {
              this.categoriaForm.reset();
              setTimeout(() => this.inicializarCategoria(), 0);
            });
        } 
      }
}