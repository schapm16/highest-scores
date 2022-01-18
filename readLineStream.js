const readline = require('readline');
const fs = require('fs');

/**
 * Takes a file path of a file to create a ReadLine interface for and a callback
 * that is invoked on each 'line' event. Returns a Promise that resolves when the
 * file ReadableStream is closed.
 * @param {String} filePath
 * @param {Function} onLineEventCallback
 * @returns {Promise}
 */
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
