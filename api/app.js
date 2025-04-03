const express = require("express");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const bcrypt = require("bcrypt");

const app = express();
const port = 8081;

const knex = require("knex")(require("./knexfile.js")["development"]);

app.use(cors());
app.use(express.json());
app.use(cookieParser());

app.get("/", (req, res) => {
  res.send("application is up and running");
});

app.listen(port, () => {
  console.log(
    `Your Knex and Express applications are running succesfully at port: ${port}`
  );
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

//----LOG-IN----//
app.post("/login", (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({
      success: false,
      message: "Username and password are required",
    });
  }

  knex("users")
    .where({ username })
    .first()
    .then((users) => {
      if (!users) {
        // console.log("User not Found:", username);
        return res
          .status(400)
          .json({ success: false, message: "User not found" });
      }

      bcrypt
        .compare(password, users.password)
        .then((isPasswordValid) => {
          if (isPasswordValid) {
            // Set the session cookie with the user ID
            res.cookie("session_id", users.id, {
              httpOnly: true,
              maxAge: 3600000,
            }); // cookie expires in 1 hour
            res.json({ success: true, message: "Logged in successfully" });
          } else {
            //console.log('Invalid credentials for user:', username);
            res
              .status(400)
              .json({ success: false, message: "Invalid credentials" });
          }
        })
        .catch((err) => {
          res.status(500).json({
            success: false,
            message: "Error comparing password",
            error: err,
          });
        });
    })
    .catch((err) => {
      //console.error('Error finding user:', err);
      res
        .status(500)
        .json({ success: false, message: "Error finding user", error: err });
    });
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
// GET for loged in user?maybe
app.get("/my-items", (req, res) => {
  const sessionId = req.cookies.session_id; // Ensure session_id is available

  if (!sessionId) {
    return res.status(400).json({
      success: false,
      message: "User is not logged in",
    });
  }

  // Find the user using the session ID
  knex("users")
    .where({ id: sessionId })
    .first()
    .then((users) => {
      if (!users) {
        return res.status(400).json({
          success: false,
          message: "User not found",
        });
      }

      // Fetch only items belonging to the logged-in user
      knex("item")
        .where({ user_id: users.id })
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

app.post("/item", (req, res) => {
  console.log("received data:", req.body);

  const { item_name, description, quantity } = req.body;
  const sessionId = req.cookies.session_id;
  // const sessionId =
  //   req.cookies.session_id || req.headers.authorization?.split(" ")[1];

  // if (!sessionId) {
  //   return res
  //     .status(400)
  //     .json({ success: false, message: "User not found for the session!" });
  // }

  knex("users")
    .where({ id: sessionId })
    .first()
    .then((users) => {
      if (!users) {
        return res
          .status(400)
          .json({ success: false, message: "User not found" });
      }

      knex("item")
        .insert({
          user_id: users.id,
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

//----PATCH----//
app.patch("/item/:id", (req, res) => {
  const { item_name, description, quantity } = req.body;
  const sessionId = req.cookies.session_id;

  if (!sessionId) {
    return res.status(400).json({ success: false, message: "User not found" });
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

      let getId = req.params.id;
      knex("item")
        .where({ id: getId })
        .update({ item_name, description, quantity })
        .then(function () {
          res.json({ success: true, message: "ok, item updated" });
        })
        .catch((err) => {
          res.json(err);
        });
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

//----LOGOUT and Clear COOKIE----//
app.post("/logout", (req, res) => {
  res.clearCookie("session_id"); // Clear the session cookie
  res.json({ success: true, message: "Logged out successfully" });
});
