const axios = require('axios');

module.exports = {
  name: 'fb',
  alias: ['facebook'],
  description: 'Facebook video download',
  category: 'downloader',

  run: async (client, m, args) => {
    const url = args[0];
    if (!url || !url.includes('facebook.com')) return m.reply('📎 Provide a valid Facebook video URL.');

    try {
      const { data } = await axios.get(`https://api.lolhuman.xyz/api/facebook?apikey=YOUR_API_KEY&url=${url}`);
      const videoUrl = data.result.link;

      await client.sendMessage(m.chat, { video: { url: videoUrl }, caption: '📥 Facebook Video Downloaded' }, { quoted: m });
    } catch (e) {
      m.reply('⚠️ Facebook video download failed.');
    }
  }
};
