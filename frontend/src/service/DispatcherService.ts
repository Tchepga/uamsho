import axios, { AxiosResponse } from "axios";


export enum AllowTypeRequest {
    GET,
    POST,
    PATCH
}

/**
 * manage request from api 
 */

class DispatcherService {
    

    static errorMessage500 : string = "Une erreur inattendue est survenue. Veuillez contacter l'équipe technique en communicant le(s) " +
    "information(s) suivante(s):\n Date=" + new Date().toDateString() + "; Heure=" + new Date().toTimeString();

    requestApi(url : string , type: AllowTypeRequest , params : {} | null) : Promise<any> | null {
        
        switch(type){
            case AllowTypeRequest.GET:
                axios.get(url).then()

                
        }

        return null;
    };

    interceptResponse(): any{
        axios.interceptors.response.use(function (response) {
            // Any status code that lie within the range of 2xx cause this function to trigger

            if(response.status===404){
                Promise.resolve(404);
            }

            if(response.status===500){
                Promise.resolve("Une erreur inattendue est survenue. Veuillez contacter l'équipe technique en communicant le(s) " +
                "information(s) suivante(s):\n Date=" + new Date().toDateString() + "; Heure=" + new Date().toTimeString());
            }
            // Do something with response data
            return response;
          }, function (error) {
            // Any status codes that falls outside the range of 2xx cause this function to trigger
            // Do something with response error
            return Promise.reject(error);
          });
    }


}

export default DispatcherService;