import { Component, ViewChild } from "@angular/core";
import { NgForm } from "@angular/forms";
import { ActivatedRoute } from "@angular/router";
import { Message } from "primeng/api";
import { DomSanitizer } from "@angular/platform-browser";
import { Produto } from "src/app/entities/Produto";
import { Categoria } from "src/app/entities/Categoria";
import { Fornecedor } from "src/app/entities/Fornecedor";
import { BreadcrumbService } from "src/app/services/breadcrumb/breadcrumb.service";
import { ProdutoService } from "../api-produto/produto.service";
import { CategoriaService } from "src/app/categoria/api-categoria/categoria.service";
import { FornecedorService } from "src/app/Fornecedor/api-fornecedor/fornecedor.service";
import { Location } from "@angular/common";
import { Loja } from "../../entities/Loja";
import { LojaService } from "../../loja/api-loja/loja.service";

@Component({
    selector: 'app-mantem-produto',
    templateUrl: './mantem-produto.component.html'
})
export class MantemProdutoComponent {

    
    uploadUrl = '/api/api/v1/produto/imagem' // URL de UPLOAD - utilizado no arquivo .html
    msgs: Message[];
    files: any[] = [];
    produto: Produto;
    optionsCategoria: Categoria[];
    optionsFornecedor: Fornecedor[];
    optionsLoja: Loja[];
    arquivo: any[];
    nomeArquivo: string;
    @ViewChild('produtoForm') produtoForm: NgForm;

    constructor( private breadcrumbService: BreadcrumbService,
        private produtoService: ProdutoService,
        private categoriaService: CategoriaService,
        private fornecedorService: FornecedorService,
        private lojaService: LojaService,
        private sanitizer: DomSanitizer,
        private location: Location,
        private route: ActivatedRoute){
            this.produto = new Produto();
            this.breadcrumbService.setItems([
            {label: 'Novo Produto', routerLink: 'mantemProduto'}
            ]);

    }

    ngOnInit(){
        if (this.route.snapshot.url[0] && this.route.snapshot.url[0].path === 'editarProduto') {
          this.route.params.subscribe(params => {
            this.produtoService.getProdutoById(params['id'])
              .then(res => {
                this.produto = res.data
              });
          });
        } else {
          this.inicializarProduto();
        }

        this.carregaOptionsCategoria();
        this.carregaOptionsFornecedores();
        this.carregaOptionsLoja();
      }
  
      carregaOptionsCategoria(){
        this.categoriaService.getCategorias().then( resp => {
          this.optionsCategoria = resp.data;
        });
      }

      carregaOptionsLoja(){
        this.lojaService.getLojas().then(resp => {
          this.optionsLoja = resp.data;
        });

      }

      goBack() {
        this.location.back();
    
      }

      carregaOptionsFornecedores(){
        this.fornecedorService.getFornecedores().then( resp =>{
          this.optionsFornecedor = resp.data;
        })
      }

      inicializarProduto() {
        this.produto = new Produto();
        this.files = [];
        this.nomeArquivo = null;

      }
  
      salvar(): void {
        if (this.produtoForm.invalid) {
          return;
        }
        this.produto.foto = this.nomeArquivo;
    
        
        if (this.produto.id) {
       //   this.produtoService.alterarLoja(this.loja);
        } else {
             this.produtoService.salvarProduto(this.produto).then(() => {
              this.produtoForm.reset();
              setTimeout(() => this.inicializarProduto(), 0);
             })
            
        } 
      }


  onUpload(event) {
    for (const file of event.files) {
      this.files.push(file);
    }

    const res = JSON.parse(event.xhr.response);
    this.nomeArquivo = res.data;

    this.msgs = [];
    this.msgs.push({severity: 'info', summary: 'File Uploaded', detail: ''});

  }

  download(file: any) {
    this.produtoService.buscarImagem(file.name).then(resp => {
      file.arquivo = new Blob([resp]);
      const url = window.URL.createObjectURL(file.arquivo); 
      file.url = this.sanitizer.bypassSecurityTrustUrl(window.URL.createObjectURL(file.arquivo)).toString();
      const link = document.createElement('a');
      link.href = url;
      link.download = file.name;
      link.dispatchEvent(new MouseEvent('click'));
    });

  }

}