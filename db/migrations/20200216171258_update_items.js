exports.up = function(knex, Promise) {
  return knex.schema.table('items', function(table) {
    table.string('search_tag1', 100);
    table.string('search_tag2', 100);
    table.string('search_tag3', 100);
    table.string('search_tag4', 100);
    table.string('search_tag5', 100);
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.table('items', function(table) {
    table.dropColumns('search_tag1', 'search_tag2', 'search_tag3', 'search_tag4', 'search_tag5');
  });
};
