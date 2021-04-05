import { Message } from 'discord.js'
import * as log from '../lib/console'

export const matcher = ".ping";
export const handle = (m: Message): void => {
    log.debug(`message from ${m.author.username}. sending a pong`);
    m.channel.send(`pong!`);
};
