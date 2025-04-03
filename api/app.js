const express = require("express");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const bcrypt = require("bcrypt");

const app = express();
const port = 8081;

const knex = require("knex")(require("./knexfile.js")["development"]);

app.use(
  cors({
    origin: "http://localhost:5173",
  })
);
app.use(express.json());
app.use(cookieParser());

app.get("/", (req, res) => {
  res.send("application is up and running");
});

//----SIGN-UP----//
app.post("/signup", (req, res) => {
  const { first_name, last_name, username, password } = req.body;

  bcrypt.hash(password, 10, function (err, hash) {
    if (err) {
      return res.status(500).json({
        success: false,
        message: "Error hashing password",
        error: err,
      });
    }
    knex("users")
      .insert({
        first_name,
        last_name,
        username,
        password: hash,
      })
      .then(() => {
        res.json({ success: true, message: "ok" });
      });
  });
});

// ---- LOG-IN ---- //
app.post("/login", async (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) {
    return res.status(400).json({
      success: false,
      message: "Username and password are required",
    });
  }

  try {
    const user = await knex("users").where({ username }).first();
    if (!user) {
      return res
        .status(400)
        .json({ success: false, message: "User not found" });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (isPasswordValid) {
      res.json({
        success: true,
        message: "Logged in successfully",
        session_id: user.id,
      });
    } else {
      res.status(400).json({ success: false, message: "Invalid credentials" });
    }
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Error logging in",
      error: err,
    });
  }
});

//----GET----//
//----Any user can see all items----//
app.get("/item", (req, res) => {
  knex("item")
    .select("*")
    .then((data) => {
      const truncatedItems = data.map((item) => {
        if (item.description.length > 100) {
          item.description = item.description.substring(0, 100) + "...";
        }
        return item;
      });
      res.json(data);
    });
});

// ---- ADD ITEM (for logged-in user) ---- //
app.post("/my-items", async (req, res) => {
  const { item_name, description, quantity } = req.body;

  const authHeader = req.headers.authorization;
  if (!authHeader) {
    return res
      .status(400)
      .json({ success: false, message: "No Authorization header provided" });
  }
  const sessionId = authHeader.split(" ")[1];
  if (!sessionId) {
    return res
      .status(400)
      .json({ success: false, message: "Invalid session token" });
  }

  try {
    const user = await knex("users").where({ id: sessionId }).first();
    if (!user) {
      return res
        .status(400)
        .json({ success: false, message: "User not found" });
    }
    await knex("item").insert({
      user_id: user.id,
      item_name,
      description,
      quantity,
    });
    res.json({ success: true, message: "Item added successfully" });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Error adding item",
      error: err,
    });
  }
});

// GET /my-items route
app.get("/my-items", (req, res) => {
  const sessionId =
    req.cookies.session_id ||
    (req.headers.authorization
      ? req.headers.authorization.split(" ")[1]
      : null);

  if (!sessionId) {
    return res.status(400).json({
      success: false,
      message: "User is not logged in",
    });
  }

  knex("users")
    .where({ id: sessionId })
    .first()
    .then((user) => {
      if (!user) {
        return res
          .status(400)
          .json({ success: false, message: "User not found" });
      }

      knex("item")
        .where({ user_id: user.id })
        .then((items) => {
          res.json(items);
        })
        .catch((err) => {
          console.error("Error fetching items:", err);
          res.status(500).json({
            success: false,
            message: "Error fetching items",
            error: err,
          });
        });
    })
    .catch((err) => {
      console.error("Error finding user:", err);
      res.status(500).json({
        success: false,
        message: "Error finding user",
        error: err,
      });
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
//POST THAT WORKS with POSTMAN
app.post("/item", (req, res) => {
  const { user_id, item_name, description, quantity } = req.body;

  knex("item")
    .insert({ user_id, item_name, description, quantity })
    .then(function () {
      res.json({ succeess: true, message: "ok" });
    });
});

// -- POST FOR loged in user? maybe

app.post("/my-items", (req, res) => {
  console.log("received data:", req.body);

  const { item_name, description, quantity } = req.body;
  const sessionId = req.cookies.session_id;

  if (!sessionId) {
    return res
      .status(400)
      .json({ success: false, message: "User not found for the session!" });
  }

  knex("users")
    .where({ id: sessionId })
    .first()
    .then((user) => {
      if (!user) {
        return res
          .status(400)
          .json({ success: false, message: "User not found" });
      }

      knex("item")
        .insert({
          user_id: user.id,
          item_name,
          description,
          quantity,
        })
        .then(() => {
          res.json({ success: true, message: "ok, item added" });
        })
        .catch((err) => {
          res.status(500).json({
            success: false,
            message: "Error adding item",
            error: err,
          });
        });
    });
});

// PATCH endpoint for updating an item (only by the owner)
app.patch("/item/:id", (req, res) => {
  const sessionId = req.headers.authorization
    ? req.headers.authorization.split(" ")[1]
    : null;

  if (!sessionId) {
    return res.status(401).json({
      success: false,
      message: "Not authenticated. Please log in.",
    });
  }

  const { item_name, description, quantity } = req.body;
  const itemId = req.params.id;

  knex("users")
    .where({ id: sessionId })
    .first()
    .then((user) => {
      if (!user) {
        return res
          .status(401)
          .json({ success: false, message: "User not found" });
      }

      knex("item")
        .where({ id: itemId })
        .first()
        .then((item) => {
          if (!item) {
            return res
              .status(404)
              .json({ success: false, message: "Item not found" });
          }

          if (parseInt(sessionId) !== item.user_id) {
            return res.status(403).json({
              success: false,
              message: "Not authorized to update this item",
            });
          }

          knex("item")
            .where({ id: itemId })
            .update({ item_name, description, quantity })
            .then(() => {
              res.json({ success: true, message: "Item updated successfully" });
            })
            .catch((err) => {
              res.status(500).json({
                success: false,
                message: "Error updating item",
                error: err,
              });
            });
        })
        .catch((err) => {
          res.status(500).json({
            success: false,
            message: "Error fetching item",
            error: err,
          });
        });
    })
    .catch((err) => {
      res.status(500).json({
        success: false,
        message: "Error fetching user",
        error: err,
      });
    });
});

//----DELETE----//
app.delete("/item/:id", (req, res) => {
  const sessionId =
    req.cookies.session_id ||
    (req.headers.authorization
      ? req.headers.authorization.split(" ")[1]
      : null);

  if (!sessionId) {
    return res.status(400).json({
      success: false,
      message: "Not authenticated. Please log in.",
    });
  }

  const getId = req.params.id;

  knex("item")
    .where({ id: getId })
    .first()
    .then((item) => {
      if (!item) {
        return res
          .status(404)
          .json({ success: false, message: "Item not found" });
      }
      if (item.user_id != sessionId) {
        return res.status(403).json({
          success: false,
          message: "Not authorized to delete this item",
        });
      }

      knex("item")
        .where({ id: getId })
        .del()
        .then(() => {
          res.json({ success: true, message: "Item deleted successfully" });
        })
        .catch((err) => {
          res.status(500).json({
            success: false,
            message: "Error deleting item",
            error: err,
          });
        });
    })
    .catch((err) => {
      res.status(500).json({
        success: false,
        message: "Error fetching item",
        error: err,
      });
    });
});

//----LOGOUT and Clear COOKIE----//
app.post("/logout", (req, res) => {
  res.clearCookie("session_id");
  res.json({ success: true, message: "Logged out successfully" });
});

app.listen(port, () => {
  console.log(
    `Your Knex and Express applications are running succesfully at port: ${port}`
  );
});
