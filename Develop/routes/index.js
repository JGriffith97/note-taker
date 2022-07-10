const express = require('express')
const db = require('express').Router();
const { readFromFile, readAndAppend } = require('../helpers/fsUtils');
const uniqueId = require('../helpers/uniqueId');
const notes = require("../db/notes.json")


db.get('/notes', (req, res) => {
  console.info(`${req.method} request for notes received.`)
  readFromFile('./db/notes.json').then((data) => res.json(JSON.parse(data)))
})

db.get('/notes/:id', (req, res) => {
  if (req.params.id) {
    console.info(`${req.method} request for individual id received.`)
    const noteId = req.params.id;
    for (let i = 0; i < notes.length; i++) {
      const currentNote = notes[i];
      if (currentNote.id === noteId) {
        res.status(200).json(currentNote)
        return
      }
    }
    res.status(404).send('Note not found.')
  } else {
    res.status(400).send('Note id not provided.')
  }
})

db.post('/notes', (req, res) => {
  console.info(`${req.method} request received to submit notes.`)
  console.log(req.body)

  const {title, text} = req.body;

  if (title && text) {
    const newNote = {
      title,
      text,
      id: uniqueId(), 
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

db.delete('/notes/:id', (req, res) => {
  if (req.params.id) {
    console.info(`${req.method} request received!`);
    const noteId = req.params.id;
    for (let i = 0; i < notes.length; i++) {
      const currentNote = notes[i];
      if (currentNote.id === noteId) {
        notes.splice(currentNote)
        res.status(200).send('Note Deleted')
      } 
    }
  }


})

module.exports = db;

// http://localhost:3001/api/notes/47