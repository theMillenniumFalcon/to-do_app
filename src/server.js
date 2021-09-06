const express = require('express')
const app = express()

app.use(express.json())

const favlangs = ['html', 'css', 'javascript', 'react']

app.get('/api/get-records', (req, res) => {
    res.json({ lang: favlangs})
})

app.post('/api/create-record', (req, res) => {
    const record = req.body.record
    console.log(record)
    favlangs.push(record)
    res.json({ status: 'ok' })
})

app.listen(5000, () => {
    console.log('listening on port 5000')
}) 