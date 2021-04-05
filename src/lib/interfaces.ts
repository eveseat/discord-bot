import { Message } from 'discord.js'

export interface IHandle {
    matcher: string,
    handle(m: Message): void,
}
