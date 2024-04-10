import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpErrorResponse } from "@angular/common/http";
import { Depense } from './Depense'; // Assurez-vous d'avoir un modèle Depense correspondant
import { DepenseService } from './depense.service';
declare var $: any; // Assurez-vous que jQuery est inclus dans votre projet

@Component({
 selector: 'app-depense',
 templateUrl: './depense.component.html',
 styleUrls: ['./depense.component.css']
})
export class DepenseComponent implements OnInit {
 depenses: Depense[] = [];
  
 showForm: boolean = false;
 showUpdateForm: boolean = false;
 depenseForm: FormGroup = this.formBuilder.group({
    montant: ['', Validators.required],
    date: ['', Validators.required],
    description: ['', Validators.required],
    notes: ['']
 });
 selectedDepense: Depense | undefined;

 constructor(private depenseService: DepenseService, private formBuilder: FormBuilder) {}

 ngOnInit(): void {
    this.obtenirDepenses();
 }

 public obtenirDepenses() {
    this.depenseService.obtenirDepenses().subscribe(
      (response: Depense[]) => {
        this.depenses = response;
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
 }

 public toggleForm(depense?: Depense): void {
    this.showForm = !this.showForm;

    if (depense) {
      this.showUpdateForm = true;
      this.selectedDepense = depense;
      this.depenseForm.patchValue({
        montant: depense.montant,
        date: depense.date,
        description: depense.description,
        notes: depense.notes
      });
    } else {
      this.showUpdateForm = false;
      this.selectedDepense = undefined;
      this.depenseForm.reset();
    }
 }

 public ajouterDepense(): void {
    this.depenseService.ajouterDepense(this.depenseForm.value).subscribe(
      (response: Depense) => {
        console.log(response);
        this.obtenirDepenses();
        this.toggleForm();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
 }

 public modifierDepense(): void {
    if (this.selectedDepense) {
      const updatedDepense: Depense = {
        ...this.selectedDepense,
        ...this.depenseForm.value,
      };

      this.depenseService.modifierDepense(this.selectedDepense.idDepense,updatedDepense).subscribe(
        (response: Depense) => {
          console.log(response);
          this.obtenirDepenses();
          this.toggleForm(); 
        },
        (error: HttpErrorResponse) => {
          alert(error.message);
        }
      );
    }
 }

 public supprimerDepense(idDepense: number): void {
    this.depenseService.supprimerDepense(idDepense).subscribe(
      () => {
        console.log("Depense deleted successfully!");
        this.obtenirDepenses();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
 }

 showConfirmationModal(depenseId: number): void {
    // Afficher le modal de confirmation
    $('#confirmationModal').modal('show');

    // Capturer le clic sur le bouton de confirmation
    $('#confirmDeleteBtn').click(() => {
        // Exécuter la suppression
        this.supprimerDepense(depenseId);
        // Cacher le modal de confirmation
        $('#confirmationModal').modal('hide');
    });
 }
}
