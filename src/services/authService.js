import http from './httpService';
import jwtDecode from 'jwt-decode';

const tokenkey = "token";

http.setJwt(getJwt());

export async function login(email, password){
    const {data: jwt} = await http.post('/auth', {email, password});
    localStorage.setItem(tokenkey, jwt);
}

export function loginWithJwt(jwt){
    localStorage.setItem(tokenkey, jwt);
}

function getJwt(){
    return localStorage.getItem(tokenkey);
}

export function logout(){
    localStorage.removeItem(tokenkey);
}


export function getCurrnetUser() {
    try {
        const jwt = localStorage.getItem(tokenkey);
        return jwtDecode(jwt);
    } catch (ex) {
        return null;
    }
}