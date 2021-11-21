const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('thread')
		.setDescription('Provides a link to the RP thread.'),
	async execute(interaction) {
		await interaction.reply('https://forum.nationstates.net/viewtopic.php?f=5&t=389880&view=unread#unread');
	},
};
