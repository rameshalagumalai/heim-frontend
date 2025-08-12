import axios from "axios";

export async function addFollow(user, following) {
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

    await axios.post('http://localhost:11000/follows', { following }, { headers: {user_token: token} })
        .then((result) => {
            response = result.data.message;
        })
        .catch((err) => {
            response = err.message;
        });

    return response;    
}

export async function removeFollow(user, following) {
    var response, token;

    await user.getIdToken(true)
        .then((idToken) => { 
            token = idToken; 
        })
        .catch((err) => { 
            response = err.message ; 
        });
    if (!token) {
        response = "Try again later";
        return response;
    }

    await axios.delete(`http://localhost:11000/follows?following=${following}`, { headers: {user_token: token} })
        .then((result) => {
            response = result.data.message;
        })
        .catch((err) => {
            response = err.message;
        });

    return response;    
}

export async function addStar(user, object) {
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

    await axios.post('http://localhost:11000/stars', { object }, { headers: {user_token: token} })
        .then((result) => {
            response = result.data.message;
        })
        .catch((err) => {
            response = err.message;
        });

    return response;    
}

export async function removeStar(user, object) {
    var response, token;

    await user.getIdToken(true)
        .then((idToken) => { 
            token = idToken; 
        })
        .catch((err) => { 
            response = err.message ; 
        });
    if (!token) {
        response = "Try again later";
        return response;
    }

    await axios.delete(`http://localhost:11000/stars?object=${object}`, { headers: {user_token: token} })
        .then((result) => {
            response = result.data.message;
        })
        .catch((err) => {
            response = err.message;
        });

    return response;    
}

export async function newComment(user, data) {
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

    await axios.post(`http://localhost:11000/comments`, data, { headers: {user_token: token} })
        .then((res) => {
            response = res.data;
        })
        .catch((err) => {
            response = err.message;
        });

    return response;
}

export async function getCommentsByWaveId(user, waveId) {
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

    await axios.get(`http://localhost:11000/comments?waveId=${waveId}`, { headers: {user_token: token} })
        .then((res) => {
            response = res.data;
        })
        .catch((err) => {
            response = err.message;
        });

    return response;
}

export async function deleteCommentById(user, commentId) {
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

    await axios.delete(`http://localhost:11000/comments/${commentId}`, { headers: {user_token: token} })
        .then((res) => {
            response = res.data.message;
        })
        .catch((err) => {
            response = err.message;
        });

    return response;
}