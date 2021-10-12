import axios, { AxiosResponse } from "axios";

const UserService = {
    stateRequest: "OK",

    addUser(nom: string, prenom: string, password: string, username: string, address: string, addressComplement: string): Promise<AxiosResponse<any>> {
        
        return axios.post(process.env.REACT_APP_API_URL + "/api/user",
            { nom: nom, prenom: prenom, password: password, username: username, address: address, addressComplement: addressComplement })

    }
}

export default UserService;