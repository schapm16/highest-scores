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

function partialBubbleSort(array) {
  for (let n = 0; n < numberOfScores; n++) {
    for (let i = array.length - 2; i >= 0; i--) {
      if (array[i].score < array[i + 1].score) {
        const temp = array[i];
        array[i] = array[i + 1];
        array[i + 1] = temp;
      }
    }
  }
  
  return array;
}

readLineStream(filePath, onLineEventCallback).then(() => {
  let scoresArray = Object.values(uniqueScores);
  scoresArray = partialBubbleSort(scoresArray)
    .slice(0, numberOfScores)
    .map(entry => {
      let { score, jsonData } = entry;
      return { score, id: jsonParse(jsonData).id }
    })
    
    console.log(JSON.stringify(scoresArray, null, 2));
})