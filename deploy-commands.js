const fs = require('fs');
const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v9');
const { clientId, guildId, token } = require('./config.json');

const commands = [];
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
	const command = require(`./commands/${file}`);
	commands.push(command.data.toJSON());
}

const rest = new REST({ version: '9' }).setToken(token);

(async () => {
	try {
		const response = await rest.put(
			Routes.applicationGuildCommands(clientId, guildId),
			{ body: commands },
		);

		console.log('Successfully registered application commands.');

		const muteCommand = response.find(cmd => cmd.name === 'tmute');

		const fullPermissions = [
			{
				id: muteCommand.id,
				permissions: [
					{
						id: '350744515419570180',
						type: 1,
						permission: true,
					},
				],
			},
		];

		await rest.put(
			Routes.guildApplicationCommandsPermissions(clientId, guildId),
			{ body: fullPermissions },
		);

		console.log('Successfully applied permission overwrites.');
	} catch (error) {
		console.error(error);
	}
})();