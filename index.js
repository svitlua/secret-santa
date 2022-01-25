const express = require("express");
const { validationResult } = require("express-validator");
const { addUserValidation } = require("./utils/validation");

const sequelize = require("./db/database");
const Santas = require("./models/Santas");
const User = require("./models/User");
const Wishes = require("./models/Wishes");
const { shuffleUsers } = require("./utils/functions");
const { MIN_USERS_NUMBER, MAX_USERS_NUMBER } = require("./utils/constants");

sequelize
  .sync({ force: true })
  .then(() => {
    console.log("db is ready");
  })
  .catch((e) => console.log(e));

const app = express();

app.use(express.json());

app.post("/users", addUserValidation, async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json(errors);
    }

    const { firstname, lastname, wishes } = req.body;
    const wishesArr = wishes.map((wish) => ({ wish: wish }));
    await User.create(
      { firstname, lastname, wishes: wishesArr },
      { include: [Wishes] }
    );
    res.send("Added new user");
  } catch (err) {
    console.log(err);
  }
});

app.get("/users", async (req, res) => {
  try {
    const users = await User.findAll();
    res.send(users);
  } catch (err) {
    console.log(err);
  }
});

app.get("/wishes", async (req, res) => {
  try {
    const wishes = await Wishes.findAll();
    res.send(wishes);
  } catch (err) {
    console.log(err);
  }
});

app.get("/users/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const user = await User.findOne({ where: { id: id }, include: Wishes });
    res.send(user);
  } catch (err) {
    console.log(err);
  }
});

app.post("/shuffle", async (req, res) => {
  try {
    const userIds = await User.findAll({
      attributes: ["id"],
      raw: true,
    });
      if (userIds.length < MIN_USERS_NUMBER || userIds.length > MAX_USERS_NUMBER) {
          const errorMessage = `To shuffle secret santas you need to have ${MIN_USERS_NUMBER} to ${MAX_USERS_NUMBER} users`;
          return res.status(403).json({ message: errorMessage })
      } else {
          const formattedUserIds = userIds.map((idObj) => idObj.id);
          const shuffledUsers = shuffleUsers(formattedUserIds);
          await Santas.bulkCreate(shuffledUsers);
          res.send("Users shuffled");
      }
  } catch (err) {
    console.log(err);
  }
});

app.get("/santas", async (req, res) => {
  try {
    const santas = await Santas.findAll();
    res.send(santas);
  } catch (err) {
    console.log(err);
  }
});

app.get("/santas/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const { userId } = await Santas.findOne({
      where: { santaId: id },
      raw: true,
    });
    const user = await User.findOne({ where: { id: userId }, include: Wishes });
    res.send(user);
  } catch (err) {
    console.log(err);
  }
});

app.listen(9000, () => {
  console.log("app is running");
});
