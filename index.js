const { 
  Client, 
  GatewayIntentBits, 
  EmbedBuilder, 
  ActionRowBuilder, 
  ButtonBuilder, 
  ButtonStyle,
  StringSelectMenuBuilder,
  ChannelType,
  PermissionsBitField
} = require('discord.js');

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent
  ]
});

// BOT ONLINE
client.once('clientReady', () => {
  console.log(`🔥 Bot online como ${client.user.tag}`);
});

// COMANDO !gbzstar
client.on('messageCreate', async (message) => {

  if (message.author.bot) return;

  if (message.content === '!gbzstar') {

    const embed = new EmbedBuilder()
      .setTitle('🔥😈 Adquira seu Painel FFH4X ANDROID 😈🔥')
      .setDescription(`
🔥😈 **Adquira Já seu Painel FFH4X ANDROID** 😈🔥  

🔥 **FFH4X RAGE ANDROID!**  

Se você quer xitar com qualidade e ter resultado, o nosso painel foi feito pra você.  

💎 Produto desenvolvido para entregar eficiência máxima e uma experiência diferenciada.  

🔥 **O que ele tem?**  
• Aimbot Full - Configurável  
• ESPs Full - Configurável  
• AimBot - Configurável  
• Puxa para cabeça, pescoço e peito  

💥 **Diferenciais**  
• Funciona em todas versões do Android 🚀  
• Tutorial e suporte para instalação  

🎮 **Ideal para quem quer:**  
• Jogar AP ✅  
• Jogar modo rank ✅  
• Jogar CS rank ✅  

📥 **O que você recebe:**  
• Uma Key no privado  
• Acesso a canais de tutorial e download  

🚨 Painel Rage, ou seja, há risco de blacklist  

📦 Entrega rápida no privado  
📲 Suporte antes da compra  

😈🔥 **Não perde tempo… garante o seu agora!** 🔥😈
      `)
      .setImage('https://media.discordapp.net/attachments/1482528899903782932/1484254280088027216/file_000000008530720eb8922a615208f883.png')
      .setColor(0x00ff88)
      .setFooter({ text: 'GBZ STORE 🔥' });

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

// INTERAÇÕES
client.on('interactionCreate', async (interaction) => {

  // BOTÃO
  if (interaction.isButton() && interaction.customId === 'abrir_ticket') {

    const select = new StringSelectMenuBuilder()
      .setCustomId('produto')
      .setPlaceholder('Escolha seu plano')
      .addOptions([
        { label: 'Android - 1 dia', description: 'R$17,90', value: '17.90' },
        { label: 'Android - 7 dias', description: 'R$25,90', value: '25.90' },
        { label: 'Android - 10 dias', description: 'R$35,90', value: '35.90' },
        { label: 'Android - 30 dias', description: 'R$55,90', value: '55.90' }
      ]);

    return interaction.reply({
      content: '📦 Escolha seu plano:',
      components: [new ActionRowBuilder().addComponents(select)],
      ephemeral: true
    });
  }

  // CRIAR TICKET
  if (interaction.isStringSelectMenu()) {

    const valor = interaction.values[0];

    const canal = await interaction.guild.channels.create({
      name: `ticket-${interaction.user.username}`,
      type: ChannelType.GuildText,
      permissionOverwrites: [
        {
          id: interaction.guild.id,
          deny: [PermissionsBitField.Flags.ViewChannel]
        },
        {
          id: interaction.user.id,
          allow: [PermissionsBitField.Flags.ViewChannel]
        }
      ]
    });

    const botaoConfirmar = new ButtonBuilder()
      .setCustomId('confirmar_pagamento')
      .setLabel('Confirmar Pagamento')
      .setStyle(ButtonStyle.Success);

    const row = new ActionRowBuilder().addComponents(botaoConfirmar);

    const embedPix = new EmbedBuilder()
      .setTitle('💰 Pagamento via PIX')
      .setDescription(`
💵 Valor: R$${valor}

📲 Chave PIX:
${process.env.PIX}

📌 Após pagar, aguarde confirmação do dono
      `)
      .setImage('https://media.discordapp.net/attachments/1482528899903782932/1484254280088027216/file_000000008530720eb8922a615208f883.png')
      .setColor(0x00ff88);

    await canal.send({
      content: `🎟️ Ticket de ${interaction.user}`,
      embeds: [embedPix],
      components: [row]
    });

    return interaction.reply({
      content: `✅ Ticket criado: ${canal}`,
      ephemeral: true
    });
  }

  // CONFIRMAR PAGAMENTO
  if (interaction.isButton() && interaction.customId === 'confirmar_pagamento') {

    if (interaction.user.id !== process.env.DONO_ID) {
      return interaction.reply({
        content: '❌ Apenas o dono pode confirmar!',
        ephemeral: true
      });
    }

    await interaction.channel.send(`
✅ Pagamento confirmado!

📦 Envie a key ao cliente no privado.
🎉 Obrigado pela compra!
    `);

    await interaction.reply({
      content: '✔️ Confirmado!',
      ephemeral: true
    });
  }

});

// LOGIN
client.login(process.env.TOKEN);
