const {
  ChatInputCommandInteraction,
  SlashCommandBuilder,
  EmbedBuilder,
  PermissionFlagsBits,
} = require("discord.js");
// const config = require("../../Config/config.json")
module.exports = {
  developer: true,
  data: new SlashCommandBuilder()
    .setName("reglas")
    .setDescription("Te mostrare todas las reglas")
    .setDefaultMemberPermissions(PermissionFlagsBits.Administrator),
  /**
   *
   * @param {ChatInputCommandInteraction} interaction
   */
  async execute(interaction, client) {
    const embed = new EmbedBuilder()
      .setColor("Red")
      .setTitle(`> Reglas del Servidor`)
      // .setThumbnail(interaction.guild.iconURL({ dynamic: true }))
      // .setImage(config.banner)
      .setDescription(
        `> **Aqui tienes el listado de reglas del servidor**\n\n> **Es muy importante que tengas conocimiento de estas para tenes una buena estadia y convivencia en el servidor.**`
      )
      .addFields(
        {
          name: `1.- Uso correcto de canales.`,
          value:
            "`Usar los canales de texto y voz como es debido, al igual que solo usar los bots en sus respectivos canales. (Los comandos de interacción de Nekotina pueden ser usados en el canal de General)`",
        },
        {
          name: `2.- Respeto entre miembros.`,
          value:
            "`Respetar a todas las personas que se encuentran en el servidor, nada de comentarios xenofóbicos, racistas, tampoco colocarse en el nombre algo inapropiado, de igual manera el acoso está totalmente prohibido y será sancionado.`",
        },
        {
          name: `3.- Contenido explícito prohibido.`,
          value:
            "`No publicar nada explicito (NSFW/GORE), o sea contenido sexual o sangriento en ninguno de los canales de texto.`",
        },
        {
          name: `4.- Bots de música.`,
          value:
            "`Los bots actuales de música son @Nekotina y @Jockie Music (1), estos bots solo pueden ser usados en el canal de música o en los chats de los respectivos canales de voz.`",
        },
        {
          name: `5.- Canales temáticos.`,
          value:
            "`Evitar hablar en el canal de texto Memes ya que solo es para mandar imágenes / vídeos de memes, asimismo, en Fan-art solo van imágenes de dibujos para KevSa, en Arte es arte en general; videos, edits, fotografía, dibujos, música, etc, cualquiera otra cosa que no sea arte será borrada y sancionada.`",
        },
        {
          name: `6.- Menciones masivas.`,
          value:
            "`Evitar menciones masivas y/o menciones a los miembros del staff sin motivo alguno, esto será sancionado.`",
        },
        {
          name: `7.- Spam y flood.`,
          value:
            "`Flood: No hacer flood (Más de 5 líneas para todos y máximo 8 líneas para boosters).\nSímbolos: Tampoco mandar imágenes hechas de puntos/texto/emojis.\nEmotes: Por el momento solo se puede usar un límite de 5 emotes por mensaje.\nSpam: No enviar invitaciones de otros servidores de discord O CUALQUIER OTRO LINK, spam de canales de Twitch, Youtube u otra red social solo se permitirá en el canal de Promociónate, NO ABUSAR DE ESTO.`",
        },
        {
          name: `8.- Multicuentas.`,
          value: "`Multicuentas completamente prohibidas.`",
        },
        {
          name: `9.- Rangos de moderación.`,
          value: "`No incitar o pedir cualquier rango de moderación.`",
        },
        {
          name: `10.- Información personal.`,
          value:
            "`No revelar información personal de NINGÚN USUARIO, información personal contiene NOMBRES, NÚMEROS, UBICACIONES Y FOTOS DE OTRAS PERSONAS.`",
        },
        {
          name: `11.- Subida de mods.`,
          value:
            "`Para poder subir MODS en el canal de Mod-FnF tendrás que abrir un ticket en Tickets para que el staff pueda comprobar el origen del link.`",
        },
        {
          name: `Reportes y dudas`,
          value:
            "`Si alguien del servidor no cumple con cualquiera de estas reglas, puedes comunicarte con alguien del staff o abrir ticket, de igual manera puedes abrir ticket si tienes alguna duda sobre el servidor. Está totalmente prohibido abrir ticket innecesario, esto es sancionable.`",
        }
      )
      .setFooter({
        text: `En este servidor respetamos los ToS de Discord https://discord.com/terms`,
      });

    await interaction.reply({ embeds: [embed] });
  },
};