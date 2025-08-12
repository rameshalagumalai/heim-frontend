import axios from "axios";

export async function newWave(user, data) {
    var response, token;
    await user.getIdToken(true)
        .then((idToken) => { 
            token = idToken; 
        })
        .catch((err) => { 
            response = err.message; 
        });
    if (!token) {
        response = "Try again later";
        return response;
    }

    await axios.post(`http://localhost:9000/waves`, data, { headers: {user_token: token} })
        .then((res) => {
            response = res.data.message;
        })
        .catch((err) => {
            response = err.message;
        });

    return response;
}

export async function getWavesByQuery(query, user) {
    var response, token;
    await user.getIdToken(true)
        .then((idToken) => { 
            token = idToken; 
        })
        .catch((err) => { 
            response = err.message; 
        });
    if (!token) {
        response = "Try again later";
        return response;
    }

    await axios.get(`http://localhost:9000/waves?${query}`, { headers: {user_token: token} })
        .then((res) => {
            response = res.data;
        })
        .catch((err) => {
            response = err.message;
        });

    return response;
}

export async function getDetailedWave(user, waveId) {
    var response, token;
    await user.getIdToken(true)
        .then((idToken) => { 
            token = idToken; 
        })
        .catch((err) => { 
            response = err.message; 
        });
    if (!token) {
        response = "Try again later";
        return response;
    }

    await axios.get(`http://localhost:9000/waves/${waveId}`, { headers: { user_token: token } })
        .then((res) => {
            response = res.data;
        })
        .catch((err) => {
            response = err.message;
        });

    return response;
}

export async function deleteWaveById(user, waveId) {
    var response, token;
    await user.getIdToken(true)
        .then((idToken) => { 
            token = idToken; 
        })
        .catch((err) => { 
            response = err.message; 
        });
    if (!token) {
        response = "Try again later";
        return response;
    }

    await axios.delete(`http://localhost:9000/waves/${waveId}`, { headers: {user_token: token} })
        .then((res) => {
            response = res.data.message;
        })
        .catch((err) => {
            response = err.message;
        });

    return response;
}