const jwt = require("jsonwebtoken");
const { UnauthorizedError } = require("../errors/UnauthorizedError");
const { ForbiddenError } = require("../errors/ForbiddenError");
const { NODE_ENV, JWT_SECRET } = process.env;

function checkRole(roles) {
  return function (req, res, next) {
    if (req.method === "OPTIONS") {
      return next();
    }

    try {
      const token = req.cookies.JWT;

      console.log(token);

      if (!token) {
        throw new UnauthorizedError("Пожалуйста зарегестрируйтесь");
      }

      const userPayload = jwt.verify(
        token,
        NODE_ENV === "production" ? JWT_SECRET : "dev-secret"
      );

      console.log(userPayload.role);

      let hasRole = false;
      userPayload.role.forEach((ur) => {
        if (roles.includes(ur)) {
          hasRole = true;
        }
      });

      if (!hasRole) {
        throw new ForbiddenError("Куда лезешь? Нельзя тебе сюда");
      }

      next();
    } catch (error) {
      console.error(`roleMiddleware error: ${error}`);
      return res.status(500).json({ error });
    }
  };
}

module.exports = { checkRole };
