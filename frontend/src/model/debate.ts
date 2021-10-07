import { comment } from "./comment";
import { user } from "./user";

export default interface debate {
    id: number;
    subject: string;
    illustration: string;
    content: string;
    comments: Array<comment>;
    date_creation: string;
    date_debut_reunion: string;
    date_fin_reunion: string;
    ontop: boolean;

    lien_debate: string;

    nbre_stars: number;
    author: any;
}