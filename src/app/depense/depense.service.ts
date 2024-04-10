import { Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';
import { Depense } from './Depense';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DepenseService {
 
  private apiUrl = 'http://localhost:4050/depenses';
  constructor(private http: HttpClient) { }

  obtenirDepenses(): Observable<Depense[]> {
    return this.http.get<Depense[]>(`${this.apiUrl}`);
 }

 obtenirDepenseParId(id: number): Observable<Depense> {
  return this.http.get<Depense>(`${this.apiUrl}/${id}`);
}

 ajouterDepense(Depense: Depense): Observable<Depense> {
    return this.http.post<Depense>(this.apiUrl, Depense);
 }

 modifierDepense( id: number ,depense: Depense): Observable<Depense> {
    return this.http.put<Depense>(`${this.apiUrl}/${id}`, depense);
 }

 supprimerDepense(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
 }


 obtenirDepensesEntreDates(debut: string, fin: string): Observable<Depense[]> {
    return this.http.get<Depense[]>(`${this.apiUrl}/entreDates?debut=${debut}&fin=${fin}`);
 }

 totalDepensesParMois(): Observable<Map<string, number>> {
    return this.http.get<Map<string, number>>(`${this.apiUrl}/totalDepenses`);
 }


  handleError(error: any): any {
    console.error('An error occurred:', error);
    return throwError('Une erreur s`est produite .');
}
}

