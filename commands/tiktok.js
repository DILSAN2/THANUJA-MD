const axios = require('axios');

module.exports = {
  name: 'tiktok',
  alias: ['tt'],
  description: 'TikTok no-watermark video download',
  category: 'downloader',

  run: async (client, m, args) => {
    const url = args[0];
    if (!url || !url.includes('tiktok.com')) return m.reply('📎 Provide a valid TikTok URL.');

    try {
      const { data } = await axios.get(`https://api.lolhuman.xyz/api/tiktok?apikey=YOUR_API_KEY&url=${url}`);
      const video = data.result.link;

      await client.sendMessage(m.chat, { video: { url: video }, caption: '📥 TikTok Video (No Watermark)' }, { quoted: m });
    } catch (e) {
      m.reply('⚠️ TikTok download failed.');
    }
  }
};
