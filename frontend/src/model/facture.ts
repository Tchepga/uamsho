import { book } from "./book"

export interface facture {
    
    identifiant :string;
    list_articles : Array<book>;
    totalHT :number;
    tva :number;
    totalTTC : number;
    date_creation : string;
}