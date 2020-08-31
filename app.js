const express = require('express')
const line = require('@line/bot-sdk');
const bodyParser = require('body-parser')
const request = require('request')
const app = express()
const port = process.env.PORT || 4000
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.post('/webhook', (req, res) => {
  const client = new line.Client({
    channelAccessToken: 'Mz+DV1Z3aSuQ65BJ9O6gW9f/JU524lLrGfrtj/gb5m48KU0VmoQxJ3ZVRw71e+Up1UlZgUxrkRY6KC8unOAAN/tWXDXOz+8U0WefjdLObzr2FzFuXnxwlteTJDxWKfR5zO4xH5VLnkSfbLW5joeGHQdB04t89/1O/w1cDnyilFU='
  });
  client.getProfile('<userId>')
    .then((profile) => {
      let reply_token = req.body.events[0].replyToken
      let msg = req.body.events[0].message.text
      let userId = req.body.events[0].userId
      reply(reply_token, msg, profile, userId)
      res.sendStatus(200)
    })
    .catch((err) => {
      // error handling
    });

})
app.listen(port)
function reply (reply_token, msg, profile, userId) {
  let headers = {
    'Content-Type': 'application/json',
    'Authorization': 'Bearer {Mz+DV1Z3aSuQ65BJ9O6gW9f/JU524lLrGfrtj/gb5m48KU0VmoQxJ3ZVRw71e+Up1UlZgUxrkRY6KC8unOAAN/tWXDXOz+8U0WefjdLObzr2FzFuXnxwlteTJDxWKfR5zO4xH5VLnkSfbLW5joeGHQdB04t89/1O/w1cDnyilFU=}'
  }
  if (msg.toLowerCase() !== 'hey') {
    setTimeout(() => {
      let body = JSON.stringify({
        to: '',
        messages: [{
          type: 'text',
          text: 'Hello' + profile.userId + ' ' + userId
        },
        {
          type: 'text',
          text: 'How are you?' + profile.displayName
        }]
      })
    }, 10000);
    request.post({
      url: 'https://api.line.me/v2/bot/message/push',
      headers: headers,
      body: body
    }, (err, res, body) => {
      console.log('status = ' + res.statusCode);
    });
  } else {
    request.get({
      url: 'https://api.line.me/v2/bot/profile/userId',
      headers: headers,
    }, (err, res, body) => {
      let body = JSON.stringify({
        replyToken: reply_token,
        messages: [{
          type: 'text',
          text: 'Hello' + res.userId
        },
        {
          type: 'text',
          text: 'How are you?' + res.displayName
        }]
      })
      request.post({
        url: 'https://api.line.me/v2/bot/message/reply',
        headers: headers,
        body: body
      }, (err, res, body) => {
        console.log('status = ' + res.statusCode);
      });
    });
  }
}
