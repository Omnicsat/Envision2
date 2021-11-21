const nsapi = require("nsapi");
const api = new nsapi.NsApi('Omniabstracta');

const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('map')
		.setDescription('Replies with the latest WFE map.'),
	async execute(interaction) {
		let wfe = api.regionRequest('Kerbin', ['factbook']).then(data => {
        let text = data['factbook'].split('url')[1].split('=')[1].split(']')[0];
        interaction.reply({files: [text]})})
	},
};
