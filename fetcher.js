const request = require('request');
const fs = require('fs');

const fetcher = function(url, filePath) {
  url = process.argv.slice(2)[0];
  filePath = process.argv.slice(2)[1];
  request(url, (error, body, response) => {
    if (error) {
      console.log(error);
      return;
    }
    let fileName = filePath.split("/").pop();
    let truePath = filePath.replace('/' + fileName, '');
    if (fs.existsSync(truePath)) {
      fs.writeFile(filePath, body.body, () => {
        console.log(`Downloaded and saved ${response.length} bytes to ${filePath}`);
      });
    } else {

      console.log('INVALID FILE PATH');
      return;
    }
  });
};

fetcher();