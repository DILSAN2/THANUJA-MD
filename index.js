const { default: makeWASocket, useMultiFileAuthState } = require('@whiskeysockets/baileys');
const fs = require('fs');
const P = require('pino');

async function startBot() {
  const { state, saveCreds } = await useMultiFileAuthState('auth_info_baileys');
  const sock = makeWASocket({
    logger: P({ level: 'silent' }),
    auth: state,
    printQRInTerminal: true
  });

  sock.ev.on('creds.update', saveCreds);

  // ✅ Command Loader
  const commands = {};
  for (let file of fs.readdirSync('./commands')) {
    let cmd = require(`./commands/${file}`);
    commands[cmd.name] = cmd;
    if (cmd.alias && Array.isArray(cmd.alias)) {
      for (let alias of cmd.alias) commands[alias] = cmd;
    }
  }

  // ✅ Message Handler
  sock.ev.on('messages.upsert', async ({ messages }) => {
    const msg = messages[0];
    if (!msg.message || msg.key.fromMe) return;

    const messageType = Object.keys(msg.message)[0];
    const messageContent = msg.message[messageType]?.text || msg.message.conversation || "";
    const input = messageContent.trim().split(' ')[0];
    const args = messageContent.trim().split(' ').slice(1);

    if (commands[input]) {
      try {
        await commands[input].run({ sock, msg, args });
      } catch (e) {
        console.error("Command error:", e);
      }
    }
  });
}

startBot();
