import { Injectable } from "@angular/core";
import { HttpClient, HttpParams } from "@angular/common/http";
import { Fornecedor } from "src/app/entities/Fornecedor";
import { IServiceResponse } from "src/app/entities/IResponse";
import { IPage } from "src/app/entities/IPage";

@Injectable({
    providedIn: 'root'
})
export class FornecedorService {
    constructor(private http: HttpClient){ }

    salvarFornecedor(fornecedor: Fornecedor){
        return this.http.post<IServiceResponse<Fornecedor>>('/api/api/v1/fornecedor', fornecedor)
        .toPromise();
    }

    alterarFornecedor(fornecedor: Fornecedor) {
        return this.http.put<IServiceResponse<Fornecedor>>(`/api/api/v1/fornecedor/${fornecedor.id}`, fornecedor)
          .toPromise();
    }

    excluirFornecedor(id) {
        return this.http.delete<IServiceResponse<any>>(`/api/api/v1/fornecedor/${id}`)
          .toPromise();
    }
    
    getFornecedorPaginado(options: {params: HttpParams}){
        return this.http.get<IServiceResponse<IPage<Fornecedor>>>('/api/api/v1/fornecedor/fornecedorPaginado' , options)
        .toPromise();
    }

    getFornecedores(){
        return this.http.get<IServiceResponse<Fornecedor[]>>('/api/api/v1/fornecedor')
        .toPromise();
    }
    
    getForncedorById(id: string) {
        return this.http.get<IServiceResponse<Fornecedor>>(`/api/api/v1/fornecedor/${id}`)
          .toPromise();
      }
}