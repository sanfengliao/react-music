import axios from 'axios'
axios.defaults.baseURL = ''

const ajax = (url, params, method = 'get') => {
  return new Promise((resolve) => {
    let config = {
      url,
      method
    }
    if (method.toLowerCase() === 'get') {
      config['params'] = params
    } else {
      config['data'] = params 
    }
    axios(config).then(res => {
      if (res.status === 200) {
        resolve(res.data)
      }
    })
  })
}


export default ajax