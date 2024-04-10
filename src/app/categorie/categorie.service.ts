import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Categorie } from './Categorie'; // Assurez-vous d'avoir un modèle Categorie correspondant

@Injectable({
 providedIn: 'root'
})
export class CategorieService {
 private apiUrl = 'http://localhost:4050/categories'; // Assurez-vous que l'URL correspond à celle de votre backend

 constructor(private http: HttpClient) { }

 obtenirCategories(): Observable<Categorie[]> {
    return this.http.get<Categorie[]>(this.apiUrl);
 }

 obtenirCategorieParId(id: number): Observable<Categorie> {
    return this.http.get<Categorie>(`${this.apiUrl}/${id}`);
 }

 ajouterCategorie(Categorie: Categorie): Observable<Categorie> {
    return this.http.post<Categorie>(this.apiUrl, Categorie);
 }

 modifierCategorie(id: number, Categorie: Categorie): Observable<Categorie> {
    return this.http.put<Categorie>(`${this.apiUrl}/${id}`, Categorie);
 }

 supprimerCategorie(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
 }
}
