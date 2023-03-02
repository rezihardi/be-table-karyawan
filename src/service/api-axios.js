const axios = require('axios').default;
const api = {}
const util = require('../helpers/util')


api.getFlights = async() => {
    try{
        let data = await axios({
            method: 'get',
            url: `http://test-training-proxy.sg-s1.cloudhub.io/flights`,
            headers: {
                client_id: '0f4a66c9198e410f8614ae5fa531c6df',
                client_secret: '8001cC6fcf35459692B7381f7E16D3dA'
            }
        })
        return (util.isObjectEmpty(data.data)) ? null : data.data
    } catch (e) {
        console.log(e)
        return []
    }
}

api.getIPAddr = async(reqApi) => {
    try {
        let data = await axios({
            method: 'get',
            url: `http://ipapi.co/${reqApi}/json`,
        })
        return (util.isObjectEmpty(data.data)) ? null : data.data
    } catch (e){
        console.log('masuk catch', e.message)
        return {}
    }
}

module.exports = api;