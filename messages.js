const Telegraf = require('telegraf');
const config = require('./config.json');
const { Markup } = Telegraf;

const overview = (data) => {
  let message = '';

  if (data.size > 0) {
    message = config.messages.overview + '\n';
    for (const key in data) {
      if (data.hasOwnProperty(key)) {
        const element = data[key];
        if (element.topic) {
          message += '> '
          message += element.topic;
          message += '\n';
        }
      }
    }
  } else {
    message = config.messages.noData;
  }
  return message;
};

const answerDates = (data) => {
  let message = '';
  if (data.size > 0) {
    message = config.messages.dates;
  } else {
    message = config.messages.noData;
  }

  return message;
};

const createDates = (match, data) => {
  let answer = '';
  if (data.size > 0) {
    if (data.finalDate) {
      answer = config.messages.finalDate + data.finalDate;
    } 
    else if (data.possibleDates) {
      for (const key in data.possibleDates) {
        if (data.hasOwnProperty(key)) {
          const element = data[key];
          if (typeof element ===) {
            answer = '<b>' + data[match].topic + '</b> \n';
            answer += data[match].description;
          }
        }
      }
      answer = '<b>' + data[match].topic + '</b> \n';
      answer += data[match].description;
    } else {
      answer = config.messages.noData;
    }
    return answer;
  }
}

const answerInfo = (data) => {
  let message = '';
  if (data.size > 0) {
    message = config.messages.info;
  } else {
    message = config.messages.noData;
  }

  return message;
};

const createInfo = (match, data) => {
  let answer = '';
  if (data.size > 0) {
    answer = '<b>' + data[match].topic + '</b> \n';
    answer += data[match].description;
  } else {
    answer = config.messages.noData;
  }
  return answer;
}

const createButtons = (data, type) => {
  const buttons = [];

  if (data.size > 0) {
    for (const key in data) {
      if (data.hasOwnProperty(key)) {
        const element = data[key];
        if (element.topic) {
          buttons.push([Markup.callbackButton(element.topic, (type + '_' + element.id))]);
        }
      }
    }
  }

  return buttons;
};

const createKeyboard = (data, type) => {
  const keyboard = Markup.inlineKeyboard(createButtons(data, type));

  return keyboard;
}

module.exports = { overview, answerDates, createKeyboard, createInfo, answerInfo, createDates };