import { YtDlpPlugin } from '@distube/yt-dlp';
import { Client, GatewayIntentBits } from 'discord.js';
import { DisTube } from 'distube';
import 'dotenv/config';

const PLAY_COMMANDS = ['!play', '!p'];
const STOP_COMMANDS = ['stop', 's'];
const SKIP_COMMANDS = ['skip', 's'];
const PAUSE_COMMANDS = ['pause', 'p'];
const RESUME_COMMANDS = ['resume', 'r'];
const QUEUE_COMMANDS = ['queue', 'q'];

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildVoiceStates,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
  ],
});

const ytPlugin = new YtDlpPlugin({ update: true });
const distube = new DisTube(client, { plugins: [ytPlugin] });

client.on('clientReady', () => {
  console.log(`Bot logged in as ${client.user?.tag}`);
});

client.on('messageCreate', (message) => {
  if (!message.guild || !message.member || message.author.bot) {
    console.log('No guild or member');
    return;
  }

  const args = message.content.split(' ');
  const command = args.shift()?.toLowerCase();

  if (!command) {
    console.log('No command');
    return message.reply('Please provide a valid command.');
  }

  if (command === '!wallop') {
    return message.reply('Hello World!');
  }

  if (PLAY_COMMANDS.includes(command)) {
    const query = args.join(' ');

    if (!query) {
      return message.reply('Please provide a search query or URL.');
    }

    const voiceChannel = message.member.voice.channel;

    if (!voiceChannel) {
      return message.reply('You must be in a voice channel to play music.');
    }

    distube
      .play(voiceChannel, query, {
        message,
        member: message.member,
        textChannel: message.channel as any,
      })
      .catch((err) => {
        console.error('Error playing song:', err);

        return message.reply(err.message);
      });
  }
});

client.login(process.env.DISCORD_TOKEN);

const shutdown = () => {
  console.log('\nShutting down bot...');
  client.destroy();
  process.exit(0);
};

// Graceful shutdown
process.on('SIGINT', shutdown);
process.on('SIGTERM', shutdown);
