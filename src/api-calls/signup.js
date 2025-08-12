import axios from "axios";

export async function getVerificationCode (email) {
    var response = '';
    await axios.post('http://localhost:5000/registering-emails', { email })
        .then((res) => {
            response = res.data.message;
        })
        .catch((err) => {
            response = err.message;
        });
    return response;
}

export async function verifyEmail (data) {
    var response = '';
    await axios.put('http://localhost:5000/registering-emails', data)
        .then((res) => {
            response = res.data.message;
        })
        .catch((err) => {
            response = err.message;
        });
    return response;
}

export async function addNewUser (data) {
    var response = '';
    const { userId, name, email, dateOfBirth, password, confirmPassword } = data;
    await axios.post('http://localhost:5000/users', {
        userId,
        name,
        email,
        dateOfBirth,
        password: btoa(password),
        confirmPassword: btoa(confirmPassword)
    })
        .then((res) => {
            response = res.data.message;
        })
        .catch((err) => {
            response = err.message;
        });
    return response;
}
