import token from '../services/token';
import User from '../models/user';
import config from '../config';
export default {
    signupWithEmail : (req, res, next) => {
        const { email } = req.body;
        if (!email) return res.status(422).send('You must provide email.');
        User.findOne({
            email: email
        }).then(existingUser => {
            if (existingUser) return res.status(422).send('Email is in use.');
            const { URIDomain } = config;
            console.log(URIDomain);
            const deepLink = `${URIDomain}#signupVerification?token=${token.generateTokenWithEmail(email)}&address=${email}`;
            res.send(deepLink);
        }).catch(next);
    },
    verifyEmailToken: (req, res, next) => {
        token.verifyEmailToken(req.body.token, (err, address)=>{
            if(err) return res.sendStatus(401);
            res.send(address);
        })
    },
    signup : (req, res, next) => {
        const {tokenParams} = req.params;
        const { email, password, firstName, lastName } = req.body;
        token.verifyEmailToken(tokenParams, (err, address)=>{
            console.log(address);
            if(err || (address !== email) || (!email || !password)) return res.sendStatus(401);
            User
            .findOne({ email })
            .then((err, existingUser) => {
                if (err) return res.status(422).send(err);
                if (existingUser) {
                    return res
                        .status(422)
                        .send({error: 'Email is in use'});
                }
                const user = new User({
                    name: {
                        first: firstName, 
                        last: lastName
                    },
                    email: email,
                    password: password
                })
    
                user.save().then((savedUser) => {
                    res.json({
                        success: true,
                        token: token.generateToken(savedUser)
                    })
                }).catch(next);
            })
            .catch(next);
        })
    },
    
    signin: (req, res, next) => {
        const email = req.body.email;
        const password = req.body.password;
        if (!email || !password) {
            return res
                .status(422)
                .send({error: 'You must provide email and password.'});
        }
        User
            .findOne({
                email: email
            }, function (err, existingUser) {
                if (err || !existingUser) {
                    return res.status(401).send(err || {error: "User Not Found"})
                }
                if (existingUser) {
                    existingUser.comparedPassword(password, function(err, good) {
                        if (err || !good) {
                                return res.status(401).send(err || 'User not found')
                            }
    
                            res.send({
                                token: token.generateToken(existingUser)
                            })
                    })
                }
            })
    },

    updateProfile: (req, res, next) => {
        req.user.comparedPassword(req.body.password, (err, good) => {
            if (err || !good) return res.status(401).send(err || 'Incorrect Password')
            const userId = req.user._id;
            const newProfile = {
                name: {
                    first: req.body.firstName, 
                    last: req.body.lastName
                }
            };
            delete newProfile.email;
            delete newProfile.phone;
            delete newProfile.password;
            
            User.findByIdAndUpdate(userId, newProfile, {new: true})
            .then(newUser=>{
                console.log('newUser', newUser);
                res.sendStatus(200);
            })
            .catch(next)
        })
    }
    
}
