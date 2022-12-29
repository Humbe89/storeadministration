import { RouterModule, Routes } from "@angular/router";
import { CreateCategoryComponent } from "./components/categories/create-category/create-category.component";
import { UpdateCategoryComponent } from "./components/categories/update-category/update-category.component";
import { WorkCategoryComponent } from "./components/categories/work-category/work-category.component";
import { HomeComponent } from "./components/home/home.component";
import { CreateMenuComponent } from "./components/menu/create-menu/create-menu.component";
import { WorkMenuComponent } from "./components/menu/work-menu/work-menu.component";
import { CreateProductComponent } from "./components/products/create-product/create-product.component";
import { UpdateProductComponent } from "./components/products/update-product/update-product.component";
import { WorkProductComponent } from "./components/products/work-product/work-product.component";
import { TestTableComponent } from "./components/testTable/test-table/test-table.component";


const APP_ROUTES: Routes = [
    {path:'home', component: HomeComponent},
    {path:'test', component: TestTableComponent},
    {path:'categories', component: WorkCategoryComponent},
    {path:'createcategory', component: CreateCategoryComponent},
    {path:'updatecategory/:id', component: UpdateCategoryComponent},
    {path:'products', component: WorkProductComponent},
    {path:'products/page/:page', component: WorkProductComponent},
    {path:'createproduct', component: CreateProductComponent},
    {path:'updateproduct/:id', component: UpdateProductComponent},
    {path:'menus', component: WorkMenuComponent},
    {path: 'createmenu', component: CreateMenuComponent},
    {path:'**', pathMatch:"full", redirectTo:'home'}
];

export const APP_ROUTING = RouterModule.forRoot(APP_ROUTES);