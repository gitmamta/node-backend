// middleware/roleCheck.js
module.exports = (...roles) => {
  return (req, res, next) => {
    // Make sure authMiddleware ran first
    if (!req.user) {
      return res.status(401).json({ message: "Not authenticated" });
    }

    // Check if user's role is allowed
    if (!roles.includes(req.user.role)) {
      return res.status(403).json({ message: "Access denied: insufficient permissions" });
    }

    next();
  };
};

