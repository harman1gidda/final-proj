const bcrypt = require("bcrypt");

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
  try {
    // Delete any existing data to avoid duplication
    await knex("users").del();

    const hashedPasswordJames = await bcrypt.hash("cat", 10);
    const hashedPasswordJeff = await bcrypt.hash("bird", 10);
    const hashedPasswordMatt = await bcrypt.hash("dog", 10);

    await knex("users").insert([
      {
        first_name: "James",
        last_name: "Kelly",
        username: "JKelly",
        password: hashedPasswordJames,
      },
      {
        first_name: "Jeff",
        last_name: "Haddock",
        username: "JHadock",
        password: hashedPasswordJeff,
      },
      {
        first_name: "Matt",
        last_name: "Wegenke",
        username: "MWegenke",
        password: hashedPasswordMatt,
      },
    ]);

    console.log("Seed data inserted successfully");
  } catch (error) {
    console.error("Error during seed operation:", error);
  }
};
