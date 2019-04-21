/* tslint:disable: max-line-length */
import { RouterModule, Routes } from '@angular/router';
import { AuthGuardService } from './services/auth-guard/auth-guard.service';
import { ListaCategoriaComponent } from './categoria/lista-categoria/lista-categoria.component';
import { MantemCategoriaComponent } from './categoria/mantem-categoria/mantem-categoria.component';
import { ListaFornecedorComponent } from './Fornecedor/lista-fornecedor/lista-fornecedor.component';
import { MantemFornecedorComponent } from './Fornecedor/mantem-fornecedor/mantem-fornecedor.component';
import { MantemProdutoComponent } from './produto/mantem-produto/mantem-produto.component';
import { ListaProdutoComponent } from './produto/lista-produto/lista-produto.component';
import { ListaLojaComponent } from './loja/lista-loja/lista-loja.component';
import { MantemLojaComponent } from './loja/mantem-loja/mantem-loja.component';


/* tslint:enable: max-line-length */

const appRoutes: Routes = [
  { path: 'inicio', component: ListaFornecedorComponent},
  { path: 'listaCategoria', component: ListaCategoriaComponent },
  { path: 'mantemCategorias', component: MantemCategoriaComponent, },
  { path: 'editarCategorias/:id', component: MantemCategoriaComponent },
  { path: 'listaFornecedor', component: ListaFornecedorComponent },
  { path: 'editarFornecedor/:id', component: MantemFornecedorComponent },
  { path: 'mantemFornecedor', component: MantemFornecedorComponent },
  { path: 'mantemProduto', component: MantemProdutoComponent },
  { path: 'listaProduto', component: ListaProdutoComponent },
  { path: 'editarProduto/:id', component: MantemProdutoComponent },
  { path: 'listaLoja', component: ListaLojaComponent },
  { path: 'mantemLoja', component: MantemLojaComponent },
  { path: 'editarLoja/:id', component: MantemLojaComponent },

  { path: '**', redirectTo: 'inicio' }
];

export const AppRoutingModule = RouterModule.forRoot(appRoutes);
