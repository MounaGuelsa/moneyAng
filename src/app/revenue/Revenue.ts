import { Type } from './Type';

export interface Revenue {
    idRevenue: number;
    nomRevenue: string;
    montant: number;
    date: string; 
    utilisateurId: number;
    type: Type; 
   
}