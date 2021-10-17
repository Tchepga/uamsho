
import { article } from "../model/article";
import { book } from "../model/book";
/**
 * Utilities function
 */
const Utils = {

    // type Message Notification
    ERROR_MESSAGE: 1,
    SUCCESS_MESSAGE: 2,

    // status request
    CREATED_STATUS: 201,

    // character
    SPACE: "\xa0",

    H_80: "h-80",
    H_100: "h-100",

    DEFAULT_FORMAT_DATE: "fr-FR",

    defaultBookIllustration: "img/open-book-clipart-03.png",

    capitalizeFirstLetter(string: string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
    },
    /**
     * 
     * @param str truncate on 40 characters
     * @returns string
     */
    truncate(str: String): String {
        return str != null && str.length > 40 ? str.substring(0, 40) + "..." : str;
    },
    /**
     * format number on 8 digits
     * @param value value to format
     * @returns 
     */
    formatNumber( value : string): string{
        let stringValue = value.toString();
        let size = stringValue.length
        while(size<8){
            console.log(`size`, size)
            stringValue = "0" + stringValue
            size = stringValue.length
        }

        return stringValue
    },

    dateFromString(dateString: string) {
        if (dateString !== null || dateString !== undefined) {
            let options: object = { year: 'numeric', month: 'long', day: 'numeric' };
            let date = new Date(dateString);
            return date.toLocaleDateString("fr-FR", options);
        }
    },

    compareBookByPrice(book1: book, book2: book): number {
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

    compareEntityByTitle(entity1: book | article, entity2: book | article) : number{

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
    getIllustration(urlIllustration: string) {

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

    isNotNullObject(object: object | string) {

        if (object === null || object === undefined) {
            return false;
        }

        return true;
    },

    /**
     * save cookie
     * @param key key value
     * @param value value to set
     * @param exdays when is expired
     */
    setCookie(key: string, value: string, exdays: number) {
        const d = new Date();
        d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
        let expires = "expires=" + d.toUTCString();
        document.cookie = key + "=" + value + ";" + expires + ";path=/";
    },
    /**
     * get cookie from cookie
     * @param key key value
     * @returns 
     */
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
    getBookCookie() {
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
    deleteBookCookie(key: string) {
        document.cookie = key + '=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;';
    }

}

export default Utils;