const process = require('process');
const path = require('path');

const [ filePathInput, lineCountInput ] = process.argv.slice(2);

let filePath, lineCount;

try {
  filePath = (path.isAbsolute(filePathInput)) ? filePathInput : path.resolve(filePathInput);
} catch (error) {
  console.error('Please double check the filepath you entered.');
  process.exit(1);
}

try {
  lineCount = parseFloat(lineCountInput);
  if (!Number.isInteger(lineCount)) {
    throw 'Not an Integer';
  }
} catch (error) {
  console.error('Please enter an Integer as the second argument.')
  process.exit(1);
}

module.exports = {
  filePath,
  lineCount
}