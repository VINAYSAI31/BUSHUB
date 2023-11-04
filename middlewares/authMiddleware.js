const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
    try {
        const token = req.headers.authorization.split(" ")[1];

        if (!token) {
            return res.status(401).json({
                message: "Auth failed",
                success: false
            });
        }

        const decoded = jwt.verify(token, process.env.jwt_secret);
        req.userData = { userId: decoded.userId }; // Reverted back to req.userData
        next();

    } catch (error) {
        return res.status(401).json({
            message: "Auth failed",
            success: false,
            
        });
    }
};
