import { Depense } from "../depense/Depense";

export interface Facture {
    numeroFacture: number;
    nomFacture: string;
    url: string;
    depense: Depense; 
   }