import { Message, MessageEmbed } from 'discord.js'
import * as log from '../lib/console'

const seatdocker = `https://img.shields.io/docker/v/eveseat/seat`
const api = `https://img.shields.io/github/v/release/eveseat/api`
const console = `https://img.shields.io/github/v/release/eveseat/console`
const eveapi = `https://img.shields.io/github/v/release/eveseat/eveapi`
const notifications = `https://img.shields.io/github/v/release/eveseat/notifications`
const services = `https://img.shields.io/github/v/release/eveseat/services`
const web = `https://img.shields.io/github/v/release/eveseat/web`

export const matcher = `.seat`
export const handle = (m: Message): void => {
    log.debug(`message from ${m.author.username}. sending a seat related response`);

    const mEmbed = new MessageEmbed()
        .setColor('#0099ff')
        .setTitle('Current SeAT Package Versions')
        .addFields(
            { name: 'Seat Docker Image', value: `${seatdocker}`},
            { name: 'API', value: `${api}`},
            { name: 'Console', value: `Depreciated: ${console}`},
            { name: 'EveAPI', value: `${eveapi}`},
            { name: 'Notifications', value: `${notifications}`},
            { name: 'Services', value: `${services}`},
            { name: 'Web', value: `${web}`}
            );
    m.channel.send( { content: `${m.author}`, embeds: [mEmbed] });
};