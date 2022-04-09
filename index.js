import express from "express";
import bodyParser from 'body-parser';
import usersRoutes from './routes/users.js';
import path, { dirname } from 'path';

const app = express();
const __dirname = path.resolve(); 
const PORT = 5000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

app.get('/', (req, res) => res.send('Hello from Homepage.'));
app.use('/users', usersRoutes);
app.get('/form', (req, res) => res.sendFile(__dirname + "/Form.html"));
/*


*/
app.listen(PORT, () => console.log(`Server running on port: http//localhost:${PORT}`));