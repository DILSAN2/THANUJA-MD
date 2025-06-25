const commands = require('./commands'); // auto-import all command files (modify if needed)
global.guessAnswer = null;

module.exports = async function messageHandler(client, m) {
  try {
    const msg = m.messages[0];
    if (!msg.message) return;

    const from = msg.key.remoteJid;
    const type = Object.keys(msg.message)[0];
    const body = (type === 'conversation')
      ? msg.message.conversation
      : (type === 'extendedTextMessage')
      ? msg.message.extendedTextMessage.text
      : '';

    const isCmd = body.startsWith('.');
    const command = isCmd ? body.slice(1).split(' ')[0].toLowerCase() : '';
    const args = isCmd ? body.trim().split(' ').slice(1) : [];

    // ✅ Guess game answer checker
    if (global.guessAnswer && !isCmd && body === String(global.guessAnswer)) {
      await client.sendMessage(from, {
        text: `✅ Correct! 🎉 The number was ${global.guessAnswer}`
      }, { quoted: msg });
      global.guessAnswer = null;
      return;
    }

    // ✅ Command handler
    if (isCmd && commands[command]) {
      await commands[command].run(client, msg, args);
    }

  } catch (err) {
    console.error('❌ Message Handler Error:', err);
  }
};
