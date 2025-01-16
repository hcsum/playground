const fs = require('fs');

// The file path and name
const filePath = '/Users/haochen/Downloads/attendee_list.csv';

// Generate the content for each line
let content = '"Name [name]","Email [email]","Job Title [jobTitle]","Organization [organization]","Area Code [areaCode]","Contact Number [contactNo]","City [city]","Country [country]","Should Send SMS [shouldSendSms]","single choice [f49e4730-35e7-44fb-aae8-8d51b1a8871b]","multi choice [e7e8f169-9c8e-4172-aca9-be0dc2b74060]","drop down [3f99282f-c63b-4ef7-994f-28447becf04b]"\n';
const singleChoice = [ 'cat', 'dog' ];
const multiChoice = [ 'apple', 'orange', 'pear' ];
const dropdown = [ 'a', 'b', 'c', 'd', 'e' ];

for (let i = 1001; i <= 1500; i++) {
  const line = `"haochen ${i}","haochen.xu+${i}@eventx.io","Manager","Example Organization","852","12345678","Hong Kong","China","no","${singleChoice[Math.floor(Math.random() * singleChoice.length)]}","${multiChoice.slice(Math.floor(Math.random() * multiChoice.length)).join(';')}","${dropdown[Math.floor(Math.random() * dropdown.length)]}"`;
  content += line + '\n';
}

// Write the content to the file
fs.writeFile(filePath, content, (err) => {
  if (err) {
    console.error('Error writing to file:', err);
    return;
  }
  console.log('File has been written successfully.');
});




