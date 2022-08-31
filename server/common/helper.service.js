const crypto = require("crypto");

let fs = require("fs");
let jwt = require("jsonwebtoken");

// export default class HelperService {
exports.hashPassword = (password) => {
  const hash = crypto.createHash("md5").update(password).digest("hex");
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
// }
