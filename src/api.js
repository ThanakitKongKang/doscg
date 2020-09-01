import axios from 'axios'

const client = axios.create({
  // baseURL: 'http://localhost:8080/',
  baseURL: 'https://doscg-linebot-backend.herokuapp.com/',
  json: true
})

export default {
  async execute (method, resource, data) {
    // inject the accessToken for each request
    return client({
      method,
      url: resource,
      data,
      headers: {
        'Access-Control-Allow-Origin': '*'
      }
    }).then(req => {
      return req.data
    })
  },
  getTest () {
    return this.execute('get', '/test')
  },
  getMissingNumbers (numbers) {
    const data = JSON.stringify(numbers)
    return this.execute('post', '/missingNumbers', { data })
  },
  findValues (values) {
    const data = JSON.stringify(values)
    return this.execute('post', '/findValues', { data })
  },
  lineCallback (code) {
    return this.execute('post', '/line-callback', { code })
  }
}
