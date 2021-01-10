const http = require('http');
const express = require('express');
const app = express();
app.get("/", (request, response) => {
  console.log(Date.now() + " Ping Received");
  response.sendStatus(200);
});
app.listen(process.env.PORT);
setInterval(() => {
  http.get(`http://${process.env.PROJECT_DOMAIN}.glitch.me/`);
}, 280000);

var Discord = require('discord.io');
var logger = require('winston');
var auth = require('./auth.json');
// Configure logger settings
logger.remove(logger.transports.Console);
logger.add(new logger.transports.Console, {
    colorize: true
});
logger.level = 'debug';
// Initialize Discord Bot
var bot = new Discord.Client({
   token: auth.token,
   autorun: true
});
bot.on('ready', function (evt) {
    logger.info('Connected');
    logger.info('Logged in as: ');
    logger.info(bot.username + ' - (' + bot.id + ')');
});





const badWords = ['bob']
var badMsg = false

bot.on('message', function(user, userID, channelID, message, event) {
    badMsg = false;
    badWords.forEach(function (item, index) {
      if (message.toLowerCase().includes(item)) {
        badMsg = true;
      }
    })
    if (badMsg) {

      console.log('Sent bad word');
      
      setTimeout(function () {
        console.log(channelID);
      
        bot.deleteMessage({
          channelID: channelID,
          messageID: event.d.id
        }, function (err) {
          console.log(err)
        })
      }, 1000)
      
      
    }
});




bot.on('message', function (user, userID, channelID, message, evt) {

 if((message.toLowerCase().search("bob") != -1 )&& badMsg){
    badMsg = false;

     bot.sendMessage({
                    to: userID,
                    message: `hello, ${user} you mentioned bob; your message had been deleted!`
                });
 }
  
      
  
    if (message.substring(0, 1) == '!') {
        var args = message.substring(1).split(' ');
        var cmd = args[0];
       
        args = args.splice(1);
        switch(cmd) {
      
            case 'about':
                bot.sendMessage({
                    to: channelID,
                    message: 'i am a bot pip pip'
                });
            break;
                case 'server':
                bot.sendMessage({
                    to: channelID,
                    message: 'author: https://github.com/frychicken'
                    
                });
            break;
            case 'help':
             bot.sendMessage({
                    to: channelID,
                    message: 'This is just a bot, nothing special, trying to do its job - command: !server; !about; !help'
                });
            break;

default:
  bot.sendMessage({
                    to: channelID,
                    message: 'invalid command, type !help for help'
                });            
         }
     }
   
   if(message.search("paste.ofcode") != -1){
   
      bot.sendMessage({
                    to: channelID,
                    message: 'Please not use pasteofcode, use bitbucket, github, pastebin or.. instead'
                });
  }
});


