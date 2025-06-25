module.exports = {
  name: 'alive',
  alias: ['bot', 'thanujamd'],
  description: 'Bot එක ක්‍රියාකාරීද කියලා පරීක්ෂා කරන්න.',
  category: 'general',

  run: async (client, m, args) => {
    const msg = {
      text: `🤖 *THANUJA-MD Bot Alive!*\n\n📅 Date: ${new Date().toLocaleDateString()}\n⏰ Time: ${new Date().toLocaleTimeString()}\n\nWelcome! Use the buttons below to get started.`,
      footer: '🛠️ Powered by THANUJA-MD',
      buttons: [
        { buttonId: '.song', buttonText: { displayText: '🎵 SONG' }, type: 1 },
        { buttonId: '.video', buttonText: { displayText: '🎥 VIDEO' }, type: 1 },
        { buttonId: '.image', buttonText: { displayText: '🖼️ IMAGE' }, type: 1 },
        { buttonId: '.menu', buttonText: { displayText: '📜 MENU' }, type: 1 }
      ],
      headerType: 1
    };

    await client.sendMessage(m.chat, msg, { quoted: m });
  }
};
