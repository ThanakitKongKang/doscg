const express = require('express')
const axios = require('axios')
const cors = require('cors')
const bodyParser = require('body-parser')
const morgan = require('morgan')
const app = express()
const fs = require('fs')
const qs = require('qs')

app.use(morgan('tiny'))
app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
  extended: true
}))

app.get('/test', (req, res) => {
  res.json({
    message: 'this is test from controller!'
  })
})

app.post('/missingNumbers', (req, res) => {
  const { body } = req
  const numbers = JSON.parse(body.data)
  // [3, 3, 5, 9, 15, 23, 33]
  // [-, -, 5, -, -, 23, -]
  let prev = [0, 0]
  let k = 0
  let validNumbers = true
  numbers.forEach(function loop (value, i) {
    if (value) {
      if (k > 0) {
        let sum = prev[0]
        let count = 0
        for (let z = i - 1; z < numbers.length; z++) {
          sum += ((prev[1] + count) * 2)
          if (sum === value) {
            validNumbers = true
            break
          }
          if (sum > value || sum !== value) {
            validNumbers = false
            break
          }
          count++
        }
      }
      prev[0] = value
      prev[1] = i
      k++
    } else if (!value) {
      validNumbers = true
    }
    if (!validNumbers) {
      return false
    }
  })
  if (validNumbers) {
    let number = {
      value: null,
      index: null
    }
    // find first existing number with index
    for (let i = 0; i < numbers.length; i++) {
      if (numbers[i]) {
        number.value = numbers[i]
        number.index = i
        break
      }
    }
    // generate missing numbers
    let count = {
      up: 0,
      down: number.index
    }
    let sum = number.value
    let result = []
    let generatedNumbers = { ...numbers }
    for (let i = 0; i < numbers.length; i++) {
      if (i < number.index) {
        if (count.down === 1) {
          generatedNumbers[count.down - 1] = generatedNumbers[count.down]
        } else {
          generatedNumbers[count.down - 1] = generatedNumbers[count.down] - ((count.down - 1) * 2)
        }
        if (!numbers[i]) {
          result.push(generatedNumbers[count.down - 1])
        }
        count.down--
        count.up++
      }
      if (i > number.index) {
        let add = sum + (count.up * 2)
        generatedNumbers[i] = add
        if (!numbers[i]) {
          result.push(add)
        }
        sum = add
        count.up++
      }
    }
    result.sort((a, b) => { return a - b })
    res.json({
      results: JSON.stringify({ result })
    })
  } else {
    res.json({
      results: false
    })
  }
})

app.post('/findValues', (req, res) => {
  const { body } = req
  const values = JSON.parse(body.data)
  const result = {
    B: values[1] - values[0],
    C: values[2] - values[0]
  }
  if (result && values) {
    res.json({
      results: JSON.stringify({ result })
    })
  } else {
    res.json({
      results: false
    })
  }
})

app.post('/line-callback', (req, res) => {
  const { body } = req
  const code = body.code
  let LINE_API_TOKEN = 'https://notify-bot.line.me/oauth/token'
  let data = qs.stringify({
    'grant_type': 'authorization_code',
    'code': code,
    'redirect_uri': 'http://localhost:8080/line-callback',
    'client_id': 'ug5Dj546tVlA0b9ONLqHwI',
    'client_secret': 'Pqwp0ypsl3JZxPEiCocIsfh7ANOiAgVOmWuoORWEyBD'
  })
  let config = {
    method: 'post',
    url: LINE_API_TOKEN,
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    data: data
  }
  axios(config)
    .then(function (response) {
      const accessToken = response.data.access_token
      fs.readFile('././src/assets/user.json', 'utf-8', (err, data) => {
        if (err) {
          throw err
        }
        const user = JSON.parse(data.toString())
        user.users.push(accessToken.toString())
        const jsonData = JSON.stringify(user)
        fs.writeFile('././src/assets/user.json', jsonData, (err) => {
          if (err) {
            throw err
          }
          console.log('JSON data is saved.')
        })
      })
      res.json({
        results: JSON.stringify({ res })
      })
    })
    .catch(function (error) {
      if (error.response) {
        console.log(error.response.data.message)
        res.json({
          results: 'INVALID_CODE'
        })
      }
    })
})

const port = process.env.PORT || 4000
app.listen(port, () => {
  console.log(`listening on ${port}`)
})
