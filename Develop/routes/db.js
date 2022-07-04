const db = require('express').Router();
const { readFromFile, readAndAppend } = require('../helpers/fsUtils');

db.get('/', (req, res) => {
  console.info(`${req.method} request for notes received.`)

  readFromFile('../db/db.json').then((data) => res.json(JSON.parse(data)))
})

db.post('/', (req, res) => {
  console.info(`${req.method} request received to submit notes`)

  const {title, text} = req.body;

  if (title && text) {
    const newNote = {
      title,
      text,
    }

    readAndAppend(newNote, '../db/db.json')

    const resp = {
      status: 'success',
      body: newNote,
    }

    res.json(resp)
  } else {
    res.json('Error')
  }
})

module.exports = db