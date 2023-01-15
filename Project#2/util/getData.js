const proxyServer = 'https://people.rit.edu/~dsbics/proxy/http://ist.rit.edu/api/'

async function getData(endpoint){
    return fetch(`${proxyServer}${endpoint}`)
    .then((res)=>res.json());
  }
  export default getData;

  //use fetch to get data from server.