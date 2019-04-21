import { Injectable } from "@angular/core";
import { HttpClient, HttpParams } from "@angular/common/http";
import { IServiceMessage } from "../../entities/IServiceMessage";
import { IServiceResponse } from "../../entities/IResponse";
import { IPage } from "../../entities/IPage";
import { Loja } from "../../entities/Loja";


@Injectable({
    providedIn: 'root'
})
export class LojaService{
    constructor(private http: HttpClient){ }

    getLojaPaginado(options: {params: HttpParams}){
        return this.http.get<IServiceResponse<IPage<Loja>>>('/api/api/v1/loja' , options)
        .toPromise();
    }

    salvarNovaLoja(loja: Loja){
        return this.http.post<IServiceResponse<Loja>>('/api/api/v1/loja', loja)
        .toPromise();
    }

    getLoja(id: string) {
        return this.http.get<IServiceResponse<Loja>>(`/api/api/v1/loja/${id}`)
          .toPromise();
      }

    excluirLoja(id) {
        return this.http.delete<IServiceResponse<any>>(`/api/api/v1/loja/${id}`)
          .toPromise();
    
      }

    alterarLoja(loja: Loja) {
        return this.http.put<IServiceResponse<Loja>>(`/api/api/v1/loja/${loja.id}`, loja)
          .toPromise();
      }
    
    getLojas(){
        return this.http.get<IServiceResponse<Loja[]>>('/api/api/v1/loja/ListaTodas')
        .toPromise();
    }

}