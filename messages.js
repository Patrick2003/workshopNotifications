const overview = (data) => {
let message = ''; 
  if (data[0] > 0) {
    message = 'Es gibt folgende Workshops: \n';
    data.forEach(element => {
      if (element.topic) {
        message += element.topic;
        message += '\n';
      }
    });
  } else {
    message = 'Es sind zur Zeit keine Workshops eingetragen.';
  }
  return message;
};

module.exports = {overview};