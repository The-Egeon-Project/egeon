import { Message as DiscordMessage } from 'discord.js';

import { COMMANDS_DESCRIPTIONS, Command } from './commands.js';

// Dictionary of common messages.
export const MESSAGES = {
  NO_PLAYER_FOUND: 'No player found!',
  UNKNOWN_COMMAND: 'Unknown command, please provide a valid command.',
  EMPTY_QUEUE: 'Queue is empty!',
  VALID_COMMANDS: `Valid commands:\n ${Object.values(Command)
    .map((command) => `!${command} - ${COMMANDS_DESCRIPTIONS[command]}`)
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
