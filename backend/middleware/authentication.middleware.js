const jwt = require("jsonwebtoken")
module.exports.authenticate = async (req, res, next) => {
  const token = req.cookies.token || req.headers.authorization?.split(' ')[1];
  console.log(token)
  if (!token) {
    return res.status(401).json({ message: 'Authentication token is missing' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; 
    next(); 
  } catch (error) {
    console.error('Authentication error:', error);
    return res.status(401).json({ message: 'Invalid authentication token' });
  }
}


module.exports.isAuthorized = (req, res, next) => {
  if (req.user && req.user.role === 'host') {
    next(); 
  } else {
    return res.status(403).json({ message: 'Access denied. You do not have permission to perform this action.' });
  }
};

