export function getCount(value) {
    var result;
    if (value >= 100) {
        result = parseFloat(value / 1000).toFixed(1) + 'k';
    } else {
        result = value;
    }
    return result
}

export function getProcessedWave(wave) {
    var result ='';
    wave = wave.replaceAll("\n", "<br/>");
    const texts = wave.split(" ");
    texts.forEach(text => {
        switch(text[0]) {
            case '#':
                result += `<a href='/waves?tag=${text.substr(1)}'>${text}</a> `;
                break;
            case '@':
                result += `<a href='/users?userId=${text.substr(1)}'>${text}</a> `;
                break;
            default:
                result += (text + " ");        
        }
    });
    return result;
}

export function validateEmail (email) {
    return (email.match(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/));
}

export function validateDate (date) {
    return (date.match(/^\d{4}[\/\-](0?[1-9]|1[012])[\/\-](0?[1-9]|[12][0-9]|3[01])$/));
}

export function validateUserId (userId) {
    return (userId.match(/^[^0-9](?!.*\.\.)(?!.*\.$)[^\W][\w.]{0,29}$/))
}

export function checkAge (date) {
    if (new Date().getFullYear() - parseInt(date.substring(0, 5)) >= 18) {
        return true;
    }
    return false;
}

export function validatePassword (password) {
    return (password.match(/^(?!.*\s)(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[~`!@#$%^&*()--+={}\[\]|\\:;"'<>,.?/_₹]).{8,16}$/));
}

export function getFormattedDate(instance) {
    return new Date(instance).toLocaleString('en-us', { year: "numeric", month: "short", day: "numeric", hour: "numeric", minute: "numeric" });
}

export function compressImage(img) {
    
}