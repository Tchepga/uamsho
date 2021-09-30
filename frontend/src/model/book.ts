import { like } from "./like";

export interface book {
    id : number;
    title : string;
    edition : string;
    subtitle : string;
    description : string;
    number_page : number;
    date_edition : string;
    bibliography : string;
    illustration : string;
    price : number;
    date_creation : string;

    ontop : boolean;
    add_date : string;
    comments : any;
    category : string;
    author : string;
    quantity : number;
    choiceQuantity: number;
}