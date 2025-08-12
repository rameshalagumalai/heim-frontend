import axios from "axios";

export async function getNotificationsByUser(user) {
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

    await axios.get(`http://localhost:5000/notifications`, { headers: {user_token: token} })
        .then((res) => {
            response = res.data;
        })
        .catch((err) => {
            response = err.message;
        });

    return response;
}