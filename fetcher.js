const request = require('request');
const fs = require('fs');
const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

const args = process.argv.slice(2);
console.log(args[0]);

request(args[0], (error, response, body) => {
  if (error) {
    console.log(`domain not found: ${args[0]}!`);
    rl.close();
  }
  ////print the error if one occurred
  //console.log(`error:`,error);
  ////print the response status code if a response was received
  //console.log(`statusCode:`,response && response.statusCode);
  ////printing HTML for the homepage
  //console.log(`body:`,body);

  let writingFile = (data) => {
    fs.writeFile(args[1], data, (err) => {
      //incorrect file path (does not exist)
      if (err) throw err;
      //No err
      console.log(`The write has been completed to ${args[1]}`);
      rl.close();
    });
  };

  fs.access(args[1], fs.F_OK, (err) => {
    //if it does not exist create one
    if (err) {
      writingFile(body);
    } else {
      //else if the file already exist ask question
      rl.question("Fill already exist, Do you want to overwrite?\nIs it okay? (y) or press any key to exit\n", (answer) => {
        if (answer === 'y') {
          writingFile(body);
        } else {
          rl.close();
        }
      });
    }
  });
});
