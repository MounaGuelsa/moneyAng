import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Utilisateur } from './Utilisateur';
import { HttpClient } from '@angular/common/http';
import { Login } from './Login';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private http: HttpClient) { }

  createUtilisateur(utilisateur: Utilisateur): Observable<Utilisateur> {
    return this.http.post<Utilisateur>('/utilisateurs', utilisateur);
  }

  getUtilisateur(id: number): Observable<Utilisateur> {
    return this.http.get<Utilisateur>(`/utilisateurs/${id}`);
  }

  getToken(login: Login): Observable<string> {
    return this.http.post<string>('/utilisateurs/token', login);
  }

  supprimerUtilisateur(id: number): Observable<string> {
    return this.http.delete<string>(`/utilisateurs/${id}`);
  }
}
