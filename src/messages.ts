import { Message as DiscordMessage } from 'discord.js';

import {
  ALIASES_FOR_COMMANDS,
  COMMANDS_ALIASSES,
  COMMANDS_DESCRIPTIONS,
  Command,
} from './commands.js';

// Dictionary of common messages.
export const MESSAGES = {
  NO_PLAYER_FOUND: 'No player found!',
  UNKNOWN_COMMAND: 'Unknown command, please provide a valid command.',
  EMPTY_QUEUE: 'Queue is empty!',
  VALID_COMMANDS:
    'Valid commands:\n' +
    `${Object.values(Command)
      .map(
        (command) =>
          `!${command}:\n` +
          `${COMMANDS_DESCRIPTIONS[command]}\n` +
          `${ALIASES_FOR_COMMANDS[command] ? 'Aliasses: ' + ALIASES_FOR_COMMANDS[command].map((alias) => `!${alias}`).join(', ') + '.\n' : ''}`,
      )
      .join('\n')}`,
};

type NotNull<T> = {
  [K in keyof T]: NonNullable<T[K]>;
};

export type Message = NotNull<DiscordMessage>;

export function getIsValidDiscordMessage(discordMessage: DiscordMessage) {
  return (
    !discordMessage.author.bot ||
    discordMessage.guild !== null ||
    discordMessage.member !== null
  );
}
