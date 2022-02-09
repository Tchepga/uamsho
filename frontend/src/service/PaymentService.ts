import axios from "axios";
import Utils from "../utils/Utils";

const PaymentService = {

    async simulPayment(email : string, totalHT: number, tva: number, totalTTC: number){
        
        const booksInfo: Array<string> = Utils.getBookCookie();
        return await axios
            .post(process.env.REACT_APP_API_URL + "/api/facture/simul-payment", 
                {booksInfo : booksInfo, email : email, totalHT: totalHT, tva : tva, totalTTC: totalTTC})   
    },

    async retrieveFacture(email : string) {
        return await axios
            .get(process.env.REACT_APP_API_URL + "/api/facture?email="+ email)
    }
}


export default PaymentService;