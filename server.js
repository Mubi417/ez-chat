const express = require('express')
const app = express()
const server = require('http').createServer(app)
const io = require('socket.io')(server)

app.set('view engine', 'ejs')
app.get('/', (req, res) => {
    res.redirect('/index')
})

app.get('/index', (req, res) => {
    res.render('index')
})

io.on('connection', socket => {
    socket.on('sent-message', message => {
        socket.broadcast.emit('message-received', message)
    })
})

server.listen(3030 || process.env.PORT, () => {
    console.log(`Port started on 3030`)
})