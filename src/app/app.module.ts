import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RevenueComponent } from './revenue/revenue.component';
import {HttpClientModule} from "@angular/common/http";
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NavbarComponent } from './navbar/navbar.component';
import { CommonModule } from '@angular/common';
import { CategorieComponent } from './categorie/categorie.component';
import { RapportComponent } from './rapport/rapport.component';
import { DepenseComponent } from './depense/depense.component';
import { AjoutDepenseComponent } from './ajout-depense/ajout-depense.component';


@NgModule({
  declarations: [
    AppComponent,
    RevenueComponent,
    NavbarComponent,
    CategorieComponent,
    RapportComponent,
    DepenseComponent,
    AjoutDepenseComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    CommonModule,
    ReactiveFormsModule,
  
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
