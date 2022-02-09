import axios, { AxiosResponse } from "axios";

const UserService = {
    stateRequest: "OK",

    addUser(nom: string, prenom: string, password: string, username: string, email: string, address: string, addressComplement: string|null): Promise<AxiosResponse<any>> {
        
        return axios.post(process.env.REACT_APP_API_URL + "/api/user",
            { nom: nom, prenom: prenom, password: password, username: username, email: email, address: address, addressComplement: addressComplement })

    },

    udpateUser(nom: string, prenom: string, email: string, username: string, address: string, addressComplement: string): Promise<AxiosResponse<any>> {
        
        return axios.patch(process.env.REACT_APP_API_URL + "/api/user",
            { name: nom, firstName: prenom, email: email, username: username, address: address, addressComplement: addressComplement })

    }
}

export default UserService;