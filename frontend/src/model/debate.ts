import { user } from "./user";

export interface debate {
    id : number;
    subject : string;
    illustration : string;
    content : string;
    date_creation : string;
    date_reunion : string;
    ontop : boolean;
    
    lien_debate : string;
    
    nbre_stars: number;
    author : user;
}