const { User } = require('../db');

/*const isLoggedIn = async(req, res, next)=> {
  try {
    const user = await User.findByToken(req.headers.authorization);
    req.user = user;
    next();
  }
  catch(ex){
    next(ex);
  }
};*/

const isLoggedIn = async (req, res, next) => {
  try {
    console.log('Authorization header:', req.headers.authorization);

    const user = await User.findByToken(req.headers.authorization);
    console.log('Authenticated user:', user);

    req.user = user;
    next();
  } catch (ex) {
    console.error('Authentication error:', ex);
    next(ex);
  }
};

module.exports = {
  isLoggedIn
};
