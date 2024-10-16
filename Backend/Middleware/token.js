import jwt from "jsonwebtoken";

function createTokenForNewUser(id) {
  return jwt.sign({ id }, process.env.JWT_SECRET);
}

export default createTokenForNewUser;
