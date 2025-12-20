const fs = require("node:fs")
const filePath = "./big.txt"


const readStream = fs.createReadStream(filePath, {
    encoding: 'utf8',
    highWaterMark: 64 * 1024
});

readStream.on('data', (chunk) => {
    console.log('Chunk :');
    console.log(chunk);

});

readStream.on('end', () => {
    console.log('end');
});
//q2 
const sourcePath = './source.txt';
const destPath = './dest.txt';
const readStream2 = fs.createReadStream(sourcePath);
const writeStream2 = fs.createWriteStream(destPath);

readStream.pipe(writeStream);

writeStream.on('finish', () => {
    console.log('File copied using streams');
    console.log('new one::');
    console.log(fs.readFileSync(destPath, 'utf8'));
});
// //q3 

//part  2 
//q1 p2
const http = require('http');
const path = require('path');

const PORT = 3000;
const USERS_FILE = path.join(__dirname, 'users.json');

// Initialize users.json  law n found
if (!fs.existsSync(USERS_FILE)) {
    fs.writeFileSync(USERS_FILE, JSON.stringify([], null, 2));
}

//  read users 
function readUsers() {
    const data = fs.readFileSync(USERS_FILE, 'utf8');
    return JSON.parse(data);
}

// write users to file
function writeUsers(users) {
    fs.writeFileSync(USERS_FILE, JSON.stringify(users, null, 2));
}

// prace body to jso
function parseBody(req) {
    return new Promise((resolve, reject) => {
        let body = '';
        req.on('data', chunk => {
            body += chunk.toString();
        });
        req.on('end', () => {
            try {
                resolve(JSON.parse(body));
            } catch (e) {
                reject(e);
            }
        });
    });
}

//  send JSON response
function sendJSON(res, statusCode, data) {
    res.writeHead(statusCode, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify(data));
}
//! start el server
const server = http.createServer(async (req, res) => {
    const { method, url } = req;

    // Get all users    host     /user
    if (method === 'GET' && url === '/user') {
        try {
            const users = readUsers();
            sendJSON(res, 200, users);
        } catch (error) {
            sendJSON(res, 500, { error: 'Failed to read users' });
        }
    }

    // GET /user/:id - Get user by ID
    else if (method === 'GET' && url.startsWith('/user/')) {
        try {
            const id = parseInt(url.split('/')[2]);
            const users = readUsers();
            const user = users.find(u => u.id === id);

            if (user) {
                sendJSON(res, 200, user);
            } else {
                sendJSON(res, 404, { error: 'User not found' });
            }
        } catch (error) {
            sendJSON(res, 500, { error: 'Failed to read user' });
        }
    }

    // POST /user - Add neo user
    else if (method === 'POST' && url === '/user') {
        try {
            const newUser = await parseBody(req);
            const users = readUsers();


            const emailExists = users.some(u => u.email === newUser.email);
            if (emailExists) {
                sendJSON(res, 400, { error: 'Email already exists' });
                return;
            }

            const newId = users.length > 0 ? Math.max(...users.map(u => u.id)) + 1 : 1;
            newUser.id = newId;

            users.push(newUser);
            writeUsers(users);

            sendJSON(res, 201, newUser);
        } catch (error) {
            sendJSON(res, 400, { error: 'Invalid request body' });
        }
    }

    // PATCH /user/:id - Update user by ID
    else if (method === 'PATCH' && url.startsWith('/user/')) {
        try {
            const id = parseInt(url.split('/')[2]);
            const updates = await parseBody(req);
            const users = readUsers();

            const userIndex = users.findIndex(u => u.id === id);
            if (userIndex === -1) {
                sendJSON(res, 404, { error: 'User not found' });
                return;
            }

            if (updates.email && updates.email !== users[userIndex].email) {
                const emailExists = users.some(u => u.email === updates.email);
                if (emailExists) {
                    sendJSON(res, 400, { error: 'Email already exists' });
                    return;
                }
            }

            if (updates.name) users[userIndex].name = updates.name;
            if (updates.age) users[userIndex].age = updates.age;
            if (updates.email) users[userIndex].email = updates.email;

            writeUsers(users);
            sendJSON(res, 200, users[userIndex]);
        } catch (error) {
            sendJSON(res, 400, { error: 'Invalid request' });
        }
    }

    // DELETE /user/:id - Delete user by ID
    else if (method === 'DELETE' && url.startsWith('/user/')) {
        try {
            const id = parseInt(url.split('/')[2]);
            const users = readUsers();

            const userIndex = users.findIndex(u => u.id === id);
            if (userIndex === -1) {
                sendJSON(res, 404, { error: 'User not found' });
                return;
            }

            const deletedUser = users.splice(userIndex, 1)[0];
            writeUsers(users);

            sendJSON(res, 200, { message: 'User deleted successfully', user: deletedUser });
        } catch (error) {
            sendJSON(res, 500, { error: 'Failed to delete user' });
        }
    }

    // Route not found
    else {
        sendJSON(res, 404, { error: 'Route not found' });
    }
});

server.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});

// p 3 qq
/*1) What is the Node.js Event Loop?
The Event Loop manages and executes asynchronous tasks without blocking the program.

2) What is Libuv and its role in Node.js?
Libuv is a C++ library that handles the event loop, async I/O, and the thread pool.

3) How does Node.js handle async operations internally?
Heavy tasks are sent to Libuv, and when finished, callbacks are queued and executed by the event loop.

4) Difference between Call Stack, Event Queue, and Event Loop?

Call Stack: runs synchronous code

Event Queue: holds ready callbacks

Event Loop: moves callbacks to the stack

5) What is the Node.js Thread Pool and how to set its size?
It handles heavy operations like fs and crypto.
Default size is 4, change it with:

UV_THREADPOOL_SIZE=8


6) Blocking vs Non-Blocking in Node.js

Blocking: stops the event loop

Non-blocking: runs async without stopping execution */