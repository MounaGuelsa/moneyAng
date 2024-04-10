import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Rapport } from './Rapport';
import { Statistique } from './Statistique';

@Injectable({
  providedIn: 'root'
})
export class RapportService {
  private apiUrl = 'http://localhost:4043/rapports'; 
 
  constructor(private http: HttpClient) { }
 
  obtenirStatistics(): Observable<Statistique> {
     return this.http.get<Statistique>(`${this.apiUrl}/statistics`);
  }
 
  generateRapports(): Observable<void> {
     return this.http.get<void>(`${this.apiUrl}/generate`);
  }
 
  obtenirListeRapports(): Observable<Rapport[]> {
     return this.http.get<Rapport[]>(`${this.apiUrl}/liste`);
  }
 
  supprimerRapport(id: number): Observable<void> {
     return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
 
  obtenirRapportsParMois(mois: number, annee: number): Observable<Rapport[]> {
     return this.http.get<Rapport[]>(`${this.apiUrl}/parMois/${mois}/${annee}`);
  }
 }
 