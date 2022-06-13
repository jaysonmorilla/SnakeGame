const express = require('express');
const app = express();
const port = process.env.PORT || 3000;
const router = require('./router/route.js');

app.set('view engine', 'ejs');
app.use(express.static('public')); //static files
app.use('/menu', router);

app.get('/', (req, res) => {
    res.render('index', {title: 'Main Menu'});
});

app.get('/game', (req, res) => {
    res.render('game', {title: 'Start Game'});
})

app.listen(port, () => {
    console.log('Server Started:'+port);
})