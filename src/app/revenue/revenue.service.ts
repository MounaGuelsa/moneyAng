import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Revenue } from './Revenue';

@Injectable({
  providedIn: 'root'
})
export class RevenueService {
  [x: string]: any;

  private apiUrl = 'http://localhost:4047/revenues';

  constructor(private http: HttpClient) { }

  obtenirRevenues(): Observable<Revenue[]> {
    return this.http.get<Revenue[]>(this.apiUrl)
      .pipe(
        catchError(this.handleError)
      );
  }

  obtenirRevenueParId(id: number): Observable<Revenue> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.get<Revenue>(url)
      .pipe(
        catchError(this.handleError)
      );
  }

  ajouterRevenue(revenue: Revenue): Observable<Revenue> {
    return this.http.post<Revenue>(this.apiUrl, revenue)
      .pipe(
        catchError(this.handleError)
      );
  }

  modifierRevenue(id: number, revenue: Revenue): Observable<Revenue> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.put<Revenue>(url, revenue)
      .pipe(
        catchError(this.handleError)
      );
  }

  supprimerRevenue(id: number): Observable<void> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.delete<void>(url)
      .pipe(
        catchError(this.handleError)
      );
  }

  private handleError(error: any) {
    console.error('An error occurred:', error);
    return throwError('Une erreur s`est produite .');
  }
}
