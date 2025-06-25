const { downloadYouTubeVideo } = require('../lib/downloader');

module.exports = {
    name: 'video',
    alias: ['.video', '.mp4'],
    description: 'Download YouTube video as MP4',
    category: 'media',
    run: async ({ sock, msg, args }) => {
        const url = args[0];
        if (!url || !url.startsWith('http')) {
            return sock.sendMessage(msg.key.remoteJid, { text: '📥 Send a valid YouTube URL.\nUsage: `.video <url>`' }, { quoted: msg });
        }

        const data = await downloadYouTubeVideo(url);
        if (!data) return sock.sendMessage(msg.key.remoteJid, { text: '❌ Failed to download' }, { quoted: msg });

        sock.sendMessage(msg.key.remoteJid, {
            video: { url: url },
            caption: data.title
        }, { quoted: msg });
    }
};
