const jwt = require('jsonwebtoken');
const { SECRET_KEY } = require('../config');

// make sure user is logged in

function ensureLogin(req, res, next) {
    let token = _getToken(req);

    try {
        // throws error on invalid/missing token
        jwt.verify(token, SECRET_KEY);
        // if we get here, a valid token was passed
        next();
    } catch(err) {
        res.status(401).send({ error: 'Unauthorized' });
    }
}


// Make sure user is logged in and is accessing their own page 
// i.e. userId in token === userId in URL param

function ensureSameUser(req, res, next) {
    let token = _getToken(req);

    try {
        //throws error on invalid/missing token
        let payload = jwt.verify(token, SECRET_KEY);
        //if we get here, a valid token was passed
        if (payload.userId === Number(req.params.id)){
            next();
        } else {
            res.status(403).send({error: 'Forbidden'});
        }
    } catch(err) {
        res.status(401).send({error: 'Unauthorized'});
    }
}

/**
 * Return the JWT token if found, else return ''
 * Authorization header string looks like: "Bearer <token"
 **/

function _getToken(req){
    //Return '' if header not found
    if ( !('authorization' in req.headers) ) {
        return '';
    }

    //Split header into 'Bearer' and token
    let authHeader = req.headers['authorization'];
    let [str, token] = authHeader.split(' ');

    return (str === 'Bearer') ? token : '';
}


module.exports = {
    ensureLogin,
    ensureSameUser
};