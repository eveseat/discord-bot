import { Client, Message } from "discord.js"
import { Handler } from "./say";
import * as log from './lib/console'

const token = process.env.TOKEN;

if (token === ``) {
  log.error(`no discord token found in env. set \`TOKEN\` bye!`);
  process.exit();
}

const client: Client = new Client();
const handler: Handler = new Handler();

client.on(`ready`, () => {
  log.info(`ready & authenticated as ${client.user?.tag}`);
});

client.on(`message`, (msg: Message) => {
  handler.respond(msg);
});

client.login(token);
