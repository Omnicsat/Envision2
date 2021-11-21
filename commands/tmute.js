const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('tmute')
		.setDescription('Mutes a user for a specified length of time.')
		.addMentionableOption(option =>
			option.setName('user')
				.setDescription('The user to mute.')
				.setRequired(true))
		.addNumberOption(option =>
			option.setName('timeout')
				.setDescription('The period to mute the user for (in minutes).')
				.setRequired(true))
		.setDefaultPermission(false),
	async execute(interaction) {
		await interaction.deferReply();
		const user = interaction.options.getMentionable('user');
		const timeout = interaction.options.getNumber('timeout');
		const channel = interaction.channel;
		interaction.editReply(`${user} has been muted for ${timeout} minutes!`);

    	let operativeRole = interaction.guild.roles.cache.find(role => role.name === "muted");
    	user.roles.add(operativeRole);

    	setTimeout(function () {
        	user.roles.remove(operativeRole)
            	.then(channel.send(`The mute on ${user} has expired.`));
    	}, timeout * 60000);
    	console.log(`${user.user.tag} was muted by ${interaction.member.user.tag} for ${timeout} minutes.`);
	},

};
