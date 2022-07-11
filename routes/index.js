const express = require('express')
const db = require('express').Router();
const { readFromFile, readAndAppend } = require('../helpers/fsUtils');
const uniqueId = require('../helpers/uniqueId');
const fs = require('fs');


// Get request for reading the notes.json file and adding it's content as notes to the page.
db.get('/notes', (req, res) => {
  console.info(`${req.method} request for notes received.`)
  fs.readFile("./db/notes.json", 'utf-8', (err, data) => {
    if (err) {
      console.log(err)
      return
    }
    let notes = data;
    res.json(JSON.parse(notes))
  })
})

// Get request for reading individual notes by id number 
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

// Post request for adding new notes to the page.
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

// Delete request for deleting individual notes from the page by their id number.
db.delete('/notes/:id', (req, res) => {
  console.info(`${req.method} request received!`)
  console.log(req.params.id)

  let notes
  if (req.params.id) {
    fs.readFile("./db/notes.json", 'utf-8', (err, data) => {
      if (err) {
        console.log(err)
        return
      }
      tempNotes = JSON.parse(data)
      notes = tempNotes.filter(note => note.id !== req.params.id)
      fs.writeFile("./db/notes.json", JSON.stringify(notes), (err) => {
        res.json(notes)
      })
    })
  }
})


module.exports = db;
