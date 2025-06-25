// commands/img.js
const axios = require('axios');

module.exports = {
    name: 'img',
    alias: ['.img', '.image'],
    description: 'Get a random image from API',
    category: 'fun',
    run: async ({ sock, msg }) => {
        const res = await axios.get('https://picsum.photos/200/300', { responseType: 'arraybuffer' });
        await sock.sendMessage(msg.key.remoteJid, { image: res.data, caption: '🖼 Random Image' }, { quoted: msg });
    }
};
