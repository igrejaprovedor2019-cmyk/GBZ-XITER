const { GatewayIntentBits, EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require('discord.js');

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent // 🔥 ESSENCIAL
  ]
});

client.on('messageCreate', async (message) => {

  if (message.author.bot) return;

  if (message.content === '!gbzstar') {

    const embed = new EmbedBuilder()
      .setTitle('🔥😈 Adquira seu Painel ANDROID 😈🔥')
      .setDescription('💎 Clique abaixo para comprar')
      .setImage('https://media.discordapp.net/attachments/1482528899903782932/1484254280088027216/file_000000008530720eb8922a615208f883.png')
      .setColor(0x00ff88);

    const botao = new ButtonBuilder()
      .setCustomId('abrir_ticket')
      .setLabel('Comprar Agora')
      .setStyle(ButtonStyle.Success);

    const row = new ActionRowBuilder().addComponents(botao);

    message.channel.send({
      embeds: [embed],
      components: [row]
    });
  }
});
