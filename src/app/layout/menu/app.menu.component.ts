import { animate, state, style, transition, trigger } from '@angular/animations';
import { AfterViewInit, Component, Input, OnInit, ViewChild } from '@angular/core';
import {ScrollPanel } from 'primeng/primeng';
import {MenuItem} from 'primeng/api';
import { AppComponent } from '../../app.component';

@Component({
    selector: 'app-menu',
    templateUrl: './app.menu.component.html'
})
export class AppMenuComponent implements OnInit, AfterViewInit {

    model: any[];

    @ViewChild('scrollPanel') layoutMenuScrollerViewChild: ScrollPanel;

    constructor(public app: AppComponent
    ) { }

    ngAfterViewInit() {
        setTimeout(() => { this.layoutMenuScrollerViewChild.moveBar(); }, 100);
    }

    ngOnInit() {
        this.updateMenu();

    }

    updateMenu() {
        this.model = [
            { label: 'Início',  title: 'Início', icon: 'fa fa-th-large', routerLink: ['/'],},
            {
                label: 'Loja', title: 'Loja', icon: 'fa fa-store', routerLink: ['/listaLoja']
            },
            {
                label: 'Categoria', title: 'Categorias', icon: 'fa fa-tasks', routerLink: ['/listaCategoria']
            },
            {
                label: 'Fornecedor', title: 'Fornecedor', icon: 'fas fa-dolly', routerLink: ['/listaFornecedor']
            },
            {
                label: 'Produtos', title: 'Produtos', icon: 'fas fa-boxes', routerLink: ['/listaProduto']
            },
            
            
        ];

    }
}

@Component({
    /* tslint:disable:component-selector */
    selector: '[app-submenu]',
    /* tslint:enable:component-selector */
    template: `
        <ng-template ngFor let-child let-i="index" [ngForOf]="(root ? item : item.items)">
            <li [ngClass]="{'active-menuitem': isActive(i)}" [class]="child.badgeStyleClass" title="{{child.title}}">
                <a title="{{child.title}}" [href]="child.url||'#'" (click)="itemClick($event,child,i)" *ngIf="!child.routerLink"
                [attr.target]="child.target"(mouseenter)="hover=true" (mouseleave)="hover=false" class="ripplelink" >
                    <i class="{{child.icon}}" title="{{child.title}}"></i>
                    <span class="menuitem-text">{{child.label}}</span>
                    <i class="pi pi-chevron-down layout-submenu-toggler" *ngIf="child.items"></i>
                   
                    <span class="menuitem-badge" *ngIf="child.badge">{{child.badge}}</span>
                </a>
                <a title="{{child.title}}" (click)="itemClick($event,child,i)" *ngIf="child.routerLink"
                    [routerLink]="child.routerLink" routerLinkActive="active-menuitem-routerlink"
                    [routerLinkActiveOptions]="{exact: true}" [attr.target]="child.target"
                    (mouseenter)="hover=true" (mouseleave)="hover=false" class="ripplelink">
                    <i class="{{child.icon}}" title="{{child.title}}"></i>
                    <span class="menuitem-text">{{child.label}}</span>
                    <i class="pi pi-chevron-down layout-submenu-toggler" *ngIf="child.items"></i>
                    <span class="menuitem-badge" *ngIf="child.badge">{{child.badge}}</span>
                    </a>
                <ul app-submenu [item]="child" *ngIf="child.items" [@children]="isActive(i) ? 'visible' : 'hidden'">
                </ul>
            </li>
        </ng-template>
    `,
    animations: [
        trigger('children', [
            state('visible', style({
                height: '*'
            })),
            state('hidden', style({
                height: '0px'
            })),
            transition('visible => hidden', animate('600ms cubic-bezier(0.86, 0, 0.07, 1)')),
            transition('hidden => visible', animate('600ms cubic-bezier(0.86, 0, 0.07, 1)'))
        ])
    ]
})
export class AppSubMenuComponent {

    @Input() item: MenuItem;

    @Input() root: boolean;

    activeIndex: number;

    hover: boolean;

    constructor(public app: AppComponent, public appMenu: AppMenuComponent) { }

    itemClick(event: Event, item: MenuItem, index: number) {
        // avoid processing disabled items
        if (item.disabled) {
            event.preventDefault();
            return true;
        }

        // activate current item and deactivate active sibling if any
        if (item.routerLink || item.items || item.command || item.url) {
            this.activeIndex = (this.activeIndex === index) ? -1 : index;
        }

        // execute command
        if (item.command) {
            item.command({ originalEvent: event, item: item });
        }

        // prevent hash change
        if (item.items || (!item.url && !item.routerLink)) {
            setTimeout(() => {
                this.appMenu.layoutMenuScrollerViewChild.moveBar();
            }, 450);
            event.preventDefault();
        }

        // hide menu
       // if (!item.items) {
       //     this.app.sidebarActive = false;
       // }
    }

    isActive(index: number): boolean {
        return this.activeIndex === index;
    }

}
