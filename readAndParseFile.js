const readline = require('readline');
const fs = require('fs');

function parseLine(line) {
  let lineRegex = line.match(/(?<score>\d+):(?<jsonData>.+)/);

  if (!lineRegex) {
    console.error('The following line in your data file may be malformed:\n', line);
    process.exit(1);
  }

  let { score, jsonData } = lineRegex.groups;

  try {
    jsonData = JSON.parse(jsonData.trim());
  } catch (error) {
    console.error('Invalid json format No JSON object could be decoded for line:\n', line);
    process.exit(1);
  }

  return { score, id: jsonData.id };
}

module.exports = function readAndParseFile(filePath, desiredLineCount) {
  return new Promise((resolve) => {
    const parsedResults = [];
    
    if (!fs.existsSync(filePath)) {
      throw new Error('Your file could not be found.');
    }

    const readlineInstance = readline.createInterface({
      input: fs.createReadStream(filePath),
      output: null
    })
    
    readlineInstance.on('line', (line) => {
      if (parsedResults.length >= desiredLineCount) {
        readlineInstance.close();
      } else {
        const parsedLine = parseLine(line);
        parsedResults.push(parsedLine);
      }
    })

    readlineInstance.on('close', () => {
      resolve(parsedResults);
    })
  })
}
