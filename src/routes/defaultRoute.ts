import express, { Router } from 'express';
import path, { dirname } from 'path';
import { fileURLToPath } from 'url';
export const app = Router();

// app.get('/', (req, res) => {
//   res.send("index");
// });
// app.get('/about', (req, res) => {
//   res.send("about");
// });

const __dirname = path.resolve();
console.log(path.join(__dirname, 'build/src/pages'));
// app.use(express.static(path.join(__dirname, 'build/src/planner')));
app.use(express.static(path.join(__dirname, 'build/src/pages')));