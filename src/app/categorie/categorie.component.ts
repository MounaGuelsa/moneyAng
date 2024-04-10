import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpErrorResponse } from "@angular/common/http";
import { Categorie } from './Categorie'; // Assurez-vous d'avoir un modèle Categorie correspondant
import { CategorieService } from './categorie.service';
declare var $: any; // Assurez-vous que jQuery est inclus dans votre projet

@Component({
 selector: 'app-categorie',
 templateUrl: './categorie.component.html',
 styleUrls: ['./categorie.component.css']
})
export class CategorieComponent implements OnInit {
 categories: Categorie[] = [];
  
 showForm: boolean = false;
 showUpdateForm: boolean = false;
 categorieForm: FormGroup = this.formBuilder.group({
    nom: ['', Validators.required],
    icone:['', Validators.required]
 });
 selectedCategorie: Categorie | undefined;

 constructor(private categorieService: CategorieService, private formBuilder: FormBuilder) {}

 ngOnInit(): void {
    this.obtenirCategories();
 }

 public obtenirCategories() {
    this.categorieService.obtenirCategories().subscribe(
      (response: Categorie[]) => {
        this.categories = response;
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
 }

 public toggleForm(categorie?: Categorie): void {
    this.showForm = !this.showForm;

    if (categorie) {
      this.showUpdateForm = true;
      this.selectedCategorie = categorie;
      this.categorieForm.patchValue({
        nom: categorie.nom,
        icone:categorie.icone
      });
    } else {
      this.showUpdateForm = false;
      this.selectedCategorie = undefined;
      this.categorieForm.reset();
    }
 }

 public ajouterCategorie(): void {
    this.categorieService.ajouterCategorie(this.categorieForm.value).subscribe(
      (response: Categorie) => {
        console.log(response);
        this.obtenirCategories();
        this.toggleForm();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
 }

 public modifierCategorie(): void {
    if (this.selectedCategorie) {
      const updatedCategorie: Categorie = {
        ...this.selectedCategorie,
        ...this.categorieForm.value,
      };

      this.categorieService.modifierCategorie(this.selectedCategorie.idCategorie, updatedCategorie).subscribe(
        (response: Categorie) => {
          console.log(response);
          this.obtenirCategories();
          this.toggleForm(); 
        },
        (error: HttpErrorResponse) => {
          alert(error.message);
        }
      );
    }
 }

 showConfirmationModal(categorieId: number): void {
    // Afficher le modal de confirmation
    $('#confirmationModal').modal('show');

    // Capturer le clic sur le bouton de confirmation
    $('#confirmDeleteBtn').click(() => {
        // Exécuter la suppression
        this.supprimerCategorie(categorieId);
        // Cacher le modal de confirmation
        $('#confirmationModal').modal('hide');
    });
 }

 public supprimerCategorie(idCategorie: number): void {
    this.categorieService.supprimerCategorie(idCategorie).subscribe(
      () => {
        console.log("Categorie deleted successfully!");
        this.obtenirCategories();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
 }
}
