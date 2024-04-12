import { Component, OnInit } from '@angular/core';
import { Statistique } from './Statistique';
import { Rapport } from './Rapport';
import { RapportService } from './rapport.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
 selector: 'app-rapport',
 templateUrl: './rapport.component.html',
 styleUrls: ['./rapport.component.css']
})
export class RapportComponent implements OnInit {
  statistiques: Statistique | null = null;
  rapports: Rapport[] = [];

 constructor(private rapportService: RapportService) { }

 ngOnInit(): void {
    this.obtenirStatistics();
    this.obtenirListeRapports();
 }

 obtenirStatistics(): void {
    this.rapportService.obtenirStatistics().subscribe(
      (data: Statistique) => {
        this.statistiques = data;
      },
      (error: HttpErrorResponse) => {
        console.error('Error fetching statistics:', error);
      }
    );
 }

 generateRapports(): void {
    this.rapportService.generateRapports().subscribe(
      () => {
        this.obtenirListeRapports(); // Recharger les rapports après la génération
      },
      (error: HttpErrorResponse) => {
        console.error('Error generating reports:', error);
      }
    );
 }

 obtenirListeRapports(): void {
    this.rapportService.obtenirListeRapports().subscribe(
      (data: Rapport[]) => {
        this.rapports = data;
      },
      (error: HttpErrorResponse) => {
        console.error('Error fetching reports:', error);
      }
    );
 }

 confirmSupprimerRapport(id: number): void {
  // Afficher le modal de confirmation
  $('#confirmationModal').modal('show');

  // Exécuter la suppression lors de la confirmation
  $('#confirmDeleteBtn').click(() => {
      this.supprimerRapport(id);
      // Cacher le modal de confirmation
      $('#confirmationModal').modal('hide');
  });
}

 supprimerRapport(id: number): void {
  this.rapportService.supprimerRapport(id).subscribe(
    () => {
      console.log("Rapport supprimé avec succès !");
      this.obtenirListeRapports();
    },
    (error: HttpErrorResponse) => {
      alert(error.message);
    }
  );
 } 

 obtenirRapportsParMois(mois: number, annee: number): void {
    this.rapportService.obtenirRapportsParMois(mois, annee).subscribe(
      (data: Rapport[]) => {
        this.rapports = data;
      },
      (error: HttpErrorResponse) => {
        console.error('Error fetching reports by month:', error);
      }
    );
 }
}
