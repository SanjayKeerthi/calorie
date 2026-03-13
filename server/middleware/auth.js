import jwt from "jsonwebtoken";

const auth = (req, res, next) => {
  // Get token from header
  const token = req.header("Authorization");

  // Check if token exists
  if (!token) {
    return res.status(401).json({ msg: "No token, authorization denied" });
  }

  try {
    // Remove "Bearer " if present
    const splitToken = token.startsWith("Bearer ")
      ? token.split(" ")[1]
      : token;

    // Verify token
    const decoded = jwt.verify(splitToken, process.env.JWT_SECRET);

    // Attach user info to request
    req.user = decoded.user;

    next();
  } catch (err) {
    res.status(401).json({ msg: "Token is not valid" });
  }
};

export default auth;