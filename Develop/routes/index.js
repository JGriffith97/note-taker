const express = require('express')
const db = require('express').Router();
const { readFromFile, readAndAppend } = require('../helpers/fsUtils');


db.get('/notes', (req, res) => {
  console.info(`${req.method} request for notes received.`)
  readFromFile('./db/notes.json').then((data) => res.json(JSON.parse(data)))
})

db.post('/notes', (req, res) => {
  console.info(`${req.method} request received to submit notes`)
  console.log(req.body)

  const {title, text} = req.body;

  if (title && text) {
    const newNote = {
      title,
      text,
    }

    readAndAppend(newNote, './db/notes.json')

    const response = {
      status: 'success',
      body: newNote,
    };

    res.json(`Note added`)
  } else {
    res.error('Error adding note')
  }
})

module.exports = db;