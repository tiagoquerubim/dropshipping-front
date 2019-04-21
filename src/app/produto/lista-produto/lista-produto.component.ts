import { Component, OnInit } from "@angular/core";
import { ConfirmationService, LazyLoadEvent } from "primeng/api";
import { HttpParams } from "@angular/common/http";
import { IServiceResponse } from "src/app/entities/IResponse";
import { IPage } from "src/app/entities/IPage";
import { Produto } from "src/app/entities/Produto";
import { ProdutoDTO } from "src/app/entities/ProdutoDTO";
import { ProdutoService } from "../api-produto/produto.service";
import { UtilityService } from "src/app/services/utility/utility.service";
import { BreadcrumbService } from "src/app/services/breadcrumb/breadcrumb.service";
import { Imagem } from "src/app/entities/Imagem";


@Component({
    selector: 'app-lista-produto',
    templateUrl: 'lista-produto.component.html'
})
export class ListaProdutoComponent implements OnInit{

    responseProduto: IServiceResponse<IPage<Produto>>;
    produtoDto: ProdutoDTO[] = [];
    nrLinhasTabela = 10;

    ngOnInit(){

        
    }

    constructor(private produtoService: ProdutoService,
        private utilityService: UtilityService,
        private confirmationService: ConfirmationService,
        private breadcrumbService: BreadcrumbService) { 
            this.breadcrumbService.setItems([
                { label: 'Início/', routerLink: 'inicio' }, 
                {label: 'Produtos', routerLink: 'listaProduto'}
              ]);
        }

        loadLazy(event: LazyLoadEvent){
        this.getLOjas(event.first / event.rows, event.sortField, event.sortOrder).then(response => {
            this.responseProduto = response;
         
            const produtos = response.data.content;
            for(const produto of produtos){
                const dto = new ProdutoDTO();
                dto.produto = produto;
                
                this.produtoService.buscarImagem(produto.foto).then(resp => {
                    debugger
                    dto.imagem = new Imagem();
                    const reader = new FileReader();
                    reader.addEventListener('load', () => {
                       dto.imagem.url = reader.result.toString();
                        }, false);


                        if (resp) {
                            reader.readAsDataURL(resp);

                        }
                        dto.imagem.arquivo = new Blob([resp]);

                        const url = window.URL.createObjectURL(dto.imagem.arquivo);
                        const link = document.createElement('a');
                        link.href = url;
                        link.download = dto.imagem.nome;
                        this.produtoDto.push(dto);
                   
                  });
              

            }  
          });
    }

    getImagemProduto(nomeFoto: any){
        this.produtoService.buscarImagem(nomeFoto).then(resp => {
            debugger;
            const arquivo = new Blob([resp]);
            const url = window.URL.createObjectURL(arquivo); 
           
          });
    }

    getLOjas(pagina = 0, sortField = 'nome', sortOrder = 1): Promise<IServiceResponse<IPage<Produto>>> {
        sortField = sortField || 'nome';
        let sort: string;
        sort = sortOrder === 1 ? 'asc' : 'desc';
        const options = this.carregaOptionsLoja(pagina.toString(), this.nrLinhasTabela.toString(), sortField, sort);
        return this.produtoService.getProdutosPaginado(options);
        

      }

      carregaOptionsLoja(pagina: string, nrLinhas: string, sortField: string, sortOrder: string) {
        const options = {
          params: new HttpParams()
            .set('page', pagina)
            .set('size', nrLinhas)
            .set('sort', `${sortField},${sortOrder}`)
        };
        return options;
    }

}