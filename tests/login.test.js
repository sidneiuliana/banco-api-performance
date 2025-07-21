import http from 'k6/http'
import { sleep, check } from 'k6'
const postLogin = JSON.parse(open('../fixtures/potLogin.json'))

export const options = {
    //Define o nr de interacoes do teste
    //iterations: 50,   ////---->>>Retirado para comecar a usar usuarios virtuais
    //vus: 10, //!0 usuarios virtuais
    //duration: '30s', //duracao
	stages: [
		{ duration: '10s', target: 10 },    //Durante 10segundos coloque 10 usuarios virtuais executando
		{ duration: '20s', target: 10 }, //Nos proximos 20segundos continue com 10 usuarios executando
		{ duration: '10s', target: 30 }, //Depois aos 10segundos quero que chegue a 30 usuario virtuais
        { duration: '20s', target: 30 }, //Quero que mantenhqa os 30 usuarios por 20segundos
        { duration: '20s', target: 0 }, //Agor nos proximos 20segundos quero que caia para 0 usuarios
	],
    thresholds: {
        http_req_duration: ['p(90)<3000', 'max<5000'], // 90% o tipe dicidei que no percentil de no tem que ser < 10 milessegundos
        http_req_failed: ['rate<0.01'] //Esse eh por percentual, significa que as falhas tem que ser < 1%
    }
}

//Aqui eh o teste
export default function(){
    const url = 'http://localhost:3000/login'
    
    const payload = JSON.stringify(postLogin);

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