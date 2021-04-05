import { Message } from 'discord.js'
import { DocResponse } from '../lib/types';
import * as log from '../lib/console'

const docs: DocResponse[] = [
  {
    match: `.upgrade`,
    response: `Bare Metal / VM Installation Instructions: https://eveseat.github.io/docs/upgrading/from_seat_3_0/bare_metal/ 
        Docker Installation Instructions: https://eveseat.github.io/docs/upgrading/from_seat_3_0/docker/`
  },
  {
    match: `.moons`,
    response: `https://eveseat.github.io/docs/user_guides/moons_reporter/`
  },
  {
    match: `.squads`,
    response: `https://eveseat.github.io/docs/admin_guides/squads/`
  },
  {
    match: `.donate`,
    response: `https://github.com/eveseat/seat#donate`
  },
  {
    match: `.troubleshooting`,
    response: `https://eveseat.github.io/docs/troubleshooting/`
  },
  {
    match: `.requirements`,
    response: `https://eveseat.github.io/docs/installation/requirements/`
  },
  {
    match: `.bugs`,
    response: `https://eveseat.github.io/docs/about/reporting_bugs/`
  },
  {
    match: `.help`,
    response: `Just ask, but first read the docs: https://eveseat.github.io/docs`
  },
  {
    match: `.auth`,
    response: `https://eveseat.github.io/docs/admin_guides/authorizations/`
  },
  {
    match: `.email`,
    response: `https://eveseat.github.io/docs/configuration/email_setup/mailgun/ & https://eveseat.github.io/docs/configuration/email_setup/gmail/`
  },
  {
    match: `.plugins`,
    response: `https://eveseat.github.io/docs/community_packages/`
  },
  {
    match: `.sso`,
    response: `https://eveseat.github.io/docs/configuration/esi_configuration/`
  }
]

export const matcher = ".docs";
export const handle = (m: Message): void => {
  log.debug(`message from ${m.author.username}. sending a doc related response`);

  const nomatch = docs.every(d => {
    log.debug(`checking if ${m.content} matches ${matcher}${d.match}`);

    if (!m.content.startsWith(`${matcher}${d.match}`)) return true;
    m.channel.send(`${m.author}, ${d.response}`);
    return false;
  });

  if (nomatch) {
    const valid = docs.map(e => `\`${matcher}${e.match}\``).join(`, `);
    m.channel.send(`${m.author}, available \`${matcher}\` commands are: ${valid}`);
  }
};
