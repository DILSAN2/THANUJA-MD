const { downloadYouTubeAudio } = require('../lib/downloader');
const fs = require('fs');

module.exports = {
    name: 'song',
    alias: ['.song', '.mp3'],
    description: 'Download YouTube audio as MP3',
    category: 'media',
    run: async ({ sock, msg, args }) => {
        const url = args[0];
        if (!url || !url.startsWith('http')) {
            return sock.sendMessage(msg.key.remoteJid, { text: '📥 Send a valid YouTube URL.\nUsage: `.song <url>`' }, { quoted: msg });
        }

        const data = await downloadYouTubeAudio(url);
        if (!data) return sock.sendMessage(msg.key.remoteJid, { text: '❌ Failed to download' }, { quoted: msg });

        sock.sendMessage(msg.key.remoteJid, {
            audio: { url: url },
            mimetype: 'audio/mp4',
            fileName: `${data.title}.mp3`
        }, { quoted: msg });
    }
};
