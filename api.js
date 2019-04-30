const config = require('./config.json');
require('es6-promise').polyfill();
require('isomorphic-fetch');

const getWorkshops = (page, pagesize) => {
  const URL = config.WorkshopURL.begin + page.toString() +
      config.WorkshopURL.end + pagesize.toString();

  fetch(URL, {method: 'GET', headers: {'Accept': 'application/json'}})
      .then(response => {
        if (!response.ok) {
          throw new Error('HTTP error, status = ' + response.status);
        }
        return response.json();
      })
      .then(json => {
        console.log(json);
      })
      .catch(err => console.log(err));
};

module.exports = {getWorkshops};