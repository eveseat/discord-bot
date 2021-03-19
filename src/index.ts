import {Client, Message} from "discord.js"

const token: string = process.env.TOKEN;

// todo: lots of stuff kek!

if (token === ``) {
  console.log(`no discord token found in env. bye!`);
  process.exit();
}

const client: Client = new Client();

client.on(`ready`, () => {
  console.log(`authenticated as ${client.user?.tag}`);
});

client.on(`message`, (msg: Message) => {
  if (!msg.content.startsWith(`!`)) {
    return;
  }

  const m = msg.content.substring(1);

  if (m === `ping`) {
    msg.channel.send('pong!');
  }

});

client.login(token);
