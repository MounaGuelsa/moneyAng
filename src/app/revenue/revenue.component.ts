import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { RevenueService } from './revenue.service';
import { Revenue } from './Revenue'; // Assurez-vous d'importer correctement votre interface Revenue
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-revenue',
  templateUrl: './revenue.component.html',
  styleUrls: ['./revenue.component.css']
})
export class RevenueComponent implements OnInit {
  confirmDeleteId: number | undefined;
  revenues: Revenue[] = [];
  showForm: boolean = false;
  showUpdateForm: boolean = false;
  revenueForm: FormGroup = this.formBuilder.group({
    nomRevenue: ['', Validators.required],
    montant: ['', Validators.required],
    date: ['', Validators.required],
    utilisateurId: ['', Validators.required],
    type: ['', Validators.required]
  });
  updateRevenueForm: FormGroup = this.formBuilder.group({
    nomRevenue: ['', Validators.required],
    montant: ['', Validators.required],
    date: ['', Validators.required],
    type: ['', Validators.required]
  });
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

  constructor(private revenueService: RevenueService, private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.obtenirRevenues();
  }
  

  showConfirmationModal(revenue: Revenue): void {
    this.confirmDeleteId = revenue.idRevenue;
    const confirmationModal = document.getElementById('confirmationModal');
    if (confirmationModal) {
      confirmationModal.classList.add('show'); // Afficher la boîte de dialogue
    }
  }

  hideConfirmationModal(): void {
    this.confirmDeleteId = undefined;
    const confirmationModal = document.getElementById('confirmationModal');
    if (confirmationModal) {
      confirmationModal.classList.remove('show'); // Masquer la boîte de dialogue
    }
  }


  public obtenirRevenues() {
    this.revenueService.obtenirRevenues().subscribe(
      (response: Revenue[]) => {
        this.revenues = response;
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  public toggleForm(revenue?: Revenue): void {
    this.showForm = !this.showForm;

    if (revenue) {
      this.showUpdateForm = true;
      this.selectedRevenue = revenue;
      this.updateRevenueForm.patchValue({
        idRevenue:revenue.idRevenue,
        nomRevenue: revenue.nomRevenue,
        montant: revenue.montant,
        date: revenue.date,
        type: revenue.type
      });
    } else {
      this.showUpdateForm = false;
      this.selectedRevenue = undefined;
      this.updateRevenueForm.reset();
    }
  }

  public ajouterRevenue(): void {
  
     
      this.revenueService.ajouterRevenue(this.revenueForm.value).subscribe(
        (response: Revenue) => {
          console.log(response);
          this.obtenirRevenues();
          this.toggleForm();
        },
        (error: HttpErrorResponse) => {
          alert(error.message);
        }
      );
  }

  public modifierRevenue(): void {
    if (this.selectedRevenue) {
      const updatedRevenue: Revenue = {
        ...this.selectedRevenue,
        ...this.updateRevenueForm.value,
      };

      this.revenueService.modifierRevenue(this.selectedRevenue.idRevenue, updatedRevenue).subscribe(
        (response: Revenue) => {
          console.log(response);
          this.obtenirRevenues();
          this.toggleForm(); 
        },
        (error: HttpErrorResponse) => {
          alert(error.message);
        }
      );
    }
  }

  public supprimerRevenue(idRevenue: number): void {
    if (this.confirmDeleteId !== undefined) {
       this.revenueService.supprimerRevenue(this.confirmDeleteId!).subscribe(
         () => {
           console.log("Revenue supprimé avec succès !");
           this.obtenirRevenues();
           this.confirmDeleteId = undefined;
           this.hideConfirmationModal();
         },
         (error: HttpErrorResponse) => {
           alert(error.message);
         }
       );
    }
   }
 
  
  
}
