import { article } from "./article";
import { user } from "./user";

/**
 * Comment response interface
 */
export interface comment {
    id : number;
    owner : user;
    content: string;
    discussion : comment | null;
    article : article | null;
    date_creation : string;
}