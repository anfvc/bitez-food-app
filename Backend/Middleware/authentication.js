import createHttpError from "http-errors";
import jwt from "jsonwebtoken";

async function authMiddleware(req, res, next) {
  const { token } = req.headers;

  if (!token) {
    return next(createHttpError(401, "Not authorized."));
  }

  try {
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
    req.body.userId = decodedToken.id;
    next();
  } catch (error) {
    next(createHttpError(500, "Server Error"))
  }
}

export default authMiddleware;
