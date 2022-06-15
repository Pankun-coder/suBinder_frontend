import axios from "axios";

const createGroup = (groupName, password, passwordConfirmation) => {
    axios.post("http://localhost:3001/api/v0/groups", {
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
export default createGroup;