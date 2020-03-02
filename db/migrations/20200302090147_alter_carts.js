
exports.up = function(knex, Promise) {
  return knex.schema.table('cart', function(table) {
    table.unique(['user', 'itemId']);
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.hasTable('cart').then(function(exists) {
      if (exists) {
          return knex.schema.dropTable('cart');
      }
  });
};
