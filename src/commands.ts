import { Message } from './messages.js';

export enum Command {
  HAND_SHAKE = 'handshake',
  PLAY = 'play',
  SKIP = 'skip',
  PAUSE = 'pause',
  RESUME = 'resume',
  DISCONNECT = 'disconnect',
  QUEUE = 'queue',
  HELP = 'help',
}

export const COMMANDS_ALIASES: Record<string, Command> = {
  hs: Command.HAND_SHAKE,
  p: Command.PLAY,
  sk: Command.SKIP,
  pa: Command.PAUSE,
  re: Command.RESUME,
  ds: Command.DISCONNECT,
  h: Command.HELP,
  '?': Command.HELP,
  q: Command.QUEUE,
} as const;

export const COMMANDS_DESCRIPTIONS: Record<Command, string> = {
  [Command.HAND_SHAKE]: 'Health check status of the bot.',
  [Command.PLAY]: 'Play a song.',
  [Command.SKIP]: 'Skip the current song.',
  [Command.PAUSE]: 'Pause the current song.',
  [Command.RESUME]: 'Resume the current song.',
  [Command.DISCONNECT]: 'Disconnect the player from the voice channel.',
  [Command.QUEUE]: 'Show queue info.',
  [Command.HELP]: 'Show the help message.',
};

export function getIsCommand(message: Message) {
  return message.content.startsWith('!');
}

function normalizeCommand(command: string) {
  const normalizedCommand = COMMANDS_ALIASES[command];
  return normalizedCommand || (command as Command);
}

export function getCommand(message: Message): Command | null {
  const [_, suffix] = message.content.split('!');

  if (suffix === undefined || suffix === null || suffix === '') {
    return null;
  }
  const [rawCommand, ..._args] = suffix.split(' ');

  if (rawCommand === '' || rawCommand === undefined) {
    return null;
  }

  const command = normalizeCommand(rawCommand);

  return command;
}
