import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { SidebarComponent } from './components/corestructure/sidebar/sidebar.component';
import { FooterComponent } from './components/corestructure/footer/footer.component';
import { HeaderComponent } from './components/corestructure/header/header.component';
import { HomeComponent } from './components/home/home.component';
import { APP_ROUTING } from './app.routes';
import { WorkCategoryComponent } from './components/categories/work-category/work-category.component';
import { HttpClientModule } from '@angular/common/http';
import { CreateCategoryComponent } from './components/categories/create-category/create-category.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { WorkProductComponent } from './components/products/work-product/work-product.component';
import { CreateProductComponent } from './components/products/create-product/create-product.component';
import { UpdateCategoryComponent } from './components/categories/update-category/update-category.component';
import { UpdateProductComponent } from './components/products/update-product/update-product.component';
import { PaginatorProductComponent } from './components/products/paginator-product/paginator-product.component';
import { MatButtonModule } from '@angular/material/button';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatTableModule} from '@angular/material/table';
import {MatPaginatorModule} from '@angular/material/paginator';
import { TestTableComponent } from './components/testTable/test-table/test-table.component';
import {MatIconModule} from '@angular/material/icon';
import {MatCardModule} from '@angular/material/card';
import { WorkMenuComponent } from './components/menu/work-menu/work-menu.component';
import { CreateMenuComponent } from './components/menu/create-menu/create-menu.component';
import { DetailProductComponent } from './components/products/detail-product/detail-product.component';
import { MatDialogModule } from '@angular/material/dialog';
import { DialogComponent } from './components/categories/dialog/dialog.component';
import {MatListModule} from '@angular/material/list';
import {MatGridListModule} from '@angular/material/grid-list';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatSelectModule} from '@angular/material/select';
import { DialogCreateSubmenuComponent } from './components/menu/dialog-create-submenu/dialog-create-submenu.component';
import { UpdateMenuComponent } from './components/menu/update-menu/update-menu.component';
import { DetailCategoryComponent } from './components/categories/detail-category/detail-category.component';


@NgModule({
  declarations: [
    AppComponent,
    SidebarComponent,
    FooterComponent,
    SidebarComponent,
    HeaderComponent,
    HomeComponent,
    WorkCategoryComponent,
    CreateCategoryComponent,
    WorkProductComponent,
    CreateProductComponent,
    UpdateCategoryComponent,
    UpdateProductComponent,
    PaginatorProductComponent,
    
    TestTableComponent,
         WorkMenuComponent,
         CreateMenuComponent,
         DetailProductComponent,
         DialogComponent,
         DialogCreateSubmenuComponent,
         UpdateMenuComponent,
         DetailCategoryComponent,
  ],
  imports: [
    BrowserModule,
    APP_ROUTING,
    HttpClientModule,
    ReactiveFormsModule,
    MatButtonModule,
    BrowserAnimationsModule,
    MatTableModule,
    MatPaginatorModule,
    MatIconModule,
    MatCardModule,
    MatDialogModule,
    MatListModule,
    MatGridListModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
