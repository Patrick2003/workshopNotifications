const Telegraf = require('telegraf');
const { Markup } = Telegraf;

const overview = (data) => {
  let message = '';
  if (data[0] > 0) {
    message = 'Es gibt folgende Workshops: \n';
    data.forEach(element => {
      if (element.topic) {
        message += '> '
        message += element.topic;
        message += '\n';
      }
    });
  } else {
    message = 'Es sind zur Zeit keine Workshops eingetragen.';
  }
  return message;
};

const dates = (data) => {
  let message = '';
  if (data.size > 0) {
    message = 'Wähle den Workshop zu dem du mögliche Termine erhalten willst';
  } else {
    message = 'Es sind zur Zeit keine Workshops eingetragen';
  }

  return message;
};


const createButtons = (data) => {
  const buttons = [];

  if (data.size > 0) {
    for (const key in data) {
      if (data.hasOwnProperty(key)) {
        const element = data[key];
        if (element.topic) {
          buttons.push([Markup.callbackButton(element.topic, ('info_' + element.id))]);
        }
      }
    }
  }

  return buttons;
};

const createKeyboard = (data) => {
  const keyboard = Markup.inlineKeyboard(createButtons(data));

  return keyboard;
}

const createInfo = (match, data) => {
  let answer = '';
  if (data.size > 0) {
    answer = '<b>' + data[match].topic + '</b> \n';
    answer += data[match].description;
  } else {
    answer = 'Es liegen keine Daten vor';
  }
  return answer;
}

module.exports = { overview, dates, createKeyboard, createInfo };