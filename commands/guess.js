module.exports = {
  name: 'guess',
  alias: ['numbergame'],
  description: 'Guess the number (1-10)',
  category: 'game',

  run: async (client, m, args) => {
    const number = Math.floor(Math.random() * 10) + 1;

    await client.sendMessage(m.chat, {
      text: `🎲 *Guessing Game!*\n\nI'm thinking of a number between *1 and 10*.\nCan you guess it? Reply now!`
    }, { quoted: m });

    global.guessAnswer = number;
  }
};
