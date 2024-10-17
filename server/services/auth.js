import jwt from 'jsonwebtoken';
const secret  = process.env.JWTSECRET;

function setUser(user) {
    return jwt.sign(
        {
            username: user.username,
            email: user.email
        },
        secret,
        {
            expiresIn:"1d"
        }
    )
}

function getUser(token) {
    if(!token) return null;
    try{
        return jwt.verify(token,secret);
    }
   catch(err){
        return null;
   }
}

export {
    getUser,
    setUser
}