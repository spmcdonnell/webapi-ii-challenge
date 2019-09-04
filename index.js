const server = require('./server.js');

const port = 8000;

server.listen(port, () => {
    console.log(`\nListening on port ${port}\n`);
});
