import axios from "axios";

const createGroup = (groupName, password, passwordConfirmation) => {
    const data = {
        "groupName": groupName,
        "password": password,
        "passwordConfirmation": passwordConfirmation
    }
    axios.post("https://localhost:3001", data)
    .then(response => {
        console.log(response);
    })
    .catch(error => {
        console.log(error);
    })
}
export default createGroup;