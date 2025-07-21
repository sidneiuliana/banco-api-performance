const configLocal =  JSON.parse(open('../config/config.local.json'))

export function pegarBaseURL(){
    const base_URL = __ENV.BASE_URL || configLocal.baseURL
    return base_URL
}