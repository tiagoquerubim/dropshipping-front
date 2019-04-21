/* tslint:disable: max-line-length */
// Angular Imports
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule, APP_INITIALIZER } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
// Outros imports
import { LoadingModule } from 'ngx-loading';
import { ConfirmationService, MessageService } from 'primeng/api';
import { BreadcrumbModule } from 'primeng/breadcrumb';
 
// PrimeNG Imports
import { ButtonModule } from 'primeng/button';
import { CalendarModule } from 'primeng/calendar';
import { CardModule } from 'primeng/card';
import { CheckboxModule } from 'primeng/checkbox';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { DropdownModule } from 'primeng/dropdown';
import { FileUploadModule } from 'primeng/fileupload';
import { GrowlModule } from 'primeng/growl';
import { InputMaskModule } from 'primeng/inputmask';
import { InputTextModule } from 'primeng/inputtext';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { ListboxModule } from 'primeng/listbox';
import { MessageModule } from 'primeng/message';
import { MessagesModule } from 'primeng/messages';
import { OverlayPanelModule } from 'primeng/overlaypanel';
import { PaginatorModule } from 'primeng/paginator';
import { PanelModule } from 'primeng/panel';
import { TriStateCheckboxModule } from 'primeng/tristatecheckbox';
import {AccordionModule} from 'primeng/accordion';
import {
  AutoCompleteModule, DialogModule, FieldsetModule,
  MultiSelectModule, PickListModule, ProgressSpinnerModule, ChipsModule, MenubarModule, SpinnerModule
} from 'primeng/primeng';
import { RadioButtonModule } from 'primeng/radiobutton';
import { ScrollPanelModule } from 'primeng/scrollpanel';
import { TableModule } from 'primeng/table';
import { DataViewModule } from 'primeng/dataview';
import { TabMenuModule } from 'primeng/tabmenu';
import { TabViewModule } from 'primeng/tabview';
import { TreeModule } from 'primeng/tree';
import { TreeNode } from 'primeng/api';
import { AppRoutingModule } from './app-routing.module';
import { StepsModule } from 'primeng/steps';
import { MenuModule } from 'primeng/menu';

// App Imports
import { AppComponent } from './app.component';
import { AppMenuComponent, AppSubMenuComponent } from './layout/menu/app.menu.component';
import { AppRodapeComponent } from './layout/rodape/app.rodape.component';
import { AppBreadcrumbComponent } from './layout/topbar/app.breadcrumb.component';
import { AppTopBarComponent } from './layout/topbar/app.topbar.component';
import { AuthGuardService } from './services/auth-guard/auth-guard.service';
import { BreadcrumbService } from './services/breadcrumb/breadcrumb.service';
import { CacheService } from './services/cache/cache.service';
import { HTTPListener } from './services/RxJS/HTTPListener.service';
import { HTTPStatus } from './services/RxJS/HTTPStatus.service';


import { UtilityService } from './services/utility/utility.service';
import { ListaCategoriaComponent } from './categoria/lista-categoria/lista-categoria.component';
import { MantemCategoriaComponent } from './categoria/mantem-categoria/mantem-categoria.component';
import { ListaFornecedorComponent } from './Fornecedor/lista-fornecedor/lista-fornecedor.component';
import { MantemFornecedorComponent } from './Fornecedor/mantem-fornecedor/mantem-fornecedor.component';
import { MantemProdutoComponent } from './produto/mantem-produto/mantem-produto.component';
import { ListaProdutoComponent } from './produto/lista-produto/lista-produto.component';
import { ListaLojaComponent } from './loja/lista-loja/lista-loja.component';
import { MantemLojaComponent } from './loja/mantem-loja/mantem-loja.component';


const RxJS_Services = [HTTPListener, HTTPStatus];

@NgModule({
  declarations: [
    AppComponent,
    AppMenuComponent,
    AppSubMenuComponent,
    AppTopBarComponent,
    AppRodapeComponent,
    AppBreadcrumbComponent,
    ListaCategoriaComponent,
    MantemCategoriaComponent,
    ListaFornecedorComponent,
    MantemFornecedorComponent,
    MantemProdutoComponent,
    ListaProdutoComponent,
    ListaLojaComponent,
    MantemLojaComponent
    
  ],
  imports: [
    // Angular Modules
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    RouterModule,

    // PrimeNG Modules
    ButtonModule,
    CheckboxModule,
    InputTextModule,
    PaginatorModule,
    TableModule,
    DataViewModule,
    TabMenuModule,
    CardModule,
    ScrollPanelModule,
    MessagesModule,
    MessageModule,
    BreadcrumbModule,
    ConfirmDialogModule,
    DropdownModule,
    ListboxModule,
    RadioButtonModule,
    FieldsetModule,
    MultiSelectModule,
    GrowlModule,
    PanelModule,
    AccordionModule,
    CalendarModule,
    InputMaskModule,
    DialogModule,
    AutoCompleteModule,
    PickListModule,
    ProgressSpinnerModule,
    InputTextareaModule,
    OverlayPanelModule,
    TreeModule,
    ChipsModule,
    MenubarModule,
    TabViewModule,
    StepsModule,
    MenuModule,
    SpinnerModule,
    TriStateCheckboxModule,

    // Outros imports
    LoadingModule,

    // Upload
    FileUploadModule

  ],
  providers: [
    ...RxJS_Services,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HTTPListener,
      multi: true
    },
    ConfirmationService,
    MessageService,
    BreadcrumbService,
    CacheService,
    AuthGuardService,
    UtilityService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

