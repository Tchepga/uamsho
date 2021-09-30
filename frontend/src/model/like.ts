import { article } from "./article";
import { book } from "./book";
import { debate } from "./debate";
import { user } from "./user";

export interface like {
    id : number;
    owner : user;
    book : book;
    article : article;
    debate : debate;
}