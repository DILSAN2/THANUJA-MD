const config = require('../lib/config');

module.exports = {
    name: 'menu',
    alias: ['.menu', 'help'],
    description: 'Display bot command list',
    category: 'main',
    run: async ({ sock, msg }) => {
        const menuText = `
╭──❍ *${config.botName} MENU* ❍──╮
│
│👤 Owner: ${config.ownerName}
│🤖 Prefix: ${config.prefix}
│
├─❏ *Main Commands*
│ • ${config.prefix}hi
│ • ${config.prefix}menu
│
├─❏ *Group Commands*
│ • ${config.prefix}tagall
│ • ${config.prefix}promote @user
│ • ${config.prefix}demote @user
│
├─❏ *Fun*
│ • ${config.prefix}sticker
│ • ${config.prefix}quote
│
╰───────────────❏
        `;

        await sock.sendMessage(msg.key.remoteJid, { text: menuText }, { quoted: msg });
    }
};
