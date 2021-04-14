import { Message } from 'discord.js'
import * as log from '../lib/console'
import Axios from 'axios'
import cheerio from 'cheerio';

const FUZZWORK = `https://www.fuzzwork.co.uk/dump/?C=N;O=A`;
const SEAT_RESOURCE = `https://raw.githubusercontent.com/eveseat/resources/master/sde.json`;

export const matcher = `.sde`;
export const handle = (m: Message): void => {
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
};
