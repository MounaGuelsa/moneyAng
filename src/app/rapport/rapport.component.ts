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
    statistiques: Statistique | undefined;
    rapports: Rapport[] | undefined;
   
    constructor(private rapportService: RapportService) { }
   
    ngOnInit(): void {
       this.obtenirStatistics();
       this.obtenirListeRapports();
    }
   
    obtenirStatistics(): void {
       this.rapportService.obtenirStatistics().subscribe(data => {
         this.statistiques = data;
         console.log(data)
       });
    }
   
    generateRapports(): void {
       this.rapportService.generateRapports().subscribe(() => {
         this.obtenirListeRapports(); // Recharger les rapports après la génération
       });
    }
   
    obtenirListeRapports(): void {
       this.rapportService.obtenirListeRapports().subscribe(data => {
         this.rapports = data;
       });
    }
   
    supprimerRapport(id: number): void {
       this.rapportService.supprimerRapport(id).subscribe(() => {
         this.obtenirListeRapports(); // Recharger les rapports après la suppression
       });
    }
   
    obtenirRapportsParMois(mois: number, annee: number): void {
       this.rapportService.obtenirRapportsParMois(mois, annee).subscribe(data => {
         this.rapports = data;
       });
    }
   }
