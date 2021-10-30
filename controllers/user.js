const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/user");
const { BadRequestError } = require("../errors/BadRequestError");

const { UnauthorizedError } = require("../errors/UnauthorizedError");

const { NotFoundError } = require("../errors/NotFoundError");

const {
  ConflictingRequestError,
} = require("../errors/ConflictingRequestError");

const generateAccessToken = (id, role) => {
  const payload = { id, role };

  return jwt.sign(payload, process.env.JWT_SECRET, {
    expiresIn: "24h",
  });
};

const find = (req, res, next) => {
  User.find({})
    .then((users) => res.send({ users }))
    .catch((err) => next(err));
};
const findOne = (req, res, next) => {
  User.findById(req.params.id)
    .then((user) => {
      if (!user) {
        throw new NotFoundError("Нет пользователя с таким id");
      }
      res.send({
        user,
      });
    })
    .catch((err) => {
      next(err);
    })
    .catch((err) => next(err));
};

const findCurrentUser = (req, res, next) => {
  User.findById(req.user.id)
    .then((user) => {
      if (!user) {
        throw new NotFoundError("Нет пользователя с таким id");
      }
      res.send({ user });
    })
    .catch((err) => {
      next(err);
    });
};

async function createUser(req, res, next) {
  try {
    const { login, name, avatar, password, role } = req.body;

    const candidate = await User.findOne({ login });

    if (candidate) {
      throw new ConflictingRequestError(
        "Пользователь c таким email уже существует"
      );
    }

    const hashedPassword = bcrypt.hashSync(password, 12, process.env.NODE_ENV);

    User.create({
      login,
      name,
      avatar,
      password: hashedPassword,
      role,
    })
      .then((user) => {
        res.send({
          user,
        });
      })
      .catch((err) => {
        if (err.name === "ValidationError") {
          throw new BadRequestError(
            "Переданы некорректные данные при создании пользователя."
          );
        }
        next(err);
      })
      .catch((err) => next(err));
  } catch (err) {
    next(err);
  }
}

const update = (req, res, next) => {
  const { name } = req.body;
  const owner = req.user.id;
  User.findByIdAndUpdate(
    owner,
    { name },
    {
      new: true,
      runValidators: true,
      upsert: true,
    }
  )
    .then((user) => {
      if (!user) {
        throw new NotFoundError("Пользователь по указанному _id не найден.");
      }
      res.send({
        user,
      });
    })
    .catch((err) => next(err));
};

const updateAvatar = (req, res, next) => {
  const owner = req.user.id;
  const { avatar } = req.body;
  User.findByIdAndUpdate(
    owner,
    { avatar },
    {
      new: true,
      runValidators: true,
      upsert: true,
    }
  )
    .then((user) => {
      if (!user) {
        throw new NotFoundError("Пользователь по указанному _id не найден.");
      }
      res.send({
        user,
      });
    })
    .catch((err) => {
      if (err.name === "ValidationError") {
        throw new BadRequestError(
          "Переданы некорректные данные при обновлении аватара."
        );
      }
      if (err.name === "CastError") {
        throw new NotFoundError("Пользователь по указанному _id не найден.");
      }
      next(err);
    })
    .catch((err) => next(err));
};

const login = (req, res, next) => {
  const { login, password } = req.body;

  User.findOne({ login })
    .select("+password")
    .then((user) => {
      if (!user) {
        throw new UnauthorizedError("Неправильный login или пароль");
      }
      if (bcrypt.compareSync(password, user.password)) {
        const token = generateAccessToken(user._id, user.role);
        console.log(token);
        if (!token) {
          throw new UnauthorizedError("Неправильный email или пароль");
        }
        return res
          .cookie("JWT", token, {
            maxAge: 3600000,
            httpOnly: true,
          })
          .send({
            name: user.name,
            avatar: user.avatar,
            role: user.role,
            _id: user._id,
            login: user.login,
          });
      }
      throw new UnauthorizedError("Неправильный email или пароль");
    })
    .catch((err) => next(err));
};

module.exports = {
  find,
  findOne,
  createUser,
  findCurrentUser,
  update,
  updateAvatar,
  login,
};
