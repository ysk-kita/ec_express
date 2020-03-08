exports.up = function(knex, Promise) {
  return knex.schema.table('items', function(table) {
    table.string('category', 100);
    table.string('description', 200);
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.table('items', function(table) {
    table.dropColumns('category');
    table.dropColumns('description');
  });
};
