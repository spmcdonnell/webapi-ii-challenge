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

server.post('/api/posts/:id/comments', (req, res) => {
    const { id } = req.params;
    const newComment = req.body;

    if (newComment.text) {
        db.findById(id)
            .then(post => {
                if (post.length) {
                    db.insertComment({ ...newComment, post_id: id })
                        .then(comment => {
                            res.status(201).json(comment);
                        })
                        .catch(error => {
                            res.status(500).json({ error: error, message: 'The posts information could not be retrieved.' });
                        });
                } else {
                    res.status(404).json({ message: 'The post with the specified ID does not exist.' });
                }
            })
            .catch(error => {
                res.status(500).json({ error: error, message: 'The posts information could not be retrieved.' });
            });
    } else {
        res.status(400).json({ errorMessage: 'Please provide text for the comment.' });
    }
});

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

server.get('/api/posts/:id', (req, res) => {
    const { id } = req.params;

    db.findById(id)
        .then(post => {
            if (post) {
                res.json(post);
            } else {
                res.status(404).json({ err: err, message: 'The post with the specified ID does not exist.' });
            }
        })
        .catch(err => {
            res.status(500).json({ err: err, message: "The post's information could not be retrieved." });
        });
});

server.get('/api/posts/:id/comments', (req, res) => {
    const { id } = req.params;

    db.findById(id)
        .then(post => {
            if (post.length) {
                db.findPostComments(id)
                    .then(comment => {
                        res.status(200).json(comment);
                    })
                    .catch(error => {
                        res.status(500).json({ error: error, message: "The post's comments could not be retrieved." });
                    });
            } else {
                res.status(404).json({ message: 'The post with the specified ID does not exist.' });
            }
        })
        .catch(error => {
            res.status(500).json({ error: error, message: 'The posts information could not be retrieved.' });
        });
});

// DELETE

server.delete('/api/posts/:id', (req, res) => {
    const { id } = req.params;

    db.remove(id)
        .then(post => {
            if (post) {
                res.json(post);
            } else {
                res.status(404).json({ message: 'The post with the specified ID does not exist.' });
            }
        })
        .catch(error => {
            res.status(500).json({ error: error, message: 'The post could not be removed.' });
        });
});

// PUT

server.put('/api/posts/:id', (req, res) => {
    const { id } = req.params;
    const postToEdit = req.body;

    if (postToEdit.title && postToEdit.contents) {
        db.findById(id)
            .then(post => {
                if (post.length) {
                    db.update(postToEdit)
                        .then(post => {
                            res.status(201).json(post);
                        })
                        .catch(error => {
                            res.status(500).json({ error: error, message: 'There was an error while updating the post' });
                        });
                } else {
                    res.status(404).json({ message: 'The post with the specified ID does not exist.' });
                }
            })
            .catch(error => {
                res.status(500).json({ error: error, message: 'The posts information could not be retrieved.' });
            });
    } else {
        res.status(400).json({ errorMessage: 'Please provide title and contents for the post.' });
    }
});

module.exports = server;
