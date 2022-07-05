// Helper file from the weekly activites. Simplifies fs usage.
// Used after consulting with Instructor and Student Success Manager

const fs = require('fs');
// util internal module
const util = require('util')

const readFromFile = util.promisify(fs.readFile);
/**
 *  Function to write data to the JSON file given a destination and some content
 *  @param {string} destination The file you want to write to.
 *  @param {object} content The content you want to write to the file.
 *  @returns {void} Nothing
 */


// Effectively fs.writeFile with the specification to format the stringified content.
const writeToFile = (destination, content) =>
  fs.writeFile(destination, JSON.stringify(content, null, 4), (err) =>
    err ? console.error(err) : console.info(`\nData written to ${destination}`)
  );

/**
 *  Function to read data from a given a file and append some content
 *  @param {object} content The content you want to append to the file.
 *  @param {string} file The path to the file you want to save to.
 *  @returns {void} Nothing
 */

// fs.readFile('path', 'encoding; generally utf-8', 'callback/arrow function')
// fs.writeFile('path', 'data/string or variable', 'callback/arrow function')
// JSON.stringify('object/array to convert', 'replacer; effectively designates what to stringify', 'space; indents the returned string')

const readAndAppend = (content, file) => {
  fs.readFile(file, 'utf8', (err, data) => {
    if (err) {
      console.error(err);
    } else {
      const parsedData = JSON.parse(data);
      parsedData.push(content);
      writeToFile(file, parsedData);
    }
  });
};

module.exports = { readFromFile, writeToFile, readAndAppend };