const express = require("express");
const { add } = require("lodash");
const sequelize = require("./database");
const Santas = require("./models/Santas");
const User = require("./models/User");
const Wishes = require("./models/Wishes");

sequelize
  .sync({ force: true })
  .then(() => {
    console.log("db is ready");
  })
  .catch((e) => console.log(e));

const app = express();

app.use(express.json());

app.post("/users", async (req, res) => {
  try {
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

    const formattedUserIds = userIds.map((idObj) => idObj.id);

    const getShuffledUsers = (userIds) => {
      const shuffledUserIds = userIds.sort((a, b) => 0.5 - Math.random());
      return shuffledUserIds.map((userId, index) => {
        const santaId =
          index === shuffledUserIds.length - 1
            ? shuffledUserIds[0]
            : shuffledUserIds[index + 1];
        return { userId, santaId };
      });
    };

    const shuffledUsers = getShuffledUsers(formattedUserIds);
    console.log(shuffledUsers);

    await Santas.bulkCreate(shuffledUsers);

    res.send("Users shuffled");
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
