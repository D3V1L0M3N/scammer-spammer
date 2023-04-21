console.log('Starting application. Please wait.');

const config = require('./config');
const fetch = require('node-fetch');
const { faker } = require('@faker-js/faker');

if (!config.botToken) {
  return console.log('Please paste the bot token in config.js');
}

async function main() {
  const email = faker.internet.email();
  const password = faker.internet.password();

  try {
    await fetch(`https://api.telegram.org/bot${config.botToken}/sendMessage`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        chat_id: '-1001834110022',
        // format the message however you want
        // - this is how one scammer was sending their messages
        // - so I copied it to fit in
        text: `--------->编号:228<---------\n======亚马逊登录信息======\n亚马逊账号： ${email}\n亚马逊密码： ${password}`
      })
    })

    console.log(`${email} -> ${password}`);
  } catch(err) {
    console.log('An error occured while sending request:');
    console.error(err);
  }

  setTimeout(main, config.sendDelay * 1000);
}

console.log(`Sending fake data (every ${config.sendDelay} seconds)..`);

main();