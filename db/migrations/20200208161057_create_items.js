
exports.up = function(knex, Promise) {
  console.log('items oldest');
  return knex.schema.hasTable('items').then(function(exists) {
      if (!exists) {
          return knex.schema.createTable('items', function(table) {
              table.increments('id').primary();
              table.string('name', 100);
              table.string('img_alt');
              table.string('img');
              table.integer('price');
              table.integer('new_item');
          });
      }else{
          return new Error("The table already exists.");
      }
  });
};

exports.down = function(knex, Promise) {
  console.log('items oldest rollback');
  return knex.schema.hasTable('items').then(function(exists) {
      if (exists) {
          return knex.schema.dropTable('items');
      }
  });
};
