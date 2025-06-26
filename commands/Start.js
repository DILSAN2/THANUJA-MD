module.exports = {
  name: 'start',
  alias: ['menu', 'help'],
  description: 'Bot start / help menu',
  category: 'general',

  async run({ client, m }) {
    const text = `
👋 Hello! I'm THANUJA-MD Bot.

📌 Available Commands:
- .start / .help – Show this message
- .ping – Check bot status
- .menu – Show command list
- .ai <question> – Ask AI
- .sticker – Make sticker from image

🔧 Bot made by @THANUJA
`;

    await client.sendMessage(m.chat, { text }, { quoted: m });
  }
};
