const Customer = require("../models/customer");
const { BadRequestError } = require("../errors/BadRequestError");
const { NotFoundError } = require("../errors/NotFoundError");

const find = (req, res, next) => {
  Customer.find({})
    .then((customer) => res.send({ data: customer }))
    .catch((err) => next(err));
};

const create = (req, res, next) => {
  const owner = req.user.id;
  console.log(req.body);
  const { name, partner, manager, email, address, price } = req.body;

  console.log(manager);

  Customer.create({
    name,
    partner,
    manager,
    email,
    address,
    price,
    owner,
  })
    .then((customer) =>
      res.send({
        data: customer,
      })
    )
    .catch((err) => {
      if (err.name === "ValidationError") {
        throw new BadRequestError(
          "Переданы некорректные данные при создании карточки заказчика."
        );
      }
      next(err);
    })
    .catch((err) => next(err));
};

const deleteCustomer = (req, res, next) => {
  Card.findByIdAndRemove(req.params.customerId)
    .then((customer) => {
      if (!card) {
        throw new NotFoundError(
          "Карточка заказчика с указанным _id не найдена."
        );
      }
      res.send({
        customer,
      });
    })
    .catch((err) => {
      next(err);
    });
};

module.exports = { find, create, deleteCustomer };
