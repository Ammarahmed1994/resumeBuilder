let fs = require("fs");
let jwt = require("jsonwebtoken");
let bcrypt = require("bcryptjs");

exports.hashPassword = (password) => {
  const hash = bcrypt.hashSync(password, 10);
  return hash;
};

exports.generateToken = async (userName, password) => {
  let privateKey = await fs.readFileSync("config/privetkey.pem");
  let token = await jwt.sign(
    {
      userName: userName,
      password: password,
    },
    privateKey,
    { algorithm: "RS256" }
  );
  return token;
};
