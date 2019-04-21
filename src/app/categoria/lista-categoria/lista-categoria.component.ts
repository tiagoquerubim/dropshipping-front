import { Component, ViewChild } from "@angular/core";

import { Table } from "primeng/table";

import { ConfirmationService, LazyLoadEvent } from "primeng/api";

import { HttpParams } from "@angular/common/http";
import { LazyRoute } from "@angular/compiler";
import { IServiceResponse } from "src/app/entities/IResponse";
import { IPage } from "src/app/entities/IPage";
import { Categoria } from "src/app/entities/Categoria";
import { CategoriaService } from "../api-categoria/categoria.service";
import { UtilityService } from "src/app/services/utility/utility.service";
import { BreadcrumbService } from "src/app/services/breadcrumb/breadcrumb.service";

@Component({
    selector: 'app-lista-categoria',
    templateUrl: './lista-categoria.component.html'
})
export class ListaCategoriaComponent {

    responseCategoria: IServiceResponse<IPage<Categoria>>;
    nrLinhasTabela = 10 ;
    filtroDescricao = '';
    filtroId = '';
    private debouncer;
    private delay = 500;
    @ViewChild('dt') dt: Table;

    cols: { field: string, header: string }[];

    constructor(private categoriaService: CategoriaService,
        private utilityService: UtilityService,
        private confirmationService: ConfirmationService,
        private breadcrumbService: BreadcrumbService) { 
            this.breadcrumbService.setItems([
                { label: 'Início/', routerLink: 'inicio' },
                {label: 'Categoria', routerLink: 'listaCategoria'}
              ]);
        }

    ngOnInit(){
        this.cols = [
            { field: 'id', header: 'Id' },
            { field: 'descricao', header: 'Categoria' }
          ];
    }

    loadLazy(event: LazyLoadEvent) {

        this.getFornecedor(event.first / event.rows, event.sortField, event.sortOrder).then(response => {
          this.responseCategoria = response;
        });
      }
      
      
    getFornecedor(pagina = 0, sortField = 'descricao', sortOrder = 1): Promise<IServiceResponse<IPage<Categoria>>> {
        sortField = sortField || 'descricao';
        let sort: string;
        sort = sortOrder === 1 ? 'asc' : 'desc';
        const options = this.carregaOptionsFornecedor(pagina.toString(), this.nrLinhasTabela.toString(), sortField, sort);
        return this.categoriaService.getCategoriaPaginado(options);
      }


      
      carregaOptionsFornecedor(pagina: string, nrLinhas: string, sortField: string, sortOrder: string) {
        const options = {
          params: new HttpParams()
            .set('page', pagina)
            .set('size', nrLinhas)
            .set('sort', `${sortField},${sortOrder}`)
        };


        options.params = this.utilityService.carregaParamsString(this.filtroDescricao, options.params, 'descricao');
        options.params = this.utilityService.carregaParamsString(this.filtroId, options.params, 'id');
        return options;
    }

    onChangeFilter() {
        clearTimeout(this.debouncer);
        this.debouncer = setTimeout(() => {
          this.dt.reset();
        }, this.delay);
      }

      
      excluir(id) {
        this.confirmationService.confirm({
          message: 'Confirma a exclusão da categoria?',
          accept: () => {
            this.categoriaService.excluirCategoria(id).then(() => this.dt.reset());
          }
        });
      }
}