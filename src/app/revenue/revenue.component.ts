import { Component, OnInit } from '@angular/core';
import { HttpErrorResponse } from "@angular/common/http";
import { Revenue } from './Revenue';
import { RevenueService } from './revenue.service';

declare var $: any; // Déclaration de la variable globale jQuery pour utiliser les modals

@Component({
  selector: 'app-revenue',
  templateUrl: './revenue.component.html',
  styleUrls: ['./revenue.component.css']
})
export class RevenueComponent implements OnInit {
  revenues: Revenue[] = [];

  constructor(private revenueService: RevenueService) {}

  ngOnInit(): void {
    this.obtenirRevenues();
  }

  public obtenirRevenues(): void {
    this.revenueService.obtenirRevenues().subscribe(
      (response: Revenue[]) => {
        this.revenues = response;
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
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

  public showConfirmationModal(revenueId: number): void {
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
}
