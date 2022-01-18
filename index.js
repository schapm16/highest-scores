const fs = require('fs');
const path = require('path');

const readAndParseFile = require('./readAndParseFile');

const { filePath, lineCount } = require('./cli');

readAndParseFile(filePath, lineCount).then(data => console.log(data))
