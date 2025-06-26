// General utility functions
const moment = require('moment-timezone');

module.exports = {
  getTime: (zone = 'Asia/Colombo') => {
    return moment().tz(zone).format('YYYY-MM-DD HH:mm:ss');
  },

  isUrl: (text) => {
    return /https?:\/\/[^\s]+/.test(text);
  },

  wait: (ms) => new Promise(resolve => setTimeout(resolve, ms)),

  randomItem: (arr) => {
    return arr[Math.floor(Math.random() * arr.length)];
  }
};
