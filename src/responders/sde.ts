import { Message } from 'discord.js'
import * as log from '../lib/console'
import Axios from 'axios'
import cheerio from 'cheerio';
import { CommandHandler } from '../lib/types';

const FUZZWORK = `https://www.fuzzwork.co.uk/dump/?C=N;O=A`;
const SEAT_RESOURCE = `https://raw.githubusercontent.com/eveseat/resources/master/sde.json`;
const ESI_LOOKUP_URI = `https://esi.evetech.net/latest/universe/types/{type_id}/?datasource=tranquility&language=en
`

const commands: CommandHandler[] = [
  {
    match: `.status`,
    handler: (m: Message) => {
      log.debug(`checking fuzzwork.co.uk for sde dumps`);

      Axios.get(FUZZWORK)
        .then(r => {
          const $ = cheerio.load(r.data);
          const links = $('a').filter((_, link) => {
            return link.attribs.href.startsWith(`sde-2`);
          }).last();

          const fuzzwork = links[0].attribs.href.slice(0, -1);

          Axios.get(SEAT_RESOURCE)
            .then(r => {
              const seat_resource = r.data[`version`];

              if (seat_resource == fuzzwork) {
                m.channel.send(`${m.author}, hoory! 🎉 The SDE is up to date in SeAT with version \`${fuzzwork}\``);
                return;
              }

              m.channel.send(`${m.author}, the SeAT SDE might need an update! ` +
                `SeAT has \`${seat_resource}\` and FuzzWork has \`${fuzzwork}\`.`);
            });

        }).catch(e => {
          console.log(`an error occured: ${e}`);
          m.channel.send(`${m.author}, an error occured checking SDE data`);
        });
    }
  },
  {
    match: `.lookup`,
    handler: (m: Message) => {
      const type_id = m.content.replace(`${matcher}.lookup`, ``).trim();
      const url = ESI_LOOKUP_URI.replace(`{type_id}`, type_id);
      console.log(`url: ${url}`);
      Axios.get(ESI_LOOKUP_URI.replace(`{type_id}`, type_id))
        .then(r => {
          console.log(r.data.name);
          m.channel.send(`${m.author}, type \`${type_id}\` has the name \`${r.data.name}\``);
        }).catch(e => {
          console.log(`an error occured: ${e}`);
          m.channel.send(`${m.author}, an error occured doing a type id lookup.`);
        });
    }
  }
];

export const matcher = `.sde`;
export const handle = (m: Message): void => {
  const s = commands.filter(c => {
    if (m.content.includes(c.match)) {
      c.handler(m);
      return true;
    }
    return false;
  }).length;

  if (s > 0) return;
  const valid = commands.map(e => `\`${matcher}${e.match}\``).join(`, `);
  m.channel.send(`${m.author}, available \`${matcher}\` commands are: ${valid}`);
}
