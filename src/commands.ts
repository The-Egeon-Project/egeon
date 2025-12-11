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

export const COMMANDS_ALIASSES: Record<string, Command> = {
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

const keys = Object.values(COMMANDS_ALIASSES);

export const ALIASES_FOR_COMMANDS = keys.reduce(
  (acc, key) => {
    const aliasses = Object.entries(COMMANDS_ALIASSES)
      .map(([alias, value]) => (value === key ? alias : null))
      .filter((alias) => alias !== null);

    acc[key] = aliasses;

    return acc;
  },
  {} as Record<string, string[]>,
);

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
  const normalizedCommand = COMMANDS_ALIASSES[command];
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
