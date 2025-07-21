import http from 'k6/http'
import { sleep, check } from 'k6'

export const options = {
    //Define o nr de interacoes do teste
    iterations: 50,
    thresholds: {
        http_req_duration: ['p(90)<10', 'max<1'], // 90% o tipe dicidei que no percentil de no tem que ser < 10 milessegundos
        http_req_failed: ['rate<0.01'] //Esse eh por percentual, significa que as falhas tem que ser < 1%
    }
}

//Aqui eh o teste
export default function(){
    const url = 'http://localhost:3000/login'
    
    const payload = JSON.stringify({
        username: 'julio.lima',
        senha: '123456'
    });

    const params = {
        headers: {
        'Content-Type': 'application/json',
         },
    };

    const response = http.post(url, payload, params)  

    check(response, {
        'Validar que o status eh 200': (r) => r.status === 200,
        'Validar que o token eh string': (r) => typeof(r.json().token) == 'string'
    });

    sleep(1)
}