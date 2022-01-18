const readline = require('readline');
const fs = require('fs');

module.exports = function readLineStream(filePath, onLineEventCallback) {
  return new Promise((resolve) => {
    if (!fs.existsSync(filePath)) {
      console.error('Your file could not be found at path:\n', filePath);
      process.exit(1);
    }

    const readlineInstance = readline.createInterface({
      input: fs.createReadStream(filePath),
      output: null
    })
    
    readlineInstance.on('line', onLineEventCallback)

    readlineInstance.on('close', () => {
      resolve();
    })
  })
}
