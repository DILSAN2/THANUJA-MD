const axios = require('axios');

module.exports = {
  name: 'ai',
  alias: ['gpt', 'openai'],
  description: 'Ask anything from ChatGPT AI',
  category: 'ai',

  run: async (client, m, args) => {
    const prompt = args.join(' ');
    if (!prompt) return m.reply('💬 Pls enter a question or message to ask the AI.');

    try {
      const response = await axios.post(
        'https://api.openai.com/v1/chat/completions',
        {
          model: 'gpt-3.5-turbo',
          messages: [{ role: 'user', content: prompt }]
        },
        {
          headers: {
            'Authorization': `Bearer YOUR_OPENAI_API_KEY`,
            'Content-Type': 'application/json'
          }
        }
      );

      const reply = response.data.choices[0].message.content;
      await client.sendMessage(m.chat, { text: `🤖 *AI:* ${reply}` }, { quoted: m });

    } catch (e) {
      console.error(e);
      m.reply('⚠️ Error getting AI response.');
    }
  }
};
