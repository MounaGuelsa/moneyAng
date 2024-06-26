import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RevenueComponent } from './revenue/revenue.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { DepenseComponent } from './depense/depense.component';
import { CategorieComponent } from './categorie/categorie.component';
import { RapportComponent } from './rapport/rapport.component';
import { AjoutDepenseComponent } from './ajout-depense/ajout-depense.component';
import { LoginComponent } from './login/login.component';
import { AjoutRevenuComponent } from './ajout-revenu/ajout-revenu.component';


const routes: Routes = [
  {path:'revenues',component:RevenueComponent},
  {path:'dashboard',component:DashboardComponent},
  {path:'depenses',component:DepenseComponent},
  {path:'rapports',component:RapportComponent},
  {path:'categories',component:CategorieComponent},
  {path:'ajoutDepense',component:AjoutDepenseComponent},
  {path:'login',component:LoginComponent},
  {path:'ajoutRevenu',component:AjoutRevenuComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
