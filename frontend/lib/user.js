import axios from "axios";


export const createUser = (groupName, groupPassword, userName, email, userPassword, userPasswordConfirmation) => {
    const url = "http://localhost:3001/api/v0/users/"
    const data = {
        group: {
            "name": groupName,
            "password": groupPassword
        },
        user: {
            "name": userName,
            "email": email,
            "password": userPassword,
            "password_confirmation": userPasswordConfirmation
        }
    }
    axios.post(url, data)
    .then(response => {
        console.log(response);
    })
    .catch(error => {
        console.log(error);
    })
}