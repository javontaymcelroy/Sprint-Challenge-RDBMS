exports.up = function(knex) {
  return knex.schema.createTable('projects', tbl => {
    tbl.increments();
    tbl
      .string('Name')
      .notNullable()
      .unique();
    tbl.text('Description');
    tbl.boolean('Completed');
  });
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists('projects');
};
