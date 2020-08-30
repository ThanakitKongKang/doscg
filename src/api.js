import axios from 'axios'

const client = axios.create({
  baseURL: 'http://localhost:4000/',
  json: true
})

export default {
  async execute (method, resource, data) {
    // inject the accessToken for each request
    return client({
      method,
      url: resource,
      data
    }).then(req => {
      return req.data
    })
  },
  getTest () {
    return this.execute('get', '/test')
  }
}
