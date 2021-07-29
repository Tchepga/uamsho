

const Utils = {
    capitalizeFirstLetter(string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
    },

    truncate(str) {
        return str.length > 10 ? str.substring(0, 7) + "..." : str;
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
    }

}

export default Utils;