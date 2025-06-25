const axios = require('axios');

module.exports = {
  name: 'apk',
  alias: ['apkdl'],
  description: 'APK file download (Google Play link)',
  category: 'downloader',

  run: async (client, m, args) => {
    const query = args.join(' ');
    if (!query) return m.reply('🔍 Pls provide Play Store app name or URL.');

    try {
      let { data } = await axios.get(`https://api.lolhuman.xyz/api/apkmod?apikey=YOUR_API_KEY&query=${encodeURIComponent(query)}`);
      if (!data.result) return m.reply('❌ App not found.');

      let msg = `📱 *${data.result.name}*\n\n📦 Version: ${data.result.version}\n📄 Size: ${data.result.size}\n🔗 Link: ${data.result.link}`;

      await client.sendMessage(m.chat, { text: msg }, { quoted: m });
    } catch (e) {
      m.reply('⚠️ Error fetching APK.');
    }
  }
};
