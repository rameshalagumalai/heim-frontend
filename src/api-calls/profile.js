import axios from "axios";

//ubuntu: 192.168.241.72:

export async function getProfilesByQuery(query, user) {
    var response, token;

    await user.getIdToken(true)
        .then((idToken) => { 
            token = idToken; 
        })
        .catch((err) => { 
            response = { message: err.message }; 
        });
    if (!token) {
        response = { message: "Try again later" };
        return response;
    }

    await axios.get(`http://localhost:7000/users?${query}`, { headers: {user_token: token} })
        .then((result) => {
            response = result.data;
        })
        .catch((err) => {
            response = { message: err.message };
        });

    return response;    
}

export async function getProfileDetails(user, userId) {
    var response, token;

    await user.getIdToken(true)
        .then((idToken) => { 
            token = idToken; 
        })
        .catch((err) => { 
            response = { message: err.message }; 
        });
    if (!token) {
        response = { message: "Try again later" };
        return response;
    }

    await axios.get(`http://localhost:7000/users/${userId}`, { headers: { user_token: token } })
        .then((res) => {
            response = res.data;
        })
        .catch((err) => {
            response = err.message;
        });

    return response;
}

export async function editProfileDetails(user, data) {
    var response, token;
    await user.getIdToken(true)
        .then((idToken) => { 
            token = idToken; 
        })
        .catch((err) => { 
            response = { message: err.message }; 
        });
    if (!token) {
        response = { message: "Try again later" };
        return response;
    }

    await axios.patch(`http://localhost:7000/users/${user.uid}`, data, { headers: {user_token: token} })
        .then((res) => {
            response = res.data.message;
        })
        .catch((err) => {
            response = err.message;
        });

    return response;
}