import { Categorie } from "../categorie/Categorie";
import { Facture } from "../facture/Facture";
import { MoyennePaiement } from "./MoyennePaiement";

export interface Depense {
    idDepense: number;
    montant: number;
    date: string; 
    description: string;
    notes: string;
    categorie: Categorie; 
    facture: Facture; // Assuming Facture is another interface or type
    moyennePaiement: MoyennePaiement; // Assuming MoyennePaiement is another interface or type
    utilisateurId: number;
   }

   

   
 

   