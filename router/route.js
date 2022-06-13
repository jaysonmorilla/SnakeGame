const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    res.render('index', {title: 'Main Menu'});
})

const urlAuth = (req, res, next) => {
    switch(req.params.uri) {
        case 'start': next(); break;
        case 'option': next(); break;
        case 'high score': next(); break;
        default: res.status(404).render('404', { title: "Error"}); break;
    }
    return;
}


router.get('/:uri', urlAuth, (req, res) => {
    if(req.params.uri == 'start') res.redirect('/game');
    // if(req.params.uri == 'start') res.status(200).render('game', {title: 'Start'});
});

module.exports = router;