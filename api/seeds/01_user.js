/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
  //await knex.schema.raw("TRUNCATE user CASCADE");
  await knex("user").del();
  await knex("user").insert([
    {
      first_name: "James",
      last_name: "Kelly",
      username: "JKelly",
      password: "cat",
    },
    {
      first_name: "Jeff",
      last_name: "Haddock",
      username: "JHadock",
      password: "bird",
    },
    {
      first_name: "Matt",
      last_name: "Wegenke",
      username: "MWegenke",
      password: "dog",
    },
  ]);
};
