const config = require('./config.json');
let workshops = require('./workshops.json');
const api = require('./api.js');
const messages = require('./messages.js');
const Telegraf = require('telegraf');
const { Markup } = Telegraf;
require('es6-promise').polyfill();
require('isomorphic-fetch');


const bot = new Telegraf(config.botToken);

bot.command('overview', (ctx) => ctx.reply(messages.overview(workshops.data)));
bot.command('info', (ctx) => ctx.reply(messages.answerInfo(workshops.data), messages.createKeyboard(workshops.data, 'info').extra()));
bot.command('dates', (ctx) => ctx.reply(messages.answerDates(workshops.data), messages.createKeyboard(workshops.data, 'dates').extra()));
bot.launch();


bot.action(/info_(.*)/, (ctx) => {
  ctx.reply(messages.createInfo(ctx.match[1], workshops.data), { parse_mode: 'HTML' });
});

bot.action(/dates_(.*)/, (ctx) => {
  ctx.reply(messages.createDates(ctx.match[1], workshops.data), { parse_mode: 'HTML' });
});

let requestedData = {};

setInterval(() => {
  if (Object.keys(requestedData).length === requestedData.size + 1) {
    workshops.data = requestedData;
    requestedData = {};
    console.log("data up to date");
  } else {
    api.getWorkshops(0, 1).then((json) => {
      if (json) {
        requestedData.size = json.totalItems;
        if (json.pageCount !== 0) {
          for (let page = 0; page < json.pageCount; page++) {
            api.getWorkshops(page, 1).then(
              (json) => {
                json.data.forEach((element) => requestedData[element.id] = element);
              })
          }
        }
      }
    });
  }
}, config.fetchTimeout);