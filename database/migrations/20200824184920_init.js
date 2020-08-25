exports.up = function (knex) {
  return knex.schema
    .createTable("Users", (tbl) => {
      tbl.increments("id").primary();
      tbl.string("username", 255).notNullable().unique().index();
      tbl.string("password", 255).notNullable();
      tbl.string("email", 255).unique().notNullable();
    })
    .createTable("Stories", (tbl) => {
      tbl.increments("id").primary();
      tbl
        .integer("user_id")
        .unsigned()
        .references("id")
        .inTable("Users")
        .notNullable()
        .onUpdate("CASCADE")
        .onDelete("CASCADE");
      tbl.string("title", 255).notNullable();
      tbl.text("body").notNullable();
      tbl.string("image_url", 255);
      tbl.string("location", 255);
      tbl.timestamps(true, true);
    })
    .createTable("Comments", (tbl) => {
      tbl.increments("id").primary();
      tbl
        .integer("story_id")
        .unsigned()
        .references("id")
        .inTable("Stories")
        .notNullable()
        .onUpdate("CASCADE")
        .onDelete("CASCADE");
      tbl
        .integer("user_id")
        .unsigned()
        .references("id")
        .inTable("Users")
        .notNullable()
        .onUpdate("CASCADE")
        .onDelete("CASCADE");
      tbl.text("body").notNullable();
    })
    .createTable("Likes", (tbl) => {
      tbl.increments("id").primary();
      tbl
        .integer("story_id")
        .unsigned()
        .references("id")
        .inTable("Stories")
        .notNullable()
        .onUpdate("CASCADE")
        .onDelete("CASCADE");
      tbl
        .integer("user_id")
        .unsigned()
        .references("id")
        .inTable("Users")
        .notNullable()
        .onUpdate("CASCADE")
        .onDelete("CASCADE");
      tbl.boolean("liked").defaultTo("true");
    })
    .createTable("Favorites", (tbl) => {
      tbl.increments("id").primary();
      tbl
        .integer("story_id")
        .unsigned()
        .references("id")
        .inTable("Stories")
        .notNullable()
        .onUpdate("CASCADE")
        .onDelete("CASCADE");
      tbl
        .integer("user_id")
        .unsigned()
        .references("id")
        .inTable("Users")
        .notNullable()
        .onUpdate("CASCADE")
        .onDelete("CASCADE");
      tbl.boolean("favorite").defaultTo("true");
    });
};

exports.down = function (knex) {
  return knex.schema
    .dropTableIfExists("Favorites")
    .dropTableIfExists("Likes")
    .dropTableIfExists("Comments")
    .dropTableIfExists("Stories")
    .dropTableIfExists("Users");
};
