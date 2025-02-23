const jwt = require('jsonwebtoken');

exports.verifyToken = (req, res, next) => {
    // Extract the token from the Authorization header
    const token = req.headers['authorization'] && req.headers['authorization'].startsWith('Bearer ') 
        ? req.headers['authorization'].split(' ')[1] 
        : null;

    // Check if the token is provided
    if (!token) {
        return res.status(403).json({ message: 'No token provided' });
    }

    // Verify the token
    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if (err) {
            return res.status(401).json({ message: 'Unauthorized' });
        }
        // Store the decoded phone number in the request object for later use
        req.userId = decoded.phoneNumber;
        next(); // Proceed to the next middleware or route handler
    });
};