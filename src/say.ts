import { Message } from "discord.js"
import { IHandle } from "./lib/interfaces"
import * as log from './lib/console'

import * as ping from './responders/ping'
import * as doc from './responders/doc'
import * as esi from './responders/esi'
import * as sde from './responders/sde'

export class Handler {

  handlers: IHandle[] = [];

  constructor() {
    this.handlers.push({matcher: ping.matcher, handle: ping.handle}); // bot ping
    this.handlers.push({matcher: doc.matcher, handle: doc.handle}); // documentation
    this.handlers.push({matcher: esi.matcher, handle: esi.handle}); // esi
    this.handlers.push({matcher: sde.matcher, handle: sde.handle}); // sde
  }

  respond(m: Message): void {
    if (m.author.bot) return;  // ignore the bot itself
    if (!m.content.startsWith(`.`)) return; // ignore non-bot messages

    if (m.content == `.`) {
      const c = this.handlers.map(e => `\`${e.matcher}\``).join(`, `);
      m.channel.send(`${m.author}, available bot commands: ${c}`);
      return
    }

    log.info(`handling message: ${m.content}`);

    this.handlers.every(h => {
      log.debug(`checking message stars with ${h.matcher}`);
      if (!m.content.startsWith(h.matcher)) return true;
      h.handle(m);

      return false;
    });
  }
}
