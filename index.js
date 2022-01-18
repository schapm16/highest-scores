const fs = require('fs');
const path = require('path');

const readAndParseFile = require('./readAndParseFile');

const { filePath, count } = require('./cli');

readAndParseFile(filePath, count).then(data => console.log(data))
