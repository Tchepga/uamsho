
import axios from "axios";
/**
 * Utilities function
 */
const Utils = {
    
    H_80: "h-80",

    H_100: "h-100",

    DEFAULT_FORMAT_DATE: "fr-FR",

    defaultBookIllustration : "img/open-book-clipart-03.png",

    capitalizeFirstLetter(string) {
        
        return string.charAt(0).toUpperCase() + string.slice(1);
    },

    truncate(str) {
        return str!=null && str.length > 40 ? str.substring(0, 40) + "..." : str;
    },

    dateFromString(dateString){
        if(dateString !== null || dateString !== undefined){
            let options = { year: 'numeric', month: 'long', day: 'numeric' };
            let date = new Date(dateString);
            return date.toLocaleDateString("fr-FR",options);
        }
    },
    
    compareBookByPrice(book1, book2){
        if(book1 != null && book2 != null){
            if(book1.price > book2.price){
                return 1;
            }

            if(book1.price < book2.price){
                return -1;
            }

            if(book1.price === book2.price){
                return 0;
            }
            
        }
    },

    compareEntityByTitle(entity1, entity2){
        if(entity1 != null && entity2 != null){
            if(entity1.title > entity2.title){
                return 1;
            }

            if(entity1.title < entity2.title){
                return -1;
            }

            if(entity1.title === entity2.title){
                return 0;
            }
            
        }
    },

    getIllustration(book){

        if(this.isNotNullObject(book) && book.illustration !== null){
            return process.env.REACT_APP_API_URL + book.illustration
        }

        return this.defaultBookIllustration;
    },

    isNotNullObject(object){

        if(object=== null || object === undefined){
            return false;
        }

        return true;
    }    

}

export default Utils;