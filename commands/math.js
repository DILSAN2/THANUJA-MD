module.exports = {
  name: 'math',
  alias: ['quiz', 'mathgame'],
  description: 'Simple math game',
  category: 'game',

  run: async (client, m, args) => {
    const num1 = Math.floor(Math.random() * 50);
    const num2 = Math.floor(Math.random() * 50);
    const answer = num1 + num2;

    await client.sendMessage(m.chat, {
      text: `🧠 *Math Game*\n\nWhat is *${num1} + ${num2}?*\n\nReply with the correct answer!`
    }, { quoted: m });

    // Answer checker (optional - needs session tracking or temporary DB)
    global.mathAnswer = answer;
  }
};
