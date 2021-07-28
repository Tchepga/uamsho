

const Utils = {
    capitalizeFirstLetter(string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
    },

    truncate(str) {
        return str.length > 10 ? str.substring(0, 7) + "..." : str;
    },

    compareArticlesByPrice(article1, article2){
        if(article1 != null && article2 != null){
            if(article1.price > article2.price){
                return 1;
            }

            if(article1.price < article2.price){
                return -1;
            }

            if(article1.price === article2.price){
                return 0;
            }
            
        }
    }

}

export default Utils;