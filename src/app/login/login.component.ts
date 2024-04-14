import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Utilisateur } from './Utilisateur';
import { Login } from './Login';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  loginForm: FormGroup;
  token: string | undefined;

  constructor(private http: HttpClient, private fb: FormBuilder) {
    this.loginForm = this.fb.group({
      nomUtilisateur: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  onSubmit() {
    if (this.loginForm.invalid) {
      return;
    }
    const loginDto: Login = {
      nomUtilisateur: this.loginForm.value.nomUtilisateur,
      password: this.loginForm.value.password
    };

    this.getToken(loginDto);
  }

  getToken(loginDto: Login) {
    this.http.post<string>('/utilisateurs/token', loginDto)
      .subscribe(response => {
        this.token = response;
        // Vous pouvez effectuer d'autres actions ici après avoir obtenu le token
      });
  }

}
