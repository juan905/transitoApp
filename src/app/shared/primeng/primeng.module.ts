import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BreadcrumbModule } from 'primeng/breadcrumb';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';
import { MessagesModule } from 'primeng/messages';
import { ToastModule } from 'primeng/toast'; // Importar el módulo Toast
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { CalendarModule } from 'primeng/calendar';
import { DropdownModule } from 'primeng/dropdown';
import { MenubarModule } from 'primeng/menubar';
import { SidebarModule } from 'primeng/sidebar';
import { PanelMenuModule } from 'primeng/panelmenu';
import { RadioButtonModule } from 'primeng/radiobutton';
import { DialogModule } from 'primeng/dialog';


@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ],
  exports: [
   BreadcrumbModule,
   InputTextModule,
   ButtonModule,
   TableModule,
   MessagesModule,
   ToastModule,
   ConfirmDialogModule,
   CalendarModule,
   DropdownModule,
   MenubarModule,
   SidebarModule,
   PanelMenuModule,
   RadioButtonModule,
   DialogModule
  ]
})
export class PrimengModule { }
