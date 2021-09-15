import { user } from "./user";

export interface article {
    id : number;
    title : string;
    subtitle : string;
    description : string;
    date_creation : string;
    ontop : boolean;
    
    category : string;
    
    nbre_stars: number;
    author : user;
}