const { Channel } = require("discord.js");
const dotconfig = require('dotenv').config();
const replace = require('replace-in-file');

module.exports = {
	name: 'setup',
	description: 'setup-command',
	execute(message, firebase, client) {

		const SetupChannel = message.guild.channels.create(`Setup`, {
			type: 'text',
			permissionOverwrites: [
			   {
				 id: message.guild.owner,
				 allow: ['VIEW_CHANNEL'],
			  },
			  {
				id: message.guild.id,
				deny: 'VIEW_CHANNEL'
			  },
			],
		}).then(SetupChannel => 


		SetupChannel.send({
			embed: {
				"type": "rich",
				"color": 3092790,
				"title": "Set-up Configuration",
				"description": "Hello! Thanks for choosing Pegasus as a bot for your server, we will be going to setting-up Pegasus with your server. Please ensure that Pegasus has permission to **change nickname** and **manage roles**. \n\n → Say **next** to proceed\n→ Say **cancel** to cancel",
				footer: {
					"text": "This prompt will automatically cancel in 3 minutes.",
				},
			}              
		}).then(Setup => {
			const filter = m => m.author.id ===  message.author.id;
			Setup.channel.awaitMessages(filter, {
				max: 1,
				time: 180000,
			}).then(async(collected) => {
				if (collected.first().content.toUpperCase() === "cancel".toUpperCase()) {
					SetupChannel.delete()
					return SetupChannel.send("Set-up cancelled")
				}

				if (collected.first().content.toUpperCase() === "next".toUpperCase()) {
					SetupChannel.send({
						embed: {
							"type": "rich",
							"color": 3092790,
							"title": "Firebase Realtime Database",
							"description": "What is your Database ApiKey, AuthDomain and Database Url? Please use the following format:\n\n```apiKey: 'YourApiKey',\nauthDomain: 'YourAuthDomain',\ndatabaseURL: 'YourDatabaseUrl', \nstorageBucket: 'bucket.appspot.com'```\nIf you don't know how to find your credentials then:\n\n**ApiKey:**\n1. Click on Settings, Cloud Messaging, and the press 'Add Server Key' to create a new server API key\n2. Copy the new server API key from the Firebase settings panel to your clipboard and paste it here\n\n**AuthDomain:**\n1. Your AuthDomain is just your project name + .firebaseapp.com (e.g., Pegasus.firebaseapp.com)\n\n**DatabaseURL:**\n 1.You can find your Realtime Database URL in the Realtime Database section of the Firebase console. It will have the form https://<databaseName>.firebaseio.com \n\n→ Say **cancel** to cancel",
							footer: {
								"text": "This prompt will automatically cancel in 10 minutes.",
							},
						}
					}).then(ApiKeySetup => {					
						const filter = m => m.author.id ===  message.author.id;
						SetupChannel.awaitMessages(filter, {
							max: 1,
							time: 180000,
						}).then(async(collected) => {
							if (collected.first().content.toUpperCase() === "cancel".toUpperCase()) {
								SetupChannel.delete()
								return SetupChannel.send("Set-up cancelled")
							}
							const onestring = collected.first().content.split(",")

							const APIKEY = process.env.APIKEY
							const AUTH = process.env.AUTHDOMAIN
							const DATABASEURL = process.env.DATABASEURL

							for(let i = 0;i < onestring.length;i++){
								if (i == 3) {break}
                                const message = onestring[i]
								const args = message.split(' ')
								const message1 = String(args[1].replace(/['"]+/g,''))

								if (i == 0) {
									const options = {files: '.env',from: APIKEY,to: message1,};
								try {
									const results = replace.sync(options);
									SetupChannel.send('Replacement results: Saved APIKEY');
								  }
								  catch (error) {
									console.error('Error occurred:', error);
								  }
								}

								if (i == 1) {
									const options = {files: '.env',from: AUTH,to: message1,};
									try {
										const results = replace.sync(options);
										SetupChannel.send('Replacement results: Saved AUTH');
									  }
									  catch (error) {
										console.error('Error occurred:', error);  
									}									
								}

								if (i == 2) {
									const options = {files: '.env',from: DATABASEURL,to: message1,};
									try {
										const results = replace.sync(options);
										SetupChannel.send('Replacement results: Saved DATABASEURL');
									  }
									  catch (error) {
										console.error('Error occurred:', error);  
									}									
								}
                             }
							 const options = {files: '.env',from: process.env.SETUP,to: "TRUE",};
									try {
										const results = replace.sync(options);
									  }
									  catch (error) {
										console.error('Error occurred:', error);  
									}
							 SetupChannel.send('Setup completed, the bot will automatically shutdown by itself. Please run the bot again for the changes to take place.').then
							 setTimeout(() => {
								SetupChannel.delete()
							}, 2500).then 
							setTimeout(() => {
								process.exit(1)
							}, 2500)
						})
					})					
				}
			})
		})
		)
    }
}