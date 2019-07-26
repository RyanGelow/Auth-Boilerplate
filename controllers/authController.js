const db      = require('./../models');
const jwt     = require('jwt-simple');
const config  = require('./../config');

const tokenForUser = (user) => {
    const timestamp = new Date().getTime();
    // sub === subject, which is the user.id
    // iat === issued at time, which helps with creating unique id

    // It's going to encode the whole 1st object and then add our secret to it
    // Encoded object referenced at payload.sub or payload.iat
    return jwt.encode({ sub: user.id, iat: timestamp }, config.secret);
}

module.exports = {
    signUp: async (req, res) => {
        const { email, password } = req.body
    
        if(!email || !password) {
            return res.status(422).json({ error: 'You must provide an email and password.'});
        }
        try {
            // Check if there is an existing user
            const existingUser = await db.User.findOne({ email });
            // If user exists, throw error
            if(existingUser) {
                return res.status(422).json({ error: 'Email is already in use.'})
            }

            const user = new db.User({ email, password });
            await user.save();
            res.json({ token: tokenForUser(user) });

        }catch(e) {
            res.status(404).json({ e })
        }
    },

    signIn: (req, res) => {
        res.send({ token: tokenForUser(req.user) })
    }
};