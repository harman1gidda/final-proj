/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.createTable("users", (table) => {
    table.increments(); // This creates an auto-incrementing primary key
    table.string("first_name").notNullable();
    table.string("last_name").notNullable();
    table.string("username").notNullable().unique(); // Ensure username is unique
    table.string("password").notNullable(); // Ensure password is not null
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.dropTableIfExists("users");
};
