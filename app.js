const express = require('express')
const line = require('@line/bot-sdk');
const bodyParser = require('body-parser')
const request = require('request')
const app = express()
const port = process.env.PORT || 4000
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.post('/webhook', (req, res) => {
  let reply_token = req.body.events[0].replyToken
  let msg = req.body.events[0].message.text
  let userId = req.body.events[0].userId
  reply(reply_token, msg, userId)
  res.sendStatus(200)
})
app.listen(port)
function reply (reply_token, msg, userId) {
  let headers = {
    'Content-Type': 'application/json',
    'Authorization': 'Bearer {Mz+DV1Z3aSuQ65BJ9O6gW9f/JU524lLrGfrtj/gb5m48KU0VmoQxJ3ZVRw71e+Up1UlZgUxrkRY6KC8unOAAN/tWXDXOz+8U0WefjdLObzr2FzFuXnxwlteTJDxWKfR5zO4xH5VLnkSfbLW5joeGHQdB04t89/1O/w1cDnyilFU=}'
  }
  if (msg.toLowerCase() !== 'hey') {
    setTimeout(() => {
      let body = JSON.stringify({
        to: 'Ua713b8f663a3db5709fd064dc588139e',
        messages: [{
          type: 'text',
          text: 'Hello' + userId
        },
        {
          type: 'text',
          text: 'How are you?'
        }]
      })
      request.post({
        url: 'https://api.line.me/v2/bot/message/push',
        headers: headers,
        body: body
      }, (err, res, body) => {
        console.log('status = ' + res.statusCode);
      });
    }, 10000);
  } else {
    let body = JSON.stringify({
      replyToken: reply_token,
      messages: [{
        type: 'text',
        text: 'Hello'
      },
      {
        type: 'text',
        text: 'How are you?'
      }]
    })
    request.post({
      url: 'https://api.line.me/v2/bot/message/reply',
      headers: headers,
      body: body
    }, (err, res, body) => {
      console.log('status = ' + res.statusCode);
    });
  }
}
