const jwt = require("jsonwebtoken");

const encode_token = (payload) => {
  encoded_jwt = jwt.sign(payload, "SECRET", { algorithm: "HS256" ,expiresIn:"2d"});
  return encoded_jwt;
};

const verify_token = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (authHeader) {
    const token = authHeader.split(" ")[1];
    jwt.verify(token, "SECRET", (err, user) => {
      if (err) return res.status(403).json("Token is invalid");
      req.user = user;
      next();
    });
  } else {
    return res.status(401).json("You are not authenticated!");
  }
};

module.exports = { verify_token, encode_token };
