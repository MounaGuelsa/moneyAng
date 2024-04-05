import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RevenueComponent } from './revenue/revenue.component';
import { AjoutRevenueComponent } from './ajout-revenue/ajout-revenue.component';

const routes: Routes = [
  {path:'revenues',component:RevenueComponent},
  {path:'ajouterRevenue',component:AjoutRevenueComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
