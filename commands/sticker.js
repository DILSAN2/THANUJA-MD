const { writeFileSync, unlinkSync } = require('fs');
const path = require('path');
const { tmpdir } = require('os');
const { fromBuffer } = require('file-type');
const { getBuffer } = require('../lib/myfunc');
const { Sticker, StickerTypes } = require('wa-sticker-formatter');

module.exports = {
    name: 'sticker',
    alias: ['.sticker', '.st'],
    description: 'Convert image/video to sticker',
    category: 'fun',
    run: async ({ sock, msg }) => {
        const quoted = msg.message.extendedTextMessage?.contextInfo?.quotedMessage;

        if (!quoted) {
            return sock.sendMessage(msg.key.remoteJid, { text: '📌 Reply to an image or video with .sticker' }, { quoted: msg });
        }

        let mime;
        if (quoted.imageMessage) mime = 'image';
        else if (quoted.videoMessage) mime = 'video';
        else return sock.sendMessage(msg.key.remoteJid, { text: '⚠️ Only image or video supported!' }, { quoted: msg });

        const messageKey = msg.message.extendedTextMessage.contextInfo.stanzaId;
        const participant = msg.message.extendedTextMessage.contextInfo.participant;
        const quotedMsg = await sock.loadMessage(msg.key.remoteJid, messageKey);

        const buffer = await sock.downloadMediaMessage(quotedMsg);
        if (!buffer) return sock.sendMessage(msg.key.remoteJid, { text: '❌ Failed to download media' }, { quoted: msg });

        try {
            const sticker = new Sticker(buffer, {
                type: StickerTypes.FULL,
                pack: 'THANUJA-MD',
                author: 'Thanuja',
                quality: 70
            });

            const stickerBuffer = await sticker.toBuffer();
            await sock.sendMessage(msg.key.remoteJid, { sticker: stickerBuffer }, { quoted: msg });
        } catch (err) {
            console.error(err);
            sock.sendMessage(msg.key.remoteJid, { text: '❌ Error converting to sticker' }, { quoted: msg });
        }
    }
};
