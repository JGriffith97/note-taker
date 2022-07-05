const db = require('express').Router();
const { readFromFile, readAndAppend } = require('../helpers/fsUtils');
const notes = require('../db/notes.json')

db.get('/', (req, res) => {
  console.info(`${req.method} request for notes received.`)

  readFromFile('../db/notes.json').then((data) => res.json(JSON.parse(data)))
})

db.post('/', (req, res) => {
  console.info(`${req.method} request received to submit notes`)
  console.log(req.body)

  const {title, text} = req.body;

  if (req.body) {
    const newNote = {
      title,
      text,
    }

    readAndAppend(newNote, '../db/notes.json')
    res.json(`Note added`)
  } else {
    res.error('Error adding note')
  }
})

module.exports = db