import { Role } from "./Role";

export interface Utilisateur {
    id_Utilisateur: number;
    nom: string;
    prenom: string;
    nom_utilisateur: string;
    email?: string;
    password: string;
    role: Role;
    idKeycloak?: string;
  }
  
 