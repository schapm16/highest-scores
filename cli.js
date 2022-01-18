const process = require('process');
const path = require('path');

const [ filePathInput, numberOfScoresInput ] = process.argv.slice(2);

let filePath, numberOfScores;

try {
  filePath = (path.isAbsolute(filePathInput)) ? filePathInput : path.resolve(filePathInput);
} catch (error) {
  console.error('Please double check the filepath you entered.');
  process.exit(1);
}

numberOfScores = parseFloat(numberOfScoresInput);
if (!Number.isInteger(numberOfScores)) {
  console.error('Please enter an Integer as the second argument.')
  process.exit(1);
}

module.exports = {
  filePath,
  numberOfScores
}