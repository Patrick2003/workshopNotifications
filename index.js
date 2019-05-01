const config = require('./config.json');
let workshops = require('./workshops.json');
const api = require('./api.js');
const messages = require('./messages.js');
const Telegraf = require('telegraf');
require('es6-promise').polyfill();
require('isomorphic-fetch');



const bot = new Telegraf(config.botToken);
bot.command('workshops', (ctx) => ctx.reply(messages.overview(workshops.data)));
bot.command('modern', ({reply}) => reply('Yo'));
bot.command('hipster', Telegraf.reply('λ'));
bot.launch();



let requestedData = [];

setInterval(() => {
  if (requestedData.length > requestedData[0]) {
    workshops.data = requestedData;
    requestedData = [];
    console.log(JSON.stringify(workshops));
  } else {
    api.getWorkshops(0, 1).then((json) => {
      requestedData[0] = json.totalItems;
      if (json.pageCount !== 0) {
        for (let page = 0; page < json.pageCount; page++) {
          api.getWorkshops(page, 1).then(
              (json) => {
                  json.data.forEach((element) => requestedData.push(element))})
        }
      }
    });
  }
}, 10000);