const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const morgan = require('morgan')
const app = express()
const request = require('request')

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

app.post('/callback', (req, res) => {
  let replyToken = req.body.events[0].replyToken
  let msg = req.body.events[0].message.text
  reply(replyToken, msg)
  res.sendStatus(200)
})

const port = process.env.PORT || 4000
app.listen(port, () => {
  console.log(`listening on ${port}`)
})

function reply (replyToken, msg) {
  let headers = {
    'Content-Type': 'application/json',
    'Authorization': 'Bearer {Mz+DV1Z3aSuQ65BJ9O6gW9f/JU524lLrGfrtj/gb5m48KU0VmoQxJ3ZVRw71e+Up1UlZgUxrkRY6KC8unOAAN/tWXDXOz+8U0WefjdLObzr2FzFuXnxwlteTJDxWKfR5zO4xH5VLnkSfbLW5joeGHQdB04t89/1O/w1cDnyilFU=}'
  }
  let body = JSON.stringify({
    replyToken: replyToken,
    messages: [{
      type: 'text',
      text: msg
    }]
  })
  request.post({
    url: 'https://api.line.me/v2/bot/message/reply',
    headers: headers,
    body: body
  }, (err, res, body) => {
    console.log('status = ' + res.statusCode, err, body)
  })
}
