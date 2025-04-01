/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
  await knex("item").del();
  await knex("item").insert([
    {
      user_id: 1,
      item_name: "pen",
      description: "A pen is used to write",
      quantity: 11,
    },
    {
      user_id: 2,
      item_name: "paper",
      description: "Paper is make of trees",
      quantity: 12,
    },
    {
      user_id: 3,
      item_name: "scissors",
      description: "It is used to cut stuff",
      quantity: 13,
    },
  ]);
};
