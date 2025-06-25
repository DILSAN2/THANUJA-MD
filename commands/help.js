const fs = require('fs');
const path = require('path');
const helpData = require('../help.json'); // help.json is in root directory

module.exports = {
  name: 'help',
  alias: ['menu', 'commands'],
  description: 'Bot එකේ විධාන (commands) සදහන් කරන menu එක පෙන්වයි',
  category: 'general',

  run: async (client, m, args) => {
    try {
      let msg = `*${helpData.main.title}*\n\n${helpData.main.description}\n\n`;

      for (let categoryKey in helpData.categories) {
        const cat = helpData.categories[categoryKey];
        msg += `\n🌐 *${cat.title}*\n`;

        for (let cmd in cat.commands) {
          msg += `• *.${cmd}* — ${cat.commands[cmd]}\n`;
        }
      }

      msg += `\n${helpData.main.footer}`;

      await client.sendMessage(m.chat, { text: msg }, { quoted: m });
    } catch (err) {
      console.error('❌ Help command error:', err);
      await client.sendMessage(m.chat, { text: '⚠️ Help menu එක load වෙන්න බැරි වුණා.' }, { quoted: m });
    }
  }
};
