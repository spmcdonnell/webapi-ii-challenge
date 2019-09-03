const db = require('./data/db.js');
const express = require('express');

const server = express();

server.use(express.json());

// POST
server.post('/api/posts', (req, res) => {
    const newPost = req.body;

    if (newPost.title && newPost.contents) {
        db.insert(newPost)
            .then(post => {
                res.status(201).json(post);
            })
            .catch(error => {
                res.status(500).json({ error: error, message: 'There was an error while saving the post to the database' });
            });
    } else {
        res.status(400).json({ errorMessage: 'Please provide title and contents for the post.' });
    }
});

server.post('/api/posts/:id/comments', (req, res) => {});

// GET

server.get('/api/posts', (req, res) => {
    db.find()
        .then(posts => {
            res.json(posts);
        })
        .catch(error => {
            res.status(500).json({ error: error, message: 'The posts information could not be retrieved.' });
        });
});

server.get('/api/posts/:id', (req, res) => {});

server.get('/api/posts/:id/comments', (req, res) => {});

// DELETE

server.delete('/api/posts/:id', (req, res) => {});

// PUT

server.put('/api/posts/:id', (req, res) => {});

module.exports = server;
