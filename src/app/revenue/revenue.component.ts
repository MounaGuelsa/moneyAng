import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpErrorResponse } from "@angular/common/http";
import { Revenue } from './Revenue';
import { RevenueService } from './revenue.service';
declare var $: any;
@Component({
  selector: 'app-revenue',
  templateUrl: './revenue.component.html',
  styleUrls: ['./revenue.component.css']
})
export class RevenueComponent implements OnInit {
  revenues: Revenue[] = [];
  
  showForm: boolean = false;
  showUpdateForm: boolean = false;
  revenueForm: FormGroup = this.formBuilder.group({
    nomRevenue: ['', Validators.required],
    montant: ['', Validators.required],
    date: ['', Validators.required],
    type: ['', Validators.required]
  });
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
  updateRevenueForm: FormGroup = this.formBuilder.group({
    nomRevenue: ['', Validators.required],
    montant: ['', Validators.required],
    date: ['', Validators.required],
    type: ['', Validators.required]
  });
  selectedRevenue: Revenue | undefined;

  constructor(private revenueService: RevenueService, private formBuilder: FormBuilder) {}

  ngOnInit(): void {
    this.obtenirRevenues();
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
      const updatedRevenueIndex = this.revenues.findIndex(revenue => revenue.idRevenue === this.selectedRevenue?.idRevenue);
  
      if (updatedRevenueIndex !== -1) {
        this.revenues[updatedRevenueIndex] = {
          ...this.revenues[updatedRevenueIndex],
          ...this.updateRevenueForm.value,
        };
  
        this.revenueService.modifierRevenue(this.revenues[updatedRevenueIndex]).subscribe(
          (response: Revenue) => {
            console.log(response);
            this.toggleForm(); 
          },
          (error: HttpErrorResponse) => {
            alert(error.message);
          }
        );
      }
    }
  }
  
  showConfirmationModal(revenueId: number): void {
    // Afficher le modal de confirmation
    $('#confirmationModal').modal('show');

    // Capturer le clic sur le bouton de confirmation
    $('#confirmDeleteBtn').click(() => {
        // Exécuter la suppression
        this.supprimerRevenue(revenueId);
        // Cacher le modal de confirmation
        $('#confirmationModal').modal('hide');
    });
}
  public supprimerRevenue(idRevenue: number): void {
    this.revenueService.supprimerRevenue(idRevenue).subscribe(
      () => {
        console.log("Revenue deleted successfully!");
        this.obtenirRevenues();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }  
}
