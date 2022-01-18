const process = require('process');
const path = require('path');

const [ filePathInput, countInput ] = process.argv.slice(2);

let filePath, count;

try {
  filePath = (path.isAbsolute(filePathInput)) ? filePathInput : path.resolve(filePathInput);
} catch (error) {
  console.error('Please double check the filepath you entered.');
  process.exit(1);
}

try {
  count = parseFloat(countInput);
  if (!Number.isInteger(count)) {
    throw 'Not an Integer';
  }
} catch (error) {
  console.error('Please enter an Integer as the second argument.')
  process.exit(1);
}

module.exports = {
  filePath,
  count
}