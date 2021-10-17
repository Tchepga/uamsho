import axios from "axios";


export enum AllowTypeRequest {
    GET,
    POST,
    PATCH
}

/**
 * manage request from api 
 */
const url404 = "http://localhost:8000/not-found";
const indexNotFound = "nf";

const DispatcherService = {

    errorMessage500: "Une erreur inattendue est survenue. Veuillez contacter l'équipe technique en communicant le(s) " +
        "information(s) suivante(s):\n Date=" + new Date().toDateString() + "; Heure=" + new Date().toTimeString(),

    requestApi(url: string, type: AllowTypeRequest, params: {} | null): Promise<any> | null {

        switch (type) {
            case AllowTypeRequest.GET:
                axios.get(url).then()


        }

        return null;
    },

    interceptResponse(): any {
        axios.interceptors.response.use(function (response) {
            // Any status code that lie within the range of 2xx cause this function to trigger

            // Do something with response data
            return response;
        }, function (error) {
            // Any status codes that falls outside the range of 2xx cause this function to trigger
            // Do something with response error

            if (error.response.status === 404 && error.response.config.url.includes(indexNotFound)) {
                window.location.replace(url404);
            }

            if (error.response.status === 500 || error.response.status === 400) {
                return Promise.resolve("Une erreur inattendue est survenue. Veuillez contacter l'équipe technique en communicant le(s) " +
                    "information(s) suivante(s):\n Date=" + new Date().toDateString() + "; Heure=" + new Date().toTimeString())
            }
            return Promise.reject(error);
        });
    }


}

export default DispatcherService;