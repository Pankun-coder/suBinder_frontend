import axios from "axios";

export const createGroup = (groupName, password, passwordConfirmation) => {
    axios.post(`http://${process.env.NEXT_PUBLIC_BACKEND_HOST}:3001/api/v0/groups`, {
        group: {
            "name": groupName,
            "password": password,
            "password_confirmation": passwordConfirmation
        }
    })
    .then(response => {
        console.log(response);
    })
    .catch(error => {
        console.log(error);
    })
}