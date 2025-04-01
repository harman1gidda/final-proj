const express = require("express");
const app = express();
const port = 8081;

const knex = require("knex")(require("./knexfile.js")["development"]);

const cors = require("cors");
app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("application is up and running");
});

app.listen(port, () => {
  console.log(
    `Your Knex and Express applications are running succesfully at port: ${port}`
  );
});

//----GET----//
app.get("/item", (req, res) => {
  knex("item")
    .select("*")
    .then((data) => {
      res.json(data);
    });
});

app.get("/item/:id", (req, res) => {
  let getId = req.params.id;
  knex("item")
    .select("*")
    .where({ id: parseInt(getId) })
    .then((data) => {
      res.json(data);
    });
});

//----POST----//
app.post("/item", (req, res) => {
  const { id, user_id, item_name, description, quantity } = req.body;

  knex("item")
    .insert({ id, user_id, item_name, description, quantity })
    .then(function () {
      res.json({ succeess: true, message: "ok" });
    });
});

//----PATCH----//
app.patch("/item/:id", (req, res) => {
  let getId = req.params.id;
  const { user_id, item_name, description, quantity } = req.body;

  knex("item")
    .where({ id: getId })
    .update({ user_id, item_name, description, quantity })
    .then(function () {
      res.json({ success: true, message: "ok" });
    })
    .catch((err) => {
      res.json(err);
    });
});

//----DELETE----//
app.delete("/item/:id", (req, res) => {
  let getId = req.params.id;
  knex("item")
    .where({ id: getId })
    .del()
    .then(function () {
      res.json({ succeess: true, message: "ok" });
    });
});

//----Join----//
