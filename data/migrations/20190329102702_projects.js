exports.up = function(knex) {
  return knex.schema.createTable('projects', function(tbl) {
    tbl.increments();
    tbl.string('name', 128).notNullable();
    tbl.text('description').notNullable();
    tbl.boolean('completed').defaultTo(false);
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable('projects');
};
