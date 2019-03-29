exports.up = function(knex) {
  return knex.schema.createTable('actions', tbl => {
    tbl.increments();
    tbl.text('action_description');
    tbl.text('action_notes');
    tbl.boolean('completed');
  });
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists('actions');
};
