module.exports = {
  name: 'ping',
  alias: ['speed'],
  description: 'Check bot response speed',
  category: 'utility',
  async run({ client, m }) {
    const start = Date.now();
    await client.sendMessage(m.chat, { text: '🏓 Pong!' }, { quoted: m });
    const end = Date.now();
    const speed = end - start;
    await client.sendMessage(m.chat, { text: `⚡ Response Time: ${speed}ms` }, { quoted: m });
  }
};
