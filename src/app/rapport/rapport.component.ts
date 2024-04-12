import { Component, OnInit } from '@angular/core';
import { Statistique } from './Statistique';
import { Rapport } from './Rapport';
import { RapportService } from './rapport.service';

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
      data => {
        this.statistiques = data;
      },
      error => {
        console.error('Error fetching statistics:', error);
      }
    );
 }

 generateRapports(): void {
    this.rapportService.generateRapports().subscribe(
      () => {
        this.obtenirListeRapports(); // Recharger les rapports après la génération
      },
      error => {
        console.error('Error generating reports:', error);
      }
    );
 }

 obtenirListeRapports(): void {
    this.rapportService.obtenirListeRapports().subscribe(
      data => {
        this.rapports = data; 
      },
      error => {
        console.error('Error fetching reports:', error);
      }
    );
 }

 supprimerRapport(id: number): void {
    this.rapportService.supprimerRapport(id).subscribe(
      () => {
        this.obtenirListeRapports(); // Recharger les rapports après la suppression
      },
      error => {
        console.error('Error deleting report:', error);
      }
    );
 }

 obtenirRapportsParMois(mois: number, annee: number): void {
    this.rapportService.obtenirRapportsParMois(mois, annee).subscribe(
      data => {
        this.rapports = data; // Ensure data is an array of Rapport
      },
      error => {
        console.error('Error fetching reports by month:', error);
      }
    );
 }
}
