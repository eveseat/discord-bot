import { Message } from 'discord.js'
import * as log from '../lib/console'
import Axios from 'axios'

const STATUS = `.status`;
const PING = `.ping`;
const commands: string[] = [STATUS, PING];

export const matcher = ".esi";
export const handle = (m: Message): void => {
  log.debug(`message from ${m.author.username}. sending an esi related response`);

  switch (m.content.replace(matcher, ``)) {
    case STATUS: {
      Axios.get(`https://esi.evetech.net/latest/status/?datasource=tranquility`)
        .then(r => {
          m.channel.send(`${m.author}, TQ has \`${r.data.players}\` players, ` +
          `is running on server version ` + `\`${r.data.server_version}\` ` + 
          `and started on \`${r.data.start_time}\``);
        })
        .catch(e => {
          log.error(`failed to call /status endpoint with error: ${e}`);
        })
      break;
    }
    case PING: {
      Axios.get(`https://esi.evetech.net/ping`)
      .then(r => {

        let headers = ``;
        for (const key in r.headers) {
          if (Object.prototype.hasOwnProperty.call(r.headers, key)) {
            const element = r.headers[key];
            headers = headers + `\`${key}\`: \`${element}\`\n`
          }
        }

        const msg = `Response code: \`${r.status} (${r.statusText})\`\n` +
        `Response data: \`${r.data}\`\n` +
        `Response headers: ${headers}`;

        m.channel.send(`${m.author}, ${msg}`);
      })
      .catch(e => {
        log.error(`failed to call /ping endpoint with error: ${e}`);
      })
      break
    }
    default: {
      const valid = commands.map(e => `\`${e}\``).join(`, `);
      m.channel.send(`${m.author}, available \`${matcher}\` commands are: ${valid}`);
    }
  }
};
