const fs = require('fs');

const DATA = 
  {
    'email': 'example@test.com',
    'eventId': '95ea8419-a557-4cde-a175-13cb31e8eeac',
    'smtp-id': '<14c5d75ce93.dfd.64b469@ismtpd-555>',
    'event': 'delivered',
    'category': 'cat facts',
    'sg_event_id': 'sg_event_id',
    'sg_message_id': 'sg_message_id',
    'reason': 'something wrong'
  };


// const attendeeIds = [
//   '5e074ce8-a965-4c4d-a03c-26b694d496c4',
//   '19953e1b-4d7d-4693-a58e-d2a73c6d7a2e',
//   '16bf29b6-5ae3-4da7-871a-172d0c33d5cf',
//   '5bfd0355-7a70-4851-942f-82bac9170282',
//   'ea2e69ca-39f0-4a4c-9392-22b40d5ae383',
//   'a48af399-bcc3-429d-ba7f-26b6cb3cbb14',
//   '4534941f-2f2f-4406-8efe-4728b7b7bb38',
//   '0406121f-42b5-454f-b353-adfbdaf4af00',
//   '24c55749-84fe-42c8-ba16-790a006c5efd',
//   'fa4481e4-0dcd-4ebd-aa43-e6d08932690f',
//   '00c41959-c560-4780-8cbd-0bc389f62195',
//   'e81609e3-32b5-452d-b5c4-97c7ddd97883',
//   'd51ec703-dece-4b66-93a8-bc31fb1cef74',
//   '314cb8db-7e12-446d-b331-6af0a3e8a290',
//   '1e5b0d25-d090-4167-90fe-5b385c73e436',
// ];

const attendeeIds = [
  '5e074ce8-a965-4c4d-a03c-26b694d496c4',
  '19953e1b-4d7d-4693-a58e-d2a73c6d7a2e',
  '16bf29b6-5ae3-4da7-871a-172d0c000000',
];


const manualEmailIds = [
  '0319d675-7cf7-417e-8fdf-9820173902fd'
];
const events = [ 'processed', 'dropped', 'delivered', 'deferred', 'bounce', 'click', 'open', 'spamreport' ];

function randomize(item) {
  const updated = { ...item };

  updated.event = events[Math.floor(Math.random() * events.length)];
  updated.timestamp = new Date().getTime() - Math.floor(Math.random() * 10000);
  updated.attendeeId = attendeeIds[Math.floor(Math.random() * attendeeIds.length)];
  updated.outreachManualEmailId = manualEmailIds[Math.floor(Math.random() * manualEmailIds.length)];

  return updated;
}

const folderPath = 'temp/'; 
if (!fs.existsSync(folderPath)) {
  fs.mkdirSync(folderPath);
}

let i = 0;
let string = '';
while (i < 10) {
  string += JSON.stringify(randomize(DATA)) + '\n';
  i++;
}


fs.writeFile(`${folderPath}${new Date().getTime()}_uuid.json`, string, (err) => {
  if (err) {
    console.error(err);
  } else {
    console.log('Data written to file!');
  }
});
