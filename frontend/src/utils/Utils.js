
const Utils ={
    capitalizeFirstLetter(string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
    },

    truncate(str) {
        return str.length > 10 ? str.substring(0, 7) + "..." : str;
      }
}

export default Utils;