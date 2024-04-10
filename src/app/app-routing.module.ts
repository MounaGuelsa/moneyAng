import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RevenueComponent } from './revenue/revenue.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { DepenseComponent } from './depense/depense.component';
import { CategorieComponent } from './categorie/categorie.component';
import { RapportComponent } from './rapport/rapport.component';


const routes: Routes = [
  {path:'revenues',component:RevenueComponent},
  {path:'dashboard',component:DashboardComponent},
  {path:'depenses',component:DepenseComponent},
  {path:'rapports',component:RapportComponent},
  {path:'categories',component:CategorieComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
