const router = require('express').Router();

router.route('/signup')
    .post((req, res) => {
        console.log("I'm Hit!")
})

module.exports = router;