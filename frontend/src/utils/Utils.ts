
import { article } from "../model/article";
import { book } from "../model/book";
/**
 * Utilities function
 */
const Utils = {

    // character
    SPACE: "\xa0",

    H_80: "h-80",

    H_100: "h-100",

    DEFAULT_FORMAT_DATE: "fr-FR",

    defaultBookIllustration: "img/open-book-clipart-03.png",

    capitalizeFirstLetter(string: string) {

        return string.charAt(0).toUpperCase() + string.slice(1);
    },

    truncate(str: String) {
        return str != null && str.length > 40 ? str.substring(0, 40) + "..." : str;
    },

    dateFromString(dateString: string) {
        if (dateString !== null || dateString !== undefined) {

            let options: object = { year: 'numeric', month: 'long', day: 'numeric' };
            let date = new Date(dateString);
            return date.toLocaleDateString("fr-FR", options);
        }
    },

    compareBookByPrice(book1: book, book2: book) {
        if (book1 != null && book2 != null) {
            if (book1.price > book2.price) {
                return 1;
            }

            if (book1.price < book2.price) {
                return -1;
            }

            if (book1.price === book2.price) {
                return 0;
            }

        }

        return 0;
    },

    compareEntityByTitle(entity1: book | article, entity2: book | article) {

        if (entity1 != null && entity2 != null) {
            if (entity1.title > entity2.title) {
                return 1;
            }

            if (entity1.title < entity2.title) {
                return -1;
            }

            if (entity1.title === entity2.title) {
                return 0;
            }

        }

        return 0;
    },

    /**
     * get illustration of image book
     * @param url 
     * @returns string url
     */
    getIllustration(urlIllustration : string) {

        if (urlIllustration !== null) {
            return process.env.REACT_APP_API_URL + urlIllustration
        }

        return this.defaultBookIllustration;
    },

    /**
     * check if object is null or undefined
     * @param object object to check
     * @returns 
     */

    isNotNullObject(object: object) {

        if (object === null || object === undefined) {
            return false;
        }

        return true;
    },

    setCookie(key: string, value: string, exdays: number) {
        const d = new Date();
        d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
        let expires = "expires=" + d.toUTCString();
        document.cookie = key + "=" + value + ";" + expires + ";path=/";
    },

    getCookie(key: string) {
        let name = key + "=";
        let decodedCookie = decodeURIComponent(document.cookie);
        let ca = decodedCookie.split(';');

        for (let i = 0; i < ca.length; i++) {
            let c = ca[i];
            while (c.charAt(0) === ' ') {
                c = c.substring(1);
            }
            if (c.indexOf(name) === 0) {
                return c.substring(name.length, c.length);
            }
        }
        return "";
    },

    /**
     * get list of book's cookies
     * @returns list of string book
     */
    getBookCookie(){
        let decodedCookie = decodeURIComponent(document.cookie);
        let ca = decodedCookie.split(';');
        let bookIds = [];

        for (let i = 0; i < ca.length; i++) {
            let c = ca[i];
            while (c.charAt(0) === ' ') {
                c = c.substring(1);
            }
            if (c.includes("book")) {
                bookIds.push(c.substring(c.indexOf("=") + 1, c.length));
            }
        }
        return bookIds;
    },

    /**
     * delete a book cookie by id
     * @param key key book to delete format 'book[id]'
     */
    deleteBookCookie(key : string) {
        document.cookie = key +'=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;';
    }

}

export default Utils;