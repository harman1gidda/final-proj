/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */

const bcrypt = require("bcrypt");

exports.seed = async function (knex) {
  //await knex.schema.raw("TRUNCATE user CASCADE");
  await knex("user").del();

  const hashedPasswordJames = await bcrypt.hash("cat", 10);
  const hashedPasswordJeff = await bcrypt.hash("bird", 10);
  const hashedPasswordMatt = await bcrypt.hash("dog", 10);

  await knex("user").insert([
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
};
