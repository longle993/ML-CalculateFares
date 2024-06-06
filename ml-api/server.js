const express = require('express');
const bodyParser = require('body-parser');
const { spawn } = require('child_process');
const cors = require('cors')

const app = express();
const port = 5000;

app.use(cors())
app.use(bodyParser.json());

app.post('/predict', (req, res) => {
    const input = req.body.input;

    // Gọi script Python
    const pythonProcess = spawn('python', ['predict.py', JSON.stringify(input)]);

    pythonProcess.stdout.on('data', (data) => {
        const predictions = JSON.parse(data.toString());
        res.json(predictions);
    });

    pythonProcess.stderr.on('data', (data) => {
        console.error(`stderr: ${data}`);
        res.status(500).send(data.toString());
    });

    pythonProcess.on('close', (code) => {
        console.log(`child process exited with code ${code}`);
    });
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
