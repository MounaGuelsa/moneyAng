// ajout-depense.component.ts

import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';
import { DepenseService } from '../depense/depense.service';
import { Depense } from '../depense/Depense';



@Component({
  selector: 'app-ajout-depense',
  templateUrl: './ajout-depense.component.html',
  styleUrls: ['./ajout-depense.component.css']
})
export class AjoutDepenseComponent implements OnInit {
  depenseForm: FormGroup | undefined;

  constructor(private depenseService: DepenseService, private formBuilder: FormBuilder) {}

  ngOnInit(): void {
    depenseForm: FormGroup = this.formBuilder.group({
      montant: ['', Validators.required],
      date: ['', Validators.required],
      description: ['', Validators.required],
      notes: ['']
    });
  }

  ajouterDepense(): void {
    this.depenseService.ajouterDepense(this.depenseForm.value).subscribe(
      (response: Depense) => {
        console.log(response);
        // Réinitialiser le formulaire après l'ajout de la dépense
        this.depenseForm.reset();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }
}
