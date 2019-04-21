import { Injectable } from "@angular/core";
import { HttpClient, HttpParams } from "@angular/common/http";
import { IServiceResponse } from "src/app/entities/IResponse";
import { Produto } from "src/app/entities/Produto";
import { IPage } from "src/app/entities/IPage";


@Injectable({
    providedIn: 'root'
})
export class ProdutoService {
    constructor(private http: HttpClient){ }


    buscarImagem(arquivoNome: string){
        return this.http.get( `/api/api/v1/produto/imagem/${arquivoNome}`, { responseType: 'blob' }).toPromise();
    }

    salvarProduto(produto: Produto){
        return this.http.post<IServiceResponse<Produto>>('/api/api/v1/produto', produto)
        .toPromise();
    }

    getProdutosPaginado(options: {params: HttpParams}){
        return this.http.get<IServiceResponse<IPage<Produto>>>('/api/api/v1/produto' , options)
        .toPromise();
    }

    getProdutoById(id: string) {
        return this.http.get<IServiceResponse<Produto>>(`/api/api/v1/produto/${id}`)
          .toPromise();
      }

}