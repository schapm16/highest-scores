const readLineStream = require('./readLineStream');
const { filePath, numberOfScores } = require('./cli');
const uniqueScores = {};


/**
 * Parse data file line <score>: <jsonData> and return <score> and <jsonData>
 * @param {String} line
 * @returns {Object}: {score: String, jsonData: String}
 */
function splitLine(line) {
  let lineRegex = line.match(/(?<score>\d+):(?<jsonData>.+)/);

  if (!lineRegex) {
    console.error('The following line in your data file may be malformed:\n', line);
    process.exit(1);
  }

  let { score, jsonData } = lineRegex.groups;

  return { score, jsonData: jsonData.trim() };
}

/**
 * Callback to be passed to ReadLineStream() 'line' event handler
 * This function adds each score's data to the uniqueScores Object
 * @param {String} line
 * @returns {undefined}
 */
function onLineEventCallback(line) {
  let { score, jsonData } = splitLine(line);
  score  = parseInt(score, 10);
  uniqueScores[score] = {
    score,
    jsonData
  }
}

/**
 * Attempt to JSON.parse the provided string and throw the required
 * error if it fails
 * @param {string} data
 * @returns {Object}
 */
function jsonParse(data) {
  try {
    data = JSON.parse(data);
  } catch (error) {
    console.error('Invalid json format No JSON object could be decoded for line:\n', data);
    process.exit(1);
  }

  return data;
}

readLineStream(filePath, onLineEventCallback).then(() => {
  const scoresArray = Object.entries(uniqueScores)
    .sort((a, b) => b[1].score - a[1].score)
    .slice(0, numberOfScores)
    .map(entry => {
      let { score, jsonData } = entry[1];
      return { score, id: jsonParse(jsonData).id }
    })
    
    console.log(JSON.stringify(scoresArray, null, 2));
})