import http from 'k6/http'
import { pegarBaseURL  } from '../utils/variaveis.js'; 
const postLogin = JSON.parse(open('../fixtures/potLogin.json'))


export function obterToken() {
    const url = pegarBaseURL() + '/login'

    const payload = JSON.stringify(postLogin);

    const params = {
        headers: {
            'Content-Type': 'application/json',
        },
    };

    const response = http.post(url, payload, params)
    return response.json('token')   
}