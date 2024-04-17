import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';
import { Revenue } from '../revenue/Revenue';
import { RevenueService } from '../revenue/revenue.service';
import { Type } from '../revenue/Type';
import { Router } from '@angular/router';


@Component({
  selector: 'app-ajout-revenu',
  templateUrl: './ajout-revenu.component.html',
  styleUrls: ['./ajout-revenu.component.css'] 
})
export class AjoutRevenuComponent {
  revenueForm: FormGroup;
  isEditing = false;
  selectedRevenue: Revenue | undefined;
  types = [
    'SALAIRE',
    'REVENU_LOCATIF',
    'DIVIDENDES',
    'INTERETS',
    'REVENU_VENTES',
    'ALLOCATION_FAMILIALE',
    'PRIME',
    'DROITS_AUTEUR',
    'AFFILIATIONS',
    'INVESTISSEMENTS_IMMOBILIERS',
    'AUTRES'
  ]; 

  constructor(private formBuilder: FormBuilder, private revenueService: RevenueService,private router: Router) {
    this.revenueForm = this.formBuilder.group({
      nomRevenue: ['', Validators.required],
      montant: ['', Validators.required],
      date: ['', Validators.required],
      type: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    
  }

  onSubmit(): void {
    if (this.isEditing && this.selectedRevenue) {
     
      this.modifierRevenue();
    } else {
  
      this.ajouterRevenue();
      this.router.navigate(['/revenues']);
    }
  }

  ajouterRevenue(): void {
    this.revenueService.ajouterRevenue(this.revenueForm.value).subscribe(
      (response: Revenue) => {
        console.log('Revenue added:', response);
        
        this.revenueForm.reset();
      },
      (error: HttpErrorResponse) => {
        console.error('Error adding revenue:', error);
      }
    );
  }

  modifierRevenue(): void {
    if (this.selectedRevenue) {
      this.revenueService.modifierRevenue(this.revenueForm.value).subscribe(
        (response: Revenue) => {
          console.log('Revenue updated:', response);
          
          this.revenueForm.reset();
          this.isEditing = false;
        },
        (error: HttpErrorResponse) => {
          console.error('Error updating revenue:', error);
        }
      );
    }
  }
}
