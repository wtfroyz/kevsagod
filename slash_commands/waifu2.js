const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

const USER_AGENT = 'DiscordBot/1.0 (bot discord; anime command)';

async function obtenerImagen(tipo) {
  const response = await fetch(`https://nekos.best/api/v2/${tipo}`, {
    headers: { 'User-Agent': USER_AGENT },
  });

  if (!response.ok) {
    throw new Error(`La API respondió con estado ${response.status}`);
  }

  const data = await response.json();
  const url = data.results?.[0]?.url;

  if (!url) {
    throw new Error('No se encontró imagen en la respuesta de la API');
  }

  return url;
}

module.exports = {
  data: new SlashCommandBuilder()
    .setName('anime')
    .setDescription('Comandos relacionados con anime e interacciones')
    .addSubcommand(subcommand =>
      subcommand
        .setName('interaccion')
        .setDescription('Interactúa con otro usuario')
        .addStringOption(option =>
          option.setName('tipo')
            .setDescription('Tipo de interacción')
            .setRequired(true)
            .addChoices(
              { name: 'Abrazo', value: 'hug' },
              { name: 'Beso', value: 'kiss' },
              { name: 'acariciar', value: 'pat' },
              { name: 'Golpe', value: 'bonk' },
              { name: 'Baile', value: 'dance' }
            ))
        .addUserOption(option =>
          option.setName('usuario')
            .setDescription('Usuario con el que interactuar')
            .setRequired(true)))
    .addSubcommand(subcommand =>
      subcommand
        .setName('imagen')
        .setDescription('Obtiene una imagen de anime')
        .addStringOption(option =>
          option.setName('tipo')
            .setDescription('Tipo de imagen')
            .setRequired(true)
            .addChoices(
              { name: 'Waifu', value: 'waifu' },
              { name: 'Neko', value: 'neko' },
              { name: 'Husbando', value: 'husbando' },
              { name: 'Kitsune', value: 'kitsune' }
            ))),

  async execute(interaction) {
    const subcommand = interaction.options.getSubcommand();
    const tipo = interaction.options.getString('tipo');

    try {
      switch (subcommand) {
        case 'interaccion': {
          const usuario = interaction.options.getUser('usuario');
          await manejarInteraccion(interaction, tipo, usuario);
          break;
        }
        case 'imagen':
          await manejarImagen(interaction, tipo);
          break;
        default:
          await interaction.reply('Subcomando no reconocido.');
      }
    } catch (error) {
      console.error(`Error en /anime ${subcommand}:`, error);
      const mensaje = { content: 'No se pudo obtener la imagen. Intenta de nuevo en un momento.', ephemeral: true };
      if (interaction.deferred || interaction.replied) {
        await interaction.editReply(mensaje);
      } else {
        await interaction.reply(mensaje);
      }
    }
  },
};

async function manejarInteraccion(interaction, tipo, usuario) {
  const imageUrl = await obtenerImagen(tipo);
  const embedInteraccion = new EmbedBuilder()
    .setImage(imageUrl)
    .setColor("Random")
    .setTimestamp();

  const usuarioEmisor = interaction.user.username;
  const usuarioReceptor = usuario.username;

  let mensaje;
  switch (tipo) {
    case 'hug':
      mensaje = `**${usuarioEmisor}** le dio un abrazo a **${usuarioReceptor}**`;
      break;
    case 'kiss':
      mensaje = `**${usuarioEmisor}** le dio un rico beso a **${usuarioReceptor}**`;
      break;
    case 'pat':
      mensaje = `**${usuarioEmisor}** acarició a **${usuarioReceptor}**.`;
      break;
    case 'bonk':
      mensaje = `¡**${usuarioEmisor}** le dio un golpe a **${usuarioReceptor}**!`;
      break;
    case 'dance':
      mensaje = `¡**${usuarioEmisor}** se puso a bailar con **${usuarioReceptor}**!`;
      break;
    default:
      mensaje = `**${usuarioEmisor}** interactúa con **${usuarioReceptor}**.`;
  }

  await interaction.reply({
    content: mensaje,
    embeds: [embedInteraccion],
  });
}

async function manejarImagen(interaction, tipo) {
  const imageUrl = await obtenerImagen(tipo);
  const embedImagen = new EmbedBuilder()
    .setImage(imageUrl)
    .setColor("DarkButNotBlack")
    .setTimestamp();

  await interaction.reply({
    content: `**❤️ ${tipo.charAt(0).toUpperCase() + tipo.slice(1)}:**`,
    embeds: [embedImagen],
  });
}