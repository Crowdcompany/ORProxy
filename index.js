const express = require('express');
const fetch = require('node-fetch');
const app = express();

app.use(express.json());

app.post('/v1/chat/completions', async (req, res) => {
    const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${process.env.OPENROUTER_API_KEY}`,
        },
        body: JSON.stringify(req.body),
    });
    const data = await response.text();
    res.header("Access-Control-Allow-Origin", "*");
    res.type('json').status(response.status).send(data);
});

app.options('/v1/chat/completions', (req, res) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "POST, OPTIONS");
    res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");
    res.sendStatus(204);
});

app.listen(process.env.PORT || 8080);