const db = require('./data/db.js');
const express = require('express');

const server = express();

server.use(express.json());

// POST
server.post('/api/posts', (req, res) => {});

server.post('/api/posts/:id/comments', (req, res) => {});

// GET

server.get('/api/posts', (req, res) => {});

server.get('/api/posts/:id', (req, res) => {});

server.get('/api/posts/:id/comments', (req, res) => {});

// DELETE

server.delete('/api/posts/:id', (req, res) => {});

// PUT

server.put('/api/posts/:id', (req, res) => {});

module.exports = server;
