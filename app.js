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
  reply(reply_token, msg)
  res.sendStatus(200)
})

app.listen(port)
function reply (reply_token, msg) {
  let headers = {
    'Content-Type': 'application/json',
    'Authorization': 'Bearer {Mz+DV1Z3aSuQ65BJ9O6gW9f/JU524lLrGfrtj/gb5m48KU0VmoQxJ3ZVRw71e+Up1UlZgUxrkRY6KC8unOAAN/tWXDXOz+8U0WefjdLObzr2FzFuXnxwlteTJDxWKfR5zO4xH5VLnkSfbLW5joeGHQdB04t89/1O/w1cDnyilFU=}'
  }
  if (msg.toLowerCase() !== 'hey') {
    setTimeout(() => {
      fs.readFile('./src/assets/user.json', 'utf-8', (err, data) => {
        if (err) {
          throw err
        }
        const user = JSON.parse(data.toString())
        user.users.map(ACCESS_TOKEN => {
          headers = {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Authorization': 'Bearer ' + ACCESS_TOKEN
          }
          let body = JSON.stringify({
            messages: 'Can\'t answer customer a question!'
          })
          request.post({
            url: 'https://notify-api.line.me/api/notify',
            headers: headers,
            body: body
          }, (err, res, body) => {
            console.log('status = ' + res.statusCode);
          });
        });

      })
      let body = JSON.stringify({
        replyToken: reply_token,
        messages: [{
          type: 'text',
          text: 'Coundn\'t answer, informing admin, please wait'
        }]
      })
      request.post({
        url: 'https://api.line.me/v2/bot/message/reply',
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
