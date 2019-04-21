import { Injectable } from '@angular/core';

@Injectable()
export class UtilityService {

  public convertDateToString(data: Date) {
    return data ? data.toDateString() : null;
  }

  public  carregaParamsString(option: any, optionParams: any, optionName: string) {
    return option ? optionParams.set(optionName, option.toString()) : optionParams;
  }

  public carregaParamsId(option: any, optionParams: any, optionName: string) {
    return option ? optionParams.set(optionName, option.id.toString()) : optionParams;
  }

  public retirarFormatacao(numFormatado: string) {
    return numFormatado ? (numFormatado.replace(/\./g, '')).replace('-', '') : numFormatado;
  }

}
