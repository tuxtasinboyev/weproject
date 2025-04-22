import express from 'express';
import router from './router/index.js';
const server = express();
server.use(express.json());
server.use(router);
server.listen(3000, () => console.log('Server is running on port 3000'))