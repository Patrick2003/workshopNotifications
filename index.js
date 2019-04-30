const config = require('./config.json');
const api = require('./api.js');
const Telegraf = require('telegraf');
require('es6-promise').polyfill();
require('isomorphic-fetch');

const bot = new Telegraf(config.botToken);
bot.command('oldschool', (ctx) => ctx.reply('Hello'));
bot.command('modern', ({reply}) => reply('Yo'));
bot.command('hipster', Telegraf.reply('λ'));
bot.launch();


api.getWorkshops(0, 20);