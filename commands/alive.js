module.exports = {
  name: 'alive',
  alias: ['bot', 'thanujamd'],
  description: 'Bot එක ක්‍රියාකාරීද කියලා පරීක්ෂා කරන්න.',
  category: 'general',

  run: async (client, m, args) => {
    const msg = {
      text: `🤖 *THANUJA-MD Bot Alive!*\n\n✅ Bot is working fine!\n📆 Date: ${new Date().toLocaleDateString()}\n⏰ Time: ${new Date().toLocaleTimeString()}\n\nSend *.menu* to see all commands.`,
      footer: '🛠️ Powered by THANUJA-MD',
      buttons: [
        { buttonId: '.menu', buttonText: { displayText: '📜 MENU' }, type: 1 },
        { buttonId: '.owner', buttonText: { displayText: '👤 OWNER' }, type: 1 },
        { buttonId: '.ping', buttonText: { displayText: '📶 PING' }, type: 1 }
      ],
      headerType: 1
    };

    await client.sendMessage(m.chat, msg, { quoted: m });
  }
};
