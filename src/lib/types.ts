import { Message } from "discord.js"

export type DocResponse = {
    match: string,
    response: string,
}

export type CommandHandler = {
    match: string,
    handler: (m: Message) => void,
}
