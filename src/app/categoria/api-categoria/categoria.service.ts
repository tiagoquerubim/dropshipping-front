import { Injectable } from "@angular/core";
import { HttpClient, HttpParams } from "@angular/common/http";
import { IServiceResponse } from "src/app/entities/IResponse";
import { IPage } from "src/app/entities/IPage";
import { Categoria } from "src/app/entities/Categoria";

@Injectable({
    providedIn: 'root'
})
export class CategoriaService{
    constructor(private http: HttpClient){ }

    getCategoriaPaginado(options: {params: HttpParams}){
        return this.http.get<IServiceResponse<IPage<Categoria>>>('/api/api/v1/categoria/filtroPaginado' , options)
        .toPromise();
    }

    getCategorias(){
        return this.http.get<IServiceResponse<Categoria[]>>('/api/api/v1/categoria')
        .toPromise();
    }

    getCategoriaById(id: string) {
        return this.http.get<IServiceResponse<Categoria>>(`/api/api/v1/categoria/${id}`)
          .toPromise();
    }

    salvarCategoria(categoria: Categoria){
        return this.http.post<IServiceResponse<Categoria>>('/api/api/v1/categoria', categoria)
        .toPromise();
    }

    alterarCategoria(categoria: Categoria) {
        return this.http.put<IServiceResponse<Categoria>>(`/api/api/v1/categoria/${categoria.id}`, categoria)
          .toPromise();
    }

    excluirCategoria(id) {
        return this.http.delete<IServiceResponse<any>>(`/api/api/v1/categoria/${id}`)
          .toPromise();
    }

}