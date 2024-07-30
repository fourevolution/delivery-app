import Fastify from 'fastify';
import fastifyStatic from '@fastify/static';
import fastifyView from '@fastify/view';
import formbody from '@fastify/formbody'
import { fileURLToPath } from 'url';
import path, { dirname } from 'path';
import ejs from 'ejs';
import fs from 'fs';
import dotenv from 'dotenv';

dotenv.config();

function readDataJSON(file) {
    // Read JSON file and parse her
    let fileContent = fs.readFileSync(`./${file}`, 'utf8');
    let data = JSON.parse(fileContent);
    return data;
}

const PORT = process.env.PORT;
const app = Fastify({
    logger: false,
});

app.register(fastifyStatic, {
    root: path.join(dirname(fileURLToPath(import.meta.url)), 'public'),
});

app.register(fastifyView, {
    engine: {
        ejs: ejs,
    },
    root: path.join(dirname(fileURLToPath(import.meta.url)), 'views'),
});

app.register(formbody);

app.get('/', (req, reply) => {
    reply.view('pages/home');
});

app.get('/api/items', (req, reply) => {
    reply.send(readDataJSON('items.json'));
});

app.post('/api/order', (req,reply) => {
    console.log(req.body);
});

app.get('/api/points', (req,reply) => {
    reply.send(readDataJSON('points.json'));
})

app.listen({ port: PORT }, () => {
    console.log('[SERVER STARTED] at', PORT)
});

